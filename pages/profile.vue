<script setup lang="ts">
  const accountStore = useAccountStore();

  const fullUser = computed(() => accountStore.fullUser);
  const user = computed(() => fullUser.value?.dbUser);
  const account = computed(() => fullUser.value?.account);

  // Profile information
  const userDisplayName = computed(() => user.value?.display_name);
  const userAvatarUrl = computed(
    () => account.value?.user_metadata?.avatar_url
  );
  const userFullName = computed(() => account.value?.user_metadata?.full_name);

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

  // Recent achievements (last 5)
  const recentAchievements = computed(() => {
    if (!user.value?.userAchievements) return [];
    return user.value.userAchievements
      .sort(
        (a, b) =>
          new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime()
      )
      .slice(0, 5);
  });

  // Account creation date for "Member since"
  const memberSince = computed(() => {
    if (!account.value?.created_at) return 'Unknown';
    return new Date(account.value.created_at).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long'
    });
  });

  // Calculate total playtime (mock data for now)
  const totalPlaytimeMinutes = computed(() => {
    if (!user.value?.userGames) return 0;
    return user.value.userGames.reduce(
      (total, game) => total + (game.playtimeMinutes || 0),
      0
    );
  });

  const totalPlaytimeHours = computed(() =>
    Math.floor(totalPlaytimeMinutes.value / 60)
  );

  definePageMeta({
    middleware: ['auth'],
    layout: 'authenticated'
  });
</script>

<template>
  <div
    class="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen">
    <div class="mx-auto">
      <!-- Header with Gaming Style -->
      <div
        class="mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-800/20 via-blue-800/20 to-indigo-800/20 backdrop-blur-sm border border-purple-500/20">
        <div
          class="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div class="relative p-8">
          <h1
            class="text-4xl font-bold text-white mb-2 tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Gaming Profile
          </h1>
          <p class="text-gray-300">
            Your gaming journey, achievements, and collection
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="accountStore.loadingUser"
        class="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-xl p-6 border border-gray-700/50">
        <div class="animate-pulse flex space-x-4">
          <div
            class="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 h-16 w-16 opacity-50"></div>
          <div class="flex-1 space-y-3 py-1">
            <div
              class="h-6 bg-gradient-to-r from-gray-600 to-gray-700 rounded"></div>
            <div class="space-y-2">
              <div
                class="h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded"></div>
              <div
                class="h-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <p class="text-center text-gray-400 mt-6">Loading gaming profile...</p>
      </div>

      <!-- Profile Content -->
      <div v-else class="space-y-8">
        <!-- Player Card -->
        <div
          class="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-gray-700/50">
          <div
            class="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 p-8">
            <div class="flex items-center space-x-6">
              <!-- Avatar with Gaming Border -->
              <div class="relative">
                <div
                  class="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 animate-pulse-slow">
                  <div class="bg-gray-900 rounded-full p-1">
                    <img
                      v-if="userAvatarUrl"
                      :src="userAvatarUrl"
                      :alt="userDisplayName || 'User Avatar'"
                      class="h-20 w-20 rounded-full object-cover" />
                    <div
                      v-else
                      class="h-20 w-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                      <svg
                        class="h-10 w-10 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Player Info -->
              <div class="flex-1">
                <h2 class="text-3xl font-bold text-white mb-2">
                  {{ userFullName || userDisplayName || 'Anonymous Gamer' }}
                </h2>
                <div class="flex items-center space-x-4 text-gray-300">
                  <span class="flex items-center">
                    <svg
                      class="w-5 h-5 mr-2 text-purple-400"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Level {{ userLevel }}
                  </span>
                  <span>•</span>
                  <span>Member since {{ memberSince }}</span>
                </div>
              </div>
            </div>

            <!-- Level Progress Bar -->
            <div class="mt-6">
              <div class="flex justify-between text-sm text-gray-300 mb-2">
                <span>Level {{ userLevel }}</span>
                <span>{{ userXP.toLocaleString() }} XP</span>
                <span>Level {{ userLevel + 1 }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  :style="{ width: `${xpProgress}%` }">
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <p class="text-xs text-gray-400 mt-2 text-center">
                {{ xpNeeded.toLocaleString() }} XP needed for next level
              </p>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Level Card -->
          <div
            class="bg-gradient-to-br from-purple-900/50 to-purple-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-3xl font-bold text-purple-400">
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
            class="bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/30 shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-3xl font-bold text-blue-400">
                  {{ userXP.toLocaleString() }}
                </div>
                <div class="text-sm text-gray-300">Experience Points</div>
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
            class="bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/30 shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-3xl font-bold text-yellow-400">
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
            class="bg-gradient-to-br from-green-900/50 to-green-800/50 backdrop-blur-sm p-6 rounded-xl border border-green-500/30 shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-3xl font-bold text-green-400">
                  {{ totalPlaytimeHours }}
                </div>
                <div class="text-sm text-gray-300">Hours Played</div>
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
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Games Collection -->
          <div
            class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-white">Game Library</h3>
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
            <p class="text-gray-400 text-sm">Games in collection</p>
            <NuxtLink
              to="/my-games"
              class="mt-4 inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
              View Library
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
              <h3 class="text-xl font-semibold text-white">Achievements</h3>
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
            <p class="text-gray-400 text-sm">Achievements unlocked</p>
            <button
              class="mt-4 inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
              View All
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
              <h3 class="text-xl font-semibold text-white">Wishlist</h3>
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
            <p class="text-gray-400 text-sm">Games on wishlist</p>
            <NuxtLink
              to="/wishlist"
              class="mt-4 inline-flex items-center text-red-400 hover:text-red-300 transition-colors">
              View Wishlist
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
            Recent Achievements
          </h3>

          <div v-if="recentAchievements.length === 0" class="text-center py-8">
            <svg
              class="w-16 h-16 mx-auto text-gray-600 mb-4"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h4 class="text-lg font-medium text-gray-300 mb-2">
              No Achievements Yet
            </h4>
            <p class="text-gray-500">
              Start gaming to unlock your first achievement!
            </p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="achievement in recentAchievements"
              :key="achievement.id"
              class="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
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
                <h4 class="text-white font-medium">Achievement Unlocked!</h4>
                <p class="text-gray-400 text-sm">
                  Unlocked
                  {{
                    new Date(achievement.unlockedAt).toLocaleDateString('de-DE')
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .animate-pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
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
</style>
