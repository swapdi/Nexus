<script setup lang="ts">
  const accountStore = useAccountStore();

  onMounted(async () => {
    await accountStore.init();
  });

  definePageMeta({
    middleware: ['auth'],
    title: 'Wishlist',
    layout: 'authenticated'
  });

  // Mock-Daten für Wishlist (später durch echte API ersetzen)
  const wishlistItems = ref([
    {
      id: 1,
      title: 'Starfield',
      coverUrl:
        'https://via.placeholder.com/300x400/6366f1/ffffff?text=Starfield',
      releaseDate: '2023-09-06',
      developer: 'Bethesda Game Studios',
      genres: ['RPG', 'Space', 'Exploration'],
      addedAt: '2024-01-20',
      currentPrice: 69.99,
      lowestPrice: 49.99,
      priceHistory: [
        { date: '2024-01-01', price: 69.99 },
        { date: '2024-01-15', price: 59.99 },
        { date: '2024-01-25', price: 49.99 },
        { date: '2024-01-30', price: 59.99 }
      ],
      onSale: false,
      platforms: ['Steam', 'Xbox Game Pass']
    },
    {
      id: 2,
      title: "Baldur's Gate 3",
      coverUrl:
        'https://via.placeholder.com/300x400/8b5cf6/ffffff?text=Baldurs+Gate+3',
      releaseDate: '2023-08-03',
      developer: 'Larian Studios',
      genres: ['RPG', 'Turn-Based', 'Fantasy'],
      addedAt: '2024-01-18',
      currentPrice: 39.99,
      lowestPrice: 35.99,
      priceHistory: [
        { date: '2024-01-01', price: 59.99 },
        { date: '2024-01-10', price: 49.99 },
        { date: '2024-01-20', price: 35.99 },
        { date: '2024-01-28', price: 39.99 }
      ],
      onSale: true,
      platforms: ['Steam', 'GOG', 'PlayStation 5']
    },
    {
      id: 3,
      title: 'Hogwarts Legacy',
      coverUrl:
        'https://via.placeholder.com/300x400/06b6d4/ffffff?text=Hogwarts+Legacy',
      releaseDate: '2023-02-10',
      developer: 'Avalanche Software',
      genres: ['Action-Adventure', 'RPG', 'Open World'],
      addedAt: '2024-01-15',
      currentPrice: 59.99,
      lowestPrice: 29.99,
      priceHistory: [
        { date: '2024-01-01', price: 59.99 },
        { date: '2024-01-12', price: 44.99 },
        { date: '2024-01-18', price: 29.99 },
        { date: '2024-01-26', price: 39.99 }
      ],
      onSale: false,
      platforms: ['Steam', 'Epic Games', 'PlayStation 5']
    },
    {
      id: 4,
      title: 'Spider-Man Remastered',
      coverUrl:
        'https://via.placeholder.com/300x400/10b981/ffffff?text=Spider-Man',
      releaseDate: '2022-08-12',
      developer: 'Insomniac Games',
      genres: ['Action-Adventure', 'Superhero', 'Open World'],
      addedAt: '2024-01-10',
      currentPrice: 59.99,
      lowestPrice: 19.99,
      priceHistory: [
        { date: '2024-01-01', price: 59.99 },
        { date: '2024-01-08', price: 39.99 },
        { date: '2024-01-16', price: 19.99 },
        { date: '2024-01-24', price: 29.99 }
      ],
      onSale: true,
      platforms: ['Steam', 'Epic Games']
    }
  ]);

  const searchQuery = ref('');
  const selectedGenre = ref('all');
  const sortBy = ref('addedAt');
  const showOnlyOnSale = ref(false);

  // Filter Optionen
  const genres = computed(() => {
    const allGenres = ['all'];
    wishlistItems.value.forEach(item => {
      item.genres.forEach(genre => {
        if (!allGenres.includes(genre)) {
          allGenres.push(genre);
        }
      });
    });
    return allGenres.map(genre => ({
      value: genre,
      label: genre === 'all' ? 'Alle Genres' : genre
    }));
  });

  // Gefilterte Wishlist
  const filteredWishlist = computed(() => {
    let filtered = wishlistItems.value.filter(item => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const matchesGenre =
        selectedGenre.value === 'all' ||
        item.genres.includes(selectedGenre.value);
      const matchesSale = !showOnlyOnSale.value || item.onSale;

      return matchesSearch && matchesGenre && matchesSale;
    });

    // Sortierung
    if (sortBy.value === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy.value === 'addedAt') {
      filtered.sort(
        (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      );
    } else if (sortBy.value === 'price') {
      filtered.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sortBy.value === 'discount') {
      filtered.sort((a, b) => {
        const discountA =
          ((a.lowestPrice - a.currentPrice) / a.lowestPrice) * 100;
        const discountB =
          ((b.lowestPrice - b.currentPrice) / b.lowestPrice) * 100;
        return discountB - discountA;
      });
    }

    return filtered;
  });

  // Statistiken
  const totalItems = computed(() => wishlistItems.value.length);
  const itemsOnSale = computed(
    () => wishlistItems.value.filter(item => item.onSale).length
  );
  const totalValue = computed(() => {
    return wishlistItems.value.reduce(
      (sum, item) => sum + item.currentPrice,
      0
    );
  });
  const totalSavings = computed(() => {
    return wishlistItems.value.reduce((sum, item) => {
      if (item.onSale) {
        return sum + (item.lowestPrice - item.currentPrice);
      }
      return sum;
    }, 0);
  });

  // Format Funktionen
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  const getPriceChange = (item: any) => {
    if (item.priceHistory.length < 2) return 0;
    const current = item.currentPrice;
    const previous = item.priceHistory[item.priceHistory.length - 2].price;
    return ((current - previous) / previous) * 100;
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-red-400';
    if (change < 0) return 'text-green-400';
    return 'text-gray-400';
  };

  const removeFromWishlist = (id: number) => {
    wishlistItems.value = wishlistItems.value.filter(item => item.id !== id);
  };
