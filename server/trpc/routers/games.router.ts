import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { GamesService } from '~/lib/services/games.service';
import { protectedProcedure, router } from '~/server/trpc/trpc';

export const gamesRouter = router({
  // Benutzer-Spiele abrufen
  getUserGames: protectedProcedure.query(async ({ ctx }) => {
    return await GamesService.getUserGames(ctx.dbUser.id);
  }),
  // Einzelnes Spiel mit Plattformen abrufen
  getGameWithPlatforms: protectedProcedure
    .input(
      z.object({
        gameId: z.number() // UserGame ID
      })
    )
    .query(async ({ input, ctx }) => {
      // getUserGameById erwartet UserGame ID
      const userGame = await GamesService.getUserGameById(input.gameId);

      if (!userGame) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Spiel nicht gefunden'
        });
      }

      // getGameWithPlatforms mit Game ID und User ID aufrufen
      const game = await GamesService.getGameWithPlatforms(
        userGame.gameId,
        ctx.dbUser.id
      );

      if (!game) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Spiel nicht gefunden'
        });
      }

      return game;
    }),

  // Notizen für ein Spiel aktualisieren
  updateGameNotes: protectedProcedure
    .input(
      z.object({
        userGameId: z.number(),
        notes: z.string().nullable()
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Prüfen ob das UserGame dem Benutzer gehört
      const userGame = await GamesService.getUserGameById(input.userGameId);

      if (!userGame) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Spiel nicht gefunden'
        });
      }

      // Prüfen ob es dem aktuellen Benutzer gehört
      if (userGame.userId !== ctx.dbUser.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Nicht berechtigt, dieses Spiel zu bearbeiten'
        });
      } // Notizen aktualisieren
      const updatedUserGame = await GamesService.updateUserGame(
        input.userGameId,
        {
          notes: input.notes
        }
      );

      // Vollständige Spiel-Daten zurückgeben
      const game = await GamesService.getGameWithPlatforms(
        userGame.gameId,
        ctx.dbUser.id
      );
      return game;
    }),

  // Mehrere Spiele aus der Bibliothek entfernen
  removeGamesFromLibrary: protectedProcedure
    .input(
      z.object({
        gameIds: z
          .array(z.number())
          .min(1, 'Mindestens ein Spiel muss ausgewählt werden')
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const removedGames = [];

        // Alle ausgewählten Spiele aus der Benutzer-Bibliothek entfernen
        for (const gameId of input.gameIds) {
          const userGame = await GamesService.getUserGameById(gameId);

          if (userGame) {
            await GamesService.deleteUserGame(userGame.id);
            removedGames.push(gameId);
          }
        }

        return {
          success: true,
          removedCount: removedGames.length,
          removedGameIds: removedGames
        };
      } catch (error) {
        console.error('Error removing games from library:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Entfernen der Spiele aus der Bibliothek'
        });
      }
    }), // Steam-Bibliothek importieren
  importSteamLibrary: protectedProcedure
    .input(
      z.object({
        steamInput: z
          .string()
          .min(1, 'Steam ID oder Profil-URL ist erforderlich'),
        operationId: z
          .string()
          .optional()
          .describe('Eindeutige ID für Progress-Tracking')
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        return await GamesService.importSteamLibrary(
          ctx.dbUser.id,
          input.steamInput,
          input.operationId
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
  // Benutzer-Statistiken
  getUserStats: protectedProcedure.query(async ({ ctx }) => {
    return await GamesService.getUserStats(ctx.dbUser.id);
  }),
  // Steam-Bibliothek sofort importieren (ohne IGDB-Anreicherung)
  importSteamLibraryFast: protectedProcedure
    .input(
      z.object({
        steamInput: z
          .string()
          .min(1, 'Steam ID oder Profil-URL ist erforderlich'),
        operationId: z
          .string()
          .optional()
          .describe('Eindeutige ID für Progress-Tracking')
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        return await GamesService.importSteamLibraryFast(
          ctx.dbUser.id,
          input.steamInput,
          input.operationId
        );
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        console.error('Steam Fast Import Error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Unerwarteter Fehler beim schnellen Steam-Import'
        });
      }
    }),
  // Hintergrund-IGDB-Anreicherung für importierte Spiele
  enrichGamesBackground: protectedProcedure
    .input(
      z.object({
        platformSlug: z.string().default('steam'),
        operationId: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        return await GamesService.enrichGamesBackground(
          input.platformSlug,
          input.operationId
        );
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        console.error('Background Enrichment Error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler bei der Hintergrund-Anreicherung'
        });
      }
    })
});
