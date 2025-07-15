<!-- filepath: c:\Users\jgram\git\Nexus\components\DealCard\DealCardMedium.vue -->
<template>
  <div
    class="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden hover:border-green-500/50 transition-all duration-300 group cursor-pointer flex flex-col h-full"
    @click="handleClick">
    <!-- Cover Image -->
    <div class="relative aspect-[3/4] overflow-hidden">
      <img
        :src="getCoverUrl(deal)"
        :alt="deal.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        @error="handleImageError" />
      <!-- Store Badge -->
      <div
        class="absolute top-1 left-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-xs text-white flex items-center gap-1">
        <img
          :src="getStoreLogoURL(deal.storeName)"
          :alt="`${deal.storeName} Logo`"
          class="w-3 h-3 object-contain"
          @error="handleStoreLogoError" />
        <span class="font-medium">{{ deal.storeName }}</span>
      </div>
      <!-- Discount Badge -->
      <div
        v-if="deal.discountPercent && deal.discountPercent > 0"
        class="absolute top-1 right-1 px-1.5 py-0.5 bg-green-600 rounded text-xs text-white font-bold">
        {{ formatDiscount(deal.discountPercent) }}
      </div>
      <!-- Free Badge -->
      <div
        v-if="deal.isFreebie"
        class="absolute top-1 right-1 px-1.5 py-0.5 bg-green-600 rounded text-xs text-white font-bold">
        FREE
      </div>
      <!-- Library Badge -->
      <div
        v-if="isGameOwned(deal)"
        class="absolute bottom-1 left-1 px-1.5 py-0.5 bg-purple-600/80 backdrop-blur-sm rounded text-xs text-white">
        <Icon name="heroicons:check-20-solid" class="w-3 h-3 inline" />
      </div>
    </div>
    <!-- Deal Info -->
    <div class="p-2 flex flex-col flex-1">
      <!-- Title and Genre grouped together -->
      <div class="mb-2">
        <h3
          class="font-medium text-white text-sm line-clamp-2 group-hover:text-green-300 transition-colors mb-1">
          {{ deal.title }}
        </h3>
        <!-- Genre - Always render div to maintain consistent spacing -->
        <div class="text-gray-400 line-clamp-1 text-xs min-h-[1rem]">
          {{ getGenreDisplay(deal) }}
        </div>
      </div>

      <!-- Spacer to push price to bottom -->
      <div class="flex-1 min-h-4"></div>

      <!-- Price - Fixed at bottom -->
      <div class="mt-auto">
        <div
          v-if="!deal.isFreebie"
          class="flex justify-between items-center text-xs">
          <div class="text-green-400 font-bold">
            {{ formatPrice(deal.price) }}
          </div>
          <div
            v-if="deal.originalPrice && deal.originalPrice > (deal.price || 0)"
            class="text-gray-500 line-through">
            {{ formatPrice(deal.originalPrice) }}
          </div>
        </div>
        <div v-else class="text-center">
          <div class="text-green-400 font-bold text-xs">KOSTENLOS</div>
        </div>
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
    return deal?.game?.coverUrl || '/gameplaceholder.jpg';
  };

  const getGenreDisplay = (deal: DealWithGame): string => {
    return deal?.game?.genres.slice(0, 1).join(', ') || 'Unbekannt';
  };
  const isGameOwned = (deal: DealWithGame): boolean => {
    // Prüfe ob das Spiel in der Bibliothek des Users vorhanden ist
    const gamesStore = useGamesStore();
    return gamesStore.games.some(
      (userGame: any) => userGame.gameId === deal.gameId
    );
  };
  const formatPrice = (price: number | null): string => {
    return dealsStore.formatPrice(price);
  };
  const formatDiscount = (discount: number): string => {
    return dealsStore.formatDiscount(discount);
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
    // Fallback zu Store-Name ohne Logo
    img.style.display = 'none';
  };
</script>
<style scoped>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 1;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
  }
</style>
