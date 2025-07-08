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
              class="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <p class="text-xs text-gray-500 mt-1">
              Ihr Steam-Profil muss öffentlich sein
            </p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="importSteamLibrary"
              :disabled="!steamInput.trim()"
              class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              Importieren
            </button>
            <button
              @click="showSteamForm = false"
              class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium">
              Abbrechen
            </button>
          </div>
        </div>
      </div>

      <!-- Epic Games (Placeholder) -->
      <div
        class="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-lg border border-gray-600/30 p-4 opacity-50">
        <div class="flex items-center mb-4">
          <div
            class="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
            <Icon name="simple-icons:epicgames" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-white">Epic Games</h3>
            <p class="text-sm text-gray-400">Bald verfügbar</p>
          </div>
        </div>
        <div class="space-y-3">
          <div class="text-sm text-gray-300">
            <div class="flex justify-between">
              <span>Status:</span>
              <span class="text-gray-500">Bald verfügbar</span>
            </div>
          </div>
          <button
            disabled
            class="w-full px-4 py-2 bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed font-medium">
            Bald verfügbar
          </button>
        </div>
      </div>

      <!-- Xbox/Microsoft (Placeholder) -->
      <div
        class="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-lg border border-gray-600/30 p-4 opacity-50">
        <div class="flex items-center mb-4">
          <div
            class="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
            <Icon name="simple-icons:xbox" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-white">Xbox Game Pass</h3>
            <p class="text-sm text-gray-400">Bald verfügbar</p>
          </div>
        </div>
        <div class="space-y-3">
          <div class="text-sm text-gray-300">
            <div class="flex justify-between">
              <span>Status:</span>
              <span class="text-gray-500">Bald verfügbar</span>
            </div>
          </div>
          <button
            disabled
            class="w-full px-4 py-2 bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed font-medium">
            Bald verfügbar
          </button>
        </div>
      </div>
    </div>

    <!-- Import Results -->
    <div
      v-if="importResult"
      class="mt-6 p-4 rounded-lg border"
      :class="[
        importResult.success
          ? 'bg-green-900/30 border-green-500/50 text-green-200'
          : 'bg-red-900/30 border-red-500/50 text-red-200'
      ]">
      <div class="flex items-center mb-2">
        <Icon
          :name="
            importResult.success
              ? 'heroicons:check-circle'
              : 'heroicons:x-circle'
          "
          class="w-5 h-5 mr-2" />
        <span class="font-medium">
          {{
            importResult.success
              ? 'Import erfolgreich!'
              : 'Import fehlgeschlagen'
          }}
        </span>
      </div>
      <div
        v-if="
          importResult.success &&
          (importResult.imported || importResult.updated)
        "
        class="text-sm space-y-1">
        <div v-if="importResult.imported">
          Importiert: {{ importResult.imported }} Spiele
        </div>
        <div v-if="importResult.updated">
          Aktualisiert: {{ importResult.updated }} Spiele
        </div>
        <div v-if="importResult.skipped">
          Übersprungen: {{ importResult.skipped }} Spiele
        </div>
      </div>
      <div v-if="importResult.message" class="text-sm mt-2">
        {{ importResult.message }}
      </div>
    </div>

    <!-- Loading Overlay -->
    <LoadingOverlay />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { NotificationType } from '~/stores/notify.store';

  const emit = defineEmits<{
    importCompleted: [];
  }>();

  const { $client } = useNuxtApp();
  const notifyStore = useNotifyStore();
  const loadingStore = useLoadingStore();

  // Steam Import State
  const showSteamForm = ref(false);
  const steamInput = ref('');
  const importResult = ref<{
    success: boolean;
    imported?: number;
    updated?: number;
    skipped?: number;
    errors?: string[];
    message?: string;
  } | null>(null);

  // Steam Import Function
  const importSteamLibrary = async () => {
    if (!steamInput.value.trim()) return;

    importResult.value = null;
    loadingStore.startOperation(
      'steam-import',
      'Steam-Bibliothek wird importiert...'
    );

    try {
      const result = await $client.games.importSteamLibrary.mutate({
        steamInput: steamInput.value.trim()
      });

      if (result.success) {
        importResult.value = result;
        notifyStore.notify(
          'Steam-Bibliothek erfolgreich importiert!',
          NotificationType.Success
        );
        emit('importCompleted');
      } else {
        importResult.value = result;
        notifyStore.notify('Import fehlgeschlagen', NotificationType.Error);
      }
    } catch (error) {
      console.error('Steam Import Error:', error);
      importResult.value = {
        success: false,
        message: 'Fehler beim Steam-Import'
      };
      notifyStore.notify('Fehler beim Steam-Import', NotificationType.Error);
    } finally {
      loadingStore.finishOperation('steam-import');
    }
  };
</script>
