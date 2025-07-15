import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { UserService } from '~/lib/services/user.service';
import { protectedProcedure, publicProcedure, router } from '../trpc';
export const userRouter = router({
  // Aktueller Benutzer abrufen (Auth)
  getCurrentUser: publicProcedure.query(({ ctx }) => {
    return {
      dbUser: ctx.dbUser
    };
  }),
  // Benutzer über ID abrufen
  getUserById: protectedProcedure
    .input(
      z.object({
        userId: z.number()
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        // Nur eigene Daten oder Admin-Rechte prüfen
        if (input.userId !== ctx.dbUser.id) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Nicht berechtigt, andere Benutzerdaten abzurufen'
          });
        }
        const user = await UserService.getUserById(input.userId);
        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Benutzer nicht gefunden'
          });
        }
        return user;
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Abrufen der Benutzerdaten'
        });
      }
    }),
  // Benutzerstatistiken abrufen
  getUserStats: protectedProcedure.query(async ({ ctx }) => {
    try {
      const stats = await UserService.getUserStats(ctx.dbUser.id);
      return stats;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Fehler beim Abrufen der Benutzerstatistiken'
      });
    }
  }),
  // Benutzerprofil aktualisieren (Auth)
  updateProfile: protectedProcedure
    .input(
      z.object({
        display_name: z.string().min(1).optional(),
        email: z.string().email().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const updatedUser = await UserService.updateUser(ctx.dbUser.id, input);
        return updatedUser;
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Aktualisieren des Profils'
        });
      }
    }),

  // Steam Profil verknüpfen
  linkSteamProfile: protectedProcedure
    .input(
      z.object({
        steamId: z.string().min(1, 'Steam ID darf nicht leer sein')
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Steam ID validieren (erweiterte Validierung)
        const steamIdPattern = /^(7656119\d{10}|[a-zA-Z0-9_-]+)$/;
        if (!steamIdPattern.test(input.steamId)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Ungültige Steam ID Format'
          });
        }
        const updatedUser = await UserService.updateUser(ctx.dbUser.id, {
          steamId: input.steamId
        });
        return {
          success: true,
          message: 'Steam Profil erfolgreich verknüpft',
          user: updatedUser
        };
      } catch (error) {
        console.error('Error linking Steam profile:', error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Verknüpfen des Steam Profils'
        });
      }
    }),
  // Steam Profil trennen
  unlinkSteamProfile: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const updatedUser = await UserService.updateUser(ctx.dbUser.id, {
        steamId: null
      });

      return {
        success: true,
        message: 'Steam Profil erfolgreich getrennt',
        user: updatedUser
      };
    } catch (error) {
      console.error('Error unlinking Steam profile:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Fehler beim Trennen des Steam Profils'
      });
    }
  }),
  // Benutzer löschen (Auth)
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await UserService.deleteUser(ctx.dbUser.id);
      return { success: true };
    } catch (error) {
      console.error('Error deleting user account:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Fehler beim Löschen des Kontos'
      });
    }
  }),

  // Epic Games Profil trennen
  unlinkEpicProfile: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const updatedUser = await UserService.updateUser(ctx.dbUser.id, {
        epicConnect: false
      });

      return {
        success: true,
        message: 'Epic Games Profil erfolgreich getrennt',
        user: updatedUser
      };
    } catch (error) {
      console.error('Error unlinking Epic Games profile:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Fehler beim Trennen des Epic Games Profils'
      });
    }
  })
});
