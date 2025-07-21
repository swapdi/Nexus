import { PrismaClient } from '~/prisma/client';
import { useSteamImport } from '../../composables/useSteamImport';
import { GamesService } from './games.service';
import { IGDBService } from './igdb.service';
import { PlatformService } from './platform.service';
const steamImport = useSteamImport();

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
    const result = {
      success: true,
      imported: 0,
      updated: 0,
      skipped: 0,
      errors: [] as string[]
    };
    try {
      if (!steamImport.isValidSteamID(steamInput)) {
        result.success = false;
        result.errors.push('Ungültige Steam ID');
        return result;
      }
      // Hole Steam Platform ID
      const steamPlatformId = await PlatformService.getSteamPlatformId();

      // Hole Steam Library
      const steamGames = await steamImport.fetchSteamLibrary(steamInput);
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

          // Verwende bestehende Funktion für Spiel-Suche/Erstellung
          const gameResult = await findOrCreateGameWithSteamCover(
            steamGame.name,
            steamCoverUrl
          );

          // gameId kann null sein, falls kein Spiel gefunden/erstellt werden konnte
          const gameId = gameResult?.game?.id || null;
          // Konvertiere Steam-Daten
          const playtimeMinutes = steamGame.playtime_forever || 0;
          const lastPlayed = steamGame.rtime_last_played
            ? new Date(steamGame.rtime_last_played * 1000)
            : null;

          // Falls kein Game gefunden wurde, erstelle trotzdem UserGame (aber nur mit gameId falls vorhanden)
          if (gameId) {
            // Prüfe ob UserGame bereits existiert
            const existingUserGame = await prisma.userGame.findFirst({
              where: {
                userId,
                gameId
              }
            });

            if (existingUserGame) {
              // Aktualisiere bestehendes UserGame - Steam-Daten immer überschreiben
              const currentPlatforms = existingUserGame.platformDRMs || [];
              const updatedPlatforms = currentPlatforms.includes(
                steamPlatformId
              )
                ? currentPlatforms
                : [...currentPlatforms, steamPlatformId];

              await prisma.userGame.update({
                where: { id: existingUserGame.id },
                data: {
                  playtimeMinutes, // Steam-Daten überschreiben
                  lastPlayed, // Steam-Daten überschreiben
                  platformDRMs: updatedPlatforms
                }
              });
              result.updated++;
            } else {
              // Erstelle neues UserGame mit Game-Verknüpfung
              await prisma.userGame.create({
                data: {
                  userId,
                  gameId,
                  playtimeMinutes,
                  lastPlayed,
                  isInstalled: false,
                  isFavorite: false,
                  platformDRMs: [steamPlatformId]
                }
              });
              result.imported++;
            }
          } else {
            result.skipped++;
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
   * Rückgabe: GameImportResult oder null falls kein Spiel gefunden/erstellt werden kann
   */
  export async function findOrCreateGameWithSteamCover(
    gameName: string,
    steamCoverUrl: string
  ): Promise<GameImportResult | null> {
    try {
      // Schritt 1: Prüfe zuerst lokale Datenbank nach exaktem Titel
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

      // Schritt 2: Spiel nicht in lokaler DB - suche bei IGDB
      try {
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

          // Erstelle neues Spiel mit IGDB-Daten aber Steam Cover
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
      } catch (igdbError) {
        console.error(
          `IGDB-Suche für "${gameName}" fehlgeschlagen:`,
          igdbError
        );
      }

      // Schritt 3: Kein Spiel gefunden - null zurückgeben
      return null;
    } catch (error) {
      console.error('Fehler beim Finden/Erstellen des Spiels:', error);
      return null;
    }
  }
}
