<template>
  <div
    :class="[
      'bg-gray-800/50 backdrop-blur-sm rounded-lg border overflow-hidden transition-all duration-300 group relative flex flex-col h-full cursor-pointer',
      isSelectionMode
        ? 'hover:border-blue-500/50'
        : 'hover:border-purple-500/50',
      isSelected
        ? 'border-blue-500 ring-1 ring-blue-500/30'
        : 'border-gray-700/50'
    ]"
    @click="handleClick">
    <!-- Auswahlindikator -->
    <div v-if="isSelectionMode" class="absolute top-1 right-1 z-20">
      <div
        :class="[
          'w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200',
          isSelected
            ? 'bg-blue-500 border-blue-500'
            : 'bg-gray-800/80 border-gray-400 backdrop-blur-sm'
        ]">
        <Icon
          v-if="isSelected"
          name="heroicons:check-16-solid"
          class="w-2.5 h-2.5 text-white" />
      </div>
    </div>
    <!-- Cover Image -->
    <div class="aspect-[3/4] bg-gray-700/50 relative overflow-hidden">
      <img
        :src="gameData.coverUrl || './gameplaceholder.jpg'"
        :alt="gameData.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        @error="handleImageError" />
      <!-- Platform Badges -->
      <div class="absolute top-1 left-1 flex flex-col gap-0.5">
        <div
          v-for="platformId in game.platformDRMs"
          :key="platformId"
          class="bg-black/80 backdrop-blur-sm rounded px-1.5 py-1 flex items-center justify-center min-w-[26px] min-h-[18px]">
          <Icon
            :name="getPlatformIconByDRM(platformId)"
            :class="['w-3 h-3', getPlatformColorByDRM(platformId)]" />
        </div>
      </div>
      <!-- Favorite Icon -->
      <div
        v-if="!isSelectionMode && showFavoriteButton"
        class="absolute bottom-1 left-1 z-10">
        <button
          @click.stop="toggleFavorite"
          :disabled="!canToggleFavorite"
          class="w-5 h-5 rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/90 flex items-center justify-center transition-all duration-200 group/favorite disabled:opacity-50 disabled:cursor-not-allowed">
          <Icon
            :name="
              game.isFavorite
                ? 'heroicons:heart-16-solid'
                : 'heroicons:heart-16-solid'
            "
            :class="[
              'w-3 h-3 transition-all duration-200',
              game.isFavorite
                ? 'text-red-500 scale-110'
                : 'text-gray-400 group-hover/favorite:text-red-400 group-hover/favorite:scale-105'
            ]" />
        </button>
      </div>

      <!-- Wishlist Icon -->
      <div
        v-if="!isSelectionMode && showWishlistButton"
        class="absolute bottom-1 left-1 z-10"
        :class="{ 'left-7': showFavoriteButton }">
        <WishlistButton
          :game-id="gameData.id"
          variant="floating"
          size="small"
          :show-text="false" />
      </div>
      <!-- Rating Badge -->
      <div
        v-if="gameData.totalRating"
        class="absolute bottom-1 right-1 bg-black/80 backdrop-blur-sm px-1 py-0.5 rounded text-xs">
        <div class="flex items-center gap-0.5">
          <Icon
            name="heroicons:star-16-solid"
            class="w-2.5 h-2.5 text-yellow-400" />
          <span class="text-yellow-400 font-medium">{{
            (gameData.totalRating / 10).toFixed(1)
          }}</span>
        </div>
      </div>
    </div>
    <!-- Game Info (minimal) -->
    <div class="p-1.5 flex flex-col flex-1">
      <h3
        class="font-medium text-white text-xs mb-0.5 line-clamp-2 group-hover:text-purple-300 transition-colors leading-tight">
        {{ gameData.name }}
      </h3>
      <!-- Spacer to push stats to bottom -->
      <div
        class="flex items-center justify-between text-xs text-gray-400 mt-auto">
        <div v-if="game.playtimeMinutes" class="flex items-center gap-1">
          <Icon name="heroicons:clock-16-solid" class="w-2.5 h-2.5" />
          <span>{{ formatPlayTime(game.playtimeMinutes) }}</span>
        </div>
        <div v-if="game.lastPlayed" class="flex items-center gap-1">
          <Icon name="heroicons:calendar-16-solid" class="w-2.5 h-2.5" />
          <span>{{ formatLastPlayed(game.lastPlayed) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
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

  // Zugriff auf die verschachtelten Spieldaten
  const gameData = computed(() => props.game.game);

  // Favoriten können nur für echte UserGames getoggelt werden
  const canToggleFavorite = computed(() => props.game.id > 0);

  // Platform utilities
  const { getPlatformIcon, getPlatformColor } = usePlatforms();
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
  const formatPlayTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours < 2) {
      if (hours === 0) {
        return `${minutes}m`;
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
    if (diffInDays === 1) return '1d';
    if (diffInDays < 7) return `${diffInDays}d`;
    if (diffInDays < 30) return `${Math.ceil(diffInDays / 7)}w`;
    return `${Math.ceil(diffInDays / 30)}mo`;
  };
</script>
