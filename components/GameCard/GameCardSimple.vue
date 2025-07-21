<!-- Vereinfachte GameCard nur für Game-Objekte ohne UserGame -->
<template>
  <component
    :is="cardComponent"
    :game="gameWithUserInfo"
    :isSelectionMode="isSelectionMode"
    :isSelected="isSelected"
    :showFavoriteButton="showFavoriteButton"
    :showWishlistButton="showWishlistButton"
    @click="handleClick" />
</template>

<script setup lang="ts">
  import GameCardLarge from './GameCardLarge.vue';
  import GameCardList from './GameCardList.vue';
  import GameCardMedium from './GameCardMedium.vue';
  import GameCardMini from './GameCardMini.vue';

  interface Props {
    game: PrismaGame;
    viewMode: ViewMode;
    isSelectionMode: boolean;
    isSelected: boolean;
    userGameId?: number; // Optional: ID der UserGame falls vorhanden
    showFavoriteButton?: boolean;
    showWishlistButton?: boolean;
  }

  interface Emits {
    (e: 'click'): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    showFavoriteButton: false, // Für reine Game-Objekte standardmäßig aus
    showWishlistButton: true // Wishlist standardmäßig an
  });
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
      platformDRMs: [],
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
