<script setup lang="ts">
  const userStore = useUserStore();
  const notifyStore = useNotifyStore();
  const loadingStore = useLoadingStore();
  const editableDisplayName = ref('');
  const isLoadingNameChange = ref(false);
  // Benutzer aus dem Store
  const user = computed(() => userStore.user);
  // Account aus der Supabase-Authentifizierung
  const account = useSupabaseUser();
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
  const showSteamLinking = ref(false);
  const steamProfileId = ref('');
  const linkingResult = ref<{
    success: boolean;
    message?: string;
  } | null>(null);
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
  // Stelle sicher, dass die Benutzerdaten geladen sind
  onMounted(async () => {
    try {
      if (!userStore.user) {
        await userStore.init();
      }
    } catch (error) {
      console.error('Fehler beim Laden der Benutzerdaten:', error);
      notifyStore.notify(
        'Fehler beim Laden der Benutzerdaten.',
        NotificationType.Error
      );
    }
  });
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
      await userStore.updateProfile({
        display_name: editableDisplayName.value.trim()
      });
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
  const linkSteamProfile = async () => {
    if (!steamProfileId.value.trim()) return;
    linkingResult.value = null;
    loadingStore.startOperation(
      'steam-link',
      'Steam-Profil wird verknüpft...',
      'process'
    );
    try {
      const { $client } = useNuxtApp();
      const result = await $client.user.linkSteamProfile.mutate({
        steamId: steamProfileId.value.trim()
      });
      loadingStore.finishOperation('steam-link');
      linkingResult.value = result;
      if (result.success) {
        notifyStore.notify('Steam-Profil erfolgreich verknüpft!', 1);
        showSteamLinking.value = false;
        steamProfileId.value = '';
        await userStore.init();
      } else {
        notifyStore.notify(
          result.message || 'Fehler beim Verknüpfen des Steam-Profils',
          2
        );
      }
    } catch (error: any) {
      loadingStore.finishOperation('steam-link');
      linkingResult.value = {
        success: false,
        message: error.message || 'Ein unerwarteter Fehler ist aufgetreten'
      };
      notifyStore.notify('Verknüpfung fehlgeschlagen', 3);
    }
  };
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
      <!-- Settings Content -->
      <div class="space-y-6">
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
        <!-- Library Management Card -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h2
              class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
              Bibliotheken verwalten
            </h2>

            <!-- Steam Connection -->
            <div class="space-y-4">
              <div
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg
                      class="w-8 h-8 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      <path d="M12 7v5l4 2-1 1.7-5-3V7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                      Steam
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ isSteamConnected ? 'Verbunden' : 'Nicht verbunden' }}
                    </p>
                    <p
                      v-if="isSteamConnected && user?.steam_id"
                      class="text-xs text-gray-400">
                      Steam ID: {{ user.steam_id }}
                    </p>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button
                    v-if="!isSteamConnected"
                    @click="showSteamLinking = true"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Verbinden
                  </button>
                  <button
                    v-else
                    @click="disconnectSteamProfile"
                    class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Trennen
                  </button>
                </div>
              </div>

              <!-- Epic Games (Coming Soon) -->
              <div
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-50">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                    <svg
                      class="w-8 h-8 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                      Epic Games
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Bald verfügbar
                    </p>
                  </div>
                </div>
                <button
                  disabled
                  class="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed">
                  Bald verfügbar
                </button>
              </div>

              <!-- GOG (Coming Soon) -->
              <div
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-50">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                    <svg
                      class="w-8 h-8 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                      GOG
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      Bald verfügbar
                    </p>
                  </div>
                </div>
                <button
                  disabled
                  class="px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed">
                  Bald verfügbar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="showSteamLinking"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3
              class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Steam-Profil verknüpfen
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Geben Sie Ihre Steam-ID oder Ihren Steam-Benutzernamen ein:
            </p>
            <input
              v-model="steamProfileId"
              type="text"
              placeholder="Steam-ID oder Benutzername"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100 mb-4"
              @keyup.enter="linkSteamProfile" />
            <div class="flex justify-end space-x-2">
              <button
                @click="showSteamLinking = false"
                class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                Abbrechen
              </button>
              <button
                @click="linkSteamProfile"
                :disabled="!steamProfileId.trim()"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                Verknüpfen
              </button>
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
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    checked
                    aria-label="Toggle dark mode" />
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
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    checked
                    aria-label="Toggle email notifications" />
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
                    <!-- TODO: last changed-->
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
    <!-- Loading Overlay -->
    <LoadingOverlay />
  </div>
</template>
<style scoped>
  /* Page-specific styles can be added here if Tailwind utilities are not sufficient */
</style>
