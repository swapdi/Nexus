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
   * Spiel nach Namen suchen und beste Übereinstimmung finden
   */
  export const findBestMatch = async (
    gameName: string,
    platformName?: string
  ): Promise<IGDBGame | null> => {
    try {
      // Suche nach Spielen
      const searchResults = await searchGames(gameName, 10);

      if (searchResults.length === 0) {
        return null;
      }

      // Finde beste Übereinstimmung basierend auf Name
      const normalizedSearchName = gameName.toLowerCase().trim();

      let bestMatch = searchResults[0];
      let bestScore = 0;

      for (const result of searchResults) {
        const normalizedResultName = result.name.toLowerCase().trim();

        // Exakte Übereinstimmung
        if (normalizedResultName === normalizedSearchName) {
          bestMatch = result;
          break;
        }

        // Ähnlichkeit berechnen (einfache Implementierung)
        const similarity = calculateSimilarity(
          normalizedSearchName,
          normalizedResultName
        );

        if (similarity > bestScore) {
          bestScore = similarity;
          bestMatch = result;
        }
      }

      // Hole detaillierte Informationen für das beste Match
      return await getGameDetails(bestMatch.id);
    } catch (error) {
      console.error('Fehler beim Suchen des besten Matches:', error);
      return null;
    }
  };

  /**
   * Einfache Ähnlichkeitsberechnung zwischen zwei Strings
   */
  const calculateSimilarity = (str1: string, str2: string): number => {
    if (str1 === str2) return 1;

    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1;

    const editDistance = getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  /**
   * Levenshtein-Distanz zwischen zwei Strings
   */
  const getEditDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = [];

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

  /**
   * Spiel bei IGDB suchen und als standardisierte Daten zurückgeben
   */
  export const searchAndConvertGame = async (
    gameName: string,
    platformName?: string
  ): Promise<IGDBGameData | null> => {
    try {
      // Suche nach dem besten Match bei IGDB
      const igdbGame = await findBestMatch(gameName, platformName);

      if (!igdbGame) {
        console.log(`[IGDB] Kein Match gefunden für: ${gameName}`);
        return null;
      }

      // Konvertiere IGDB-Daten zu standardisiertem Format
      const gameData = convertIGDBGame(igdbGame);

      console.log(
        `[IGDB] Spiel gefunden: ${gameData.name} (ID: ${gameData.id})`
      );
      return gameData;
    } catch (error) {
      console.error('Fehler beim Suchen/Konvertieren des Spiels:', error);
      return null;
    }
  };
}
