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
        v-if="loadingStore.isLoading"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div
          class="bg-gray-800 rounded-xl border border-gray-700 p-8 max-w-sm w-full mx-4 shadow-2xl">
          <div class="text-center">
            <!-- Loading Icon -->
            <div class="flex justify-center mb-6">
              <div
                class="relative w-16 h-16 rounded-full border-4 border-gray-600 border-t-purple-500 animate-spin"></div>
            </div>

            <!-- Operation Label -->
            <h3 class="text-xl font-semibold text-white mb-2">
              {{ loadingStore.primaryOperation?.label || 'Lädt...' }}
            </h3>

            <!-- Simple description -->
            <p class="text-gray-400 text-sm">Bitte warten Sie einen Moment</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  const loadingStore = useLoadingStore();
</script>
