import { PrismaClient, type Wishlist } from '~/prisma/client';
import { CheapSharkService } from './cheapshark.service';
import { DealsService } from './deals.service';
import { ITADService } from './itad.service';

const prisma = new PrismaClient();

// Store-Namen Mapping für CheapShark Store-IDs
const STORE_NAMES: Record<string, string> = {
  '1': 'Steam',
  '2': 'GamersGate',
  '3': 'Green Man Gaming',
  '4': 'Get Games',
  '5': 'GameStop',
  '6': 'Origin',
  '7': 'GOG',
  '8': 'Humble Store',
  '9': 'GameFly',
  '10': 'Impulse',
  '11': 'Gamers Gate',
  '12': 'IndieGala',
  '13': 'Humble Bundle',
  '14': 'Bundlestars',
  '15': 'MacGameStore',
  '16': 'WinGameStore',
  '17': 'Coinbase',
  '18': 'Groupees',
  '19': 'Flying Bundle',
  '20': 'Bundle Stars',
  '21': 'Groupees Bundle',
  '22': 'Coinbase Commerce',
  '23': 'Fanatical',
  '24': 'Newegg',
  '25': 'Epic Games Store'
};

const getStoreName = (storeId: string): string => {
  return STORE_NAMES[storeId] || 'Unbekannter Store';
};

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
        console.log(
          `Prüfe Deals für "${item.game.name}" (ID: ${item.gameId})...`
        );

        // Aktuelle Deals für das Spiel abrufen - sowohl aus DB als auch live von APIs
        // Grund: Wir verwenden direkt den DealsService.searchGameDeals für Live-API-Abfragen
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
                  storeName: getStoreName(deal.storeID),
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

          // Kombiniere alle Deals
          const allDeals = [...dbDeals, ...liveDeals];

          console.log(
            `Gefundene Deals für "${item.game.name}":`,
            allDeals.length
          );

          if (allDeals.length > 0) {
            // Nur relevante Deals (mit Rabatt oder Freebies)
            const relevantDeals = allDeals.filter(
              (deal: any) =>
                deal.isFreebie ||
                (deal.discountPercent && deal.discountPercent > 0)
            );

            console.log(
              `Relevante Deals für "${item.game.name}":`,
              relevantDeals.length
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
