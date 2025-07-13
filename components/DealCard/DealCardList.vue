<!-- filepath: c:\Users\jgram\git\Nexus\components\DealCard\DealCardList.vue -->
<template>
  <div
    class="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4 hover:border-green-500/50 transition-all duration-300 group cursor-pointer"
    @click="handleClick">
    <div class="flex items-center gap-4">
      <!-- Cover Image -->
      <div
        class="flex-shrink-0 w-16 h-20 bg-gray-700/50 rounded-lg overflow-hidden">
        <img
          :src="getCoverUrl(deal)"
          :alt="deal.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          @error="handleImageError" />
      </div>

      <!-- Deal Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-4">
          <!-- Title and Info -->
          <div class="flex-1 min-w-0">
            <h3
              class="font-semibold text-white text-lg line-clamp-1 group-hover:text-green-300 transition-colors">
              {{ deal.title }}
            </h3>

            <div class="flex items-center gap-4 mt-1 text-sm text-gray-400">
              <span>{{ deal.storeName }}</span>
              <span>{{ getGenreDisplay(deal) }}</span>
              <span
                v-if="isGameOwned(deal)"
                class="text-purple-300 flex items-center gap-1">
                <Icon name="heroicons:check-20-solid" class="w-3 h-3" />
                Besitzen
              </span>
            </div>
          </div>

          <!-- Price Section -->
          <div class="flex-shrink-0 text-right">
            <div v-if="!deal.isFreebie" class="space-y-1">
              <div class="text-green-400 font-bold text-xl">
                {{ formatPrice(deal.price) }}
              </div>
              <div
                v-if="
                  deal.originalPrice && deal.originalPrice > (deal.price || 0)
                "
                class="flex items-center gap-2">
                <span class="text-gray-500 line-through text-sm">
                  {{ formatPrice(deal.originalPrice) }}
                </span>
                <span
                  class="px-2 py-1 bg-green-600 rounded text-xs text-white font-bold">
                  {{ formatDiscount(deal.discountPercent || 0) }}
                </span>
              </div>
            </div>
            <div v-else>
              <div class="text-green-400 font-bold text-xl">KOSTENLOS</div>
              <div
                class="px-2 py-1 bg-green-600 rounded text-xs text-white font-bold">
                100% OFF
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex-shrink-0 flex items-center gap-2">
            <button
              v-if="!isGameOwned(deal)"
              @click.stop="handleClick"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
              {{ deal.isFreebie ? 'Kostenlos holen' : 'Deal ansehen' }}
            </button>
            <button
              v-else
              disabled
              class="px-4 py-2 bg-gray-600 text-gray-300 font-medium rounded-lg cursor-not-allowed">
              In Bibliothek
            </button>
          </div>
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

  const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    img.src = '/gameplaceholder.jpg';
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
</style>
