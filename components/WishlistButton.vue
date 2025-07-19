<script setup lang="ts">
  import { ref } from 'vue';

  interface Props {
    gameId: number;
    size?: 'small' | 'medium' | 'large';
    variant?: 'icon' | 'button' | 'floating';
    showText?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'medium',
    variant: 'icon',
    showText: true
  });

  const wishlistStore = useWishlistStore();
  const isLoading = ref(false);

  // Computed für lokalen Wishlist-Status (Performance-Optimierung)
  const isInWishlist = computed(() => {
    return wishlistStore.isInWishlistLocal(props.gameId);
  });

  // Wishlist Toggle
  const handleToggleWishlist = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isLoading.value) return;

    try {
      isLoading.value = true;
      await wishlistStore.toggleWishlist(props.gameId);
    } catch (error) {
      console.error('Fehler beim Ändern der Wishlist:', error);
    } finally {
      isLoading.value = false;
    }
  };

  // Style-Varianten
  const buttonClasses = computed(() => {
    const baseClasses =
      'flex items-center justify-center transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50';
    const sizeClasses = {
      small: 'p-1.5',
      medium: 'p-2',
      large: 'p-3'
    };
    const variantClasses = {
      icon: 'rounded-full',
      button: 'rounded-lg px-3 py-2',
      floating: 'rounded-full shadow-lg'
    };

    const stateClasses = isInWishlist.value
      ? 'bg-red-600/80 hover:bg-red-600 text-white'
      : 'bg-gray-700/80 hover:bg-purple-600/80 text-gray-300 hover:text-white';

    return [
      baseClasses,
      sizeClasses[props.size],
      variantClasses[props.variant],
      stateClasses
    ].join(' ');
  });

  const iconClasses = computed(() => {
    const sizeClasses = {
      small: 'w-4 h-4',
      medium: 'w-5 h-5',
      large: 'w-6 h-6'
    };

    return sizeClasses[props.size];
  });

  const iconName = computed(() => {
    return isInWishlist.value ? 'heroicons:heart-solid' : 'heroicons:heart';
  });

  const buttonText = computed(() => {
    return isInWishlist.value
      ? 'Aus Wishlist entfernen'
      : 'Zur Wishlist hinzufügen';
  });
</script>

<template>
  <button
    :class="buttonClasses"
    :title="buttonText"
    :disabled="isLoading"
    @click="handleToggleWishlist">
    <Icon v-if="!isLoading" :name="iconName" :class="iconClasses" />
    <Icon
      v-else
      name="heroicons:arrow-path"
      :class="[iconClasses, 'animate-spin']" />

    <span v-if="showText && variant === 'button'" class="ml-2 text-sm">
      {{ isInWishlist ? 'In Wishlist' : 'Zur Wishlist' }}
    </span>
  </button>
</template>
