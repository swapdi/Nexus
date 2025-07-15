import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { EpicGamesService } from '~/lib/services/epicgames.service';
import { protectedProcedure, router } from '~/server/trpc/trpc';
import { SteamService } from '../../../lib/services/steam.service';
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
        return await SteamService.importSteamLibrary(
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
  completeAuthEpicGames: protectedProcedure
    .input(
      z.object({
        authToken: z.string().min(1, 'Auth-Token ist erforderlich'),
        userId: z.string().min(1, 'User ID ist erforderlich')
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await EpicGamesService.completeAuth({
          auth_token: input.authToken,
          user_id: input.userId
        });
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
    }),
  getEpicConfigStatus: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1, 'User ID ist erforderlich')
      })
    )
    .query(async ({ input }) => {
      try {
        const status = await EpicGamesService.checkConfig(input.userId);
        return status;
      } catch (error) {
        console.error(
          'Fehler beim Überprüfen der Epic Games Konfiguration:',
          error
        );
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Überprüfen der Epic Games Konfiguration'
        });
      }
    })
});
