<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/70 backdrop-blur-sm"
      @click="onCancel"></div>

    <!-- Modal -->
    <div
      class="relative bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md mx-4 w-full">
      <!-- Header -->
      <div class="flex items-center mb-4">
        <Icon :name="iconName" :class="iconClass" class="w-8 h-8 mr-3" />
        <h3 class="text-xl font-semibold text-white">
          {{ title }}
        </h3>
      </div>

      <!-- Message -->
      <p class="text-gray-300 mb-6">
        {{ message }}
      </p>

      <!-- Hint -->
      <div
        v-if="hint"
        class="text-sm text-gray-400 mb-6 p-3 bg-gray-700/50 rounded-lg">
        <Icon
          name="heroicons:information-circle-20-solid"
          class="w-4 h-4 inline mr-1" />
        <strong>Hinweis:</strong> {{ hint }}
      </div>

      <!-- Actions -->
      <div class="flex space-x-3">
        <button
          @click="onCancel"
          class="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
          {{ cancelText }}
        </button>
        <button
          @click="onConfirm"
          :disabled="isLoading"
          :class="[
            'flex-1 px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center',
            confirmButtonClass
          ]">
          <Icon
            v-if="isLoading"
            name="heroicons:arrow-path-20-solid"
            class="w-4 h-4 animate-spin mr-2" />
          {{ isLoading ? loadingText : confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    isVisible: boolean;
    title: string;
    message: string;
    hint?: string;
    iconName?: string;
    iconClass?: string;
    confirmText?: string;
    cancelText?: string;
    loadingText?: string;
    confirmButtonClass?: string;
    isLoading?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    iconName: 'heroicons:exclamation-triangle-20-solid',
    iconClass: 'text-red-400',
    confirmText: 'Bestätigen',
    cancelText: 'Abbrechen',
    loadingText: 'Wird bearbeitet...',
    confirmButtonClass: 'bg-red-600 hover:bg-red-700 disabled:bg-red-600/50',
    isLoading: false
  });

  const emit = defineEmits<{
    confirm: [];
    cancel: [];
  }>();

  const onConfirm = () => {
    emit('confirm');
  };

  const onCancel = () => {
    emit('cancel');
  };

  // ESC-Taste zum Schließen
  onMounted(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && props.isVisible) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape);
    });
  });
</script>