</script>

<template>
  <div class="space-y-6">
    <!-- Header mit Statistiken -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <h1
        class="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
        Meine Wishlist
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          class="bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-lg p-4 border border-pink-500/30">
          <div class="text-2xl font-bold text-white">{{ totalItems }}</div>
          <div class="text-pink-300 text-sm">Spiele auf Wishlist</div>
        </div>
        <div
          class="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
          <div class="text-2xl font-bold text-white">{{ itemsOnSale }}</div>
          <div class="text-green-300 text-sm">Aktuell im Angebot</div>
        </div>
        <div
          class="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
          <div class="text-2xl font-bold text-white">
            {{ formatPrice(totalValue) }}
          </div>
          <div class="text-blue-300 text-sm">Gesamtwert</div>
        </div>
        <div
          class="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
          <div class="text-2xl font-bold text-white">
            {{ formatPrice(Math.abs(totalSavings)) }}
          </div>
          <div class="text-purple-300 text-sm">Mögliche Ersparnis</div>
        </div>
      </div>
    </div>

    <!-- Filter und Suche -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
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
              class="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" />
          </div>
        </div>

        <!-- Genre Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Genre</label
          >
          <select
            v-model="selectedGenre"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all">
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
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all">
            <option value="addedAt">Zuletzt hinzugefügt</option>
            <option value="title">Titel (A-Z)</option>
            <option value="price">Preis (niedrig-hoch)</option>
            <option value="discount">Größter Rabatt</option>
          </select>
        </div>

        <!-- Toggle Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Filter</label
          >
          <label class="flex items-center mt-3">
            <input
              v-model="showOnlyOnSale"
              type="checkbox"
              class="w-4 h-4 text-pink-600 bg-gray-700 border-gray-600 rounded focus:ring-pink-500 focus:ring-2" />
            <span class="ml-2 text-sm text-gray-300">Nur Angebote</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Wishlist Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="item in filteredWishlist"
        :key="item.id"
        class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-pink-500/50 transition-all duration-300 group">
        <div class="flex">
          <!-- Cover Image -->
          <div class="w-24 h-32 flex-shrink-0 relative overflow-hidden">
            <img
              :src="item.coverUrl"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

            <!-- Sale Badge -->
            <div
              v-if="item.onSale"
              class="absolute top-1 left-1 px-1.5 py-0.5 bg-green-600 rounded text-xs text-white font-bold">
              SALE
            </div>
          </div>

          <!-- Game Info -->
          <div class="flex-1 p-4">
            <div class="flex justify-between items-start mb-2">
              <h3
                class="font-semibold text-white text-lg line-clamp-2 group-hover:text-pink-300 transition-colors">
                {{ item.title }}
              </h3>
              <button
                @click="removeFromWishlist(item.id)"
                class="text-gray-400 hover:text-red-400 transition-colors ml-2">
                <Icon name="heroicons:x-mark-20-solid" class="w-5 h-5" />
              </button>
            </div>

            <div class="text-sm text-gray-400 mb-3">
              <div>{{ item.developer }}</div>
              <div>{{ formatDate(item.releaseDate) }}</div>
            </div>

            <!-- Genres -->
            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="genre in item.genres.slice(0, 3)"
                :key="genre"
                class="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300">
                {{ genre }}
              </span>
            </div>

            <!-- Platforms -->
            <div class="text-xs text-gray-400 mb-3">
              Verfügbar auf: {{ item.platforms.join(', ') }}
            </div>

            <!-- Price Info -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">Aktueller Preis:</span>
                <div class="text-right">
                  <div class="text-white font-bold">
                    {{ formatPrice(item.currentPrice) }}
                  </div>
                  <div
                    v-if="getPriceChange(item) !== 0"
                    :class="getPriceChangeColor(getPriceChange(item))"
                    class="text-xs">
                    {{ getPriceChange(item) > 0 ? '+' : ''
                    }}{{ getPriceChange(item).toFixed(1) }}%
                  </div>
                </div>
              </div>

              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-400">Niedrigster Preis:</span>
                <span class="text-green-400 font-medium">{{
                  formatPrice(item.lowestPrice)
                }}</span>
              </div>

              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-400">Hinzugefügt:</span>
                <span class="text-gray-300">{{
                  formatDate(item.addedAt)
                }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-4 flex space-x-2">
              <button
                class="flex-1 px-3 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm rounded-lg transition-colors">
                <Icon
                  name="heroicons:shopping-cart-20-solid"
                  class="w-4 h-4 inline mr-1" />
                Kaufen
              </button>
              <button
                class="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
                <Icon name="heroicons:chart-bar-20-solid" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Leerer Zustand -->
    <div
      v-if="filteredWishlist.length === 0 && wishlistItems.length > 0"
      class="text-center py-12">
      <Icon
        name="heroicons:heart-20-solid"
        class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-400 mb-2">
        Keine Spiele gefunden
      </h3>
      <p class="text-gray-500">Versuchen Sie, Ihre Suchkriterien zu ändern.</p>
    </div>

    <!-- Komplett leere Wishlist -->
    <div v-if="wishlistItems.length === 0" class="text-center py-12">
      <Icon
        name="heroicons:heart-20-solid"
        class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-400 mb-2">
        Ihre Wishlist ist leer
      </h3>
      <p class="text-gray-500 mb-6">
        Fügen Sie Spiele hinzu, die Sie interessieren, um Preise zu verfolgen.
      </p>
      <NuxtLink
        to="/deals"
        class="inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors">
        <Icon name="heroicons:magnifying-glass-20-solid" class="w-5 h-5 mr-2" />
        Angebote durchsuchen
      </NuxtLink>
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
