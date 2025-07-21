<template>
  <header
    class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
    <div class="relative h-16 flex items-center">
      <!-- Logo - fest positioniert links über der Sidebar -->
      <div
        class="absolute left-0 top-0 flex items-center justify-center w-[78px] h-full">
        <NuxtLink to="/" class="flex items-center group">
          <img
            src="/favicon.ico"
            alt="Nexus"
            class="h-8 w-8 transition-all duration-200 group-hover:scale-105 drop-shadow-lg" />
        </NuxtLink>
      </div>
      <!-- User Section - fest positioniert rechts -->
      <div
        class="absolute right-0 top-0 flex items-center space-x-4 h-full pr-4 sm:pr-6 lg:pr-8">
        <!-- Minimiertes Loading-Icon für blockierende Operationen -->
        <LoadingMinimized />
        <!-- Header Loading-Indikator für non-blocking Operationen -->
        <div
          v-if="hasNonBlockingOperation"
          class="flex items-center space-x-2 px-3 py-1.5 bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/50">
          <!-- Small Loading Spinner -->
          <div
            class="w-4 h-4 rounded-full border-2 border-gray-600 border-t-blue-400 animate-spin"></div>
          <!-- Operation Label -->
          <span class="text-sm text-gray-300 max-w-32 truncate">
            {{ primaryNonBlockingOperation?.label || 'Lädt...' }}
          </span>
          <div
            v-if="nonBlockingOperationCount > 1"
            class="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
            {{ nonBlockingOperationCount }}
          </div>
        </div>
        <UserCredits />
        <UserAccount />
      </div>
      <!-- Hauptinhalt mit Padding für Logo und User Section -->
      <div class="w-full pl-[78px] pr-[200px] h-full flex items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="flex items-center">
            <!-- Global Search -->
            <div class="flex-1 max-w-lg">
              <GlobalSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
  const loadingStore = useLoadingStore();

  // Header Loading-Indikatoren für non-blocking Operationen
  const hasNonBlockingOperation = computed(() => {
    return loadingStore.hasNonBlockingOperation;
  });

  const nonBlockingOperations = computed(() => {
    return loadingStore.operationsList.filter(
      op => op.type === 'api' || op.type === 'data'
    );
  });

  const primaryNonBlockingOperation = computed(() => {
    const ops = nonBlockingOperations.value;
    return ops[0] || null;
  });

  const nonBlockingOperationCount = computed(
    () => nonBlockingOperations.value.length
  );
</script>
<style scoped>
  /* Dunkles Gaming-Header Design */
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(10px);
  }
</style>
