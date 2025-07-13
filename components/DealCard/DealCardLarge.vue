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
        <Icon
          :name="getStoreIcon(deal.storeName)"
          class="w-5 h-5 text-white"
          :title="deal.storeName" />
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
      <h3
        class="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-green-300 transition-colors">
        {{ deal.title }}
      </h3>

      <!-- Genres -->
      <div
        v-if="deal.game.genres && deal.game.genres.length > 0"
        class="flex flex-wrap gap-1 mb-3">
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

      <!-- Spacer to push price and button to bottom -->
      <div class="flex-1"></div>

      <div class="space-y-2">
        <!-- Preise -->
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

        <!-- Action Buttons -->
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
  import { CheapSharkService } from '~/lib/services/cheapshark.service';
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
  const getStoreIcon = (storeName: string): string => {
    // Store Namen zu IDs mapping (vereinfacht)
    const storeNameToId: Record<string, string> = {
      Steam: '1',
      GamersGate: '2',
      'Green Man Gaming': '3',
      GOG: '7',
      Origin: '8',
      'Humble Store': '11',
      Uplay: '13',
      Fanatical: '15',
      WinGameStore: '21',
      GameBillet: '23',
      'Epic Games Store': '25',
      Gamesplanet: '27',
      Gamesload: '28',
      SquareEnix: '29',
      'Razer Game Store': '30',
      'Gamesplanet FR': '31',
      'Gamesplanet DE': '32',
      'Gamesplanet UK': '33',
      Battlenet: '34',
      Voidu: '35'
    };

    const storeId = storeNameToId[storeName];
    return storeId ? CheapSharkService.getStoreIcon(storeId) : 'mdi:store';
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
