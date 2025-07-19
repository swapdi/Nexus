// IsThereAnyDeal (ITAD) API Service - Aktualisiert für API v2.7.0
// Vereinfachte Version ohne OAuth für Preisvergleich

export interface ITADGame {
  id: string;
  slug: string;
  title: string;
  type: 'game' | 'dlc' | 'bundle' | 'package' | null;
  mature: boolean;
  assets?: {
    boxart?: string;
    banner145?: string;
    banner300?: string;
    banner400?: string;
    banner600?: string;
  };
}

export interface ITADGameInfo {
  id: string;
  slug: string;
  title: string;
  type: 'game' | 'dlc' | 'bundle' | 'package';
  mature: boolean;
  assets: {
    boxart?: string;
    banner145?: string;
    banner300?: string;
    banner400?: string;
    banner600?: string;
  };
  earlyAccess: boolean;
  achievements: boolean;
  tradingCards: boolean;
  appid?: number;
  tags: string[];
  releaseDate: string;
  stats: {
    rank: number;
    waitlisted: number;
    collected: number;
  };
  urls: {
    game: string;
  };
}

export interface ITADPrice {
  amount: number;
  amountInt: number;
  currency: string;
}

export interface ITADShop {
  id: number;
  name: string;
}

export interface ITADDeal {
  shop: ITADShop;
  price: ITADPrice;
  regular: ITADPrice;
  cut: number;
  voucher?: string;
  url: string;
}

export interface ITADHistoryLow {
  id: string;
  low?: ITADPrice & {
    shop: ITADShop;
    timestamp: string;
  };
}

export interface ITADPriceData {
  id: string;
  deals: ITADDeal[];
  historyLow?: ITADPrice & {
    shop: ITADShop;
    timestamp: string;
  };
}

class ITADService {
  private apiKey: string;
  private baseUrl = 'https://api.isthereanydeal.com';

  constructor() {
    this.apiKey = process.env.ITAD_API_KEY || '';
    if (!this.apiKey) {
      console.warn('ITAD API Key nicht gefunden in Umgebungsvariablen');
    }
  }

