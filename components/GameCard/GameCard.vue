<!-- filepath: c:\Users\jgram\git\Nexus\components\GameCard\GameCard.vue -->
<template>
  <component
    :is="cardComponent"
    :game="game"
    :isSelectionMode="isSelectionMode"
    :isSelected="isSelected"
    @click="handleClick"
    @toggleFavorite="handleToggleFavorite" />
</template>
<script setup lang="ts">
  import type { ViewMode } from '~/composables/useViewMode';
  import type { UserGameWithDetails } from '~/lib/services/games.service';
  import GameCardLarge from './GameCardLarge.vue';
  import GameCardList from './GameCardList.vue';
  import GameCardMedium from './GameCardMedium.vue';
  import GameCardMini from './GameCardMini.vue';
  interface Props {
    game: UserGameWithDetails;
    viewMode: ViewMode;
    isSelectionMode: boolean;
    isSelected: boolean;
  }
  interface Emits {
    (e: 'click'): void;
    (e: 'toggleFavorite', userGameId: number): void;
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
    if (props.isSelectionMode) {
      // Im Auswahlmodus: Emit für Auswahl
      emit('click');
    } else {
      // Im normalen Modus: Navigation zur Detailseite (mit Game ID)
      navigateTo(`/game/${props.game.game.id}`);
    }
  };
  const handleToggleFavorite = (userGameId: number) => {
    emit('toggleFavorite', userGameId);
  };
</script>
