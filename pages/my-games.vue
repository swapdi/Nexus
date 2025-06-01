<script setup lang="ts">
  const accountStore = useAccountStore();
  const gamesStore = useGamesStore();

  onMounted(async () => {
    await accountStore.init();
    await gamesStore.init();
  });

  definePageMeta({
    middleware: ['auth'],
    title: 'Meine Spiele',
    layout: 'authenticated'
  });

  // Reactive state für UI
  const searchQuery = ref('');
  const selectedPlatform = ref('all');
  const sortBy = ref('lastPlayed');

  // Nach Import aktualisieren
  const onImportCompleted = () => {
    gamesStore.refreshData();
  };

  // Verfügbare Plattformen für Filter
  const platforms = computed(() => {
    const allPlatforms = ['all', ...gamesStore.availablePlatforms];
    return allPlatforms.map(platform => ({
      value: platform,
      label: platform === 'all' ? 'Alle Plattformen' : platform
    }));
  });

  // Gefilterte und sortierte Spiele
  const filteredGames = computed(() => {
    let filtered = gamesStore.games;

    // Nach Suchbegriff filtern
    if (searchQuery.value.trim()) {
      filtered = gamesStore.searchGames(searchQuery.value);
    }

    // Nach Plattform filtern
    filtered = gamesStore.filterGamesByPlatform(selectedPlatform.value);

    // Sortieren
    return gamesStore.sortGames(filtered, sortBy.value);
  });

  // Berechnete Werte für Statistiken
  const totalGames = computed(() => gamesStore.totalGames);
  const totalPlayTime = computed(
    () => gamesStore.stats?.totalPlaytimeHours || 0
  );
  const averageRating = computed(() => {
    const ratedGames = gamesStore.games.filter(
      game => game.rating && game.rating > 0
    );
    if (ratedGames.length === 0) return '0.0';
    const sum = ratedGames.reduce((acc, game) => acc + (game.rating || 0), 0);
    return (sum / ratedGames.length).toFixed(1);
  });

  // Stars für Rating
  const getStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  };

  // Relative Zeit formatieren
  const formatRelativeTime = (date: Date | null) => {
    if (!date) return 'Nie gespielt';

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Heute';
    if (diffDays === 1) return 'Gestern';
    if (diffDays < 7) return `Vor ${diffDays} Tagen`;
    if (diffDays < 30) return `Vor ${Math.ceil(diffDays / 7)} Wochen`;
    if (diffDays < 365) return `Vor ${Math.ceil(diffDays / 30)} Monaten`;
    return `Vor ${Math.ceil(diffDays / 365)} Jahren`;
  };
</script>

