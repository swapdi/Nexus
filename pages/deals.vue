<script setup lang="ts">
  import type { DealWithGame } from '~/lib/services/deals.service';
  import type { DealSortOptions } from '~/stores/deals.store';
  const userStore = useUserStore();
  const dealsStore = useDealsStore();
  const gamesStore = useGamesStore();
  const loadingStore = useLoadingStore();
  const { currentViewMode, getCurrentConfig } = useViewMode();
  definePageMeta({
    middleware: ['auth'],
    title: 'Angebote',
    layout: 'authenticated'
  });
  // Local state for UI filters
  const searchQuery = ref('');
  const selectedStore = ref<string>('all');
  const showOnlyFree = ref(false);
  const hideOwned = ref(false);
  const sortBy = ref<DealSortOptions>('discount-desc');

  // Pagination state
  const currentPage = ref(1);
  const pageSize = ref(25); // Standard: 25 Deals pro Seite
  const pageSizeOptions = [25, 50, 100];
  const totalDeals = ref(0);

  // Loading state aus LoadingStore
  const isLoading = computed(() => loadingStore.isLoading);
  // Initialize data
  onMounted(async () => {
    await userStore.init();
    await loadAllDeals(); // Lade alle Deals für Filter und Suche
    dealsStore.updateAvailableStores();
  });

  // Load all deals for filtering and searching
  const loadAllDeals = async () => {
    // Lade alle Deals ohne Limit für vollständige Filter-/Suchfunktionalität
    const result = await dealsStore.loadDealsFromDB(); // Hoher Wert um alle zu laden
    totalDeals.value = result?.totalCount || dealsStore.deals.length;
  };

  // Computed properties for pagination
  const totalPages = computed(() =>
    Math.ceil(filteredDealsAll.value.length / pageSize.value)
  );
  const startItem = computed(
    () => (currentPage.value - 1) * pageSize.value + 1
  );
  const endItem = computed(() =>
    Math.min(currentPage.value * pageSize.value, filteredDealsAll.value.length)
  );

  // Computed properties for filters
  const availableStores = computed(() => {
    const stores = new Set<string>();
    dealsStore.deals.forEach(deal => {
      if (deal.storeName) {
        stores.add(deal.storeName);
      }
    });
    return [
      { value: 'all', label: 'Alle Stores' },
      ...Array.from(stores).map((storeName: string) => ({
        value: storeName,
        label: storeName
      }))
    ];
  });

  const availableGenres = computed(() => {
    const genres = new Set<string>();
    dealsStore.deals.forEach(deal => {
      // Grund: Prüfe ob Game existiert bevor auf genres zugegriffen wird
      if (deal.game?.genres) {
        deal.game.genres.forEach(genre => genres.add(genre));
      }
    });
    return [
      { value: 'all', label: 'Alle Genres' },
      ...Array.from(genres).map((genre: string) => ({
        value: genre,
        label: genre
      }))
    ];
  });
  const selectedGenre = ref<string>('all');

  // Alle gefilterten und sortierten Deals (für Statistiken und Gesamtzahl)
  const filteredDealsAll = computed(() => {
    let filtered = dealsStore.searchDeals(searchQuery.value);
    filtered = filtered.filter(deal => {
      const matchesStore =
        selectedStore.value === 'all' || deal.storeName === selectedStore.value;
      const matchesGenre =
        selectedGenre.value === 'all' ||
        (deal.game?.genres && deal.game.genres.includes(selectedGenre.value));
      const matchesFree = !showOnlyFree.value || deal.isFreebie;
      const matchesOwned = !hideOwned.value || !isGameOwned(deal);
      return matchesStore && matchesGenre && matchesFree && matchesOwned;
    });
    // Sort deals
    const sortedDeals = [...filtered];
    switch (sortBy.value) {
      case 'discount-desc':
        sortedDeals.sort(
          (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0)
        );
        break;
      case 'price-asc':
        sortedDeals.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'recent':
        sortedDeals.sort(
          (a, b) =>
            new Date(b.discoveredAt).getTime() -
            new Date(a.discoveredAt).getTime()
        );
        break;
      case 'ending-soon':
        sortedDeals.sort((a, b) => {
          if (!a.validUntil && !b.validUntil) return 0;
          if (!a.validUntil) return 1;
          if (!b.validUntil) return -1;
          return (
            new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime()
          );
        });
        break;
    }
    return sortedDeals;
  });

  // Aktuelle Seite der gefilterten Deals für die Anzeige
  const filteredDeals = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return filteredDealsAll.value.slice(startIndex, endIndex);
  });
  // Statistics basierend auf allen Deals (nicht nur aktuelle Seite)
  const statistics = computed(() => {
    const allDeals = dealsStore.deals;
    const freeDeals = allDeals.filter(deal => deal.isFreebie);
    return {
      totalDeals: allDeals.length,
      freeGames: freeDeals.length,
      averageDiscount:
        allDeals.length > 0
          ? Math.round(
              allDeals.reduce(
                (sum, deal) => sum + (deal.discountPercent || 0),
                0
              ) / allDeals.length
            )
          : 0,
      maxDiscount:
        Math.round(
          Math.max(...allDeals.map(d => d.discountPercent || 0), 0) * 100
        ) / 100
    };
  });

  // Watch für Filter-Änderungen um auf Seite 1 zurückzusetzen
  watch(
    [searchQuery, selectedStore, selectedGenre, showOnlyFree, hideOwned],
    () => {
      currentPage.value = 1; // Bei Filter-Änderung zurück zu Seite 1
    }
  );

  // Intelligente Pagination: Zeige einen Bereich um die aktuelle Seite
  const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const pages = [];

    if (total <= 7) {
      // Wenn weniger als 7 Seiten: Zeige alle
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Komplexere Logik für mehr als 7 Seiten
      if (current <= 4) {
        // Am Anfang: 1,2,3,4,5,...,total
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        if (total > 6) {
          pages.push('...');
          pages.push(total);
        }
      } else if (current >= total - 3) {
        // Am Ende: 1,...,total-4,total-3,total-2,total-1,total
        pages.push(1);
        if (total > 6) {
          pages.push('...');
        }
        for (let i = Math.max(1, total - 4); i <= total; i++) {
          if (i > 1 || total <= 6) {
            pages.push(i);
          }
        }
      } else {
        // In der Mitte: 1,...,current-1,current,current+1,...,total
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total);
      }
    }

    return pages;
  });
  // Watch for sort changes and apply to backend
  watch(sortBy, async newSort => {
    if (
      [
        'discount-desc',
        'price-asc',
        'recent',
        'ending-soon',
        'rating-desc',
        'rating-asc'
      ].includes(newSort)
    ) {
      await dealsStore.setSortBy(newSort as DealSortOptions);
    }
  });
  // Helper functions
  const isGameOwned = (deal: DealWithGame): boolean => {
    // Prüfe ob das Spiel in der Bibliothek des Users vorhanden ist
    return gamesStore.games.some(
      (userGame: any) => userGame.gameId === deal.gameId
    );
  };
  const handleDealClick = (deal: DealWithGame) => {
    if (deal.url) {
      window.open(deal.url, '_blank');
    }
  };
  // Deal Aggregation
  const aggregationMessage = ref<string | null>(null);
