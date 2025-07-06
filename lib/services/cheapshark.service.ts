import type { DealSource, ExternalDeal } from './deals.service';

/**
 * CheapShark API Service
 * Ermöglicht das Abfragen von aktuellen Deals und das Suchen nach Spielen
 * API Dokumentation: https://apidocs.cheapshark.com/
 */

// CheapShark API Base URL
const CHEAPSHARK_API_BASE = 'https://www.cheapshark.com/api/1.0';

// Store IDs für CheapShark (basierend auf aktueller API)
export const CHEAPSHARK_STORES = {
  STEAM: '1',
  GAMERSGATE: '2',
  GREENMANGAMING: '3',
  AMAZON: '4',
  GAMEFLY: '5',
  DIRECT2DRIVE: '6',
  GAMESPLANET: '7',
  VOIDU: '8',
  ORIGIN: '9',
  SHINY_LOOT: '10',
  HUMBLE_STORE: '11',
  DESURA: '12',
  UPLAY: '13',
  INDIE_GAME_STAND: '14',
  FANATICAL: '15',
  GAMESROCKET: '16',
  GAMES_REPUBLIC: '17',
  SILA_GAMES: '18',
  PLAYFIELD: '19',
  IMPERIAL_GAMES: '20',
  WIN_GAME_STORE: '21',
  FUNSTOCK_DIGITAL: '22',
  GAME_BILLET: '23',
  VOIDU_NEW: '24',
  EPIC_GAMES_STORE: '25',
  RAZER_GAME_STORE: '26',
  GAMESPLANET_NEW: '27',
  GAMESLOAD: '28',
  TWO_GAME: '29',
  INDIE_GALA: '30',
  BLIZZARD_SHOP: '31',
  ALL_YOU_PLAY: '32',
  DL_GAMER: '33',
  NOCTRE: '34',
  DREAM_GAME: '35'
} as const;

// Regionale Store-Gruppen für bessere Lokalisierung
export const REGIONAL_STORES = {
  US: [
    CHEAPSHARK_STORES.STEAM,
    CHEAPSHARK_STORES.EPIC_GAMES_STORE,
    CHEAPSHARK_STORES.HUMBLE_STORE,
    CHEAPSHARK_STORES.FANATICAL,
    CHEAPSHARK_STORES.GAMERSGATE,
    CHEAPSHARK_STORES.AMAZON
  ],
  EU: [
    CHEAPSHARK_STORES.STEAM,
    CHEAPSHARK_STORES.GAMESPLANET_NEW,
    CHEAPSHARK_STORES.GAMESLOAD,
    CHEAPSHARK_STORES.GREENMANGAMING,
    CHEAPSHARK_STORES.HUMBLE_STORE,
    CHEAPSHARK_STORES.FANATICAL
  ],
  GLOBAL: [
    CHEAPSHARK_STORES.STEAM,
    CHEAPSHARK_STORES.EPIC_GAMES_STORE,
    CHEAPSHARK_STORES.HUMBLE_STORE,
    CHEAPSHARK_STORES.FANATICAL,
    CHEAPSHARK_STORES.GREENMANGAMING,
    CHEAPSHARK_STORES.GAMERSGATE,
    CHEAPSHARK_STORES.GAMESPLANET_NEW,
    CHEAPSHARK_STORES.GAME_BILLET,
    CHEAPSHARK_STORES.WIN_GAME_STORE,
    CHEAPSHARK_STORES.INDIE_GALA
  ]
} as const;

export type Region = keyof typeof REGIONAL_STORES;

// Typen für CheapShark API Response
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

export interface CheapSharkGameLookup {
  info: {
    title: string;
    steamAppID: string;
    thumb: string;
  };
  deals: Array<{
    storeID: string;
    dealID: string;
    price: string;
    retailPrice: string;
    savings: string;
  }>;
  cheapestPriceEver: {
    price: string;
    date: number;
  };
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
  steamAppID: string;
  cheapest: string;
  thumb: string;
  external: string;
  internalName: string;
}

