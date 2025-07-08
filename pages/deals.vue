<script setup lang="ts">
  import type {
    DealSortOptions,
    DealWithRelations
  } from '~/lib/services/deals.service';

  const userStore = useUserStore();
  // Using the store auto-import from Nuxt
  const dealsStore = useDealsStore();

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

  // Initialize data
  onMounted(async () => {
    await userStore.init();
    await dealsStore.fetchDeals();
    await dealsStore.fetchAvailableStores();
    await dealsStore.fetchDealStats();
  });

  // Computed properties for filters
  const availableStores = computed(() => [
    { value: 'all', label: 'Alle Stores' },
    ...dealsStore.availableStores.map((store: string) => ({
      value: store,
      label: store
    }))
  ]);
  const availableGenres = computed(() => {
    const genres = new Set<string>();
    dealsStore.deals.forEach(deal => {
      deal.game.genres.forEach(genre => genres.add(genre));
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

  // Filtered and sorted deals
  const filteredDeals = computed(() => {
    let filtered = dealsStore.searchDeals(searchQuery.value);

    filtered = filtered.filter(deal => {
      const matchesStore =
        selectedStore.value === 'all' || deal.storeName === selectedStore.value;
      const matchesGenre =
        selectedGenre.value === 'all' ||
        deal.game.genres.includes(selectedGenre.value);
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
  // Statistics
  const statistics = computed(() => {
    const stats = dealsStore.dealStats;
    return {
      totalDeals: stats?.totalDeals || dealsStore.deals.length,
      freeGames: stats?.freebies || dealsStore.freebies.length,
      averageDiscount: stats?.averageDiscount
        ? Math.round(stats.averageDiscount)
        : 0,
      maxDiscount: Math.max(
        ...dealsStore.deals.map(d => d.discountPercent || 0),
        0
      )
    };
  });

  // Watch for sort changes and apply to backend
  watch(sortBy, async newSort => {
    if (
      ['discount-desc', 'price-asc', 'recent', 'ending-soon'].includes(newSort)
    ) {
      await dealsStore.setSortBy(newSort as DealSortOptions);
    }
  });

  // Helper functions
  const getCoverUrl = (deal: DealWithRelations): string => {
    return deal.game.coverUrl || '/gameplaceholder.jpg';
  };

  const getGenreDisplay = (deal: DealWithRelations): string => {
    return deal.game.genres.slice(0, 2).join(', ') || 'Unbekannt';
  };

  const getTimeRemainingColor = (date: Date | null): string => {
    if (!date) return 'text-green-400';
    const remaining = dealsStore.getTimeRemaining(date.toISOString());
    if (!remaining || remaining === 'Abgelaufen') return 'text-red-400';
    if (remaining.includes('Stunde') || remaining.includes('Minute'))
      return 'text-red-400';
    if (remaining.includes('1 Tag')) return 'text-yellow-400';
    return 'text-green-400';
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Unbegrenzt';
    return dealsStore.getTimeRemaining(date.toISOString()) || 'Abgelaufen';
  };

  const isGameOwned = (deal: DealWithRelations): boolean => {
    // TODO: Implement ownership check against user's library
    return false;
  };

  const handleDealClick = (deal: DealWithRelations) => {
    if (deal.url) {
      window.open(deal.url, '_blank');
    }
  };

  const refreshDeals = async () => {
    await dealsStore.refreshDeals();
  };

  // Deal Aggregation (to be implemented)
  const isAggregating = ref(false);
  const aggregationMessage = ref<string | null>(null);

  const aggregateDeals = async () => {
    isAggregating.value = true;
    aggregationMessage.value = null;

    try {
      // TODO: Implement actual deal aggregation via TRPC
      // await $client.deals.aggregateDeals.mutate();

      aggregationMessage.value = `Deal-Aggregation noch nicht implementiert.`;

      // Auto-hide message after 3 seconds
      setTimeout(() => {
        aggregationMessage.value = null;
      }, 3000);
    } catch (error: unknown) {
      console.error('Deal aggregation failed:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unbekannter Fehler';
      aggregationMessage.value = `Fehler beim Sammeln der Deals: ${errorMessage}`;

      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        aggregationMessage.value = null;
      }, 5000);
    } finally {
      isAggregating.value = false;
    }
  };
</script>

<template>
  <div class="space-y-6">
    <!-- Header mit Statistiken -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="flex justify-between items-center mb-4">
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Aktuelle Angebote
        </h1>
        <!-- Refresh Button -->
        <div class="flex gap-2">
          <button
            @click="refreshDeals"
            :disabled="dealsStore.loading"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-2">
            <Icon
              name="heroicons:arrow-path-20-solid"
              class="w-4 h-4"
              :class="{ 'animate-spin': dealsStore.loading }" />
            Aktualisieren
          </button>

          <!-- Aggregate Deals Button -->
          <button
            @click="aggregateDeals"
            :disabled="isAggregating"
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-2">
            <Icon
              name="heroicons:cloud-arrow-down-20-solid"
              class="w-4 h-4"
              :class="{ 'animate-spin': isAggregating }" />
            Deals Sammeln
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="dealsStore.loading" class="text-center py-8">
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
          @click="refreshDeals"
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

      <!-- Statistics -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            {{ statistics.maxDiscount }}%
          </div>
          <div class="text-purple-300 text-sm">Höchster Rabatt</div>
        </div>
      </div>
    </div>

    <!-- Filter und Suche -->
    <div
      v-if="!dealsStore.loading && !dealsStore.error"
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

    <!-- Deals Grid -->
    <div
      v-if="!dealsStore.loading && !dealsStore.error"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="deal in filteredDeals"
        :key="deal.id"
        @click="handleDealClick(deal)"
        class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-green-500/50 transition-all duration-300 group cursor-pointer">
        <!-- Cover Image -->
        <div class="relative aspect-[3/4] overflow-hidden">
          <img
            :src="getCoverUrl(deal)"
            :alt="deal.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

          <!-- Store Badge -->
          <div
            class="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white">
            {{ deal.storeName }}
          </div>

          <!-- Discount Badge -->
          <div
            v-if="deal.discountPercent && deal.discountPercent > 0"
            class="absolute top-2 right-2 px-2 py-1 bg-green-600 rounded text-xs text-white font-bold">
            {{ dealsStore.formatDiscount(deal.discountPercent) }}
          </div>

          <!-- Free Badge -->
          <div
            v-if="deal.isFreebie"
            class="absolute top-2 right-2 px-2 py-1 bg-green-600 rounded text-xs text-white font-bold">
            KOSTENLOS
          </div>

          <!-- Library Badge -->
          <div
            v-if="isGameOwned(deal)"
            class="absolute bottom-2 left-2 px-2 py-1 bg-purple-600/80 backdrop-blur-sm rounded text-xs text-white">
            <Icon name="heroicons:check-20-solid" class="w-3 h-3 inline mr-1" />
            Besitzen
          </div>
        </div>

        <!-- Deal Info -->
        <div class="p-4">
          <h3
            class="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-green-300 transition-colors">
            {{ deal.title }}
          </h3>

          <div class="space-y-2 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-gray-400">Genre:</span>
              <span class="text-gray-300">{{ getGenreDisplay(deal) }}</span>
            </div>

            <!-- Preise -->
            <div class="space-y-1">
              <div
                v-if="!deal.isFreebie"
                class="flex justify-between items-center">
                <span class="text-gray-400">Preis:</span>
                <div class="text-right">
                  <div class="text-green-400 font-bold">
                    {{ dealsStore.formatPrice(deal.price) }}
                  </div>
                  <div
                    v-if="
                      deal.originalPrice &&
                      deal.originalPrice > (deal.price || 0)
                    "
                    class="text-gray-500 line-through text-xs">
                    {{ dealsStore.formatPrice(deal.originalPrice) }}
                  </div>
                </div>
              </div>
              <div v-else class="text-center">
                <div class="text-green-400 font-bold text-lg">KOSTENLOS</div>
              </div>
            </div>

            <!-- Gültigkeitsdauer -->
            <div
              v-if="deal.validUntil"
              class="flex justify-between items-center">
              <span class="text-gray-400">Gültig:</span>
              <span
                :class="getTimeRemainingColor(deal.validUntil)"
                class="font-medium">
                {{ formatDate(deal.validUntil) }}
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-4 space-y-2">
            <button
              v-if="!isGameOwned(deal)"
              @click.stop="handleDealClick(deal)"
              class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
              {{ deal.isFreebie ? 'Kostenlos holen' : 'Deal ansehen' }}
            </button>
            <button
              v-else
              disabled
              class="w-full px-4 py-2 bg-gray-600 text-gray-300 font-medium rounded-lg cursor-not-allowed">
              Bereits in Bibliothek
            </button>

            <button
              @click.stop
              class="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
              <Icon
                name="heroicons:heart-20-solid"
                class="w-4 h-4 inline mr-2" />
              Zur Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Leerer Zustand -->
    <div
      v-if="
        !dealsStore.loading && !dealsStore.error && filteredDeals.length === 0
      "
      class="text-center py-12">
      <Icon
        name="heroicons:tag-20-solid"
        class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-400 mb-2">
        Keine Angebote gefunden
      </h3>
      <p class="text-gray-500">Versuchen Sie, Ihre Suchkriterien zu ändern.</p>
    </div>

    <!-- No deals state when store is empty -->
    <div
      v-if="
        !dealsStore.loading &&
        !dealsStore.error &&
        dealsStore.deals.length === 0
      "
      class="text-center py-12">
      <Icon
        name="heroicons:tag-20-solid"
        class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-400 mb-2">
        Keine Angebote verfügbar
      </h3>
      <p class="text-gray-500 mb-4">
        Es sind derzeit keine Deals in der Datenbank.
      </p>
      <button
        @click="refreshDeals"
        class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
        Angebote laden
      </button>
    </div>
  </div>

  <!-- Loading Overlay -->
  <LoadingOverlay />
</template>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
  }
</style>
