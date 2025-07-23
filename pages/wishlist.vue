<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
    title: 'Wishlist',
    layout: 'authenticated'
  });

  const userStore = useUserStore();
  const wishlistStore = useWishlistStore();
  const messagesStore = useMessagesStore();

  // Ref für Suche und Filter
  const searchQuery = ref('');

  // Computed für gefilterte Items mit Deal-Informationen
  const filteredWishlistItems = computed(() => {
    let items = wishlistStore.sortedWishlistItems;

    if (searchQuery.value) {
      items = items.filter(item =>
        item.game.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }

    // Deal-Informationen zu Items hinzufügen
    return items.map(item => {
      const dealNotification = wishlistStore.dealNotifications.find(
        (notif: any) => notif.gameId === item.gameId
      );
      return {
        ...item,
        bestDeal: dealNotification?.deals?.[0] || null
      };
    });
  });

  onMounted(async () => {
    await userStore.init();
    try {
      await wishlistStore.loadWishlist();
      await wishlistStore.checkWishlistDeals();
      await messagesStore.refreshUnreadCount();
    } catch (error) {
      console.error('Fehler beim Laden der Wishlist:', error);
    }
  });

  // Wishlist-Actions
  const handleRemoveFromWishlist = async (gameId: number) => {
    try {
      await wishlistStore.removeFromWishlist(gameId);
    } catch (error) {
      console.error('Fehler beim Entfernen aus Wishlist:', error);
    }
  };

  const handleCheckDeals = async () => {
    try {
      await wishlistStore.checkWishlistDeals();
    } catch (error) {
      console.error('❌ Fehler beim Prüfen der Deals:', error);
    }
  };
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Deine Wishlist</h1>
        <p class="text-gray-400 mt-1">
          {{ wishlistStore.wishlistCount }}
          {{ wishlistStore.wishlistCount === 1 ? 'Spiel' : 'Spiele' }} auf
          deiner Wunschliste
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
        <!-- Deal-Check Button -->
        <button
          @click="handleCheckDeals"
          class="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2">
          <Icon name="heroicons:magnifying-glass" class="w-4 h-4" />
          Deals prüfen
        </button>
      </div>
    </div>

    <!-- Search and Filters -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <div class="relative">
            <Icon
              name="heroicons:magnifying-glass"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Spiele durchsuchen..."
              class="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200" />
          </div>
        </div>
      </div>
    </div>

    <!-- Deal Notifications - Kompakter Banner -->
    <div v-if="wishlistStore.dealNotifications.length > 0" class="space-y-4">
      <div
        class="bg-gradient-to-r from-green-900/10 to-blue-900/10 border border-green-500/20 rounded-xl p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="bg-green-500/20 rounded-full p-2">
              <Icon name="heroicons:fire" class="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">
                Aktuelle Deals verfügbar!
              </h2>
              <p class="text-sm text-gray-400">
                {{ wishlistStore.dealNotifications.length }}
                {{
                  wishlistStore.dealNotifications.length === 1
                    ? 'Spiel hat'
                    : 'Spiele haben'
                }}
                aktive Angebote
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wishlist Items -->
    <div v-if="filteredWishlistItems.length > 0" class="space-y-6">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="item in filteredWishlistItems"
          :key="item.id"
          class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300 group relative">
          <!-- Deal Badge - Top Left -->
          <div v-if="item.bestDeal" class="absolute top-3 left-3 z-20">
            <div
              class="bg-gradient-to-r from-green-500 to-green-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-green-400/50 backdrop-blur-sm">
              <div
                v-if="item.bestDeal.price === 0"
                class="flex items-center gap-1">
                <Icon name="heroicons:gift" class="w-3 h-3" />
                GRATIS
              </div>
              <div
                v-else-if="item.bestDeal.discountPercent"
                class="flex items-center gap-1">
                <Icon name="heroicons:fire" class="w-3 h-3" />
                -{{ Math.round(item.bestDeal.discountPercent) }}%
              </div>
            </div>
          </div>

          <!-- Game Cover -->
          <div class="aspect-[3/4] relative overflow-hidden">
            <img
              :src="item.game.coverUrl || '/gameplaceholder.jpg'"
              :alt="item.game.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

            <!-- Enhanced Remove Button -->
            <button
              @click="handleRemoveFromWishlist(item.gameId)"
              class="absolute top-3 right-3 group/remove p-1.5 bg-black/60 backdrop-blur-sm hover:bg-red-500/20 text-gray-300 hover:text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 border border-gray-600/30 hover:border-red-400/50 shadow-lg"
              title="Aus Wishlist entfernen">
              <div class="relative">
                <Icon
                  name="heroicons:x-mark"
                  class="w-4 h-4 transition-all duration-200 group-hover/remove:rotate-90" />
                <!-- Subtle glow effect -->
                <div
                  class="absolute inset-0 bg-red-400/20 rounded blur-md opacity-0 group-hover/remove:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </button>
          </div>

          <!-- Game Info -->
          <div class="p-4">
            <h3 class="text-lg font-bold text-white mb-2 line-clamp-2">
              {{ item.game.name }}
            </h3>

            <!-- Deal Info Compact -->
            <div
              v-if="item.bestDeal"
              class="mb-3 p-3 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-lg">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-300">{{
                  item.bestDeal.storeName
                }}</span>
                <div class="text-right">
                  <div
                    v-if="item.bestDeal.price === 0"
                    class="text-green-400 font-bold text-lg">
                    GRATIS
                  </div>
                  <div v-else class="flex items-center gap-2">
                    <span
                      v-if="
                        item.bestDeal.originalPrice &&
                        item.bestDeal.originalPrice !== item.bestDeal.price
                      "
                      class="text-gray-400 line-through text-sm">
                      {{ item.bestDeal.originalPrice?.toFixed(2) }}€
                    </span>
                    <span class="text-green-400 font-bold text-lg">
                      {{ item.bestDeal.price?.toFixed(2) }}€
                    </span>
                  </div>
                </div>
              </div>
              <a
                :href="item.bestDeal.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105">
                <Icon name="heroicons:shopping-cart" class="w-4 h-4" />
                Zum Deal
              </a>
            </div>

            <p class="text-sm text-gray-400 mb-4">
              Hinzugefügt:
              {{ new Date(item.addedAt).toLocaleDateString('de-DE') }}
            </p>

            <!-- Action Button -->
            <NuxtLink
              :to="`/game/${item.gameId}`"
              class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
              <Icon name="heroicons:eye" class="w-4 h-4" />
              Details anzeigen
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!wishlistStore.hasWishlistItems" class="text-center py-16">
      <div
        class="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-12 max-w-md mx-auto">
        <Icon
          name="heroicons:heart"
          class="w-16 h-16 text-gray-400 mx-auto mb-6" />
        <h3 class="text-2xl font-bold text-white mb-4">
          Deine Wishlist ist leer
        </h3>
        <p class="text-gray-400 mb-8">
          Entdecke großartige Spiele und füge sie zu deiner Wunschliste hinzu,
          um bei Angeboten benachrichtigt zu werden!
        </p>
        <NuxtLink
          to="/search"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
          <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
          Spiele entdecken
        </NuxtLink>
      </div>
    </div>

    <!-- No Search Results -->
    <div v-else class="text-center py-16">
      <div
        class="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-12 max-w-md mx-auto">
        <Icon
          name="heroicons:magnifying-glass"
          class="w-16 h-16 text-gray-400 mx-auto mb-6" />
        <h3 class="text-2xl font-bold text-white mb-4">Keine Ergebnisse</h3>
        <p class="text-gray-400 mb-8">
          Keine Spiele in deiner Wishlist entsprechen deiner Suche nach "{{
            searchQuery
          }}".
        </p>
        <button
          @click="searchQuery = ''"
          class="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200">
          Filter zurücksetzen
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
