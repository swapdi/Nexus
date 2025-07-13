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
    </div>

    <!-- Database Results Section -->
    <div
      v-if="dbResults.length > 0"
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-white flex items-center gap-2">
          <Icon
            name="heroicons:server-20-solid"
            class="w-5 h-5 text-purple-400" />
          Spiele in der Datenbank ({{ dbResults.length }})
        </h2>
        <ViewModeToggle />
      </div>

      <!-- DB Results Grid -->
      <div :class="getCurrentConfig().gridClass">
        <GameCard
          v-for="game in dbResults"
          :key="game.id"
          :game="{
            game,
            userId: userStore.user?.id || 0,
            id: 0,
            gameId: game.id,
            platformIds: [],
            addedAt: new Date(),
            playtimeMinutes: 0,
            lastPlayed: null,
            isInstalled: false,
            isFavorite: false,
            notes: null
          }"
          :viewMode="currentViewMode"
          :isSelectionMode="false"
          :isSelected="false"
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
                  :src="getIGDBImageUrl(igdbGame.cover.url)"
                  :alt="igdbGame.name"
                  class="w-full h-full object-cover"
                  loading="lazy" />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center">
                  <Icon
                    name="heroicons:photo-20-solid"
                    class="w-6 h-6 text-gray-500" />
                </div>
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

                <div class="flex flex-wrap gap-2 mt-2">
                  <span
                    v-for="genre in igdbGame.genres?.slice(0, 3)"
                    :key="genre.id"
                    class="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded">
                    {{ genre.name }}
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex-shrink-0 flex items-center gap-2">
                <button
                  @click="importGame(igdbGame, false)"
                  :disabled="isImporting === igdbGame.id"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm rounded-lg transition-colors">
                  {{
                    isImporting === igdbGame.id
                      ? 'Importiere...'
                      : 'Zur DB hinzufügen'
                  }}
                </button>

                <button
                  @click="importGame(igdbGame, true)"
                  :disabled="isImporting === igdbGame.id"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm rounded-lg transition-colors">
                  {{
                    isImporting === igdbGame.id
                      ? 'Importiere...'
                      : 'Zur Bibliothek'
                  }}
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
        dbResults.length === 0 &&
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
  const userStore = useUserStore();
  const { getCurrentConfig, currentViewMode } = useViewMode();

  // Search state
  const searchQuery = ref((route.query.q as string) || '');
  const newSearchQuery = ref('');
  const dbResults = ref<Game[]>([]);
  const igdbResults = ref<IGDBGame[]>([]);
  const igdbSearched = ref(false);
  const isIgdbLoading = ref(false);
  const isImporting = ref<number | null>(null);

  // tRPC client
  const { $client } = useNuxtApp();

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
        searchDatabase();
      }
    }
  );

  const searchDatabase = async () => {
    if (!searchQuery.value.trim()) return;

    try {
      const response = await $client.games.searchGames.query({
        searchTerm: searchQuery.value,
        limit: 50
      });
      dbResults.value = response.games;
    } catch (error) {
      console.error('Database search error:', error);
      dbResults.value = [];
    }
  };

  const searchIGDB = async () => {
    if (!searchQuery.value.trim() || isIgdbLoading.value) return;

    isIgdbLoading.value = true;
    try {
      const response = await $client.games.searchIGDB.query({
        searchTerm: searchQuery.value,
        limit: 20
      });
      igdbResults.value = response.games;
      igdbSearched.value = true;
    } catch (error) {
      console.error('IGDB search error:', error);
      igdbResults.value = [];
      igdbSearched.value = true;
    } finally {
      isIgdbLoading.value = false;
    }
  };

  const importGame = async (igdbGame: IGDBGame, addToLibrary: boolean) => {
    if (isImporting.value === igdbGame.id) return;

    isImporting.value = igdbGame.id;
    try {
      const response = await $client.games.importFromIGDB.mutate({
        igdbId: igdbGame.id,
        addToLibrary
      });

      if (response.success && response.game) {
        // Navigate to the game page
        router.push(`/game/${response.game.id}`);
      }
    } catch (error) {
      console.error('Import error:', error);
    } finally {
      isImporting.value = null;
    }
  };

  const navigateToGame = (game: Game) => {
    router.push(`/game/${game.id}`);
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
