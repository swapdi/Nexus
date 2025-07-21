<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="scale-0 opacity-0"
    enter-to-class="scale-100 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="scale-100 opacity-100"
    leave-to-class="scale-0 opacity-0">
    <div
      v-if="loadingStore.hasBlockingOperation && loadingStore.isMinimized"
      class="flex items-center space-x-2 cursor-pointer group"
      @click="loadingStore.maximize()"
      title="Laufende Operation anzeigen">
      <!-- Loading Spinner -->
      <div
        class="relative w-6 h-6 rounded-full border-2 border-gray-600 border-t-purple-500 animate-spin group-hover:border-t-purple-400 transition-colors"></div>

      <!-- Operation Label -->
      <span
        class="text-sm text-gray-300 group-hover:text-white transition-colors truncate max-w-32">
        {{ loadingStore.primaryOperation?.label || 'Lädt...' }}
      </span>

      <!-- Expand Icon -->
      <svg
        class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7l4-4m0 0l4 4m-4-4v18" />
      </svg>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  const loadingStore = useLoadingStore();
</script>
