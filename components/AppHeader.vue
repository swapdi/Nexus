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
        class="border-t border-gray-700/50 py-3 transition-all duration-300">
        <div class="max-w-2xl mx-auto">
          <div class="text-sm text-gray-400 mb-2">
            Aktive Hintergrund-Operationen ({{ backgroundOperations.length }})
          </div>
          <div class="space-y-2">
            <div
              v-for="operation in backgroundOperations"
              :key="operation.id"
              class="flex items-center justify-between bg-gray-800/30 rounded-lg p-2">
              <div class="flex items-center space-x-2 flex-1 min-w-0">
                <Icon
                  name="heroicons:arrow-path-20-solid"
                  class="w-3 h-3 text-blue-400 animate-spin flex-shrink-0" />
                <span class="text-xs text-gray-300 truncate">
                  {{ operation.label }}
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-16 bg-gray-700 rounded-full h-1">
                  <div
                    class="bg-blue-500 h-1 rounded-full transition-all duration-300"
                    :style="{ width: `${operation.progress || 0}%` }"></div>
                </div>
                <span class="text-xs text-gray-500">
                  {{ Math.round(operation.progress || 0) }}%
                </span>
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
