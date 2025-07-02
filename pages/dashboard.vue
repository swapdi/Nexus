<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
    title: 'Dashboard - Gaming Nexus',
    layout: 'authenticated'
  });

  const userStore = useUserStore();
  const user = computed(() => userStore.user);

  // Dashboard Stats (Mock-Daten)
  const stats = ref({
    totalGames: 127,
    hoursPlayed: 1847,
    achievementsUnlocked: 342,
    gamesCompleted: 23,
    currentLevel: user.value?.level || 15,
    currentXP: user.value?.xp || 2750,
    nextLevelXP: 3000,
    credits: user.value?.credits || 1250
  });

  // Zuletzt gespielte Spiele
  const recentGames = ref([
    {
      id: 1,
      title: 'Cyberpunk 2077',
      coverUrl: 'https://via.placeholder.com/200x280',
      platform: 'Steam',
      lastPlayed: '2 Stunden',
      progress: 78
    },
    {
      id: 2,
      title: 'Elden Ring',
      coverUrl: 'https://via.placeholder.com/200x280',
      platform: 'Steam',
      lastPlayed: '1 Tag',
      progress: 45
    },
    {
      id: 3,
      title: 'Red Dead Redemption 2',
      coverUrl: 'https://via.placeholder.com/200x280',
      platform: 'Epic Games',
      lastPlayed: '3 Tage',
      progress: 92
    },
    {
      id: 4,
      title: 'The Witcher 3',
      coverUrl: 'https://via.placeholder.com/200x280',
      platform: 'GOG',
      lastPlayed: '1 Woche',
      progress: 100
    }
  ]);

  // Aktuelle Achievements
  const recentAchievements = ref([
    {
      id: 1,
      title: 'Legendary Warrior',
      description: 'Erreiche Level 50 in Elden Ring',
      game: 'Elden Ring',
      icon: '🏆',
      rarity: 'Legendär',
      earnedAt: '2 Stunden'
    },
    {
      id: 2,
      title: 'Night City Legend',
      description: 'Schließe alle Hauptmissionen ab',
      game: 'Cyberpunk 2077',
      icon: '🌃',
      rarity: 'Episch',
      earnedAt: '1 Tag'
    },
    {
      id: 3,
      title: 'Master Explorer',
      description: 'Entdecke alle Gebiete',
      game: 'Red Dead Redemption 2',
      icon: '🗺️',
      rarity: 'Selten',
      earnedAt: '3 Tage'
    }
  ]);

  // Aktuelle Deals/Angebote
  const featuredDeals = ref([
    {
      id: 1,
      title: "Baldur's Gate 3",
      originalPrice: 59.99,
      discountPrice: 47.99,
      discount: 20,
      platform: 'Steam',
      coverUrl: 'https://via.placeholder.com/200x280',
      endsIn: '2 Tage'
    },
    {
      id: 2,
      title: 'Hades',
      originalPrice: 24.99,
      discountPrice: 12.49,
      discount: 50,
      platform: 'Epic Games',
      coverUrl: 'https://via.placeholder.com/200x280',
      endsIn: '5 Tage'
    },
    {
      id: 3,
      title: 'Disco Elysium',
      originalPrice: 39.99,
      discountPrice: 19.99,
      discount: 50,
      platform: 'GOG',
      coverUrl: 'https://via.placeholder.com/200x280',
      endsIn: '1 Woche'
    }
  ]);

  // Gaming-Aktivitäten diese Woche
  const weeklyActivity = ref([
    { day: 'Mo', hours: 2.5 },
    { day: 'Di', hours: 1.0 },
    { day: 'Mi', hours: 3.5 },
    { day: 'Do', hours: 2.0 },
    { day: 'Fr', hours: 4.0 },
    { day: 'Sa', hours: 5.5 },
    { day: 'So', hours: 3.0 }
  ]);

  // Berechne XP-Fortschritt
  const xpProgress = computed(() => {
    return Math.round((stats.value.currentXP / stats.value.nextLevelXP) * 100);
  });

  // Aktuelle Uhrzeit für Begrüßung
  const currentTime = ref(new Date());
  const greeting = computed(() => {
    const hour = currentTime.value.getHours();
    if (hour < 12) return 'Guten Morgen';
    if (hour < 18) return 'Guten Tag';
    return 'Guten Abend';
  });

  // Update Zeit jede Minute
  onMounted(() => {
    setInterval(() => {
      currentTime.value = new Date();
    }, 60000);
  });
  import { useNotifyStore } from '#imports';
  const notifactionstore = useNotifyStore();
  function testNotify() {
    notifactionstore.notify('Testbenachrichtigung', 2);
  }
</script>

