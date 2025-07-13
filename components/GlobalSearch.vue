<template>
  <div class="relative w-full">
    <!-- Search Input -->
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon
          name="heroicons:magnifying-glass-20-solid"
          class="h-5 w-5 text-gray-400" />
      </div>
      <input
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        placeholder="Spiele durchsuchen... (Ctrl+K)"
        class="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        @keydown.enter="performSearch"
        @keydown.escape="clearSearch"
        @keydown.arrow-down="highlightNext"
        @keydown.arrow-up="highlightPrevious"
        @focus="showSuggestions = true"
        @blur="handleBlur" />
    </div>
    <!-- Search Suggestions Dropdown -->
    <div
      v-if="
        showSuggestions &&
        (suggestions.length > 0 || (!isLoading && searchQuery.length >= 2))
      "
      class="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
      <!-- No Results Message -->
      <div
        v-if="suggestions.length === 0 && !isLoading && searchQuery.length >= 2"
        class="p-4 text-center text-gray-400">
        <Icon
          name="heroicons:magnifying-glass-20-solid"
          class="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>Keine Ergebnisse gefunden</p>
        <p class="text-sm mt-1">Versuche es mit anderen Suchbegriffen</p>
      </div>
      <!-- Search Results -->
      <div v-else-if="suggestions.length > 0" class="p-2">
        <div
          v-for="(suggestion, index) in suggestions"
          :key="suggestion.id"
          :class="[
            'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-150',
            highlightedIndex === index
              ? 'bg-green-600/20 border border-green-500/30'
              : 'hover:bg-gray-700/50'
          ]"
          @mousedown="selectSuggestion(suggestion)"
          @mouseenter="highlightedIndex = index">
          <!-- Game Cover -->
          <div
            class="flex-shrink-0 w-12 h-16 bg-gray-600/50 rounded overflow-hidden">
            <img
              v-if="suggestion.coverUrl"
              :src="suggestion.coverUrl"
              :alt="suggestion.name"
              class="w-full h-full object-cover"
              loading="lazy" />
            <div v-else class="w-full h-full flex items-center justify-center">
              <Icon
                name="heroicons:photo-20-solid"
                class="w-4 h-4 text-gray-500" />
            </div>
          </div>
          <!-- Game Info -->
          <div class="flex-1 min-w-0">
            <h4 class="font-medium text-white text-sm line-clamp-1">
              {{ suggestion.name }}
            </h4>
            <div class="flex items-center gap-2 mt-1">
              <span
                v-if="suggestion.firstReleaseDate"
                class="text-xs text-gray-400">
                {{ new Date(suggestion.firstReleaseDate).getFullYear() }}
              </span>
              <span
                v-if="suggestion.developers?.[0]"
                class="text-xs text-gray-400">
                • {{ suggestion.developers[0] }}
              </span>
            </div>
          </div>
          <!-- Search Icon -->
          <div class="flex-shrink-0">
            <Icon
              name="heroicons:arrow-top-right-on-square-20-solid"
              class="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
      <!-- Show All Results Footer -->
      <div v-if="suggestions.length > 0" class="border-t border-gray-600 p-3">
        <button
          @mousedown="showAllResults"
          class="w-full text-left text-sm text-green-400 hover:text-green-300 transition-colors">
          Alle Ergebnisse für "{{ searchQuery }}" anzeigen →
        </button>
      </div>
    </div>
    <!-- Loading Indicator -->
    <div
      v-if="isLoading"
      class="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 p-4">
      <div class="flex items-center justify-center gap-2 text-gray-400">
        <Icon
          name="heroicons:arrow-path-20-solid"
          class="w-4 h-4 animate-spin" />
        <span class="text-sm">Suche...</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { Game } from '~/prisma/client';
  // References
  const searchInput = ref<HTMLInputElement | null>(null);
  const { $client } = useNuxtApp();
  const router = useRouter();
  // State
  const searchQuery = ref('');
  const suggestions = ref<Game[]>([]);
  const showSuggestions = ref(false);
  const isLoading = ref(false);
  const highlightedIndex = ref(-1);
  // Debounced search
  let debounceTimeout: NodeJS.Timeout;
  const debouncedSearch = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      if (searchQuery.value.length >= 2) {
        await searchSuggestions();
      } else {
        suggestions.value = [];
        showSuggestions.value = false;
      }
    }, 300);
  };
  // Watch search query
  watch(searchQuery, newQuery => {
    highlightedIndex.value = -1;
    if (newQuery.trim()) {
      debouncedSearch();
    } else {
      suggestions.value = [];
      showSuggestions.value = false;
    }
  });
  // Search for suggestions
  const searchSuggestions = async () => {
    if (!searchQuery.value.trim() || searchQuery.value.length < 2) return;
    isLoading.value = true;
    try {
      const response = await $client.games.searchGames.query({
        searchTerm: searchQuery.value,
        limit: 8
      });
      suggestions.value = response.games;
      showSuggestions.value = true;
    } catch (error) {
      console.error('Search suggestions error:', error);
      suggestions.value = [];
    } finally {
      isLoading.value = false;
    }
  };
  // Navigation methods
  const highlightNext = () => {
    if (highlightedIndex.value < suggestions.value.length - 1) {
      highlightedIndex.value++;
    }
  };
  const highlightPrevious = () => {
    if (highlightedIndex.value > 0) {
      highlightedIndex.value--;
    }
  };
  // Selection methods
  const selectSuggestion = (game: Game) => {
    router.push(`/game/${game.id}`);
    clearSearch();
  };
  const performSearch = () => {
    if (
      highlightedIndex.value >= 0 &&
      suggestions.value[highlightedIndex.value]
    ) {
      selectSuggestion(suggestions.value[highlightedIndex.value]);
    } else if (searchQuery.value.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`);
      clearSearch();
    }
  };
  const showAllResults = () => {
    if (searchQuery.value.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`);
      clearSearch();
    }
  };
  const clearSearch = () => {
    searchQuery.value = '';
    suggestions.value = [];
    showSuggestions.value = false;
    highlightedIndex.value = -1;
    searchInput.value?.blur();
  };
  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      showSuggestions.value = false;
    }, 150);
  };
  // Keyboard shortcut (Ctrl+K)
  onMounted(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.value?.focus();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown);
    });
  });
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
