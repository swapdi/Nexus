import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { GamesService } from '~/lib/services/games.service';
import { IGDBService } from '~/lib/services/igdb.service';
import { protectedProcedure, router } from '~/server/trpc/trpc';

export const igdbRouter = router({
  // IGDB nach Spielen durchsuchen
  searchGames: protectedProcedure
    .input(
      z.object({
        searchTerm: z.string().min(1),
        limit: z.number().min(1).max(50).default(20)
      })
    )
    .query(async ({ input }) => {
      try {
        const results = await IGDBService.searchGames(
          input.searchTerm,
          input.limit
        );
        return {
          games: results,
          total: results.length
        };
      } catch (error) {
        console.error('IGDB search error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler bei der IGDB-Suche'
        });
      }
    }),

  // Spiel von IGDB importieren und zur Datenbank hinzufügen
  importGame: protectedProcedure
    .input(
      z.object({
        igdbId: z.number(),
        addToLibrary: z.boolean().default(false)
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Spiel von IGDB anhand der ID abrufen und zur DB hinzufügen
        const igdbGameData = await IGDBService.searchAndConvertGame(
          input.igdbId.toString()
        );

        if (!igdbGameData) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Spiel bei IGDB nicht gefunden'
          });
        }

        // Spiel zur zentralen Datenbank hinzufügen (falls noch nicht vorhanden)
        const importResult =
          await GamesService.findOrCreateGameWithIGDBRelevance(
            igdbGameData.name
          );

        if (!importResult || !importResult.game) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Fehler beim Erstellen des Spiels in der Datenbank'
          });
        }

        // Optional: Spiel zur Benutzerbibliothek hinzufügen
        let userGame = null;
        if (input.addToLibrary) {
          userGame = await GamesService.addGameToUser(
            ctx.dbUser.id,
            importResult.game.name
          );
        }

        return {
          success: true,
          game: importResult.game,
          userGame,
          isNew: importResult.isNew,
          message: importResult.isNew
            ? 'Spiel erfolgreich importiert'
            : 'Spiel war bereits in der Datenbank'
        };
      } catch (error) {
        console.error('Game import error:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Fehler beim Importieren des Spiels'
        });
      }
    })
});
