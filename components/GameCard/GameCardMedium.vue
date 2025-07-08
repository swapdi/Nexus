<template>
  <div
    :class="[
      'bg-gray-800/50 backdrop-blur-sm rounded-lg border overflow-hidden transition-all duration-300 group relative flex flex-col h-full cursor-pointer',
      isSelectionMode
        ? 'hover:border-blue-500/50'
        : 'hover:border-purple-500/50',
      isSelected
        ? 'border-blue-500 ring-2 ring-blue-500/30'
        : 'border-gray-700/50'
    ]"
    @click="handleClick">
    <!-- Auswahlindikator -->
    <div v-if="isSelectionMode" class="absolute top-2 right-2 z-20">
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
    <div class="aspect-[3/4] bg-gray-700/50 relative overflow-hidden">
      <img
        :src="gameData.coverUrl || './gameplaceholder.jpg'"
        :alt="gameData.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        @error="handleImageError" />

      <!-- Platform Badge (Steam) -->
      <div class="absolute top-1 left-1">
        <div
          class="bg-black/80 backdrop-blur-sm rounded px-1.5 py-1 flex items-center justify-center min-w-[28px] min-h-[20px]">
          <Icon name="simple-icons:steam" class="w-3 h-3 text-blue-400" />
        </div>
      </div>

      <!-- Favorite Icon -->
      <div v-if="!isSelectionMode" class="absolute bottom-1 left-1 z-10">
        <button
          @click.stop="toggleFavorite"
          class="w-6 h-6 rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/90 flex items-center justify-center transition-all duration-200 group/favorite">
          <Icon
            :name="
              game.isFavorite
                ? 'heroicons:heart-20-solid'
                : 'heroicons:heart-20-solid'
            "
            :class="[
              'w-3.5 h-3.5 transition-all duration-200',
              game.isFavorite
                ? 'text-red-500 scale-110'
                : 'text-gray-400 group-hover/favorite:text-red-400 group-hover/favorite:scale-105'
            ]" />
        </button>
      </div>

      <!-- Rating Badge -->
      <div
        v-if="gameData.totalRating"
        class="absolute bottom-1 right-1 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded">
        <div class="flex items-center gap-0.5">
          <Icon
            name="heroicons:star-16-solid"
            class="w-2.5 h-2.5 text-yellow-400" />
          <span class="text-xs text-white font-medium">{{
            (gameData.totalRating / 10).toFixed(1)
          }}</span>
        </div>
      </div>
    </div>

    <!-- Game Info -->
    <div class="p-2 flex flex-col flex-1">
      <div class="flex items-start justify-between gap-2 mb-1">
        <h3
          class="font-medium text-white text-sm line-clamp-2 group-hover:text-purple-300 transition-colors flex-1">
          {{ gameData.name }}
        </h3>
      </div>

      <!-- Genres -->
      <div v-if="gameData.genres && gameData.genres.length > 0" class="mb-1">
        <div class="flex flex-wrap gap-1">
          <span
            v-for="genre in gameData.genres.slice(0, 2)"
            :key="genre"
            class="px-1.5 py-0.5 bg-purple-600/20 text-purple-300 text-xs rounded border border-purple-500/30">
            {{ genre }}
          </span>
          <span
            v-if="gameData.genres.length > 2"
            class="px-1.5 py-0.5 bg-gray-600/30 text-gray-400 text-xs rounded">
            +{{ gameData.genres.length - 2 }}
          </span>
        </div>
      </div>

      <!-- Spacer -->
      <div class="flex-1"></div>

      <!-- Stats -->
      <div class="flex items-center justify-between text-xs text-gray-400 mt-1">
        <!-- Spielzeit -->
        <div v-if="game.playtimeMinutes" class="flex items-center gap-1">
          <Icon name="heroicons:clock-16-solid" class="w-2.5 h-2.5" />
          <span>{{ formatPlayTime(game.playtimeMinutes) }}</span>
        </div>

        <!-- Zuletzt gespielt -->
        <div v-if="game.lastPlayed" class="flex items-center gap-1">
          <Icon name="heroicons:calendar-16-solid" class="w-2.5 h-2.5" />
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
  }

  interface Emits {
    (e: 'click'): void;
    (e: 'toggleFavorite', userGameId: number): void;
  }
  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

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
  const formatRating = (rating: number) => {
    return rating.toFixed(1);
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
    if (diffInDays === 1) return 'Gestern';
    if (diffInDays < 7) return `${diffInDays}d`;
    if (diffInDays < 30) return `${Math.ceil(diffInDays / 7)}w`;
    return `${Math.ceil(diffInDays / 30)}mo`;
  };
</script>
