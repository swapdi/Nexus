<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import type { GameWithPlatforms } from '~/lib/services/games.service';

  // Route Parameter
  const route = useRoute();
  const gameId = computed(() => parseInt(route.params.id as string));

  // Stores
  const accountStore = useAccountStore();
  const gamesStore = useGamesStore();

  // State
  const game = ref<GameWithPlatforms | null>(null);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  // Page Meta
  definePageMeta({
    middleware: ['auth'],
    layout: 'authenticated'
  });

  // Lade Spiel-Details
  onMounted(async () => {
    try {
      await gamesStore.init();

      // Versuche zuerst das Spiel aus dem Store zu holen
      const existingGame = gamesStore.getGameById(gameId.value);
      if (existingGame) {
        game.value = existingGame;
        isLoading.value = false;
      } else {
        // Falls nicht im Store, lade es über den Store
        const gameData = await gamesStore.getGameWithPlatforms(gameId.value);
        if (gameData) {
          game.value = gameData;
        } else {
          error.value = 'Spiel nicht gefunden';
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
    return Array.from({ length: 5 }, (_, i) => i < rating);
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

  // Zurück zur Bibliothek
  const goBack = () => {
    navigateTo('/my-games');
  };
</script>

<template>
  <div class="min-h-screen overflow-hidden">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="relative">
        <!-- Pulsierender Gaming-Loader -->
        <div class="relative w-20 h-20">
          <div
            class="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
          <div
            class="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
          <div
            class="absolute inset-2 rounded-full border-4 border-transparent border-r-blue-500 animate-spin animation-delay-300"></div>
          <div
            class="absolute inset-4 rounded-full border-4 border-transparent border-b-pink-500 animate-spin animation-delay-600"></div>
        </div>
        <div class="text-center mt-6">
          <div class="text-lg font-semibold text-white mb-2">
            Lade Spiel-Details...
          </div>
          <div class="text-sm text-gray-400">
            Bereite epische Informationen vor
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen">
      <div class="relative max-w-md mx-auto">
        <!-- Animated error background -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-red-500/10 via-red-600/5 to-red-700/10 rounded-3xl blur-xl"></div>
        <div
          class="relative bg-gradient-to-br from-red-500/20 to-red-700/20 border border-red-500/30 rounded-2xl p-8 backdrop-blur-sm">
          <div class="text-center">
            <div class="relative mx-auto w-16 h-16 mb-6">
              <Icon
                name="heroicons:exclamation-triangle-20-solid"
                class="w-16 h-16 text-red-400 animate-pulse" />
              <div
                class="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
            </div>
            <h2 class="text-2xl font-bold text-red-300 mb-3">Epic Fail!</h2>
            <p class="text-red-200 mb-6">{{ error }}</p>
            <button
              @click="goBack"
              class="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25">
              <span class="relative z-10 flex items-center gap-2">
                <Icon name="heroicons:arrow-left-20-solid" class="w-5 h-5" />
                Zurück zur Bibliothek
              </span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
            </button>
          </div>
        </div>
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
        <!-- Floating Navigation Bar -->
        <div class="sticky top-4 z-50 mx-4">
          <div
            class="bg-black/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 shadow-2xl">
            <div class="flex items-center justify-between">
              <button
                @click="goBack"
                class="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                <Icon
                  name="heroicons:arrow-left-20-solid"
                  class="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Bibliothek</span>
              </button>
            </div>
          </div>
        </div>

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
              <div class="grid grid-cols-1 xl:grid-cols-5 gap-8 lg:gap-12">
                <!-- Enhanced Cover Image -->
                <div class="xl:col-span-2">
                  <div class="relative group">
                    <!-- Main cover with enhanced effects -->
                    <div
                      class="aspect-[3/4] bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden relative shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-purple-500/20">
                      <img
                        :src="game.coverUrl || '/gameplaceholder.jpg'"
                        :alt="game.title"
                        class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        loading="lazy" />

                      <!-- Gradient overlay for better readability -->
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                      <!-- Platform badges with glow effect -->
                      <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                        <div
                          v-for="platform in game.platforms"
                          :key="platform"
                          class="bg-black/90 backdrop-blur-md rounded-lg px-3 py-2 border border-purple-500/30 shadow-lg hover:border-purple-400/50 transition-all duration-300 hover:scale-110">
                          <PlatformLogo :platform="platform" size="lg" />
                        </div>
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
                      class="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                      <span
                        class="bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x bg-300">
                        {{ game.title }}
                      </span>
                    </h1>

                    <!-- Enhanced genres with glow -->
                    <div
                      v-if="game.genres && game.genres.length > 0"
                      class="flex flex-wrap gap-3 mb-8">
                      <span
                        v-for="genre in game.genres"
                        :key="genre"
                        class="px-4 py-2 bg-gradient-to-r from-purple-600/30 to-purple-700/30 text-purple-200 text-sm rounded-full border border-purple-500/40 font-semibold backdrop-blur-sm hover:from-purple-500/40 hover:to-purple-600/40 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/20">
                        {{ genre }}
                      </span>
                    </div>
                  </div>

                  <!-- Enhanced Stats Grid mit Animationen -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- Spielzeit Card -->
                    <div class="group relative">
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                      <div
                        class="relative bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-6 border border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
                        <div class="flex items-center gap-3 mb-3">
                          <div class="p-2 bg-blue-500/20 rounded-lg">
                            <Icon
                              name="heroicons:clock-20-solid"
                              class="w-6 h-6 text-blue-400" />
                          </div>
                          <span class="text-blue-300 font-semibold"
                            >Spielzeit</span
                          >
                        </div>
                        <div class="text-3xl font-black text-white mb-1">
                          {{ formatPlayTime(game.playtimeMinutes) }}
                        </div>
                        <div class="text-xs text-blue-200/70">
                          Gesamte Spielzeit
                        </div>
                      </div>
                    </div>

                    <!-- Zuletzt gespielt Card -->
                    <div class="group relative">
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                      <div
                        class="relative bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6 border border-green-500/30 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/20">
                        <div class="flex items-center gap-3 mb-3">
                          <div class="p-2 bg-green-500/20 rounded-lg">
                            <Icon
                              name="heroicons:calendar-20-solid"
                              class="w-6 h-6 text-green-400" />
                          </div>
                          <span class="text-green-300 font-semibold"
                            >Letzte Session</span
                          >
                        </div>
                        <div class="text-3xl font-black text-white mb-1">
                          {{ formatRelativeTime(game.lastPlayed) }}
                        </div>
                        <div class="text-xs text-green-200/70">
                          Zuletzt gespielt
                        </div>
                      </div>
                    </div>

                    <!-- Hinzugefügt Card -->
                    <div class="group relative">
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                      <div
                        class="relative bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                        <div class="flex items-center gap-3 mb-3">
                          <div class="p-2 bg-purple-500/20 rounded-lg">
                            <Icon
                              name="heroicons:plus-20-solid"
                              class="w-6 h-6 text-purple-400" />
                          </div>
                          <span class="text-purple-300 font-semibold"
                            >Hinzugefügt</span
                          >
                        </div>
                        <div class="text-3xl font-black text-white mb-1">
                          {{ formatRelativeTime(game.addedAt) }}
                        </div>
                        <div class="text-xs text-purple-200/70">
                          Zur Bibliothek
                        </div>
                      </div>
                    </div>

                    <!-- Bewertung Card -->
                    <div class="group relative">
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                      <div
                        class="relative bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-2xl p-6 border border-yellow-500/30 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20">
                        <div class="flex items-center gap-3 mb-3">
                          <div class="p-2 bg-yellow-500/20 rounded-lg">
                            <Icon
                              name="heroicons:star-20-solid"
                              class="w-6 h-6 text-yellow-400" />
                          </div>
                          <span class="text-yellow-300 font-semibold"
                            >Bewertung</span
                          >
                        </div>
                        <div class="text-3xl font-black text-white mb-1">
                          {{ game.rating ? `${game.rating}/5` : '—' }}
                        </div>
                        <div class="text-xs text-yellow-200/70">
                          {{
                            game.rating
                              ? 'Persönliche Wertung'
                              : 'Nicht bewertet'
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

        <!-- Enhanced Information Tabs/Sections -->
        <div class="mx-4 lg:mx-8 space-y-6">
          <!-- Game Details in Bento Box Style -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Details Card -->
            <div class="lg:col-span-2 relative group">
              <div
                class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div
                class="relative bg-black/80 backdrop-blur-xl rounded-3xl border border-gray-700/30 p-8 hover:border-gray-600/50 transition-all duration-300 shadow-2xl">
                <div class="flex items-center gap-3 mb-8">
                  <div
                    class="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                    <Icon
                      name="heroicons:information-circle-20-solid"
                      class="w-8 h-8 text-blue-400" />
                  </div>
                  <h2 class="text-3xl font-bold text-white">Spiel-Details</h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Developer -->
                  <div v-if="game.developer" class="space-y-2">
                    <div
                      class="text-sm text-gray-400 font-medium uppercase tracking-wider">
                      Entwickler
                    </div>
                    <div class="text-xl text-white font-bold">
                      {{ game.developer }}
                    </div>
                  </div>

                  <!-- Publisher -->
                  <div v-if="game.publisher" class="space-y-2">
                    <div
                      class="text-sm text-gray-400 font-medium uppercase tracking-wider">
                      Publisher
                    </div>
                    <div class="text-xl text-white font-bold">
                      {{ game.publisher }}
                    </div>
                  </div>

                  <!-- Release Date -->
                  <div v-if="game.releaseDate" class="space-y-2">
                    <div
                      class="text-sm text-gray-400 font-medium uppercase tracking-wider">
                      Veröffentlichung
                    </div>
                    <div class="text-xl text-white font-bold">
                      {{ formatDate(game.releaseDate) }}
                    </div>
                  </div>

                  <!-- Platforms -->
                  <div class="space-y-2">
                    <div
                      class="text-sm text-gray-400 font-medium uppercase tracking-wider">
                      Plattformen
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="platform in game.platforms"
                        :key="platform"
                        class="px-3 py-1.5 bg-gradient-to-r from-gray-700/80 to-gray-800/80 text-gray-200 text-sm rounded-lg border border-gray-600/50 font-medium backdrop-blur-sm hover:border-gray-500/70 transition-all duration-300">
                        {{ platform }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description Card -->
            <div v-if="game.description" class="relative group">
              <div
                class="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div
                class="relative bg-black/80 backdrop-blur-xl rounded-3xl border border-gray-700/30 p-8 hover:border-gray-600/50 transition-all duration-300 shadow-2xl h-full">
                <div class="flex items-center gap-3 mb-6">
                  <div
                    class="p-3 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl">
                    <Icon
                      name="heroicons:document-text-20-solid"
                      class="w-8 h-8 text-green-400" />
                  </div>
                  <h2 class="text-2xl font-bold text-white">Beschreibung</h2>
                </div>

                <div class="prose prose-invert max-w-none">
                  <p class="text-gray-300 leading-relaxed">
                    {{ game.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Personal Notes (falls vorhanden) -->
          <div v-if="game.notes" class="relative group">
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div
              class="relative bg-black/80 backdrop-blur-xl rounded-3xl border border-gray-700/30 p-8 hover:border-gray-600/50 transition-all duration-300 shadow-2xl">
              <div class="flex items-center gap-3 mb-6">
                <div
                  class="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                  <Icon
                    name="heroicons:pencil-square-20-solid"
                    class="w-8 h-8 text-purple-400" />
                </div>
                <h2 class="text-3xl font-bold text-white">
                  Persönliche Notizen
                </h2>
              </div>

              <div
                class="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/30">
                <p class="text-gray-300 leading-relaxed text-lg">
                  {{ game.notes }}
                </p>
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
