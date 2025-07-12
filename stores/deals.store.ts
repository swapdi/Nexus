import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';
import type { Deal } from '~/prisma/client';
import { useLoading } from '~/stores/loading.store';

export type DealSortOptions =
  | 'discount-desc'
  | 'price-asc'
  | 'recent'
  | 'ending-soon';

export interface DealSearchFilters {
  gameId?: number;
  storeName?: string;
  priceMax?: number;
  priceMin?: number;
  discountMin?: number;
  isFreebie?: boolean;
  isActive?: boolean;
  source?: string;
  limit?: number;
  offset?: number;
}

export const useDealsStore = defineStore('deals', () => {
  // Loading store integration
  const { loading } = useLoading();

  // State
  const deals = ref<Deal[]>([]);
  const bestDeals = ref<Deal[]>([]);
  const freeGames = ref<Deal[]>([]);
  const availableStores = ref<string[]>([]);
  const error = ref<string | null>(null);

  // Current filters und sorting
  const currentFilters = ref<DealSearchFilters>({});
  const currentSortBy = ref<DealSortOptions>('recent');

  const { $client } = useNuxtApp();

  /**
   * Synchronisiert CheapShark Deals und lädt alle Deals aus der Datenbank
   * Grund: Hauptfunktion für Deal-Seite - lädt CheapShark, speichert neue, gibt DB-Deals zurück
   */
  async function syncAndLoadDeals() {
    return await loading(
      'sync-and-load-deals',
      'Synchronisiere Deals und lade aus Datenbank...',
      async () => {
        const notifyStore = useNotifyStore();
        error.value = null;

        try {
          // Grund: Neue Router-Funktion die CheapShark sync + DB load kombiniert
          const response = await $client.deals.syncAndLoadDeals.query({
            pageSize: 50,
            sortBy: 'Deal Rating',
            desc: true,
            cleanupDays: 7
          });

          // Grund: Deals in Store setzen
          deals.value = response.deals;

          // Grund: Erfolgreiche Synchronisation melden
          notifyStore.notify(
            `${response.syncedCount} Deals synchronisiert, ${response.totalDeals} Deals geladen`,
            0
          );

          return response;
        } catch (err: any) {
          error.value = err.message || 'Fehler beim Synchronisieren der Deals';
          notifyStore.notify(error.value, 3);
          console.error('Error syncing and loading deals:', err);
          throw err;
        }
      },
      'data'
    );
  }

  /**
   * Fallback: Lade nur Deals aus Datenbank (ohne CheapShark sync)
   */
  async function fetchDeals(filters?: DealSearchFilters) {
    return await loading(
      'deals-fetch',
      'Lade aktuelle Deals...',
      async () => {
        const notifyStore = useNotifyStore();
        error.value = null;

        try {
          const filtersToUse = { ...filters, isActive: true };

          const response = await $client.deals.getAllDeals.query(filtersToUse);

          console.log(response);
          deals.value = response;
          currentFilters.value = filtersToUse;
        } catch (err: any) {
          error.value = err.message || 'Fehler beim Laden der Angebote';
          notifyStore.notify(error.value, 3);
          console.error('Error fetching deals:', err);
          throw err;
        }
      },
      'data'
    );
  }

  /**
   * Setze Filter und lade Deals neu
   */
  async function setFilters(filters: DealSearchFilters) {
    currentFilters.value = filters;
    await fetchDeals(filters);
  }

  /**
   * Setze Sortierung und lade Deals neu
   */
  async function setSortBy(sortBy: DealSortOptions) {
    currentSortBy.value = sortBy;
    // Sortierung wird lokal angewendet, kein API-Call nötig
  }

  /**
   * Lösche alle Filter
   */
  async function clearFilters() {
    const emptyFilters: DealSearchFilters = {};
    currentFilters.value = emptyFilters;
    currentSortBy.value = 'recent';
    await fetchDeals(emptyFilters);
  }

  /**
   * Refresh/reload aktueller Deals
   */
  async function refreshDeals() {
    await syncAndLoadDeals();
  }

  /**
   * Hole verfügbare Stores aus aktuellen Deals
   */
  function updateAvailableStores() {
    const stores = new Set<string>();
    deals.value.forEach(deal => stores.add(deal.storeName));
    availableStores.value = Array.from(stores).sort();
  }

  // Computed Properties

  /**
   * Lokale Suche in geladenen Deals
   */
  const searchDeals = computed(() => {
    return (searchTerm: string) => {
      if (!searchTerm.trim()) return sortedDeals.value;

      const term = searchTerm.toLowerCase();
      return sortedDeals.value.filter(
        (deal: Deal) =>
          deal.title.toLowerCase().includes(term) ||
          deal.storeName.toLowerCase().includes(term)
      );
    };
  });

  /**
   * Sortierte Deals basierend auf currentSortBy
   */
  const sortedDeals = computed(() => {
    const sorted = [...deals.value];

    switch (currentSortBy.value) {
      case 'discount-desc':
        return sorted.sort(
          (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0)
        );
      case 'price-asc':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'recent':
        return sorted.sort(
          (a, b) =>
            new Date(b.discoveredAt).getTime() -
            new Date(a.discoveredAt).getTime()
        );
      case 'ending-soon':
        return sorted.sort((a, b) => {
          if (!a.validUntil && !b.validUntil) return 0;
          if (!a.validUntil) return 1;
          if (!b.validUntil) return -1;
          return (
            new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime()
          );
        });
      default:
        return sorted;
    }
  });

  /**
   * Freebies (kostenlose Spiele) aus aktuellen Deals
   */
  const freebies = computed(() =>
    deals.value.filter((deal: Deal) => deal.isFreebie)
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

  return {
    // State
    deals: readonly(deals),
    bestDeals: readonly(bestDeals),
    freeGames: readonly(freeGames),
    availableStores: readonly(availableStores),
    error: readonly(error),
    currentFilters: readonly(currentFilters),
    currentSortBy: readonly(currentSortBy),

    // Actions - Nur die wichtigsten für den Workflow
    syncAndLoadDeals,
    fetchDeals,
    setFilters,
    setSortBy,
    clearFilters,
    refreshDeals,
    updateAvailableStores,

    // Computed
    searchDeals,
    sortedDeals,
    freebies,

    // Helpers
    formatPrice,
    formatDiscount
  };
});
