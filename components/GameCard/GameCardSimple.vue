<!-- Vereinfachte GameCard nur für Game-Objekte ohne UserGame -->
<template>
  <component
    :is="cardComponent"
    :game="gameWithUserInfo"
    :isSelectionMode="isSelectionMode"
    :isSelected="isSelected"
    @click="handleClick" />
</template>

<script setup lang="ts">
  import type { ViewMode } from '~/composables/useViewMode';
  import type { UserGameWithDetails } from '~/lib/services/games.service';
  import type { Game } from '~/prisma/client';
  import GameCardLarge from './GameCardLarge.vue';
  import GameCardList from './GameCardList.vue';
  import GameCardMedium from './GameCardMedium.vue';
  import GameCardMini from './GameCardMini.vue';

  interface Props {
    game: Game;
    viewMode: ViewMode;
    isSelectionMode: boolean;
    isSelected: boolean;
    userGameId?: number; // Optional: ID der UserGame falls vorhanden
  }

  interface Emits {
    (e: 'click'): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const userStore = useUserStore();

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

  // Erstelle ein UserGameWithDetails-Objekt für die Kompatibilität
  const gameWithUserInfo = computed((): UserGameWithDetails => {
    return {
      game: props.game,
      userId: userStore.user?.id || 0,
      id: props.userGameId || 0, // 0 bedeutet nicht in Bibliothek
      gameId: props.game.id,
      platformIds: [],
      addedAt: new Date(),
      playtimeMinutes: 0,
      lastPlayed: null,
      isInstalled: false,
      isFavorite: false,
      notes: null
    };
  });

  const handleClick = () => {
    if (props.isSelectionMode) {
      emit('click');
    } else {
      navigateTo(`/game/${props.game.id}`);
    }
  };
</script>
