<template>
  <nav
    class="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-purple-500/20 shadow-2xl">
    <div class="px-6">
      <div class="flex justify-between items-center h-16">
        <!-- Logo & Titel - ganz links -->
        <div class="flex items-center">
          <NuxtLink to="/dashboard" class="flex items-center space-x-3 group">
            <div class="relative">
              <img
                src="/favicon.ico"
                alt="Nexus Logo"
                class="h-8 w-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
            </div>
            <span
              class="text-2xl font-bold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 transition-all duration-300 group-hover:from-purple-300 group-hover:via-blue-300 group-hover:to-cyan-300">
              Nexus
            </span>
          </NuxtLink>
        </div>

        <!-- Hintergrund-Progress Anzeige (Zentral) -->
        <div
          v-if="backgroundOperations.length > 0"
          class="flex-1 max-w-md mx-8 transition-all duration-300">
          <div
            class="bg-gray-800/50 rounded-full p-2 border border-gray-700/50">
            <div class="flex items-center space-x-2">
              <Icon
                name="heroicons:arrow-path-20-solid"
                class="w-4 h-4 text-blue-400 animate-spin flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="text-xs text-gray-300 truncate">
                  {{
                    currentBackgroundOperation?.label || 'Verarbeitung läuft...'
                  }}
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2 mt-1">
                  <div
                    class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${backgroundProgress}%` }"></div>
                </div>
              </div>
              <button
                @click="showBackgroundDetails = !showBackgroundDetails"
                class="text-gray-400 hover:text-gray-300 p-1 rounded transition-colors">
                <Icon
                  :name="
                    showBackgroundDetails
                      ? 'heroicons:chevron-up-20-solid'
                      : 'heroicons:chevron-down-20-solid'
                  "
                  class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Avatar & Dropdown Menü - ganz rechts -->
        <div class="flex items-center space-x-4">
          <!-- User Credits -->
          <UserCredits />

          <!-- User Account -->
          <UserAccount />
        </div>
      </div>
      <!-- Erweiterte Hintergrund-Details -->
      <div
        v-if="showBackgroundDetails && backgroundOperations.length > 0"
        class="border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm transition-all duration-300">
        <div class="py-4 px-6">
          <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <div
                    class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div
                    class="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-30"></div>
                </div>
                <h3 class="text-lg font-semibold text-white">
                  Hintergrund-Operationen
                </h3>
                <span
                  class="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full">
                  {{ backgroundOperations.length }} aktiv
                </span>
              </div>
              <div class="text-sm text-gray-400">
                Gesamt-Fortschritt: {{ Math.round(backgroundProgress) }}%
              </div>
            </div>

            <!-- Overall Progress Bar -->
            <div class="mb-4">
              <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  class="h-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-500 ease-out"
                  :style="{ width: `${backgroundProgress}%` }">
                  <div
                    class="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Operations List -->
            <div class="space-y-3">
              <div
                v-for="operation in backgroundOperations"
                :key="operation.id"
                class="group relative bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/50 hover:border-gray-600/50 rounded-xl p-4 transition-all duration-200">
                <!-- Operation Header -->
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div class="relative flex-shrink-0">
                      <Icon
                        :name="getOperationIcon(operation)"
                        class="w-5 h-5 text-blue-400 animate-spin" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm font-medium text-white truncate">
                        {{ operation.label }}
                      </h4>
                      <p class="text-xs text-gray-400 mt-1">
                        {{ getOperationTypeLabel(operation.type) }}
                      </p>
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <div class="text-sm font-medium text-white">
                      {{ Math.round(operation.progress || 0) }}%
                    </div>
                    <div class="text-xs text-gray-400">
                      {{ formatElapsedTime(operation.startTime) }}
                    </div>
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="mb-2">
                  <div
                    class="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      class="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                      :style="{ width: `${operation.progress || 0}%` }">
                      <div
                        class="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <!-- Additional Details -->
                <div
                  class="flex items-center justify-between text-xs text-gray-500">
                  <div class="flex items-center space-x-4">
                    <span v-if="operation.current && operation.total">
                      {{ operation.current }} / {{ operation.total }}
                    </span>
                    <span
                      class="inline-flex items-center px-2 py-1 rounded-full bg-gray-700/50">
                      <span
                        class="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                      Läuft
                    </span>
                  </div>
                </div>

                <!-- Hover Effect -->
                <div
                  class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  const loadingStore = useLoadingStore();
  const showBackgroundDetails = ref(false);

  // Hintergrund-Operationen filtern (alles außer regulären UI-Operationen)
  const backgroundOperations = computed(() => {
    return loadingStore.operationsList.filter(
      op =>
        op.type === 'import' ||
        op.type === 'process' ||
        op.id.includes('enrichment') ||
        op.id.includes('background')
    );
  });

  const currentBackgroundOperation = computed(() => {
    return backgroundOperations.value[0] || null;
  });
  const backgroundProgress = computed(() => {
    if (backgroundOperations.value.length === 0) return 0;

    const operations = backgroundOperations.value;
    const withProgress = operations.filter(op => op.progress !== undefined);

    if (withProgress.length === 0) return 0;

    return (
      withProgress.reduce((sum, op) => sum + (op.progress || 0), 0) /
      withProgress.length
    );
  });

  // Helper functions for operation details
  const getOperationIcon = (operation: any) => {
    const icons = {
      data: 'heroicons:circle-stack-20-solid',
      import: 'heroicons:arrow-down-tray-20-solid',
      api: 'heroicons:cloud-20-solid',
      process: 'heroicons:cog-6-tooth-20-solid'
    };
    return (
      icons[operation.type as keyof typeof icons] ||
      'heroicons:arrow-path-20-solid'
    );
  };

  const getOperationTypeLabel = (type: string) => {
    const labels = {
      data: 'Daten laden',
      import: 'Import',
      api: 'API-Aufruf',
      process: 'Verarbeitung'
    };
    return labels[type as keyof typeof labels] || 'Operation';
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

<style scoped>
  /* Glow-Effekt für das Logo */
  .group:hover .group-hover\:scale-110 {
    filter: drop-shadow(0 0 8px rgba(147, 51, 234, 0.4));
  }
  /* Smooth gradient animation */
  @keyframes gradient-shift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
</style>
