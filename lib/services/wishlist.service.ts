import { PrismaClient, type Wishlist } from '~/prisma/client';
import { useStoreUtils } from '../../composables/useStoreUtils';
import { CheapSharkService } from './cheapshark.service';
import { DealsService } from './deals.service';
import { ITADService } from './itad.service';
import { MessagesService } from './messages.service';

const prisma = new PrismaClient();

export interface FullWishlistItem extends Wishlist {
  game: {
    id: number;
    name: string;
    coverUrl: string | null;
    slug: string | null;
  };
}

export interface WishlistDealNotification {
  gameId: number;
  gameName: string;
  deals: Array<{
    id: number;
    title: string;
    storeName: string;
    price: number | null;
    discountPercent: number | null;
    originalPrice: number | null;
    url: string;
  }>;
}

export namespace WishlistService {
  /**
   * Wishlist eines Benutzers abrufen
   */
  export async function getUserWishlist(
    userId: number
  ): Promise<FullWishlistItem[]> {
    try {
      const wishlistItems = await prisma.wishlist.findMany({
        where: {
          userId: userId
        },
        include: {
          game: {
            select: {
              id: true,
              name: true,
              coverUrl: true,
              slug: true
            }
          }
        },
        orderBy: {
          addedAt: 'desc'
        }
      });

      return wishlistItems;
    } catch (error) {
      console.error('Fehler beim Abrufen der Wishlist:', error);
      throw error;
    }
  }

  /**
   * Spiel zur Wishlist hinzufügen
   */
  export async function addToWishlist(
    userId: number,
    gameId: number
  ): Promise<FullWishlistItem> {
    try {
      // Prüfen ob Spiel bereits in Wishlist ist
      const existingItem = await prisma.wishlist.findUnique({
        where: {
          userId_gameId: {
            userId,
            gameId
          }
        }
      });

      if (existingItem) {
        throw new Error('Spiel ist bereits in der Wishlist');
      }

      const wishlistItem = await prisma.wishlist.create({
        data: {
          userId,
          gameId
        },
        include: {
          game: {
            select: {
              id: true,
              name: true,
              coverUrl: true,
              slug: true
            }
          }
        }
      });

      return wishlistItem;
    } catch (error) {
      console.error('Fehler beim Hinzufügen zur Wishlist:', error);
      throw error;
    }
  }

  /**
   * Spiel aus Wishlist entfernen
   */
  export async function removeFromWishlist(
    userId: number,
    gameId: number
  ): Promise<boolean> {
    try {
      const result = await prisma.wishlist.deleteMany({
        where: {
          userId,
          gameId
        }
      });

      return result.count > 0;
    } catch (error) {
      console.error('Fehler beim Entfernen aus der Wishlist:', error);
      throw error;
    }
  }

  /**
   * Prüfen ob Spiel in Wishlist ist
   */
  export async function isInWishlist(
    userId: number,
    gameId: number
  ): Promise<boolean> {
    try {
      const item = await prisma.wishlist.findUnique({
        where: {
          userId_gameId: {
            userId,
            gameId
          }
        }
      });

      return item !== null;
    } catch (error) {
      console.error('Fehler beim Prüfen der Wishlist:', error);
      throw error;
    }
  }

  /**
   * Anzahl der Wishlist-Items eines Benutzers abrufen
   */
  export async function getWishlistCount(userId: number): Promise<number> {
    try {
      return await prisma.wishlist.count({
        where: {
          userId
        }
      });
    } catch (error) {
      console.error('Fehler beim Abrufen der Wishlist-Anzahl:', error);
      throw error;
    }
  }

