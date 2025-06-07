import { z } from 'zod';
import { router, protectedProcedure } from '~/server/trpc/trpc';
import { TRPCError } from '@trpc/server';
import { GamesService } from '~/lib/services/games.service';
import type { Game, PlatformGame, Platform } from '~/prisma/client';
import { sendProgressUpdate } from '~/server/api/progress/[operationId].get';

// Extended Game type with relations
type GameWithRelations = Game & {
  platformGames: (PlatformGame & {
    platform: Platform;
  })[];
};

// Steam API Response Types
interface SteamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url?: string;
  img_logo_url?: string;
  has_community_visible_stats?: boolean;
  playtime_windows_forever?: number;
  playtime_mac_forever?: number;
  playtime_linux_forever?: number;
  rtime_last_played?: number;
}

interface SteamApiResponse {
  response: {
    game_count: number;
    games: SteamGame[];
  };
}

export const gamesRouter = router({
  // Benutzer-Spiele abrufen
  getUserGames: protectedProcedure.query(async ({ ctx }) => {
    return await GamesService.getUserGames(ctx.dbUser.id);
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
          console.log(`Processing gameId: ${gameId} (type: ${typeof gameId})`);

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
        // Steam ID aus verschiedenen Eingabeformaten extrahieren
        const steamId = extractSteamId(input.steamInput);

        if (!steamId) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Ungültige Steam ID oder Profil-URL'
          });
        }

        // Steam API Key aus Umgebungsvariablen
        const steamApiKey = process.env.STEAM_API_KEY;
        if (!steamApiKey) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Steam API Key nicht konfiguriert'
          });
        }

        // Steam Web API aufrufen
        const response = await fetch(
          `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`
        );

        if (!response.ok) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Fehler beim Abrufen der Steam-Bibliothek'
          });
        }

        const data: SteamApiResponse = await response.json();

        if (!data.response?.games) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Keine Spiele gefunden oder Profil ist privat'
          });
        } // Steam-Plattform finden oder erstellen
        const steamPlatform = await GamesService.findOrCreatePlatform(
          'Steam',
          'steam',
          {
            siteUrl: 'https://store.steampowered.com'
          }
        );

        const importResults = {
          imported: 0,
          updated: 0,
          skipped: 0,
          errors: 0,
          enriched: 0,
          enrichmentErrors: 0
        }; // Spiele importieren mit optimierter Batch-Verarbeitung
        console.log('Starting optimized Steam import');
        console.log(`Total games to import: ${data.response.games.length}`);

        // Aufteilen in Batches von 15 Spielen für bessere Performance
        const BATCH_SIZE = 15;
        const games = data.response.games;
        const totalBatches = Math.ceil(games.length / BATCH_SIZE); // Progress-Callback für detaillierte Updates mit SSE-Integration
        const operationId =
          input.operationId ||
          `steam-import-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;
        const updateProgress = (
          current: number,
          total: number,
          message: string
        ) => {
          console.log(`Import Progress: ${current}/${total} - ${message}`);
          // Sende Progress-Update via SSE
          if (input.operationId) {
            sendProgressUpdate(operationId, current, total, message);
          }
        };

        // Initiale Progress-Nachricht
        updateProgress(0, games.length, 'Steam-Import wird vorbereitet...');
        for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
          const batchStart = batchIndex * BATCH_SIZE;
          const batchEnd = Math.min(batchStart + BATCH_SIZE, games.length);
          const batch = games.slice(batchStart, batchEnd);

          console.log(
            `Processing batch ${batchIndex + 1}/${totalBatches} (${
              batch.length
            } games)`
          );
          // Detailliertes Progress-Update für jeden Batch
          const batchProgress =
            Math.round((batchStart / games.length) * 70) + 20; // 20-90% für Game-Import
          updateProgress(
            batchStart,
            games.length,
            `Importiere Batch ${
              batchIndex + 1
            }/${totalBatches} - ${batchProgress}% abgeschlossen`
          );

          // Parallele Verarbeitung innerhalb des Batches (ohne IGDB für bessere Performance)
          const batchPromises = batch.map(async (steamGame, gameIndex) => {
            try {
              const gameProgress = batchStart + gameIndex;
              console.log(
                `Processing: ${steamGame.name} (AppID: ${
                  steamGame.appid
                }) - Game ${gameProgress + 1}/${games.length}`
              );

              // Schnelle Spiel-Import-Funktion ohne IGDB-Anreicherung
              const result = await GamesService.processSteamGameImport(
                ctx.dbUser.id,
                steamGame,
                steamPlatform.id
              );

              console.log(`Game "${steamGame.name}" - Result: ${result}`);
              return { steamGame, result, success: true };
            } catch (error) {
              console.error(
                `Fehler beim Importieren von Spiel ${steamGame.name}:`,
                error
              );
              return { steamGame, result: 'error', success: false, error };
            }
          });

          // Warten auf Batch-Abschluss
          const batchResults = await Promise.all(batchPromises);

          // Ergebnisse sammeln
          for (const batchResult of batchResults) {
            if (batchResult.success) {
              if (batchResult.result === 'imported') {
                importResults.imported++;
              } else if (batchResult.result === 'updated') {
                importResults.updated++;
              } else {
                importResults.skipped++;
              }
            } else {
              importResults.errors++;
            }
          }

          // Kurze Pause zwischen Batches um Server zu schonen
          if (batchIndex < totalBatches - 1) {
            await new Promise(resolve => setTimeout(resolve, 50)); // Verkürzte Pause für bessere Performance
          }
        } // IGDB-Anreicherung als separater, optionaler Schritt für neue Spiele
        console.log(
          'Starting optional IGDB enrichment for newly imported games...'
        );
        updateProgress(
          games.length,
          games.length,
          'IGDB-Anreicherung wird vorbereitet...'
        );

        const newGames = await ctx.db.game.findMany({
          where: {
            platformGames: {
              some: {
                platformId: steamPlatform.id
              }
            },
            // Nur Spiele ohne Beschreibung oder Genres (vermutlich neu importiert)
            OR: [
              { description: null },
              { description: '' },
              { genres: { equals: [] } }
            ]
          },
          take: 50 // Maximal 50 Spiele für IGDB-Anreicherung
        });

        console.log(
          `Found ${newGames.length} games for potential IGDB enrichment`
        ); // Sequenzielle IGDB-Anreicherung mit Rate Limiting
        for (let i = 0; i < newGames.length; i++) {
          const game = newGames[i];
          try {
            console.log(
              `IGDB enrichment ${i + 1}/${newGames.length}: ${game.title}`
            );

            // Progress-Update für IGDB-Anreicherung
            const enrichmentProgress =
              Math.round((i / newGames.length) * 10) + 90; // 90-100% für IGDB
            updateProgress(
              games.length + i,
              games.length + newGames.length,
              `IGDB-Anreicherung: ${game.title} (${i + 1}/${newGames.length})`
            );

            const enriched = await GamesService.enrichSteamGameWithIGDB(
              game.id,
              game.title,
              false // No force update
            );
            if (enriched) {
              importResults.enriched++;
            } else {
              importResults.enrichmentErrors++;
            }

            // Rate limiting: 4 requests per second (250ms delay)
            if (i < newGames.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 250));
            }
          } catch (error) {
            console.error(`IGDB enrichment failed for: ${game.title}`, error);
            importResults.enrichmentErrors++;
          }
        }

        // Finales Progress-Update
        updateProgress(
          games.length + newGames.length,
          games.length + newGames.length,
          'Steam-Import erfolgreich abgeschlossen!'
        );

        // XP-Belohnung für Import vergeben
        if (importResults.imported > 0) {
          const xpReward = Math.min(importResults.imported * 10, 500); // Max 500 XP pro Import
          await GamesService.rewardUserXP(ctx.dbUser.id, xpReward);
        }
        return {
          success: true,
          totalGames: data.response.game_count,
          imported: importResults.imported,
          updated: importResults.updated,
          skipped: importResults.skipped,
          errors: importResults.errors,
          enriched: importResults.enriched,
          enrichmentErrors: importResults.enrichmentErrors
        };
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
  })
});

// Hilfsfunktion um Steam ID aus verschiedenen Formaten zu extrahieren
function extractSteamId(input: string): string | null {
  // Steam ID 64 (17 Ziffern)
  const steamId64Match = input.match(/\b\d{17}\b/);
  if (steamId64Match) {
    return steamId64Match[0];
  }

  // Steam Profil URL
  const profileUrlMatch = input.match(
    /steamcommunity\.com\/profiles\/(\d{17})/
  );
  if (profileUrlMatch) {
    return profileUrlMatch[1];
  }

  // Steam Custom URL (vereinfacht - in echter Implementierung müsste man die API verwenden)
  const customUrlMatch = input.match(/steamcommunity\.com\/id\/([^\/]+)/);
  if (customUrlMatch) {
    // Hier müsste man ResolveVanityURL API verwenden
    // Für jetzt returnen wir null und der Benutzer muss Steam ID 64 verwenden
    return null;
  }

  return null;
}
