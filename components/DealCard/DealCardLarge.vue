<!-- filepath: c:\Users\jgram\git\Nexus\components\DealCard\DealCardLarge.vue -->
<template>
  <div
    class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-green-500/50 transition-all duration-300 group cursor-pointer"
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
        class="absolute top-2 left-2 p-2 bg-black/60 backdrop-blur-sm rounded-lg">
        <!-- Store Banner (falls verfügbar) -->
        <img
          :src="getStoreBannerURL(deal.storeName)"
          :alt="`${deal.storeName} Banner`"
          class="h-6 max-w-[80px] object-contain opacity-90"
          @error="handleStoreBannerError" />
      </div>
      <!-- Discount Badge -->
      <div
        v-if="deal.discountPercent && deal.discountPercent > 0"
        class="absolute top-2 right-2 px-2 py-1 bg-green-600 rounded text-xs text-white font-bold">
        {{ formatDiscount(deal.discountPercent) }}
      </div>
      <!-- Free Badge -->
      <div
        v-if="deal.isFreebie"
        class="absolute top-2 right-2 px-2 py-1 bg-green-600 rounded text-xs text-white font-bold">
        KOSTENLOS
      </div>
      <!-- Library Badge -->
      <div
        v-if="isGameOwned(deal)"
        class="absolute bottom-2 left-2 px-2 py-1 bg-purple-600/80 backdrop-blur-sm rounded text-xs text-white">
        <Icon name="heroicons:check-20-solid" class="w-3 h-3 inline mr-1" />
        Besitzen
      </div>
    </div>
    <!-- Deal Info -->
    <div class="p-4 flex flex-col flex-1">
      <!-- Title and Genres grouped together with fixed height -->
      <div class="mb-3 h-20 flex flex-col">
        <h3
          class="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-green-300 transition-colors">
          {{ deal.title }}
        </h3>

        <!-- Genres - Fixed space for consistent layout -->
        <div class="flex-1 flex items-start">
          <div
            v-if="deal.game.genres && deal.game.genres.length > 0"
            class="flex flex-wrap gap-1">
            <span
              v-for="genre in deal.game.genres.slice(0, 2)"
              :key="genre"
              class="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded-md border border-green-500/30">
              {{ genre }}
            </span>
            <span
              v-if="deal.game.genres.length > 2"
              class="px-2 py-1 bg-gray-600/30 text-gray-400 text-xs rounded-md">
              +{{ deal.game.genres.length - 2 }}
            </span>
          </div>
        </div>
      </div>

      <!-- Spacer to push price to bottom -->
      <div class="flex-1"></div>

      <!-- Price - Fixed at bottom -->
      <div class="mt-auto">
        <div v-if="!deal.isFreebie" class="flex justify-between items-center">
          <span class="text-gray-400">Preis:</span>
          <div class="text-right">
            <div class="text-green-400 font-bold">
              {{ formatPrice(deal.price) }}
            </div>
            <div
              v-if="
                deal.originalPrice && deal.originalPrice > (deal.price || 0)
              "
              class="text-gray-500 line-through text-xs">
              {{ formatPrice(deal.originalPrice) }}
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          <div class="text-green-400 font-bold text-lg">KOSTENLOS</div>
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
  const { getStoreBannerURL } = useStoreUtils();

  const getCoverUrl = (deal: DealWithGame): string => {
    return deal.game.coverUrl || '/gameplaceholder.jpg';
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

  const handleStoreBannerError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    // Fallback zu Store-Name als Text
    img.style.display = 'none';
    const parent = img.parentElement;
    if (parent) {
      parent.innerHTML = `<span class="text-white text-xs font-medium px-2 py-1 bg-gray-600/50 rounded">${img.alt.replace(
        ' Banner',
        ''
      )}</span>`;
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
