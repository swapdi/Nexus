import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { MessagesService } from '~/lib/services/messages.service';
import { protectedProcedure, router } from '../trpc';

export const messagesRouter = router({
  // Alle Nachrichten des aktuellen Benutzers abrufen
  getUserMessages: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await MessagesService.getUserMessages(ctx.dbUser.id);
    } catch (error) {
      console.error('Error fetching user messages:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Fehler beim Abrufen der Nachrichten'
      });
    }
  }),

  // Ungelesene Nachrichten abrufen
  getUnreadMessages: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await MessagesService.getUnreadMessages(ctx.dbUser.id);
    } catch (error) {
      console.error('Error fetching unread messages:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Fehler beim Abrufen der ungelesenen Nachrichten'
      });
    }
  }),

  // Anzahl ungelesener Nachrichten abrufen
  getUnreadMessageCount: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await MessagesService.getUnreadMessageCount(ctx.dbUser.id);
    } catch (error) {
      console.error('Error fetching unread message count:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Fehler beim Abrufen der Anzahl ungelesener Nachrichten'
      });
    }
  }),

  // Neue Nachricht erstellen
  createMessage: protectedProcedure
    .input(
      z.object({
        receiverId: z.number(),
        text: z.string().min(1, 'Nachrichtentext ist erforderlich'),
        media: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        return await MessagesService.createMessage({
          senderId: ctx.dbUser.id,
          receiverId: input.receiverId,
          text: input.text,
          media: input.media
        });
      } catch (error) {
        console.error('Error creating message:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Erstellen der Nachricht'
        });
      }
    }),

  // Nachricht als gelesen markieren
  markAsRead: protectedProcedure
    .input(
      z.object({
        messageId: z.number()
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const success = await MessagesService.markMessageAsRead(
          input.messageId,
          ctx.dbUser.id
        );

        if (!success) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Nachricht nicht gefunden oder nicht berechtigt'
          });
        }

        return { success: true };
      } catch (error) {
        console.error('Error marking message as read:', error);
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Markieren der Nachricht als gelesen'
        });
      }
    }),

  // Alle Nachrichten als gelesen markieren
  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const count = await MessagesService.markAllMessagesAsRead(ctx.dbUser.id);
      return {
        success: true,
        markedCount: count
      };
    } catch (error) {
      console.error('Error marking all messages as read:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Fehler beim Markieren aller Nachrichten als gelesen'
      });
    }
  }),

  // Nachricht löschen
  deleteMessage: protectedProcedure
    .input(
      z.object({
        messageId: z.number()
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const success = await MessagesService.deleteMessage(
          input.messageId,
          ctx.dbUser.id
        );

        if (!success) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Nachricht nicht gefunden oder nicht berechtigt'
          });
        }

        return { success: true };
      } catch (error) {
        console.error('Error deleting message:', error);
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Löschen der Nachricht'
        });
      }
    })
});
