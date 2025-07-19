import { defineStore } from 'pinia';
import { computed, readonly, ref } from 'vue';
import type { DealWithGame } from '~/lib/services/deals.service';
import { useLoading } from '~/stores/loading.store';
export type DealSortOptions =
  | 'discount-desc'
  | 'price-asc'
  | 'recent'
  | 'ending-soon'
  | 'rating-desc'
  | 'rating-asc';
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
  const { $client } = useNuxtApp();
  const notifyStore = useNotifyStore();

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
  // State für Background-Sync und UI
  const isBackgroundSyncing = ref(false);
  const lastSyncTime = ref<Date | null>(null);
  const syncProgress = ref<{
    current: number;
    total: number;
    message: string;
  } | null>(null);
  /**
   * Lädt Deals schnell aus der Datenbank (ohne Sync)
   * Grund: Sofortiges UI-Loading für bessere User Experience
   */
  async function loadDealsFromDB() {
    return await loading(
      'load-deals-db',
      'Lade aktuelle Deals...',
      async () => {
        error.value = null;
        try {
          const response = await $client.deals.loadDealsFromDB.query();
          deals.value = response.deals;
          return {
            deals: response.deals,
            totalCount: response.deals.length
          };
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
   * Grund: Vollständige Sync ohne UI-Blockierung mit Fortschrittsanzeige
   */
  async function syncAllDealsInBackground() {
    if (isBackgroundSyncing.value) {
      return;
    }
    isBackgroundSyncing.value = true;
    syncProgress.value = { current: 0, total: 0, message: 'Starte Sync...' };
    try {
      notifyStore.notify('Deals-Synchronisation im Hintergrund gestartet', 0);
      const response = await $client.deals.syncAllDealsBackground.mutate();
      lastSyncTime.value = new Date();
      // Grund: Detaillierte Benachrichtigung über erfolgreiche Sync
      notifyStore.notify(
        `Hintergrund-Sync abgeschlossen: ${response.totalSynced} Deals aus ${response.pagesProcessed} Seiten geladen`,
        0
      );
      // Grund: Deals nach Hintergrund-Sync neu laden mit aktuellen Pagination-Settings
      await loadDealsFromDB();
      return response;
    } catch (err: any) {
      console.error('Background sync failed:', err);
      notifyStore.notify('Hintergrund-Synchronisation fehlgeschlagen', 2);
    } finally {
      isBackgroundSyncing.value = false;
      syncProgress.value = null;
    }
  }
  /**
   * Setze Sortierung und lade Deals neu
   */
  async function setSortBy(sortBy: DealSortOptions) {
    currentSortBy.value = sortBy;
  }
  /**
   * Hole verfügbare Stores aus aktuellen Deals
   */
  function updateAvailableStores() {
    const stores = new Set<string>();
    deals.value.forEach(deal => stores.add(deal.storeName));
    availableStores.value = Array.from(stores).sort();
  }
  /**
   * Manuelle Aktualisierung aller Deals
   * Grund: Benutzer kann explizit alle Deals neu laden
   */
  async function refreshAllDeals() {
    return await loading(
      'refresh-all-deals',
      'Aktualisiere alle Deals...',
      async () => {
        try {
          // Schritt 1: Aktuelle Deals aus DB laden
          await loadDealsFromDB();
          // Schritt 2: Hintergrund-Sync für neue Deals starten
          syncAllDealsInBackground().catch(console.error);
          notifyStore.notify('Deals erfolgreich aktualisiert', 0);
          return { success: true };
        } catch (err: any) {
          error.value = err.message || 'Fehler beim Aktualisieren der Deals';
          notifyStore.notify(error.value, 3);
          throw err;
        }
      },
      'data'
    );
  }
  /**
   * Sucht Deals für ein bestimmtes Spiel
   * Grund: Game-Detail-Seite soll verwandte Deals anzeigen
   */
  async function searchGameDeals(
    gameId: number,
    gameName: string,
    slug?: string
  ): Promise<DealWithGame[]> {
    return await loading('search-game-deals', 'Suche Angebote...', async () => {
      try {
        const gameDeals = await $client.deals.searchGameDeals.query({
          gameId,
          gameName,
          slug
        });
        return gameDeals as DealWithGame[];
      } catch (err: any) {
        console.error('Fehler beim Laden der Game-Deals:', err);
        error.value = 'Fehler beim Laden der Angebote';
        return [];
      }
    });
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
      case 'rating-desc':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'rating-asc':
        return sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
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
    isBackgroundSyncing: readonly(isBackgroundSyncing),
    lastSyncTime: readonly(lastSyncTime),
    syncProgress: readonly(syncProgress),
    // Actions - Optimiert für bessere UX
    loadDealsFromDB,
    syncAllDealsInBackground,
    refreshAllDeals,
    setSortBy,
    updateAvailableStores,
    // Computed
    freebies,
    searchDeals,
    sortedDeals,
    // Helpers
    formatPrice,
    formatDiscount,
    searchGameDeals
  };
});
