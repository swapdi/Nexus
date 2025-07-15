import { PrismaClient } from '~/prisma/client';
import type { GameImportResult } from './games.service';
import { GamesService } from './games.service';

const prisma = new PrismaClient();

export namespace EpicGamesService {
  // Die Basis-URL deines Docker/Flask-Backends
  // Für die Produktion sollte dies aus der Nuxt-Konfiguration kommen
  const backendUrl = 'http://localhost:5000';

  export interface EpicGamesAuthData {
    auth_token: string;
    user_id: string;
  }

  export const completeAuth = async (
    authData: EpicGamesAuthData,
    userId: number
  ) => {
    try {
      const data = await $fetch<{ status: string }>(
        `${backendUrl}/auth/complete`,
        {
          method: 'POST',
          body: { auth_token: authData.auth_token, user_id: authData.user_id }
        }
      );

      // Wenn die Epic Games Authentifizierung erfolgreich war, setze epicConnect auf true
      if (data && data.status === 'success') {
        await prisma.user.update({
          where: { id: userId },
          data: { epicConnect: true }
        });
      }

      return data;
    } catch (error) {
      console.error('Fehler beim Abschließen der Authentifizierung:', error);
      return null;
    }
  };

  export const getGames = async (userId: string) => {
    try {
      const games = await $fetch<any[]>(`${backendUrl}/games/${userId}`);
      return games;
    } catch (error) {
      console.error('Fehler beim Abrufen der Spiele:', error);
      return [];
    }
  };

  export const checkConfig = async (userId: string) => {
    try {
      const response = await $fetch(`${backendUrl}/auth/status/${userId}`);
      return response;
    } catch (error) {
      console.error('Fehler beim Überprüfen der Konfiguration:', error);
      return false;
    }
  };

  /**
   * Importiere Epic Games Bibliothek für einen Benutzer
   * Grund: Analog zum Steam Import - erstelle UserGames mit verknüpften Games
   */
  export async function importEpicLibrary(userId: number): Promise<{
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
      // Hole Epic Games Library
      const epicGames = await getGames(userId.toString());

      if (!epicGames || epicGames.length === 0) {
        result.success = false;
        result.errors.push(
          'Keine Spiele in der Epic Games-Bibliothek gefunden oder Konfiguration fehlt'
        );
        return result;
      }

      // Verarbeite Epic Games
      for (const epicGame of epicGames) {
        try {
          console.log('Verarbeite Epic Game:', epicGame);
          // Epic Game Datenstruktur anpassen - je nach Backend-Response
          const gameName =
            epicGame.name || epicGame.title || epicGame.displayName;

          if (!gameName) {
            result.errors.push('Spiel ohne Namen gefunden - übersprungen');
            continue;
          }

          // Prüfe ob Spiel bereits existiert oder erstelle es
          const existingGame = await GamesService.findGameByName(gameName);
          let gameId: number;

          if (existingGame) {
            gameId = existingGame.id;
          } else {
            // Erstelle neues Spiel mit IGDB-Anreicherung
            const gameResult = await findOrCreateGameWithEpicData(gameName);
            if (!gameResult?.game) {
              throw new Error(`Failed to create game for ${gameName}`);
            }
            gameId = gameResult.game.id;
          }

          // Prüfe ob UserGame bereits existiert
          const existingUserGame = await prisma.userGame.findFirst({
            where: {
              userId,
              gameId
            }
          });

          if (existingUserGame) {
            // Epic Games liefert normalerweise keine Spielzeiten
            // Aktualisiere nur wenn nötig
            result.updated++;
          } else {
            // Erstelle neues UserGame
            await prisma.userGame.create({
              data: {
                userId,
                gameId,
                playtimeMinutes: 0, // Epic liefert meist keine Spielzeiten
                lastPlayed: null,
                isInstalled: epicGame.installed || false,
                isFavorite: false
              }
            });
            result.imported++;
          }
        } catch (error) {
          const errorMsg = `Fehler beim Importieren von "${
            epicGame.name || 'Unbekanntes Spiel'
          }": ${error}`;
          result.errors.push(errorMsg);
          console.error(errorMsg);
        }
      }

      return result;
    } catch (error) {
      console.error('Epic Games Import Error:', error);
      result.success = false;
      result.errors.push(
        error instanceof Error ? error.message : 'Unbekannter Fehler'
      );
      return result;
    }
  }

  /**
   * Finde oder erstelle ein Spiel mit Epic Games Daten
   * Grund: Analog zum Steam Service - nutze IGDB für Metadaten
   */
  export async function findOrCreateGameWithEpicData(
    gameName: string
  ): Promise<GameImportResult | undefined> {
    try {
      // Prüfe zuerst lokale Datenbank
      const existingGame = await GamesService.findGameByName(gameName);
      if (existingGame) {
        return {
          success: true,
          game: existingGame,
          isNew: false,
          message: 'Spiel bereits vorhanden'
        };
      }

      // Versuche IGDB-Daten zu finden
      try {
        const { IGDBService } = await import('./igdb.service');
        const igdbGameData = await IGDBService.findGameByTitle(gameName);

        if (igdbGameData) {
          // Prüfe ob bereits ein Spiel mit dieser IGDB-ID existiert
          const existingByIGDB = await prisma.game.findUnique({
            where: { igdbId: igdbGameData.id }
          });

          if (existingByIGDB) {
            return {
              success: true,
              game: existingByIGDB,
              isNew: false,
              message: 'IGDB-Spiel bereits vorhanden'
            };
          }

          // Erstelle Spiel mit IGDB-Daten
          const newGame = await prisma.game.create({
            data: {
              igdbId: igdbGameData.id,
              name: igdbGameData.name,
              slug: igdbGameData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              summary: igdbGameData.summary,
              firstReleaseDate: igdbGameData.firstReleaseDate,
              coverUrl: igdbGameData.coverUrl,
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
            message: 'Spiel mit IGDB-Daten erstellt'
          };
        }
      } catch (igdbError) {
        console.warn(
          'IGDB-Suche fehlgeschlagen, erstelle Basis-Spiel:',
          igdbError
        );
      }

      // Fallback: Erstelle Basis-Spiel ohne IGDB-Daten
      const newGame = await prisma.game.create({
        data: {
          name: gameName,
          slug: gameName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          summary: null,
          firstReleaseDate: null,
          coverUrl: '/gameplaceholder.jpg', // Fallback Cover
          screenshots: [],
          videos: [],
          totalRating: null,
          genres: [],
          developers: [],
          publishers: [],
          lastSyncedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      return {
        success: true,
        game: newGame,
        isNew: true,
        message: 'Basis-Spiel ohne IGDB-Daten erstellt'
      };
    } catch (error) {
      console.error('Fehler beim Finden/Erstellen des Spiels:', error);
      const message =
        error instanceof Error ? error.message : 'Unbekannter Fehler';
      throw new Error(`Spiel konnte nicht importiert werden: ${message}`);
    }
  }
}
