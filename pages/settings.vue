<script setup lang="ts">
  const accountStore = useAccountStore();
  const notifyStore = useNotifyStore();
  const loadingStore = useLoadingStore();
  const editableDisplayName = ref('');
  const isLoadingNameChange = ref(false);

  const fullUser = computed(() => accountStore.fullUser);
  const user = computed(() => fullUser.value?.dbUser);
  const account = computed(() => fullUser.value?.account);

  // Profile information
  const userEmail = computed(() => account.value?.email);
  const userDisplayName = computed(() => user.value?.display_name);
  const userAvatarUrl = computed(
    () => account.value?.user_metadata?.avatar_url
  );
  const userFullName = computed(() => account.value?.user_metadata?.full_name);

  // Account metadata
  const accountCreatedAt = computed(() => {
    if (!account.value?.created_at) return 'N/A';
    return new Date(account.value.created_at).toLocaleDateString('de-DE');
  });
  const lastSignInAt = computed(() => {
    if (!account.value?.last_sign_in_at) return 'N/A';
    return new Date(account.value.last_sign_in_at).toLocaleDateString('de-DE');
  });
  const authProvider = computed(
    () => account.value?.app_metadata?.provider || 'N/A'
  );

  // Initialize display name with current value when user data loads
  watch(
    userDisplayName,
    newName => {
      if (newName && !editableDisplayName.value) {
        editableDisplayName.value = newName;
      }
    },
    { immediate: true }
  );

  definePageMeta({
    middleware: ['auth'],
    layout: 'authenticated'
  });

  async function handleChangeDisplayName() {
    if (!editableDisplayName.value.trim()) {
      notifyStore.notify(
        'Display name cannot be empty.',
        NotificationType.Error
      );
      return;
    }
    if (!user.value) {
      notifyStore.notify('User data not available.', NotificationType.Error);
      return;
    }
    if (editableDisplayName.value.trim() === user.value.display_name) {
      notifyStore.notify(
        'Display name is already set to this value.',
        NotificationType.Info
      );
      return;
    }

    isLoadingNameChange.value = true;
    try {
      // TODO: Implement updateUser method in account store
      // await accountStore.updateUser({ display_name: editableDisplayName.value.trim() });
      notifyStore.notify(
        'Display name updated successfully!',
        NotificationType.Success
      );
    } catch (error: any) {
      console.error('Failed to change display name:', error);
      notifyStore.notify(
        error.message || 'Failed to update display name.',
        NotificationType.Error
      );
    } finally {
      isLoadingNameChange.value = false;
    }
  }
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div class="mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1
          class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
          Account Settings
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Manage your account details, preferences, and security settings.
        </p>
      </div>
      <!-- Loading State -->
      <div
        v-if="loadingStore.hasOperations"
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
          Loading account details...
        </p>
      </div>

      <!-- Settings Content -->
      <div v-else class="space-y-6">
        <!-- Profile Settings Card -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h2
              class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
              Profile Settings
            </h2>

            <!-- Avatar and Basic Info -->
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
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {{ userFullName || userDisplayName || 'N/A' }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Authenticated via {{ authProvider }}
                </p>
                <button
                  class="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">
                  Change Avatar
                </button>
              </div>
            </div>

            <div class="space-y-6">
              <!-- Email (Read-only) -->
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div class="relative">
                  <input
                    type="email"
                    :value="userEmail || ''"
                    readonly
                    class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 cursor-not-allowed"
                    placeholder="No email address" />
                  <div
                    class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Email changes are handled through your authentication
                  provider.
                </p>
              </div>

              <!-- Display Name -->
              <div>
                <label
                  for="displayNameInput"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Name
                </label>
                <div class="flex rounded-md shadow-sm">
                  <input
                    id="displayNameInput"
                    v-model="editableDisplayName"
                    type="text"
                    class="flex-1 block w-full rounded-none rounded-l-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                    placeholder="Your Display Name"
                    :disabled="isLoadingNameChange" />
                  <button
                    @click="handleChangeDisplayName"
                    :disabled="isLoadingNameChange"
                    class="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md bg-gray-50 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150">
                    <svg
                      v-if="!isLoadingNameChange"
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7" />
                    </svg>
                    <svg
                      v-else
                      class="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </button>
                </div>
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  This name will be displayed in your gaming profile and
                  throughout Nexus.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Information Card -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h2
              class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
              Account Information
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Member Since
                </div>
                <div
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {{ accountCreatedAt }}
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Last Login
                </div>
                <div
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {{ lastSignInAt }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Preferences Card -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h2
              class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
              Preferences
            </h2>
            <div class="space-y-6">
              <!-- Theme Setting -->
              <div class="flex items-center justify-between">
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Dark Mode
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Toggle between light and dark theme
                  </p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer" checked />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <!-- Email Notifications -->
              <div class="flex items-center justify-between">
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Email Notifications
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Receive emails about deals, achievements, and updates
                  </p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer" checked />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <!-- Achievement Notifications -->
              <div class="flex items-center justify-between">
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Achievement Notifications
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Get notified when you unlock new achievements
                  </p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer" checked />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Card -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h2
              class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
              Security
            </h2>
            <div class="space-y-4">
              <!-- Password Change -->
              <div
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Password
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Last changed: Never
                  </p>
                </div>
                <NuxtLink
                  to="/resetpassword"
                  class="inline-flex items-center px-4 py-2 border border-indigo-500 text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-indigo-300 dark:border-indigo-600 dark:bg-gray-700 dark:hover:bg-gray-600 transition ease-in-out duration-150">
                  Change Password
                </NuxtLink>
              </div>

              <!-- Two-Factor Authentication -->
              <div
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Two-Factor Authentication
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button
                  class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150">
                  Enable 2FA
                </button>
              </div>

              <!-- Connected Platforms -->
              <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Connected Gaming Platforms
                </h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                        <span class="text-white text-xs font-bold">S</span>
                      </div>
                      <span class="text-gray-900 dark:text-gray-100"
                        >Steam</span
                      >
                    </div>
                    <button
                      class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                      Connect
                    </button>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                        <span class="text-white text-xs font-bold">E</span>
                      </div>
                      <span class="text-gray-900 dark:text-gray-100"
                        >Epic Games</span
                      >
                    </div>
                    <button
                      class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                      Connect
                    </button>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                        <span class="text-white text-xs font-bold">G</span>
                      </div>
                      <span class="text-gray-900 dark:text-gray-100">GOG</span>
                    </div>
                    <button
                      class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data & Privacy Card -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h2
              class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
              Data & Privacy
            </h2>
            <div class="space-y-4">
              <!-- Export Data -->
              <div
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Export Your Data
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Download a copy of your account data
                  </p>
                </div>
                <button
                  class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150">
                  Export Data
                </button>
              </div>

              <!-- Privacy Settings -->
              <div class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3
                  class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Privacy Settings
                </h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-900 dark:text-gray-100"
                      >Profile Visibility</span
                    >
                    <select
                      class="block px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                      <option>Public</option>
                      <option>Friends Only</option>
                      <option>Private</option>
                    </select>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-900 dark:text-gray-100"
                      >Gaming Stats</span
                    >
                    <select
                      class="block px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200">
                      <option>Public</option>
                      <option>Friends Only</option>
                      <option>Private</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Danger Zone Card -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h2
              class="text-2xl font-semibold mb-4 text-red-600 dark:text-red-500 border-b pb-2 dark:border-gray-700">
              Danger Zone
            </h2>
            <div class="space-y-4">
              <!-- Sign Out All Devices -->
              <div
                class="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700/50">
                <div>
                  <h3
                    class="text-lg font-medium text-red-900 dark:text-red-100">
                    Sign Out All Devices
                  </h3>
                  <p class="text-sm text-red-700 dark:text-red-300">
                    This will sign you out of all devices and sessions
                  </p>
                </div>
                <button
                  class="inline-flex items-center px-4 py-2 border border-red-500 text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:text-red-300 dark:border-red-600 dark:bg-red-700 dark:hover:bg-red-600 transition ease-in-out duration-150">
                  Sign Out All
                </button>
              </div>

              <!-- Delete Account -->
              <div
                class="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700/50">
                <div>
                  <h3
                    class="text-lg font-medium text-red-900 dark:text-red-100">
                    Delete Account
                  </h3>
                  <p class="text-sm text-red-700 dark:text-red-300">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <NuxtLink
                  to="/deletemyaccount"
                  class="inline-flex items-center px-4 py-2 border border-red-500 text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:text-red-300 dark:border-red-600 dark:bg-red-700 dark:hover:bg-red-600 transition ease-in-out duration-150">
                  Delete Account
                </NuxtLink>
              </div>
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
