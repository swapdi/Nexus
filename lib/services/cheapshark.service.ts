// CheapShark API Service
// Grund: Zentrale Schnittstelle zur CheapShark API für Deal-Aggregation
import { useStoreUtils } from '~/composables/useStoreUtils';
export interface CheapSharkDeal {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID: string;
  releaseDate: number;
  lastChange: number;
  dealRating: string;
  thumb: string;
}
export interface CheapSharkStore {
  storeID: string;
  storeName: string;
  isActive: number;
  images: {
    banner: string;
    logo: string;
    icon: string;
  };
}
export interface CheapSharkGameSearch {
  gameID: string;
  steamAppID: string | null;
  cheapest: string;
  cheapestDealID: string;
  external: string;
  internalName: string;
  thumb: string;
}
export interface CheapSharkGameDeal {
  storeID: string;
  dealID: string;
  price: string;
  retailPrice: string;
  savings: string;
}
export interface CheapSharkGameInfo {
  deals: CheapSharkGameDeal[];
  info: {
    title: string;
    steamAppID: string | null;
    thumb: string;
  };
  cheapestPriceEver?: {
    price: string;
    date: number;
  };
}
export interface CheapSharkDealDetails {
  gameInfo: {
    storeID: string;
    gameID: string;
    name: string;
    steamAppID: string;
    salePrice: string;
    retailPrice: string;
    steamRatingText: string;
    steamRatingPercent: string;
    steamRatingCount: string;
    metacriticScore: string;
    metacriticLink: string;
    releaseDate: number;
    publisher: string;
    steamworks: string;
    thumb: string;
  };
  cheaperStores: Array<{
    dealID: string;
    storeID: string;
    salePrice: string;
    retailPrice: string;
  }>;
  cheapestPrice: {
    price: string;
    date: number;
  };
}
export namespace CheapSharkService {
  const BASE_URL = 'https://www.cheapshark.com/api/1.0';
  /**
   * Holt alle aktuellen Deals von CheapShark
   * @param options Optional query parameters für Filterung
   * @returns Array aller verfügbaren Deals
   */
  export async function getAllDeals(
    options: {
      storeID?: string;
      pageNumber?: number;
      pageSize?: number;
      sortBy?:
        | 'Deal Rating'
        | 'Title'
        | 'Savings'
        | 'Price'
        | 'Metacritic'
        | 'Reviews'
        | 'Release'
        | 'Store'
        | 'Recent';
      desc?: boolean;
      lowerPrice?: number;
      upperPrice?: number;
      metacritic?: number;
      steamRating?: number;
      onSale?: boolean;
      maxAge?: number;
      output?: string;
    } = {}
  ): Promise<CheapSharkDeal[]> {
    try {
      const searchParams = new URLSearchParams();
      // Grund: Parameter nur hinzufügen wenn sie definiert sind
      if (options.storeID) searchParams.append('storeID', options.storeID);
      if (options.pageNumber)
        searchParams.append('pageNumber', options.pageNumber.toString());
      if (options.pageSize)
        searchParams.append('pageSize', options.pageSize.toString());
      if (options.sortBy) searchParams.append('sortBy', options.sortBy);
      if (options.desc !== undefined)
        searchParams.append('desc', options.desc ? '1' : '0');
      if (options.lowerPrice !== undefined)
        searchParams.append('lowerPrice', options.lowerPrice.toString());
      if (options.upperPrice !== undefined)
        searchParams.append('upperPrice', options.upperPrice.toString());
      if (options.metacritic !== undefined)
        searchParams.append('metacritic', options.metacritic.toString());
      if (options.steamRating !== undefined)
        searchParams.append('steamRating', options.steamRating.toString());
      if (options.onSale !== undefined)
        searchParams.append('onSale', options.onSale ? '1' : '0');
      if (options.maxAge !== undefined)
        searchParams.append('maxAge', options.maxAge.toString());
      if (options.output) searchParams.append('output', options.output);
      const url = `${BASE_URL}/deals${
        searchParams.toString() ? '?' + searchParams.toString() : ''
      }`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `CheapShark API Error: ${response.status} ${response.statusText}`
        );
      }
      const deals: CheapSharkDeal[] = await response.json();
      return deals;
    } catch (error) {
      console.error('Error fetching deals from CheapShark:', error);
      throw new Error(
        `Failed to fetch deals: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
  /**
   * Sucht nach Spielen anhand des Titels
   * @param title Der Spieltitel nach dem gesucht werden soll
   * @param limit Maximale Anzahl der Ergebnisse (default: 60)
   * @param exact Exakte Übereinstimmung des Titels (default: false)
   * @returns Array der gefundenen Spiele
   */
  export async function searchGamesByTitle(
    title: string,
    limit: number = 60,
    exact: boolean = false
  ): Promise<CheapSharkGameSearch[]> {
    try {
      if (!title.trim()) {
        throw new Error('Game title cannot be empty');
      }
      const searchParams = new URLSearchParams({
        title: title.trim(),
        limit: limit.toString(),
        exact: exact ? '1' : '0'
      });
      const url = `${BASE_URL}/games?${searchParams.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `CheapShark API Error: ${response.status} ${response.statusText}`
        );
      }
      const games: CheapSharkGameSearch[] = await response.json();
      return games;
    } catch (error) {
      console.error('Error searching games on CheapShark:', error);
      throw new Error(
        `Failed to search games: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
  /**
   * Holt Deals für ein spezifisches Spiel anhand der gameID
   * @param gameID Die CheapShark gameID
   * @returns Game info mit verfügbaren Deals
   */
  export async function getGameDeals(
    gameID: string
  ): Promise<CheapSharkGameInfo> {
    try {
      if (!gameID.trim()) {
        throw new Error('Game ID cannot be empty');
      }
      const url = `${BASE_URL}/games?id=${gameID.trim()}`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Nexus-Game-Manager/1.0'
        }
      });
      if (!response.ok) {
        throw new Error(
          `CheapShark API Error: ${response.status} ${response.statusText}`
        );
      }
      const gameInfo: CheapSharkGameInfo = await response.json();
      return gameInfo;
    } catch (error) {
      console.error('Error fetching game deals from CheapShark:', error);
      throw new Error(
        `Failed to fetch game deals: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
  /**
   * Holt detaillierte Informationen zu einem spezifischen Deal
   * @param dealID Die CheapShark dealID
   * @returns Detaillierte Deal-Informationen
   */
  export async function getDealDetails(
    dealID: string
  ): Promise<CheapSharkDealDetails> {
    try {
      if (!dealID.trim()) {
        throw new Error('Deal ID cannot be empty');
      }
      const url = `${BASE_URL}/deals?id=${dealID.trim()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `CheapShark API Error: ${response.status} ${response.statusText}`
        );
      }
      const dealDetails: CheapSharkDealDetails = await response.json();
      return dealDetails;
    } catch (error) {
      console.error('Error fetching deal details from CheapShark:', error);
      throw new Error(
        `Failed to fetch deal details: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  export async function getAllStores(): Promise<CheapSharkStore[]> {
    try {
      const response = await fetch(`${BASE_URL}/stores`);
      if (!response.ok) {
        throw new Error(`CheapShark API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fehler beim Laden der Stores:', error);
      throw error;
    }
  }
  /**
   * Hilfsfunktion: Gibt den Store-Namen basierend auf der storeID zurück
   * Grund: Benutzerfreundliche Anzeige der Store-Namen
   */
  export function getStoreName(storeID: string): string {
    return useStoreUtils().getStoreName(storeID);
  }

  /**
   * Lädt alle verfügbaren Stores von der CheapShark API
   * Grund: Aktuelle Store-Liste mit Icons für Deal-Anzeige
   */
  export async function fetchStores(): Promise<CheapSharkStore[]> {
    try {
      const response = await fetch(`${BASE_URL}/stores`);
      if (!response.ok) {
        throw new Error(`CheapShark API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fehler beim Laden der Stores:', error);
      throw error;
    }
  }

  /**
   * Sucht nach einem Spiel über den Titel
   * Grund: Game-ID für Deal-Suche ermitteln
   */
  export async function searchGameByTitle(
    title: string
  ): Promise<CheapSharkGameSearch[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/games?title=${encodeURIComponent(title)}&limit=1`
      );
      if (!response.ok) {
        throw new Error(`CheapShark API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fehler bei der Spiel-Suche:', error);
      throw error;
    }
  }

  /**
   * Hilfsfunktion: Store-Icon per API abrufen
   * Grund: Dynamische Store-Icons statt statischer Zuordnung
   */
  export async function getStoreIconUrl(storeID: string): Promise<string> {
    try {
      const stores = await fetchStores();
      const store = stores.find(s => s.storeID === storeID);
      return store?.images?.icon || '';
    } catch (error) {
      console.error('Fehler beim Laden des Store-Icons:', error);
      return '';
    }
  }
}
