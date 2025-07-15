import { PrismaClient } from '~/prisma/client';
import type { GameImportResult } from './games.service';
import { GamesService } from './games.service';
const prisma = new PrismaClient();

export namespace SteamService {
  export async function importSteamLibrary(
    userId: number,
    steamInput: string
  ): Promise<{
    success: boolean;
    imported: number;
    updated: number;
    skipped: number;
    errors: string[];
  }> {
    const { useSteamImport } = await import('../../composables/useSteamImport');
    const steamImport = useSteamImport();
    const result = {
      success: true,
      imported: 0,
      updated: 0,
      skipped: 0,
      errors: [] as string[]
    };
    try {
      // Validiere Steam Input
      const validation = await steamImport.validateSteamInput(steamInput);
      if (!validation.isValid || !validation.steamId) {
        result.success = false;
        result.errors.push('Ungültige Steam ID oder Profil-URL');
        return result;
      }
      // Hole Steam Library
      const steamGames = await steamImport.fetchSteamLibrary(
        validation.steamId
      );
      if (!steamGames || steamGames.length === 0) {
        result.success = false;
        result.errors.push(
          'Keine Spiele in der Steam-Bibliothek gefunden oder Profil ist privat'
        );
        return result;
      }
      // Verarbeite Steam-Spiele
      for (const steamGame of steamGames) {
        try {
          // Generiere Steam Cover-URL
          const steamCoverUrl = steamImport.getSteamCoverUrl(steamGame.appid);
          // Prüfe ob Spiel bereits existiert
          const existingGame = await GamesService.findGameByName(
            steamGame.name
          );
          let gameId: number;
          if (existingGame) {
            // Spiel existiert bereits - aktualisiere Cover-URL mit Steam Cover
            await prisma.game.update({
              where: { id: existingGame.id },
              data: {
                coverUrl: steamCoverUrl, // Steam Cover überschreibt vorhandenes Cover
                updatedAt: new Date()
              }
            });
            gameId = existingGame.id;
          } else {
            // Erstelle neues Spiel mit Steam Cover und optionaler IGDB-Anreicherung
            const gameResult = await findOrCreateGameWithSteamCover(
              steamGame.name,
              steamCoverUrl
            );
            if (!gameResult?.game) {
              throw new Error(`Failed to create game for ${steamGame.name}`);
            }
            gameId = gameResult.game.id;
          }
          // Konvertiere Steam-Daten
          const playtimeMinutes = steamGame.playtime_forever || 0;
          const lastPlayed = steamGame.rtime_last_played
            ? new Date(steamGame.rtime_last_played * 1000)
            : null;
          // Prüfe ob UserGame bereits existiert
          const existingUserGame = await prisma.userGame.findFirst({
            where: {
              userId,
              gameId
            }
          });
          if (existingUserGame) {
            // Aktualisiere bestehendes UserGame
            await prisma.userGame.update({
              where: { id: existingUserGame.id },
              data: {
                playtimeMinutes,
                lastPlayed
              }
            });
            result.updated++;
          } else {
            // Erstelle neues UserGame
            await prisma.userGame.create({
              data: {
                userId,
                gameId,
                playtimeMinutes,
                lastPlayed,
                isInstalled: false,
                isFavorite: false
              }
            });
            result.imported++;
          }
        } catch (error) {
          const errorMsg = `Fehler beim Importieren von "${steamGame.name}": ${error}`;
          result.errors.push(errorMsg);
          console.error(errorMsg);
        }
      }
      return result;
    } catch (error) {
      console.error('Steam Import Error:', error);
      result.success = false;
      result.errors.push(
        error instanceof Error ? error.message : 'Unbekannter Fehler'
      );
      return result;
    }
  }
  /**
   * Finde oder erstelle ein Spiel mit Steam Cover-URL Präferenz
   * Grund: Steam Cover-URLs sollen bevorzugt und überschrieben werden
   */
  export async function findOrCreateGameWithSteamCover(
    gameName: string,
    steamCoverUrl: string
  ): Promise<GameImportResult | undefined> {
    try {
      // Prüfe zuerst lokale Datenbank
      const existingGame = await GamesService.findGameByName(gameName);
      if (existingGame) {
        // Aktualisiere vorhandenes Spiel mit Steam Cover
        const updatedGame = await prisma.game.update({
          where: { id: existingGame.id },
          data: {
            coverUrl: steamCoverUrl, // Steam Cover überschreibt vorhandenes Cover
            updatedAt: new Date()
          }
        });
        return {
          success: true,
          game: updatedGame,
          isNew: false,
          message: 'Spiel mit Steam Cover aktualisiert'
        };
      }
      // Versuche IGDB-Daten zu finden (optional)
      try {
        const { IGDBService } = await import('./igdb.service');
        const igdbGameData = await IGDBService.findGameByTitle(gameName);
        if (igdbGameData) {
          // Prüfe ob bereits ein Spiel mit dieser IGDB-ID existiert
          const existingByIGDB = await prisma.game.findUnique({
            where: { igdbId: igdbGameData.id }
          });
          if (existingByIGDB) {
            // Aktualisiere vorhandenes Spiel mit Steam Cover
            const updatedGame = await prisma.game.update({
              where: { id: existingByIGDB.id },
              data: {
                coverUrl: steamCoverUrl, // Steam Cover überschreibt IGDB Cover
                updatedAt: new Date()
              }
            });
            return {
              success: true,
              game: updatedGame,
              isNew: false,
              message: 'IGDB-Spiel mit Steam Cover aktualisiert'
            };
          }
          // Erstelle Spiel mit IGDB-Daten aber Steam Cover
          const newGame = await prisma.game.create({
            data: {
              igdbId: igdbGameData.id,
              name: igdbGameData.name,
              slug: igdbGameData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              summary: igdbGameData.summary,
              firstReleaseDate: igdbGameData.firstReleaseDate,
              coverUrl: steamCoverUrl, // Steam Cover bevorzugt über IGDB Cover
              screenshots: igdbGameData.screenshotUrls || [],
              videos: igdbGameData.videoUrls || [],
              totalRating: igdbGameData.totalRating,
              genres: igdbGameData.genres || [],
              developers: igdbGameData.developers || [],
              publishers: igdbGameData.publishers || [],
              lastSyncedAt: new Date(),
              createdAt: new Date(),
              updatedAt: new Date()
            }
          });
          return {
            success: true,
            game: newGame,
            isNew: true,
            message: 'Spiel mit IGDB-Daten und Steam Cover erstellt'
          };
        }
      } catch (igdbError) {}
    } catch (error) {
      console.error('Fehler beim Finden/Erstellen des Spiels:', error);
      const message =
        error instanceof Error ? error.message : 'Unbekannter Fehler';
      throw new Error(`Spiel konnte nicht importiert werden: ${message}`);
    }
  }
}
