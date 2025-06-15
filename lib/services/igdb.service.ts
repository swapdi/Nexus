import { TRPCError } from '@trpc/server';

// IGDB API Interfaces
export interface IGDBGame {
  id: number;
  name: string;
  summary?: string;
  cover?: {
    id: number;
    url: string;
  };
  screenshots?: Array<{
    id: number;
    url: string;
  }>;
  genres?: Array<{
    id: number;
    name: string;
  }>;
  platforms?: Array<{
    id: number;
    name: string;
    abbreviation?: string;
  }>;
  involved_companies?: Array<{
    id: number;
    company: {
      id: number;
      name: string;
    };
    developer: boolean;
    publisher: boolean;
  }>;
  release_dates?: Array<{
    id: number;
    date: number;
    platform: number;
  }>;
  rating?: number;
  rating_count?: number;
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  first_release_date?: number;
  total_rating?: number;
  total_rating_count?: number;
}

export interface IGDBCover {
  id: number;
  url: string;
  width?: number;
  height?: number;
}

export interface IGDBSearchResult {
  id: number;
  name: string;
  first_release_date?: number;
  platforms?: Array<{
    id: number;
    name: string;
  }>;
}

export interface EnrichedGameData {
  description?: string;
  coverUrl?: string;
  screenshotUrls?: string[];
  genres?: string[];
  developer?: string;
  publisher?: string;
  releaseDate?: Date;
  rating?: number;
  igdbId?: number;
}

export namespace IGDBService {
  // Cache für Access Token
  let cachedAccessToken: string | null = null;
  let tokenExpiry: number = 0;