</script>
<template>
  <div class="space-y-6">
    <!-- Background Sync Status -->
    <DealsBackgroundSync />
    <!-- Header mit Statistiken -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="flex justify-between items-center mb-4">
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Aktuelle Angebote
        </h1>
        <!-- Neue Refresh Controls -->
        <DealsRefreshControls :deals-count="filteredDeals.length" />
      </div>
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-8">
        <Icon
          name="heroicons:arrow-path-20-solid"
          class="w-8 h-8 animate-spin text-green-400 mx-auto mb-2" />
        <p class="text-gray-400">Lade Angebote...</p>
      </div>
      <!-- Error State -->
      <div v-else-if="dealsStore.error" class="text-center py-8">
        <Icon
          name="heroicons:exclamation-triangle-20-solid"
          class="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p class="text-red-400">{{ dealsStore.error }}</p>
        <button
          @click="() => dealsStore.refreshAllDeals()"
          class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
          Erneut versuchen
        </button>
      </div>
      <!-- Aggregation Message -->
      <div
        v-if="aggregationMessage"
        class="mb-4 p-4 rounded-lg border"
        :class="
          aggregationMessage.includes('Fehler')
            ? 'bg-red-900/20 border-red-500/30 text-red-300'
            : 'bg-green-900/20 border-green-500/30 text-green-300'
        ">
        <div class="flex items-center gap-2">
          <Icon
            :name="
              aggregationMessage.includes('Fehler')
                ? 'heroicons:exclamation-triangle-20-solid'
                : 'heroicons:check-circle-20-solid'
            "
            class="w-5 h-5 flex-shrink-0" />
          <span>{{ aggregationMessage }}</span>
        </div>
      </div>
      <!-- Info-Box für DB vs API -->
      <div
        v-if="!isLoading && !dealsStore.error && dealsStore.deals.length > 0"
        class="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <div class="flex items-center gap-2 text-sm text-blue-300">
          <Icon
            name="heroicons:information-circle-20-solid"
            class="w-4 h-4 flex-shrink-0" />
          <span
            >Showing deals from database. Use "Sync API" to fetch latest deals
            from CheapShark.</span
          >
        </div>
      </div>
      <!-- Statistics -->
      <div
        v-if="!isLoading && !dealsStore.error"
        class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          class="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
          <div class="text-2xl font-bold text-white">
            {{ statistics.totalDeals }}
          </div>
          <div class="text-green-300 text-sm">Aktuelle Deals</div>
        </div>
        <div
          class="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
          <div class="text-2xl font-bold text-white">
            {{ statistics.freeGames }}
          </div>
          <div class="text-blue-300 text-sm">Kostenlose Spiele</div>
        </div>
        <div
          class="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
          <div class="text-2xl font-bold text-white">
            {{ statistics.maxDiscount.toFixed(2) }}%
          </div>
          <div class="text-purple-300 text-sm">Höchster Rabatt</div>
        </div>
      </div>
    </div>
    <!-- Filter und Suche -->
    <div
      v-if="!isLoading && !dealsStore.error"
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <!-- Suche -->
        <div class="lg:col-span-2">
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Suchen</label
          >
          <div class="relative">
            <Icon
              name="heroicons:magnifying-glass-20-solid"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Spiel suchen..."
              class="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
          </div>
        </div>
        <!-- Store Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Store</label
          >
          <select
            v-model="selectedStore"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
            <option
              v-for="store in availableStores"
              :key="store.value"
              :value="store.value">
              {{ store.label }}
            </option>
          </select>
        </div>
        <!-- Genre Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Genre</label
          >
          <select
            v-model="selectedGenre"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
            <option
              v-for="genre in availableGenres"
              :key="genre.value"
              :value="genre.value">
              {{ genre.label }}
            </option>
          </select>
        </div>
        <!-- Sortierung -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Sortieren</label
          >
          <select
            v-model="sortBy"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
            <option value="discount-desc">Höchster Rabatt</option>
            <option value="price-asc">Niedrigster Preis</option>
            <option value="recent">Neueste zuerst</option>
            <option value="ending-soon">Läuft bald ab</option>
            <option value="rating-desc">Beste Bewertung</option>
            <option value="rating-asc">Schlechteste Bewertung</option>
          </select>
        </div>
        <!-- Toggle Filter -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-300">Filter</label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                v-model="showOnlyFree"
                type="checkbox"
                class="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2" />
              <span class="ml-2 text-sm text-gray-300">Nur kostenlos</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="hideOwned"
                type="checkbox"
                class="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2" />
              <span class="ml-2 text-sm text-gray-300">Besitze ausblenden</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div
      v-if="!isLoading && !dealsStore.error && filteredDealsAll.length > 0"
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <!-- Pagination Info and Page Size Selector -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-300">Pro Seite:</label>
            <select
              v-model="pageSize"
              @change="currentPage = 1"
              class="px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option v-for="size in pageSizeOptions" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </div>
        </div>

        <!-- Pagination Navigation -->
        <div class="flex items-center gap-2">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 text-sm bg-gray-700/50 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600/50 rounded text-white transition-colors flex items-center gap-1">
            <Icon name="heroicons:chevron-left-20-solid" class="w-4 h-4" />
            Zurück
          </button>

          <!-- Page Numbers -->
          <div class="flex items-center gap-1">
            <template
              v-for="(page, index) in visiblePages"
              :key="`page-${index}`">
              <!-- Ellipsis -->
              <span v-if="page === '...'" class="text-gray-400 px-2 text-sm">
                ...
              </span>
              <!-- Page Number -->
              <button
                v-else
                @click="typeof page === 'number' && (currentPage = page)"
                class="px-3 py-1.5 text-sm rounded transition-colors"
                :class="
                  page === currentPage
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700/50 hover:bg-gray-600/50 text-white border border-gray-600/50'
                ">
                {{ page }}
              </button>
            </template>
          </div>

          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1.5 text-sm bg-gray-700/50 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600/50 rounded text-white transition-colors flex items-center gap-1">
            Weiter
            <Icon name="heroicons:chevron-right-20-solid" class="w-4 h-4" />
          </button>
        </div>
        <ViewModeToggle />
      </div>
    </div>

    <!-- Deals Grid/List -->
    <div
      v-if="!isLoading && !dealsStore.error"
      :class="getCurrentConfig().gridClass">
      <DealCard
        v-for="deal in filteredDeals"
        :key="deal.id"
        :deal="deal"
        :viewMode="currentViewMode"
        @click="handleDealClick" />
    </div>
    <!-- No deals state when store is empty -->
    <div
      v-if="!isLoading && !dealsStore.error && dealsStore.deals.length === 0"
      class="text-center py-12">
      <Icon
        name="heroicons:tag-20-solid"
        class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-400 mb-2">
        Keine Angebote verfügbar
      </h3>
      <p class="text-gray-500 mb-4">
        Es konnten keine passenden Deals gefunden werden.
      </p>
      <div class="flex gap-2 justify-center">
        <button
          @click="() => dealsStore.syncAllDealsInBackground()"
          :disabled="isLoading"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-2"
          title="Neue Deals von CheapShark API synchronisieren">
          <Icon
            name="heroicons:cloud-arrow-down-20-solid"
            class="w-4 h-4"
            :class="{ 'animate-spin': isLoading }" />
          <span class="hidden sm:inline">Sync API</span>
        </button>
      </div>
      <p class="text-sm text-gray-600 mt-3">
        Verwenden Sie "Von API laden" um neue Deals von CheapShark und
        IsThereAnyDeal zu synchronisieren.
      </p>
    </div>
  </div>
</template>
