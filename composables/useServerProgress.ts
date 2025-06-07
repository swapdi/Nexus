// Composable für Server-Sent Events Progress-Tracking
import { ref, readonly, onUnmounted } from 'vue';

interface ProgressUpdate {
  current: number;
  total: number;
  message: string;
  timestamp: number;
}

export const useServerProgress = () => {
  const isConnected = ref(false);
  const currentProgress = ref<ProgressUpdate | null>(null);
  let eventSource: EventSource | null = null;

  const connectToProgress = (
    operationId: string,
    onUpdate?: (update: ProgressUpdate) => void
  ) => {
    // Bestehende Verbindung schließen falls vorhanden
    if (eventSource) {
      eventSource.close();
    }

    // Neue SSE-Verbindung aufbauen
    eventSource = new EventSource(`/api/progress/${operationId}`);

    eventSource.onopen = () => {
      console.log(`SSE verbunden für Operation: ${operationId}`);
      isConnected.value = true;
    };

    eventSource.onmessage = event => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'connected') {
          console.log('SSE-Verbindung bestätigt');
          return;
        }

        if (data.type === 'progress') {
          const update: ProgressUpdate = {
            current: data.current,
            total: data.total,
            message: data.message,
            timestamp: data.timestamp
          };

          currentProgress.value = update;
          console.log(
            `Progress Update: ${update.current}/${update.total} - ${update.message}`
          );

          // Callback ausführen falls vorhanden
          if (onUpdate) {
            onUpdate(update);
          }
        }

        if (data.type === 'complete') {
          console.log('Import abgeschlossen');
          disconnect();
        }
      } catch (error) {
        console.error('Fehler beim Parsen der SSE-Nachricht:', error);
      }
    };

    eventSource.onerror = error => {
      console.error('SSE Verbindungsfehler:', error);
      isConnected.value = false;

      // Automatisch nach 2 Sekunden wiederherstellen versuchen
      setTimeout(() => {
        if (eventSource?.readyState === EventSource.CLOSED) {
          console.log('Versuche SSE-Verbindung wiederherzustellen...');
          connectToProgress(operationId, onUpdate);
        }
      }, 2000);
    };
  };

  const disconnect = () => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
      isConnected.value = false;
      currentProgress.value = null;
    }
  };

  // Cleanup bei Component-Unmount
  onUnmounted(() => {
    disconnect();
  });

  return {
    isConnected: readonly(isConnected),
    currentProgress: readonly(currentProgress),
    connectToProgress,
    disconnect
  };
};
