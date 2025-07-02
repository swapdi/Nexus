/**
 * Composable für Deal Aggregation Funktionalität
 * Grund: Komplexe Deal-Aggregation-Logik aus DealsService extrahiert für bessere Trennung
 */

export interface ExternalDeal {
  title: string;
  storeName: string;
  price?: number;
  originalPrice?: number;
  discountPercent?: number;
  url: string;
  validUntil?: Date;
  isFreebie?: boolean;
  source: DealSource;
  externalId?: string;
}

export type DealSource =
  | 'steam'
  | 'epic'
  | 'gog'
  | 'humble'
  | 'reddit'
  | 'manual';

export interface DealAggregationResult {
  imported: number;
  updated: number;
  errors: string[];
  sources: string[];
  duration: number;
}

export interface DealMatchingOptions {
  fuzzyThreshold?: number;
  titleSimilarityThreshold?: number;
  useAlternativeTitles?: boolean;
}

export const useDealAggregation = () => {
  /**
   * Normalisiert Spieltitel für besseres Matching
   */
  const normalizeGameTitle = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[™®©]/g, '') // Entferne Markenzeichen
      .replace(/[:\-–—]/g, ' ') // Normalisiere Trennzeichen
      .replace(/\s+/g, ' ') // Mehrfache Leerzeichen entfernen
      .replace(/\b(the|a|an)\b/g, '') // Artikel entfernen
      .replace(/\b(edition|deluxe|goty|complete|ultimate|remastered)\b/g, '') // Editionen entfernen
      .trim();
  };

  /**
   * Berechnet Ähnlichkeit zwischen zwei Titeln
   */
  const calculateTitleSimilarity = (title1: string, title2: string): number => {
    const normalized1 = normalizeGameTitle(title1);
    const normalized2 = normalizeGameTitle(title2);

    // Levenshtein-Distanz Implementation
    const matrix = Array(normalized2.length + 1)
      .fill(null)
      .map(() => Array(normalized1.length + 1).fill(null));

    for (let i = 0; i <= normalized1.length; i += 1) {
      matrix[0][i] = i;
    }

    for (let j = 0; j <= normalized2.length; j += 1) {
      matrix[j][0] = j;
    }

    for (let j = 1; j <= normalized2.length; j += 1) {
      for (let i = 1; i <= normalized1.length; i += 1) {
        const indicator = normalized1[i - 1] === normalized2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    const distance = matrix[normalized2.length][normalized1.length];
    const maxLength = Math.max(normalized1.length, normalized2.length);
    return maxLength === 0 ? 1 : (maxLength - distance) / maxLength;
  };

  /**
   * Validiert Deal-Daten
   */
  const validateDealData = (
    deal: ExternalDeal
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!deal.title || deal.title.trim().length === 0) {
      errors.push('Deal title is required');
    }

    if (!deal.storeName || deal.storeName.trim().length === 0) {
      errors.push('Store name is required');
    }

    if (!deal.url || !isValidUrl(deal.url)) {
      errors.push('Valid URL is required');
    }

    if (deal.price !== undefined && deal.price < 0) {
      errors.push('Price cannot be negative');
    }

    if (deal.originalPrice !== undefined && deal.originalPrice < 0) {
      errors.push('Original price cannot be negative');
    }

    if (
      deal.discountPercent !== undefined &&
      (deal.discountPercent < 0 || deal.discountPercent > 100)
    ) {
      errors.push('Discount percent must be between 0 and 100');
    }

    if (deal.validUntil && deal.validUntil < new Date()) {
      errors.push('Deal expiration date cannot be in the past');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  /**
   * Überprüft ob URL gültig ist
   */
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Berechnet Rabatt-Prozentsatz
   */
  const calculateDiscountPercent = (
    originalPrice: number,
    currentPrice: number
  ): number => {
    if (originalPrice <= 0 || currentPrice < 0) return 0;
    if (currentPrice >= originalPrice) return 0;

    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  /**
   * Generiert Mock-Deals für Testing/Development
   */
  const generateMockDeals = (): ExternalDeal[] => {
    return [
      {
        title: 'Cyberpunk 2077',
        storeName: 'Steam',
        originalPrice: 59.99,
        price: 29.99,
        discountPercent: 50,
        url: 'https://store.steampowered.com/app/1091500/',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 Tage
        isFreebie: false,
        source: 'steam'
      },
      {
        title: 'The Witcher 3: Wild Hunt',
        storeName: 'GOG',
        originalPrice: 49.99,
        price: 9.99,
        discountPercent: 80,
        url: 'https://www.gog.com/game/the_witcher_3_wild_hunt',
        validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 Tage
        isFreebie: false,
        source: 'gog'
      },
      {
        title: 'Hades',
        storeName: 'Steam',
        originalPrice: 24.99,
        price: 12.49,
        discountPercent: 50,
        url: 'https://store.steampowered.com/app/1145360/',
        validUntil: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 Tage
        isFreebie: false,
        source: 'steam'
      },
      {
        title: 'Fall Guys',
        storeName: 'Steam',
        originalPrice: 19.99,
        price: 0,
        discountPercent: 100,
        url: 'https://store.steampowered.com/app/1097150/',
        isFreebie: true,
        source: 'steam'
      }
    ];
  };

  /**
   * Filtert und bereinigt Deal-Daten
   */
  const cleanDealData = (deal: ExternalDeal): ExternalDeal => {
    const cleaned: ExternalDeal = {
      ...deal,
      title: deal.title.trim(),
      storeName: deal.storeName.trim(),
      url: deal.url.trim()
    };

    // Berechne fehlende Rabatt-Prozente
    if (cleaned.originalPrice && cleaned.price && !cleaned.discountPercent) {
      cleaned.discountPercent = calculateDiscountPercent(
        cleaned.originalPrice,
        cleaned.price
      );
    }

    // Setze isFreebie automatisch wenn Preis 0 ist
    if (cleaned.price === 0) {
      cleaned.isFreebie = true;
    }

    return cleaned;
  };

  /**
   * Kategorisiert Deals nach Qualität
   */
  const categorizeDealQuality = (
    deal: ExternalDeal
  ): 'excellent' | 'good' | 'average' | 'poor' => {
    if (deal.isFreebie) return 'excellent';

    const discount = deal.discountPercent || 0;

    if (discount >= 75) return 'excellent';
    if (discount >= 50) return 'good';
    if (discount >= 25) return 'average';
    return 'poor';
  };

  /**
   * Extrahiert Store-spezifische Informationen
   */
  const extractStoreInfo = (
    url: string
  ): { store: string; platform: string } => {
    const urlLower = url.toLowerCase();

    if (
      urlLower.includes('steampowered.com') ||
      urlLower.includes('store.steampowered.com')
    ) {
      return { store: 'Steam', platform: 'PC' };
    }

    if (urlLower.includes('gog.com')) {
      return { store: 'GOG', platform: 'PC' };
    }

    if (urlLower.includes('epicgames.com')) {
      return { store: 'Epic Games Store', platform: 'PC' };
    }

    if (urlLower.includes('humblebundle.com')) {
      return { store: 'Humble Bundle', platform: 'PC' };
    }

    return { store: 'Unknown', platform: 'PC' };
  };

  /**
   * Aggregiert Deals von verschiedenen Quellen
   */
  const aggregateFromSources = async (
    sources: DealSource[]
  ): Promise<ExternalDeal[]> => {
    const allDeals: ExternalDeal[] = [];

    for (const source of sources) {
      try {
        let sourceDeals: ExternalDeal[] = [];

        switch (source) {
          case 'steam':
            // sourceDeals = await fetchSteamDeals();
            break;
          case 'epic':
            // sourceDeals = await fetchEpicDeals();
            break;
          case 'gog':
            // sourceDeals = await fetchGOGDeals();
            break;
          case 'manual':
            sourceDeals = generateMockDeals();
            break;
        }

        allDeals.push(...sourceDeals);
      } catch (error) {
        console.error(`Failed to fetch deals from ${source}:`, error);
      }
    }

    return allDeals;
  };

  /**
   * Dedupliziert Deals basierend auf Titel und Store
   */
  const deduplicateDeals = (deals: ExternalDeal[]): ExternalDeal[] => {
    const seen = new Set<string>();
    const unique: ExternalDeal[] = [];

    for (const deal of deals) {
      const key = `${normalizeGameTitle(
        deal.title
      )}-${deal.storeName.toLowerCase()}`;

      if (!seen.has(key)) {
        seen.add(key);
        unique.push(deal);
      }
    }

    return unique;
  };

  return {
    normalizeGameTitle,
    calculateTitleSimilarity,
    validateDealData,
    isValidUrl,
    calculateDiscountPercent,
    generateMockDeals,
    cleanDealData,
    categorizeDealQuality,
    extractStoreInfo,
    aggregateFromSources,
    deduplicateDeals
  };
};
