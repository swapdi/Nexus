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
        class="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white">
        {{ deal.storeName }}
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

      <!-- Wishlist Button -->
      <div class="absolute bottom-2 right-2">
        <button
          @click.stop="handleWishlist"
          class="w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/90 flex items-center justify-center transition-all duration-200 group/wishlist">
          <Icon
            name="heroicons:heart-20-solid"
            class="w-4 h-4 text-gray-400 group-hover/wishlist:text-red-400 group-hover/wishlist:scale-105 transition-all duration-200" />
        </button>
      </div>
    </div>

    <!-- Deal Info -->
    <div class="p-4">
      <h3
        class="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-green-300 transition-colors">
        {{ deal.title }}
      </h3>

      <div class="space-y-2 text-sm">
        <div class="flex justify-between items-center">
          <span class="text-gray-400">Genre:</span>
          <span class="text-gray-300">{{ getGenreDisplay(deal) }}</span>
        </div>

        <!-- Preise -->
        <div class="space-y-1">
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

      <!-- Action Buttons -->
      <div class="mt-4 space-y-2">
        <button
          v-if="!isGameOwned(deal)"
          @click.stop="handleClick"
          class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
          {{ deal.isFreebie ? 'Kostenlos holen' : 'Deal ansehen' }}
        </button>
        <button
          v-else
          disabled
          class="w-full px-4 py-2 bg-gray-600 text-gray-300 font-medium rounded-lg cursor-not-allowed">
          Bereits in Bibliothek
        </button>
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

  const getCoverUrl = (deal: DealWithGame): string => {
    return deal.game.coverUrl || '/gameplaceholder.jpg';
  };

  const getGenreDisplay = (deal: DealWithGame): string => {
    return deal.game.genres.slice(0, 2).join(', ') || 'Unbekannt';
  };

  const isGameOwned = (deal: DealWithGame): boolean => {
    // TODO: Implement ownership check against user's library
    return false;
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

  const handleWishlist = () => {
    emit('wishlist');
  };

  const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.src = '/gameplaceholder.jpg';
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
