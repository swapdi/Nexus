<script setup lang="ts">
  const accountStore = useAccountStore();

  onMounted(async () => {
    await accountStore.init();
  });

  definePageMeta({
    middleware: ['auth'],
    title: 'Angebote',
    layout: 'authenticated'
  });

  // Mock-Daten für Deals (später durch echte API ersetzen)
  const deals = ref([
    {
      id: 1,
      title: 'Cyberpunk 2077',
      coverUrl:
        'https://via.placeholder.com/300x400/6366f1/ffffff?text=Cyberpunk+2077',
      storeName: 'Steam',
      originalPrice: 59.99,
      price: 29.99,
      discountPercent: 50,
      validUntil: '2024-02-15',
      isFreebie: false,
      genre: 'RPG',
      isInLibrary: true
    },
    {
      id: 2,
      title: 'Control',
      coverUrl:
        'https://via.placeholder.com/300x400/8b5cf6/ffffff?text=Control',
      storeName: 'Epic Games',
      originalPrice: 39.99,
      price: 0,
      discountPercent: 100,
      validUntil: '2024-02-10',
      isFreebie: true,
      genre: 'Action',
      isInLibrary: false
    },
    {
      id: 3,
      title: 'The Witcher 3: Wild Hunt GOTY',
      coverUrl:
        'https://via.placeholder.com/300x400/06b6d4/ffffff?text=Witcher+3',
      storeName: 'GOG',
      originalPrice: 49.99,
      price: 9.99,
      discountPercent: 80,
      validUntil: '2024-02-20',
      isFreebie: false,
      genre: 'RPG',
      isInLibrary: false
    },
    {
      id: 4,
      title: "Assassin's Creed Odyssey",
      coverUrl:
        'https://via.placeholder.com/300x400/10b981/ffffff?text=AC+Odyssey',
      storeName: 'Ubisoft Store',
      originalPrice: 59.99,
      price: 14.99,
      discountPercent: 75,
      validUntil: '2024-02-12',
      isFreebie: false,
      genre: 'Action-Adventure',
      isInLibrary: false
    },
    {
      id: 5,
      title: 'Hades',
      coverUrl: 'https://via.placeholder.com/300x400/f59e0b/ffffff?text=Hades',
      storeName: 'Steam',
      originalPrice: 24.99,
      price: 12.49,
      discountPercent: 50,
      validUntil: '2024-02-18',
      isFreebie: false,
      genre: 'Roguelike',
      isInLibrary: false
    },
    {
      id: 6,
      title: 'Metro Exodus',
      coverUrl:
        'https://via.placeholder.com/300x400/ef4444/ffffff?text=Metro+Exodus',
      storeName: 'Epic Games',
      originalPrice: 39.99,
      price: 0,
      discountPercent: 100,
      validUntil: '2024-02-08',
      isFreebie: true,
      genre: 'FPS',
      isInLibrary: false
    }
  ]);

  const searchQuery = ref('');
  const selectedStore = ref('all');
  const selectedGenre = ref('all');
  const showOnlyFree = ref(false);
  const hideOwned = ref(false);
  const sortBy = ref('discount');

  // Filter Optionen
  const stores = computed(() => {
    const allStores = [
      'all',
      ...new Set(deals.value.map(deal => deal.storeName))
    ];
    return allStores.map(store => ({
      value: store,
      label: store === 'all' ? 'Alle Stores' : store
    }));
  });

  const genres = computed(() => {
    const allGenres = ['all', ...new Set(deals.value.map(deal => deal.genre))];
    return allGenres.map(genre => ({
      value: genre,
      label: genre === 'all' ? 'Alle Genres' : genre
    }));
  });

  // Gefilterte Deals
  const filteredDeals = computed(() => {
    let filtered = deals.value.filter(deal => {
      const matchesSearch = deal.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const matchesStore =
        selectedStore.value === 'all' || deal.storeName === selectedStore.value;
      const matchesGenre =
        selectedGenre.value === 'all' || deal.genre === selectedGenre.value;
      const matchesFree = !showOnlyFree.value || deal.isFreebie;
      const matchesOwned = !hideOwned.value || !deal.isInLibrary;

      return (
        matchesSearch &&
        matchesStore &&
        matchesGenre &&
        matchesFree &&
        matchesOwned
      );
    });

    // Sortierung
    if (sortBy.value === 'discount') {
      filtered.sort((a, b) => b.discountPercent - a.discountPercent);
    } else if (sortBy.value === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy.value === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy.value === 'expiry') {
      filtered.sort(
        (a, b) =>
          new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime()
      );
    }

    return filtered;
  });

  // Statistiken
  const totalDeals = computed(() => deals.value.length);
  const freeGames = computed(
    () => deals.value.filter(deal => deal.isFreebie).length
  );
  const maxDiscount = computed(() => {
    const discounts = deals.value
      .filter(deal => !deal.isFreebie)
      .map(deal => deal.discountPercent);
    return discounts.length > 0 ? Math.max(...discounts) : 0;
  });

  // Format Funktionen
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'Abgelaufen';
    if (diffDays === 1) return 'Noch 1 Tag';
    if (diffDays <= 7) return `Noch ${diffDays} Tage`;
    return `Bis ${date.toLocaleDateString('de-DE')}`;
  };

  const getTimeRemaining = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return 'text-red-400';
    if (diffDays <= 3) return 'text-yellow-400';
    return 'text-green-400';
  };
