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
          'IGDB Search API Error:',
          response.status,
          response.statusText
        );
        return [];
      }

      const games: IGDBSearchResult[] = await response.json();
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
  };

  // Spiel nach Namen suchen und beste Übereinstimmung finden
  export const findBestMatch = async (
    gameName: string,
    platformName?: string
  ): Promise<IGDBGame | null> => {
    try {
      // Bereinige den Spielenamen für bessere Suchergebnisse
      const cleanName = gameName
        .replace(/[™®©]/g, '') // Entferne Trademark-Zeichen
        .replace(/\s+/g, ' ') // Normalisiere Leerzeichen
        .trim();

      // Suche nach dem Spiel
      const searchResults = await searchGames(cleanName, 5);

      if (searchResults.length === 0) {
        return null;
      }

      // Finde beste Übereinstimmung basierend auf Namen-Ähnlichkeit
      let bestMatch = searchResults[0];
      let bestScore = calculateSimilarity(
        cleanName.toLowerCase(),
        bestMatch.name.toLowerCase()
      );

      for (const result of searchResults.slice(1)) {
        const score = calculateSimilarity(
          cleanName.toLowerCase(),
          result.name.toLowerCase()
        );
        if (score > bestScore) {
          bestMatch = result;
          bestScore = score;
        }
      }

      // Nur akzeptieren wenn die Ähnlichkeit hoch genug ist
      if (bestScore < 0.6) {
        return null;
      }

      // Detaillierte Informationen für die beste Übereinstimmung abrufen
      return await getGameDetails(bestMatch.id);
    } catch (error) {
      console.error('Fehler bei IGDB Spiel-Matching:', error);
      return null;
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
      }

      // Rating (verwende aggregated_rating falls verfügbar, sonst total_rating)
      if (
        igdbGame.aggregated_rating &&
        igdbGame.aggregated_rating_count &&
        igdbGame.aggregated_rating_count > 0
      ) {
        enrichedData.rating = Math.round(igdbGame.aggregated_rating / 10); // Konvertiere zu 1-10 Skala
      } else if (
        igdbGame.total_rating &&
        igdbGame.total_rating_count &&
        igdbGame.total_rating_count > 0
      ) {
        enrichedData.rating = Math.round(igdbGame.total_rating / 10);
      } else if (
        igdbGame.rating &&
        igdbGame.rating_count &&
        igdbGame.rating_count > 0
      ) {
        enrichedData.rating = Math.round(igdbGame.rating / 10);
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
