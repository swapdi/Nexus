<template>
  <div
    v-if="shouldShowIndicator"
    class="fixed top-6 left-6 z-40 flex items-center space-x-2 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700/50 px-3 py-2 shadow-lg">
    <!-- Small Loading Spinner -->
    <div
      class="w-4 h-4 rounded-full border-2 border-gray-600 border-t-blue-400 animate-spin"></div>

    <!-- Operation Label -->
    <span class="text-sm text-gray-300 max-w-48 truncate">
      {{ primaryOperation?.label || 'Lädt...' }}
    </span>

    <div
      v-if="operationCount > 1"
      class="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
      {{ operationCount }}
    </div>
  </div>
</template>

<script setup lang="ts">
  const loadingStore = useLoadingStore();

  // Zeige nur nicht-blockierende Operationen (api, data)
  const shouldShowIndicator = computed(() => {
    return loadingStore.hasNonBlockingOperation;
  });

  const indicatorOperations = computed(() => {
    return loadingStore.operationsList.filter(
      op => op.type === 'api' || op.type === 'data'
    );
  });

  const primaryOperation = computed(() => {
    const ops = indicatorOperations.value;
    return ops[0] || null;
  });

  const operationCount = computed(() => indicatorOperations.value.length);
</script>
