import { TRPCError } from '@trpc/server';
import { useGameEnrichment } from '~/composables/useGameEnrichment';

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
   * Nutzt useGameEnrichment Composable für komplexe Matching-Logik
   */
  export const findBestMatch = async (
    gameName: string,
    platformName?: string
  ): Promise<IGDBGame | null> => {
    const { findBestGameMatch } = useGameEnrichment();

    return await findBestGameMatch(
      gameName,
      searchGames,
      getGameDetails,
      platformName
    );
  };

  /**
   * Spielinformationen zu strukturierten Daten konvertieren
   * Nutzt useGameEnrichment Composable für Datenkonvertierung
   */
  export const enrichGameData = async (
    gameName: string,
    platformName?: string
  ): Promise<EnrichedGameData> => {
    try {
      const igdbGame = await findBestMatch(gameName, platformName);

      if (!igdbGame) {
        return {};
      }

      const { convertToEnrichedData } = useGameEnrichment();
      return convertToEnrichedData(igdbGame);
    } catch (error) {
      console.error('Fehler beim Anreichern der Spieledaten:', error);
      return {};
    }
  };
}
