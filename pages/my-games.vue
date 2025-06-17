<script setup lang="ts">
  import ConfirmModal from '~/components/ConfirmModal.vue';

  const accountStore = useAccountStore();
  const gamesStore = useGamesStore();
  const loadingStore = useLoadingStore();
  // View Mode Management
  const { currentViewMode, getCurrentConfig } = useViewMode();
  // Debug: Watch für currentViewMode
  watch(
    currentViewMode,
    (newMode, oldMode) => {
      console.log('my-games: ViewMode changed from', oldMode, 'to', newMode);
      console.log('my-games: Current grid config:', getCurrentConfig());
      console.log(
        'my-games: Grid class will be:',
        getCurrentConfig().gridClass
      );
    },
    { immediate: true }
  );

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

  // Modal state
  const showConfirmModal = ref(false);
  // Nach Import aktualisieren
  const onImportCompleted = () => {
    gamesStore.refreshData();
  };

  // Computed für Auswahlmodus-UI
  const selectedGamesCount = computed(() => gamesStore.selectedGameIds.size);
  const selectedGamesText = computed(() => {
    const count = selectedGamesCount.value;
    return count === 1 ? '1 Spiel ausgewählt' : `${count} Spiele ausgewählt`;
  });

  // Computed properties für Filter und Suche
  const platforms = computed(() => {
    const uniquePlatforms = new Set(
      gamesStore.games.flatMap(game => game.platforms)
    );
    return [
      { value: 'all', label: 'Alle Plattformen' },
      ...Array.from(uniquePlatforms)
        .sort()
        .map(platform => ({
          value: platform,
          label: platform
        }))
    ];
  });

  const filteredGames = computed(() => {
    let games = [...gamesStore.games];

    // Suchfilter
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      games = games.filter(
        game =>
          game.title.toLowerCase().includes(query) ||
          game.genres.some(genre => genre.toLowerCase().includes(query)) ||
          game.platforms.some(platform =>
            platform.toLowerCase().includes(query)
          )
      );
    }

    // Plattformfilter
    if (selectedPlatform.value !== 'all') {
      games = games.filter(game =>
        game.platforms.includes(selectedPlatform.value)
      );
    }

    // Sortierung
    games.sort((a, b) => {
      switch (sortBy.value) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'playTime':
          return (b.playtimeMinutes || 0) - (a.playtimeMinutes || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'addedAt':
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case 'lastPlayed':
        default:
          if (!a.lastPlayed && !b.lastPlayed) return 0;
          if (!a.lastPlayed) return 1;
          if (!b.lastPlayed) return -1;
          return (
            new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime()
          );
      }
    });

    return games;
  });

  const totalGames = computed(() => gamesStore.games.length);
  const totalPlayTime = computed(() => {
    const minutes = gamesStore.games.reduce(
      (sum, game) => sum + (game.playtimeMinutes || 0),
      0
    );
    return Math.round(minutes / 60);
  }); // Auswahl-Funktionen
  const handleSelectionToggle = () => {
    gamesStore.toggleSelectionMode();
  };

  const handleSelectAll = () => {
    gamesStore.selectAllFilteredGames(filteredGames.value);
  };

  const handleDeselectAll = () => {
    gamesStore.deselectAllGames();
  };

  const confirmRemoveGames = () => {
    if (selectedGamesCount.value === 0) return;
    showConfirmModal.value = true;
  };

  const handleConfirmRemoval = async () => {
    const success = await gamesStore.removeSelectedGames();
    showConfirmModal.value = false;
    // Der Auswahlmodus wird automatisch im Store beendet
  };

  // Formatierungsfunktionen
  const formatPlayTime = (minutes: number): string => {
    if (minutes === 0) return '0 Min';

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    // Ab 2+ Stunden nur "Xh", unter 2 Stunden detailliert
    if (hours >= 2) {
      return `${hours}h`;
    } else if (hours === 1) {
      return remainingMinutes > 0 ? `1h ${remainingMinutes}m` : '1h';
    } else {
      return `${minutes} Min`;
    }
  };

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
                <Icon
                  name="heroicons:trophy-20-solid"
                  class="w-8 h-8 text-green-400" />
                <div class="text-4xl font-bold text-white">
                  {{ topPlatform.count }}
                </div>
              </div>
              <div class="text-green-300 text-sm font-medium">
                Top Plattform
              </div>
              <div class="text-green-200/60 text-xs mt-1">
                {{ topPlatform.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Filter Bar -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div class="space-y-4">
        <!-- Haupt-Filter -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                          gamesStore.getGamesByPlatformName(platform.value)
                            .length
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
        </div>

        <!-- Aktionsbereich mit optimiertem Layout -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-gray-700/30">
          <!-- Linke Seite: Aktions-Button oder Selection-Modus -->
          <div
            v-if="
              !loadingStore.hasForegroundOperations &&
              gamesStore.games.length > 0
            "
            class="flex items-center gap-3">
            <!-- Löschen Button (Normal Mode) -->
            <button
              v-if="!gamesStore.isSelectionMode"
              @click="handleSelectionToggle"
              class="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all duration-300 flex items-center gap-2">
              <Icon name="heroicons:trash-20-solid" class="w-4 h-4" />
              <span class="hidden sm:inline font-medium">Löschen</span>
            </button>

            <!-- Selection Controls (Selection Mode) -->
            <div
              v-else
              class="flex items-center gap-3 px-4 py-2.5 bg-gray-800 border border-gray-600 rounded-lg">
              <!-- Schließen Button -->
              <button
                @click="handleSelectionToggle"
                class="flex items-center justify-center w-6 h-6 rounded-full bg-gray-600 hover:bg-gray-500 text-gray-300 hover:text-white transition-all duration-200">
                <Icon name="heroicons:x-mark-16-solid" class="w-3.5 h-3.5" />
              </button>

              <!-- Auswahl Info -->
              <span class="text-xs text-gray-300">
                {{ selectedGamesCount }} von {{ filteredGames.length }}
              </span>

              <!-- Alle/Keine Buttons -->
              <button
                v-if="selectedGamesCount < filteredGames.length"
                @click="handleSelectAll"
                class="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-all duration-200">
                Alle
              </button>
              <button
                v-else-if="selectedGamesCount > 0"
                @click="handleDeselectAll"
                class="px-2 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-all duration-200">
                Keine
              </button>

              <!-- Löschen Button -->
              <button
                @click="confirmRemoveGames"
                :disabled="
                  selectedGamesCount === 0 || gamesStore.isRemovingGames
                "
                :class="[
                  'px-3 py-1 text-xs rounded flex items-center gap-1 transition-all duration-200',
                  selectedGamesCount === 0 || gamesStore.isRemovingGames
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-500 text-white'
                ]">
                <Icon
                  :name="
                    gamesStore.isRemovingGames
                      ? 'heroicons:arrow-path-16-solid'
                      : 'heroicons:trash-16-solid'
                  "
                  :class="[
                    'w-3 h-3',
                    gamesStore.isRemovingGames ? 'animate-spin' : ''
                  ]" />
                <span class="hidden sm:inline">
                  {{ gamesStore.isRemovingGames ? 'Entferne...' : 'Löschen' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Rechte Seite: View Mode Toggle und Game Count -->
          <div
            v-if="
              !loadingStore.hasForegroundOperations &&
              gamesStore.games.length > 0
            "
            class="flex items-center gap-4">
            <!-- Game Count -->
            <span class="text-sm text-gray-500 whitespace-nowrap">
              {{ filteredGames.length }} von {{ totalGames }}
            </span>
            <!-- View Mode Toggle (nur im normalen Modus) -->
            <ViewModeToggle v-if="!gamesStore.isSelectionMode" />
          </div>
        </div>
      </div>
    </div>

    <!-- Spiele Grid -->
    <div v-if="filteredGames.length > 0">
      <div :class="getCurrentConfig().gridClass">
        <GameCard
          v-for="game in filteredGames"
          :key="game.id"
          :game="game"
          :view-mode="currentViewMode"
          :is-selection-mode="gamesStore.isSelectionMode"
          :is-selected="gamesStore.selectedGameIds.has(game.id)"
          @click="
            gamesStore.isSelectionMode
              ? gamesStore.toggleGameSelection(game.id)
              : undefined
          " />
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!loadingStore.hasForegroundOperations"
      class="text-center py-16 px-6">
      <div
        class="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-12 max-w-md mx-auto">
        <Icon
          name="heroicons:magnifying-glass-20-solid"
          class="w-16 h-16 text-gray-500 mx-auto mb-6" />
        <h3 class="text-xl font-semibold text-gray-300 mb-4">
          Keine Spiele gefunden
        </h3>
        <p class="text-gray-400 leading-relaxed">
          {{
            searchQuery.trim() || selectedPlatform !== 'all'
              ? 'Versuche andere Suchkriterien oder Filter.'
              : 'Deine Spielebibliothek ist leer. Füge Spiele über den Import hinzu.'
          }}
        </p>
        <button
          v-if="searchQuery.trim() || selectedPlatform !== 'all'"
          @click="
            searchQuery = '';
            selectedPlatform = 'all';
          "
          class="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all duration-300 inline-flex items-center gap-2">
          <Icon name="heroicons:arrow-path-20-solid" class="w-4 h-4" />
          Filter zurücksetzen
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loadingStore.hasForegroundOperations"
      class="flex flex-col items-center justify-center py-16 space-y-6">
      <div class="relative">
        <!-- Animated Ring -->
        <div
          class="w-16 h-16 border-4 border-purple-200/20 border-t-purple-500 rounded-full animate-spin"></div>
        <div
          class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-500 rounded-full animate-spin animation-delay-75"></div>
      </div>
      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-300 mb-2">
          Wird geladen...
        </h3>
        <p class="text-gray-400">
          {{ loadingStore.primaryOperation?.label || 'Wird geladen...' }}
        </p>
      </div>
    </div>
    <!-- Confirm Modal -->
    <ConfirmModal
      v-if="showConfirmModal"
      :is-visible="showConfirmModal"
      title="Spiele entfernen"
      :message="`Möchtest du wirklich ${selectedGamesCount} ${
        selectedGamesCount === 1 ? 'Spiel' : 'Spiele'
      } aus deiner Bibliothek entfernen?`"
      confirm-text="Entfernen"
      cancel-text="Abbrechen"
      confirm-variant="danger"
      @confirm="handleConfirmRemoval"
      @cancel="showConfirmModal = false" />
  </div>
</template>

<style scoped>
  /* Smooth transition für alle interaktiven Elemente */
  button {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  /* Optimierte Hover-Effekte */
  button:hover {
    will-change: transform, box-shadow, background-color;
  }

  /* Smooth scaling mit GPU-Beschleunigung */
  .hover\:scale-105:hover,
  .hover\:scale-110:hover {
    transform: scale3d(var(--tw-scale-x), var(--tw-scale-y), 1);
  }

  /* Anti-aliasing für bessere Textqualität während Animationen */
  .transition-all {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
