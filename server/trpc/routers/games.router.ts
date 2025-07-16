import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { GamesService } from '~/lib/services/games.service';
import { IGDBService } from '~/lib/services/igdb.service';
import { protectedProcedure, router } from '~/server/trpc/trpc';
export const gamesRouter = router({
  // Benutzer-Spiele abrufen
  getUserGames: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          sortBy: z.enum(['lastPlayed', 'addedAt']).optional()
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const userGames = await GamesService.getUserGames(ctx.dbUser.id);
      if (input?.sortBy === 'lastPlayed') {
        userGames.sort(
          (a, b) =>
            new Date(b.lastPlayed!).getTime() -
            new Date(a.lastPlayed!).getTime()
        );
      }
      return userGames.slice(0, input?.limit);
    }),
  // Einzelnes Spiel mit Plattformen abrufen
  getUserGame: protectedProcedure
    .input(
      z.object({
        userGameId: z.number() // UserGame ID
      })
    )
    .query(async ({ input, ctx }) => {
      // getUserGameById erwartet UserGame ID
      const userGame = await GamesService.getUserGameById(input.userGameId);
      if (!userGame) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Spiel nicht gefunden'
        });
      }
      // Prüfen ob das UserGame dem aktuellen Benutzer gehört
      if (userGame.userId !== ctx.dbUser.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Nicht berechtigt, dieses Spiel zu sehen'
        });
      }
      return userGame;
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
          notes: input.notes // Direkt verwenden - null wird korrekt als Löschung behandelt
        }
      );
      // Vollständige Spiel-Daten zurückgeben
      return updatedUserGame;
    }),
  // Mehrere Spiele aus der Bibliothek entfernen
  removeGamesFromLibrary: protectedProcedure
    .input(
      z.object({
        userGameIds: z
          .array(z.number())
          .min(1, 'Mindestens ein Spiel muss ausgewählt werden')
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const removedGames = [];
        // Alle ausgewählten Spiele aus der Benutzer-Bibliothek entfernen
        for (const userGameId of input.userGameIds) {
          const userGame = await GamesService.getUserGameById(userGameId);
          if (userGame && userGame.userId === ctx.dbUser.id) {
            await GamesService.deleteUserGame(userGame.id);
            removedGames.push(userGameId);
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

  // Benutzer-Statistiken
  getUserStats: protectedProcedure.query(async ({ ctx }) => {
    return await GamesService.getUserStats(ctx.dbUser.id);
  }),
  getGameActivity: protectedProcedure.query(async ({ ctx }) => {
    const userGames = await GamesService.getUserGames(ctx.dbUser.id);
    const activity = new Array(7).fill(0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const userGame of userGames) {
      if (userGame.lastPlayed) {
        const lastPlayed = new Date(userGame.lastPlayed);
        lastPlayed.setHours(0, 0, 0, 0);
        const diffDays = Math.floor(
          (today.getTime() - lastPlayed.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays < 7) {
          activity[6 - diffDays] += userGame.playtimeMinutes || 0;
        }
      }
    }

    return activity.map(minutes => Math.round(minutes / 60));
  }),
  // Favoriten-Status für ein Spiel umschalten
  toggleFavorite: protectedProcedure
    .input(
      z.object({
        userGameId: z.number()
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
      }
      // Favoriten-Status umschalten
      const updatedUserGame = await GamesService.updateUserGame(
        input.userGameId,
        {
          isFavorite: !userGame.isFavorite
        }
      );
      return {
        success: true,
        isFavorite: updatedUserGame.isFavorite
      };
    }),
  // Spiele in der Datenbank suchen
  searchGames: protectedProcedure
    .input(
      z.object({
        searchTerm: z.string().min(1),
        limit: z.number().min(1).max(50).default(20),
        offset: z.number().min(0).default(0)
      })
    )
    .query(async ({ input }) => {
      return await GamesService.searchGames({
        searchTerm: input.searchTerm,
        limit: input.limit,
        offset: input.offset
      });
    }),
  // Einzelnes Spiel anhand der Game ID abrufen
  getGameById: protectedProcedure
    .input(
      z.object({
        gameId: z.number()
      })
    )
    .query(async ({ input }) => {
      const game = await GamesService.getGameById(input.gameId);
      if (!game) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Spiel nicht gefunden'
        });
      }
      return game;
    }),
  // IGDB nach Spielen durchsuchen
  searchIGDB: protectedProcedure
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
    })
});
