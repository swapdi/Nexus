export namespace IGDBService {
  // Cache für Access Token
  let cachedAccessToken: string | null = null;
  let tokenExpiry: number = 0;
  // IGDB Client Credentials aus Umgebungsvariablen
  const getIGDBCredentials = () => {
    const clientId = process.env.IGDB_CLIENT_ID;
    const clientSecret = process.env.IGDB_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      throw new Error(`Client ID und Secret für IGDB nicht konfiguriert`);
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
      throw new Error(`Token Request fehlgeschlagen`);
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
      const headers = await getHeaders();
      const body = `
        search "${query}";
        fields id, name, first_release_date, platforms.name, genres.name, cover.url;
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
        fields id, name, summary, cover.url, screenshots.url, videos.video_id, videos.name,
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
   * Normalisiert Spieltitel für bessere Vergleiche
   */
  const normalizeGameTitle = (title: string): string => {
    return (
      title
        .toLowerCase()
        .trim()
        // Entferne häufige Zeichen die Probleme verursachen
        .replace(/[™®©]/g, '')
        // Normalisiere Apostrophe und Anführungszeichen
        .replace(/['']/g, "'")
        .replace(/[""]/g, '"')
        // Entferne mehrfache Leerzeichen
        .replace(/\s+/g, ' ')
        .trim()
    );
  };

  /**
   * Berechnet String-Ähnlichkeit zwischen zwei Texten
   * Verwendet eine Kombination aus Wort-Übereinstimmungen und Levenshtein-Distanz
   */
  const calculateStringSimilarity = (query: string, target: string): number => {
    // Wort-basierte Ähnlichkeit
    const queryWords = query.split(/\s+/).filter(w => w.length > 0);
    const targetWords = target.split(/\s+/).filter(w => w.length > 0);

    if (queryWords.length === 0 || targetWords.length === 0) return 0;

    // Berechne prozentuale Übereinstimmung der Wörter
    let totalMatches = 0;

    for (const queryWord of queryWords) {
      let bestWordMatch = 0;

      for (const targetWord of targetWords) {
        let wordScore = 0;

        // Exakte Übereinstimmung
        if (queryWord === targetWord) {
          wordScore = 1.0;
        }
        // Eines enthält das andere
        else if (
          queryWord.includes(targetWord) ||
          targetWord.includes(queryWord)
        ) {
          const longer =
            queryWord.length > targetWord.length ? queryWord : targetWord;
          const shorter =
            queryWord.length <= targetWord.length ? queryWord : targetWord;
          wordScore = shorter.length / longer.length;
        }
        // Levenshtein-basierte Ähnlichkeit für längere Wörter
        else if (queryWord.length >= 3 && targetWord.length >= 3) {
          const distance = levenshteinDistance(queryWord, targetWord);
          const maxLen = Math.max(queryWord.length, targetWord.length);
          const similarity = 1 - distance / maxLen;
          // Nur akzeptieren wenn Ähnlichkeit hoch genug ist
          if (similarity >= 0.8) {
            wordScore = similarity;
          }
        }

        if (wordScore > bestWordMatch) {
          bestWordMatch = wordScore;
        }
      }

      totalMatches += bestWordMatch;
    }

    // Durchschnittliche Wort-Übereinstimmung
    const avgWordMatch = totalMatches / queryWords.length;

    // Zusätzliche Strafe für sehr unterschiedliche Wortanzahl
    const wordCountPenalty =
      Math.abs(queryWords.length - targetWords.length) /
      Math.max(queryWords.length, targetWords.length);

    return Math.max(0, avgWordMatch - wordCountPenalty * 0.3);
  };

  /**
   * Berechnet Levenshtein-Distanz zwischen zwei Strings
   */
  const levenshteinDistance = (str1: string, str2: string): number => {
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
  };

  /**
   * ZENTRALE FUNKTION: Spiel anhand Titel finden mit dynamischer Titel-Anpassung
   * Grund: Einzige Schnittstelle für alle Spielsuchen (Steam-Import, Deal-Sync, etc.)
   */
  export const findGameByTitle = async (
    gameTitle: string
  ): Promise<IGDBGameData | null> => {
    const maxAttempts = 8;
    let bestResult: IGDBGameData | null = null;
    let bestScore = 0;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      // Grund: Dynamische Titel-Varianten erstellen
      const searchVariant = generateTitleVariant(gameTitle, attempt);
      if (!searchVariant) {
        continue;
      }
      try {
        // Grund: IGDB API Suche mit aktueller Variante
        const searchResults = await searchGames(searchVariant, 20);
        if (searchResults.length === 0) {
          continue;
        }
        // Grund: Prüfe auf exakte Übereinstimmung
        const exactMatch = searchResults.find(
          game =>
            normalizeGameTitle(game.name) === normalizeGameTitle(searchVariant)
        );
        if (exactMatch) {
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
          const normalizedQuery = normalizeGameTitle(searchVariant);
          const normalizedName = normalizeGameTitle(result.name);
          let score = 0;

          // Exakte Übereinstimmung (höchste Priorität)
          if (normalizedName === normalizedQuery) {
            score = 1.0;
          }
          // Beginnt mit Suchbegriff
          else if (normalizedName.startsWith(normalizedQuery)) {
            score = 0.9;
          }
          // Enthält Suchbegriff
          else if (normalizedName.includes(normalizedQuery)) {
            score = 0.7;
          } else {
            // Erweiterte Wort-basierte Ähnlichkeitsberechnung
            score = calculateStringSimilarity(normalizedQuery, normalizedName);
          }

          // Zusätzliche Bewertung: Länge der Namen berücksichtigen
          // Spiele mit ähnlicher Länge werden bevorzugt
          const lengthDiff = Math.abs(
            normalizedQuery.length - normalizedName.length
          );
          const lengthPenalty = lengthDiff > normalizedQuery.length ? 0.3 : 0.1;
          score = Math.max(0, score - lengthPenalty);

          if (score > topScore) {
            topScore = score;
            topResult = result;
          }
        }
        if (topResult && topScore > bestScore) {
          // Hole Details für das beste Ergebnis
          const gameDetails = await getGameDetails(topResult.id);
          if (gameDetails) {
            bestResult = convertIGDBGame(gameDetails);
            bestScore = topScore;
          }
          // Grund: Bei sehr gutem Score (>70%) direkt zurückgeben
          if (topScore > 0.7) {
            return bestResult;
          }
        }
      } catch (error) {
        continue;
      }
    }

    // Nur Ergebnisse zurückgeben, die einen Mindest-Ähnlichkeitsscore erreichen
    if (bestResult && bestScore >= 0.5) {
      console.log(
        `IGDB Match gefunden: "${gameTitle}" -> "${
          bestResult.name
        }" (Score: ${bestScore.toFixed(2)})`
      );
      return bestResult;
    }

    console.log(
      `Kein ausreichend ähnliches Spiel für "${gameTitle}" gefunden (Best Score: ${bestScore.toFixed(
        2
      )})`
    );
    return null;
  };
  /**
   * Erstellt Titel-Varianten für progressive Suche
   * Grund: Interne Logik für dynamische Titel-Anpassung
   */
  const generateTitleVariant = (
    originalTitle: string,
    attemptNumber: number
  ): string | null => {
    const cleanedTitle = normalizeGameTitle(originalTitle);
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

    // Videos zu YouTube URLs konvertieren
    const videoUrls =
      igdbGame.videos
        ?.map(video => `https://www.youtube.com/watch?v=${video.video_id}`)
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
      videoUrls,
      genres,
      developers,
      publishers,
      firstReleaseDate,
      totalRating,
      platforms
    };
  };
}
