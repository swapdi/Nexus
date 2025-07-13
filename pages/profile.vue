<script setup lang="ts">
  const userStore = useUserStore();
  const loadingStore = useLoadingStore();
  const notifyStore = useNotifyStore();

  // User & Account Information
  const user = computed(() => userStore.user);
  const account = useSupabaseUser();

  // User Info computed
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

  // Display Name Editing
  const editableDisplayName = ref('');
  const isLoadingNameChange = ref(false);

  // Steam Library Management
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

  // Update Display Name
  const updateDisplayName = async () => {
    if (!editableDisplayName.value.trim()) return;

    isLoadingNameChange.value = true;
    try {
      const { $client } = useNuxtApp();
      await $client.user.updateProfile.mutate({
        display_name: editableDisplayName.value.trim()
      });

      notifyStore.notify('Display Name erfolgreich aktualisiert!', 1);
      await userStore.init(); // Refresh user data
    } catch (error: any) {
      notifyStore.notify('Fehler beim Aktualisieren des Display Names', 3);
    } finally {
      isLoadingNameChange.value = false;
    }
  };

  // Steam Profile Linking
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

  // Initialization
  onMounted(async () => {
    try {
      if (!userStore.user) {
        await userStore.init();
      }
    } catch (error) {
      notifyStore.notify('Fehler beim Laden der Benutzerdaten.', 3);
    }
  });

  definePageMeta({
    middleware: ['auth'],
    title: 'Profil & Einstellungen',
    layout: 'authenticated'
  });
</script>
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1
          class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
          Profil & Einstellungen
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Verwalten Sie Ihr Profil, Ihre Bibliotheken und Account-Einstellungen.
        </p>
      </div>

      <!-- Profile & Settings Content -->
      <div class="space-y-6">
        <!-- Profile Information Card -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h2
              class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
              Profil Informationen
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
                  Angemeldet über {{ authProvider }}
                </p>
              </div>
            </div>

            <!-- Display Name Edit -->
            <div class="mb-6">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Anzeigename
              </label>
              <div class="flex gap-2">
                <input
                  v-model="editableDisplayName"
                  type="text"
                  class="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Ihr Anzeigename" />
                <button
                  @click="updateDisplayName"
                  :disabled="isLoadingNameChange || !editableDisplayName.trim()"
                  class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span v-if="isLoadingNameChange">...</span>
                  <span v-else>Speichern</span>
                </button>
              </div>
            </div>

            <!-- Account Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >E-Mail</label
                >
                <p class="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {{ userEmail || 'N/A' }}
                </p>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Angemeldet seit</label
                >
                <p class="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {{ accountCreatedAt }}
                </p>
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Letzte Anmeldung</label
                >
                <p class="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {{ lastSignInAt }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- User Statistics Card -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h2
              class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
              Statistiken
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center">
                <div
                  class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {{ totalGames }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Spiele in Bibliothek
                </div>
              </div>
              <div class="text-center">
                <div
                  class="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {{ wishlistCount }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Wunschliste
                </div>
              </div>
              <div class="text-center">
                <div
                  class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {{ userCredits }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Credits
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Steam Linking Modal -->
    <div
      v-if="showSteamLinking"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
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
  </div>
</template>

<style scoped>
  .container {
    isolation: isolate;
  }
</style>
