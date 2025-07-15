<script setup lang="ts">
  import ConfirmModal from '~/components/ConfirmModal.vue';
  const userStore = useUserStore();
  const gamesStore = useGamesStore();
  const loadingStore = useLoadingStore();
  const libraryStore = useLibraryStore();
  // View Mode Management
  const { currentViewMode, getCurrentConfig } = useViewMode();
  onMounted(async () => {
    await userStore.init();
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

  // Statistics toggle state
  const showStatistics = ref(false);
  const showImport = ref(false);
  // Modal state
  const showConfirmModal = ref(false);
  // Nach Import aktualisieren
  const onImportCompleted = () => {
    libraryStore.refreshLibraries();
    gamesStore.refreshData();
  };
  // Computed für Auswahlmodus-UI
  const selectedGamesCount = computed(() => gamesStore.selectedGameIds.size);
  // Computed properties für Filter und Suche
  const platforms = computed(() => {
    const availablePlatforms = gamesStore.availablePlatforms;
    const platformCounts = gamesStore.gamesByPlatform;

    const platformOptions = [
      { value: 'all', label: 'Alle Plattformen', count: gamesStore.totalGames }
    ];

    // Füge verfügbare Plattformen hinzu
    availablePlatforms.forEach(platform => {
      const gamesForPlatform = platformCounts[platform.name] || [];
      platformOptions.push({
        value: platform.slug,
        label: platform.name,
        count: gamesForPlatform.length
      });
    });

    // Füge "Unbekannt" hinzu, falls vorhanden
    const unknownGames = platformCounts['Unbekannt'] || [];
    if (unknownGames.length > 0) {
      platformOptions.push({
        value: 'unknown',
        label: 'Unbekannt',
        count: unknownGames.length
      });
    }

    return platformOptions;
  });
  const filteredGames = computed(() => {
    let games = [...gamesStore.games];

    // Platform-Filter
    if (selectedPlatform.value !== 'all') {
      games = gamesStore.filterGamesByPlatform(selectedPlatform.value);
    }

    // Suchfilter
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      games = games.filter(
        userGame =>
          userGame.game.name.toLowerCase().includes(query) ||
          (userGame.game.summary &&
            userGame.game.summary.toLowerCase().includes(query))
      );
    }

    // Sortierung
    games.sort((a, b) => {
      switch (sortBy.value) {
        case 'title':
          return a.game.name.localeCompare(b.game.name);
        case 'playTime':
          return (b.playtimeMinutes || 0) - (a.playtimeMinutes || 0);
        case 'rating':
          return (b.game.totalRating || 0) - (a.game.totalRating || 0);
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
    await gamesStore.removeSelectedGames();
    showConfirmModal.value = false;
    // Der Auswahlmodus wird automatisch im Store beendet
  };
  // Favoriten-Handler
  const handleToggleFavorite = async (userGameId: number) => {
    try {
      await gamesStore.toggleFavorite(userGameId);
    } catch (error) {
      console.error('Fehler beim Ändern des Favoriten-Status:', error);
    }
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
          (sum, game) => sum + (game.playtimeMinutes || 0),
          0
        )
      }))
      .filter(stat => stat.count > 0) // Nur Plattformen mit Spielen anzeigen
      .sort((a, b) => b.count - a.count);
  });

  const topPlatform = computed(() => {
    return platformStats.value[0] || { name: 'Keine', count: 0 };
  });
  // Kürzlich gespielte Spiele (innerhalb der letzten 2 Wochen)
  const recentlyPlayedGames = computed(() => {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // 2 Wochen = 14 Tage
    return gamesStore.games.filter(game => {
      if (!game.lastPlayed) return false;
      const lastPlayedDate = new Date(game.lastPlayed);
      return lastPlayedDate >= twoWeeksAgo;
    });
  });
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
  // Rating-Statistiken (nur bewertete Spiele)
  const ratedGames = computed(() => {
    return gamesStore.games.filter(
      g => g.game.totalRating && g.game.totalRating > 0
    );
  });
  const favoriteGames = computed(() => {
    return gamesStore.games.filter(g => g.isFavorite);
  });
  const averageRating = computed(() => {
    const rated = ratedGames.value;
    if (rated.length === 0) return 'N/A';
    const sum = rated.reduce(
      (acc, game) => acc + (game.game.totalRating || 0),
      0
    );
    return (sum / rated.length).toFixed(1);
  });

  // Additional statistics
  const totalPlaytime = computed(() => {
    const total = gamesStore.games.reduce(
      (sum, game) => sum + (game.playtimeMinutes || 0),
      0
    );
    const hours = Math.floor(total / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} Tage, ${hours % 24}h`;
    } else {
      return `${hours}h`;
    }
  });

  const gameGenreStats = computed(() => {
    const genreCounts: Record<string, number> = {};
    gamesStore.games.forEach(userGame => {
      userGame.game.genres.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });
    return Object.entries(genreCounts)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 genres
  });

  const recentlyAddedGames = computed(() => {
    return [...gamesStore.games]
      .sort(
        (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      )
      .slice(0, 3);
  });

  const mostPlayedGames = computed(() => {
    return [...gamesStore.games]
      .sort((a, b) => (b.playtimeMinutes || 0) - (a.playtimeMinutes || 0))
      .slice(0, 3);
  });
</script>
<template>
  <div class="space-y-6">
    <!-- Ein-/Ausklappbarer Bereich: Meine Spielebibliothek -->
    <div
      class="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 relative overflow-hidden">
      <!-- Background Pattern -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
      <div
        class="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div
        class="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="relative z-10">
        <div class="p-6">
          <div class="text-center">
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Meine Spielebibliothek
            </h1>
            <p class="text-gray-400 text-sm">
              Verwalte deine Spiele und finde deine Lieblingsspiele
            </p>
          </div>
        </div>
        <!-- Ausklappbarer Inhalt -->
        <div
          class="transition-all duration-500 ease-in-out max-h-[2000px] opacity-100">
          <div class="px-6 pb-6 space-y-6">
            <!-- Bibliotheksverwaltung Hinweis -->
            <div class="bg-gray-800/30 rounded-xl border border-gray-700/50">
              <button
                @click="showImport = !showImport"
                class="w-full text-left hover:bg-gray-700/20 p-4 transition-colors duration-200 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <Icon
                    name="heroicons:cog-6-tooth-20-solid"
                    class="w-4 h-4 text-purple-400" />
                  <h3 class="text-sm font-semibold text-gray-300">
                    Bibliotheksverwaltung
                  </h3>
                </div>
                <Icon
                  :name="
                    showImport
                      ? 'heroicons:chevron-up-20-solid'
                      : 'heroicons:chevron-down-20-solid'
                  "
                  class="w-4 h-4 text-gray-400 transition-transform duration-200" />
              </button>
              <div
                :class="[
                  'transition-all duration-300 ease-in-out overflow-hidden',
                  showImport
                    ? 'max-h-[2000px] opacity-100 p-4'
                    : 'max-h-0 opacity-0'
                ]">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-300 text-sm mb-1">
                      Verwalte deine Spielebibliotheken
                    </p>
                    <p class="text-gray-400 text-xs">
                      Verknüpfe Steam, Epic Games und andere Plattformen in
                      deinen Einstellungen
                    </p>
                  </div>
                  <NuxtLink
                    to="/settings"
                    class="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2">
                    <Icon name="heroicons:link-20-solid" class="w-4 h-4" />
                    Profil öffnen
                  </NuxtLink>
                </div>
                <!-- Aktualisieren Button (nur wenn Steam verknüpft) -->
                <div class="mt-4 pt-4 border-t border-gray-600/30">
                  <button
                    @click="onImportCompleted"
                    :disabled="loadingStore.isLoading"
                    class="w-full py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                    <Icon
                      :name="
                        loadingStore.isLoading
                          ? 'heroicons:arrow-path-16-solid'
                          : 'heroicons:arrow-path-20-solid'
                      "
                      :class="[
                        'w-4 h-4',
                        loadingStore.isLoading ? 'animate-spin' : ''
                      ]" />
                    {{
                      loadingStore.isLoading
                        ? 'Aktualisiere...'
                        : 'Bibliotheken aktualisieren'
                    }}
                  </button>
                </div>
              </div>
            </div>
            <!-- Einklappbarer Statistik-Bereich -->
            <div
              class="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden">
              <!-- Statistics Header mit Toggle -->
              <button
                @click="showStatistics = !showStatistics"
                class="w-full p-4 text-left hover:bg-gray-700/20 transition-colors duration-200 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <Icon
                    name="heroicons:chart-bar-20-solid"
                    class="w-4 h-4 text-purple-400" />
                  <h3 class="text-sm font-semibold text-gray-300">
                    Bibliothek-Statistiken
                  </h3>
                  <span class="text-xs text-gray-500"
                    >({{ totalGames }} Spiele)</span
                  >
                </div>
                <Icon
                  :name="
                    showStatistics
                      ? 'heroicons:chevron-up-20-solid'
                      : 'heroicons:chevron-down-20-solid'
                  "
                  class="w-4 h-4 text-gray-400 transition-transform duration-200" />
              </button>

              <!-- Einklappbarer Inhalt -->
              <div
                :class="[
                  'transition-all duration-300 ease-in-out overflow-hidden',
                  showStatistics
                    ? 'max-h-[2000px] opacity-100'
                    : 'max-h-0 opacity-0'
                ]">
                <div class="p-4 space-y-6">
                  <!-- Hauptstatistiken Grid -->
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Gesamte Spiele -->
                    <div class="relative group">
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div
                        class="relative bg-gray-700/40 rounded-xl p-4 border border-gray-600/30 hover:border-blue-400/50 transition-all duration-300 text-center">
                        <div class="flex items-center justify-center mb-3">
                          <div
                            class="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg">
                            <Icon
                              name="heroicons:squares-2x2-20-solid"
                              class="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div class="text-2xl font-bold text-white mb-1">
                          {{ totalGames }}
                        </div>
                        <div class="text-gray-400 text-sm font-medium">
                          Spiele in Bibliothek
                        </div>
                        <div
                          class="mt-2 h-1 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            class="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full w-full"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Gesamte Spielzeit -->
                    <div class="relative group">
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div
                        class="relative bg-gray-700/40 rounded-xl p-4 border border-gray-600/30 hover:border-purple-400/50 transition-all duration-300 text-center">
                        <div class="flex items-center justify-center mb-3">
                          <div
                            class="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg">
                            <Icon
                              name="heroicons:clock-20-solid"
                              class="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div class="text-2xl font-bold text-white mb-1">
                          {{ totalPlayTime }}h
                        </div>
                        <div class="text-gray-400 text-sm font-medium">
                          Gesamte Spielzeit
                        </div>
                        <div
                          class="mt-2 h-1 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            class="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full"
                            :style="{
                              width:
                                Math.min(100, (totalPlayTime / 1000) * 100) +
                                '%'
                            }"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Top Plattform -->
                    <div class="relative group">
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div
                        class="relative bg-gray-700/40 rounded-xl p-4 border border-gray-600/30 hover:border-amber-400/50 transition-all duration-300 text-center">
                        <div class="flex items-center justify-center mb-3">
                          <div
                            class="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg">
                            <Icon
                              name="heroicons:trophy-20-solid"
                              class="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div class="text-2xl font-bold text-white mb-1">
                          {{ topPlatform.count }}
                        </div>
                        <div class="text-gray-400 text-sm font-medium">
                          {{ topPlatform.name || 'Keine Plattform' }}
                        </div>
                        <div
                          class="mt-2 h-1 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            class="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
                            :style="{
                              width:
                                totalGames > 0
                                  ? (topPlatform.count / totalGames) * 100 + '%'
                                  : '0%'
                            }"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Zusätzliche Stats-Reihe -->
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <!-- Kürzlich gespielt -->
                    <div
                      class="bg-gray-700/30 rounded-lg p-3 border border-gray-600/20 text-center">
                      <Icon
                        name="heroicons:play-20-solid"
                        class="w-4 h-4 text-green-400 mx-auto mb-1" />
                      <div class="text-sm font-semibold text-white">
                        {{ recentlyPlayedGames.length }}
                      </div>
                      <div class="text-gray-400 text-xs">Kürzlich gespielt</div>
                    </div>
                    <!-- Lieblingsspiele (Rating > 3) -->
                    <div
                      class="bg-gray-700/30 rounded-lg p-3 border border-gray-600/20 text-center">
                      <Icon
                        name="heroicons:heart-20-solid"
                        class="w-4 h-4 text-red-400 mx-auto mb-1" />
                      <div class="text-sm font-semibold text-white">
                        {{ favoriteGames.length }}
                      </div>
                      <div class="text-gray-400 text-xs">Lieblingsspiele</div>
                    </div>
                    <!-- Verschiedene Plattformen -->
                    <div
                      class="bg-gray-700/30 rounded-lg p-3 border border-gray-600/20 text-center">
                      <Icon
                        name="heroicons:computer-desktop-20-solid"
                        class="w-4 h-4 text-blue-400 mx-auto mb-1" />
                      <div class="text-sm font-semibold text-white">
                        {{ platformStats.length }}
                      </div>
                      <div class="text-gray-400 text-xs">Plattformen</div>
                    </div>
                    <!-- Durchschnittliches Rating -->
                    <div
                      class="bg-gray-700/30 rounded-lg p-3 border border-gray-600/20 text-center">
                      <Icon
                        name="heroicons:star-20-solid"
                        class="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                      <div class="text-sm font-semibold text-white">
                        {{ averageRating }}
                      </div>
                      <div class="text-gray-400 text-xs">Ø Rating</div>
                    </div>
                  </div>

                  <!-- Top Genres -->
                  <div v-if="gameGenreStats.length > 0">
                    <h4
                      class="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <Icon
                        name="heroicons:tag-20-solid"
                        class="w-4 h-4 text-purple-400" />
                      Top Genres
                    </h4>
                    <div class="space-y-2">
                      <div
                        v-for="(genreStat, index) in gameGenreStats"
                        :key="genreStat.genre"
                        class="flex items-center justify-between bg-gray-700/30 rounded-lg p-3 border border-gray-600/30">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            :class="{
                              'bg-yellow-500': index === 0,
                              'bg-gray-400': index === 1,
                              'bg-orange-500': index === 2,
                              'bg-blue-500': index > 2
                            }">
                            {{ index + 1 }}
                          </div>
                          <span class="text-gray-200 font-medium">{{
                            genreStat.genre
                          }}</span>
                        </div>
                        <span class="text-gray-400 text-sm"
                          >{{ genreStat.count }} Spiele</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Most Played Games -->
                  <div v-if="mostPlayedGames.length > 0">
                    <h4
                      class="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <Icon
                        name="heroicons:fire-20-solid"
                        class="w-4 h-4 text-orange-400" />
                      Meist gespielte Spiele
                    </h4>
                    <div class="space-y-2">
                      <div
                        v-for="(userGame, index) in mostPlayedGames"
                        :key="userGame.id"
                        class="flex items-center gap-3 bg-gray-700/30 rounded-lg p-3 border border-gray-600/30 hover:border-orange-400/50 transition-colors cursor-pointer"
                        @click="navigateTo(`/game/${userGame.game.id}`)">
                        <div
                          class="w-12 h-16 bg-gray-600/50 rounded overflow-hidden flex-shrink-0">
                          <img
                            :src="
                              userGame.game.coverUrl || '/gameplaceholder.jpg'
                            "
                            :alt="userGame.game.name"
                            class="w-full h-full object-cover" />
                        </div>
                        <div class="flex-1 min-w-0">
                          <h5 class="text-gray-200 font-medium truncate">
                            {{ userGame.game.name }}
                          </h5>
                          <p class="text-gray-400 text-sm">
                            {{ formatPlayTime(userGame.playtimeMinutes || 0) }}
                          </p>
                        </div>
                        <div class="flex items-center gap-1 text-gray-400">
                          <Icon
                            name="heroicons:clock-20-solid"
                            class="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Recent Activity -->
                  <div v-if="recentlyPlayedGames.length > 0">
                    <h4
                      class="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <Icon
                        name="heroicons:bolt-20-solid"
                        class="w-4 h-4 text-green-400" />
                      Kürzlich gespielt
                    </h4>
                    <div class="space-y-2">
                      <div
                        v-for="userGame in recentlyPlayedGames.slice(0, 3)"
                        :key="userGame.id"
                        class="flex items-center gap-3 bg-gray-700/30 rounded-lg p-3 border border-gray-600/30 hover:border-green-400/50 transition-colors cursor-pointer"
                        @click="navigateTo(`/game/${userGame.game.id}`)">
                        <div
                          class="w-12 h-16 bg-gray-600/50 rounded overflow-hidden flex-shrink-0">
                          <img
                            :src="
                              userGame.game.coverUrl || '/gameplaceholder.jpg'
                            "
                            :alt="userGame.game.name"
                            class="w-full h-full object-cover" />
                        </div>
                        <div class="flex-1 min-w-0">
                          <h5 class="text-gray-200 font-medium truncate">
                            {{ userGame.game.name }}
                          </h5>
                          <p class="text-gray-400 text-sm">
                            {{ formatRelativeTime(userGame.lastPlayed) }}
                          </p>
                        </div>
                        <div class="flex items-center gap-1 text-gray-400">
                          <Icon
                            name="heroicons:clock-20-solid"
                            class="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Separater Filter-Bereich -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
      <h3
        class="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
        <Icon
          name="heroicons:funnel-20-solid"
          class="w-4 h-4 text-purple-400" />
        Filter & Aktionen
      </h3>
      <div class="space-y-3">
        <!-- Filter Felder -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- Suche -->
          <div class="relative">
            <Icon
              name="heroicons:magnifying-glass-20-solid"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Spiele suchen..."
              class="w-full pl-10 pr-8 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            <button
              v-if="searchQuery.trim()"
              @click="searchQuery = ''"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
              <Icon name="heroicons:x-mark-20-solid" class="w-3 h-3" />
            </button>
          </div>
          <!-- Plattform Filter -->
          <div class="relative">
            <Icon
              name="heroicons:computer-desktop-20-solid"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              v-model="selectedPlatform"
              class="w-full pl-10 pr-8 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer">
              <option
                v-for="platform in platforms"
                :key="platform.value"
                :value="platform.value">
                {{ platform.label }}
                {{ platform.count ? `(${platform.count})` : '' }}
              </option>
            </select>
            <Icon
              name="heroicons:chevron-down-20-solid"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <!-- Sortierung -->
          <div class="relative">
            <Icon
              name="heroicons:arrows-up-down-20-solid"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              v-model="sortBy"
              class="w-full pl-10 pr-8 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer">
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
        <!-- Aktionsbereich -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-gray-700/30">
          <!-- Linke Seite: Aktions-Button oder Selection-Modus -->
          <div
            v-if="!loadingStore.isLoading && gamesStore.games.length > 0"
            class="flex items-center gap-3">
            <!-- Löschen Button (Normal Mode) -->
            <button
              v-if="!gamesStore.isSelectionMode"
              @click="handleSelectionToggle"
              class="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all duration-300 flex items-center gap-2 text-sm">
              <Icon name="heroicons:trash-20-solid" class="w-4 h-4" />
              <span class="hidden sm:inline font-medium">Löschen</span>
            </button>
            <!-- Selection Controls (Selection Mode) -->
            <div
              v-else
              class="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg">
              <!-- Schließen Button -->
              <button
                @click="handleSelectionToggle"
                class="flex items-center justify-center w-5 h-5 rounded-full bg-gray-600 hover:bg-gray-500 text-gray-300 hover:text-white transition-all duration-200">
                <Icon name="heroicons:x-mark-16-solid" class="w-3 h-3" />
              </button>
              <!-- Auswahl Info -->
              <span class="text-xs text-gray-300">
                {{ selectedGamesCount }}/{{ filteredGames.length }}
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
                  'px-2 py-1 text-xs rounded flex items-center gap-1 transition-all duration-200',
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
            v-if="!loadingStore.isLoading && gamesStore.games.length > 0"
            class="flex items-center gap-3">
            <!-- Game Count und Filter Status -->
            <div
              class="flex items-center gap-2 text-xs text-gray-500 whitespace-nowrap">
              <span>{{ filteredGames.length }} von {{ totalGames }}</span>
              <span
                v-if="selectedPlatform !== 'all'"
                class="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full">
                {{ platforms.find(p => p.value === selectedPlatform)?.label }}
              </span>
            </div>
            <!-- View Mode Toggle (nur im normalen Modus) -->
            <ViewModeToggle v-if="!gamesStore.isSelectionMode" />
          </div>
        </div>
      </div>
    </div>

    <!-- Platform Quick Filter -->
    <div
      v-if="
        !loadingStore.isLoading &&
        gamesStore.games.length > 0 &&
        platforms.length > 2
      "
      class="mb-6">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-sm text-gray-400 font-medium">Schnellfilter:</span>
        <button
          v-for="platform in platforms.slice(0, 6)"
          :key="platform.value"
          @click="selectedPlatform = platform.value"
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200',
            selectedPlatform === platform.value
              ? 'bg-purple-600 border-purple-500 text-white'
              : 'bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500/50'
          ]">
          <Icon
            v-if="platform.value === 'steam'"
            name="simple-icons:steam"
            class="w-3 h-3 inline mr-1.5" />
          <Icon
            v-else-if="platform.value === 'epic'"
            name="simple-icons:epicgames"
            class="w-3 h-3 inline mr-1.5" />
          <Icon
            v-else-if="platform.value === 'gog'"
            name="simple-icons:gog"
            class="w-3 h-3 inline mr-1.5" />
          <Icon
            v-else-if="platform.value === 'all'"
            name="heroicons:squares-2x2-20-solid"
            class="w-3 h-3 inline mr-1.5" />
          <Icon
            v-else
            name="heroicons:question-mark-circle-20-solid"
            class="w-3 h-3 inline mr-1.5" />
          {{ platform.label }}
          <span class="ml-1 opacity-75">({{ platform.count }})</span>
        </button>
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
          "
          @toggleFavorite="handleToggleFavorite" />
      </div>
    </div>
    <!-- Empty State -->
    <div v-else-if="!loadingStore.isLoading" class="text-center py-16 px-6">
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
    <!-- Loading Overlay -->
    <LoadingOverlay />
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
