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

export interface IGDBSearchResult {
  id: number;
  name: string;
  first_release_date?: number;
  platforms?: Array<{
    id: number;
    name: string;
  }>;
}

export interface IGDBGameData {
  id: number;
  name: string;
  summary?: string;
  coverUrl?: string;
  screenshotUrls?: string[];
  genres?: string[];
  developers?: string[];
  publishers?: string[];
  firstReleaseDate?: Date;
  totalRating?: number;
  platforms?: string[];
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

  /**
   * Nach Spielen in der IGDB API suchen
   */
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

  /**
   * Detaillierte Spielinformationen von IGDB API abrufen
   */
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
  };

  /**
   * IGDB URL zu vollständiger Bild-URL konvertieren
   */
  export const getImageUrl = (
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

  /**
   * ZENTRALE FUNKTION: Spiel anhand Titel finden mit dynamischer Titel-Anpassung
   * Grund: Einzige Schnittstelle für alle Spielsuchen (Steam-Import, Deal-Sync, etc.)
   */
  export const findGameByTitle = async (
    gameTitle: string
  ): Promise<IGDBGameData | null> => {
    console.log(`🔍 [IGDB] Starting search for: "${gameTitle}"`);

    const maxAttempts = 8;
    let bestResult: IGDBGameData | null = null;
    let bestScore = 0;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      // Grund: Dynamische Titel-Varianten erstellen
      const searchVariant = generateTitleVariant(gameTitle, attempt);

      if (!searchVariant) {
        console.log(
          `❌ [IGDB] No more variant for current attempt: ${attempt}`
        );
        continue;
      }

      console.log(
        `🔄 [IGDB] Attempt ${attempt + 1}: Searching for "${searchVariant}"`
      );

      try {
        // Grund: IGDB API Suche mit aktueller Variante
        const searchResults = await searchGames(searchVariant, 20);

        if (searchResults.length === 0) {
          console.log(`❌ [IGDB] No results for "${searchVariant}"`);
          continue;
        }

        // Grund: Prüfe auf exakte Übereinstimmung
        const exactMatch = searchResults.find(
          game =>
            game.name.toLowerCase().trim() ===
            searchVariant.toLowerCase().trim()
        );

        if (exactMatch) {
          console.log(`✅ [IGDB] Exact match found: ${exactMatch.name}`);
          const gameDetails = await getGameDetails(exactMatch.id);
          if (gameDetails) {
            return convertIGDBGame(gameDetails);
          }
        }

        // Grund: Bewerte das beste Ergebnis dieser Suche
        let topResult = searchResults[0];
        let topScore = 0;

        // Finde bestes Match in den Ergebnissen
        for (const result of searchResults) {
          const normalizedQuery = searchVariant.toLowerCase().trim();
          const normalizedName = result.name.toLowerCase().trim();

          let score = 0;
          if (normalizedName === normalizedQuery) {
            score = 1.0;
          } else if (normalizedName.startsWith(normalizedQuery)) {
            score = 0.9;
          } else if (normalizedName.includes(normalizedQuery)) {
            score = 0.8;
          } else {
            // Wort-basierte Ähnlichkeit
            const queryWords = normalizedQuery.split(/\s+/);
            const nameWords = normalizedName.split(/\s+/);
            const matchingWords = queryWords.filter(word =>
              nameWords.some(
                nameWord => nameWord.includes(word) || word.includes(nameWord)
              )
            );
            score = matchingWords.length / queryWords.length;
          }

          if (score > topScore) {
            topScore = score;
            topResult = result;
          }
        }

        if (topResult && topScore > bestScore) {
          console.log(
            `📈 [IGDB] New best result: "${
              topResult.name
            }" (Score: ${topScore.toFixed(2)})`
          );

          // Hole Details für das beste Ergebnis
          const gameDetails = await getGameDetails(topResult.id);
          if (gameDetails) {
            bestResult = convertIGDBGame(gameDetails);
            bestScore = topScore;
          }

          // Grund: Bei sehr gutem Score (>80%) direkt zurückgeben
          if (topScore > 0.8) {
            console.log(
              `✅ [IGDB] High confidence match found: ${topResult.name}`
            );
            return bestResult;
          }
        }
      } catch (error) {
        console.error(
          `❌ [IGDB] Error searching for "${searchVariant}":`,
          error
        );
        continue;
      }
    }

    if (bestResult) {
      console.log(
        `✅ [IGDB] Best match found: "${
          bestResult.name
        }" (Score: ${bestScore.toFixed(2)})`
      );
    } else {
      console.log(
        `❌ [IGDB] No suitable match found for "${gameTitle}" after ${maxAttempts} attempts`
      );
    }

    return bestResult;
  };

  /**
   * Erstellt Titel-Varianten für progressive Suche
   * Grund: Interne Logik für dynamische Titel-Anpassung
   */
  const generateTitleVariant = (
    originalTitle: string,
    attemptNumber: number
  ): string | null => {
    const cleanedTitle = originalTitle.trim();

    if (attemptNumber === 0) {
      return cleanedTitle;
    }

    if (attemptNumber === 1) {
      // Entferne Edition-Zusätze
      const editionRegex =
        /\s*[-:]?\s*(Gold|Deluxe|Ultimate|Complete|GOTY|Premium|Special|Enhanced|Definitive|Remastered|HD|Director's Cut|Game of the Year|Collector's|Digital)\s*(Edition)?$/gi;
      const cleaned = cleanedTitle.replace(editionRegex, '').trim();
      if (cleaned.length >= 3 && cleaned !== cleanedTitle) {
        return cleaned;
      }
    }

    if (attemptNumber === 2) {
      // Entferne Text nach Doppelpunkt oder Bindestrich
      const colonIndex = cleanedTitle.indexOf(': ');
      if (colonIndex > 0) {
        const beforeColon = cleanedTitle.substring(0, colonIndex).trim();
        if (beforeColon.length >= 3) return beforeColon;
      }

      const dashIndex = cleanedTitle.indexOf(' - ');
      if (dashIndex > 0) {
        const beforeDash = cleanedTitle.substring(0, dashIndex).trim();
        if (beforeDash.length >= 3) return beforeDash;
      }
    }

    if (attemptNumber === 3) {
      // Entferne Jahreszahlen in Klammern
      const withoutYear = cleanedTitle.replace(/\s*\(\d{4}\)\s*/g, '').trim();
      if (withoutYear.length >= 3 && withoutYear !== cleanedTitle) {
        return withoutYear;
      }
    }

    if (attemptNumber >= 4) {
      // Progressive Wort-Entfernung von rechts
      const words = cleanedTitle.split(/\s+/);
      const wordsToRemove = attemptNumber - 3;

      if (words.length > wordsToRemove) {
        const shortenedWords = words.slice(0, words.length - wordsToRemove);
        const shortened = shortenedWords.join(' ').trim();
        if (shortened.length >= 2) return shortened;
      }
    }

    return null;
  };

  /**
   * IGDB Game zu standardisiertem Game-Format konvertieren
   */
  export const convertIGDBGame = (igdbGame: IGDBGame): IGDBGameData => {
    // Entwickler extrahieren
    const developers =
      igdbGame.involved_companies
        ?.filter(company => company.developer)
        .map(company => company.company.name) || [];

    // Publisher extrahieren
    const publishers =
      igdbGame.involved_companies
        ?.filter(company => company.publisher)
        .map(company => company.company.name) || [];

    // Genres extrahieren
    const genres = igdbGame.genres?.map(genre => genre.name) || [];

    // Plattformen extrahieren
    const platforms = igdbGame.platforms?.map(platform => platform.name) || [];

    // Screenshots zu URLs konvertieren
    const screenshotUrls =
      igdbGame.screenshots
        ?.map(screenshot => getImageUrl(screenshot.url, 'screenshot_big'))
        .filter(url => url) || [];

    // Cover-URL konvertieren
    const coverUrl = igdbGame.cover
      ? getImageUrl(igdbGame.cover.url, 'cover_big')
      : undefined;

    // Veröffentlichungsdatum konvertieren
    const firstReleaseDate = igdbGame.first_release_date
      ? new Date(igdbGame.first_release_date * 1000)
      : undefined;

    // Bewertung - bevorzuge total_rating, dann aggregated_rating
    const totalRating = igdbGame.total_rating || igdbGame.aggregated_rating;

    return {
      id: igdbGame.id,
      name: igdbGame.name,
      summary: igdbGame.summary,
      coverUrl,
      screenshotUrls,
      genres,
      developers,
      publishers,
      firstReleaseDate,
      totalRating,
      platforms
    };
  };
}
