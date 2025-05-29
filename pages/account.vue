<script setup lang="ts">
  const accountStore = useAccountStore();

  const fullUser = computed(() => accountStore.fullUser);
  const user = computed(() => fullUser.value?.dbUser);
  const account = computed(() => fullUser.value?.account);

  // Profile information for quick overview
  const userDisplayName = computed(() => user.value?.display_name);
  const userAvatarUrl = computed(
    () => account.value?.user_metadata?.avatar_url
  );
  const userFullName = computed(() => account.value?.user_metadata?.full_name);

  // Gaming stats for quick overview
  const userLevel = computed(() => user.value?.level || 1);
  const userXP = computed(() => user.value?.xp || 0);
  const userCredits = computed(() => user.value?.credits || 0);

  definePageMeta({
    middleware: ['auth'],
    layout: 'authenticated'
  });
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1
          class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
          Account Overview
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Manage your gaming profile and account settings.
        </p>
      </div>

      <!-- Loading State -->
      <div
        v-if="accountStore.loadingUser"
        class="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
        <div class="animate-pulse flex space-x-4">
          <div
            class="rounded-full bg-gray-300 dark:bg-gray-600 h-12 w-12"></div>
          <div class="flex-1 space-y-2 py-1">
            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <p class="text-center text-gray-500 dark:text-gray-400 mt-4">
          Loading account information...
        </p>
      </div>

      <!-- Account Overview Content -->
      <div v-else class="space-y-6">
        <!-- Quick Profile Overview -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <div class="flex items-center space-x-4 mb-6">
              <div class="flex-shrink-0">
                <img
                  v-if="userAvatarUrl"
                  :src="userAvatarUrl"
                  :alt="userDisplayName || 'User Avatar'"
                  class="h-16 w-16 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                <div
                  v-else
                  class="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <svg
                    class="h-8 w-8 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h2
                  class="text-2xl font-medium text-gray-900 dark:text-gray-100">
                  {{ userFullName || userDisplayName || 'Gamer' }}
                </h2>
                <p class="text-gray-500 dark:text-gray-400">
                  Level {{ userLevel }} • {{ userXP.toLocaleString() }} XP •
                  {{ userCredits.toLocaleString() }} Credits
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Gaming Profile Card -->
          <div
            class="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 shadow-xl rounded-lg overflow-hidden border border-purple-200 dark:border-purple-700/50">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h3
                  class="text-xl font-semibold text-purple-900 dark:text-purple-100">
                  Gaming Profile
                </h3>
                <svg
                  class="w-8 h-8 text-purple-600 dark:text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p class="text-purple-700 dark:text-purple-300 mb-4">
                View your gaming stats, achievements, collection, and level
                progress in a beautiful gaming-themed interface.
              </p>
              <NuxtLink
                to="/profile"
                class="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200">
                View Gaming Profile
                <svg
                  class="w-4 h-4 ml-2"
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

          <!-- Account Settings Card -->
          <div
            class="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700/50">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h3
                  class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Account Settings
                </h3>
                <svg
                  class="w-8 h-8 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                Manage your personal information, security settings,
                preferences, and connected platforms.
              </p>
              <NuxtLink
                to="/settings"
                class="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200">
                Manage Settings
                <svg
                  class="w-4 h-4 ml-2"
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
        </div>

        <!-- Quick Stats Overview -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h3
              class="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
              Quick Stats
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div
                class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div
                  class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {{ userLevel }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Level
                </div>
              </div>
              <div
                class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div
                  class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {{ userXP.toLocaleString() }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Experience
                </div>
              </div>
              <div
                class="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div
                  class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {{ userCredits.toLocaleString() }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Credits
                </div>
              </div>
              <div
                class="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div
                  class="text-2xl font-bold text-green-600 dark:text-green-400">
                  {{ user?.userGames?.length || 0 }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Games
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h3
              class="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
              Quick Links
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <NuxtLink
                to="/my-games"
                class="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg
                  class="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">My Games</span>
              </NuxtLink>
              <NuxtLink
                to="/wishlist"
                class="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg
                  class="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Wishlist</span>
              </NuxtLink>
              <NuxtLink
                to="/deals"
                class="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg
                  class="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Deals</span>
              </NuxtLink>
              <NuxtLink
                to="/dashboard"
                class="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <svg
                  class="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Dashboard</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Page-specific styles can be added here if Tailwind utilities are not sufficient */
</style>
