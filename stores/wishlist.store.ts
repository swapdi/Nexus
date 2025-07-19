import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type {
  FullWishlistItem,
  WishlistDealNotification
} from '~/lib/services/wishlist.service';
import { useLoading } from '~/stores/loading.store';

export const useWishlistStore = defineStore('wishlist', () => {
  const notifyStore = useNotifyStore();
  const { $client } = useNuxtApp();
  const { loading } = useLoading();

  // State
  const wishlistItems = ref<FullWishlistItem[]>([]);
  const wishlistCount = ref<number>(0);
  const dealNotifications = ref<WishlistDealNotification[]>([]);

  // Computed
  const hasWishlistItems = computed(() => wishlistItems.value.length > 0);
  const sortedWishlistItems = computed(() =>
    [...wishlistItems.value].sort(
      (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    )
  );

  // Actions
  const loadWishlist = async () => {
    return await loading(
      'load-wishlist',
      'Lade Wishlist...',
      async () => {
        try {
          const result = await $client.wishlist.getUserWishlist.query();
          wishlistItems.value = result;
          wishlistCount.value = result.length;
          return result;
        } catch (error) {
          console.error('Error loading wishlist:', error);
          notifyStore.notify(
            'Fehler beim Laden der Wishlist. Bitte versuche es später erneut.',
            3
          );
          throw error;
        }
      },
      'data'
    );
  };

  const addToWishlist = async (gameId: number) => {
    return await loading(
      'add-to-wishlist',
      'Spiel wird zur Wishlist hinzugefügt...',
      async () => {
        try {
          const result = await $client.wishlist.addToWishlist.mutate({
            gameId
          });

          // Zur lokalen Liste hinzufügen
          wishlistItems.value.unshift(result);
          wishlistCount.value = wishlistItems.value.length;

          notifyStore.notify('Spiel erfolgreich zur Wishlist hinzugefügt', 1);
          return result;
        } catch (error: any) {
          console.error('Error adding to wishlist:', error);

          if (error.message?.includes('bereits in deiner Wishlist')) {
            notifyStore.notify('Spiel ist bereits in deiner Wishlist', 2);
          } else {
            notifyStore.notify('Fehler beim Hinzufügen zur Wishlist', 3);
          }
          throw error;
        }
      },
      'process'
    );
  };

  const removeFromWishlist = async (gameId: number) => {
    return await loading(
      'remove-from-wishlist',
      'Spiel wird aus der Wishlist entfernt...',
      async () => {
        try {
          await $client.wishlist.removeFromWishlist.mutate({ gameId });

          // Aus lokaler Liste entfernen
          wishlistItems.value = wishlistItems.value.filter(
            item => item.gameId !== gameId
          );
          wishlistCount.value = wishlistItems.value.length;

          notifyStore.notify('Spiel erfolgreich aus der Wishlist entfernt', 1);
          return true;
        } catch (error) {
          console.error('Error removing from wishlist:', error);
          notifyStore.notify('Fehler beim Entfernen aus der Wishlist', 3);
          throw error;
        }
      },
      'process'
    );
  };

  const isInWishlist = async (gameId: number): Promise<boolean> => {
    try {
      return await $client.wishlist.isInWishlist.query({ gameId });
    } catch (error) {
      console.error('Error checking wishlist status:', error);
      return false;
    }
  };

  const toggleWishlist = async (gameId: number): Promise<boolean> => {
    const inWishlist = await isInWishlist(gameId);

    if (inWishlist) {
      await removeFromWishlist(gameId);
      return false;
    } else {
      await addToWishlist(gameId);
      return true;
    }
  };

  const loadWishlistCount = async () => {
    try {
      const count = await $client.wishlist.getWishlistCount.query();
      wishlistCount.value = count;
      return count;
    } catch (error) {
      console.error('Error loading wishlist count:', error);
      throw error;
    }
  };

  const checkWishlistDeals = async () => {
    return await loading(
      'check-wishlist-deals',
      'Prüfe Wishlist-Deals...',
      async () => {
        try {
          const notifications =
            await $client.wishlist.checkWishlistDeals.query();
          dealNotifications.value = notifications;

          if (notifications.length > 0) {
            const totalDeals = notifications.reduce(
              (sum, notif) => sum + notif.deals.length,
              0
            );
          }
          return notifications;
        } catch (error) {
          console.error('Error checking wishlist deals:', error);
          notifyStore.notify('Fehler beim Prüfen der Wishlist-Deals', 3);
          throw error;
        }
      },
      'process'
    );
  };

  // Hilfsfunktion: Spiel in lokaler Wishlist suchen
  const findWishlistItem = (gameId: number) => {
    return wishlistItems.value.find(item => item.gameId === gameId);
  };

  // Hilfsfunktion: Lokaler Wishlist-Status (ohne API-Aufruf)
  const isInWishlistLocal = (gameId: number): boolean => {
    return wishlistItems.value.some(item => item.gameId === gameId);
  };

  const reset = () => {
    wishlistItems.value = [];
    wishlistCount.value = 0;
    dealNotifications.value = [];
  };

  return {
    // State
    wishlistItems,
    wishlistCount,
    dealNotifications,

    // Computed
    hasWishlistItems,
    sortedWishlistItems,

    // Actions
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    loadWishlistCount,
    checkWishlistDeals,

    // Helpers
    findWishlistItem,
    isInWishlistLocal,
    reset
  };
});
