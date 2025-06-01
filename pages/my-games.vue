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
    let filtered = [...gamesStore.games]; // Kopie erstellen

    // Nach Suchbegriff filtern
    if (searchQuery.value.trim()) {
      const searchTerm = searchQuery.value.toLowerCase().trim();
      filtered = filtered.filter(
        game =>
          game.title.toLowerCase().includes(searchTerm) ||
          game.genres.some(genre => genre.toLowerCase().includes(searchTerm)) ||
          game.platforms.some(platform =>
            platform.toLowerCase().includes(searchTerm)
          )
      );
    }

    // Nach Plattform filtern
    if (selectedPlatform.value !== 'all') {
      filtered = filtered.filter(game =>
        game.platforms.includes(selectedPlatform.value)
      );
    }

    // Sortieren
    return gamesStore.sortGames(filtered, sortBy.value);
  });
  // Berechnete Werte für Statistiken
  const totalGames = computed(() => gamesStore.totalGames);
  const totalPlayTime = computed(() => gamesStore.totalPlaytimeHours);

  // Plattform-basierte Statistiken
  const platformStats = computed(() => {
    const platforms = gamesStore.gamesByPlatform;
    return Object.entries(platforms)
      .map(([platform, games]) => ({
        name: platform,
        count: games.length,
        totalPlaytime: games.reduce(
          (sum, game) => sum + game.playtimeMinutes,
          0
        )
      }))
      .sort((a, b) => b.count - a.count);
  });

  const topPlatform = computed(() => {
    return platformStats.value[0] || { name: 'Keine', count: 0 };
  });

  const recentActivity = computed(() => {
    const recentGames = gamesStore.recentlyPlayed.slice(0, 5);
    if (recentGames.length === 0) return 'Keine Aktivität';
    return `${recentGames.length} Spiele kürzlich gespielt`;
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
      class="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 relative overflow-hidden">
      <!-- Glassmorphism Background Pattern -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
      <div
        class="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div
        class="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="relative z-10">
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-8">
          Meine Spielebibliothek
        </h1>

        <!-- Allgemeine Statistiken -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Gesamte Spiele -->
          <div
            class="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-500/30 relative overflow-hidden group hover:scale-105 transition-all duration-300">
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-2">
                <Icon
                  name="heroicons:squares-2x2-20-solid"
                  class="w-8 h-8 text-purple-400" />
                <div class="text-4xl font-bold text-white">
                  {{ totalGames }}
                </div>
              </div>
              <div class="text-purple-300 text-sm font-medium">
                Spiele in Bibliothek
              </div>
              <div class="text-purple-200/60 text-xs mt-1">
                Über {{ platformStats.length }} Plattformen verteilt
              </div>
            </div>
          </div>

          <!-- Gesamte Spielzeit -->
          <div
            class="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-500/30 relative overflow-hidden group hover:scale-105 transition-all duration-300">
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-2">
                <Icon
                  name="heroicons:clock-20-solid"
                  class="w-8 h-8 text-blue-400" />
                <div class="text-4xl font-bold text-white">
                  {{ totalPlayTime }}h
                </div>
              </div>
              <div class="text-blue-300 text-sm font-medium">
                Gesamte Spielzeit
              </div>
              <div class="text-blue-200/60 text-xs mt-1">
                {{ gamesStore.recentlyPlayed.length }} kürzlich gespielt
              </div>
            </div>
          </div>

          <!-- Top Plattform -->
          <div
            class="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-500/30 relative overflow-hidden group hover:scale-105 transition-all duration-300">
            <div
              class="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-2">
                <PlatformLogo
                  v-if="topPlatform.name !== 'Keine'"
                  :platform="topPlatform.name"
                  size="md"
                  variant="icon" />
                <Icon
                  v-else
                  name="heroicons:computer-desktop-20-solid"
                  class="w-8 h-8 text-green-400" />
                <div class="text-4xl font-bold text-white">
                  {{ topPlatform.count }}
                </div>
              </div>
              <div class="text-green-300 text-sm font-medium">
                Meiste Spiele
              </div>
              <div class="text-green-200/60 text-xs mt-1">
                {{
                  topPlatform.name !== 'Keine'
                    ? `Hauptsächlich ${topPlatform.name}`
                    : 'Keine Plattform'
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detaillierte Plattform-Aufschlüsselung -->
    <div
      v-if="platformStats.length > 0"
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <h3 class="text-2xl font-semibold text-white mb-6 flex items-center">
        <Icon
          name="heroicons:chart-pie-20-solid"
          class="w-7 h-7 mr-3 text-purple-400" />
        Plattform-Aufschlüsselung
      </h3>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
          v-for="platform in platformStats.slice(0, 8)"
          :key="platform.name"
          class="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-lg p-5 border border-gray-600/30 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <PlatformLogo
                :platform="platform.name"
                size="md"
                variant="icon" />
              <span class="text-white font-semibold">{{ platform.name }}</span>
            </div>
            <span
              class="text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
              {{ platform.count }}
            </span>
          </div>
          <div class="space-y-1">
            <div class="text-sm text-gray-300">
              {{ Math.floor(platform.totalPlaytime / 60) }}h Spielzeit
            </div>
            <div class="text-xs text-gray-500">
              {{ Math.round((platform.count / totalGames) * 100) }}% der
              Bibliothek
            </div>
          </div>
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
              placeholder="Spielname, Genre oder Plattform eingeben..."
              class="w-full pl-10 pr-10 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            <button
              v-if="searchQuery.trim()"
              @click="searchQuery = ''"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
              <Icon name="heroicons:x-mark-20-solid" class="w-4 h-4" />
            </button>
          </div>
        </div>
        <!-- Plattform Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Plattform
          </label>
          <div class="relative">
            <Icon
              name="heroicons:computer-desktop-20-solid"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              v-model="selectedPlatform"
              class="w-full pl-10 pr-8 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer">
              <option
                v-for="platform in platforms"
                :key="platform.value"
                :value="platform.value">
                {{ platform.label }}
                {{
                  platform.value !== 'all'
                    ? `(${
                        gamesStore.getGamesByPlatformName(platform.value).length
                      })`
                    : ''
                }}
              </option>
            </select>
            <Icon
              name="heroicons:chevron-down-20-solid"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <!-- Sortierung -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Sortieren nach
          </label>
          <div class="relative">
            <Icon
              name="heroicons:arrows-up-down-20-solid"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              v-model="sortBy"
              class="w-full pl-10 pr-8 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer">
              <option value="lastPlayed">Zuletzt gespielt</option>
              <option value="title">Titel (A-Z)</option>
              <option value="playTime">Spielzeit</option>
              <option value="rating">Bewertung</option>
              <option value="addedAt">Hinzugefügt</option>
            </select>
            <Icon
              name="heroicons:chevron-down-20-solid"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <!-- Ergebnisse und Filter-Status -->
        <div class="flex flex-col space-y-2">
          <div class="text-sm text-gray-400">
            {{ filteredGames.length }} von {{ totalGames }} Spielen angezeigt
          </div>

          <!-- Aktive Filter anzeigen -->
          <div
            v-if="searchQuery.trim() || selectedPlatform !== 'all'"
            class="flex flex-wrap gap-2">
            <span
              v-if="searchQuery.trim()"
              class="inline-flex items-center px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-md">
              <Icon
                name="heroicons:magnifying-glass-20-solid"
                class="w-3 h-3 mr-1" />
              "{{ searchQuery.trim() }}"
              <button
                @click="searchQuery = ''"
                class="ml-1 hover:text-purple-100">
                <Icon name="heroicons:x-mark-20-solid" class="w-3 h-3" />
              </button>
            </span>
            <span
              v-if="selectedPlatform !== 'all'"
              class="inline-flex items-center px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md">
              <Icon
                name="heroicons:computer-desktop-20-solid"
                class="w-3 h-3 mr-1" />
              {{ platforms.find(p => p.value === selectedPlatform)?.label }}
              <button
                @click="selectedPlatform = 'all'"
                class="ml-1 hover:text-blue-100">
                <Icon name="heroicons:x-mark-20-solid" class="w-3 h-3" />
              </button>
            </span>
            <button
              @click="
                searchQuery = '';
                selectedPlatform = 'all';
              "
              class="inline-flex items-center px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-md hover:bg-gray-500/30 transition-colors">
              <Icon name="heroicons:x-mark-20-solid" class="w-3 h-3 mr-1" />
              Alle Filter löschen
            </button>
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
            <PlatformLogo
              v-for="platform in game.platforms"
              :key="platform"
              :platform="platform"
              size="md"
              variant="badge" />
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