  // IGDB Client Credentials aus Umgebungsvariablen
  const getIGDBCredentials = () => {
    const clientId = process.env.IGDB_CLIENT_ID;
    const clientSecret = process.env.IGDB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          'IGDB Credentials (IGDB_CLIENT_ID und IGDB_CLIENT_SECRET) nicht konfiguriert'
      });
    }

    return { clientId, clientSecret };
  };
  // Access Token von Twitch/IGDB OAuth2 abrufen
  const getAccessToken = async (): Promise<string> => {
    // Prüfe ob Token noch gültig ist (mit 5 Minuten Puffer)
    if (cachedAccessToken && Date.now() < tokenExpiry - 300000) {
      return cachedAccessToken;
    }

    try {
      const { clientId, clientSecret } = getIGDBCredentials();

      const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials'
        })
      });

      if (!response.ok) {
        throw new Error(
          `Token Request fehlgeschlagen: ${response.status} ${response.statusText}`
        );
      }

      const tokenData = await response.json();
      cachedAccessToken = tokenData.access_token;
      // Token läuft typischerweise nach ~60 Tagen ab
      tokenExpiry = Date.now() + tokenData.expires_in * 1000;

      return cachedAccessToken!;
    } catch (error) {
      console.error('Fehler beim Abrufen des IGDB Access Tokens:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Konnte IGDB Access Token nicht abrufen'
      });
    }
  };

  // IGDB API Headers
  const getHeaders = async () => {
    const { clientId } = getIGDBCredentials();
    const accessToken = await getAccessToken();

    return {
      'Client-ID': clientId,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
  };

  // IGDB URL zu vollständiger Bild-URL
  const getImageUrl = (
    url: string,
    size:
      | 'thumb'
      | 'cover_small'
      | 'cover_big'
      | 'screenshot_med'
      | 'screenshot_big' = 'cover_big'
  ): string => {
    if (!url) return '';
    // Entferne "t_thumb" prefix falls vorhanden und füge gewünschte Größe hinzu
    const cleanUrl = url
      .replace(/^\/\//, 'https://')
      .replace(/t_thumb/, `t_${size}`);
    return cleanUrl.startsWith('https://') ? cleanUrl : `https:${cleanUrl}`;
  };
  // Nach Spielen suchen
  export const searchGames = async (
    query: string,
    limit: number = 10
  ): Promise<IGDBSearchResult[]> => {
    try {
      console.log(`[IGDB API] Searching for: "${query}"`);
      const headers = await getHeaders();
      const body = `
        search "${query}";
        fields id, name, first_release_date, platforms.name;
        limit ${limit};
      `;

      const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers,
        body
      });

      if (!response.ok) {
        console.error(
          '[IGDB API] Search Error:',
          response.status,
          response.statusText
        );
        const errorText = await response.text();
        console.error('[IGDB API] Error body:', errorText);
        return [];
      }

      const games: IGDBSearchResult[] = await response.json();
      console.log(`[IGDB API] Search returned ${games.length} results`);
      return games;
    } catch (error) {
      console.error('Fehler bei IGDB Spielesuche:', error);
      return [];
    }
  };

  // Detaillierte Spielinformationen abrufen
  export const getGameDetails = async (
    gameId: number
  ): Promise<IGDBGame | null> => {
    try {
      const headers = await getHeaders();
      const body = `
        fields id, name, summary, cover.url, screenshots.url, 
               genres.name, platforms.name, platforms.abbreviation,
               involved_companies.company.name, involved_companies.developer, involved_companies.publisher,
               release_dates.date, release_dates.platform,
               rating, rating_count, aggregated_rating, aggregated_rating_count,
               first_release_date, total_rating, total_rating_count;
        where id = ${gameId};
      `;

      const response = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers,
        body
      });

      if (!response.ok) {
        console.error(
          'IGDB Game Details API Error:',
          response.status,
          response.statusText
        );
        return null;
      }

      const games: IGDBGame[] = await response.json();
      return games.length > 0 ? games[0] : null;
    } catch (error) {
      console.error('Fehler beim Abrufen der IGDB Spieldetails:', error);
      return null;
    }
  }; // Steam-Namen für IGDB-Suche bereinigen
  const cleanSteamGameName = (gameName: string): string => {
    return (
      gameName
        // Steam-spezifische Zusätze entfernen
        .replace(
          /\s*(Single Player|Multiplayer|Complete Edition|Digital Deluxe|Gold Edition|GOTY|Game of the Year|Definitive Edition|Enhanced Edition)$/i,
          ''
        )
        .replace(
          /\s*(Directors? Cut|Ultimate Edition|Collectors? Edition|Special Edition|Remastered|HD Edition|Deluxe Edition)$/i,
          ''
        )
        .replace(
          /\s*(Anniversary Edition|Legendary Edition|Premium Edition|Platinum Edition|Royal Edition|Standard Edition)$/i,
          ''
        )
        .replace(
          /\s*(Early Access|Beta|Alpha|Demo|Free|Free to Play|F2P)$/i,
          ''
        )
        .replace(/\s*\(.*?\)$/g, '') // Entferne Klammern am Ende
        .replace(/\s*\[.*?\]$/g, '') // Entferne eckige Klammern am Ende
        .replace(/[™®©]/g, '') // Entferne Trademark-Zeichen
        .replace(/\s*-\s*(Demo|Beta|Alpha|Early Access|Free|Lite)$/i, '') // Entferne Demo/Beta Zusätze
        .replace(/\s*:\s*(Demo|Beta|Alpha|Free|Lite)$/i, '') // Entferne Demo/Beta nach Doppelpunkt
        .replace(/\s+/g, ' ') // Normalisiere Leerzeichen
        .replace(/\s*&\s*/g, ' and ') // Ersetze & mit and
        .replace(/\s*\+\s*/g, ' Plus ') // Ersetze + mit Plus
        .trim()
    );
  };
  // Generiere verschiedene Suchvarianten eines Spielnamens
  const generateSearchVariants = (gameName: string): string[] => {
    const variants: string[] = [];
    const cleaned = cleanSteamGameName(gameName);

    // 1. Bereinigter Name (höchste Priorität)
    variants.push(cleaned);

    // 2. Original-Name falls anders
    if (gameName !== cleaned) {
      variants.push(gameName);
    }

    // 3. Ohne Untertitel (alles vor : oder - entfernen)
    const withoutSubtitle = cleaned.split(/[:\-–—]/)[0].trim();
    if (withoutSubtitle !== cleaned && withoutSubtitle.length > 2) {
      variants.push(withoutSubtitle);
    }

    // 4. Ohne Nummerierungen am Ende (z.B. "Game 2" -> "Game")
    const withoutNumbers = cleaned.replace(/\s+\d+$/, '').trim();
    if (withoutNumbers !== cleaned && withoutNumbers.length > 2) {
      variants.push(withoutNumbers);
    }

    // 5. Wort-Variationen
    const words = cleaned.split(' ').filter(word => word.length > 0);
    if (words.length > 1) {
      // Ohne erstes Wort: "Call of Duty" -> "Duty"
      if (words.length > 2) {
        variants.push(words.slice(1).join(' '));
      }

      // Ohne letztes Wort: "Summoners War Sky Arena" -> "Summoners War Sky"
      variants.push(words.slice(0, -1).join(' '));

      // Erste zwei Wörter: "Summoners War Sky Arena" -> "Summoners War"
      if (words.length > 2) {
        variants.push(words.slice(0, 2).join(' '));
      }

      // Letzten zwei Wörter: "Call of Duty Modern Warfare" -> "Modern Warfare"
      if (words.length > 2) {
        variants.push(words.slice(-2).join(' '));
      }
    }

    // 6. Nur Kernbegriffe (längste und wichtigste Wörter)
    if (words.length > 1) {
      const coreWords = words
        .filter(word => word.length > 3) // Nur Wörter > 3 Zeichen
        .filter(
          word =>
            !['the', 'and', 'for', 'with', 'from'].includes(word.toLowerCase())
        ) // Häufige Füllwörter
        .sort((a, b) => b.length - a.length) // Längste zuerst
        .slice(0, 3); // Maximal 3 Kernwörter
      if (coreWords.length > 0) {
        variants.push(coreWords.join(' '));
      }
    }

    // 7. Erstes Wort nur (für bekannte Franchises)
    if (words.length > 1 && words[0].length > 3) {
      variants.push(words[0]);
    }

    // 8. Spezielle Steam-Fälle behandeln
    // "Game Name Single Player" -> "Game Name"
    const withoutSinglePlayer = cleaned
      .replace(/\s*(single\s*player|multiplayer)$/i, '')
      .trim();
    if (withoutSinglePlayer !== cleaned && withoutSinglePlayer.length > 2) {
      variants.push(withoutSinglePlayer);
    }

    // 9. Roman numerals zu Zahlen: "III" -> "3"
    const romanToArabic = cleaned
      .replace(/\bI{1,3}\b/g, match => {
        switch (match) {
          case 'I':
            return '1';
          case 'II':
            return '2';
          case 'III':
            return '3';
          default:
            return match;
        }
      })
      .replace(/\bIV\b/g, '4')
      .replace(/\bV\b/g, '5')
      .replace(/\bVI\b/g, '6')
      .replace(/\bVII\b/g, '7')
      .replace(/\bVIII\b/g, '8')
      .replace(/\bIX\b/g, '9')
      .replace(/\bX\b/g, '10');

    if (romanToArabic !== cleaned) {
      variants.push(romanToArabic);
    }

    // 10. Zahlen zu Roman numerals: "3" -> "III"
    const arabicToRoman = cleaned
      .replace(/\b1\b/g, 'I')
      .replace(/\b2\b/g, 'II')
      .replace(/\b3\b/g, 'III')
      .replace(/\b4\b/g, 'IV')
      .replace(/\b5\b/g, 'V');

    if (arabicToRoman !== cleaned) {
      variants.push(arabicToRoman);
    }

    // Duplikate entfernen und leere/zu kurze Einträge filtern
    return [...new Set(variants)]
      .filter(variant => variant.length > 1)
      .slice(0, 15); // Maximal 15 Varianten zur Performance
  }; // Spiel nach Namen suchen und beste Übereinstimmung finden
  export const findBestMatch = async (
    gameName: string,
    platformName?: string
  ): Promise<IGDBGame | null> => {
    try {
      console.log(`[IGDB] Starting search for: "${gameName}"`);

      // Generiere alle Such-Varianten
      const searchVariants = generateSearchVariants(gameName);
      console.log(
        `[IGDB] Generated ${searchVariants.length} search variants:`,
        searchVariants
      );

      let allResults: IGDBSearchResult[] = [];
      let bestResults: IGDBSearchResult[] = [];

      // Durchsuche alle Varianten
      for (const variant of searchVariants) {
        console.log(`[IGDB] Searching for variant: "${variant}"`);
        const results = await searchGames(variant, 5);

        if (results.length > 0) {
          console.log(
            `[IGDB] Found ${results.length} results for "${variant}"`
          );
          allResults.push(...results);
          // Prüfe sofort, ob wir eine sehr gute Übereinstimmung haben
          for (const result of results) {
            const score = calculateAdvancedSimilarity(
              variant.toLowerCase(),
              result.name.toLowerCase()
            );
            console.log(
              `[IGDB] Variant "${variant}" vs "${
                result.name
              }" (score: ${score.toFixed(3)})`
            );

            // Bei sehr hoher Übereinstimmung sofort verwenden
            if (score >= 0.9) {
              console.log(
                `[IGDB] Excellent match found immediately: "${
                  result.name
                }" (score: ${score.toFixed(3)})`
              );
              return await getGameDetails(result.id);
            }

            if (score >= 0.7) {
              bestResults.push(result);
            }
          }
        } else {
          console.log(`[IGDB] No results for variant: "${variant}"`);
        }
      }

      // Falls keine Ergebnisse gefunden wurden, versuche partielle Suche
      if (allResults.length === 0) {
        console.log(
          `[IGDB] No exact matches found, trying partial search for: "${gameName}"`
        );
        const partialResults = await partialSearch(gameName);
        allResults.push(...partialResults);

        if (allResults.length === 0) {
          console.log(
            `[IGDB] No search results found for any variant or partial search of: "${gameName}"`
          );
          return null;
        }
      }

      // Entferne Duplikate basierend auf ID
      const uniqueResults = allResults.filter(
        (result, index, self) =>
          index === self.findIndex(r => r.id === result.id)
      );

      console.log(`[IGDB] Total unique results found: ${uniqueResults.length}`);

      // Verwende beste Ergebnisse falls vorhanden, sonst alle
      const resultsToCheck =
        bestResults.length > 0 ? bestResults : uniqueResults;

      // Finde beste Übereinstimmung basierend auf Namen-Ähnlichkeit
      let bestMatch = resultsToCheck[0];
      let bestScore = 0;
      let bestVariant = '';
      // Teste gegen alle Such-Varianten für beste Übereinstimmung
      for (const result of resultsToCheck) {
        for (const variant of searchVariants) {
          const score = calculateAdvancedSimilarity(
            variant.toLowerCase(),
            result.name.toLowerCase()
          );

          if (score > bestScore) {
            bestMatch = result;
            bestScore = score;
            bestVariant = variant;
          }
        }

        // Teste auch gegen den ursprünglichen Namen
        const originalScore = calculateAdvancedSimilarity(
          gameName.toLowerCase(),
          result.name.toLowerCase()
        );

        if (originalScore > bestScore) {
          bestMatch = result;
          bestScore = originalScore;
          bestVariant = gameName;
        }
      }

      console.log(
        `[IGDB] Best match: "${
          bestMatch.name
        }" vs variant "${bestVariant}" (score: ${bestScore.toFixed(3)})`
      ); // Lowered threshold for better matching with improved similarity scoring
      const threshold = 0.3; // Noch niedriger wegen verbesserter Ähnlichkeitsberechnung
      if (bestScore < threshold) {
        console.log(
          `[IGDB] Best score ${bestScore.toFixed(
            3
          )} below threshold ${threshold}, rejecting match`
        );
        return null;
      }

      console.log(
        `[IGDB] Selected best match: "${
          bestMatch.name
        }" (score: ${bestScore.toFixed(3)})`
      );

      // Detaillierte Informationen für die beste Übereinstimmung abrufen
      return await getGameDetails(bestMatch.id);
    } catch (error) {
      console.error('Fehler bei IGDB Spiel-Matching:', error);
      return null;
    }
  };

  // Partielle Suche als Fallback
  const partialSearch = async (
    gameName: string
  ): Promise<IGDBSearchResult[]> => {
    try {
      const words = cleanSteamGameName(gameName)
        .split(' ')
        .filter(word => word.length > 3) // Nur längere Wörter
        .slice(0, 3); // Maximal 3 Wörter

      if (words.length === 0) return [];

      console.log(
        `[IGDB] Trying partial search with words: [${words.join(', ')}]`
      );

      const results: IGDBSearchResult[] = [];

      // Suche nach einzelnen wichtigen Wörtern
      for (const word of words) {
        const wordResults = await searchGames(word, 10);
        console.log(
          `[IGDB] Partial search for "${word}" found ${wordResults.length} results`
        );
        results.push(...wordResults);
      }

      // Entferne Duplikate und filtere relevante Ergebnisse
      const uniqueResults = results.filter(
        (result, index, self) =>
          index === self.findIndex(r => r.id === result.id)
      );

      // Filtere Ergebnisse, die mindestens ein Wort aus dem Original enthalten
      const relevantResults = uniqueResults.filter(result => {
        const resultWords = result.name.toLowerCase().split(' ');
        return words.some(word =>
          resultWords.some(
            rWord =>
              rWord.includes(word.toLowerCase()) ||
              word.toLowerCase().includes(rWord)
          )
        );
      });

      console.log(
        `[IGDB] Partial search found ${relevantResults.length} relevant results`
      );
      return relevantResults.slice(0, 15); // Maximal 15 Ergebnisse
    } catch (error) {
      console.error('[IGDB] Error in partial search:', error);
      return [];
    }
  };

  // Spielinformationen zu strukturierten Daten konvertieren
  export const enrichGameData = async (
    gameName: string,
    platformName?: string
  ): Promise<EnrichedGameData> => {
    try {
      const igdbGame = await findBestMatch(gameName, platformName);

      if (!igdbGame) {
        return {};
      }

      const enrichedData: EnrichedGameData = {
        igdbId: igdbGame.id
      };

      // Beschreibung
      if (igdbGame.summary) {
        enrichedData.description = igdbGame.summary;
      }

      // Cover-Bild
      if (igdbGame.cover?.url) {
        enrichedData.coverUrl = getImageUrl(igdbGame.cover.url, 'cover_big');
      }

      // Screenshots
      if (igdbGame.screenshots && igdbGame.screenshots.length > 0) {
        enrichedData.screenshotUrls = igdbGame.screenshots
          .slice(0, 5) // Maximal 5 Screenshots
          .map(screenshot => getImageUrl(screenshot.url, 'screenshot_med'));
      }

      // Genres
      if (igdbGame.genres && igdbGame.genres.length > 0) {
        enrichedData.genres = igdbGame.genres.map(genre => genre.name);
      }

      // Developer und Publisher
      if (
        igdbGame.involved_companies &&
        igdbGame.involved_companies.length > 0
      ) {
        const developer = igdbGame.involved_companies.find(
          company => company.developer
        );
        const publisher = igdbGame.involved_companies.find(
          company => company.publisher
        );

        if (developer) {
          enrichedData.developer = developer.company.name;
        }
        if (publisher) {
          enrichedData.publisher = publisher.company.name;
        }
      }

      // Release-Datum
      if (igdbGame.first_release_date) {
        enrichedData.releaseDate = new Date(igdbGame.first_release_date * 1000);
      } else if (igdbGame.release_dates && igdbGame.release_dates.length > 0) {
        // Nimm das früheste Release-Datum
        const earliestDate = Math.min(
          ...igdbGame.release_dates.map(rd => rd.date)
        );
        enrichedData.releaseDate = new Date(earliestDate * 1000);
      } // Rating (verwende aggregated_rating falls verfügbar, sonst total_rating)
      if (
        igdbGame.aggregated_rating &&
        igdbGame.aggregated_rating_count &&
        igdbGame.aggregated_rating_count > 0
      ) {
        enrichedData.rating = Math.round(igdbGame.aggregated_rating / 10); // Konvertiere zu 1-10 Skala
        console.log(
          `[IGDB] Using aggregated_rating: ${igdbGame.aggregated_rating} -> ${enrichedData.rating}`
        );
      } else if (
        igdbGame.total_rating &&
        igdbGame.total_rating_count &&
        igdbGame.total_rating_count > 0
      ) {
        enrichedData.rating = Math.round(igdbGame.total_rating / 10);
        console.log(
          `[IGDB] Using total_rating: ${igdbGame.total_rating} -> ${enrichedData.rating}`
        );
      } else if (
        igdbGame.rating &&
        igdbGame.rating_count &&
        igdbGame.rating_count > 0
      ) {
        enrichedData.rating = Math.round(igdbGame.rating / 10);
        console.log(
          `[IGDB] Using user_rating: ${igdbGame.rating} -> ${enrichedData.rating}`
        );
      } else {
        console.log(`[IGDB] No valid rating found for game`);
      }

      return enrichedData;
    } catch (error) {
      console.error('Fehler beim Anreichern der Spieledaten:', error);
      return {};
    }
  };
}

