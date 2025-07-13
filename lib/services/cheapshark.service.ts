// CheapShark API Service
// Grund: Zentrale Schnittstelle zur CheapShark API für Deal-Aggregation
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
  /**
   * Hilfsfunktion: Gibt den Store-Namen basierend auf der storeID zurück
   * Grund: Benutzerfreundliche Anzeige der Store-Namen
   */
  export function getStoreName(storeID: string): string {
    const storeMap: Record<string, string> = {
      '1': 'Steam',
      '2': 'GamersGate',
      '3': 'Green Man Gaming',
      '7': 'GOG',
      '8': 'Origin',
      '11': 'Humble Store',
      '13': 'Uplay',
      '15': 'Fanatical',
      '21': 'WinGameStore',
      '23': 'GameBillet',
      '25': 'Epic Games Store',
      '27': 'Gamesplanet',
      '28': 'Gamesload',
      '29': 'SquareEnix',
      '30': 'Razer Game Store',
      '31': 'Gamesplanet FR',
      '32': 'Gamesplanet DE',
      '33': 'Gamesplanet UK',
      '34': 'Battlenet',
      '35': 'Voidu'
    };
    return storeMap[storeID] || `Store ${storeID}`;
  }

  /**
   * Hilfsfunktion: Gibt Store-Icon basierend auf der storeID zurück
   * Grund: Visuelle Darstellung der Stores
   */
  export function getStoreIcon(storeID: string): string {
    const iconMap: Record<string, string> = {
      '1': 'simple-icons:steam',
      '2': 'mdi:gamepad-variant',
      '3': 'mdi:gamepad-variant',
      '7': 'simple-icons:gog-dot-com',
      '8': 'simple-icons:origin',
      '11': 'simple-icons:humblebundle',
      '13': 'simple-icons:ubisoft',
      '15': 'mdi:gamepad-variant',
      '21': 'mdi:microsoft-windows',
      '23': 'mdi:gamepad-variant',
      '25': 'simple-icons:epicgames',
      '27': 'mdi:earth',
      '28': 'mdi:gamepad-variant',
      '29': 'simple-icons:square',
      '30': 'simple-icons:razer',
      '31': 'mdi:earth',
      '32': 'mdi:earth',
      '33': 'mdi:earth',
      '34': 'simple-icons:blizzard',
      '35': 'mdi:gamepad-variant'
    };
    return iconMap[storeID] || 'mdi:store';
  }

  /**
   * Hilfsfunktion: Gibt alle verfügbaren Stores zurück
   * Grund: Filter-Dropdown auf der Deal-Seite
   */
  export function getAllStores(): Array<{
    id: string;
    name: string;
    icon: string;
  }> {
    const storeIds = [
      '1',
      '2',
      '3',
      '7',
      '8',
      '11',
      '13',
      '15',
      '21',
      '23',
      '25',
      '27',
      '28',
      '29',
      '30',
      '31',
      '32',
      '33',
      '34',
      '35'
    ];
    return storeIds.map(id => ({
      id,
      name: getStoreName(id),
      icon: getStoreIcon(id)
    }));
  }
}
