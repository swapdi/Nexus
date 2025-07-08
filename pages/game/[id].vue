<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import type { UserGameWithDetails } from '~/lib/services/games.service';

  // Route Parameter (Game ID, nicht UserGame ID)
  const route = useRoute();
  const gameId = computed(() => parseInt(route.params.id as string));

  // Stores
  const gamesStore = useGamesStore();

  // State
  const game = ref<UserGameWithDetails | null>(null);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  // Notes editing state
  const isEditingNotes = ref(false);
  const notesText = ref('');
  const isSavingNotes = ref(false);

  // Page Meta
  definePageMeta({
    middleware: ['auth'],
    layout: 'authenticated'
  });

  // Lade Spiel-Details
  onMounted(async () => {
    try {
      await gamesStore.init();

      // Suche das Spiel in der Bibliothek des Users anhand der Game ID
      const existingGame = gamesStore.games.find(
        g => g.game.id === gameId.value
      );
      if (existingGame) {
        game.value = existingGame;
        console.log('Loaded from store cache:', game.value);
        isLoading.value = false;
      } else {
        // Falls nicht im Store, lade es über den Store (mit UserGame ID)
        // Fallback: Versuche alle Spiele zu laden und dann zu finden
        await gamesStore.loadGames();
        const gameData = gamesStore.games.find(g => g.game.id === gameId.value);
        if (gameData) {
          game.value = gameData;
          console.log('Loaded from API:', game.value);
        } else {
          error.value = 'Spiel nicht gefunden oder nicht in deiner Bibliothek';
        }
        isLoading.value = false;
      }
    } catch (err) {
      console.error('Fehler beim Laden des Spiels:', err);
      error.value = 'Fehler beim Laden des Spiels';
      isLoading.value = false;
    }
  });

  // Helper Functions
  const formatPlayTime = (minutes: number): string => {
    if (minutes === 0) return '0 Min';
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours >= 2) {
      return `${hours}h`;
    } else if (hours === 1) {
      return remainingMinutes > 0 ? `1h ${remainingMinutes}m` : '1h';
    } else {
      return `${minutes} Min`;
    }
  };

  const getStars = (rating: number) => {
    // Konvertiere IGDB-Rating (0-100) zu 5-Sterne-System
    const normalizedRating = Math.round((rating / 100) * 5);
    return Array.from({ length: 5 }, (_, i) => i < normalizedRating);
  };

  const formatRating = (rating: number) => {
    // Zeige IGDB totalRating als x.x/100 an
    return rating.toFixed(1);
  };

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

  const formatDate = (date: Date | string | null) => {
    if (!date) return 'Unbekannt';
    return new Date(date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatReleaseYear = (date: Date | string | null) => {
    if (!date) return null;
    return new Date(date).getFullYear();
  };

  const formatGenreList = (genres: string[]) => {
    if (!genres || genres.length === 0) return 'Keine Genres';
    if (genres.length <= 3) return genres.join(', ');
    return `${genres.slice(0, 3).join(', ')} +${genres.length - 3} weitere`;
  };

  const formatDeveloperList = (developers: string[]) => {
    if (!developers || developers.length === 0) return 'Unbekannt';
    if (developers.length <= 2) return developers.join(', ');
    return `${developers.slice(0, 2).join(', ')} +${
      developers.length - 2
    } weitere`;
  };

  const formatPublisherList = (publishers: string[]) => {
    if (!publishers || publishers.length === 0) return 'Unbekannt';
    if (publishers.length <= 2) return publishers.join(', ');
    return `${publishers.slice(0, 2).join(', ')} +${
      publishers.length - 2
    } weitere`;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 80) return 'text-green-400';
    if (rating >= 60) return 'text-yellow-400';
    if (rating >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getRatingBgColor = (rating: number) => {
    if (rating >= 80) return 'bg-green-500/20 border-green-500/40';
    if (rating >= 60) return 'bg-yellow-500/20 border-yellow-500/40';
    if (rating >= 40) return 'bg-orange-500/20 border-orange-500/40';
    return 'bg-red-500/20 border-red-500/40';
  };

  const hasGameData = computed(() => {
    return (
      game.value &&
      (game.value.game.summary ||
        game.value.game.genres?.length ||
        game.value.game.developers?.length ||
        game.value.game.publishers?.length ||
        game.value.game.firstReleaseDate ||
        game.value.game.totalRating)
    );
  });

  // Zurück zur Bibliothek
  const goBack = () => {
    navigateTo('/my-games');
  };

  // Notes editing functions
  const startEditingNotes = () => {
    notesText.value = game.value?.notes || '';
    isEditingNotes.value = true;
  };

  const cancelEditingNotes = () => {
    isEditingNotes.value = false;
    notesText.value = '';
  };

  const saveNotes = async () => {
    if (!game.value) return;

    try {
      isSavingNotes.value = true;

      const { $client } = useNuxtApp();
      const notifyStore = useNotifyStore();

      const updatedGame = await $client.games.updateGameNotes.mutate({
        userGameId: game.value.id,
        notes: notesText.value.trim() || null
      });

      if (updatedGame) {
        game.value = updatedGame;
        // Auch im Store aktualisieren
        await gamesStore.refreshData();
        notifyStore.notify('Notizen erfolgreich gespeichert', 1);
      }

      isEditingNotes.value = false;
    } catch (err: any) {
      console.error('Fehler beim Speichern der Notizen:', err);
      const notifyStore = useNotifyStore();
      notifyStore.notify('Fehler beim Speichern der Notizen', 3);
    } finally {
      isSavingNotes.value = false;
    }
  };
</script>

<template>
  <div class="min-h-screen overflow-hidden">
    <!-- Loading State -->
    <LoadingOverlay v-if="isLoading" />

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-red-400 text-6xl mb-4">⚠️</div>
        <h2 class="text-xl font-bold text-white mb-2">Fehler</h2>
        <p class="text-gray-400">{{ error }}</p>
      </div>
    </div>

    <!-- Game Detail -->
    <div v-else-if="game" class="relative">
      <!-- Full-width Hero Background mit Parallax-Effekt -->
      <div class="fixed inset-0 z-0">
        <div
          class="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20"></div>
        <!-- Dynamische Partikel-Animation -->
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
          <div
            class="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse animation-delay-1000"></div>
          <div
            class="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-pulse animation-delay-2000"></div>
          <div
            class="absolute top-1/2 right-1/4 w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse animation-delay-3000"></div>
        </div>
        <!-- Animated grid pattern -->
        <div class="absolute inset-0 opacity-5">
          <div class="grid grid-cols-12 gap-4 h-full w-full">
            <div
              v-for="i in 12"
              :key="i"
              class="border-r border-purple-500/20"></div>
          </div>
        </div>
      </div>
      <!-- Scrollable Content -->
      <div class="relative z-10 space-y-8">
        <!-- Hero Game Section -->
        <div class="mx-4 lg:mx-8">
          <div
            class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700/30 shadow-2xl">
            <!-- Animated background elements -->
            <div class="absolute inset-0">
              <div
                class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div
                class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
            </div>
            <div class="relative z-10 p-8 lg:p-12">
              <!-- Zurück zur Bibliothek Button -->
              <div class="mb-6">
                <button
                  @click="goBack"
                  class="group inline-flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-gray-200 text-sm transition-all duration-200">
                  <Icon
                    name="heroicons:arrow-left-20-solid"
                    class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                  <span>Zurück zur Bibliothek</span>
                </button>
              </div>

              <div class="grid grid-cols-1 xl:grid-cols-5 gap-8 lg:gap-12">
                <!-- Enhanced Cover Image -->
                <div class="xl:col-span-2">
                  <div class="relative group">
                    <!-- Main cover with enhanced effects -->
                    <div
                      class="aspect-[3/4] bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden relative shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-purple-500/20">
                      <img
                        :src="game.game.coverUrl || '/gameplaceholder.jpg'"
                        :alt="game.game.name"
                        class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        loading="lazy" />

                      <!-- Gradient overlay for better readability -->
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                      <!-- Platform badges with glow effect -->
                      <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                        <!-- Platzhalter für Plattformen - implementiert wenn verfügbar -->
                      </div>
                    </div>

                    <!-- Reflection effect -->
                    <div
                      class="absolute -bottom-20 left-0 right-0 h-20 bg-gradient-to-t from-gray-900/20 to-transparent transform scale-y-[-1] blur-sm opacity-30 pointer-events-none"></div>
                  </div>
                </div>

                <!-- Enhanced Game Information -->
                <div class="xl:col-span-3 space-y-8">
                  <!-- Title with animated gradient -->
                  <div>
                    <h1
                      class="text-4xl lg:text-6xl font-black mb-4 leading-tight">
                      <span
                        class="bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x bg-300">
                        {{ game.game.name }}
                      </span>
                    </h1>

                    <!-- Release Year & Rating Badge -->
                    <div class="flex items-center gap-3 mb-6">
                      <div
                        v-if="formatReleaseYear(game.game.firstReleaseDate)"
                        class="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700/40 font-medium">
                        {{ formatReleaseYear(game.game.firstReleaseDate) }}
                      </div>
                      <div
                        v-if="game.game.totalRating"
                        :class="getRatingBgColor(game.game.totalRating)"
                        class="px-3 py-1 text-sm rounded-full border font-medium flex items-center gap-1">
                        <Icon name="heroicons:star-20-solid" class="w-4 h-4" />
                        <span :class="getRatingColor(game.game.totalRating)">{{
                          formatRating(game.game.totalRating)
                        }}</span>
                      </div>
                    </div>

                    <!-- Enhanced genres with glow -->
                    <div
                      v-if="game.game.genres && game.game.genres.length > 0"
                      class="flex flex-wrap gap-2 mb-8">
                      <span
                        v-for="genre in game.game.genres.slice(0, 5)"
                        :key="genre"
                        class="px-3 py-1.5 bg-gradient-to-r from-purple-600/30 to-purple-700/30 text-purple-200 text-sm rounded-full border border-purple-500/40 font-medium backdrop-blur-sm hover:from-purple-500/40 hover:to-purple-600/40 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/20">
                        {{ genre }}
                      </span>
                      <span
                        v-if="game.game.genres.length > 5"
                        class="px-3 py-1.5 bg-gray-800/50 text-gray-400 text-sm rounded-full border border-gray-700/40 font-medium">
                        +{{ game.game.genres.length - 5 }} weitere
                      </span>
                    </div>

                    <!-- Game Summary -->
                    <div v-if="game.game.summary" class="mb-6">
                      <p class="text-gray-300 leading-relaxed text-base">
                        {{ game.game.summary }}
                      </p>
                    </div>
                  </div>
                  <!-- Enhanced Stats Grid mit Animationen -->
                  <div
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <!-- Spielzeit Card -->
                    <div class="group relative h-24">
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-blue-600/15 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                      <div
                        class="relative bg-gradient-to-br from-blue-500/8 to-blue-600/8 rounded-xl p-3 border border-blue-500/20 backdrop-blur-sm hover:border-blue-400/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 h-full flex flex-col justify-between">
                        <div class="flex items-center gap-2">
                          <div class="p-1 bg-blue-500/15 rounded-lg">
                            <Icon
                              name="heroicons:clock-20-solid"
                              class="w-4 h-4 text-blue-400" />
                          </div>
                          <span class="text-blue-300 font-medium text-xs"
                            >Spielzeit</span
                          >
                        </div>
                        <div class="flex-1 flex flex-col justify-center">
                          <div
                            class="text-xl font-bold text-white leading-tight">
                            {{ formatPlayTime(game.playtimeMinutes || 0) }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Zuletzt gespielt Card -->
                    <div class="group relative h-24">
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-green-500/15 to-green-600/15 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                      <div
                        class="relative bg-gradient-to-br from-green-500/8 to-green-600/8 rounded-xl p-3 border border-green-500/20 backdrop-blur-sm hover:border-green-400/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/10 h-full flex flex-col justify-between">
                        <div class="flex items-center gap-2">
                          <div class="p-1 bg-green-500/15 rounded-lg">
                            <Icon
                              name="heroicons:calendar-20-solid"
                              class="w-4 h-4 text-green-400" />
                          </div>
                          <span class="text-green-300 font-medium text-xs"
                            >Letzte Session</span
                          >
                        </div>
                        <div class="flex-1 flex flex-col justify-center">
                          <div
                            class="text-xl font-bold text-white leading-tight">
                            {{ formatRelativeTime(game.lastPlayed) }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Hinzugefügt Card -->
                    <div class="group relative h-24">
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-purple-600/15 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                      <div
                        class="relative bg-gradient-to-br from-purple-500/8 to-purple-600/8 rounded-xl p-3 border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 h-full flex flex-col justify-between">
                        <div class="flex items-center gap-2">
                          <div class="p-1 bg-purple-500/15 rounded-lg">
                            <Icon
                              name="heroicons:plus-20-solid"
                              class="w-4 h-4 text-purple-400" />
                          </div>
                          <span class="text-purple-300 font-medium text-xs"
                            >Hinzugefügt</span
                          >
                        </div>
                        <div class="flex-1 flex flex-col justify-center">
                          <div
                            class="text-xl font-bold text-white leading-tight">
                            {{ formatRelativeTime(game.addedAt) }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Bewertung Card -->
                    <div class="group relative h-24">
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-yellow-500/15 to-yellow-600/15 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                      <div
                        class="relative bg-gradient-to-br from-yellow-500/8 to-yellow-600/8 rounded-xl p-3 border border-yellow-500/20 backdrop-blur-sm hover:border-yellow-400/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/10 h-full flex flex-col justify-between">
                        <div class="flex items-center gap-2">
                          <div class="p-1 bg-yellow-500/15 rounded-lg">
                            <Icon
                              name="heroicons:star-20-solid"
                              class="w-4 h-4 text-yellow-400" />
                          </div>
                          <span class="text-yellow-300 font-medium text-xs"
                            >Bewertung</span
                          >
                        </div>
                        <div class="flex-1 flex flex-col justify-center">
                          <div
                            class="text-xl font-bold text-white leading-tight">
                            {{
                              game.game.totalRating
                                ? `${formatRating(game.game.totalRating)}/100`
                                : '—'
                            }}
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

        <!-- Screenshots Section -->
        <div
          v-if="game.game.screenshots && game.game.screenshots.length > 0"
          class="mx-4 lg:mx-8">
          <div class="group relative">
            <div
              class="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
            <div
              class="relative bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg hover:shadow-gray-500/10">
              <!-- Header -->
              <div class="flex items-center gap-3 mb-6">
                <div class="p-2 bg-gray-700/30 rounded-lg">
                  <Icon
                    name="heroicons:photo-20-solid"
                    class="w-5 h-5 text-gray-300" />
                </div>
                <h2 class="text-xl font-bold text-white">Screenshots</h2>
              </div>

              <!-- Screenshots Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="(screenshot, index) in game.game.screenshots.slice(
                    0,
                    6
                  )"
                  :key="index"
                  class="group relative aspect-video bg-gray-800/50 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img
                    :src="screenshot"
                    :alt="`Screenshot ${index + 1}`"
                    class="w-full h-full object-cover"
                    loading="lazy" />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div
                    class="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {{ index + 1 }} / {{ game.game.screenshots.length }}
                  </div>
                </div>
              </div>

              <!-- Show More Button -->
              <div
                v-if="game.game.screenshots.length > 6"
                class="text-center mt-6">
                <button
                  class="px-6 py-3 bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-500/90 hover:to-purple-600/90 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                  Alle {{ game.game.screenshots.length }} Screenshots anzeigen
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Game Details Section -->
        <div class="mx-4 lg:mx-8">
          <!-- Enhanced Details Card -->
          <div class="group relative">
            <div
              class="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
            <div
              class="relative bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg hover:shadow-gray-500/10">
              <!-- Header -->
              <div class="flex items-center gap-3 mb-6">
                <div class="p-2 bg-gray-700/30 rounded-lg">
                  <Icon
                    name="heroicons:information-circle-20-solid"
                    class="w-5 h-5 text-gray-300" />
                </div>
                <h2 class="text-xl font-bold text-white">Spielinformationen</h2>
              </div>

              <!-- Enhanced Details Grid -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Left Column: Game Info -->
                <div class="space-y-6">
                  <!-- Developer -->
                  <div
                    v-if="
                      game.game.developers && game.game.developers.length > 0
                    "
                    class="group">
                    <div
                      class="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">
                      Entwickler
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="dev in game.game.developers"
                        :key="dev"
                        class="px-3 py-1.5 bg-blue-500/10 text-blue-300 text-sm rounded-lg border border-blue-500/20 font-medium hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-300">
                        {{ dev }}
                      </span>
                    </div>
                  </div>

                  <!-- Publisher -->
                  <div
                    v-if="
                      game.game.publishers && game.game.publishers.length > 0
                    "
                    class="group">
                    <div
                      class="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">
                      Publisher
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="pub in game.game.publishers"
                        :key="pub"
                        class="px-3 py-1.5 bg-green-500/10 text-green-300 text-sm rounded-lg border border-green-500/20 font-medium hover:bg-green-500/20 hover:border-green-400/30 transition-all duration-300">
                        {{ pub }}
                      </span>
                    </div>
                  </div>

                  <!-- Release Date -->
                  <div v-if="game.game.firstReleaseDate" class="group">
                    <div
                      class="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">
                      Veröffentlichung
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon
                        name="heroicons:calendar-20-solid"
                        class="w-4 h-4 text-gray-400" />
                      <span class="text-white font-medium">
                        {{ formatDate(game.game.firstReleaseDate) }}
                      </span>
                    </div>
                  </div>

                  <!-- IGDB ID -->
                  <div v-if="game.game.igdbId" class="group">
                    <div
                      class="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">
                      IGDB ID
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon
                        name="heroicons:link-20-solid"
                        class="w-4 h-4 text-gray-400" />
                      <span class="text-white font-medium">
                        {{ game.game.igdbId }}
                      </span>
                    </div>
                  </div>

                  <!-- Last Synced -->
                  <div v-if="game.game.lastSyncedAt" class="group">
                    <div
                      class="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">
                      Letzte Synchronisation
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon
                        name="heroicons:arrow-path-20-solid"
                        class="w-4 h-4 text-gray-400" />
                      <span class="text-white font-medium">
                        {{ formatRelativeTime(game.game.lastSyncedAt) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Right Column: Additional Info -->
                <div class="space-y-6">
                  <!-- Genres -->
                  <div
                    v-if="game.game.genres && game.game.genres.length > 0"
                    class="group">
                    <div
                      class="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">
                      Genres
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="genre in game.game.genres"
                        :key="genre"
                        class="px-3 py-1.5 bg-purple-500/10 text-purple-300 text-sm rounded-lg border border-purple-500/20 font-medium hover:bg-purple-500/20 hover:border-purple-400/30 transition-all duration-300">
                        {{ genre }}
                      </span>
                    </div>
                  </div>

                  <!-- Rating Details -->
                  <div v-if="game.game.totalRating" class="group">
                    <div
                      class="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">
                      Community Bewertung
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="flex items-center">
                        <Icon
                          v-for="(filled, index) in getStars(
                            game.game.totalRating
                          )"
                          :key="index"
                          name="heroicons:star-20-solid"
                          :class="filled ? 'text-yellow-400' : 'text-gray-600'"
                          class="w-5 h-5" />
                      </div>
                      <span
                        :class="getRatingColor(game.game.totalRating)"
                        class="font-bold text-lg">
                        {{ formatRating(game.game.totalRating) }}/100
                      </span>
                    </div>
                  </div>

                  <!-- Platform -->
                  <div class="group">
                    <div
                      class="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">
                      Plattform
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon
                        name="heroicons:computer-desktop-20-solid"
                        class="w-4 h-4 text-gray-400" />
                      <span
                        class="px-3 py-1.5 bg-gray-800/50 text-gray-200 text-sm rounded-lg border border-gray-700/40 font-medium">
                        Steam
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Game Details Section -->
        <div class="mx-4 lg:mx-8">
          <!-- Combined Details Card -->
          <div class="group relative">
            <div
              class="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
            <div
              class="relative bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg hover:shadow-gray-500/10">
              <!-- Header -->
              <div class="flex items-center gap-2 mb-4">
                <div class="p-1.5 bg-gray-700/30 rounded-lg">
                  <Icon
                    name="heroicons:information-circle-20-solid"
                    class="w-4 h-4 text-gray-300" />
                </div>
                <h2 class="text-gray-200 font-medium text-sm">Spiel-Details</h2>
              </div>
              <!-- Details Grid -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Left Column: Game Info -->
                <div class="space-y-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <!-- Developer -->
                    <div
                      v-if="
                        game.game.developers && game.game.developers.length > 0
                      "
                      class="space-y-1">
                      <div
                        class="text-xs text-gray-400/60 font-medium uppercase tracking-wider">
                        Entwickler
                      </div>
                      <div class="text-white font-medium text-sm leading-tight">
                        {{ game.game.developers.join(', ') }}
                      </div>
                    </div>

                    <!-- Publisher -->
                    <div
                      v-if="
                        game.game.publishers && game.game.publishers.length > 0
                      "
                      class="space-y-1">
                      <div
                        class="text-xs text-gray-400/60 font-medium uppercase tracking-wider">
                        Publisher
                      </div>
                      <div class="text-white font-medium text-sm leading-tight">
                        {{ game.game.publishers.join(', ') }}
                      </div>
                    </div>

                    <!-- Release Date -->
                    <div v-if="game.game.firstReleaseDate" class="space-y-1">
                      <div
                        class="text-xs text-gray-400/60 font-medium uppercase tracking-wider">
                        Veröffentlichung
                      </div>
                      <div class="text-white font-medium text-sm leading-tight">
                        {{ formatDate(game.game.firstReleaseDate) }}
                      </div>
                    </div>

                    <!-- Platforms -->
                    <div class="space-y-1">
                      <div
                        class="text-xs text-gray-400/60 font-medium uppercase tracking-wider">
                        Plattformen
                      </div>
                      <div class="flex flex-wrap gap-1">
                        <!-- Platzhalter für Plattformen - werden implementiert wenn verfügbar -->
                        <span
                          class="px-2 py-0.5 bg-gray-800/50 text-gray-200 text-xs rounded border border-gray-700/40 font-medium backdrop-blur-sm">
                          Steam
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Right Column: Description -->
                <div v-if="game.game.summary" class="space-y-1">
                  <div
                    class="text-xs text-gray-400/60 font-medium uppercase tracking-wider">
                    Beschreibung
                  </div>
                  <div class="text-gray-300/80 leading-relaxed text-sm">
                    {{ game.game.summary }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Personal Notes -->
          <div class="mt-4 group relative">
            <div
              class="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
            <div
              class="relative bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg hover:shadow-gray-500/10">
              <!-- Header -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <div class="p-1.5 bg-gray-700/30 rounded-lg">
                    <Icon
                      name="heroicons:pencil-square-20-solid"
                      class="w-4 h-4 text-gray-300" />
                  </div>
                  <h2 class="text-gray-200 font-medium text-sm">
                    Persönliche Notizen
                  </h2>
                </div>

                <!-- Edit/Save Buttons -->
                <div class="flex items-center gap-2">
                  <button
                    v-if="!isEditingNotes"
                    @click="startEditingNotes"
                    class="px-3 py-1.5 bg-gray-700/30 hover:bg-gray-600/40 text-gray-300 hover:text-white text-xs rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 flex items-center gap-1.5">
                    <Icon name="heroicons:pencil-20-solid" class="w-3 h-3" />
                    {{ game.notes ? 'Bearbeiten' : 'Hinzufügen' }}
                  </button>

                  <template v-else>
                    <button
                      @click="saveNotes"
                      :disabled="isSavingNotes"
                      class="px-3 py-1.5 bg-green-600/80 hover:bg-green-600 text-white text-xs rounded-lg border border-green-500/50 hover:border-green-400/70 transition-all duration-300 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
                      <Icon
                        v-if="!isSavingNotes"
                        name="heroicons:check-20-solid"
                        class="w-3 h-3" />
                      <Icon
                        v-else
                        name="heroicons:arrow-path-20-solid"
                        class="w-3 h-3 animate-spin" />
                      {{ isSavingNotes ? 'Speichert...' : 'Speichern' }}
                    </button>

                    <button
                      @click="cancelEditingNotes"
                      :disabled="isSavingNotes"
                      class="px-3 py-1.5 bg-gray-700/30 hover:bg-gray-600/40 text-gray-300 hover:text-white text-xs rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
                      <Icon name="heroicons:x-mark-20-solid" class="w-3 h-3" />
                      Abbrechen
                    </button>
                  </template>
                </div>
              </div>

              <!-- Notes Content -->
              <div v-if="!isEditingNotes">
                <div
                  v-if="game.notes"
                  class="text-gray-300/80 leading-relaxed text-sm whitespace-pre-wrap">
                  {{ game.notes }}
                </div>
                <div v-else class="text-gray-500 text-sm italic">
                  Keine Notizen vorhanden. Klicke auf "Hinzufügen" um Notizen zu
                  diesem Spiel zu verfassen.
                </div>
              </div>

              <!-- Notes Editor -->
              <div v-else>
                <textarea
                  v-model="notesText"
                  placeholder="Füge deine persönlichen Notizen zu diesem Spiel hinzu..."
                  maxlength="1000"
                  class="w-full h-32 bg-gray-800/50 border border-gray-600/30 rounded-lg p-3 text-gray-200 text-sm placeholder-gray-500 focus:border-gray-500/50 focus:outline-none focus:ring-0 resize-none"
                  :disabled="isSavingNotes">
                </textarea>

                <!-- Character count -->
                <div class="flex justify-between items-center mt-2">
                  <div class="text-xs text-gray-500">
                    {{ notesText.length }} / 1000 Zeichen
                  </div>
                  <div class="text-xs text-gray-500">
                    Tipp: Du kannst Zeilenwechsel verwenden
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Spacing -->
        <div class="h-20"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Gaming-inspired animations and effects */

  /* Gradient animation for title */
  @keyframes gradient-x {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .animate-gradient-x {
    animation: gradient-x 6s ease infinite;
  }

  .bg-300 {
    background-size: 300% 300%;
  }

  /* Enhanced transitions für alle interaktiven Elemente */
  button {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  /* Gaming-style glow effects */
  button:hover {
    will-change: transform, box-shadow, background-color;
  }

  /* Smooth scaling animations */
  .transition-all {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Staggered animation delays */
  .animation-delay-300 {
    animation-delay: 300ms;
  }

  .animation-delay-600 {
    animation-delay: 600ms;
  }

  .animation-delay-1000 {
    animation-delay: 1000ms;
  }

  .animation-delay-2000 {
    animation-delay: 2000ms;
  }

  .animation-delay-3000 {
    animation-delay: 3000ms;
  }

  /* Enhanced hover states with 3D effects */
  .group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
  }

  .group:hover .group-hover\:-translate-x-1 {
    transform: translateX(-0.25rem);
  }

  /* Parallax and depth effects */
  .backdrop-blur-xl {
    backdrop-filter: blur(24px);
  }

  /* Gaming card hover effects */
  .hover\:shadow-purple-500\/20:hover {
    box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.2);
  }

  .hover\:shadow-blue-500\/20:hover {
    box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.2);
  }

  .hover\:shadow-green-500\/20:hover {
    box-shadow: 0 25px 50px -12px rgba(34, 197, 94, 0.2);
  }

  .hover\:shadow-yellow-500\/20:hover {
    box-shadow: 0 25px 50px -12px rgba(234, 179, 8, 0.2);
  }

  /* Enhanced blur effects for depth */
  .blur-xl {
    filter: blur(24px);
  }

  .blur-2xl {
    filter: blur(40px);
  }

  .blur-3xl {
    filter: blur(64px);
  }

  /* Gaming-style loading animations */
  @keyframes pulse-glow {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  /* Smooth card interactions */
  .hover\:scale-\[1\.02\]:hover {
    transform: scale(1.02);
  }

  /* Enhanced border animations */
  .hover\:border-purple-400\/60:hover {
    border-color: rgba(168, 85, 247, 0.6);
  }

  .hover\:border-blue-400\/50:hover {
    border-color: rgba(59, 130, 246, 0.5);
  }

  .hover\:border-green-400\/50:hover {
    border-color: rgba(34, 197, 94, 0.5);
  }

  .hover\:border-yellow-400\/50:hover {
    border-color: rgba(234, 179, 8, 0.5);
  }

  .hover\:border-gray-600\/50:hover {
    border-color: rgba(75, 85, 99, 0.5);
  }

  .hover\:border-gray-500\/70:hover {
    border-color: rgba(107, 114, 128, 0.7);
  }

  /* Responsive text scaling */
  @media (max-width: 640px) {
    .text-5xl {
      font-size: 2.5rem;
      line-height: 1.1;
    }

    .text-6xl {
      font-size: 3rem;
      line-height: 1.1;
    }
  }

  /* Performance optimizations */
  * {
    -webkit-tap-highlight-color: transparent;
  }

  .transform {
    transform: translateZ(0);
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Improved text rendering */
  .font-black {
    font-weight: 900;
    letter-spacing: -0.025em;
  }

  /* Enhanced focus states for accessibility */
  button:focus-visible {
    outline: 2px solid rgba(168, 85, 247, 0.5);
    outline-offset: 2px;
  }
</style>
