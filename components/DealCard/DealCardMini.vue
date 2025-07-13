<!-- filepath: c:\Users\jgram\git\Nexus\components\DealCard\DealCardMini.vue -->
<template>
  <div
    class="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden hover:border-green-500/50 transition-all duration-300 group cursor-pointer"
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
        class="absolute top-0.5 left-0.5 w-4 h-4 bg-black/60 backdrop-blur-sm rounded flex items-center justify-center">
        <Icon
          :name="getStoreIcon(deal.storeName)"
          class="w-2.5 h-2.5 text-white"
          :title="deal.storeName" />
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
    <div class="p-1.5">
      <h3
        class="font-medium text-white text-xs mb-1 line-clamp-2 group-hover:text-green-300 transition-colors">
        {{ deal.title }}
      </h3>
      <!-- Price -->
      <div v-if="!deal.isFreebie" class="text-xs">
        <div class="text-green-400 font-bold">
          {{ formatPriceShort(deal.price) }}
        </div>
        <div
          v-if="deal.originalPrice && deal.originalPrice > (deal.price || 0)"
          class="text-gray-500 line-through leading-none">
          {{ formatPriceShort(deal.originalPrice) }}
        </div>
      </div>
      <div v-else class="text-xs text-green-400 font-bold">KOSTENLOS</div>
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
  const formatPriceShort = (price: number | null): string => {
    if (!price) return '€0';
    return `€${price.toFixed(0)}`;
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
