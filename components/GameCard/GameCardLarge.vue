<template>
  <div
    class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
    @click="handleClick">
    <!-- Auswahlindikator -->
    <div v-if="isSelectionMode" class="absolute top-3 right-3 z-20">
      <div
        :class="[
          'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200',
          isSelected
            ? 'bg-blue-500 border-blue-500'
            : 'bg-gray-800/80 border-gray-400 backdrop-blur-sm'
        ]">
        <Icon
          v-if="isSelected"
          name="heroicons:check-20-solid"
          class="w-4 h-4 text-white" />
      </div>
    </div>
    <!-- Cover Image -->
    <div class="aspect-[3/4] bg-gray-700/50 relative overflow-hidden">
      <img
        :src="gameData.coverUrl || './gameplaceholder.jpg'"
        :alt="gameData.name"
        :class="[
          'w-full h-full object-cover transition-transform duration-300',
          isSelectionMode
            ? isSelected
              ? 'scale-105'
              : 'group-hover:scale-105'
            : 'group-hover:scale-105'
        ]"
        loading="lazy"
        @error="handleImageError" />
      <!-- Platform Badges -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <div
          v-for="platformId in game.platformDRMs"
          :key="platformId"
          class="bg-black/80 backdrop-blur-sm rounded-md px-2 py-1.5 flex items-center justify-center">
          <Icon
            :name="getPlatformIconByDRM(platformId)"
            :class="['w-4 h-4', getPlatformColorByDRM(platformId)]" />
        </div>
      </div>
      <!-- Favorite Icon -->
      <div
        v-if="!isSelectionMode && showFavoriteButton"
        class="absolute bottom-2 left-2 z-10">
        <button
          @click.stop="toggleFavorite"
          :disabled="!canToggleFavorite"
          class="w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/90 flex items-center justify-center transition-all duration-200 group/favorite disabled:opacity-50 disabled:cursor-not-allowed">
          <Icon
            :name="
              game.isFavorite
                ? 'heroicons:heart-20-solid'
                : 'heroicons:heart-20-solid'
            "
            :class="[
              'w-4 h-4 transition-all duration-200',
              game.isFavorite
                ? 'text-red-500 scale-110'
                : 'text-gray-400 group-hover/favorite:text-red-400 group-hover/favorite:scale-105'
            ]" />
        </button>
      </div>

      <!-- Wishlist Icon -->
      <div
        v-if="!isSelectionMode && showWishlistButton"
        class="absolute bottom-2 left-2 z-10"
        :class="{ 'left-12': showFavoriteButton }">
        <EnhancedWishlistButton
          :game-id="gameData.id"
          :game-title="gameData.name"
          variant="floating"
          size="medium"
          :show-text="false"
          mode="both"
          :enable-i-t-a-d="true" />
      </div>
      <!-- Rating Badge -->
      <div
        v-if="gameData.totalRating"
        class="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
        <div class="flex items-center gap-1">
          <Icon
            name="heroicons:star-16-solid"
            class="w-3 h-3 text-yellow-400" />
          <span class="text-xs text-white font-medium">{{
            (gameData.totalRating / 10).toFixed(1)
          }}</span>
        </div>
      </div>
    </div>
    <!-- Game Info -->
    <div class="p-4 flex flex-col flex-1">
      <h3
        class="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
        {{ gameData.name }}
      </h3>
      <!-- Genres -->
      <div
        v-if="gameData.genres && gameData.genres.length > 0"
        class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="genre in gameData.genres.slice(0, 2)"
          :key="genre"
          class="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-md border border-purple-500/30">
          {{ genre }}
        </span>
        <span
          v-if="gameData.genres.length > 2"
          class="px-2 py-1 bg-gray-600/30 text-gray-400 text-xs rounded-md">
          +{{ gameData.genres.length - 2 }}
        </span>
      </div>
      <!-- Spacer to push stats to bottom -->
      <div class="flex-1"></div>
      <!-- Stats - jetzt am unteren Rand -->
      <div
        class="flex items-center justify-between text-xs text-gray-400 mt-auto">
        <!-- Spielzeit -->
        <div v-if="game.playtimeMinutes" class="flex items-center gap-1">
          <Icon name="heroicons:clock-16-solid" class="w-3 h-3" />
          <span>{{ formatPlayTime(game.playtimeMinutes) }}</span>
        </div>
        <!-- Zuletzt gespielt -->
        <div v-if="game.lastPlayed" class="flex items-center gap-1">
          <Icon name="heroicons:calendar-16-solid" class="w-3 h-3" />
          <span>{{ formatLastPlayed(game.lastPlayed) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { UserGameWithDetails } from '~/lib/services/games.service';

  interface Props {
    game: UserGameWithDetails;
    isSelectionMode: boolean;
    isSelected: boolean;
    showFavoriteButton?: boolean;
    showWishlistButton?: boolean;
  }

  interface Emits {
    (e: 'click'): void;
    (e: 'toggleFavorite', userGameId: number): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    showFavoriteButton: true,
    showWishlistButton: false
  });
  const emit = defineEmits<Emits>();
  const { getPlatformIcon, getPlatformColor } = usePlatforms();

  // Zugriff auf die verschachtelten Spieldaten
  const gameData = computed(() => props.game.game);

  // Favoriten können nur für echte UserGames getoggelt werden
  const canToggleFavorite = computed(() => props.game.id > 0);

  const handleClick = () => {
    emit('click');
  };

  const toggleFavorite = () => {
    if (canToggleFavorite.value) {
      emit('toggleFavorite', props.game.id);
    }
  };

  const handleImageError = (event: Event) => {
    if (event.target) {
      (event.target as HTMLImageElement).src = './gameplaceholder.jpg';
    }
  };

  /**
   * Hole Platform Icon basierend auf DRM ID
   */
  const getPlatformIconByDRM = (platformId: number) => {
    // Mapping von Platform IDs zu Slugs (temporär bis API verfügbar)
    const platformMap: Record<number, string> = {
      1: 'steam',
      2: 'epic',
      3: 'gog'
    };

    const slug = platformMap[platformId];
    return getPlatformIcon(slug || 'unknown');
  };

  /**
   * Hole Platform Farbe basierend auf DRM ID
   */
  const getPlatformColorByDRM = (platformId: number) => {
    // Mapping von Platform IDs zu Slugs (temporär bis API verfügbar)
    const platformMap: Record<number, string> = {
      1: 'steam',
      2: 'epic',
      3: 'gog'
    };

    const slug = platformMap[platformId];
    return getPlatformColor(slug || 'unknown');
  };
  const formatPlayTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours < 2) {
      if (hours === 0) {
        return `${minutes} Min`;
      } else if (remainingMinutes === 0) {
        return `${hours}h`;
      } else {
        return `${hours}h ${remainingMinutes}m`;
      }
    } else {
      return `${hours}h`;
    }
  };
  const formatLastPlayed = (date: string | Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffInDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return 'Heute';
    if (diffInDays === 1) return 'Gestern';
    if (diffInDays < 7) return `Vor ${diffInDays} Tagen`;
    if (diffInDays < 30) return `Vor ${Math.ceil(diffInDays / 7)} Wochen`;
    if (diffInDays < 365) return `Vor ${Math.ceil(diffInDays / 30)} Monaten`;
    return `Vor ${Math.ceil(diffInDays / 365)} Jahren`;
  };
</script>
