<!-- filepath: c:\Users\jgram\git\Nexus\components\GameCard\GameCard.vue -->
<template>
  <component
    :is="cardComponent"
    :game="game"
    :isSelectionMode="isSelectionMode"
    :isSelected="isSelected"
    @click="handleClick" />
</template>

<script setup lang="ts">
  import type { ViewMode } from '~/composables/useViewMode';
  import GameCardLarge from './GameCardLarge.vue';
  import GameCardMedium from './GameCardMedium.vue';
  import GameCardMini from './GameCardMini.vue';
  import GameCardList from './GameCardList.vue';

  interface Props {
    game: any;
    viewMode: ViewMode;
    isSelectionMode: boolean;
    isSelected: boolean;
  }

  interface Emits {
    (e: 'click'): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const cardComponent = computed(() => {
    switch (props.viewMode) {
      case 'large':
        return GameCardLarge;
      case 'medium':
        return GameCardMedium;
      case 'mini':
        return GameCardMini;
      case 'list':
        return GameCardList;
      default:
        return GameCardLarge;
    }
  });

  const handleClick = () => {
    emit('click');
  };
</script>
