<!-- filepath: c:\Users\jgram\git\Nexus\components\GameCard\GameCardList.vue -->
<template>
  <div
    :class="[
      'bg-gray-800/50 backdrop-blur-sm rounded-lg border transition-all duration-300 group relative flex items-center p-3 gap-4 cursor-pointer',
      isSelectionMode
        ? 'hover:border-blue-500/50'
        : 'hover:border-purple-500/50',
      isSelected
        ? 'border-blue-500 ring-2 ring-blue-500/30'
        : 'border-gray-700/50'
    ]"
    @click="handleClick">
    <!-- Auswahlindikator -->
    <div v-if="isSelectionMode" class="flex-shrink-0">
      <div
        :class="[
          'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
          isSelected
            ? 'bg-blue-500 border-blue-500'
            : 'bg-gray-800/80 border-gray-400 backdrop-blur-sm'
        ]">
        <Icon
          v-if="isSelected"
          name="heroicons:check-16-solid"
          class="w-3 h-3 text-white" />
      </div>
    </div>
    <!-- Cover Image -->
    <div
      class="flex-shrink-0 w-12 h-16 bg-gray-700/50 rounded overflow-hidden relative">
      <img
        :src="gameData.coverUrl || './gameplaceholder.jpg'"
        :alt="gameData.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        @error="handleImageError" />
    </div>
    <!-- Game Title and Genres (flexible width) -->
    <div class="flex-1 min-w-0">
      <h3
        class="font-semibold text-white text-base line-clamp-1 group-hover:text-purple-300 transition-colors mb-1">
        {{ gameData.name }}
      </h3>
      <!-- Genres direkt unter dem Titel -->
      <div
        v-if="gameData.genres && gameData.genres.length > 0"
        class="flex flex-wrap gap-1">
        <span
          v-for="genre in gameData.genres.slice(0, 2)"
          :key="genre"
          class="px-2 py-0.5 bg-purple-600/20 text-purple-300 text-xs rounded border border-purple-500/30">
          {{ genre }}
        </span>
        <span
          v-if="gameData.genres.length > 2"
          class="px-2 py-0.5 bg-gray-600/30 text-gray-400 text-xs rounded">
          +{{ gameData.genres.length - 2 }}
        </span>
      </div>
    </div>
    <!-- Platform Badges -->
    <div class="w-24 flex-shrink-0 flex justify-center">
      <div class="flex gap-1">
        <div
          v-for="platformId in game.platformDRMs"
          :key="platformId"
          class="bg-black/80 backdrop-blur-sm rounded px-2 py-1 flex items-center justify-center">
          <Icon
            :name="getPlatformIconByDRM(platformId)"
            :class="['w-4 h-4', getPlatformColorByDRM(platformId)]" />
        </div>
      </div>
    </div>
    <!-- Play Time (fixed width) -->
    <div class="w-20 flex-shrink-0 text-center">
      <div class="flex items-center justify-center gap-1">
        <Icon name="heroicons:clock-16-solid" class="w-3 h-3 text-gray-400" />
        <span class="text-sm text-gray-300">{{
          game.playtimeMinutes ? formatPlayTime(game.playtimeMinutes) : '0 Min'
        }}</span>
      </div>
    </div>
    <!-- Last Played (fixed width) -->
    <div class="w-24 flex-shrink-0 text-center hidden sm:block">
      <div class="flex items-center justify-center gap-1">
        <Icon
          name="heroicons:calendar-16-solid"
          class="w-3 h-3 text-gray-400" />
        <span class="text-sm text-gray-300">{{
          game.lastPlayed ? formatLastPlayed(game.lastPlayed) : 'Nie'
        }}</span>
      </div>
    </div>
    <!-- Action Buttons Container -->
    <div v-if="!isSelectionMode" class="flex-shrink-0 flex items-center gap-2">
      <!-- Favorite Button -->
      <div v-if="showFavoriteButton">
        <button
          @click.stop="toggleFavorite"
          :disabled="!canToggleFavorite"
          class="w-7 h-7 rounded-full bg-gray-700/50 hover:bg-gray-600/50 flex items-center justify-center transition-all duration-200 group/favorite disabled:opacity-50 disabled:cursor-not-allowed">
          <Icon
            :name="
              game.isFavorite
                ? 'heroicons:heart-16-solid'
                : 'heroicons:heart-16-solid'
            "
            :class="[
              'w-3.5 h-3.5 transition-all duration-200',
              game.isFavorite
                ? 'text-red-500 scale-110'
                : 'text-gray-400 group-hover/favorite:text-red-400 group-hover/favorite:scale-105'
            ]" />
        </button>
      </div>

      <!-- Wishlist Button -->
      <div v-if="showWishlistButton">
        <WishlistButton
          :game-id="gameData.id"
          variant="icon"
          size="medium"
          :show-text="false" />
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

  const props = withDefaults(defineProps<Props>(), {
    showFavoriteButton: true,
    showWishlistButton: true
  });

  interface Emits {
    (e: 'click'): void;
    (e: 'toggleFavorite', userGameId: number): void;
  }
  const emit = defineEmits<Emits>();
  const { getPlatformIcon, getPlatformColor } = usePlatforms();

  // Compute visibility of favorite button based on game being a UserGame
  const canToggleFavorite = computed(() => {
    return (
      props.showFavoriteButton &&
      props.game &&
      typeof props.game.id === 'number'
    );
  });

  // Zugriff auf die verschachtelten Spieldaten
  const gameData = computed(() => props.game.game);

  const handleClick = () => {
    emit('click');
  };

  const toggleFavorite = () => {
    emit('toggleFavorite', props.game.id);
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
    const platformMap: Record<number, string> = {
      1: 'steam',
      2: 'epic',
      3: 'gog'
    };

    const slug = platformMap[platformId];
    return getPlatformColor(slug || 'unknown');
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
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
