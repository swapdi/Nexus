<template>
  <!-- Library Management Card -->
  <div class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
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
              class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                :src="getStoreLogoURL('Steam')"
                alt="Steam Logo"
                class="w-8 h-8 object-contain" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                Steam
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ isSteamConnected ? 'Verbunden' : 'Nicht verbunden' }}
              </p>
              <p
                v-if="isSteamConnected && user?.steamId"
                class="text-xs text-gray-400">
                Steam ID: {{ user.steamId }}
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

        <!-- Epic Games Connection -->
        <div
          class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="flex items-center space-x-3">
            <div
              class="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                :src="getStoreLogoURL('Epic Games Store')"
                alt="Epic Games Logo"
                class="w-8 h-8 object-contain" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                Epic Games
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ isEpicConnected ? 'Verbunden' : 'Nicht verbunden' }}
              </p>
              <p
                v-if="isEpicConnected /* && user?.epicId */"
                class="text-xs text-gray-400">
                Epic ID:
                <!-- {{ user.steamId }} -->
              </p>
            </div>
          </div>
          <div class="flex space-x-2">
            <button
              v-if="!isEpicConnected"
              @click="showEpicLinking = true"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Verbinden
            </button>
            <button
              v-else
              @click="disconnectEpicProfile"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              Trennen
            </button>
          </div>
        </div>

        <!-- GOG (Coming Soon) -->
        <div
          class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-50">
          <div class="flex items-center space-x-3">
            <div
              class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                :src="getStoreLogoURL('GOG')"
                alt="GOG Logo"
                class="w-8 h-8 object-contain" />
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
  <!-- Steam Linking Modal -->
  <div
    v-if="showSteamLinking"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
      <div class="flex items-center mb-4">
        <img
          :src="getStoreLogoURL('Steam')"
          alt="Steam Logo"
          class="w-8 h-8 object-contain mr-3" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Steam-Profil verknüpfen
        </h3>
      </div>
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
          @click="
            showSteamLinking = false;
            steamProfileId = '';
          "
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
  <!-- Epic Games Linking Modal -->
  <div
    v-if="showEpicLinking"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div
      class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center mb-6">
        <img
          :src="getStoreLogoURL('Epic Games Store')"
          alt="Epic Games Logo"
          class="w-8 h-8 object-contain mr-3" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Mit Epic Games verbinden
        </h3>
      </div>

      <!-- Step 1: Start Connection -->
      <div v-if="step === 1" class="space-y-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Verbinde dein Epic Games-Konto, um deine Spielebibliothek zu
          synchronisieren.
        </p>
        <div class="flex justify-end space-x-2">
          <button
            @click="
              showEpicLinking = false;
              resetEpicFlow();
            "
            class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
            Abbrechen
          </button>
          <button
            @click="handleBeginAuth"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Verbindung starten
          </button>
        </div>
        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
      </div>

      <!-- Step 2: Authorization Instructions -->
      <div v-if="step === 2" class="space-y-4">
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Anleitung:
          </h4>
          <ol
            class="list-decimal list-inside space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <li>
              Gehe zu:
              <a
                :href="activationUrl"
                target="_blank"
                class="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200">
                {{ activationUrl }}
              </a>
            </li>
            <li>
              Gib dort diesen Code ein:
              <code
                class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded font-mono"
                >{{ activationCode }}</code
              >
            </li>
            <li>Logge dich ein und autorisiere die Anfrage.</li>
            <li>
              <strong>Wichtiger Schritt:</strong> Nach dem Erfolg landest du auf
              einer leeren Seite. Öffne die Entwickler-Tools (F12) >
              "Netzwerk"-Tab. Lade die Seite neu. Finde die Anfrage an
              <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded font-mono"
                >account/api/oauth/token</code
              >
              und kopiere aus der Antwort den Wert von
              <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded font-mono"
                >authorizationCode</code
              >.
            </li>
          </ol>
        </div>

        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Authorization Token:
          </label>
          <input
            v-model="authToken"
            type="text"
            placeholder="Authorization Token hier einfügen"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-100" />
        </div>

        <div class="flex justify-end space-x-2">
          <button
            @click="
              showEpicLinking = false;
              resetEpicFlow();
            "
            class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
            Abbrechen
          </button>
          <button
            @click="handleCompleteAuth"
            :disabled="!authToken.trim()"
            class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Verbindung abschließen
          </button>
        </div>
      </div>

      <!-- Step 3: Success -->
      <div v-if="step === 3" class="text-center space-y-4">
        <div
          class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
          <svg
            class="w-8 h-8 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Verbindung erfolgreich!
        </h4>
        <p class="text-gray-600 dark:text-gray-400">
          Dein Epic Games-Konto wurde erfolgreich verknüpft.
        </p>
        <button
          @click="
            showEpicLinking = false;
            resetEpicFlow();
          "
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Fertig
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const userStore = useUserStore();
  const user = computed(() => userStore.user);
  const { getStoreIconURL, getStoreLogoURL } = useStoreUtils();

  const showSteamLinking = ref(false);
  const showEpicLinking = ref(false);
  const steamProfileId = ref('');

  // Connection status
  const isSteamConnected = computed(() => {
    return !!user.value?.steamId;
  });

  const isEpicConnected = computed(() => {
    return false; // TODO: implement when Epic Games integration is ready
    //return !!user.value?.epicId;
  });

  // Epic Games connection variables
  const step = ref(1);
  const error = ref('');
  const activationUrl = ref('');
  const activationCode = ref('');
  const authToken = ref('');

  const linkSteamProfile = async () => {
    if (!steamProfileId.value.trim()) return;
    try {
      const result = await userStore.linkSteamProfile(steamProfileId.value);

      if (result.success) {
        showSteamLinking.value = false;
        steamProfileId.value = '';
      }
    } catch (error) {
      // Error handling is already done in the store
      console.error('Steam linking error:', error);
    }
  };

  // Steam profile disconnect function
  const disconnectSteamProfile = async () => {
    if (!user.value) return;
    try {
      await userStore.unlinkSteamProfile();
    } catch (error) {
      // Error handling is already done in the store
      console.error('Steam unlinking error:', error);
    }
  };

  const disconnectEpicProfile = () => {
    console.log('Epic profile disconnect clicked');
    // TODO: Implement the logic to disconnect Epic profile
  };

  const resetEpicFlow = () => {
    step.value = 1;
    error.value = '';
    activationUrl.value = '';
    activationCode.value = '';
    authToken.value = '';
  };

  const handleBeginAuth = () => {
    console.log('Begin Auth clicked');
    // TODO: Implement Epic Games OAuth flow initialization
    // This would typically call an API endpoint to start the OAuth flow
    step.value = 2;
    // Mock data for demonstration - replace with actual API call
    activationUrl.value = 'https://www.epicgames.com/id/login';
    activationCode.value = 'ABC123';
  };

  const handleCompleteAuth = () => {
    console.log('Complete Auth clicked with token:', authToken.value);
    // TODO: Implement token exchange logic
    // This would send the authToken to your backend for processing
    step.value = 3;
  };
</script>