  /**
   * Sucht nach Spielen anhand des Titels
   */
  async searchGames(title: string, results = 10): Promise<ITADGame[]> {
    try {
      const url = `${this.baseUrl}/games/search/v1?title=${encodeURIComponent(
        title
      )}&results=${results}&key=${this.apiKey}`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Nexus-Game-Manager/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(
          `ITAD API Fehler: ${response.status} ${response.statusText}`
        );
      }

      const games = await response.json();
      return games || [];
    } catch (error) {
      console.error('Fehler beim Suchen nach Spielen:', error);
      return [];
    }
  }

  /**
   * Findet die ITAD Game-ID basierend auf dem Titel
   */
  async findGameId(gameTitle: string): Promise<string | null> {
    try {
      const games = await this.searchGames(gameTitle, 5);

      // Versuche exakten Match zu finden
      const exactMatch = games.find(
        game => game.title.toLowerCase() === gameTitle.toLowerCase()
      );

      if (exactMatch) {
        return exactMatch.id;
      }

      // Falls kein exakter Match, nimm das erste Ergebnis
      return games.length > 0 ? games[0].id : null;
    } catch (error) {
      console.error('Fehler beim Finden der ITAD Game-ID:', error);
      return null;
    }
  }

  /**
   * Lädt Spielinformationen anhand der ITAD Game-ID
   */
  async getGameInfo(gameId: string): Promise<ITADGameInfo | null> {
    try {
      const url = `${this.baseUrl}/games/info/v2?id=${gameId}&key=${this.apiKey}`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Nexus-Game-Manager/1.0'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // Spiel nicht gefunden
        }
        throw new Error(
          `ITAD API Fehler: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Fehler beim Laden der Spielinformationen:', error);
      return null;
    }
  }

  /**
   * Lädt historische Tiefstpreise für Spiele
   */
  async getHistoryLow(
    gameIds: string[],
    country = 'DE'
  ): Promise<ITADHistoryLow[]> {
    try {
      const url = `${this.baseUrl}/games/historylow/v1?country=${country}&key=${this.apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Nexus-Game-Manager/1.0'
        },
        body: JSON.stringify(gameIds)
      });

      if (!response.ok) {
        throw new Error(
          `ITAD API Fehler: ${response.status} ${response.statusText}`
        );
      }

      return (await response.json()) || [];
    } catch (error) {
      console.error('Fehler beim Laden des historischen Tiefstpreises:', error);
      return [];
    }
  }

  /**
   * Lädt aktuelle Preise für Spiele
   */
  async getCurrentPrices(
    gameIds: string[],
    country = 'DE',
    dealsOnly = true
  ): Promise<ITADPriceData[]> {
    try {
      const params = new URLSearchParams({
        country,
        key: this.apiKey
      });

      if (dealsOnly) {
        params.set('deals', 'true');
      }

      const url = `${this.baseUrl}/games/prices/v3?${params}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Nexus-Game-Manager/1.0'
        },
        body: JSON.stringify(gameIds)
      });

      if (!response.ok) {
        throw new Error(
          `ITAD API Fehler: ${response.status} ${response.statusText}`
        );
      }

      return (await response.json()) || [];
    } catch (error) {
      console.error('Fehler beim Laden der aktuellen Preise:', error);
      return [];
    }
  }

  /**
   * Lädt eine kombinierte Preisübersicht für ein einzelnes Spiel
   */
  async getPriceOverview(
    gameId: string,
    country = 'DE'
  ): Promise<{
    historyLow: (ITADPrice & { shop: ITADShop; timestamp: string }) | null;
    currentDeals: ITADDeal[];
  }> {
    try {
      const [historyData, priceData] = await Promise.all([
        this.getHistoryLow([gameId], country),
        this.getCurrentPrices([gameId], country, true)
      ]);

      const historyLow = historyData?.[0]?.low || null;
      const currentDeals = priceData?.[0]?.deals || [];

      return {
        historyLow,
        currentDeals
      };
    } catch (error) {
      console.error('Fehler beim Laden der Preisübersicht:', error);
      return {
        historyLow: null,
        currentDeals: []
      };
    }
  }

  /**
   * Lädt die Shops-Liste
   */
  async getShops(country = 'DE'): Promise<ITADShop[]> {
    try {
      const url = `${this.baseUrl}/service/shops/v1?country=${country}&key=${this.apiKey}`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Nexus-Game-Manager/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(
          `ITAD API Fehler: ${response.status} ${response.statusText}`
        );
      }

      const shops = await response.json();
      return (
        shops?.map((shop: any) => ({
          id: shop.id,
          name: shop.title
        })) || []
      );
    } catch (error) {
      console.error('Fehler beim Laden der Shops:', error);
      return [];
    }
  }

  /**
   * Formatiert einen Preis für die Anzeige
   */
  formatPrice(price: ITADPrice): string {
    if (price.amount === 0) {
      return 'Kostenlos';
    }
    return `${price.amount.toFixed(2)} ${price.currency}`;
  }

  /**
   * Berechnet die Ersparnis in Prozent
   */
  calculateSavingsPercentage(
    originalPrice: ITADPrice,
    discountedPrice: ITADPrice
  ): number {
    if (originalPrice.amount <= 0) return 0;
    return Math.round(
      ((originalPrice.amount - discountedPrice.amount) / originalPrice.amount) *
        100
    );
  }

  /**
   * Gibt den besten aktuellen Deal zurück
   */
  getBestCurrentDeal(deals: ITADDeal[]): ITADDeal | null {
    if (deals.length === 0) return null;

    // Sortiere nach Preis (aufsteigend)
    return deals.sort((a, b) => a.price.amount - b.price.amount)[0];
  }

  /**
   * Prüft ob ein Preis ein historischer Tiefstpreis ist oder nahe daran
   */
  isHistoricalLow(
    currentPrice: number,
    historicalLow: number | null,
    tolerance = 0.1
  ): boolean {
    if (!historicalLow) return false;
    return Math.abs(currentPrice - historicalLow) <= tolerance;
  }
}

// Erstelle und exportiere Singleton-Instanz
const itadService = new ITADService();

export { ITADService, itadService };
export default itadService;
