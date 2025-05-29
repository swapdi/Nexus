<script setup lang="ts">
  const accountStore = useAccountStore();

  onMounted(async () => {
    await accountStore.init();
  });

  definePageMeta({
    middleware: ['auth'],
    title: 'Meine Spiele',
    layout: 'authenticated'
  });

  // Mock-Daten für die Spiele (später durch echte API ersetzen)
  const games = ref([
    {
      id: 1,
      title: 'Cyberpunk 2077',
      coverUrl:
        'https://via.placeholder.com/300x400/6366f1/ffffff?text=Cyberpunk+2077',
      platform: 'Steam',
      genre: 'RPG',
      playTime: '120h',
      lastPlayed: '2024-01-15',
      rating: 4
    },
    {
      id: 2,
      title: 'The Witcher 3: Wild Hunt',
      coverUrl:
        'https://via.placeholder.com/300x400/8b5cf6/ffffff?text=The+Witcher+3',
      platform: 'GOG',
      genre: 'RPG',
      playTime: '250h',
      lastPlayed: '2024-01-10',
      rating: 5
    },
    {
      id: 3,
      title: 'Red Dead Redemption 2',
      coverUrl:
        'https://via.placeholder.com/300x400/06b6d4/ffffff?text=Red+Dead+2',
      platform: 'Epic Games',
      genre: 'Action-Adventure',
      playTime: '89h',
      lastPlayed: '2024-01-08',
      rating: 5
    },
    {
      id: 4,
      title: "Assassin's Creed Valhalla",
      coverUrl:
        'https://via.placeholder.com/300x400/10b981/ffffff?text=AC+Valhalla',
      platform: 'Ubisoft Connect',
      genre: 'Action-Adventure',
      playTime: '75h',
      lastPlayed: '2024-01-05',
      rating: 3
    }
  ]);

  const searchQuery = ref('');
  const selectedGenre = ref('all');
  const selectedPlatform = ref('all');
  const sortBy = ref('lastPlayed');

  // Verfügbare Filter
  const genres = computed(() => {
    const allGenres = ['all', ...new Set(games.value.map(game => game.genre))];
    return allGenres.map(genre => ({
      value: genre,
      label: genre === 'all' ? 'Alle Genres' : genre
    }));
  });

  const platforms = computed(() => {
    const allPlatforms = [
      'all',
      ...new Set(games.value.map(game => game.platform))
    ];
    return allPlatforms.map(platform => ({
      value: platform,
      label: platform === 'all' ? 'Alle Plattformen' : platform
    }));
  });

  // Gefilterte und sortierte Spiele
  const filteredGames = computed(() => {
    let filtered = games.value.filter(game => {
      const matchesSearch = game.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const matchesGenre =
        selectedGenre.value === 'all' || game.genre === selectedGenre.value;
      const matchesPlatform =
        selectedPlatform.value === 'all' ||
        game.platform === selectedPlatform.value;

      return matchesSearch && matchesGenre && matchesPlatform;
    });

    // Sortierung
    if (sortBy.value === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy.value === 'lastPlayed') {
      filtered.sort(
        (a, b) =>
          new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime()
      );
    } else if (sortBy.value === 'playTime') {
      filtered.sort((a, b) => parseInt(b.playTime) - parseInt(a.playTime));
    } else if (sortBy.value === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filtered;
  });

  // Statistiken
  const totalGames = computed(() => games.value.length);
  const totalPlayTime = computed(() => {
    return games.value.reduce((total, game) => {
      return total + parseInt(game.playTime);
    }, 0);
  });
  const averageRating = computed(() => {
    const ratedGames = games.value.filter(game => game.rating);
    if (ratedGames.length === 0) return 0;
    return (
      ratedGames.reduce((sum, game) => sum + (game.rating || 0), 0) /
      ratedGames.length
    ).toFixed(1);
  });

  // Format für PlayTime
  const formatPlayTime = (hours: string) => {
    const h = parseInt(hours);
    if (h >= 100) return `${h}h`;
    return `${h}h`;
  };

  // Stars für Rating
  const getStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  };
</script>

<template>
  <div class="space-y-6">
    <!-- Header mit Statistiken -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <h1
        class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
        Meine Spiele
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          class="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
          <div class="text-2xl font-bold text-white">{{ totalGames }}</div>
          <div class="text-purple-300 text-sm">Spiele in Bibliothek</div>
        </div>
        <div
          class="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
          <div class="text-2xl font-bold text-white">{{ totalPlayTime }}h</div>
          <div class="text-blue-300 text-sm">Gesamte Spielzeit</div>
        </div>
        <div
          class="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
          <div class="text-2xl font-bold text-white">{{ averageRating }}</div>
          <div class="text-green-300 text-sm">Durchschnittliche Bewertung</div>
        </div>
      </div>
    </div>

    <!-- Filter und Suche -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <!-- Suche -->
        <div class="lg:col-span-1">
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
              class="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" />
          </div>
        </div>

        <!-- Genre Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Genre</label
          >
          <select
            v-model="selectedGenre"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
            <option
              v-for="genre in genres"
              :key="genre.value"
              :value="genre.value">
              {{ genre.label }}
            </option>
          </select>
        </div>

        <!-- Plattform Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Plattform</label
          >
          <select
            v-model="selectedPlatform"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
            <option
              v-for="platform in platforms"
              :key="platform.value"
              :value="platform.value">
              {{ platform.label }}
            </option>
          </select>
        </div>

        <!-- Sortierung -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2"
            >Sortieren nach</label
          >
          <select
            v-model="sortBy"
            class="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
            <option value="lastPlayed">Zuletzt gespielt</option>
            <option value="title">Titel (A-Z)</option>
            <option value="playTime">Spielzeit</option>
            <option value="rating">Bewertung</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Spiele Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="game in filteredGames"
        :key="game.id"
        class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 group">
        <!-- Cover Image -->
        <div class="relative aspect-[3/4] overflow-hidden">
          <img
            :src="game.coverUrl"
            :alt="game.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

          <!-- Platform Badge -->
          <div
            class="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white">
            {{ game.platform }}
          </div>

          <!-- Rating -->
          <div
            v-if="game.rating"
            class="absolute top-2 right-2 flex space-x-0.5">
            <Icon
              v-for="(filled, index) in getStars(game.rating)"
              :key="index"
              name="heroicons:star-20-solid"
              :class="filled ? 'text-yellow-400' : 'text-gray-600'"
              class="w-4 h-4" />
          </div>
        </div>

        <!-- Game Info -->
        <div class="p-4">
          <h3
            class="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {{ game.title }}
          </h3>

          <div class="space-y-2 text-sm text-gray-400">
            <div class="flex justify-between">
              <span>Genre:</span>
              <span class="text-gray-300">{{ game.genre }}</span>
            </div>
            <div class="flex justify-between">
              <span>Spielzeit:</span>
              <span class="text-blue-400 font-medium">{{
                formatPlayTime(game.playTime)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span>Zuletzt gespielt:</span>
              <span class="text-gray-300">{{
                new Date(game.lastPlayed).toLocaleDateString('de-DE')
              }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-4 flex space-x-2">
            <button
              class="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors">
              <Icon
                name="heroicons:play-20-solid"
                class="w-4 h-4 inline mr-1" />
              Spielen
            </button>
            <button
              class="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
              <Icon name="heroicons:cog-6-tooth-20-solid" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Leerer Zustand -->
    <div v-if="filteredGames.length === 0" class="text-center py-12">
      <Icon
        name="heroicons:puzzle-piece-20-solid"
        class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-400 mb-2">
        Keine Spiele gefunden
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
