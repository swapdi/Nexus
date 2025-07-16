<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
    title: 'Dashboard - Gaming Nexus',
    layout: 'authenticated'
  });
  const { $client } = useNuxtApp();
  const userStore = useUserStore();
  const user = computed(() => userStore.user);
  const { data: stats } = await useAsyncData('dashboard-stats', () =>
    $client.user.getStats.query()
  );
  const { data: recentGames } = await useAsyncData(
    'dashboard-recent-games',
    () =>
      $client.games.getUserGames.query({
        limit: 4,
        sortBy: 'lastPlayed'
      })
  );
  const { data: featuredDeals } = await useAsyncData(
    'dashboard-featured-deals',
    () => $client.deals.searchDeals.query({ limit: 3, isActive: true })
  );
  const { data: gameActivity } = await useAsyncData(
    'dashboard-game-activity',
    () => $client.games.getGameActivity.query()
  );
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
            </div>
            <div class="text-3xl font-bold text-white mb-1">
              {{ stats?.totalGames || 0 }}
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
            </div>
            <div class="text-3xl font-bold text-white mb-1">
              {{ Math.round(stats?.totalPlaytime / 60) || 0 }}
            </div>
            <div class="text-sm text-gray-400">Gespielte Stunden</div>
          </div>
        </div>
        <div
          class="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-6 border border-green-500/20 relative overflow-hidden group hover:border-green-400/50 transition-all duration-500">
          <div
            class="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-2">
              <Icon
                name="heroicons:heart-20-solid"
                class="w-8 h-8 text-green-400" />
            </div>
            <div class="text-3xl font-bold text-white mb-1">
              {{ stats?.favoriteGames || 0 }}
            </div>
            <div class="text-sm text-gray-400">Favoriten</div>
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
              {{ user?.credits || 0 }}
            </div>
            <div class="text-slate-300/80 text-xs font-medium tracking-widest">
              Nexus Credits
            </div>
          </div>
          <!-- Credit Value Hint -->
          <div class="mt-2 text-xs text-slate-400/70">
            ≈ {{ ((user?.credits || 0) * 0.01).toFixed(2) }}€ Wert
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
                  :src="game.game.coverUrl"
                  :alt="game.game.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <!-- Game Info -->
              <div class="p-3">
                <h3 class="font-medium text-white text-sm mb-1 truncate">
                  {{ game.game.name }}
                </h3>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-purple-300">{{
                    useTimeAgo(game.lastPlayed).value
                  }}</span>
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
                  :src="deal.game.coverUrl"
                  :alt="deal.game.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-white text-sm mb-1 truncate">
                  {{ deal.game.name }}
                </h3>
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-lg font-bold text-green-400"
                    >{{ deal.price?.toFixed(2) }}€</span
                  >
                  <span class="text-sm text-gray-400 line-through"
                    >{{ deal.originalPrice?.toFixed(2) }}€</span
                  >
                  <span
                    class="text-xs bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded"
                    >-{{ deal.discountPercent?.toFixed(0) }}%</span
                  >
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-400">{{
                    deal.storeName
                  }}</span>
                  <span class="text-xs text-orange-300">{{
                    useTimeAgo(deal.validUntil).value
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Second Row: Gaming Activity -->
      <div class="grid grid-cols-1">
        <div
          class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-blue-400/50 transition-all duration-500">
          <h2 class="text-xl font-bold text-white mb-6 flex items-center">
            <Icon
              name="heroicons:chart-bar-20-solid"
              class="w-6 h-6 text-blue-400 mr-2" />
            Gaming-Aktivität diese Woche
          </h2>
          <div
            class="flex items-end justify-between space-x-3 flex-1 mb-6 min-h-[200px]">
            <div
              v-for="(hours, index) in gameActivity"
              :key="index"
              class="flex-1 flex flex-col items-center group cursor-pointer h-full">
              <div class="relative flex-1 flex items-end w-full">
                <div
                  class="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-lg transition-all duration-500 hover:from-purple-500 hover:to-blue-400 group-hover:scale-105 relative min-h-[20px]"
                  :style="`height: ${Math.max(
                    (hours / (Math.max(...gameActivity) || 1)) * 100,
                    5
                  )}%`">
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-purple-400/50 to-blue-400/50 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </div>
              </div>
              <div class="text-xs text-gray-400 mt-2 font-medium">
                {{
                  new Date(
                    new Date().setDate(new Date().getDate() - 6 + index)
                  ).toLocaleDateString('de-DE', { weekday: 'short' })
                }}
              </div>
              <div class="text-xs text-white font-bold">{{ hours }}h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Loading Overlay -->
  <LoadingOverlay />
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
