export interface LoadingOperation {
  id: string;
  label: string;
  type: 'data' | 'import' | 'api' | 'process';
  startTime: number;
}
export const useLoadingStore = defineStore('loading', () => {
  // State
  const operations = ref<Map<string, LoadingOperation>>(new Map());
  const isMinimized = ref(false); // Neu: Minimierung-Zustand

  // Stelle sicher, dass lange Operationen im localStorage gespeichert werden
  const persistOperations = () => {
    const longRunning = Array.from(operations.value.values()).filter(
      op => op.type === 'import' || op.type === 'process'
    );

    if (longRunning.length > 0) {
      localStorage.setItem(
        'nexus-loading-operations',
        JSON.stringify(longRunning)
      );
      localStorage.setItem(
        'nexus-loading-minimized',
        isMinimized.value.toString()
      );
    } else {
      localStorage.removeItem('nexus-loading-operations');
      localStorage.removeItem('nexus-loading-minimized');
    }
  };

  // Lade persistierte Operationen beim Start
  const loadPersistedOperations = () => {
    if (process.client) {
      const savedOps = localStorage.getItem('nexus-loading-operations');
      const savedMinimized = localStorage.getItem('nexus-loading-minimized');

      if (savedOps) {
        try {
          const ops: LoadingOperation[] = JSON.parse(savedOps);
          ops.forEach(op => {
            operations.value.set(op.id, op);
          });
        } catch (error) {
          console.error(
            'Fehler beim Laden der persistierten Loading-Operationen:',
            error
          );
        }
      }

      if (savedMinimized) {
        isMinimized.value = savedMinimized === 'true';
      }
    }
  };

  // Lade persistierte Operationen beim Store-Start
  loadPersistedOperations();

  // Getters
  const isLoading = computed(() => operations.value.size > 0);
  const hasOperations = computed(() => operations.value.size > 0);
  const operationsList = computed(() => Array.from(operations.value.values()));
  const primaryOperation = computed(() => {
    if (operations.value.size === 0) return null;
    // Priorisiere Import-Operationen, dann API-Calls
    const ops = Array.from(operations.value.values());
    return (
      ops.find(op => op.type === 'import') ||
      ops.find(op => op.type === 'process') ||
      ops.find(op => op.type === 'api') ||
      ops[0]
    );
  });

  // Neu: Separate Getter für verschiedene Operation-Typen
  const hasBlockingOperation = computed(() => {
    return operationsList.value.some(
      op => op.type === 'import' || op.type === 'process'
    );
  });

  const hasNonBlockingOperation = computed(() => {
    return operationsList.value.some(
      op => op.type === 'api' || op.type === 'data'
    );
  });
  // Actions
  const startOperation = (
    id: string,
    label: string,
    type: LoadingOperation['type'] = 'api'
  ): void => {
    operations.value.set(id, {
      id,
      label,
      type,
      startTime: Date.now()
    });

    // Persistiere lange Operationen
    if (type === 'import' || type === 'process') {
      persistOperations();
    }
  };

  const finishOperation = (id: string): void => {
    operations.value.delete(id);
    // Reset minimized state wenn keine Operationen mehr laufen
    if (operations.value.size === 0) {
      isMinimized.value = false;
    }
    persistOperations();
  };

  const clearAllOperations = (): void => {
    operations.value.clear();
    isMinimized.value = false; // Reset minimized state
    persistOperations();
  };

  // Neu: Minimierung-Aktionen
  const minimize = (): void => {
    isMinimized.value = true;
    persistOperations();
  };

  const maximize = (): void => {
    isMinimized.value = false;
    persistOperations();
  };

  const toggleMinimized = (): void => {
    isMinimized.value = !isMinimized.value;
    persistOperations();
  };
  const getOperation = (id: string): LoadingOperation | undefined => {
    return operations.value.get(id);
  };
  // Helper für häufige Patterns
  const withLoading = async <T>(
    id: string,
    label: string,
    operation: () => Promise<T>,
    type: LoadingOperation['type'] = 'api'
  ): Promise<T> => {
    try {
      startOperation(id, label, type);
      const result = await operation();
      return result;
    } finally {
      finishOperation(id);
    }
  };
  return {
    // State
    operations: readonly(operations),
    isMinimized: readonly(isMinimized),

    // Getters
    isLoading,
    hasOperations,
    operationsList,
    primaryOperation,
    hasBlockingOperation,
    hasNonBlockingOperation,

    // Actions
    startOperation,
    finishOperation,
    clearAllOperations,
    getOperation,
    withLoading,
    minimize,
    maximize,
    toggleMinimized
  };
});
// Helper composable für einfachere Nutzung
export const useLoading = () => {
  const loadingStore = useLoadingStore();
  const loading = <T>(
    id: string,
    label: string,
    operation: () => Promise<T>,
    type: LoadingOperation['type'] = 'api'
  ) => loadingStore.withLoading(id, label, operation, type);
  return {
    loading,
    ...loadingStore
  };
};
