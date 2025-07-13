import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';
import type { DealWithGame } from '~/lib/services/deals.service';
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
  const deals = ref<DealWithGame[]>([]);
  const bestDeals = ref<DealWithGame[]>([]);
  const freeGames = ref<DealWithGame[]>([]);
  const availableStores = ref<string[]>([]);
  const error = ref<string | null>(null);

  // Current filters und sorting
  const currentFilters = ref<DealSearchFilters>({});
  const currentSortBy = ref<DealSortOptions>('recent');

  const { $client } = useNuxtApp();

  /**
   * Synchronisiert CheapShark Deals und lädt alle Deals aus der Datenbank
   * Grund: Hauptfunktion für DealWithGame-Seite - lädt CheapShark, speichert neue, gibt DB-Deals zurück
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
   * Lädt Deals schnell aus der Datenbank (ohne Sync)
   * Grund: Sofortiges UI-Loading für bessere User Experience
   */
  async function loadDealsFromDB() {
    return await loading(
      'load-deals-db',
      'Lade aktuelle Deals...',
      async () => {
        const notifyStore = useNotifyStore();
        error.value = null;

        try {
          const response = await $client.deals.loadDealsFromDB.query({
            limit: 100
          });

          deals.value = response.deals;

          console.log(`${response.totalDeals} Deals aus Datenbank geladen`);
          return response;
        } catch (err: any) {
          error.value = err.message || 'Fehler beim Laden der Deals';
          notifyStore.notify(error.value, 3);
          console.error('Error loading deals from DB:', err);
          throw err;
        }
      },
      'data'
    );
  }

  /**
   * Synchronisiert alle CheapShark Deals im Hintergrund
   * Grund: Vollständige Sync ohne UI-Blockierung
   */
  async function syncAllDealsInBackground() {
    // Grund: Keine Loading-UI, läuft im Hintergrund
    const notifyStore = useNotifyStore();

    try {
      // Grund: Starte Hintergrund-Sync ohne Loading-Indikator
      const response = await $client.deals.syncAllDealsBackground.mutate({
        maxPages: 40, // Reduziert auf sicheren Wert (40 × 60 = 2400 Deals)
        cleanupDays: 7,
        stopOnEmpty: true,
        maxEmptyPages: 3,
        maxAge: 2500, // Nur Deals der letzten ~100 Tage
        rateLimitDelay: 1000 // Längere Pausen für bessere Rate-Limit-Compliance
      });

      // Grund: Detaillierte Benachrichtigung über erfolgreiche Sync
      notifyStore.notify(
        `Hintergrund-Sync abgeschlossen: ${response.totalSynced} Deals aus ${response.pagesProcessed} Seiten geladen (${response.stoppedReason})`,
        0
      );

      // Grund: Deals nach Hintergrund-Sync neu laden
      await loadDealsFromDB();

      return response;
    } catch (err: any) {
      console.error('Background sync failed:', err);
      // Grund: Stille Fehlerbehandlung - keine störende UI-Meldung
      notifyStore.notify('Hintergrund-Synchronisation fehlgeschlagen', 2);
    }
  }

  /**
   * Optimierte Kombination: Schneller Load + Hintergrund-Sync
   * Grund: Beste UX - sofortige Anzeige + vollständige Daten im Hintergrund
   */
  async function loadDealsWithBackgroundSync() {
    // Schritt 1: Schnell aus DB laden für sofortige UI
    const dbResult = await loadDealsFromDB();

    // Schritt 2: Hintergrund-Sync starten (ohne await)
    syncAllDealsInBackground().catch(console.error);

    return dbResult;
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
        (deal: DealWithGame) =>
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
    deals.value.filter((deal: DealWithGame) => deal.isFreebie)
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

    // Actions - Optimiert für bessere UX
    syncAndLoadDeals,
    loadDealsFromDB,
    syncAllDealsInBackground,
    loadDealsWithBackgroundSync,
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
