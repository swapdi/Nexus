<template>
  <div
    v-if="isOpen"
    @click="closeModal"
    class="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div
      @click.stop
      class="relative max-w-7xl w-full h-full flex items-center justify-center">
      <!-- Close Button -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300">
        <Icon name="heroicons:x-mark-20-solid" class="w-6 h-6" />
      </button>

      <!-- Navigation Buttons -->
      <button
        v-if="items.length > 1"
        @click="previousItem"
        class="absolute left-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300">
        <Icon name="heroicons:chevron-left-20-solid" class="w-6 h-6" />
      </button>

      <button
        v-if="items.length > 1"
        @click="nextItem"
        class="absolute right-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300">
        <Icon name="heroicons:chevron-right-20-solid" class="w-6 h-6" />
      </button>

      <!-- Media Content -->
      <div class="relative w-full h-full flex items-center justify-center">
        <!-- Video Player -->
        <div
          v-if="currentItem && isVideo(currentItem)"
          class="relative w-full max-w-5xl aspect-video">
          <iframe
            :src="getYouTubeEmbedUrl(currentItem)"
            class="w-full h-full rounded-lg"
            frameborder="0"
            allowfullscreen
            allow="autoplay; encrypted-media">
          </iframe>
        </div>

        <!-- Image Viewer -->
        <img
          v-else-if="currentItem"
          :src="currentItem"
          :alt="`Media ${currentIndex + 1}`"
          class="max-w-full max-h-full object-contain rounded-lg" />
      </div>

      <!-- Thumbnail Navigation -->
      <div
        v-if="items.length > 1"
        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 rounded-lg p-2">
        <button
          v-for="(item, index) in items"
          :key="index"
          @click="currentIndex = index"
          :class="{
            'ring-2 ring-blue-400': index === currentIndex
          }"
          class="w-16 h-12 rounded overflow-hidden transition-all duration-300 hover:scale-110">
          <!-- Video Thumbnail -->
          <div
            v-if="isVideo(item)"
            class="w-full h-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
            <Icon name="heroicons:play-20-solid" class="w-6 h-6 text-white" />
          </div>
          <!-- Image Thumbnail -->
          <img
            v-else
            :src="item"
            :alt="`Thumbnail ${index + 1}`"
            class="w-full h-full object-cover" />
        </button>
      </div>

      <!-- Media Counter -->
      <div
        v-if="items.length > 1"
        class="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {{ currentIndex + 1 }} / {{ items.length }}
      </div>

      <!-- Media Type Indicator -->
      <div
        class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
        <Icon
          :name="
            isVideo(currentItem)
              ? 'heroicons:play-circle-20-solid'
              : 'heroicons:photo-20-solid'
          "
          class="w-4 h-4" />
        {{ isVideo(currentItem) ? 'Video' : 'Screenshot' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    items: string[];
    initialIndex?: number;
    isOpen: boolean;
  }

  interface Emits {
    (e: 'close'): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    initialIndex: 0
  });

  const emit = defineEmits<Emits>();

  const currentIndex = ref(props.initialIndex);
  const currentItem = computed(() => props.items[currentIndex.value]);

  // Reset index when items change
  watch(
    () => props.items,
    () => {
      if (currentIndex.value >= props.items.length) {
        currentIndex.value = 0;
      }
    }
  );

  // Reset index when modal opens
  watch(
    () => props.isOpen,
    isOpen => {
      if (isOpen) {
        currentIndex.value = props.initialIndex;
      }
    }
  );

  const isVideo = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string): string => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  const nextItem = () => {
    currentIndex.value = (currentIndex.value + 1) % props.items.length;
  };

  const previousItem = () => {
    currentIndex.value =
      currentIndex.value === 0
        ? props.items.length - 1
        : currentIndex.value - 1;
  };

  const closeModal = () => {
    emit('close');
  };

  // Keyboard Navigation
  const handleKeydown = (event: KeyboardEvent) => {
    if (!props.isOpen) return;

    switch (event.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        if (props.items.length > 1) previousItem();
        break;
      case 'ArrowRight':
        if (props.items.length > 1) nextItem();
        break;
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
  });
</script>

<style scoped>
  /* Smooth transitions */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }

  /* Prevent scrolling when modal is open */
  :global(body.modal-open) {
    overflow: hidden;
  }
</style>
