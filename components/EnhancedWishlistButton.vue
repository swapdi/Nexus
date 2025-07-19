<script setup lang="ts">
  import { computed, ref, watch } from 'vue';

  interface Props {
    gameId: number;
    gameTitle: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'icon' | 'button' | 'floating';
    showText?: boolean;
    showCount?: boolean;
    animated?: boolean;
    mode?: 'wishlist-only' | 'deals-only' | 'both'; // Neuer Modus
    enableITAD?: boolean; // ITAD Deal-Integration aktivieren
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'medium',
    variant: 'icon',
    showText: true,
    showCount: false,
    animated: true,
    mode: 'wishlist-only',
    enableITAD: false
  });

  const wishlistStore = useWishlistStore();
  const dealsStore = useDealsStore();
  const notifyStore = useNotifyStore();
  const isLoading = ref(false);
  const isCheckingDeals = ref(false);
  const hasActiveDeals = ref(false);
  const dealCount = ref(0);

  // Computed für lokalen Wishlist-Status (Performance-Optimierung)
  const isInWishlist = computed(() => {
    return wishlistStore.isInWishlistLocal(props.gameId);
  });

  // Überwache Wishlist-Status für automatische Deal-Checks
  watch(isInWishlist, async newValue => {
    if (newValue && (props.mode === 'deals-only' || props.mode === 'both')) {
      await checkForDeals();
    }
  });

  // Wishlist Toggle mit erweiterten Funktionen
  const handleToggleWishlist = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isLoading.value) return;

    try {
      isLoading.value = true;
      const wasAdded = await wishlistStore.toggleWishlist(props.gameId);

      if (wasAdded) {
        // Erfolgreich zur Wishlist hinzugefügt
        if (props.mode === 'deals-only' || props.mode === 'both') {
          // Deals automatisch nach Hinzufügung zur Wishlist prüfen
          setTimeout(async () => {
            await checkForDeals();
          }, 500);
        }
      }
    } catch (error) {
      console.error('Fehler beim Ändern der Wishlist:', error);
    } finally {
      isLoading.value = false;
    }
  };

  // Deal-Prüfung für ein spezifisches Spiel
  const checkForDeals = async () => {
    if (!props.enableITAD) return;

    try {
      isCheckingDeals.value = true;

      // Suche nach aktuellen Deals für das Spiel
      const deals = await dealsStore.searchGameDeals(
        props.gameId,
        props.gameTitle
      );

      // Filtere relevante Deals (mit Rabatt oder kostenlos)
      const relevantDeals = deals.filter(
        deal =>
          deal.isFreebie || (deal.discountPercent && deal.discountPercent > 0)
      );

      if (relevantDeals.length > 0) {
        hasActiveDeals.value = true;
        dealCount.value = relevantDeals.length;

        // Sende Notification über gefundene Deals
        const freeDeals = relevantDeals.filter(d => d.isFreebie);
        const discountDeals = relevantDeals.filter(d => !d.isFreebie);

        let message = `🎮 ${props.gameTitle}: `;
        if (freeDeals.length > 0) {
          message += `${freeDeals.length} kostenlose${
            freeDeals.length === 1 ? 's' : ''
          } Angebot${freeDeals.length === 1 ? '' : 'e'}`;
          if (discountDeals.length > 0) {
            message += ` und ${discountDeals.length} reduzierte${
              discountDeals.length === 1 ? 's' : ''
            } Angebot${discountDeals.length === 1 ? '' : 'e'}`;
          }
        } else if (discountDeals.length > 0) {
          message += `${discountDeals.length} reduzierte${
            discountDeals.length === 1 ? 's' : ''
          } Angebot${discountDeals.length === 1 ? '' : 'e'}`;
        }
        message += ` gefunden!`;

        notifyStore.notify(message, 1); // Success notification
      } else {
        hasActiveDeals.value = false;
        dealCount.value = 0;
      }
    } catch (error) {
      console.error('Fehler beim Prüfen der Deals:', error);
      hasActiveDeals.value = false;
      dealCount.value = 0;
    } finally {
      isCheckingDeals.value = false;
    }
  };

  // Manueller Deal-Check
  const handleCheckDeals = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isCheckingDeals.value) return;
    await checkForDeals();
  };

  // Style-Varianten
  const buttonClasses = computed(() => {
    const baseClasses =
      'relative flex items-center justify-center transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 group/wishlist';

    const sizeClasses = {
      small: 'p-1.5',
      medium: 'p-2',
      large: 'p-3'
    };

    const variantClasses = {
      icon: 'rounded-full',
      button: 'rounded-lg px-3 py-2',
      floating: 'rounded-full shadow-lg',
      detailed: 'rounded-lg px-4 py-3 flex-col gap-1'
    };

    // Enhanced state classes für verschiedene Modi
    let stateClasses = '';
    if (props.mode === 'wishlist-only') {
      stateClasses = isInWishlist.value
        ? 'bg-red-600/80 hover:bg-red-600 text-white'
        : 'bg-gray-700/80 hover:bg-purple-600/80 text-gray-300 hover:text-white';
    } else if (props.mode === 'deals-only') {
      stateClasses = hasActiveDeals.value
        ? 'bg-green-600/80 hover:bg-green-600 text-white'
        : 'bg-gray-700/80 hover:bg-green-600/80 text-gray-300 hover:text-white';
    } else {
      // both mode
      if (isInWishlist.value && hasActiveDeals.value) {
        stateClasses =
          'bg-gradient-to-r from-red-600/80 to-green-600/80 hover:from-red-600 hover:to-green-600 text-white';
      } else if (isInWishlist.value) {
        stateClasses = 'bg-red-600/80 hover:bg-red-600 text-white';
      } else if (hasActiveDeals.value) {
        stateClasses = 'bg-green-600/80 hover:bg-green-600 text-white';
      } else {
        stateClasses =
          'bg-gray-700/80 hover:bg-purple-600/80 text-gray-300 hover:text-white';
      }
    }

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

  const primaryIconName = computed(() => {
    if (props.mode === 'wishlist-only') {
      return isInWishlist.value ? 'heroicons:heart-solid' : 'heroicons:heart';
    } else if (props.mode === 'deals-only') {
      return hasActiveDeals.value ? 'heroicons:tag-solid' : 'heroicons:tag';
    } else {
      // both mode
      if (isInWishlist.value) {
        return 'heroicons:heart-solid';
      }
      return 'heroicons:heart';
    }
  });

  const secondaryIconName = computed(() => {
    if (props.mode === 'both' && hasActiveDeals.value) {
      return 'heroicons:tag-solid';
    }
    return null;
  });

  const buttonText = computed(() => {
    if (props.mode === 'wishlist-only') {
      return isInWishlist.value
        ? 'Aus Wishlist entfernen'
        : 'Zur Wishlist hinzufügen';
    } else if (props.mode === 'deals-only') {
      return hasActiveDeals.value
        ? `${dealCount.value} Deal${dealCount.value === 1 ? '' : 's'} gefunden`
        : 'Nach Deals suchen';
    } else {
      // both mode
      if (isInWishlist.value && hasActiveDeals.value) {
        return `In Wishlist • ${dealCount.value} Deal${
          dealCount.value === 1 ? '' : 's'
        }`;
      } else if (isInWishlist.value) {
        return 'In Wishlist';
      } else if (hasActiveDeals.value) {
        return `${dealCount.value} Deal${
          dealCount.value === 1 ? '' : 's'
        } verfügbar`;
      }
      return 'Zur Wishlist';
    }
  });

  // Wishlist-Anzahl (falls gewünscht)
  const wishlistCount = computed(() => {
    return wishlistStore.wishlistCount;
  });

  // Button-Handler basierend auf Modus
  const handleButtonClick = async (event: Event) => {
    if (props.mode === 'wishlist-only') {
      await handleToggleWishlist(event);
    } else if (props.mode === 'deals-only') {
      await handleCheckDeals(event);
    } else {
      // both mode
      await handleToggleWishlist(event);
    }
  };
</script>

<template>
  <button
    :class="buttonClasses"
    :title="buttonText"
    :disabled="isLoading || isCheckingDeals"
    @click="handleButtonClick">
    <!-- Loading Icon -->
    <Icon
      v-if="isLoading || isCheckingDeals"
      name="heroicons:arrow-path"
      :class="[iconClasses, 'animate-spin']" />

    <!-- Primary Icon -->
    <Icon
      v-else
      :name="primaryIconName"
      :class="[
        iconClasses,
        animated && isInWishlist && props.mode !== 'deals-only'
          ? 'animate-pulse'
          : '',
        secondaryIconName ? 'mr-1' : ''
      ]" />

    <!-- Secondary Icon (für both mode mit Deals) -->
    <Icon
      v-if="secondaryIconName && !isLoading && !isCheckingDeals"
      :name="secondaryIconName"
      :class="[iconClasses, 'ml-1 animate-pulse']" />

    <!-- Text für Button-Variante -->
    <span v-if="showText && variant === 'button'" class="ml-2 text-sm">
      {{ buttonText }}
    </span>

    <!-- Deal Counter Badge -->
    <div
      v-if="hasActiveDeals && dealCount > 0 && variant === 'floating'"
      class="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
      {{ dealCount > 99 ? '99+' : dealCount }}
    </div>

    <!-- Wishlist Counter Badge -->
    <div
      v-else-if="showCount && wishlistCount > 0"
      class="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {{ wishlistCount > 99 ? '99+' : wishlistCount }}
    </div>
  </button>
</template>
