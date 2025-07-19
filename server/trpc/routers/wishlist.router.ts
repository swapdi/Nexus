import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { WishlistService } from '~/lib/services/wishlist.service';
import { protectedProcedure, router } from '../trpc';

export const wishlistRouter = router({
  // Wishlist des aktuellen Benutzers abrufen
  getUserWishlist: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await WishlistService.getUserWishlist(ctx.dbUser.id);
    } catch (error) {
      console.error('Error fetching user wishlist:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Fehler beim Abrufen der Wishlist'
      });
    }
  }),

  // Spiel zur Wishlist hinzufügen
  addToWishlist: protectedProcedure
    .input(
      z.object({
        gameId: z.number()
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        return await WishlistService.addToWishlist(ctx.dbUser.id, input.gameId);
      } catch (error: any) {
        console.error('Error adding to wishlist:', error);

        if (error.message?.includes('bereits in der Wishlist')) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Spiel ist bereits in deiner Wishlist'
          });
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Hinzufügen zur Wishlist'
        });
      }
    }),

  // Spiel aus Wishlist entfernen
  removeFromWishlist: protectedProcedure
    .input(
      z.object({
        gameId: z.number()
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const success = await WishlistService.removeFromWishlist(
          ctx.dbUser.id,
          input.gameId
        );

        if (!success) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Spiel nicht in der Wishlist gefunden'
          });
        }

        return { success: true };
      } catch (error) {
        console.error('Error removing from wishlist:', error);
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Entfernen aus der Wishlist'
        });
      }
    }),

  // Prüfen ob Spiel in Wishlist ist
  isInWishlist: protectedProcedure
    .input(
      z.object({
        gameId: z.number()
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        return await WishlistService.isInWishlist(ctx.dbUser.id, input.gameId);
      } catch (error) {
        console.error('Error checking wishlist status:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Prüfen des Wishlist-Status'
        });
      }
    }),

  // Anzahl der Wishlist-Items abrufen
  getWishlistCount: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await WishlistService.getWishlistCount(ctx.dbUser.id);
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Fehler beim Abrufen der Wishlist-Anzahl'
      });
    }
  }),

  // Aktuelle Deals für Wishlist-Games prüfen
  checkWishlistDeals: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await WishlistService.checkWishlistDeals(ctx.dbUser.id);
    } catch (error) {
      console.error('Error checking wishlist deals:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Fehler beim Prüfen der Wishlist-Deals'
      });
    }
  })
});
