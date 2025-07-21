import { PrismaClient } from '~/prisma/client';
import { useStoreUtils } from '../../composables/useStoreUtils';
import { CheapSharkService } from './cheapshark.service';
import { DealsService } from './deals.service';
import { EmailService, type DealEmailData } from './email.service';
import { ITADService } from './itad.service';
import { MessagesService } from './messages.service';
const prisma = new PrismaClient();

export interface FullWishlistItem extends PrismaWishlist {
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
   * E-Mail-Benachrichtigung für Deal senden
   * Interne Hilfsfunktion für die Integration mit dem bestehenden Wishlist-System
   */
  async function sendDealNotificationEmail(
    userId: number,
    gameName: string,
    deals: Array<{
      storeName: string;
      price: number;
      discountPercent?: number;
      originalPrice?: number;
      url: string;
    }>
  ): Promise<void> {
    try {
      // Prüfe ob Benutzer E-Mail-Benachrichtigungen aktiviert hat
      const shouldSend = await EmailService.shouldSendDealEmail(userId);
      if (!shouldSend) {
        console.log(
          `E-Mail-Benachrichtigung für Benutzer ${userId} deaktiviert`
        );
        return;
      }

      // Hole Benutzer-E-Mail aus der Datenbank
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          supabase_uid: true,
          display_name: true
        }
      });

      if (!user?.supabase_uid) {
        console.warn(`Kein Supabase-User für Benutzer ${userId} gefunden`);
        return;
      }

      // E-Mail-Adresse aus Supabase Auth abrufen
      const userEmail = await EmailService.getUserEmailFromAuth(
        user.supabase_uid
      );
      if (!userEmail) {
        console.warn(`Keine E-Mail-Adresse für Benutzer ${userId} gefunden`);
        return;
      }

      // E-Mail senden
      const emailData: DealEmailData = {
        gameName,
        deals,
        userEmail,
        userName: user.display_name || undefined
      };

      const success = await EmailService.sendDealNotificationEmail(emailData);

      if (success) {
        console.log(
          `✅ E-Mail-Benachrichtigung für "${gameName}" an ${userEmail} gesendet`
        );
      } else {
        console.warn(
          `❌ E-Mail-Benachrichtigung für "${gameName}" konnte nicht gesendet werden`
        );
      }
    } catch (error) {
      console.error('Fehler beim Senden der E-Mail-Benachrichtigung:', error);
      // Fehler nicht weiterwerfen, da E-Mail-Versand optional ist
    }
  }

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
              // Grund: Finde den besten Deal - Freebies haben Priorität, sonst niedrigster Preis
              const bestDeal = relevantDeals.reduce((best, current) => {
                // Freebies haben absolute Priorität
                if (current.isFreebie && !best.isFreebie) return current;
                if (best.isFreebie && !current.isFreebie) return best;

                // Wenn beide Freebies oder beide kostenpflichtig sind, vergleiche Preise
                const currentPrice = current.price || 0;
                const bestPrice = best.price || 0;

                return currentPrice < bestPrice ? current : best;
              });

              notifications.push({
                gameId: item.gameId,
                gameName: item.game.name,
                deals: [
                  {
                    id: bestDeal.id,
                    title: bestDeal.title,
                    storeName: bestDeal.storeName,
                    price: bestDeal.price,
                    discountPercent: bestDeal.discountPercent,
                    originalPrice: bestDeal.originalPrice,
                    url: bestDeal.url
                  }
                ]
              });

              // Nur für den besten Deal eine Benachrichtigung erstellen
              try {
                await MessagesService.createDealNotificationMessage(
                  userId,
                  item.gameId,
                  String(bestDeal.id), // Sicherstellen, dass es ein String ist
                  item.game.name,
                  [
                    {
                      storeName: bestDeal.storeName,
                      price: bestDeal.price,
                      discountPercent: bestDeal.discountPercent,
                      originalPrice: bestDeal.originalPrice,
                      url: bestDeal.url
                    }
                  ]
                );

                // Zusätzlich E-Mail-Benachrichtigung senden
                await sendDealNotificationEmail(userId, item.game.name, [
                  {
                    storeName: bestDeal.storeName,
                    price: bestDeal.price || 0,
                    discountPercent: bestDeal.discountPercent || undefined,
                    originalPrice: bestDeal.originalPrice || undefined,
                    url: bestDeal.url
                  }
                ]);
              } catch (notificationError) {
                console.warn(
                  `Fehler bei der Benachrichtigung für ${item.game.name} (Deal ${bestDeal.id}):`,
                  notificationError
                );
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