  /**
   * Aktuelle Deals für Wishlist-Games prüfen und Benachrichtigungen erstellen
   */
  export async function checkWishlistDeals(
    userId: number
  ): Promise<WishlistDealNotification[]> {
    try {
      // Wishlist des Benutzers abrufen
      const wishlistItems = await getUserWishlist(userId);
      const notifications: WishlistDealNotification[] = [];

      for (const item of wishlistItems) {
        try {
          // Zuerst lokale DB-Deals abrufen
          const dbDeals = await DealsService.searchDeals({
            gameId: item.gameId,
            limit: 10
          });

          // Dann Live-Deals von APIs abrufen (CheapShark/ITAD)
          const liveDeals: any[] = [];

          try {
            // CheapShark API Deals abrufen
            const cheapSharkSearchResults =
              await CheapSharkService.searchGameByTitle(item.game.name);
            if (cheapSharkSearchResults.length > 0) {
              const cheapSharkGameId = cheapSharkSearchResults[0].gameID;
              const gameInfo = await CheapSharkService.getGameDeals(
                cheapSharkGameId
              );

              // Grund: Konvertiere CheapShark Deals zu unserem Format
              for (const deal of gameInfo.deals.slice(0, 6)) {
                liveDeals.push({
                  gameId: item.gameId,
                  title: gameInfo.info.title,
                  storeName: useStoreUtils().getStoreName(deal.storeID),
                  price: parseFloat(deal.price),
                  originalPrice: parseFloat(deal.retailPrice),
                  discountPercent: parseFloat(deal.savings),
                  url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
                  isFreebie: false,
                  id: deal.dealID
                });
              }
            }
          } catch (cheapSharkError) {
            console.warn('CheapShark API Fehler:', cheapSharkError);
          }

          try {
            // ITAD API Deals abrufen
            const ITADGames = await ITADService.searchGamesByTitle(
              item.game.name
            );
            for (const game of ITADGames) {
              const deals = await ITADService.getGamePrice([game.id]);
              const dealGame = deals[0];
              if (dealGame && dealGame.deals && dealGame.deals.length > 0) {
                // Grund: Konvertiere ITAD Deals zu unserem Format
                for (const deal of dealGame.deals.slice(0, 6)) {
                  liveDeals.push({
                    gameId: item.gameId,
                    title: game.title,
                    storeName: deal.shop?.name || 'Unknown Store',
                    price: deal.price.amount,
                    originalPrice: deal.regular.amount,
                    discountPercent: deal.cut,
                    url: deal.url,
                    isFreebie: deal.price.amount === 0,
                    id: `itad_${game.id}_${deal.shop?.id}`
                  });
                }
              }
            }
          } catch (itadError) {
            console.warn('ITAD API Fehler:', itadError);
          }

          // Kombiniere alle Deals und dedupliziere sie
          const allDeals = [...dbDeals, ...liveDeals];

          // Grund: Deduplizierung basierend auf eindeutigen Kriterien (storeName + gameId + ähnlicher Preis)
          const uniqueDeals = allDeals.filter((deal, index, arr) => {
            const key = `${deal.storeName}-${item.gameId}-${Math.round(
              deal.price || 0
            )}`;
            return (
              arr.findIndex(
                d =>
                  `${d.storeName}-${item.gameId}-${Math.round(
                    d.price || 0
                  )}` === key
              ) === index
            );
          });

          if (uniqueDeals.length > 0) {
            // Nur relevante Deals (mit Rabatt oder Freebies)
            const relevantDeals = uniqueDeals.filter(
              (deal: any) =>
                deal.isFreebie ||
                (deal.discountPercent && deal.discountPercent > 0)
            );

            if (relevantDeals.length > 0) {
              notifications.push({
                gameId: item.gameId,
                gameName: item.game.name,
                deals: relevantDeals.map((deal: any) => ({
                  id: deal.id,
                  title: deal.title,
                  storeName: deal.storeName,
                  price: deal.price,
                  discountPercent: deal.discountPercent,
                  originalPrice: deal.originalPrice,
                  url: deal.url
                }))
              });

              // Für jeden relevanten Deal eine Benachrichtigung erstellen
              for (const deal of relevantDeals) {
                try {
                  await MessagesService.createDealNotificationMessage(
                    userId,
                    item.gameId,
                    String(deal.id), // Sicherstellen, dass es ein String ist
                    item.game.name,
                    [
                      {
                        storeName: deal.storeName,
                        price: deal.price,
                        discountPercent: deal.discountPercent,
                        originalPrice: deal.originalPrice,
                        url: deal.url
                      }
                    ]
                  );
                } catch (notificationError) {
                  console.warn(
                    `Fehler bei der Benachrichtigung für ${item.game.name} (Deal ${deal.id}):`,
                    notificationError
                  );
                  // Weitermachen mit dem nächsten Deal
                }
              }
            }
          }
        } catch (itemError) {
          console.error(
            `Fehler beim Prüfen der Deals für "${item.game.name}":`,
            itemError
          );
          // Weiter mit dem nächsten Item
        }
      }

      return notifications;
    } catch (error) {
      console.error('Fehler beim Prüfen der Wishlist-Deals:', error);
      throw error;
    }
  }
}
