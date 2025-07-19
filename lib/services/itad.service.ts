// IsThereAnyDeal (ITAD) API Service
// Grund: Zentrale Schnittstelle zur ITAD API für Deal-Aggregation, ähnlich wie CheapShark Service

export interface ITADGame {
  id: string;
  slug: string;
  title: string;
  type: 'game' | 'dlc' | 'bundle';
  mature: boolean;
  assets?: {
    boxart?: string;
    banner145?: string;
    banner300?: string;
    banner400?: string;
    banner600?: string;
  };
}

export interface ITADGameSearch {
  id: string;
  slug: string;
  title: string;
  type: 'game' | 'dlc' | 'bundle';
  mature: boolean;
  assets?: {
    boxart?: string;
    banner145?: string;
    banner300?: string;
  };
}

export interface ITADDeal {
  shop: {
    id: number;
    name: string;
  };
  price: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  regular: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  cut: number;
  voucher?: string;
  flag?: string;
  url: string;
  expiry?: string; // ISO date string
}

export interface ITADPrice {
  price: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  regular?: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  cut?: number;
  shop: {
    id: number;
    name: string;
  };
  url: string;
}

export interface ITADGamePrices {
  id: string;
  historyLow?: {
    amount: number;
    amountInt: number;
    currency: string;
  };
  deals: ITADDeal[];
}

export interface ITADPriceOverview {
  prices: ITADGamePrices[];
  bundles: Array<{
    id: number;
    title: string;
    url: string;
    price: {
      amount: number;
      currency: string;
    };
    games: number;
  }>;
}

export interface ITADDealsListResponse {
  nextOffset?: number;
  hasMore: boolean;
  list: Array<{
    id: string;
    slug: string;
    title: string;
    type: 'game' | 'dlc';
    mature: boolean;
    shop: {
      id: number;
      name: string;
    };
    price: {
      amount: number;
      currency: string;
    };
    regular: {
      amount: number;
      currency: string;
    };
    cut: number;
    url: string;
    assets?: {
      boxart?: string;
    };
  }>;
}

export interface ITADWaitlistGame {
  id: string;
  slug: string;
  title: string;
  type: 'game' | 'dlc';
  mature: boolean;
  added: string; // ISO date string
  assets?: {
    boxart?: string;
  };
}

export interface ITADShop {
  id: number;
  title: string;
  deals: number;
  games: number;
  update: string | null;
}

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
        vouchers: options.vouchers !== false // Default: true
      };

      return await apiRequest<ITADPriceOverview>('/games/overview/v2', {
        method: 'POST',
        body: gameIds.slice(0, 200), // API Limit: max 200
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

  /**
   * Fügt Spiele zur Waitlist hinzu (OAuth erforderlich)
   * @param gameIds Array der ITAD Game IDs
   * @returns Success status
   */
  export async function addGamesToWaitlist(gameIds: string[]): Promise<void> {
    try {
      if (!gameIds.length) {
        throw new Error('Game IDs array cannot be empty');
      }

      await apiRequest<void>('/waitlist/games/v1', {
        method: 'PUT',
        body: gameIds,
        requiresAuth: true
      });
    } catch (error) {
      console.error('Error adding games to ITAD waitlist:', error);
      throw new Error(
        `Failed to add games to waitlist: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  /**
   * Entfernt Spiele aus der Waitlist (OAuth erforderlich)
   * @param gameIds Array der ITAD Game IDs
   * @returns Success status
   */
  export async function removeGamesFromWaitlist(
    gameIds: string[]
  ): Promise<void> {
    try {
      if (!gameIds.length) {
        throw new Error('Game IDs array cannot be empty');
      }

      await apiRequest<void>('/waitlist/games/v1', {
        method: 'DELETE',
        body: gameIds,
        requiresAuth: true
      });
    } catch (error) {
      console.error('Error removing games from ITAD waitlist:', error);
      throw new Error(
        `Failed to remove games from waitlist: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  /**
   * Holt die Waitlist des Benutzers (OAuth erforderlich)
   * @returns Array der Spiele in der Waitlist
   */
  export async function getWaitlistGames(): Promise<ITADWaitlistGame[]> {
    try {
      return await apiRequest<ITADWaitlistGame[]>('/waitlist/games/v1', {
        requiresAuth: true
      });
    } catch (error) {
      console.error('Error fetching ITAD waitlist:', error);
      throw new Error(
        `Failed to fetch waitlist: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  /**
   * Lädt alle verfügbaren Shops von der ITAD API
   * @param country Land-Code für regionale Verfügbarkeit
   * @returns Array der verfügbaren Shops
   */
  export async function getAllShops(
    country: string = 'DE'
  ): Promise<ITADShop[]> {
    try {
      return await apiRequest<ITADShop[]>('/service/shops/v1', {
        params: { country }
      });
    } catch (error) {
      console.error('Error fetching shops from ITAD:', error);
      throw new Error(
        `Failed to fetch shops: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  /**
   * Sucht ein Spiel über den Titel oder Steam App ID
   * @param options Suchoptionen (title oder appid)
   * @returns Gefundenes Spiel oder null
   */
  export async function lookupGame(options: {
    title?: string;
    appid?: number;
  }): Promise<{ found: boolean; game?: ITADGame }> {
    try {
      if (!options.title && !options.appid) {
        throw new Error('Either title or appid must be provided');
      }

      const params: Record<string, any> = {};
      if (options.title) params.title = options.title;
      if (options.appid) params.appid = options.appid;

      return await apiRequest<{ found: boolean; game?: ITADGame }>(
        '/games/lookup/v1',
        {
          params,
          requiresAuth: true
        }
      );
    } catch (error) {
      console.error('Error looking up game on ITAD:', error);
      throw new Error(
        `Failed to lookup game: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
}
