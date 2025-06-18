import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface LoadingOperation {
  id: string;
  label: string;
  progress?: number; // 0-100
  total?: number;
  current?: number;
  startTime: number;
  type: 'data' | 'import' | 'api' | 'process';
}

export const useLoadingStore = defineStore('loading', () => {
  // State
  const operations = ref<Map<string, LoadingOperation>>(new Map());

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

  const totalProgress = computed(() => {
    if (operations.value.size === 0) return 0;
    const ops = Array.from(operations.value.values());
    const withProgress = ops.filter(op => op.progress !== undefined);
    if (withProgress.length === 0) return 0;
    return (
      withProgress.reduce((sum, op) => sum + (op.progress || 0), 0) /
      withProgress.length
    );
  });

  // Actions
  const startOperation = (
    id: string,
    label: string,
    type: LoadingOperation['type'] = 'api',
    options?: { total?: number }
  ): void => {
    operations.value.set(id, {
      id,
      label,
      type,
      startTime: Date.now(),
      progress: options?.total ? 0 : undefined,
      total: options?.total,
      current: options?.total ? 0 : undefined
    });
  };

  const updateProgress = (
    id: string,
    progress?: number,
    current?: number,
    label?: string
  ): void => {
    const operation = operations.value.get(id);
    if (!operation) return;

    const updated = { ...operation };
    if (progress !== undefined)
      updated.progress = Math.min(100, Math.max(0, progress));
    if (current !== undefined) {
      updated.current = current;
      if (updated.total) {
        updated.progress = Math.min(100, (current / updated.total) * 100);
      }
    }
    if (label !== undefined) updated.label = label;

    operations.value.set(id, updated);
  };

  const finishOperation = (id: string): void => {
    operations.value.delete(id);
  };

  const clearAllOperations = (): void => {
    operations.value.clear();
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

  const withProgressLoading = async <T>(
    id: string,
    label: string,
    operation: (
      updateProgress: (
        current: number,
        total: number,
        newLabel?: string
      ) => void
    ) => Promise<T>,
    type: LoadingOperation['type'] = 'process'
  ): Promise<T> => {
    try {
      startOperation(id, label, type);
      const result = await operation((current, total, newLabel) => {
        updateProgress(id, undefined, current, newLabel);
        // Aktualisiere immer total und current, um sicherzustellen dass sie korrekt sind
        const op = operations.value.get(id);
        if (op) {
          operations.value.set(id, {
            ...op,
            total: total,
            current: current,
            progress: total > 0 ? Math.round((current / total) * 100) : 0
          });
        }
      });
      return result;
    } finally {
      finishOperation(id);
    }
  };

  // Spezielle Methode für Hintergrund-Operationen
  const withBackgroundLoading = async <T>(
    id: string,
    label: string,
    operation: (
      updateProgress: (
        current: number,
        total: number,
        newLabel?: string
      ) => void
    ) => Promise<T>
  ): Promise<T> => {
    try {
      startOperation(id, label, 'process'); // Typ 'process' für Hintergrund-Operationen
      const result = await operation((current, total, newLabel) => {
        updateProgress(id, undefined, current, newLabel);
        // Aktualisiere immer total und current, um sicherzustellen dass sie korrekt sind
        const op = operations.value.get(id);
        if (op) {
          operations.value.set(id, {
            ...op,
            total: total,
            current: current,
            progress: total > 0 ? Math.round((current / total) * 100) : 0
          });
        }
      });
      return result;
    } finally {
      finishOperation(id);
    }
  };
  // Hilfsmethode um zu prüfen ob Hintergrund-Operationen laufen
  const hasBackgroundOperations = computed(() => {
    return Array.from(operations.value.values()).some(
      op =>
        op.type === 'process' &&
        (op.id.includes('background') || op.id.includes('enrichment'))
    );
  });
  // Hilfsmethode um zu prüfen ob Vordergrund-Operationen laufen (nicht Hintergrund)
  const hasForegroundOperations = computed(() => {
    return Array.from(operations.value.values()).some(
      op =>
        op.type === 'import' ||
        op.type === 'api' ||
        op.type === 'data' ||
        (op.type === 'process' &&
          !op.id.includes('background') &&
          !op.id.includes('enrichment'))
    );
  });
  return {
    // State
    operations: readonly(operations),

    // Getters
    isLoading,
    hasOperations,
    operationsList,
    primaryOperation,
    totalProgress,
    hasBackgroundOperations,
    hasForegroundOperations,

    // Actions
    startOperation,
    updateProgress,
    finishOperation,
    clearAllOperations,
    getOperation,
    withLoading,
    withProgressLoading,
    withBackgroundLoading
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

  const progressLoading = <T>(
    id: string,
    label: string,
    operation: (
      updateProgress: (
        current: number,
        total: number,
        newLabel?: string
      ) => void
    ) => Promise<T>,
    type: LoadingOperation['type'] = 'process'
  ) => loadingStore.withProgressLoading(id, label, operation, type);

  const backgroundLoading = <T>(
    id: string,
    label: string,
    operation: (
      updateProgress: (
        current: number,
        total: number,
        newLabel?: string
      ) => void
    ) => Promise<T>
  ) => loadingStore.withBackgroundLoading(id, label, operation);

  return {
    loading,
    progressLoading,
    backgroundLoading,
    ...loadingStore
  };
};
