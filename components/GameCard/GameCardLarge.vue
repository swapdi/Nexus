<!-- filepath: c:\Users\jgram\git\Nexus\components\GameCard\GameCardLarge.vue -->
<template>
  <div
    :class="[
      'bg-gray-800/50 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-300 group relative flex flex-col h-full cursor-pointer',
      isSelectionMode
        ? 'hover:border-blue-500/50'
        : 'hover:border-purple-500/50',
      isSelected
        ? 'border-blue-500 ring-2 ring-blue-500/30'
        : 'border-gray-700/50'
    ]"
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
        :src="game.coverUrl || './gameplaceholder.jpg'"
        :alt="game.title"
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
      <!-- Platform Logos -->
      <div class="absolute top-2 left-2 flex flex-wrap gap-1">
        <div
          v-for="platform in game.platforms"
          :key="platform"
          class="bg-black/80 backdrop-blur-sm rounded-md px-2 py-1.5 flex items-center justify-center min-w-[32px] min-h-[24px]">
          <PlatformLogo :platform="platform" size="md" />
        </div>
      </div>

      <!-- Rating Badge -->
      <div
        v-if="game.rating"
        class="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
        <div class="flex items-center gap-1">
          <Icon
            name="heroicons:star-16-solid"
            class="w-3 h-3 text-yellow-400" />
          <span class="text-xs text-white font-medium">{{
            formatRating(game.rating)
          }}</span>
        </div>
      </div>
    </div>

    <!-- Game Info -->
    <div class="p-4 flex flex-col flex-1">
      <h3
        class="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
        {{ game.title }}
      </h3>

      <!-- Genres -->
      <div
        v-if="game.genres && game.genres.length > 0"
        class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="genre in game.genres.slice(0, 2)"
          :key="genre"
          class="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-md border border-purple-500/30">
          {{ genre }}
        </span>
        <span
          v-if="game.genres.length > 2"
          class="px-2 py-1 bg-gray-600/30 text-gray-400 text-xs rounded-md">
          +{{ game.genres.length - 2 }}
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
