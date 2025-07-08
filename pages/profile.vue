<script setup lang="ts">
  const userStore = useUserStore();
  const loadingStore = useLoadingStore();
  const supabaseUser = useSupabaseUser();

  // Initialize user data
  onMounted(async () => {
    await userStore.init();
  });

  // User data access
  const user = computed(() => userStore.user);

  // User display information
  const userDisplayName = computed(
    () =>
      supabaseUser.value?.user_metadata?.display_name ||
      supabaseUser.value?.email?.split('@')[0] ||
      'Anonymous'
  );
  const userFullName = computed(
    () => supabaseUser.value?.user_metadata?.full_name
  );
  const userAvatarUrl = computed(
    () => supabaseUser.value?.user_metadata?.avatar_url
  );

  // Gaming stats
  const userLevel = computed(() => user.value?.level || 1);
  const userXP = computed(() => user.value?.xp || 0);
  const userCredits = computed(() => user.value?.credits || 0);

  // Collections
  const totalGames = computed(() => user.value?.userGames?.length || 0);
  const totalAchievements = computed(
    () => user.value?.userAchievements?.length || 0
  );
  const wishlistCount = computed(() => user.value?.wishlistItems?.length || 0);

  // Calculate progress to next level (assuming 1000 XP per level for now)
  const xpForNextLevel = computed(() => userLevel.value * 1000);
  const xpProgress = computed(() => (userXP.value % 1000) / 10); // Percentage for progress bar
  const xpNeeded = computed(() => xpForNextLevel.value - userXP.value);

  // Enhanced gamification calculations
  const currentLevelXp = computed(() => userXP.value % 1000);
  const xpProgressPercent = computed(() => (currentLevelXp.value / 1000) * 100);

  // Player rank based on level
  const playerRank = computed(() => {
    const level = userLevel.value;
    if (level >= 50)
      return {
        name: 'Legendary',
        color: 'from-yellow-400 to-orange-500',
        icon: '👑'
      };
    if (level >= 40)
      return {
        name: 'Master',
        color: 'from-purple-400 to-pink-500',
        icon: '💎'
      };
    if (level >= 30)
      return { name: 'Expert', color: 'from-blue-400 to-cyan-500', icon: '⭐' };
    if (level >= 20)
      return {
        name: 'Advanced',
        color: 'from-green-400 to-emerald-500',
        icon: '🚀'
      };
    if (level >= 10)
      return {
        name: 'Experienced',
        color: 'from-indigo-400 to-purple-500',
        icon: '🎯'
      };
    return { name: 'Rookie', color: 'from-gray-400 to-gray-500', icon: '🎮' };
  });

  // Recent achievements (last 5)
  const recentAchievements = computed(() => {
    return user.value?.userAchievements?.slice(-5).reverse() || [];
  });

  // Account creation date for "Member since"
  const memberSince = computed(() => {
    if (supabaseUser.value?.created_at) {
      return new Date(supabaseUser.value.created_at).toLocaleDateString(
        'de-DE',
        {
          year: 'numeric',
          month: 'long'
        }
      );
    }
    return 'Unbekannt';
  });

  // Calculate total playtime (mock data for now)
  const totalPlaytimeMinutes = computed(() => {
    // Mock calculation - in real app this would come from game platforms
    return totalGames.value * 120; // Average 2 hours per game
  });

  const totalPlaytimeHours = computed(() => {
    const hours = Math.floor(totalPlaytimeMinutes.value / 60);
    return hours.toLocaleString();
  });

  definePageMeta({
    layout: 'authenticated'
  });
</script>

