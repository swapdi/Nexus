<template>
  <!-- Loading State -->
  <div v-if="isLoading" class="flex items-center justify-center py-8">
    <div class="relative">
      <div
        class="animate-spin rounded-full h-6 w-6 border border-gray-600/30"></div>
      <div
        class="animate-spin rounded-full h-6 w-6 border border-blue-400 border-t-transparent absolute top-0 left-0"></div>
    </div>
    <span class="ml-3 text-sm text-gray-400">Lade Preisdaten...</span>
  </div>

  <!-- No Data State -->
  <div v-else-if="!priceHistory && !isLoading" class="text-center py-8">
    <div
      class="w-12 h-12 mx-auto mb-3 bg-gray-700/20 rounded-full flex items-center justify-center">
      <svg
        class="w-6 h-6 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
      </svg>
    </div>
    <p class="text-sm text-gray-500">Keine Preisdaten verfügbar</p>
  </div>

  <!-- Historical Low (Dezente Zusatzinfo) -->
  <div v-else-if="priceHistory && historicalLow">
    <div class="p-3 bg-blue-900/10 border border-blue-600/20 rounded-lg">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
          <div>
            <p class="text-sm text-blue-300/80 font-medium">
              Historischer Tiefstpreis
            </p>
            <p class="text-xs text-gray-400">
              {{ formatPrice(historicalLow?.price?.amount) }} •
              {{ historicalLow?.shop?.name || 'Unbekannter Shop' }} •
              {{
                new Date(historicalLow?.timestamp).toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: 'short'
                })
              }}
            </p>
          </div>
        </div>
        <div
          v-if="historicalLow?.cut && historicalLow.cut > 0"
          class="text-right">
          <div
            class="bg-blue-500/80 text-white px-2 py-0.5 rounded text-xs font-medium">
            -{{ Math.round(historicalLow.cut) }}%
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty State -->
  <div v-else-if="priceHistory && !historicalLow" class="text-center py-6">
    <div
      class="w-10 h-10 mx-auto mb-2 bg-gray-700/20 rounded-full flex items-center justify-center">
      <svg
        class="w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
      </svg>
    </div>
    <p class="text-xs text-gray-500">Keine historischen Daten verfügbar</p>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  interface Props {
    gameTitle: string;
  }

  const props = defineProps<Props>();
  const dealsStore = useDealsStore();

  // State
  const priceHistory = ref<any>(null);
  const isLoading = ref(false);

  // Computed
  const historicalLow = computed(() => {
    // Versuche beide möglichen Datenstrukturen
    let prices =
      priceHistory.value?.priceData?.prices || priceHistory.value?.prices;

    if (!prices?.[0]) return null;

    // ITAD API Struktur: prices[0].lowest enthält den historischen Tiefstpreis
    const historyLow = prices[0].lowest;

    // Nur zurückgeben wenn amount existiert
    return historyLow?.price?.amount != null ? historyLow : null;
  });

  // Methods
  const loadPriceHistory = async () => {
    if (isLoading.value) return;

    isLoading.value = true;
    try {
      const result = await dealsStore.getGamePriceHistory(props.gameTitle);
      priceHistory.value = result;
    } catch (error) {
      console.error('Fehler beim Laden der Preishistorie:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const formatPrice = (price: number | null | undefined): string => {
    if (price == null || isNaN(price)) {
      return 'N/A';
    }
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const openDealUrl = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  // Auto-load on mount
  onMounted(() => {
    if (props.gameTitle) {
      loadPriceHistory();
    }
  });
</script>

<style scoped>
  /* Custom styles für bessere UX */
</style>
