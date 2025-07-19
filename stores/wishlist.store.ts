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
  const sortBy = ref<'date' | 'name' | 'priority'>('date');
  const filterBy = ref<'all' | 'high' | 'medium' | 'low'>('all');

  // Computed
  const hasWishlistItems = computed(() => wishlistItems.value.length > 0);

  const sortedWishlistItems = computed(() => {
    let items = [...wishlistItems.value];

    // Filter anwenden
    if (filterBy.value !== 'all') {
      items = items.filter(item => item.priority === filterBy.value);
    }

    // Sortierung anwenden
    switch (sortBy.value) {
      case 'date':
        items.sort(
          (a, b) =>
            new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
        );
        break;
      case 'name':
        items.sort((a, b) => a.game.name.localeCompare(b.game.name));
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        items.sort((a, b) => {
          const priorityA =
            priorityOrder[a.priority as keyof typeof priorityOrder] || 2;
          const priorityB =
            priorityOrder[b.priority as keyof typeof priorityOrder] || 2;
          return priorityB - priorityA;
        });
        break;
    }

    return items;
  });

  // Kategorisierte Items
  const categorizedItems = computed(() => {
    const categories = {
      high: wishlistItems.value.filter(item => item.priority === 'high'),
      medium: wishlistItems.value.filter(item => item.priority === 'medium'),
      low: wishlistItems.value.filter(item => item.priority === 'low')
    };
    return categories;
  });

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

  const addToWishlist = async (
    gameId: number,
    options?: {
      priority?: 'low' | 'medium' | 'high';
      category?: 'action' | 'rpg' | 'strategy' | 'indie' | 'other';
      priceAlert?: number;
      notes?: string;
      checkDeals?: boolean;
    }
  ) => {
    return await loading(
      'add-to-wishlist',
      'Spiel wird zur Wishlist hinzugefügt...',
      async () => {
        try {
          const result = await $client.wishlist.addToWishlist.mutate({
            gameId
          });

          // Zur lokalen Liste hinzufügen mit erweiterten Properties (temporär)
          const enhancedResult: FullWishlistItem = {
            ...result,
            priority: options?.priority || 'medium',
            category: options?.category,
            priceAlert: options?.priceAlert,
            notes: options?.notes
          };

          wishlistItems.value.unshift(enhancedResult);
          wishlistCount.value = wishlistItems.value.length;

          notifyStore.notify(
            '✅ Spiel erfolgreich zur Wishlist hinzugefügt',
            1
          );

          // Automatisch nach Deals suchen wenn aktiviert
          if (options?.checkDeals) {
            setTimeout(async () => {
              await checkSingleGameDeals(gameId);
            }, 1000);
          }

          return enhancedResult;
        } catch (error: any) {
          console.error('Error adding to wishlist:', error);

          if (error.message?.includes('bereits in deiner Wishlist')) {
            notifyStore.notify('ℹ️ Spiel ist bereits in deiner Wishlist', 2);
          } else {
            notifyStore.notify('❌ Fehler beim Hinzufügen zur Wishlist', 3);
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
          notifyStore.notify('❌ Fehler beim Entfernen aus der Wishlist', 3);
          throw error;
        }
      },
      'process'
    );
  };

  const checkSingleGameDeals = async (gameId: number) => {
    try {
      // Finde das Spiel in der Wishlist
      const wishlistItem = wishlistItems.value.find(
        item => item.gameId === gameId
      );
      if (!wishlistItem) return;

      // Verwende das DealsStore für die Suche
      const dealsStore = useDealsStore();
      if (!dealsStore) return;

      const deals = await dealsStore.searchGameDeals(
        gameId,
        wishlistItem.game.name,
        wishlistItem.game.slug || undefined
      );

      // Filtere relevante Deals
      const relevantDeals = deals.filter(
        (deal: any) =>
          deal.isFreebie || (deal.discountPercent && deal.discountPercent > 0)
      );

      if (relevantDeals.length > 0) {
        const freeDeals = relevantDeals.filter((d: any) => d.isFreebie);
        const discountDeals = relevantDeals.filter((d: any) => !d.isFreebie);

        let message = `🎮 ${wishlistItem.game.name}: `;
        if (freeDeals.length > 0) {
          message += `${freeDeals.length} kostenlose${
            freeDeals.length === 1 ? 's' : ''
          } Angebot${freeDeals.length === 1 ? '' : 'e'}`;
          if (discountDeals.length > 0) {
            message += ` und ${discountDeals.length} reduzierte${
              discountDeals.length === 1 ? 's' : ''
            } Angebot${discountDeals.length === 1 ? '' : 'e'}`;
          }
        } else if (discountDeals.length > 0) {
          message += `${discountDeals.length} reduzierte${
            discountDeals.length === 1 ? 's' : ''
          } Angebot${discountDeals.length === 1 ? '' : 'e'}`;
        }
        message += ` gefunden!`;

        notifyStore.notify(message, 1);
      }
    } catch (error) {
      console.error('Fehler beim Prüfen der Deals für einzelnes Spiel:', error);
    }
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

            // Erweiterte Notification mit Icons und Details
            let message = `🎉 Wishlist-Update: ${totalDeals} neue Deal${
              totalDeals === 1 ? '' : 's'
            } gefunden!\n`;

            // Zeige Details für bis zu 3 Spiele
            const displayNotifications = notifications.slice(0, 3);
            for (const notification of displayNotifications) {
              const gameDeals = notification.deals;
              const freeDeals = gameDeals.filter(
                d => d.price === null || d.price === 0
              );
              const discountDeals = gameDeals.filter(
                d =>
                  d.price !== null &&
                  d.price > 0 &&
                  d.discountPercent &&
                  d.discountPercent > 0
              );

              message += `🎮 ${notification.gameName}: `;
              if (freeDeals.length > 0) {
                message += `${freeDeals.length} kostenlos`;
                if (discountDeals.length > 0) {
                  message += `, ${discountDeals.length} reduziert`;
                }
              } else if (discountDeals.length > 0) {
                message += `${discountDeals.length} reduziert`;
              }
              message += '\n';
            }

            // Wenn mehr als 3 Spiele
            if (notifications.length > 3) {
              message += `...und ${notifications.length - 3} weitere Spiele`;
            }

            notifyStore.notify(message, 1);
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

  // Erweiterte Filter- und Sortier-Funktionen
  const setSortBy = (sort: 'date' | 'name' | 'priority') => {
    sortBy.value = sort;
  };

  const setFilterBy = (filter: 'all' | 'high' | 'medium' | 'low') => {
    filterBy.value = filter;
  };

  // Spezifische Priority-Listen
  const getHighPriorityItems = computed(() =>
    wishlistItems.value.filter(item => item.priority === 'high')
  );

  const getMediumPriorityItems = computed(() =>
    wishlistItems.value.filter(item => item.priority === 'medium')
  );

  const getLowPriorityItems = computed(() =>
    wishlistItems.value.filter(item => item.priority === 'low')
  );

  // Preis-Alert Items
  const getPriceAlertItems = computed(() =>
    wishlistItems.value.filter(item => item.priceAlert && item.priceAlert > 0)
  );

  // Items mit Notizen
  const getItemsWithNotes = computed(() =>
    wishlistItems.value.filter(
      item => item.notes && item.notes.trim().length > 0
    )
  );

  const reset = () => {
    wishlistItems.value = [];
    wishlistCount.value = 0;
    dealNotifications.value = [];
    sortBy.value = 'date';
    filterBy.value = 'all';
  };

  return {
    // State
    wishlistItems,
    wishlistCount,
    dealNotifications,
    sortBy,
    filterBy,

    // Computed
    hasWishlistItems,
    sortedWishlistItems,
    categorizedItems,
    getHighPriorityItems,
    getMediumPriorityItems,
    getLowPriorityItems,
    getPriceAlertItems,
    getItemsWithNotes,

    // Actions
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    loadWishlistCount,
    checkWishlistDeals,
    checkSingleGameDeals,

    // Helpers
    findWishlistItem,
    isInWishlistLocal,
    setSortBy,
    setFilterBy,
    reset
  };
});