<template>
  <!-- Main Container with proper padding -->
  <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-4">
    <!-- Profile Content -->
    <div class="my-8">
      <!-- Player Card -->
      <div
        class="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-gray-700/30">
        <!-- Enhanced Header with improved contrast and avatar -->
        <div
          class="relative bg-gradient-to-r from-gray-900/90 via-purple-900/70 to-blue-900/70 p-6 sm:p-8 border-b border-gray-600/50">
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20"></div>
            <div
              class="absolute inset-0"
              style="
                background-image: radial-gradient(
                  circle at 2px 2px,
                  rgba(255, 255, 255, 0.15) 1px,
                  transparent 0
                );
                background-size: 20px 20px;
              "></div>
          </div>

          <div class="relative z-10">
            <div
              class="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8">
              <!-- Enhanced Avatar Section -->
              <div class="flex-shrink-0">
                <div class="relative group">
                  <div
                    class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl border-2 border-white/20 backdrop-blur-sm transform group-hover:scale-105 transition-all duration-300">
                    <span
                      class="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                      {{
                        (userFullName || userDisplayName || 'AG')
                          .substring(0, 2)
                          .toUpperCase()
                      }}
                    </span>
                  </div>
                  <!-- Glow Effect -->
                  <div
                    class="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-400 opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300"></div>
                  <!-- Level Badge on Avatar -->
                  <div
                    class="absolute -bottom-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border-2 border-white/20 transform hover:scale-110 transition-transform duration-200">
                    LVL {{ userLevel }}
                  </div>
                </div>
              </div>

              <!-- Enhanced Player Info with better visibility -->
              <div class="flex-1 text-center sm:text-left">
                <!-- Title with enhanced styling -->
                <div class="mb-4">
                  <h2
                    class="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-2xl">
                    <span
                      class="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
                      {{ userFullName || userDisplayName || 'Anonymous Gamer' }}
                    </span>
                  </h2>
                </div>

                <!-- Enhanced Meta Information -->
                <div
                  class="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-6">
                  <div
                    class="flex items-center bg-purple-900/50 px-4 py-2 rounded-xl border border-purple-500/30 backdrop-blur-sm">
                    <svg
                      class="w-5 h-5 mr-2 text-purple-300"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-white font-medium"
                      >Level {{ userLevel }}</span
                    >
                  </div>
                  <div
                    class="flex items-center bg-blue-900/50 px-4 py-2 rounded-xl border border-blue-500/30 backdrop-blur-sm">
                    <svg
                      class="w-5 h-5 mr-2 text-blue-300"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd" />
                    </svg>
                    <span class="text-white font-medium"
                      >Seit {{ memberSince }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Enhanced Level & XP Display -->
        <div class="p-6 sm:p-8 space-y-8">
          <!-- Player Rank Badge -->
          <div class="flex justify-center mb-8">
            <div class="relative">
              <div
                class="px-6 py-3 rounded-2xl bg-gradient-to-r text-white font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/30 backdrop-blur-sm"
                :class="playerRank.color">
                <div class="flex items-center space-x-3">
                  <span class="text-2xl drop-shadow-lg">{{
                    playerRank.icon
                  }}</span>
                  <span class="text-shadow-lg">{{ playerRank.name }}</span>
                  <span class="text-2xl drop-shadow-lg">{{
                    playerRank.icon
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Level Circle Display -->
          <div class="flex justify-center mb-8">
            <div class="relative w-40 h-40">
              <!-- Outer Ring Background -->
              <div
                class="absolute inset-0 rounded-full border-8 border-gray-700/50"></div>

              <!-- Animated Progress Ring -->
              <svg
                class="absolute inset-0 w-full h-full transform -rotate-90"
                viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="8"
                  class="text-gray-700/50"
                  stroke-linecap="round" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="url(#levelGradient)"
                  stroke-width="8"
                  stroke-linecap="round"
                  stroke-dasharray="440"
                  :stroke-dashoffset="440 - (440 * xpProgressPercent) / 100"
                  class="transition-all duration-2000 ease-out drop-shadow-lg" />

                <!-- Gradient Definition -->
                <defs>
                  <linearGradient
                    id="levelGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%">
                    <stop
                      offset="0%"
                      style="stop-color: #8b5cf6; stop-opacity: 1" />
                    <stop
                      offset="50%"
                      style="stop-color: #3b82f6; stop-opacity: 1" />
                    <stop
                      offset="100%"
                      style="stop-color: #10b981; stop-opacity: 1" />
                  </linearGradient>
                </defs>
              </svg>

              <!-- Level Number in Center -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-4xl font-bold text-white mb-1">
                    {{ userLevel }}
                  </div>
                  <div
                    class="text-xs text-gray-400 font-medium tracking-wider uppercase">
                    Level
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- XP Information Panel -->
          <div
            class="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
            <div class="flex justify-between items-center mb-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-400">
                  {{ currentLevelXp.toLocaleString() }}
                </div>
                <div class="text-xs text-gray-400">Aktuell</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-400">
                  {{ (1000 - currentLevelXp).toLocaleString() }}
                </div>
                <div class="text-xs text-gray-400">
                  Bis Level {{ userLevel + 1 }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-400">
                  {{ userXP.toLocaleString() }}
                </div>
                <div class="text-xs text-gray-400">Gesamt XP</div>
              </div>
            </div>
            <!-- Modern Progress Bar -->
            <div class="relative">
              <div
                class="w-full bg-gray-700/50 rounded-full h-6 overflow-hidden shadow-inner relative">
                <div
                  class="h-6 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full transition-all duration-2000 ease-out relative overflow-hidden shadow-glow"
                  :style="{ width: `${xpProgressPercent}%` }">
                  <!-- Animated Shine Effect -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  <!-- Pulse Effect -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-purple-400/50 via-blue-400/50 to-green-400/50 animate-pulse-slow"></div>
                </div>

                <!-- Progress Percentage - Centered in Bar -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <span
                    class="text-xs font-bold text-white drop-shadow-lg z-10">
                    {{ Math.round(xpProgressPercent) }}%
                  </span>
                </div>
              </div>
            </div>
            <!-- Achievement Milestones -->
            <div class="mt-4 flex justify-between text-xs text-gray-500">
              <span>🎯 Next Achievement</span>
              <span>🏆 Level {{ userLevel + 1 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Stats Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 my-8">
      <!-- Level Card -->
      <div
        class="stat-card bg-gradient-to-br from-purple-900/50 to-purple-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 shadow-xl">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl sm:text-3xl font-bold text-purple-400">
              {{ userLevel }}
            </div>
            <div class="text-sm text-gray-300">Player Level</div>
          </div>
          <div class="text-purple-400">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- XP Card -->
      <div
        class="stat-card bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/30 shadow-xl">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl sm:text-3xl font-bold text-blue-400">
              {{ userXP.toLocaleString() }}
            </div>
            <div class="text-sm text-gray-300">Erfahrungspunkte</div>
          </div>
          <div class="text-blue-400">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Credits Card -->
      <div
        class="stat-card bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/30 shadow-xl">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl sm:text-3xl font-bold text-yellow-400">
              {{ userCredits.toLocaleString() }}
            </div>
            <div class="text-sm text-gray-300">Credits</div>
          </div>
          <div class="text-yellow-400">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Playtime Card -->
      <div
        class="stat-card bg-gradient-to-br from-green-900/50 to-green-800/50 backdrop-blur-sm p-6 rounded-xl border border-green-500/30 shadow-xl">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl sm:text-3xl font-bold text-green-400">
              {{ totalPlaytimeHours }}
            </div>
            <div class="text-sm text-gray-300">Stunden gespielt</div>
          </div>
          <div class="text-green-400">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- Collection Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 my-8">
      <!-- Games Collection -->
      <div
        class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-white">Spielebibliothek</h3>
          <svg
            class="w-6 h-6 text-purple-400"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd" />
          </svg>
        </div>
        <div class="text-3xl font-bold text-purple-400 mb-2">
          {{ totalGames }}
        </div>
        <p class="text-gray-400 text-sm mb-4">Spiele in der Sammlung</p>
        <NuxtLink
          to="/my-games"
          class="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium">
          Bibliothek anzeigen
          <svg
            class="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Achievements -->
      <div
        class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-white">Erfolge</h3>
          <svg
            class="w-6 h-6 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div class="text-3xl font-bold text-yellow-400 mb-2">
          {{ totalAchievements }}
        </div>
        <p class="text-gray-400 text-sm mb-4">
          Errungenschaften freigeschaltet
        </p>
        <button
          class="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium">
          Alle anzeigen
          <svg
            class="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Wishlist -->
      <div
        class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-white">Wunschliste</h3>
          <svg
            class="w-6 h-6 text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd" />
          </svg>
        </div>
        <div class="text-3xl font-bold text-red-400 mb-2">
          {{ wishlistCount }}
        </div>
        <p class="text-gray-400 text-sm mb-4">Spiele auf der Wunschliste</p>
        <NuxtLink
          to="/wishlist"
          class="inline-flex items-center text-red-400 hover:text-red-300 transition-colors text-sm font-medium">
          Wunschliste anzeigen
          <svg
            class="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <!-- Recent Achievements -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl">
      <h3 class="text-xl font-semibold text-white mb-6 flex items-center">
        <svg
          class="w-6 h-6 mr-2 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Neueste Erfolge
      </h3>

      <div v-if="recentAchievements.length === 0" class="text-center py-12">
        <svg
          class="w-16 h-16 mx-auto text-gray-600 mb-4"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <h4 class="text-lg font-medium text-gray-300 mb-2">
          Noch keine Erfolge
        </h4>
        <p class="text-gray-500">
          Fange an zu spielen, um deinen ersten Erfolg freizuschalten!
        </p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="achievement in recentAchievements"
          :key="achievement.achievement.id"
          class="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:bg-gray-700/40 transition-colors">
          <div class="flex-shrink-0">
            <div
              class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <div class="flex-1">
            <h4 class="text-white font-medium">Erfolg freigeschaltet!</h4>
            <p class="text-gray-400 text-sm">
              Freigeschaltet am
              {{ new Date(achievement.unlockedAt).toLocaleDateString('de-DE') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <LoadingOverlay />
  </div>
</template>

<style scoped>
  .animate-pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }

  .shadow-glow {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4),
      0 0 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(16, 185, 129, 0.2);
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  @keyframes glow {
    0%,
    100% {
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.4),
        0 0 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(16, 185, 129, 0.2);
    }
    50% {
      box-shadow: 0 0 30px rgba(168, 85, 247, 0.6),
        0 0 60px rgba(59, 130, 246, 0.5), 0 0 90px rgba(16, 185, 129, 0.4);
    }
  }

  /* Sicherstellen, dass Container nicht überlappen */
  .container {
    isolation: isolate;
  }

  /* Erweiterte Hover-Effekte für Stat Cards */
  .stat-card {
    transition: all 0.3s ease;
  }
  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  /* Strong text shadow for better contrast */
  .text-shadow-strong {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6),
      0 0 16px rgba(0, 0, 0, 0.4);
  }

  /* Floating Animation für XP Particles */
  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) scale(1);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-10px) scale(1.1);
      opacity: 1;
    }
  }

  .particle {
    animation: float 3s ease-in-out infinite;
  }
</style>