export namespace CheapSharkService {
  /**
   * Hole aktuelle Deals mit optionalen Filtern und regionaler Unterstützung
   */
  export async function getDeals(
    options: {
      storeID?: string;
      pageNumber?: number;
      pageSize?: number;
      region?: Region;
      lowerPrice?: number;
      upperPrice?: number;
      metacriticScore?: number;
      steamRating?: number;
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
    } = {}
  ): Promise<CheapSharkDeal[]> {
    const params = new URLSearchParams();

    // Regionale Store-Auswahl
    if (options.region && !options.storeID) {
      const regionalStores = REGIONAL_STORES[options.region];
      // Verwende die ersten Store-IDs der Region als Standard
      params.append('storeID', regionalStores.slice(0, 3).join(','));
    } else if (options.storeID) {
      params.append('storeID', options.storeID);
    }

    if (options.pageNumber)
      params.append('pageNumber', options.pageNumber.toString());
    if (options.pageSize)
      params.append('pageSize', options.pageSize.toString());
    if (options.lowerPrice)
      params.append('lowerPrice', options.lowerPrice.toString());
    if (options.upperPrice)
      params.append('upperPrice', options.upperPrice.toString());
    if (options.metacriticScore)
      params.append('metacritic', options.metacriticScore.toString());
    if (options.steamRating)
      params.append('steamRating', options.steamRating.toString());
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.desc !== undefined)
      params.append('desc', options.desc ? '1' : '0');

