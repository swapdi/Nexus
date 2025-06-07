<template>
  <div
    class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2
          class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Bibliothek Importieren
        </h2>
        <p class="text-gray-400 mt-1">
          Verbinden Sie Ihre Gaming-Plattformen und importieren Sie Ihre
          Spielebibliothek
        </p>
      </div>
      <Icon
        name="heroicons:arrow-down-tray-20-solid"
        class="w-8 h-8 text-purple-400" />
    </div>

    <!-- Platform Import Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Steam Import -->
      <div
        class="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-lg border border-blue-500/30 p-4 hover:border-blue-400/50 transition-all duration-300">
        <div class="flex items-center mb-4">
          <div
            class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <Icon name="simple-icons:steam" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-white">Steam</h3>
            <p class="text-sm text-gray-400">Import von Steam-Bibliothek</p>
          </div>
        </div>

        <div v-if="!showSteamForm" class="space-y-3">
          <div class="text-sm text-gray-300">
            <div class="flex justify-between">
              <span>Status:</span>
              <span class="text-blue-400">Verfügbar</span>
            </div>
          </div>
          <button
            @click="showSteamForm = true"
            class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium">
            Steam Importieren
          </button>
        </div>
        <!-- Steam Import Form -->
        <div v-else class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Steam ID oder Profil-URL
            </label>
            <input
              v-model="steamInput"
              type="text"
              placeholder="z.B. 76561198000000000 oder https://steamcommunity.com/profiles/..."
              class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :disabled="loadingStore.hasOperations" />
            <p class="text-xs text-gray-500 mt-1">
              Ihr Steam-Profil muss öffentlich sein
            </p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="importSteamLibrary"
              :disabled="!steamInput.trim() || loadingStore.hasOperations"
              class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 font-medium text-sm flex items-center justify-center">
              <Icon
                v-if="loadingStore.hasOperations"
                name="heroicons:arrow-path-20-solid"
                class="w-4 h-4 mr-2 animate-spin" />
              <Icon
                v-else
                name="heroicons:arrow-down-tray-20-solid"
                class="w-4 h-4 mr-2" />
              {{ loadingStore.hasOperations ? 'Importiere...' : 'Importieren' }}
            </button>
            <button
              @click="
                showSteamForm = false;
                steamInput = '';
              "
              :disabled="loadingStore.hasOperations"
              class="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm">
              Abbrechen
            </button>
          </div>
        </div>
      </div>

      <!-- Epic Games Store (Coming Soon) -->
      <div
        class="bg-gradient-to-br from-gray-800/30 to-gray-700/30 rounded-lg border border-gray-600/30 p-4 opacity-75">
        <div class="flex items-center mb-4">
          <div
            class="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
            <Icon name="simple-icons:epicgames" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-white">Epic Games Store</h3>
            <p class="text-sm text-gray-400">Import von Epic-Bibliothek</p>
          </div>
        </div>

        <div class="space-y-3">
          <div class="text-sm text-gray-300">
            <div class="flex justify-between">
              <span>Status:</span>
              <span class="text-yellow-400">Bald verfügbar</span>
            </div>
          </div>
          <button
            disabled
            class="w-full px-4 py-2 bg-gray-600 cursor-not-allowed text-gray-400 rounded-lg font-medium">
            Bald verfügbar
          </button>
        </div>
      </div>

      <!-- GOG (Coming Soon) -->
      <div
        class="bg-gradient-to-br from-gray-800/30 to-gray-700/30 rounded-lg border border-gray-600/30 p-4 opacity-75">
        <div class="flex items-center mb-4">
          <div
            class="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
            <Icon name="simple-icons:gogdotcom" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-white">GOG</h3>
            <p class="text-sm text-gray-400">Import von GOG-Bibliothek</p>
          </div>
        </div>

        <div class="space-y-3">
          <div class="text-sm text-gray-300">
            <div class="flex justify-between">
              <span>Status:</span>
              <span class="text-yellow-400">Bald verfügbar</span>
            </div>
          </div>
          <button
            disabled
            class="w-full px-4 py-2 bg-gray-600 cursor-not-allowed text-gray-400 rounded-lg font-medium">
            Bald verfügbar
          </button>
        </div>
      </div>
    </div>

    <!-- Import History/Results -->
    <div
      v-if="importResult"
      class="mt-6 p-4 rounded-lg border"
      :class="
        importResult.success
          ? 'bg-green-900/20 border-green-500/30'
          : 'bg-red-900/20 border-red-500/30'
      ">
      <div class="flex items-start">
        <Icon
          :name="
            importResult.success
              ? 'heroicons:check-circle-20-solid'
              : 'heroicons:exclamation-triangle-20-solid'
          "
          :class="importResult.success ? 'text-green-400' : 'text-red-400'"
          class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
        <div class="flex-1">
          <h4
            class="font-medium"
            :class="importResult.success ? 'text-green-300' : 'text-red-300'">
            {{
              importResult.success
                ? 'Import erfolgreich!'
                : 'Import fehlgeschlagen'
            }}
          </h4>
          <div
            v-if="importResult.success"
            class="text-sm mt-1"
            :class="importResult.success ? 'text-green-200' : 'text-red-200'">
            <p v-if="importResult.imported && importResult.imported > 0">
              {{ importResult.imported }} neue Spiele importiert
            </p>
            <p v-if="importResult.updated && importResult.updated > 0">
              {{ importResult.updated }} Spiele aktualisiert
            </p>
            <p v-if="importResult.skipped && importResult.skipped > 0">
              {{ importResult.skipped }} bereits vorhandene Spiele übersprungen
            </p>
            <p
              v-if="importResult.enriched && importResult.enriched > 0"
              class="text-blue-300">
              {{ importResult.enriched }} Spiele mit IGDB-Daten angereichert
            </p>
            <p
              v-if="importResult.errors && importResult.errors > 0"
              class="text-yellow-300">
              {{ importResult.errors }} Fehler beim Import
            </p>
            <p
              v-if="
                importResult.enrichmentErrors &&
                importResult.enrichmentErrors > 0
              "
              class="text-orange-300">
              {{ importResult.enrichmentErrors }} Fehler bei IGDB-Anreicherung
            </p>
            <p
              v-if="
                !importResult.imported &&
                !importResult.updated &&
                importResult.skipped
              ">
              Keine neuen Spiele gefunden - alle Spiele sind bereits in Ihrer
              Bibliothek
            </p>
          </div>
          <p v-else class="text-sm mt-1 text-red-200">
            {{ importResult.message || 'Ein Fehler ist aufgetreten' }}
          </p>
        </div>
        <button
          @click="importResult = null"
          class="text-gray-400 hover:text-gray-300 ml-2">
          <Icon name="heroicons:x-mark-20-solid" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const { $client } = useNuxtApp();
  const notifyStore = useNotifyStore();
  const { progressLoading } = useLoading();
  const loadingStore = useLoadingStore();

  // Progress-Update-Interface für TypeScript
  interface ServerProgressUpdate {
    current: number;
    total: number;
    message: string;
    timestamp: number;
  }

  // Steam Import State
  const showSteamForm = ref(false);
  const steamInput = ref('');
  const importResult = ref<{
    success: boolean;
    imported?: number;
    updated?: number;
    skipped?: number;
    errors?: number;
    enriched?: number;
    enrichmentErrors?: number;
    message?: string;
  } | null>(null); // Steam Import Function
  const importSteamLibrary = async () => {
    if (!steamInput.value.trim()) return;

    importResult.value = null;

    // Generiere eindeutige Operation-ID für Progress-Tracking
    const operationId = `steam-import-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    try {
      const result = await progressLoading(
        'steam-library-import',
        'Steam-Bibliothek wird importiert...',
        async (
          updateProgress: (
            current: number,
            total: number,
            newLabel?: string
          ) => void
        ) => {
          // Generiere eindeutige Operation-ID für Progress-Tracking
          let eventSource: any = null;

          // Server-Progress-Tracking mit Server-Sent Events
          const connectToServerProgress = () => {
            eventSource = new EventSource(`/api/progress/${operationId}`);
            eventSource.onmessage = (event: any) => {
              try {
                const data = JSON.parse(event.data);

                if (data.type === 'progress') {
                  // Server-Progress in Frontend-Progress umwandeln
                  const percentage = Math.round(
                    (data.current / data.total) * 100
                  );
                  updateProgress(percentage, 100, data.message);
                }
              } catch (error) {
                console.error('Fehler beim Parsen der SSE-Nachricht:', error);
              }
            };

            eventSource.onerror = (error: any) => {
              console.error('SSE Verbindungsfehler:', error);
            };
          };

          try {
            // Initiale Phase
            updateProgress(0, 100, 'Verbinde mit Steam API...');

            // SSE-Verbindung aufbauen
            connectToServerProgress();

            // Backend-Import mit Progress-Tracking starten
            const steamResult = await $client.games.importSteamLibrary.mutate({
              steamInput: steamInput.value.trim(),
              operationId: operationId
            });

            // Finaler Progress-Update
            updateProgress(100, 100, 'Import abgeschlossen!');
            await new Promise(resolve => setTimeout(resolve, 200));

            return steamResult;
          } catch (error) {
            throw error;
          } finally {
            // SSE-Verbindung schließen
            if (eventSource && typeof eventSource.close === 'function') {
              eventSource.close();
            }
          }
        },
        'import'
      );

      importResult.value = result;
      if (result.success) {
        // Dynamische Erfolgs-Benachrichtigung basierend auf Ergebnissen
        let notificationMessage = 'Steam-Import abgeschlossen! ';
        if (result.imported && result.imported > 0) {
          notificationMessage += `${result.imported} neue Spiele importiert. `;
        }
        if (result.updated && result.updated > 0) {
          notificationMessage += `${result.updated} Spiele aktualisiert. `;
        }
        if (result.enriched && result.enriched > 0) {
          notificationMessage += `${result.enriched} Spiele mit zusätzlichen Informationen angereichert. `;
        }
        if (!result.imported && !result.updated && result.skipped) {
          notificationMessage =
            'Steam-Import abgeschlossen - alle Spiele sind bereits in Ihrer Bibliothek.';
        }

        notifyStore.notify(notificationMessage.trim(), 1);

        // Form zurücksetzen
        showSteamForm.value = false;
        steamInput.value = '';

        // Emit event um Spieleliste zu aktualisieren
        emit('importCompleted');
      }
    } catch (error: any) {
      console.error('Steam Import Error:', error);

      importResult.value = {
        success: false,
        message: error.message || 'Ein unerwarteter Fehler ist aufgetreten'
      };

      notifyStore.notify(
        'Steam-Import fehlgeschlagen. Ein unerwarteter Fehler ist aufgetreten',
        3
      );
      throw error;
    }
  };

  // Events
  const emit = defineEmits<{
    importCompleted: [];
  }>();
</script>
