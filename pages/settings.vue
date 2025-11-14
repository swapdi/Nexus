<script setup lang="ts">
  import { NotificationType } from '~/stores/notify.store';

  const userStore = useUserStore();
  const notifyStore = useNotifyStore();
  const editableDisplayName = ref('');
  const isLoadingNameChange = ref(false);
  const isLoadingEmailNotifications = ref(false);

  // Benutzer aus dem Store
  const user = computed(() => userStore.user);

  // E-Mail-Benachrichtigungseinstellungen
  const emailNotifications = computed({
    get: () => user.value?.emailNotifications ?? true,
    set: async (value: boolean) => {
      await handleToggleEmailNotifications(value);
    }
  });
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
    // DEMO MODE: Disabled
    notifyStore.notify(
      'Diese Funktion ist in der Demo-Version deaktiviert.',
      NotificationType.Info
    );
    return;
  }

  async function handleToggleEmailNotifications(enabled: boolean) {
    // DEMO MODE: Disabled
    notifyStore.notify(
      'Diese Funktion ist in der Demo-Version deaktiviert.',
      NotificationType.Info
    );
    return;
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
              <!-- Display Name - DEMO MODE: READ ONLY -->
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
                    readonly
                    disabled
                    class="flex-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 cursor-not-allowed px-3 py-2"
                    placeholder="Your Display Name" />
                </div>
                <p class="mt-1 text-xs text-amber-600 dark:text-amber-400">
                  ⚠️ Demo-Modus: Änderungen sind in der Demo-Version
                  deaktiviert.
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
        <LibraryManagement />
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
              <!-- Email Notifications - DEMO MODE: DISABLED -->
              <div class="flex items-center justify-between opacity-50">
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    E-Mail-Benachrichtigungen
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    In der Demo-Version deaktiviert
                  </p>
                </div>
                <label
                  class="relative inline-flex items-center cursor-not-allowed">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    disabled
                    checked
                    aria-label="E-Mail-Benachrichtigungen (deaktiviert in Demo)" />
                  <div
                    class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-400 cursor-not-allowed"></div>
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
              <!-- Password Change - DEMO MODE: DISABLED -->
              <div
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg opacity-50">
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Password
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    In der Demo-Version deaktiviert
                  </p>
                </div>
                <button
                  disabled
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed dark:border-gray-600 dark:bg-gray-700">
                  Change Password
                </button>
              </div>
              <!-- Two-Factor Authentication - DEMO MODE: DISABLED -->
              <div
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg opacity-50">
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Two-Factor Authentication
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    In der Demo-Version deaktiviert
                  </p>
                </div>
                <button
                  disabled
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed dark:border-gray-600 dark:bg-gray-700">
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
              <!-- Export Data - DEMO MODE: DISABLED -->
              <div
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg opacity-50">
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Export Your Data
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    In der Demo-Version deaktiviert
                  </p>
                </div>
                <button
                  disabled
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed dark:border-gray-600 dark:bg-gray-700">
                  Export Data
                </button>
              </div>
              <!-- Privacy Settings - DEMO MODE: DISABLED -->
              <div
                class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg opacity-50">
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
                      disabled
                      class="block px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-gray-100 dark:bg-gray-700/50 text-gray-400 cursor-not-allowed">
                      <option>Public</option>
                    </select>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-900 dark:text-gray-100"
                      >Gaming Stats</span
                    >
                    <select
                      disabled
                      class="block px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-gray-100 dark:bg-gray-700/50 text-gray-400 cursor-not-allowed">
                      <option>Public</option>
                    </select>
                  </div>
                </div>
                <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  In der Demo-Version deaktiviert
                </p>
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
              <!-- Sign Out All Devices - DEMO MODE: DISABLED -->
              <div
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 opacity-50">
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Sign Out All Devices
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    In der Demo-Version deaktiviert
                  </p>
                </div>
                <button
                  disabled
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed dark:border-gray-600 dark:bg-gray-700">
                  Sign Out All
                </button>
              </div>
              <!-- Delete Account - DEMO MODE: DISABLED -->
              <div
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 opacity-50">
                <div>
                  <h3
                    class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    In der Demo-Version deaktiviert
                  </p>
                </div>
                <button
                  disabled
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed dark:border-gray-600 dark:bg-gray-700">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
