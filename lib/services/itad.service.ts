// IsThereAnyDeal (ITAD) API Service
export namespace ITADService {
  const BASE_URL = 'https://api.isthereanydeal.com';
  const API_KEY = process.env.ITAD_API_KEY || '';

  /**
   * Basis-Request-Methode für ITAD API
   * @param endpoint API Endpoint
   * @param options Request Optionen
   * @returns Response Data
   */
  async function apiRequest<T>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      body?: any;
      params?: Record<string, any>;
      requiresAuth?: boolean;
    } = {}
  ): Promise<T> {
    try {
      const {
        method = 'GET',
        body,
        params = {},
        requiresAuth = false
      } = options;

      const url = new URL(`${BASE_URL}${endpoint}`);

      // API Key für authentifizierte Requests
      if (requiresAuth || API_KEY) {
        url.searchParams.append('key', API_KEY);
      }

      // Query Parameter hinzufügen
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            url.searchParams.append(key, value.join(','));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });

      const headers: HeadersInit = {
        Accept: 'application/json',
        'User-Agent': 'Nexus-Game-Manager/1.0'
      };

      const requestOptions: RequestInit = {
        method,
        headers
      };

      // Body für POST/PUT Requests
      if (body && (method === 'POST' || method === 'PUT')) {
        headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url.toString(), requestOptions);

      if (!response.ok) {
        throw new Error(
          `ITAD API Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('ITAD API Request failed:', error);
      throw new Error(
        `Failed to fetch from ITAD API: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  /**
   * Sucht nach Spielen anhand des Titels
   * @param title Der Spieltitel nach dem gesucht werden soll
   * @param results Maximale Anzahl der Ergebnisse (default: 20)
   * @returns Array der gefundenen Spiele
   */
  export async function searchGamesByTitle(
    title: string,
    results: number = 20
  ): Promise<ITADGameSearch[]> {
    try {
      if (!title.trim()) {
        throw new Error('Game title cannot be empty');
      }

      const params = {
        title: title.trim(),
        results: Math.min(results, 100)
      };

      return await apiRequest<ITADGameSearch[]>('/games/search/v1', {
        params,
        requiresAuth: true
      });
    } catch (error) {
      console.error('Error searching games on ITAD:', error);
      throw new Error(
        `Failed to search games: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  export async function getGamePrice(
    gameIds: string[]
  ): Promise<ITADGamePrices[]> {
    try {
      if (!gameIds.length) {
        throw new Error('Game IDs array cannot be empty');
      }
      const params = {
        deals: true,
        vouchers: true
      };

      return await apiRequest<ITADGamePrices[]>('/games/prices/v3', {
        method: 'POST',
        body: gameIds.slice(0, 200), // API Limit: max 200
        params,
        requiresAuth: true
      });
    } catch (error) {
      console.error('Error fetching game prices from ITAD:', error);
      throw new Error(
        `Failed to fetch game prices: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  /**
   * Holt Preis-Übersicht für spezifische Spiele
   * @param gameIds Array der ITAD Game IDs
   * @param options Zusätzliche Optionen
   * @returns Preis-Übersicht mit aktuellen Preisen und Bundles
   */
  export async function getPriceOverview(
    gameIds: string[],
    options: {
      country?: string;
      shops?: number[];
      vouchers?: boolean;
    } = {}
  ): Promise<ITADPriceOverview> {
    try {
      if (!gameIds.length) {
        throw new Error('Game IDs array cannot be empty');
      }

      const params = {
        country: options.country || 'DE',
        shops: options.shops,
        vouchers: options.vouchers !== false
      };

      return await apiRequest<ITADPriceOverview>('/games/overview/v2', {
        method: 'POST',
        body: gameIds.slice(0, 200),
        params,
        requiresAuth: true
      });
    } catch (error) {
      console.error('Error fetching price overview from ITAD:', error);
      throw new Error(
        `Failed to fetch price overview: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
}
