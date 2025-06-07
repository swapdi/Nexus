<!-- filepath: c:\Users\jgram\git\Nexus\components\GameCard\GameCardList.vue -->
<template>
  <div
    :class="[
      'bg-gray-800/50 backdrop-blur-sm rounded-lg border transition-all duration-300 group relative flex items-center p-3 gap-4',
      isSelectionMode
        ? 'cursor-pointer hover:border-blue-500/50'
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
        :src="game.coverUrl || './gameplaceholder.jpg'"
        :alt="game.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        @error="handleImageError" />
    </div>

    <!-- Game Title and Genres (flexible width) -->
    <div class="flex-1 min-w-0">
      <h3
        class="font-semibold text-white text-base line-clamp-1 group-hover:text-purple-300 transition-colors mb-1">
        {{ game.title }}
      </h3>

      <!-- Genres direkt unter dem Titel -->
      <div
        v-if="game.genres && game.genres.length > 0"
        class="flex flex-wrap gap-1">
        <span
          v-for="genre in game.genres.slice(0, 2)"
          :key="genre"
          class="px-2 py-0.5 bg-purple-600/20 text-purple-300 text-xs rounded border border-purple-500/30">
          {{ genre }}
        </span>
        <span
          v-if="game.genres.length > 2"
          class="px-2 py-0.5 bg-gray-600/30 text-gray-400 text-xs rounded">
          +{{ game.genres.length - 2 }}
        </span>
      </div>
    </div>

    <!-- Platforms (fixed width) -->
    <div class="w-24 flex-shrink-0 flex justify-center">
      <div class="flex gap-1">
        <div
          v-for="platform in game.platforms?.slice(0, 2)"
          :key="platform"
          class="flex items-center justify-center min-w-[24px] min-h-[18px]">
          <PlatformLogo :platform="platform" size="sm" />
        </div>
        <div
          v-if="game.platforms && game.platforms.length > 2"
          class="flex items-center justify-center min-w-[24px] min-h-[18px]">
          <span class="text-xs text-gray-400 font-medium"
            >+{{ game.platforms.length - 2 }}</span
          >
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
  </div>
</template>

<script setup lang="ts">
  interface Props {
    game: any;
    isSelectionMode: boolean;
    isSelected: boolean;
  }

  interface Emits {
    (e: 'click'): void;
  }

  defineProps<Props>();
  const emit = defineEmits<Emits>();

  const handleClick = () => {
    emit('click');
  };

  const handleImageError = (event: Event) => {
    if (event.target) {
      (event.target as HTMLImageElement).src = './gameplaceholder.jpg';
    }
  };

  const formatRating = (rating: number) => {
    return (rating / 10).toFixed(1);
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
