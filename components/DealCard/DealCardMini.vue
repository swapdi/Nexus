<!-- filepath: c:\Users\jgram\git\Nexus\components\DealCard\DealCardMini.vue -->
<template>
  <div
    class="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden hover:border-green-500/50 transition-all duration-300 group cursor-pointer flex flex-col h-full"
    @click="handleClick">
    <!-- Cover Image -->
    <div class="relative aspect-[2/1] overflow-hidden">
      <img
        :src="getCoverUrl(deal)"
        :alt="deal.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        @error="handleImageError" />
      <!-- Store Badge -->
      <div
        class="absolute top-0.5 left-0.5 w-6 h-4 bg-black/60 backdrop-blur-sm rounded flex items-center justify-center">
        <img
          :src="getStoreLogoURL(deal.storeName)"
          :alt="`${deal.storeName} Logo`"
          class="max-w-full max-h-full object-contain opacity-90"
          @error="handleStoreLogoError" />
      </div>
      <!-- Discount Badge -->
      <div
        v-if="deal.discountPercent && deal.discountPercent > 0"
        class="absolute top-0.5 right-0.5 px-1 py-0.5 bg-green-600 rounded text-xs text-white font-bold leading-none">
        {{ Math.round(deal.discountPercent) }}%
      </div>
      <!-- Free Badge -->
      <div
        v-if="deal.isFreebie"
        class="absolute top-0.5 right-0.5 px-1 py-0.5 bg-green-600 rounded text-xs text-white font-bold leading-none">
        FREI
      </div>
      <!-- Library Badge -->
      <div
        v-if="isGameOwned(deal)"
        class="absolute bottom-0.5 left-0.5 w-4 h-4 bg-purple-600/80 backdrop-blur-sm rounded flex items-center justify-center">
        <Icon name="heroicons:check-20-solid" class="w-2.5 h-2.5 text-white" />
      </div>
    </div>
    <!-- Deal Info -->
    <div class="p-1.5 flex flex-col flex-1">
      <!-- Title -->
      <div class="my-1">
        <h3
          class="font-medium text-white text-xs line-clamp-2 group-hover:text-green-300 transition-colors">
          {{ deal.title }}
        </h3>
      </div>

      <!-- Rating -->
      <div v-if="deal.rating && deal.rating > 0" class="mb-1">
        <div class="flex items-center justify-center space-x-1">
          <Icon
            name="heroicons:star-16-solid"
            class="w-2.5 h-2.5 text-yellow-400" />
          <span class="text-yellow-400 font-medium text-xs">{{
            deal.rating.toFixed(1)
          }}</span>
        </div>
      </div>

      <!-- Spacer to push price to bottom -->
      <div class="flex-1"></div>

      <!-- Price - Fixed at bottom -->
      <div class="mt-auto">
        <div v-if="!deal.isFreebie" class="text-xs">
          <div class="text-green-400 font-bold">
            {{ formatPrice(deal.price) }}
          </div>
          <div
            v-if="deal.originalPrice && deal.originalPrice > (deal.price || 0)"
            class="text-gray-500 line-through leading-none">
            {{ formatPrice(deal.originalPrice) }}
          </div>
        </div>
        <div v-else class="text-xs text-green-400 font-bold">KOSTENLOS</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { DealWithGame } from '~/lib/services/deals.service';
  interface Props {
    deal: DealWithGame;
  }
  interface Emits {
    (e: 'click'): void;
    (e: 'wishlist'): void;
  }
  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const dealsStore = useDealsStore();
  const { getStoreLogoURL } = useStoreUtils();
  const getCoverUrl = (deal: DealWithGame): string => {
    // Grund: Thumbnail aus Deal verwenden, falls vorhanden, sonst Game Cover
    if (deal.thumb) {
      return deal.thumb;
    }
    return deal?.game?.coverUrl || '/gameplaceholder.jpg';
  };

  const isGameOwned = (deal: DealWithGame): boolean => {
    // Prüfe ob das Spiel in der Bibliothek des Users vorhanden ist
    const gamesStore = useGamesStore();
    if (!deal.game) return false;
    return gamesStore.games.some(
      (userGame: any) => userGame.gameId === deal.gameId
    );
  };

  const formatPrice = (price: number | null): string => {
    return dealsStore.formatPrice(price);
  };
  const handleClick = () => {
    emit('click');
  };
  const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.src = '/gameplaceholder.jpg';
  };

  const handleStoreLogoError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    // Fallback zu Icon bei Store-Logo-Fehler
    img.style.display = 'none';
    const parent = img.parentElement;
    if (parent) {
      parent.innerHTML = `<div class="w-2.5 h-2.5 bg-gray-400 rounded-sm" title="${img.alt.replace(
        ' Logo',
        ''
      )}"></div>`;
    }
  };
</script>
<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
  }
</style>