<template>
  <div class="space-y-6">
    <!-- Import-Bereich -->
    <LibraryImport @import-completed="onImportCompleted" />

    <!-- Header mit Statistiken -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <h1
        class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
        Meine Spiele
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          class="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
          <div class="text-2xl font-bold text-white">{{ totalGames }}</div>
          <div class="text-purple-300 text-sm">Spiele in Bibliothek</div>
        </div>
        <div
          class="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
          <div class="text-2xl font-bold text-white">{{ totalPlayTime }}h</div>
          <div class="text-blue-300 text-sm">Gesamte Spielzeit</div>
        </div>
        <div
          class="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
          <div class="text-2xl font-bold text-white">{{ averageRating }}</div>
          <div class="text-green-300 text-sm">Durchschnittliche Bewertung</div>
        </div>
      </div>
    </div>

    <!-- Filter und Suche -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <!-- Suche -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Spiele suchen
          </label>
          <div class="relative">
            <Icon
              name="heroicons:magnifying-glass-20-solid"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Spielname eingeben..."
              class="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
        </div>

        <!-- Plattform Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Plattform
          </label>
          <select
            v-model="selectedPlatform"
            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option
              v-for="platform in platforms"
              :key="platform.value"
              :value="platform.value">
              {{ platform.label }}
            </option>
          </select>
        </div>

        <!-- Sortierung -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Sortieren nach
          </label>
          <select
            v-model="sortBy"
            class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="lastPlayed">Zuletzt gespielt</option>
            <option value="title">Titel (A-Z)</option>
            <option value="playTime">Spielzeit</option>
            <option value="rating">Bewertung</option>
            <option value="addedAt">Hinzugefügt</option>
          </select>
        </div>

        <!-- Ergebnisse -->
        <div class="flex items-end">
          <div class="text-sm text-gray-400">
            {{ filteredGames.length }} von {{ totalGames }} Spielen angezeigt
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="gamesStore.isLoading" class="text-center py-12">
      <Icon
        name="heroicons:arrow-path-20-solid"
        class="w-8 h-8 text-purple-400 animate-spin mx-auto mb-4" />
      <p class="text-gray-400">Lade Spiele...</p>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="gamesStore.games.length === 0"
      class="text-center py-12 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
      <Icon
        name="heroicons:game-pad-20-solid"
        class="w-16 h-16 text-gray-500 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-300 mb-2">
        Noch keine Spiele in Ihrer Bibliothek
      </h3>
      <p class="text-gray-500 mb-6">
        Importieren Sie Ihre Spielebibliothek von verschiedenen Plattformen
      </p>
    </div>

    <!-- Spiele Grid -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="game in filteredGames"
        :key="game.id"
        class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 group">
        <!-- Cover Image -->
        <div class="aspect-[3/4] bg-gray-700/50 relative overflow-hidden">
          <img
            :src="game.coverUrl || './gameplaceholder.jpg'"
            :alt="game.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            @error="
              if ($event.target) {
                ($event.target as HTMLImageElement).src =
                  './gameplaceholder.jpg';
              }
            " />

          <!-- Platform Logos -->
          <div class="absolute top-2 left-2 flex flex-wrap gap-1">
            <div
              v-for="platform in game.platforms"
              :key="platform"
              class="w-8 h-8 bg-black/70 rounded-md backdrop-blur-sm flex items-center justify-center">
              <span class="text-white text-xs font-bold">
                {{ platform.charAt(0) }}
              </span>
            </div>
          </div>

          <!-- Platform Badges (Alternative Text Display) -->
          <div class="absolute bottom-2 left-2 flex flex-wrap gap-1">
            <span
              v-for="platform in game.platforms"
              :key="platform"
              class="px-2 py-1 bg-black/70 text-white text-xs rounded-md backdrop-blur-sm">
              {{ platform }}
            </span>
          </div>

          <!-- Rating -->
          <div v-if="game.rating" class="absolute top-2 right-2 flex space-x-1">
            <Icon
              v-for="(filled, index) in getStars(game.rating)"
              :key="index"
              name="heroicons:star-20-solid"
              :class="[
                'w-4 h-4',
                filled ? 'text-yellow-400' : 'text-gray-500'
              ]" />
          </div>
        </div>

        <!-- Game Info -->
        <div class="p-4">
          <h3
            class="font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
            {{ game.title }}
          </h3>

          <!-- Genres -->
          <div v-if="game.genres.length > 0" class="mb-3 flex flex-wrap gap-1">
            <span
              v-for="genre in game.genres.slice(0, 3)"
              :key="genre"
              class="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-md">
              {{ genre }}
            </span>
            <span
              v-if="game.genres.length > 3"
              class="px-2 py-1 bg-gray-600/50 text-gray-400 text-xs rounded-md">
              +{{ game.genres.length - 3 }}
            </span>
          </div>

          <!-- Stats -->
          <div class="space-y-2 text-sm text-gray-400">
            <div class="flex justify-between">
              <span>Spielzeit:</span>
              <span class="text-white">{{
                gamesStore.formatPlayTime(game.playtimeMinutes)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span>Zuletzt gespielt:</span>
              <span class="text-white">{{
                formatRelativeTime(game.lastPlayed)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Keine Ergebnisse -->
    <div
      v-if="
        !gamesStore.isLoading &&
        gamesStore.games.length > 0 &&
        filteredGames.length === 0
      "
      class="text-center py-12 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
      <Icon
        name="heroicons:magnifying-glass-20-solid"
        class="w-16 h-16 text-gray-500 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-300 mb-2">
        Keine Spiele gefunden
      </h3>
      <p class="text-gray-500 mb-4">
        Versuchen Sie andere Suchbegriffe oder Filter
      </p>
      <button
        @click="
          searchQuery = '';
          selectedPlatform = 'all';
        "
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
        Filter zurücksetzen
      </button>
    </div>
  </div>
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
