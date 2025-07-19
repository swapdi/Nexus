import { PrismaClient, type Wishlist } from '~/prisma/client';
import { DealsService } from './deals.service';

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
        // Aktuelle Deals für das Spiel abrufen
        const deals = await DealsService.searchDeals({
          gameId: item.gameId,
          limit: 10
        });

        if (deals.length > 0) {
          // Nur relevante Deals (mit Rabatt oder Freebies)
          const relevantDeals = deals.filter(
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

            // Server-Nachricht für Deals erstellen - ENTFERNT
            // await createDealNotificationMessage(
            //   userId,
            //   item.game.name,
            //   relevantDeals
            // );
          }
        }
      }

      return notifications;
    } catch (error) {
      console.error('Fehler beim Prüfen der Wishlist-Deals:', error);
      throw error;
    }
  }

  /**
   * Wishlist-Deals für alle Benutzer prüfen (für Cron-Job)
   */
  export async function checkAllUsersWishlistDeals(): Promise<void> {
    try {
      // Alle Benutzer mit Wishlist-Items abrufen
      const users = await prisma.user.findMany({
        where: {
          wishlistItems: {
            some: {}
          }
        },
        select: {
          id: true
        }
      });

      for (const user of users) {
        try {
          await checkWishlistDeals(user.id);
        } catch (error) {
          console.error(
            `Fehler beim Prüfen der Wishlist-Deals für Benutzer ${user.id}:`,
            error
          );
          // Weiter mit nächstem Benutzer
        }
      }

      console.log('Wishlist-Deal-Prüfung abgeschlossen');
    } catch (error) {
      console.error('Fehler beim Prüfen aller Benutzer-Wishlist-Deals:', error);
      throw error;
    }
  }
}