// Hilfsfunktion zur Berechnung der String-Ähnlichkeit (Levenshtein Distance)
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) {
    return 1.0;
  }

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Erweiterte Ähnlichkeitsberechnung mit Bonus für partielle Übereinstimmungen
function calculateAdvancedSimilarity(str1: string, str2: string): number {
  // Grundscore basierend auf Levenshtein-Distanz
  let baseScore = calculateSimilarity(str1, str2);

  const words1 = str1
    .toLowerCase()
    .split(' ')
    .filter(w => w.length > 2);
  const words2 = str2
    .toLowerCase()
    .split(' ')
    .filter(w => w.length > 2);

  // Bonus für exakte Wort-Übereinstimmungen
  let exactWordMatches = 0;
  let partialWordMatches = 0;

  for (const word1 of words1) {
    for (const word2 of words2) {
      if (word1 === word2) {
        exactWordMatches++;
      } else if (word1.includes(word2) || word2.includes(word1)) {
        partialWordMatches++;
      }
    }
  }

  // Bonus-Score basierend auf Wort-Übereinstimmungen
  const maxWords = Math.max(words1.length, words2.length);
  if (maxWords > 0) {
    const wordMatchScore =
      (exactWordMatches * 2 + partialWordMatches) / (maxWords * 2);
    baseScore = Math.max(baseScore, wordMatchScore * 0.8); // Wort-Matches können bis zu 80% Score erreichen
  }

  // Bonus für Start-Übereinstimmungen
  if (
    str1.toLowerCase().startsWith(str2.toLowerCase()) ||
    str2.toLowerCase().startsWith(str1.toLowerCase())
  ) {
    baseScore += 0.1;
  }

  // Bonus für enthaltene Substrings
  if (
    str1.toLowerCase().includes(str2.toLowerCase()) ||
    str2.toLowerCase().includes(str1.toLowerCase())
  ) {
    baseScore += 0.05;
  }

  return Math.min(baseScore, 1.0); // Cap bei 1.0
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}
