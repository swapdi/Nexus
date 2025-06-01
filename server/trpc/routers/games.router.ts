import { z } from 'zod';
import { router, protectedProcedure } from '~/server/trpc/trpc';
import { TRPCError } from '@trpc/server';
import { GamesService } from '~/lib/services/games.service';

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

  // Steam-Bibliothek importieren
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
        }

        // Steam-Plattform finden oder erstellen
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
          errors: 0
        }; // Spiele importieren
        for (const steamGame of data.response.games) {
          try {
            const result = await GamesService.processSteamGameImport(
              ctx.dbUser.id,
              steamGame,
              steamPlatform.id
            );

            if (result === 'imported') {
              importResults.imported++;
            } else if (result === 'updated') {
              importResults.updated++;
            } else {
              importResults.skipped++;
            }
          } catch (error) {
            console.error(
              `Fehler beim Importieren von Spiel ${steamGame.name}:`,
              error
            );
            importResults.errors++;
          }
        }

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
          errors: importResults.errors
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
