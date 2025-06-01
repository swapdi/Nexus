import type { any } from 'zod/v4';
import type {
  DealWithRelations,
  DealFilters,
  DealSortOptions
} from '~/lib/services/deals.service';

export const useDealsStore = defineStore('deals', () => {
  // State
  const deals = ref<DealWithRelations[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const availableStores = ref<string[]>([]);
  const dealStats = ref<{
    totalDeals: number;
    freebies: number;
    averageDiscount: number;
    topStores: Array<{ name: string; count: number }>;
  } | null>(null);

  // Current filters and sorting
  const currentFilters = ref<DealFilters>({});
  const currentSortBy = ref<DealSortOptions>('recent');

  const { $client } = useNuxtApp();

  /**
   * Lade alle Deals mit aktuellen Filtern
   */
  async function fetchDeals(filters?: DealFilters, sortBy?: DealSortOptions) {
    loading.value = true;
    error.value = null;

    try {
      const filtersToUse = filters || currentFilters.value;
      const sortToUse = sortBy || currentSortBy.value;

      const response = await $client.deals.getDeals.query({
        filters: filtersToUse,
        sortBy: sortToUse
      });

      if (response.success) {
        deals.value = response.deals;
        currentFilters.value = filtersToUse;
        currentSortBy.value = sortToUse;
      }
    } catch (err) {
      console.error('Error fetching deals:', err);
      error.value = 'Fehler beim Laden der Angebote';
    } finally {
      loading.value = false;
    }
  }

  /**
   * Lade verfügbare Stores für Filter
   */
  async function fetchAvailableStores() {
    try {
      const response = await $client.deals.getAvailableStores.query();
      if (response.success) {
        availableStores.value = response.stores;
      }
    } catch (err) {
      console.error('Error fetching available stores:', err);
    }
  }

  /**
   * Lade Deal-Statistiken
   */
  async function fetchDealStats() {
    try {
      const response = await $client.deals.getDealStats.query();
      if (response.success) {
        dealStats.value = response.stats;
      }
    } catch (err) {
      console.error('Error fetching deal stats:', err);
    }
  }

  /**
   * Lade Deals für ein bestimmtes Spiel
   */
  async function fetchDealsByGameId(
    gameId: number
  ): Promise<DealWithRelations[]> {
    try {
      const response = await $client.deals.getDealsByGameId.query({ gameId });
      if (response.success) {
        return response.deals;
      }
      return [];
    } catch (err) {
      console.error('Error fetching deals by game ID:', err);
      return [];
    }
  }

  /**
   * Setze Filter und lade Deals neu
   */
  async function setFilters(filters: DealFilters) {
    await fetchDeals(filters, currentSortBy.value);
  }

  /**
   * Setze Sortierung und lade Deals neu
   */
  async function setSortBy(sortBy: DealSortOptions) {
    await fetchDeals(currentFilters.value, sortBy);
  }

  /**
   * Lösche alle Filter
   */
  async function clearFilters() {
    const emptyFilters: DealFilters = {};
    await fetchDeals(emptyFilters, 'recent');
  }

  /**
   * Refresh/reload aktueller Deals
   */
  async function refreshDeals() {
    await fetchDeals();
  }

  // Computed Properties

  /**
   * Gefilterte Deals für lokale Suche
   */
  const searchDeals = computed(() => {
    return (searchTerm: string) => {
      if (!searchTerm.trim()) return deals.value;

      const term = searchTerm.toLowerCase();
      return deals.value.filter(
        (deal: DealWithRelations) =>
          deal.title.toLowerCase().includes(term) ||
          deal.game.title.toLowerCase().includes(term) ||
          deal.storeName.toLowerCase().includes(term) ||
          deal.game.genres.some((genre: string) =>
            genre.toLowerCase().includes(term)
          )
      );
    };
  });

  /**
   * Freebies (kostenlose Spiele)
   */
  const freebies = computed(() =>
    deals.value.filter((deal: DealWithRelations) => deal.isFreebie)
  );

  /**
   * Deals mit hohen Rabatten (>= 75%)
   */
  const highDiscountDeals = computed(() =>
    deals.value.filter(
      (deal: DealWithRelations) =>
        deal.discountPercent && deal.discountPercent >= 75
    )
  );

  /**
   * Deals die bald ablaufen (innerhalb 24 Stunden)
   */
  const endingSoonDeals = computed(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return deals.value.filter(
      (deal: DealWithRelations) =>
        deal.validUntil &&
        new Date(deal.validUntil) <= tomorrow &&
        new Date(deal.validUntil) > new Date()
    );
  });

  /**
   * Gruppiere Deals nach Store
   */
  const dealsByStore = computed(() => {
    const grouped: Record<string, DealWithRelations[]> = {};

    deals.value.forEach((deal: DealWithRelations) => {
      if (!grouped[deal.storeName]) {
        grouped[deal.storeName] = [];
      }
      grouped[deal.storeName].push(deal);
    });

    return grouped;
  });

  /**
   * Günstigste Deals (unter 10€)
   */
  const cheapDeals = computed(() =>
    deals.value
      .filter(
        (deal: DealWithRelations) =>
          deal.price !== null && deal.price > 0 && deal.price <= 10
      )
      .sort(
        (a: DealWithRelations, b: DealWithRelations) =>
          (a.price || 0) - (b.price || 0)
      )
  );

  // Helper Functions

  /**
   * Formatiere Preis
   */
  function formatPrice(price: number | null): string {
    if (price === null || price === 0) return 'Kostenlos';
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  }

  /**
   * Formatiere Rabatt
   */
  function formatDiscount(discount: number | null): string {
    if (!discount) return '';
    return `-${Math.round(discount)}%`;
  }

  /**
   * Berechne verbleibende Zeit für Deal
   */
  function getTimeRemaining(validUntil: string | null): string | null {
    if (!validUntil) return null;

    const now = new Date();
    const end = new Date(validUntil);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Abgelaufen';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} Tag${days === 1 ? '' : 'e'}`;
    if (hours > 0) return `${hours} Stunde${hours === 1 ? '' : 'n'}`;

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes} Minute${minutes === 1 ? '' : 'n'}`;
  }

  /**
   * Prüfe ob Deal bald abläuft (< 24h)
   */
  function isEndingSoon(validUntil: string | null): boolean {
    if (!validUntil) return false;

    const now = new Date();
    const end = new Date(validUntil);
    const diff = end.getTime() - now.getTime();

    return diff > 0 && diff <= 24 * 60 * 60 * 1000; // 24 Stunden
  }

  return {
    // State
    deals: readonly(deals),
    loading: readonly(loading),
    error: readonly(error),
    availableStores: readonly(availableStores),
    dealStats: readonly(dealStats),
    currentFilters: readonly(currentFilters),
    currentSortBy: readonly(currentSortBy),

    // Actions
    fetchDeals,
    fetchAvailableStores,
    fetchDealStats,
    fetchDealsByGameId,
    setFilters,
    setSortBy,
    clearFilters,
    refreshDeals,

    // Computed
    searchDeals,
    freebies,
    highDiscountDeals,
    endingSoonDeals,
    dealsByStore,
    cheapDeals,

    // Helpers
    formatPrice,
    formatDiscount,
    getTimeRemaining,
    isEndingSoon
  };
});
