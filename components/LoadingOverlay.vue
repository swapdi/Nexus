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
        v-if="loadingStore.hasBlockingOperation && !loadingStore.isMinimized"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div
          class="bg-gray-800 rounded-xl border border-gray-700 p-8 max-w-sm w-full mx-4 shadow-2xl relative">
          <!-- Minimize Button für blockierende Operationen -->
          <button
            v-if="loadingStore.hasBlockingOperation"
            @click="loadingStore.minimize()"
            class="absolute top-4 right-4 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all group"
            title="Minimieren">
            <svg
              class="w-4 h-4 transition-transform group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 12H4" />
            </svg>
          </button>

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
            <!-- Description mit Minimieren-Hinweis für blockierende Operationen -->
            <p class="text-gray-400 text-sm">
              {{
                loadingStore.hasBlockingOperation
                  ? 'Dieser Vorgang kann einige Zeit dauern. Sie können ihn minimieren und weiterarbeiten.'
                  : 'Bitte warten Sie einen Moment'
              }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  const loadingStore = useLoadingStore();
</script>
