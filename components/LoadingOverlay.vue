<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div
        v-if="loadingStore.hasForegroundOperations"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div
          class="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md w-full mx-4 shadow-2xl">
          <!-- Primary Operation Info -->
          <div v-if="loadingStore.primaryOperation" class="text-center">
            <!-- Loading Icon -->
            <div class="flex justify-center mb-4">
              <div
                class="relative w-16 h-16 rounded-full border-4 border-gray-600 border-t-blue-500 animate-spin"></div>
            </div>

            <!-- Operation Label -->
            <h3 class="text-lg font-semibold text-white mb-2">
              {{ loadingStore.primaryOperation.label }}
            </h3>

            <!-- Progress Bar (if available) -->
            <div
              v-if="loadingStore.primaryOperation.progress !== undefined"
              class="mb-4">
              <div class="flex justify-between text-sm text-gray-400 mb-1">
                <span>Fortschritt</span>
                <span
                  >{{
                    Math.round(loadingStore.primaryOperation.progress)
                  }}%</span
                >
              </div>
              <div class="w-full bg-gray-700 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                  :style="{
                    width: `${loadingStore.primaryOperation.progress}%`
                  }"></div>
              </div>

              <!-- Current/Total Progress -->
              <div
                v-if="
                  loadingStore.primaryOperation.current !== undefined &&
                  loadingStore.primaryOperation.total
                "
                class="text-xs text-gray-500 mt-1">
                {{ loadingStore.primaryOperation.current }} von
                {{ loadingStore.primaryOperation.total }}
              </div>
            </div>

            <!-- Multiple Operations Indicator -->
            <div v-if="loadingStore.operationsList.length > 1" class="mb-4">
              <p class="text-sm text-gray-400">
                {{ loadingStore.operationsList.length }} Operationen laufen...
              </p>

              <!-- Overall Progress -->
              <div v-if="loadingStore.totalProgress > 0" class="mt-2">
                <div class="w-full bg-gray-700 rounded-full h-1">
                  <div
                    class="bg-green-500 h-1 rounded-full transition-all duration-300"
                    :style="{ width: `${loadingStore.totalProgress}%` }"></div>
                </div>
              </div>
            </div>

            <!-- Operation Type Badge -->
            <div class="flex justify-center">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="
                  getOperationTypeClass(loadingStore.primaryOperation.type)
                ">
                <Icon
                  :name="
                    getOperationTypeIcon(loadingStore.primaryOperation.type)
                  "
                  class="w-3 h-3 mr-1" />
                {{ getOperationTypeLabel(loadingStore.primaryOperation.type) }}
              </span>
            </div>

            <!-- Elapsed Time -->
            <p class="text-xs text-gray-500 mt-3">
              {{ formatElapsedTime(loadingStore.primaryOperation.startTime) }}
            </p>
          </div>

          <!-- Fallback for no primary operation -->
          <div v-else class="text-center">
            <div class="flex justify-center mb-4">
              <div
                class="w-16 h-16 rounded-full border-4 border-gray-600 border-t-blue-500 animate-spin"></div>
            </div>
            <h3 class="text-lg font-semibold text-white">Lädt...</h3>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue';
  import type { LoadingOperation } from '~/stores/loading.store';

  const loadingStore = useLoadingStore();

  // Elapsed time tracking
  const elapsedTime = ref(0);
  let intervalId: NodeJS.Timeout | null = null;

  const updateElapsedTime = () => {
    if (loadingStore.primaryOperation) {
      elapsedTime.value = Date.now() - loadingStore.primaryOperation.startTime;
    }
  };

  onMounted(() => {
    intervalId = setInterval(updateElapsedTime, 1000);
  });

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  // Helper functions
  const getOperationTypeClass = (type: LoadingOperation['type']) => {
    const classes = {
      data: 'bg-blue-100 text-blue-800',
      import: 'bg-purple-100 text-purple-800',
      api: 'bg-green-100 text-green-800',
      process: 'bg-orange-100 text-orange-800'
    };
    return classes[type] || classes.api;
  };

  const getOperationTypeIcon = (type: LoadingOperation['type']) => {
    const icons = {
      data: 'heroicons:circle-stack-20-solid',
      import: 'heroicons:arrow-down-tray-20-solid',
      api: 'heroicons:cloud-20-solid',
      process: 'heroicons:cog-6-tooth-20-solid'
    };
    return icons[type] || icons.api;
  };

  const getOperationTypeLabel = (type: LoadingOperation['type']) => {
    const labels = {
      data: 'Daten laden',
      import: 'Import',
      api: 'API-Aufruf',
      process: 'Verarbeitung'
    };
    return labels[type] || labels.api;
  };

  const formatElapsedTime = (startTime: number) => {
    const elapsed = Date.now() - startTime;
    const seconds = Math.floor(elapsed / 1000);

    if (seconds < 60) {
      return `${seconds}s`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    }
  };
</script>