<template>
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div
      class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 p-8">
      <!-- Animated Background -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-green-600/5 animate-pulse-slow"></div>
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>

      <div class="relative z-10">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1
              class="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
              {{ greeting }}, {{ user?.display_name || 'Gamer' }}! 🎮
            </h1>
            <p class="text-lg text-gray-300">
              Bereit für dein nächstes Gaming-Abenteuer? Hier ist deine
              Übersicht.
            </p>
          </div>

          <!-- Level & XP Progress -->
          <div
            class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
            <div class="flex items-center space-x-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-400">
                  {{ stats.currentLevel }}
                </div>
                <div class="text-xs text-gray-400">Level</div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-300">{{ stats.currentXP }} XP</span>
                  <span class="text-gray-400">{{ stats.nextLevelXP }} XP</span>
                </div>
                <div class="w-32 bg-gray-700 rounded-full h-2">
                  <div
                    class="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                    :style="`width: ${xpProgress}%`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Gaming Stats -->
      <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Total Games -->
        <div
          class="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-xl p-6 border border-purple-500/20 relative overflow-hidden group hover:border-purple-400/50 transition-all duration-500">
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-2">
              <Icon
                name="heroicons:squares-2x2-20-solid"
                class="w-8 h-8 text-purple-400" />
              <span class="text-xs text-purple-300 font-medium"
                >+12 diese Woche</span
              >
            </div>
            <div class="text-3xl font-bold text-white mb-1">
              {{ stats.totalGames }}
            </div>
            <div class="text-sm text-gray-400">Spiele in Bibliothek</div>
          </div>
        </div>

        <!-- Hours Played -->
        <div
          class="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-6 border border-blue-500/20 relative overflow-hidden group hover:border-blue-400/50 transition-all duration-500">
          <div
            class="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-2">
              <Icon
                name="heroicons:clock-20-solid"
                class="w-8 h-8 text-blue-400" />
              <span class="text-xs text-blue-300 font-medium"
                >+21h diese Woche</span
              >
            </div>
            <div class="text-3xl font-bold text-white mb-1">
              {{ stats.hoursPlayed }}
            </div>
            <div class="text-sm text-gray-400">Gespielte Stunden</div>
          </div>
        </div>

        <!-- Achievements -->
        <div
          class="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-6 border border-green-500/20 relative overflow-hidden group hover:border-green-400/50 transition-all duration-500">
          <div
            class="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-2">
              <Icon
                name="heroicons:trophy-20-solid"
                class="w-8 h-8 text-green-400" />
              <span class="text-xs text-green-300 font-medium"
                >+8 diese Woche</span
              >
            </div>
            <div class="text-3xl font-bold text-white mb-1">
              {{ stats.achievementsUnlocked }}
            </div>
            <div class="text-sm text-gray-400">Errungenschaften</div>
          </div>
        </div>
      </div>

      <!-- Right Column: Nexus Credits -->
      <div class="flex flex-col">
        <!-- Stylish Silver Credits Card -->
        <div
          class="bg-gradient-to-br from-slate-800 via-gray-700/80 to-slate-900 rounded-xl p-4 border border-slate-400/30 relative overflow-hidden group hover:border-slate-300/50 transition-all duration-500 shadow-xl">
          <!-- Animated Background Effects -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-slate-300/3 via-gray-300/5 to-slate-400/3 animate-pulse-slow"></div>
          <div
            class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-300/8 to-gray-300/8 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>
          <div
            class="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-slate-400/8 to-gray-400/8 rounded-full blur-xl transform -translate-x-10 translate-y-10"></div>

          <!-- Header with Purchase Link -->
          <div class="relative z-10 flex items-center justify-between mb-3">
            <div class="flex items-center space-x-2">
              <div
                class="w-7 h-7 bg-gradient-to-br from-slate-400 to-gray-500 rounded-lg flex items-center justify-center shadow-md">
                <Icon
                  name="heroicons:banknotes-20-solid"
                  class="w-4 h-4 text-white" />
              </div>
              <span
                class="text-sm font-semibold text-slate-200 uppercase tracking-wide">
                Guthaben
              </span>
            </div>

            <!-- Discrete Purchase Link -->
            <NuxtLink
              :to="'/credits/purchase'"
              class="text-slate-300 hover:text-slate-100 text-sm font-medium transition-colors"
              title="Credits nachkaufen"
              @click="testNotify">
              <Icon
                name="heroicons:plus-circle-20-solid"
                class="w-9 h-9 text-white" />
            </NuxtLink>
          </div>

          <!-- Large 3D Coin in Background -->
          <div class="absolute bottom-2 right-4 z-0 pointer-events-none">
            <!-- Credit Icon with Enhanced Styling -->
            <div class="relative">
              <div class="w-32 h-32 relative">
                <!-- Outer glow ring -->
                <div
                  class="absolute inset-0 rounded-full bg-gradient-to-r from-slate-300/15 to-gray-300/15 blur-sm"></div>
                <!-- Rotating border effect -->
                <div
                  class="absolute inset-1 rounded-full border-2 border-slate-300/20 animate-spin-slow"></div>
                <!-- Credit container with 3D coin flip effect -->
                <div
                  class="absolute inset-2 bg-gradient-to-br from-slate-700/80 via-gray-600/40 to-slate-800/80 rounded-full flex items-center justify-center shadow-xl border border-slate-400/30 group-hover:border-slate-300/50 transition-all duration-500 perspective-1000">
                  <!-- 3D Rotating Coin -->
                  <div
                    class="w-full h-full relative preserve-3d group-hover:animate-coin-flip">
                    <!-- Front of coin -->
                    <div class="absolute inset-0 backface-hidden rounded-full">
                      <img
                        src="/assets/images/NexusCredit.png"
                        alt="Nexus Credit"
                        class="w-full h-full object-contain drop-shadow-lg filter brightness-60" />
                    </div>

                    <!-- Back of coin (slightly different appearance for realism) -->
                    <div
                      class="absolute inset-0 backface-hidden rotate-y-180 rounded-full">
                      <img
                        src="/assets/images/NexusCredit.png"
                        alt="Nexus Credit Back"
                        class="w-full h-full object-contain drop-shadow-lg filter brightness-60 contrast-105 hue-rotate-15" />
                    </div>

                    <!-- Coin edge highlight effect -->
                    <div
                      class="absolute inset-0 rounded-full border-2 border-gradient-to-r from-transparent via-slate-200/20 to-transparent opacity-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Balance Display -->
          <div class="space-y-1">
            <div class="text-3xl font-bold text-white mb-1">
              {{ stats.credits }}
            </div>
            <div class="text-slate-300/80 text-xs font-medium tracking-widest">
              Nexus Credits
            </div>
          </div>

          <!-- Credit Value Hint -->
          <div class="mt-2 text-xs text-slate-400/70">
            ≈ {{ (stats.credits * 0.01).toFixed(2) }}€ Wert
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid - Reorganized layout -->
    <div class="space-y-8">
      <!-- First Row: Recently Played Games and Hot Deals side by side -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recently Played Games - Takes 2/3 of the width -->
        <div
          class="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-purple-400/50 transition-all duration-500">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon
                name="heroicons:play-20-solid"
                class="w-6 h-6 text-purple-400 mr-2" />
              Zuletzt gespielt
            </h2>
            <NuxtLink
              to="/my-games"
              class="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
              Alle anzeigen →
            </NuxtLink>
          </div>

          <div class="grid grid-cols-4 md:grid-cols-4 gap-4">
            <div
              v-for="game in recentGames"
              :key="game.id"
              class="group relative bg-gray-900/50 rounded-lg overflow-hidden border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <!-- Game Cover -->
              <div class="aspect-[3/4] relative overflow-hidden">
                <img
                  :src="game.coverUrl"
                  :alt="game.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <!-- Progress Bar -->
                <div class="absolute bottom-0 left-0 right-0 p-2">
                  <div class="bg-gray-900/70 rounded-full h-1.5 mb-1">
                    <div
                      class="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                      :style="`width: ${game.progress}%`"></div>
                  </div>
                  <div class="text-xs text-white font-medium">
                    {{ game.progress }}%
                  </div>
                </div>
              </div>

              <!-- Game Info -->
              <div class="p-3">
                <h3 class="font-medium text-white text-sm mb-1 truncate">
                  {{ game.title }}
                </h3>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-400">{{ game.platform }}</span>
                  <span class="text-purple-300">{{ game.lastPlayed }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Hot Deals - Takes 1/3 of the width -->
        <div
          class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 flex-1 flex flex-col hover:border-red-400/50 transition-all duration-500">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon
                name="heroicons:fire-20-solid"
                class="w-6 h-6 text-red-400 mr-2" />
              Heiße Deals
            </h2>
            <NuxtLink
              to="/deals"
              class="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
              Alle Deals →
            </NuxtLink>
          </div>

          <div class="space-y-4 flex-1 overflow-y-auto custom-scrollbar">
            <div
              v-for="deal in featuredDeals"
              :key="deal.id"
              class="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg border border-gray-600/30 hover:border-red-500/30 transition-all duration-300 group">
              <div
                class="w-12 h-16 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                <img
                  :src="deal.coverUrl"
                  :alt="deal.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              </div>

              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-white text-sm mb-1 truncate">
                  {{ deal.title }}
                </h3>
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-lg font-bold text-green-400"
                    >{{ deal.discountPrice.toFixed(2) }}€</span
                  >
                  <span class="text-sm text-gray-400 line-through"
                    >{{ deal.originalPrice.toFixed(2) }}€</span
                  >
                  <span
                    class="text-xs bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded"
                    >-{{ deal.discount }}%</span
                  >
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-400">{{ deal.platform }}</span>
                  <span class="text-xs text-orange-300">{{ deal.endsIn }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Second Row: Gaming Activity and New Achievements side by side -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Weekly Activity Chart - Takes 2/3 of the width -->
        <div
          class="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 flex-1 flex flex-col hover:border-blue-400/50 transition-all duration-500">
          <h2 class="text-xl font-bold text-white mb-6 flex items-center">
            <Icon
              name="heroicons:chart-bar-20-solid"
              class="w-6 h-6 text-blue-400 mr-2" />
            Gaming-Aktivität diese Woche
          </h2>

          <!-- Chart -->
          <div
            class="flex items-end justify-between space-x-3 flex-1 mb-6 min-h-[200px]">
            <div
              v-for="day in weeklyActivity"
              :key="day.day"
              class="flex-1 flex flex-col items-center group cursor-pointer h-full">
              <div class="relative flex-1 flex items-end w-full">
                <div
                  class="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-lg transition-all duration-500 hover:from-purple-500 hover:to-blue-400 group-hover:scale-105 relative min-h-[20px]"
                  :style="`height: ${Math.max((day.hours / 6) * 100, 15)}%`">
                  <!-- Glow effect -->
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-purple-400/50 to-blue-400/50 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </div>
              </div>
              <div class="text-xs text-gray-400 mt-2 font-medium">
                {{ day.day }}
              </div>
              <div class="text-xs text-white font-bold">{{ day.hours }}h</div>
            </div>
          </div>

          <!-- Stats Summary -->
          <div class="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700/30">
            <div class="text-center">
              <div class="text-lg font-bold text-blue-400">
                {{
                  weeklyActivity
                    .reduce((sum, day) => sum + day.hours, 0)
                    .toFixed(1)
                }}h
              </div>
              <div class="text-xs text-gray-400">Diese Woche</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold text-purple-400">
                {{ Math.max(...weeklyActivity.map(d => d.hours)).toFixed(1) }}h
              </div>
              <div class="text-xs text-gray-400">Bester Tag</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold text-green-400">
                {{
                  (
                    weeklyActivity.reduce((sum, day) => sum + day.hours, 0) / 7
                  ).toFixed(1)
                }}h
              </div>
              <div class="text-xs text-gray-400">Ø pro Tag</div>
            </div>
          </div>
        </div>
        <!-- Recent Achievements - Takes 1/3 of the width -->
        <div
          class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 flex-1 flex flex-col hover:border-yellow-400/50 transition-all duration-500">
          <h2 class="text-xl font-bold text-white mb-6 flex items-center">
            <Icon
              name="heroicons:star-20-solid"
              class="w-6 h-6 text-yellow-400 mr-2" />
            Neue Errungenschaften
          </h2>

          <div class="space-y-4 flex-1 overflow-y-auto custom-scrollbar">
            <div
              v-for="achievement in recentAchievements"
              :key="achievement.id"
              class="flex items-start space-x-3 p-3 bg-gray-900/50 rounded-lg border border-gray-600/30 hover:border-yellow-500/30 transition-all duration-300">
              <div class="text-2xl">{{ achievement.icon }}</div>

              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-white text-sm mb-1">
                  {{ achievement.title }}
                </h3>
                <p class="text-xs text-gray-400 mb-1">
                  {{ achievement.description }}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-blue-300">{{
                    achievement.game
                  }}</span>
                  <span
                    class="text-xs px-2 py-1 rounded-full"
                    :class="{
                      'bg-yellow-500/20 text-yellow-300':
                        achievement.rarity === 'Legendär',
                      'bg-purple-500/20 text-purple-300':
                        achievement.rarity === 'Episch',
                      'bg-blue-500/20 text-blue-300':
                        achievement.rarity === 'Selten'
                    }">
                    {{ achievement.rarity }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Animations */
  @keyframes pulse-slow {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.8;
    }
  }

  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-reverse {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  .animate-pulse-slow {
    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }

  .animate-spin-reverse {
    animation: spin-reverse 6s linear infinite;
  }

  /* Custom scrollbar for any overflow content */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(147, 51, 234, 0.5) rgba(75, 85, 99, 0.1);
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(75, 85, 99, 0.1);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(
      to bottom,
      rgba(147, 51, 234, 0.6),
      rgba(59, 130, 246, 0.6)
    );
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(
      to bottom,
      rgba(147, 51, 234, 0.9),
      rgba(59, 130, 246, 0.9)
    );
  }
</style>
