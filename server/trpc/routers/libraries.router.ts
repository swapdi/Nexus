import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { EpicGamesService } from '~/lib/services/epicgames.service';
import { GamesService } from '~/lib/services/games.service';
import { protectedProcedure, router } from '~/server/trpc/trpc';
export const librariesRouter = router({
  importSteamLibrary: protectedProcedure
    .input(
      z.object({
        steamInput: z
          .string()
          .min(1, 'Steam ID oder Profil-URL ist erforderlich')
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        return await GamesService.importSteamLibrary(
          ctx.dbUser.id,
          input.steamInput
        );
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        console.error('Steam Import Error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Unerwarteter Fehler beim Importieren der Steam-Bibliothek'
        });
      }
    }),
  beginAuthenticateEpicGames: protectedProcedure.mutation(async () => {
    try {
      const authData = EpicGamesService.beginAuth();
      if (!authData) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Starten der Epic Games Authentifizierung'
        });
      }
      return authData;
    } catch (error) {
      console.error('Epic Games Auth Error:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Unerwarteter Fehler bei der Epic Games Authentifizierung'
      });
    }
  }),
  completeAuthEpicGames: protectedProcedure
    .input(
      z.object({
        authToken: z.string(),
        userId: z.string()
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await EpicGamesService.completeAuth(
          input.authToken,
          input.userId
        );
        if (!result) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Fehler beim Abschließen der Epic Games Authentifizierung'
          });
        }
        return result;
      } catch (error) {
        console.error('Epic Games Auth Completion Error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            'Unerwarteter Fehler beim Abschließen der Epic Games Authentifizierung'
        });
      }
    })
});
