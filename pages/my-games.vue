<script setup lang="ts">
  import ConfirmModal from '~/components/ConfirmModal.vue';

  const userStore = useUserStore();
  const gamesStore = useGamesStore();
  const loadingStore = useLoadingStore();

  // Game Utils für Legacy-Support
  const { getGameName, gameMatchesSearch } = useGameUtils();
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
  // Modal state
  const showConfirmModal = ref(false); // Steam Import State
  const showSteamImport = ref(false);
  const steamInput = ref('');
  const importResult = ref<{
    success: boolean;
    imported?: number;
    updated?: number;
    skipped?: number;
    message?: string;
  } | null>(null);

  // Import Progress Dialog State
  const importProgress = ref({
    current: 0,
    total: 0,
    message: 'Import wird vorbereitet...',
    isComplete: false
  });

  // Ein-/Ausklappen der Bibliothek-Sektion
  const isLibrarySectionExpanded = ref(true);

  // Nach Import aktualisieren
  const onImportCompleted = () => {
    gamesStore.refreshData();
  }; // Steam Import Function
  const importSteamLibrary = async () => {
    if (!steamInput.value.trim()) return;

    importResult.value = null;
    loadingStore.startOperation(
      'steam-import',
      'Steam-Bibliothek wird importiert...',
      'process'
    );

    try {
      const { $client } = useNuxtApp();
      const notifyStore = useNotifyStore();

      // Steam Import
      const result = await $client.games.importSteamLibrary.mutate({
        steamInput: steamInput.value.trim()
      });

      loadingStore.finishOperation('steam-import');
      importResult.value = result;

      if (result.success) {
        // Erfolgs-Benachrichtigung
        let notificationMessage = 'Steam-Import abgeschlossen! ';
        if (result.imported && result.imported > 0) {
          notificationMessage += `${result.imported} neue Spiele importiert. `;
        }
        if (result.updated && result.updated > 0) {
          notificationMessage += `${result.updated} Spiele aktualisiert. `;
        }
        if (!result.imported && !result.updated && result.skipped) {
          notificationMessage =
            'Steam-Import abgeschlossen - alle Spiele sind bereits in Ihrer Bibliothek.';
        }
        notifyStore.notify(notificationMessage.trim(), 1);

        // Form zurücksetzen
        showSteamImport.value = false;
        steamInput.value = '';

        // Spieleliste aktualisieren
        onImportCompleted();
      } else {
        // Fehler-Benachrichtigung
        if (result.errors && result.errors.length > 0) {
          notifyStore.notify(result.errors.join(' '), 2);
        } else {
          notifyStore.notify('Unbekannter Fehler beim Steam-Import', 2);
        }
      }
    } catch (error: any) {
      loadingStore.finishOperation('steam-import');
      console.error('Steam Import Error:', error);

      importResult.value = {
        success: false,
        message: error.message || 'Ein unerwarteter Fehler ist aufgetreten'
      };

      const notifyStore = useNotifyStore();
      notifyStore.notify(
        'Steam-Import fehlgeschlagen. Ein unerwarteter Fehler ist aufgetreten',
        3
      );
    }
  };

  // Computed für Auswahlmodus-UI
  const selectedGamesCount = computed(() => gamesStore.selectedGameIds.size);
  const selectedGamesText = computed(() => {
    const count = selectedGamesCount.value;
    return count === 1 ? '1 Spiel ausgewählt' : `${count} Spiele ausgewählt`;
  });

  // Computed properties für Filter und Suche
  const platforms = computed(() => {
    // Da wir keine Plattformdaten mehr haben, zeigen wir nur "Alle" an
    return [{ value: 'all', label: 'Alle Plattformen' }];
  });

  const filteredGames = computed(() => {
    let games = [...gamesStore.games];

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

    // Plattformfilter - momentan nicht implementiert da keine Plattformdaten
    // if (selectedPlatform.value !== 'all') {
    //   games = games.filter(game =>
    //     game.platforms.includes(selectedPlatform.value)
    //   );
    // }

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
    const success = await gamesStore.removeSelectedGames();
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
      .sort((a, b) => b.count - a.count);
  });

  const topPlatform = computed(() => {
    return platformStats.value[0] || { name: 'Keine', count: 0 };
  });
  const recentActivity = computed(() => {
    const recentGames = recentlyPlayedGames.value.slice(0, 5);
    if (recentGames.length === 0) return 'Keine Aktivität';
    return `${recentGames.length} Spiele kürzlich gespielt`;
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
        <!-- Header mit Toggle-Button -->
        <div
          @click="isLibrarySectionExpanded = !isLibrarySectionExpanded"
          class="p-6 cursor-pointer hover:bg-white/5 transition-colors rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="text-center flex-1">
              <h1
                class="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Meine Spielebibliothek
              </h1>
              <p class="text-gray-400 text-sm">
                Verwalte deine Spiele, importiere neue Bibliotheken und finde
                deine Lieblingsspiele
              </p>
            </div>
            <div class="ml-4">
              <Icon
                name="heroicons:chevron-down-20-solid"
                class="w-6 h-6 text-gray-400 transition-transform duration-300"
                :class="{ 'rotate-180': !isLibrarySectionExpanded }" />
            </div>
          </div>
        </div>

        <!-- Ausklappbarer Inhalt -->
        <div
          class="transition-all duration-500 ease-in-out"
          :class="
            isLibrarySectionExpanded
              ? 'max-h-[2000px] opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          ">
          <div class="px-6 pb-6 space-y-6">
            <!-- Import-Bereich -->
            <div
              class="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
              <h3
                class="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Icon
                  name="heroicons:arrow-down-tray-20-solid"
                  class="w-4 h-4 text-purple-400" />
                Bibliothek Import
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <!-- Steam -->
                <div
                  class="relative bg-gray-700/20 rounded-xl border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300 overflow-hidden group">
                  <div
                    class="p-4 transition-all duration-300"
                    :class="showSteamImport ? 'min-h-[100px]' : 'h-20'">
                    <!-- Nicht-erweiterte Ansicht -->
                    <div
                      v-if="!showSteamImport"
                      class="h-full flex items-center justify-center">
                      <button
                        @click.stop="showSteamImport = !showSteamImport"
                        class="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg"
                        title="Steam Import">
                        <Icon
                          name="simple-icons:steam"
                          class="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </button>
                    </div>

                    <!-- Erweiterte Ansicht -->
                    <div v-else class="space-y-3">
                      <!-- Header mit Steam Icon und Titel -->
                      <div class="flex items-center gap-3">
                        <div
                          class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Icon
                            name="simple-icons:steam"
                            class="w-6 h-6 text-white" />
                        </div>
                        <div class="flex-1">
                          <h4 class="text-sm font-semibold text-white">
                            Steam Import
                          </h4>
                          <p class="text-xs text-gray-400">
                            Importiere deine Steam-Bibliothek
                          </p>
                        </div>
                        <button
                          @click.stop="showSteamImport = false"
                          class="w-6 h-6 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-colors">
                          <Icon
                            name="heroicons:x-mark-16-solid"
                            class="w-3 h-3 text-gray-300" />
                        </button>
                      </div>

                      <!-- Input und Import Button -->
                      <div class="space-y-2">
                        <input
                          v-model="steamInput"
                          type="text"
                          placeholder="Steam ID oder Profil-URL eingeben..."
                          class="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          :disabled="loadingStore.hasForegroundOperations"
                          @keypress.enter="
                            steamInput.trim() &&
                              !loadingStore.hasForegroundOperations &&
                              importSteamLibrary()
                          " />

                        <button
                          @click.stop="importSteamLibrary"
                          :disabled="
                            !steamInput.trim() ||
                            loadingStore.hasForegroundOperations
                          "
                          class="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2">
                          <Icon
                            :name="
                              loadingStore.hasForegroundOperations
                                ? 'heroicons:arrow-path-16-solid'
                                : 'heroicons:arrow-down-tray-16-solid'
                            "
                            :class="[
                              'w-4 h-4',
                              loadingStore.hasForegroundOperations
                                ? 'animate-spin'
                                : ''
                            ]" />
                          {{
                            loadingStore.hasForegroundOperations
                              ? 'Importiere...'
                              : 'Bibliothek importieren'
                          }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Epic Games (Coming Soon) -->
                <div
                  class="relative bg-gray-700/20 rounded-xl border border-gray-600/30 opacity-60 cursor-not-allowed overflow-hidden">
                  <div class="p-4 h-20 flex items-center justify-center">
                    <div class="text-center">
                      <div
                        class="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-1">
                        <Icon
                          name="simple-icons:epicgames"
                          class="w-6 h-6 text-white" />
                      </div>
                      <span class="text-xs text-gray-500 font-medium"
                        >Bald verfügbar</span
                      >
                    </div>
                  </div>
                </div>

                <!-- GOG (Coming Soon) -->
                <div
                  class="relative bg-gray-700/20 rounded-xl border border-gray-600/30 opacity-60 cursor-not-allowed overflow-hidden">
                  <div class="p-4 h-20 flex items-center justify-center">
                    <div class="text-center">
                      <div
                        class="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-1">
                        <Icon
                          name="simple-icons:gogdotcom"
                          class="w-6 h-6 text-white" />
                      </div>
                      <span class="text-xs text-gray-500 font-medium"
                        >Bald verfügbar</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <!-- Import Result -->
              <div
                v-if="importResult && !showSteamImport"
                class="mt-4 p-3 rounded-xl border text-sm"
                :class="
                  importResult.success
                    ? 'bg-green-900/20 border-green-500/30 text-green-300'
                    : 'bg-red-900/20 border-red-500/30 text-red-300'
                ">
                <div class="flex items-center gap-2 mb-1">
                  <Icon
                    :name="
                      importResult.success
                        ? 'heroicons:check-circle-20-solid'
                        : 'heroicons:exclamation-triangle-20-solid'
                    "
                    class="w-4 h-4" />
                  <span class="font-medium">{{
                    importResult.success
                      ? 'Import erfolgreich!'
                      : 'Import fehlgeschlagen'
                  }}</span>
                </div>
                <div
                  v-if="
                    importResult.success &&
                    (importResult.imported || importResult.updated)
                  "
                  class="pl-6 space-y-1 text-sm">
                  <div
                    v-if="importResult.imported"
                    class="flex items-center gap-2">
                    <Icon
                      name="heroicons:plus-circle-16-solid"
                      class="w-3 h-3" />
                    {{ importResult.imported }} neue Spiele importiert
                  </div>
                  <div
                    v-if="importResult.updated"
                    class="flex items-center gap-2">
                    <Icon
                      name="heroicons:arrow-path-16-solid"
                      class="w-3 h-3" />
                    {{ importResult.updated }} Spiele aktualisiert
                  </div>
                </div>
                <div
                  v-else-if="!importResult.success && importResult.message"
                  class="pl-6 text-sm">
                  {{ importResult.message }}
                </div>
              </div>
            </div>

            <!-- Stats-Bereich (verbessertes Design) -->
            <div
              class="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
              <h3
                class="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <Icon
                  name="heroicons:chart-bar-20-solid"
                  class="w-4 h-4 text-purple-400" />
                Bibliothek-Statistiken
              </h3>
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
                            Math.min(100, (totalPlayTime / 1000) * 100) + '%'
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
            v-if="
              !loadingStore.hasForegroundOperations &&
              gamesStore.games.length > 0
            "
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
            v-if="
              !loadingStore.hasForegroundOperations &&
              gamesStore.games.length > 0
            "
            class="flex items-center gap-3">
            <!-- Game Count -->
            <span class="text-xs text-gray-500 whitespace-nowrap">
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
          "
          @toggleFavorite="handleToggleFavorite" />
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
