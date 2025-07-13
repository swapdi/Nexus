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
  const currentSortBy = ref<DealSortOptions>('recent');

  const { $client } = useNuxtApp();

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
   * Setze Sortierung und lade Deals neu
   */
  async function setSortBy(sortBy: DealSortOptions) {
    currentSortBy.value = sortBy;
    // Sortierung wird lokal angewendet, kein API-Call nötig
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

    // Actions - Optimiert für bessere UX
    loadDealsFromDB,
    syncAllDealsInBackground,
    loadDealsWithBackgroundSync,
    setSortBy,
    updateAvailableStores,

    // Computed
    freebies,
    searchDeals,

    // Helpers
    formatPrice,
    formatDiscount
  };
});
