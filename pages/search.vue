<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="flex items-center justify-between mb-4">
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Suchergebnisse
        </h1>
        <!-- Search Stats -->
        <div class="text-sm text-gray-400">
          <span v-if="searchQuery">Suche nach "{{ searchQuery }}"</span>
        </div>
      </div>
      <!-- Search Input -->
      <div class="space-y-4">
        <div class="relative max-w-md">
          <Icon
            name="heroicons:magnifying-glass-20-solid"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            v-model="newSearchQuery"
            @keydown.enter="performNewSearch"
            type="text"
            placeholder="Neue Suche..."
            class="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
        </div>

        <!-- Advanced Search Toggle -->
        <button
          @click="showAdvancedSearch = !showAdvancedSearch"
          class="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
          <Icon
            :name="
              showAdvancedSearch
                ? 'heroicons:chevron-up-20-solid'
                : 'heroicons:chevron-down-20-solid'
            "
            class="w-4 h-4" />
          Erweiterte Suche
        </button>

        <!-- Advanced Search Filters -->
        <div
          v-if="showAdvancedSearch"
          class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
          <!-- Genre Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2"
              >Genre</label
            >
            <select
              v-model="selectedGenre"
              @change="applyFilters"
              class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Alle Genres</option>
              <option
                v-for="genre in availableGenres"
                :key="genre"
                :value="genre">
                {{ genre }}
              </option>
            </select>
          </div>

          <!-- Release Year Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2"
              >Jahr</label
            >
            <select
              v-model="selectedYear"
              @change="applyFilters"
              class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Alle Jahre</option>
              <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>

          <!-- Sort By -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2"
              >Sortierung</label
            >
            <select
              v-model="sortBy"
              @change="applyFilters"
              class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="year-desc">Neuste zuerst</option>
              <option value="year-asc">Älteste zuerst</option>
              <option value="rating-desc">Bewertung (hoch-niedrig)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!-- Database Results Section -->
    <div
      v-if="filteredDbResults.length > 0"
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-white flex items-center gap-2">
          <Icon
            name="heroicons:server-20-solid"
            class="w-5 h-5 text-purple-400" />
          Spiele in der Datenbank ({{ filteredDbResults.length }})
        </h2>
        <ViewModeToggle />
      </div>
      <!-- DB Results Grid -->
      <div :class="getCurrentConfig().gridClass">
        <GameCardSimple
          v-for="game in filteredDbResults"
          :key="game.id"
          :game="game"
          :viewMode="currentViewMode"
          :isSelectionMode="false"
          :isSelected="false"
          :showFavoriteButton="false"
          :showWishlistButton="true"
          @click="navigateToGame(game)" />
      </div>
    </div>
    <!-- IGDB Search Section -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-white flex items-center gap-2">
          <Icon
            name="heroicons:cloud-20-solid"
            class="w-5 h-5 text-green-400" />
          IGDB-Suche erweitern
        </h2>
      </div>
      <!-- IGDB Search Button -->
      <div v-if="!igdbSearched" class="text-center py-8">
        <Icon
          name="heroicons:cloud-arrow-down-20-solid"
          class="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-400 mb-2">
          Suche in der IGDB-Datenbank
        </h3>
        <p class="text-gray-500 mb-6">
          Erweitern Sie Ihre Suche um die umfassende IGDB-Spieledatenbank
        </p>
        <button
          @click="searchIGDB"
          :disabled="isIgdbLoading"
          class="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto">
          <Icon
            name="heroicons:cloud-arrow-down-20-solid"
            class="w-5 h-5"
            :class="{ 'animate-pulse': isIgdbLoading }" />
          {{ isIgdbLoading ? 'Suche...' : 'In IGDB suchen' }}
        </button>
      </div>
      <!-- IGDB Loading -->
      <div v-if="isIgdbLoading" class="text-center py-8">
        <Icon
          name="heroicons:arrow-path-20-solid"
          class="w-8 h-8 animate-spin text-green-400 mx-auto mb-2" />
        <p class="text-gray-400">Durchsuche IGDB-Datenbank...</p>
      </div>
      <!-- IGDB Results -->
      <div v-if="igdbResults.length > 0" class="space-y-4">
        <h3 class="text-lg font-semibold text-white">
          IGDB-Ergebnisse ({{ igdbResults.length }})
        </h3>
        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="igdbGame in igdbResults"
            :key="igdbGame.id"
            class="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50 hover:border-green-500/50 transition-all">
            <div class="flex items-center gap-4">
              <!-- Game Cover -->
              <div
                class="flex-shrink-0 w-16 h-20 bg-gray-600/50 rounded overflow-hidden">
                <img
                  v-if="igdbGame.cover?.url"
                  :src="
                    getIGDBImageUrl(igdbGame.cover.url) || 'gameplaceholder.jpg'
                  "
                  :alt="igdbGame.name"
                  class="w-full h-full object-cover"
                  loading="lazy" />
                <img
                  v-else
                  :src="'gameplaceholder.jpg'"
                  :alt="igdbGame.name"
                  class="w-full h-full object-cover"
                  loading="lazy" />
              </div>
              <!-- Game Info -->
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-white text-lg line-clamp-1">
                  {{ igdbGame.name }}
                </h4>
                <div
                  v-if="igdbGame.summary"
                  class="text-sm text-gray-400 mt-1 line-clamp-2">
                  {{ igdbGame.summary }}
                </div>
                <div
                  v-if="igdbGame.genres && igdbGame.genres.length > 0"
                  class="flex flex-wrap gap-2 mt-2">
                  <span
                    v-for="genre in igdbGame.genres.slice(0, 3)"
                    :key="genre.id"
                    class="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded">
                    {{ genre.name }}
                  </span>
                </div>
              </div>
              <!-- Actions -->
              <div class="flex-shrink-0 flex items-center gap-2">
                <button
                  @click="navigateToIGDBGame(igdbGame)"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                  Details anzeigen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- IGDB No Results -->
      <div
        v-if="igdbSearched && igdbResults.length === 0 && !isIgdbLoading"
        class="text-center py-8">
        <Icon
          name="heroicons:exclamation-triangle-20-solid"
          class="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-400 mb-2">
          Keine IGDB-Ergebnisse
        </h3>
        <p class="text-gray-500">
          Keine Spiele bei IGDB für "{{ searchQuery }}" gefunden
        </p>
      </div>
    </div>
    <!-- No Results at all -->
    <div
      v-if="
        filteredDbResults.length === 0 &&
        igdbSearched &&
        igdbResults.length === 0 &&
        !isIgdbLoading
      "
      class="text-center py-12">
      <Icon
        name="heroicons:magnifying-glass-20-solid"
        class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-400 mb-2">
        Keine Ergebnisse gefunden
      </h3>
      <p class="text-gray-500 mb-4">
        Weder in der Datenbank noch bei IGDB wurden Spiele für "{{
          searchQuery
        }}" gefunden.
      </p>
      <button
        @click="$router.push('/')"
        class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
        Zurück zur Startseite
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { IGDBGame } from '~/lib/services/igdb.service';
  import type { Game } from '~/prisma/client';
  definePageMeta({
    middleware: ['auth'],
    title: 'Suchergebnisse',
    layout: 'authenticated'
  });
  const route = useRoute();
  const router = useRouter();
  const gameStore = useGamesStore();
  const { getCurrentConfig, currentViewMode } = useViewMode();
  // Search state
  const searchQuery = ref((route.query.q as string) || '');
  const newSearchQuery = ref('');
  const dbResults = ref<Game[]>([]);
  const filteredDbResults = ref<Game[]>([]);
  const igdbResults = ref<IGDBGame[]>([]);
  const igdbSearched = ref(false);
  const isIgdbLoading = ref(false);

  // Advanced search state
  const showAdvancedSearch = ref(false);
  const selectedGenre = ref('');
  const selectedPlatform = ref('');
  const selectedYear = ref('');
  const sortBy = ref('name-asc');
  // tRPC client
  const { $client } = useNuxtApp();

  // Computed properties for filters
  const availableGenres = computed(() => {
    const genres = new Set<string>();
    dbResults.value.forEach(game => {
      game.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
  });

  const availableYears = computed(() => {
    const years = new Set<number>();
    dbResults.value.forEach(game => {
      if (game.firstReleaseDate) {
        const year = new Date(game.firstReleaseDate).getFullYear();
        years.add(year);
      }
    });
    return Array.from(years).sort((a, b) => b - a); // Newest first
  });

  // Filter and sort games
  const applyFilters = () => {
    let filtered = [...dbResults.value];

    // Apply genre filter
    if (selectedGenre.value) {
      filtered = filtered.filter(game =>
        game.genres.includes(selectedGenre.value)
      );
    }

    // Apply year filter
    if (selectedYear.value) {
      const targetYear = parseInt(selectedYear.value);
      filtered = filtered.filter(game => {
        if (!game.firstReleaseDate) return false;
        const gameYear = new Date(game.firstReleaseDate).getFullYear();
        return gameYear === targetYear;
      });
    }

    // Apply sorting
    switch (sortBy.value) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'year-desc':
        filtered.sort((a, b) => {
          const dateA = a.firstReleaseDate
            ? new Date(a.firstReleaseDate).getTime()
            : 0;
          const dateB = b.firstReleaseDate
            ? new Date(b.firstReleaseDate).getTime()
            : 0;
          return dateB - dateA;
        });
        break;
      case 'year-asc':
        filtered.sort((a, b) => {
          const dateA = a.firstReleaseDate
            ? new Date(a.firstReleaseDate).getTime()
            : 0;
          const dateB = b.firstReleaseDate
            ? new Date(b.firstReleaseDate).getTime()
            : 0;
          return dateA - dateB;
        });
        break;
      case 'rating-desc':
        // This would need rating data, for now we'll sort by name
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    filteredDbResults.value = filtered;
  };
  // Initialize search
  onMounted(async () => {
    if (searchQuery.value) {
      await searchDatabase();
    }
  });
  // Watch for route changes
  watch(
    () => route.query.q,
    newQuery => {
      if (newQuery && newQuery !== searchQuery.value) {
        searchQuery.value = newQuery as string;
        igdbSearched.value = false;
        igdbResults.value = [];
        // Reset filters on new search
        selectedGenre.value = '';
        selectedPlatform.value = '';
        selectedYear.value = '';
        sortBy.value = 'name-asc';
        searchDatabase();
      }
    }
  );
  const searchDatabase = async () => {
    if (!searchQuery.value.trim()) return;
    try {
      const response = await gameStore.searchDatabase(searchQuery.value);
      if (response) {
        dbResults.value = response;
      }
      // Apply filters after loading results
      applyFilters();
    } catch (error) {
      console.error('Database search error:', error);
      dbResults.value = [];
      filteredDbResults.value = [];
    }
  };
  const searchIGDB = async () => {
    isIgdbLoading.value = true;
    try {
      const response = await gameStore.searchIGDB(searchQuery.value);
      if (response) {
        igdbResults.value = response;
        igdbSearched.value = true;
      }
    } catch (error) {
      console.error('IGDB search error:', error);
      igdbResults.value = [];
      igdbSearched.value = true;
    } finally {
      isIgdbLoading.value = false;
    }
  };
  const navigateToGame = (game: Game) => {
    router.push(`/game/${game.id}`);
  };

  const navigateToIGDBGame = async (igdbGame: IGDBGame) => {
    try {
      const game = await gameStore.navigateToIGDBGame(igdbGame);
      if (game) {
        router.push(`/game/${game.id}`);
      }
    } catch (error) {
      console.error('Error adding game from IGDB:', error);
    }
  };
  const performNewSearch = () => {
    if (newSearchQuery.value.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(newSearchQuery.value.trim())}`
      );
      newSearchQuery.value = '';
    }
  };
  const getIGDBImageUrl = (url: string): string => {
    if (url.startsWith('//')) {
      return `https:${url.replace('t_thumb', 't_cover_small')}`;
    }
    return url.replace('t_thumb', 't_cover_small');
  };
</script>
<style scoped>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 1;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
  }
</style>