    const response = await fetch(`${CHEAPSHARK_API_BASE}/deals?${params}`);
    if (!response.ok) {
      throw new Error(`CheapShark API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  /**
   * Hole regionale Deals mit automatischer Store-Auswahl
   */
  export async function getRegionalDeals(
    region: Region = 'GLOBAL',
    options: {
      pageNumber?: number;
      pageSize?: number;
      lowerPrice?: number;
      upperPrice?: number;
      metacriticScore?: number;
      steamRating?: number;
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
    } = {}
  ): Promise<CheapSharkDeal[]> {
    return getDeals({ ...options, region });
  }

  /**
   * Suche nach Spielen
   */
  export async function searchGames(
    title: string,
    limit: number = 20
  ): Promise<CheapSharkGameSearch[]> {
    try {
      const params = new URLSearchParams({
        title: title.trim(),
        limit: Math.min(limit, 60).toString()
      });

      const url = `${CHEAPSHARK_API_BASE}/games?${params.toString()}`;
      console.log(`Searching CheapShark games: ${title}`);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `CheapShark API error: ${response.status} ${response.statusText}`
        );
      }

      const games: CheapSharkGameSearch[] = await response.json();
      return games;
    } catch (error) {
      console.error('Error searching CheapShark games:', error);
      throw new Error('Failed to search games on CheapShark API');
    }
  }

  /**
   * Hole Deals für ein spezifisches Spiel
   */
  export async function getGameDeals(
    gameID: string
  ): Promise<CheapSharkGameLookup | null> {
    try {
      const url = `${CHEAPSHARK_API_BASE}/games?id=${gameID}`;
      console.log(`Fetching CheapShark game deals for ID: ${gameID}`);

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(
          `CheapShark API error: ${response.status} ${response.statusText}`
        );
      }

      const gameData: CheapSharkGameLookup = await response.json();
      return gameData;
    } catch (error) {
      console.error('Error fetching CheapShark game deals:', error);
      throw new Error('Failed to fetch game deals from CheapShark API');
    }
  }

  /**
   * Hole alle verfügbaren Stores
   */
  export async function getStores(): Promise<CheapSharkStore[]> {
    try {
      const url = `${CHEAPSHARK_API_BASE}/stores`;
      console.log('Fetching CheapShark stores');

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `CheapShark API error: ${response.status} ${response.statusText}`
        );
      }

      const stores: CheapSharkStore[] = await response.json();
      return stores.filter(store => store.isActive === 1);
    } catch (error) {
      console.error('Error fetching CheapShark stores:', error);
      throw new Error('Failed to fetch stores from CheapShark API');
    }
  }

  /**
   * Konvertiere CheapShark Deal zu unserem ExternalDeal Format
   */
  export function convertToExternalDeal(
    deal: CheapSharkDeal,
    storeName: string
  ): ExternalDeal {
    const salePrice = parseFloat(deal.salePrice);
    const normalPrice = parseFloat(deal.normalPrice);
    const savings = parseFloat(deal.savings);

    return {
      title: deal.title,
      storeName: storeName,
      price: salePrice > 0 ? salePrice : undefined,
      originalPrice: normalPrice > salePrice ? normalPrice : undefined,
      discountPercent: savings > 0 ? Math.round(savings) : undefined,
      url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
      validUntil: undefined, // CheapShark stellt keine Ablaufzeit bereit
      isFreebie: salePrice === 0,
      source: 'manual' as DealSource, // CheapShark als manuell markiert
      externalId: deal.dealID
    };
  }

  /**
   * Hole Deal-Details über Deal-ID
   */
  export async function getDealInfo(dealID: string): Promise<{
    gameInfo: {
      name: string;
      steamAppID: string;
      thumb: string;
    };
    gameDetails: {
      retailPrice: string;
      price: string;
      savings: string;
    };
    cheaperStores: Array<{
      dealID: string;
      storeID: string;
      salePrice: string;
      retailPrice: string;
      savings: string;
    }>;
  } | null> {
    try {
      const url = `${CHEAPSHARK_API_BASE}/deals?id=${dealID}`;
      console.log(`Fetching CheapShark deal info for ID: ${dealID}`);

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(
          `CheapShark API error: ${response.status} ${response.statusText}`
        );
      }

      const dealInfo = await response.json();
      return dealInfo;
    } catch (error) {
      console.error('Error fetching CheapShark deal info:', error);
      throw new Error('Failed to fetch deal info from CheapShark API');
    }
  }

  /**
   * Aggregiere Deals von CheapShark für unsere Datenbank
   */
  export async function aggregateDeals(
    options: {
      maxDeals?: number;
      storeIDs?: string[];
      minSavings?: number;
      maxPrice?: number;
    } = {}
  ): Promise<ExternalDeal[]> {
    try {
      const {
        maxDeals = 100,
        storeIDs = [],
        minSavings = 10,
        maxPrice = 60
      } = options;

      // Hole Store-Informationen für Name-Mapping
      const stores = await getStores();
      const storeMap = new Map(
        stores.map(store => [store.storeID, store.storeName])
      );

      const externalDeals: ExternalDeal[] = [];

      // Wenn spezifische Stores angegeben, iteriere über diese
      const targetStores = storeIDs.length > 0 ? storeIDs : ['1', '25', '7']; // Steam, Epic, GOG als Standard

      for (const storeID of targetStores) {
        try {
          const deals = await getDeals({
            storeID,
            pageSize: Math.min(maxDeals, 60),
            sortBy: 'Savings',
            desc: true,
            upperPrice: maxPrice
          });

          const storeName = storeMap.get(storeID) || `Store ${storeID}`;

          for (const deal of deals) {
            const savings = parseFloat(deal.savings);

            // Nur Deals mit mindestens X% Ersparnis
            if (savings >= minSavings) {
              const externalDeal = convertToExternalDeal(deal, storeName);
              externalDeals.push(externalDeal);
            }

            // Limit respektieren
            if (externalDeals.length >= maxDeals) {
              break;
            }
          }

          // Kurze Pause zwischen Store-Abfragen
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Error fetching deals from store ${storeID}:`, error);
          continue;
        }
      }

      console.log(`Aggregated ${externalDeals.length} deals from CheapShark`);
      return externalDeals;
    } catch (error) {
      console.error('Error aggregating CheapShark deals:', error);
      throw new Error('Failed to aggregate deals from CheapShark API');
    }
  }
}
