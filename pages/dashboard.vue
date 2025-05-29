<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
    title: 'Meine Spielebibliothek',
    layout: 'authenticated'
  });

  // Mock-Daten für die Plattformen
  const platforms = ref([
    { id: 'all', name: 'Alle Plattformen' },
    { id: 'steam', name: 'Steam' },
    { id: 'epic', name: 'Epic Games' },
    { id: 'gog', name: 'GOG' },
    { id: 'origin', name: 'Origin / EA' },
    { id: 'uplay', name: 'Ubisoft Connect' },
    { id: 'xbox', name: 'Xbox Game Pass' },
    { id: 'other', name: 'Andere' }
  ]);

  // Ausgewählte Plattform
  const selectedPlatform = ref('all');

  // Mock-Daten für die Spiele
  const games = ref([
    {
      id: 1,
      title: 'Cyberpunk 2077',
      coverUrl: 'https://via.placeholder.com/300x400',
      platformId: 'steam',
      releaseYear: 2020,
      genre: 'RPG',
      playTime: '120h'
    },
    {
      id: 2,
      title: 'The Witcher 3: Wild Hunt',
      coverUrl: 'https://via.placeholder.com/300x400',
      platformId: 'gog',
      releaseYear: 2015,
      genre: 'RPG',
      playTime: '250h'
    },
    {
      id: 3,
      title: 'Red Dead Redemption 2',
      coverUrl: 'https://via.placeholder.com/300x400',
      platformId: 'epic',
      releaseYear: 2019,
      genre: 'Action-Adventure',
      playTime: '80h'
    },
    {
      id: 4,
      title: 'Elden Ring',
      coverUrl: 'https://via.placeholder.com/300x400',
      platformId: 'steam',
      releaseYear: 2022,
      genre: 'Action-RPG',
      playTime: '100h'
    },
    {
      id: 5,
      title: "Assassin's Creed Valhalla",
      coverUrl: 'https://via.placeholder.com/300x400',
      platformId: 'uplay',
      releaseYear: 2020,
      genre: 'Action-RPG',
      playTime: '60h'
    },
    {
      id: 6,
      title: 'Mass Effect Legendary Edition',
      coverUrl: 'https://via.placeholder.com/300x400',
      platformId: 'origin',
      releaseYear: 2021,
      genre: 'RPG',
      playTime: '120h'
    }
  ]);

  // Filtere Spiele basierend auf der ausgewählten Plattform
  const displayedGames = computed(() => {
    if (selectedPlatform.value === 'all') {
      return games.value;
    } else {
      return games.value.filter(
        game => game.platformId === selectedPlatform.value
      );
    }
  });

  // Funktion zum Abrufen des Plattform-Icons
  function getPlatformIcon(platformId: string): string {
    // Hier könnte später die richtige Icon-Logik implementiert werden
    const icons: { [key: string]: string } = {
      steam: 'S',
      epic: 'E',
      gog: 'G',
      origin: 'O',
      uplay: 'U',
      xbox: 'X',
      other: '?'
    };
    const result = icons[platformId];

    return result || '?';
  }
</script>
<template>
  <div class="py-8">
    <h1 class="text-3xl font-bold mb-8">Meine Spielebibliothek</h1>

    <!-- Plattform-Tabs -->
    <div class="mb-8">
      <div class="flex overflow-x-auto pb-2 space-x-2">
        <button
          v-for="platform in platforms"
          :key="platform.id"
          :class="[
            'px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-all',
            selectedPlatform === platform.id
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          ]"
          @click="selectedPlatform = platform.id">
          {{ platform.name }}
        </button>
      </div>
    </div>

    <!-- Suchleiste und Filter -->
    <div class="flex flex-wrap gap-4 mb-8">
      <div class="relative flex-1">
        <input
          type="text"
          placeholder="Spiel suchen..."
          class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
        <span class="absolute right-3 top-2.5">🔍</span>
      </div>
      <div class="flex space-x-2">
        <select
          class="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-600">
          <option>Alle Genres</option>
          <option>Action</option>
          <option>RPG</option>
          <option>Strategie</option>
          <option>Simulation</option>
        </select>
        <select
          class="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-600">
          <option>Sortieren nach</option>
          <option>Name (A-Z)</option>
          <option>Name (Z-A)</option>
          <option>Zuletzt gespielt</option>
          <option>Spielzeit</option>
        </select>
      </div>
    </div>

    <!-- Spielekarten-Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div
        v-for="game in displayedGames"
        :key="game.id"
        class="group relative bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(124,58,237,0.2)]">
        <!-- Spielecover -->
        <div class="relative aspect-[3/4] w-full overflow-hidden">
          <img
            :src="game.coverUrl"
            :alt="game.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />

          <!-- Spielzeit-Badge -->
          <div
            class="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-xs font-medium">
            {{ game.playTime }}
          </div>

          <!-- Plattform-Logo -->
          <div
            class="absolute top-2 left-2 w-8 h-8 bg-black/70 flex items-center justify-center rounded">
            <span>{{ getPlatformIcon(game.platformId) }}</span>
          </div>
        </div>

        <!-- Spielinfo -->
        <div class="p-4">
          <h3 class="font-semibold text-base mb-1 line-clamp-1">
            {{ game.title }}
          </h3>
          <div class="flex items-center space-x-2 text-sm text-gray-400">
            <span>{{ game.releaseYear }}</span>
            <span class="text-xs">•</span>
            <span>{{ game.genre }}</span>
          </div>
        </div>

        <!-- Hover-Overlay mit Aktionen -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
          <h3 class="font-bold text-center mb-2">{{ game.title }}</h3>
          <div class="flex space-x-2 mb-4">
            <button
              class="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded text-sm font-medium transition-colors">
              Spielen
            </button>
            <button
              class="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Keine Spiele gefunden -->
    <div
      v-if="displayedGames.length === 0"
      class="mt-12 text-center py-16 border border-dashed border-gray-700 rounded-md bg-gray-800/40">
      <div class="text-4xl mb-4">🎮</div>
      <h3 class="text-xl font-medium mb-2">Keine Spiele gefunden</h3>
      <p class="text-gray-400 max-w-md mx-auto">
        Es sieht so aus, als hättest du für diese Plattform noch keine Spiele
        importiert oder deine Suche hat keine Ergebnisse geliefert.
      </p>
      <button
        class="mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-md text-sm font-medium transition-all">
        Spiele importieren
      </button>
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <div class="flex space-x-1">
        <button class="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md">
          &lt;
        </button>
        <button class="px-3 py-1 bg-purple-600 rounded-md">1</button>
        <button class="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md">
          2
        </button>
        <button class="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md">
          3
        </button>
        <button class="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md">
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>
