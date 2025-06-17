<template>
  <div
    v-if="backgroundOperations.length > 0"
    class="fixed bottom-4 right-4 z-50 max-w-sm">
    <div
      class="bg-gray-800/95 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4 shadow-2xl">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center space-x-2">
          <Icon
            name="heroicons:arrow-path-20-solid"
            class="w-4 h-4 text-blue-400 animate-spin" />
          <span class="text-sm font-medium text-gray-200">
            Hintergrund-Verarbeitung
          </span>
        </div>
        <button
          @click="isExpanded = !isExpanded"
          class="text-gray-400 hover:text-gray-300 transition-colors">
          <Icon
            :name="
              isExpanded
                ? 'heroicons:chevron-down-20-solid'
                : 'heroicons:chevron-up-20-solid'
            "
            class="w-4 h-4" />
        </button>
      </div>

      <!-- Kompakte Ansicht -->
      <div v-if="!isExpanded && primaryBackgroundOperation" class="space-y-2">
        <div class="text-xs text-gray-400 truncate">
          {{ primaryBackgroundOperation.label }}
        </div>
        <div class="w-full bg-gray-700 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            :style="{
              width: `${primaryBackgroundOperation.progress || 0}%`
            }"></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500">
          <span
            >{{ Math.round(primaryBackgroundOperation.progress || 0) }}%</span
          >
          <span>{{
            formatDuration(Date.now() - primaryBackgroundOperation.startTime)
          }}</span>
        </div>
      </div>

      <!-- Erweiterte Ansicht -->
      <div v-if="isExpanded" class="space-y-3">
        <div
          v-for="operation in backgroundOperations"
          :key="operation.id"
          class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-300 truncate flex-1 mr-2">
              {{ operation.label }}
            </span>
            <span class="text-xs text-gray-500">
              {{ Math.round(operation.progress || 0) }}%
            </span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-1.5">
            <div
              class="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
              :style="{ width: `${operation.progress || 0}%` }"></div>
          </div>
          <div class="flex justify-between text-xs text-gray-500">
            <span>{{
              operation.type === 'process' ? 'Verarbeitung' : 'Import'
            }}</span>
            <span>{{ formatDuration(Date.now() - operation.startTime) }}</span>
          </div>
        </div>
      </div>

      <!-- Minimieren/Schließen -->
      <div class="flex justify-end mt-3 pt-2 border-t border-gray-700/50">
        <button
          @click="isMinimized = !isMinimized"
          class="text-xs text-gray-400 hover:text-gray-300 transition-colors px-2 py-1 rounded">
          {{ isMinimized ? 'Maximieren' : 'Minimieren' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  const loadingStore = useLoadingStore();
  const isExpanded = ref(false);
  const isMinimized = ref(false);

  // Hintergrund-Operationen filtern
  const backgroundOperations = computed(() => {
    return loadingStore.operationsList.filter(
      op =>
        op.type === 'process' &&
        (op.id.includes('background') || op.id.includes('enrichment'))
    );
  });

  const primaryBackgroundOperation = computed(() => {
    return backgroundOperations.value[0] || null;
  });

  // Hilfsfunktionen
  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);

    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };
</script>

<style scoped>
  /* Smooth transitions for progress bars */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }
</style>
