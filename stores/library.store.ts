import { useGamesStore } from './games.store';
import { useUserStore } from './user.store';

export const useLibraryStore = defineStore('library', () => {
  const userStore = useUserStore();
  const gamesStore = useGamesStore();
  // Loading store integration
  const { loading } = useLoading();
  const error = ref<string | null>(null);

  const lastImportResult = ref<any | null>(null); // TODO: Define proper import result type
  const refreshLibraries = async () => {
    return await loading(
      'library-refresh',
      'Bibliotheken werden aktualisiert...',
      async () => {
        try {
          error.value = null;

          await importEpicLibrary();
          await importSteamLibrary(userStore.user?.steamId || '');
          return true;
        } catch (err: any) {
          error.value =
            err.message || 'Fehler beim Aktualisieren der Bibliotheken';
          console.error('Fehler beim Aktualisieren der Bibliotheken:', err);
          throw err;
        }
      }
    );
  };
  const importSteamLibrary = async (
    steamInput: string
  ): Promise<any | null> => {
    return await loading(
      'steam-import',
      'Steam-Bibliothek importieren...',
      async () => {
        const { $client } = useNuxtApp();
        const notifyStore = useNotifyStore();
        try {
          error.value = null;
          const result = await $client.libraries.importSteamLibrary.mutate({
            steamInput: steamInput.trim()
          });
          lastImportResult.value = result;
          if (result.success) {
            // Detaillierte Erfolgsmeldung erstellen
            let message = 'Steam-Import abgeschlossen! ';
            if (result.imported > 0) {
              message += `${result.imported} neue Spiele importiert. `;
            }
            if (result.updated && result.updated > 0) {
              message += `${result.updated} Spiele aktualisiert. `;
            }
            if (result.skipped > 0) {
              message += `${result.skipped} bereits vorhandene Spiele übersprungen.`;
            }
            notifyStore.notify(message, 1);
            // Daten neu laden nach erfolgreichem Import
            await gamesStore.refreshData();
          }
          return result;
        } catch (err: any) {
          error.value = err.message || 'Fehler beim Steam-Import';
          notifyStore.notify(error.value, 3);
          console.error('Fehler beim Steam-Import:', err);
          throw err;
        }
      }
    );
  };

  const importEpicLibrary = async (): Promise<any | null> => {
    return await loading(
      'epic-import',
      'Epic Games-Bibliothek importieren...',
      async () => {
        const { $client } = useNuxtApp();
        const notifyStore = useNotifyStore();
        try {
          error.value = null;
          const result = await $client.libraries.importEpicLibrary.mutate();
          lastImportResult.value = result;
          if (result.success) {
            // Detaillierte Erfolgsmeldung erstellen
            let message = 'Epic Games-Import abgeschlossen! ';
            if (result.imported > 0) {
              message += `${result.imported} neue Spiele importiert. `;
            }
            if (result.updated && result.updated > 0) {
              message += `${result.updated} Spiele aktualisiert. `;
            }
            if (result.skipped > 0) {
              message += `${result.skipped} bereits vorhandene Spiele übersprungen.`;
            }
            notifyStore.notify(message, 1);
            // Daten neu laden nach erfolgreichem Import
            await gamesStore.refreshData();
          }
          return result;
        } catch (err: any) {
          error.value = err.message || 'Fehler beim Epic Games-Import';
          notifyStore.notify(error.value, 3);
          console.error('Fehler beim Epic Games-Import:', err);
          throw err;
        }
      }
    );
  };

  const completeEpicGamesAuth = async (
    authToken: string
  ): Promise<any | null> => {
    return await loading(
      'epic-auth-complete',
      'Epic Games Authentifizierung wird abgeschlossen...',
      async () => {
        const { $client } = useNuxtApp();
        const notifyStore = useNotifyStore();
        try {
          error.value = null;
          const result = await $client.libraries.completeAuthEpicGames.mutate({
            authToken: authToken.trim(),
            userId: userStore.user?.id.toString() || ''
          });

          if (result && result.status) {
            notifyStore.notify('Epic Games erfolgreich authentifiziert!', 1);
            // Daten neu laden nach erfolgreicher Authentifizierung
            await gamesStore.refreshData();
          }

          return result;
        } catch (err: any) {
          error.value =
            err.message ||
            'Fehler beim Abschließen der Epic Games Authentifizierung';
          notifyStore.notify(error.value, 3);
          console.error('Fehler bei Epic Games Auth Completion:', err);
          throw err;
        }
      },
      'process'
    );
  };

  const getEpicConfigStatus = async (): Promise<any | null> => {
    return await loading(
      'epic-config-status',
      'Überprüfe Epic Games Konfiguration...',
      async () => {
        const { $client } = useNuxtApp();
        try {
          error.value = null;
          const status = await $client.libraries.getEpicConfigStatus.query({
            userId: userStore.user?.id.toString() || ''
          });
          return status;
        } catch (err: any) {
          error.value =
            err.message ||
            'Fehler beim Überprüfen der Epic Games Konfiguration';
          console.error('Fehler bei Epic Games Config Status:', err);
          throw err;
        }
      },
      'process'
    );
  };

  const disconnectEpic = async (): Promise<any | null> => {
    return await loading(
      'epic-disconnect',
      'Epic Games Verbindung wird getrennt...',
      async () => {
        const { $client } = useNuxtApp();
        const notifyStore = useNotifyStore();
        try {
          error.value = null;
          const result = await $client.user.unlinkEpicProfile.mutate();

          if (result && result.success) {
            notifyStore.notify(
              'Epic Games Verbindung erfolgreich getrennt!',
              1
            );
            // User-Daten nach Trennung aktualisieren
            await userStore.init();
          }

          return result;
        } catch (err: any) {
          error.value =
            err.message || 'Fehler beim Trennen der Epic Games Verbindung';
          notifyStore.notify(error.value, 3);
          console.error('Fehler beim Epic Games Disconnect:', err);
          throw err;
        }
      },
      'process'
    );
  };

  return {
    // State
    error,
    lastImportResult,
    // Actions
    importSteamLibrary,
    importEpicLibrary,
    completeEpicGamesAuth,
    getEpicConfigStatus,
    refreshLibraries,
    disconnectEpic
  };
});
