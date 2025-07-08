import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface LoadingOperation {
  id: string;
  label: string;
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

  return {
    // State
    operations: readonly(operations),

    // Getters
    isLoading,
    hasOperations,
    operationsList,
    primaryOperation,

    // Actions
    startOperation,
    finishOperation,
    clearAllOperations,
    getOperation,
    withLoading
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
