import { PrismaClient, type Message } from '~/prisma/client';

const prisma = new PrismaClient();

export interface FullMessage extends Message {
  sender: {
    id: number;
    display_name: string | null;
  } | null;
  receiver: {
    id: number;
    display_name: string | null;
  };
}

export interface CreateMessageData {
  senderId?: number | null; // null für Server-Nachrichten
  receiverId: number;
  text: string;
  media?: string;
}

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