</script>

<template>
  <div class="space-y-6">
    <!-- Header mit Statistiken -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <h1
        class="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
        Aktuelle Angebote
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          class="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
          <div class="text-2xl font-bold text-white">{{ totalDeals }}</div>
          <div class="text-green-300 text-sm">Aktuelle Deals</div>
        </div>
        <div
          class="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
          <div class="text-2xl font-bold text-white">{{ freeGames }}</div>
          <div class="text-blue-300 text-sm">Kostenlose Spiele</div>
        </div>
        <div
          class="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
          <div class="text-2xl font-bold text-white">{{ maxDiscount }}%</div>
          <div class="text-purple-300 text-sm">Höchster Rabatt</div>
        </div>
      </div>
    </div>

    <!-- Filter und Suche -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <!-- Suche -->
        <div class="lg:col-span-2">
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Suchen</label
          >
          <div class="relative">
            <Icon
              name="heroicons:magnifying-glass-20-solid"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Spiel suchen..."
              class="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
          </div>
        </div>

        <!-- Store Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Store</label
          >
          <select
            v-model="selectedStore"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
            <option
              v-for="store in stores"
              :key="store.value"
              :value="store.value">
              {{ store.label }}
            </option>
          </select>
        </div>

        <!-- Genre Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Genre</label
          >
          <select
            v-model="selectedGenre"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
            <option
              v-for="genre in genres"
              :key="genre.value"
              :value="genre.value">
              {{ genre.label }}
            </option>
          </select>
        </div>

        <!-- Sortierung -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Sortieren</label
          >
          <select
            v-model="sortBy"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all">
            <option value="discount">Höchster Rabatt</option>
            <option value="price">Niedrigster Preis</option>
            <option value="title">Titel (A-Z)</option>
            <option value="expiry">Läuft bald ab</option>
          </select>
        </div>

        <!-- Toggle Filter -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-300">Filter</label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                v-model="showOnlyFree"
                type="checkbox"
                class="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2" />
              <span class="ml-2 text-sm text-gray-300">Nur kostenlos</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="hideOwned"
                type="checkbox"
                class="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2" />
              <span class="ml-2 text-sm text-gray-300">Besitze ausblenden</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Deals Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="deal in filteredDeals"
        :key="deal.id"
        class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-green-500/50 transition-all duration-300 group">
        <!-- Cover Image -->
        <div class="relative aspect-[3/4] overflow-hidden">
          <img
            :src="deal.coverUrl"
            :alt="deal.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

          <!-- Store Badge -->
          <div
            class="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white">
            {{ deal.storeName }}
          </div>

          <!-- Discount Badge -->
          <div
            v-if="deal.discountPercent > 0"
            class="absolute top-2 right-2 px-2 py-1 bg-green-600 rounded text-xs text-white font-bold">
            -{{ deal.discountPercent }}%
          </div>

          <!-- Free Badge -->
          <div
            v-if="deal.isFreebie"
            class="absolute top-2 right-2 px-2 py-1 bg-green-600 rounded text-xs text-white font-bold">
            KOSTENLOS
          </div>

          <!-- Library Badge -->
          <div
            v-if="deal.isInLibrary"
            class="absolute bottom-2 left-2 px-2 py-1 bg-purple-600/80 backdrop-blur-sm rounded text-xs text-white">
            <Icon name="heroicons:check-20-solid" class="w-3 h-3 inline mr-1" />
            Besitzen
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
              <span class="text-gray-300">{{ deal.genre }}</span>
            </div>

            <!-- Preise -->
            <div class="space-y-1">
              <div
                v-if="!deal.isFreebie"
                class="flex justify-between items-center">
                <span class="text-gray-400">Preis:</span>
                <div class="text-right">
                  <div class="text-green-400 font-bold">
                    {{ formatPrice(deal.price) }}
                  </div>
                  <div
                    v-if="deal.originalPrice > deal.price"
                    class="text-gray-500 line-through text-xs">
                    {{ formatPrice(deal.originalPrice) }}
                  </div>
                </div>
              </div>
              <div v-else class="text-center">
                <div class="text-green-400 font-bold text-lg">KOSTENLOS</div>
              </div>
            </div>

            <!-- Gültigkeitsdauer -->
            <div class="flex justify-between items-center">
              <span class="text-gray-400">Gültig:</span>
              <span
                :class="getTimeRemaining(deal.validUntil)"
                class="font-medium">
                {{ formatDate(deal.validUntil) }}
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-4 space-y-2">
            <button
              v-if="!deal.isInLibrary"
              class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
              {{ deal.isFreebie ? 'Kostenlos holen' : 'Deal ansehen' }}
            </button>
            <button
              v-else
              disabled
              class="w-full px-4 py-2 bg-gray-600 text-gray-300 font-medium rounded-lg cursor-not-allowed">
              Bereits in Bibliothek
            </button>

            <button
              class="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
              <Icon
                name="heroicons:heart-20-solid"
                class="w-4 h-4 inline mr-2" />
              Zur Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Leerer Zustand -->
    <div v-if="filteredDeals.length === 0" class="text-center py-12">
      <Icon
        name="heroicons:tag-20-solid"
        class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-400 mb-2">
        Keine Angebote gefunden
      </h3>
      <p class="text-gray-500">Versuchen Sie, Ihre Suchkriterien zu ändern.</p>
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
