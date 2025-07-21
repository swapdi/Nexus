import { PrismaClient } from '~/prisma/client';
import type { CreateMessageData, FullMessage } from '~/types';

const prisma = new PrismaClient();

export namespace MessagesService {
  /**
   * Alle Nachrichten für einen Benutzer abrufen
   */
  export async function getUserMessages(
    userId: number
  ): Promise<FullMessage[]> {
    try {
      const messages = await prisma.message.findMany({
        where: {
          receiverId: userId
        },
        include: {
          sender: {
            select: {
              id: true,
              display_name: true
            }
          },
          receiver: {
            select: {
              id: true,
              display_name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return messages;
    } catch (error) {
      console.error('Fehler beim Abrufen der Benutzer-Nachrichten:', error);
      throw error;
    }
  }

  /**
   * Ungelesene Nachrichten für einen Benutzer abrufen
   */
  export async function getUnreadMessages(
    userId: number
  ): Promise<FullMessage[]> {
    try {
      const messages = await prisma.message.findMany({
        where: {
          receiverId: userId,
          isRead: false
        },
        include: {
          sender: {
            select: {
              id: true,
              display_name: true
            }
          },
          receiver: {
            select: {
              id: true,
              display_name: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return messages;
    } catch (error) {
      console.error('Fehler beim Abrufen der ungelesenen Nachrichten:', error);
      throw error;
    }
  }

  /**
   * Anzahl ungelesener Nachrichten abrufen
   */
  export async function getUnreadMessageCount(userId: number): Promise<number> {
    try {
      return await prisma.message.count({
        where: {
          receiverId: userId,
          isRead: false
        }
      });
    } catch (error) {
      console.error(
        'Fehler beim Abrufen der Anzahl ungelesener Nachrichten:',
        error
      );
      throw error;
    }
  }

  /**
   * Neue Nachricht erstellen
   */
  export async function createMessage(
    data: CreateMessageData
  ): Promise<FullMessage> {
    try {
      const message = await prisma.message.create({
        data: {
          senderId: data.senderId,
          receiverId: data.receiverId,
          text: data.text,
          media: data.media
        },
        include: {
          sender: {
            select: {
              id: true,
              display_name: true
            }
          },
          receiver: {
            select: {
              id: true,
              display_name: true
            }
          }
        }
      });

      return message;
    } catch (error) {
      console.error('Fehler beim Erstellen der Nachricht:', error);
      throw error;
    }
  }

  /**
   * Server-Nachricht erstellen (für Wishlist-Deal-Benachrichtigungen)
   */
  export async function createServerMessage(
    receiverId: number,
    text: string,
    media?: string
  ): Promise<FullMessage> {
    return await createMessage({
      senderId: null, // null bedeutet Server als Absender
      receiverId,
      text,
      media
    });
  }

  /**
   * Deal-Benachrichtigung für ein Wishlist-Item erstellen
   * Prüft automatisch auf Duplikate über die wishlist_deal_notifications Tabelle
   */
  export async function createDealNotificationMessage(
    userId: number,
    gameId: number,
    dealId: string,
    gameName: string,
    deals: Array<{
      storeName: string;
      price: number | null;
      discountPercent: number | null;
      originalPrice: number | null;
      url: string;
    }>
  ): Promise<FullMessage | null> {
    try {
      // Nachrichtentext erstellen
      const dealTexts = deals.map(deal => {
        if (deal.price === 0) {
          return `🆓 Kostenlos bei ${deal.storeName}`;
        } else {
          const discount = deal.discountPercent
            ? ` (-${deal.discountPercent.toFixed(0)}%)`
            : '';
          const priceText = deal.price
            ? `${deal.price.toFixed(2)}€`
            : 'Preis unbekannt';
          return `💰 ${priceText}${discount} bei ${deal.storeName}`;
        }
      });

      const messageText = `🎮 ${gameName} ist im Angebot!\n\n${dealTexts.join(
        '\n'
      )}`;

      // Deal-Record finden oder erstellen
      let dealRecord;
      try {
        dealRecord = await prisma.deal.findFirst({
          where: {
            OR: [
              { id: parseInt(dealId) || 0 },
              {
                AND: [
                  { title: gameName },
                  { storeName: deals[0]?.storeName },
                  { gameId: gameId }
                ]
              }
            ]
          }
        });

        if (!dealRecord) {
          // Deal erstellen falls nicht vorhanden
          const bestDeal = deals[0]; // Nehme den ersten Deal als Repräsentant
          dealRecord = await prisma.deal.create({
            data: {
              gameId,
              title: gameName,
              storeName: bestDeal.storeName,
              price: bestDeal.price || 0,
              originalPrice: bestDeal.originalPrice || 0,
              discountPercent: bestDeal.discountPercent || 0,
              url: bestDeal.url,
              isFreebie: bestDeal.price === 0
            }
          });
        }

        // JETZT prüfen ob bereits eine Benachrichtigung für diesen Deal existiert
        const existingNotification =
          await prisma.wishlist_deal_notifications.findUnique({
            where: {
              userId_dealId: {
                userId: userId,
                dealId: dealRecord.id
              }
            }
          });

        if (existingNotification) {
          console.log(
            `Deal-Benachrichtigung für ${gameName} (Deal: ${dealId}) existiert bereits`
          );
          return null;
        }

        // Wishlist-Deal-Notification erstellen
        await prisma.wishlist_deal_notifications.create({
          data: {
            userId,
            gameId,
            dealId: dealRecord.id,
            notificationSent: true,
            updatedAt: new Date()
          }
        });

        // Server-Nachricht an den Benutzer erstellen
        const message = await createServerMessage(userId, messageText);

        console.log(
          `✅ Deal-Benachrichtigung für ${gameName} an Benutzer ${userId} erstellt`
        );
        return message;
      } catch (dealError: any) {
        // Prüfen ob es ein Unique Constraint Fehler ist
        if (
          dealError.code === 'P2002' &&
          dealError.meta?.target?.includes('userId_dealId')
        ) {
          console.log(
            `Deal-Benachrichtigung für ${gameName} (Deal: ${dealId}) existiert bereits (Unique Constraint)`
          );
          return null;
        }

        console.warn(
          `Warnung beim Erstellen des Deal-Records für ${gameName}:`,
          dealError
        );
        throw dealError;
      }
    } catch (error) {
      console.error(
        `Fehler beim Erstellen der Deal-Benachrichtigung für ${gameName}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Nachricht als gelesen markieren
   */
  export async function markMessageAsRead(
    messageId: number,
    userId: number
  ): Promise<boolean> {
    try {
      const result = await prisma.message.updateMany({
        where: {
          id: messageId,
          receiverId: userId // Sicherheitsprüfung: nur eigene Nachrichten
        },
        data: {
          isRead: true
        }
      });

      return result.count > 0;
    } catch (error) {
      console.error('Fehler beim Markieren der Nachricht als gelesen:', error);
      throw error;
    }
  }

  /**
   * Alle Nachrichten eines Benutzers als gelesen markieren
   */
  export async function markAllMessagesAsRead(userId: number): Promise<number> {
    try {
      const result = await prisma.message.updateMany({
        where: {
          receiverId: userId,
          isRead: false
        },
        data: {
          isRead: true
        }
      });

      return result.count;
    } catch (error) {
      console.error(
        'Fehler beim Markieren aller Nachrichten als gelesen:',
        error
      );
      throw error;
    }
  }

  /**
   * Nachricht löschen
   */
  export async function deleteMessage(
    messageId: number,
    userId: number
  ): Promise<boolean> {
    try {
      const result = await prisma.message.deleteMany({
        where: {
          id: messageId,
          receiverId: userId // Sicherheitsprüfung: nur eigene Nachrichten
        }
      });

      return result.count > 0;
    } catch (error) {
      console.error('Fehler beim Löschen der Nachricht:', error);
      throw error;
    }
  }
}
