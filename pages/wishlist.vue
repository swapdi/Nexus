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
  const showOnlyOnSale = ref(false);

  // Computed für gefilterte Items
  const filteredWishlistItems = computed(() => {
    let items = wishlistStore.sortedWishlistItems;

    // Debug: Aktuelle Deal-Benachrichtigungen loggen
    console.log('Deal Notifications:', wishlistStore.dealNotifications);
    console.log('All wishlist items:', items);

    if (searchQuery.value) {
      items = items.filter(item =>
        item.game.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }

    // Sale-Filter anwenden
    if (showOnlyOnSale.value) {
      const gameIdsWithDeals = wishlistStore.dealNotifications.map(
        notif => notif.gameId
      );
      items = items.filter(item => gameIdsWithDeals.includes(item.gameId));
      console.log('Filtered items with deals:', items);
    }

    return items;
  });

  onMounted(async () => {
    await userStore.init();
    console.log('User initialized, user ID:', userStore.user?.id);

    try {
      console.log('Loading wishlist...');
      await wishlistStore.loadWishlist();
      console.log('Wishlist loaded, items:', wishlistStore.wishlistItems);

      console.log('Checking deals...');
      await wishlistStore.checkWishlistDeals();
      console.log(
        'Deals checked, notifications:',
        wishlistStore.dealNotifications
      );

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
      console.log('Manually checking deals...');
      console.log(
        'Current wishlist items before deal check:',
        wishlistStore.wishlistItems
      );
      console.log('Current wishlist count:', wishlistStore.wishlistCount);
      console.log('Has wishlist items:', wishlistStore.hasWishlistItems);

      // Grund: Debug-Informationen über einzelne Games in der Wishlist
      wishlistStore.wishlistItems.forEach((item, index) => {
        console.log(`Wishlist item ${index + 1}:`, {
          id: item.id,
          gameId: item.gameId,
          gameName: item.game?.name,
          addedAt: item.addedAt
        });
      });

      console.log('🔍 Starte Deal-Prüfung...');
      await wishlistStore.checkWishlistDeals();

      console.log(
        '✅ Deal notifications after manual check:',
        wishlistStore.dealNotifications
      );
      console.log(
        '📊 Deal notifications count:',
        wishlistStore.dealNotifications.length
      );

      if (wishlistStore.dealNotifications.length === 0) {
        console.log(
          '⚠️ Keine Deal-Benachrichtigungen gefunden. Mögliche Gründe:'
        );
        console.log('- Keine aktiven Deals für die Wishlist-Items');
        console.log('- API-Fehler bei der Deal-Abfrage');
        console.log('- Alle Deals haben keinen Rabatt > 0%');
      }
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

        <!-- Only On Sale Filter -->
        <div class="flex items-center gap-2">
          <input
            id="onSaleFilter"
            v-model="showOnlyOnSale"
            type="checkbox"
            class="w-4 h-4 text-purple-600 bg-gray-900 border-gray-600 rounded focus:ring-purple-500 focus:ring-2" />
          <label for="onSaleFilter" class="text-sm text-gray-300">
            Nur Sale-Artikel
          </label>
        </div>
      </div>
    </div>

    <!-- Deal Notifications -->
    <div v-if="wishlistStore.dealNotifications.length > 0" class="space-y-4">
      <h2 class="text-2xl font-bold text-white">
        Aktuelle Deals für deine Wishlist
      </h2>
      <div class="grid grid-cols-1 gap-4">
        <div
          v-for="notification in wishlistStore.dealNotifications"
          :key="notification.gameId"
          class="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-4">
            {{ notification.gameName }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="deal in notification.deals"
              :key="deal.id"
              class="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-white">{{ deal.storeName }}</h4>
                <div class="text-right">
                  <div
                    v-if="deal.discountPercent"
                    class="text-green-400 font-bold">
                    -{{ deal.discountPercent }}%
                  </div>
                  <div v-if="deal.price" class="text-white font-bold">
                    {{ deal.price.toFixed(2) }}€
                  </div>
                  <div
                    v-if="
                      deal.originalPrice && deal.originalPrice !== deal.price
                    "
                    class="text-gray-400 line-through text-sm">
                    {{ deal.originalPrice.toFixed(2) }}€
                  </div>
                </div>
              </div>
              <a
                :href="deal.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors duration-200">
                <Icon name="heroicons:shopping-cart" class="w-4 h-4" />
                Zum Deal
              </a>
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
          class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300 group">
          <!-- Game Cover -->
          <div class="aspect-[3/4] relative overflow-hidden">
            <img
              :src="item.game.coverUrl || '/gameplaceholder.jpg'"
              :alt="item.game.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

            <!-- Remove Button -->
            <button
              @click="handleRemoveFromWishlist(item.gameId)"
              class="absolute top-3 right-3 p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
              title="Aus Wishlist entfernen">
              <Icon name="heroicons:x-mark" class="w-4 h-4" />
            </button>
          </div>

          <!-- Game Info -->
          <div class="p-4">
            <h3 class="text-lg font-bold text-white mb-2 line-clamp-2">
              {{ item.game.name }}
            </h3>

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
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
