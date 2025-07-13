<template>
  <component
    :is="cardComponent"
    :deal="deal"
    @click="handleClick"
    @wishlist="handleWishlist" />
</template>

<script setup lang="ts">
  import type { ViewMode } from '~/composables/useViewMode';
  import type { DealWithGame } from '~/lib/services/deals.service';
  import DealCardLarge from './DealCardLarge.vue';
  import DealCardList from './DealCardList.vue';
  import DealCardMedium from './DealCardMedium.vue';
  import DealCardMini from './DealCardMini.vue';

  interface Props {
    deal: DealWithGame;
    viewMode: ViewMode;
  }

  interface Emits {
    (e: 'click', deal: DealWithGame): void;
    (e: 'wishlist', deal: DealWithGame): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const cardComponent = computed(() => {
    switch (props.viewMode) {
      case 'large':
        return DealCardLarge;
      case 'medium':
        return DealCardMedium;
      case 'mini':
        return DealCardMini;
      case 'list':
        return DealCardList;
      default:
        return DealCardLarge;
    }
  });

  const handleClick = () => {
    emit('click', props.deal);
  };

  const handleWishlist = () => {
    emit('wishlist', props.deal);
  };
</script>
