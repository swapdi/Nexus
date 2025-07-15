import { PrismaClient } from '~/prisma/client';
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
      console.log(
        `Epic Games Import gestartet: ${epicGames.length} Spiele gefunden`
      );
      // Verarbeite Epic Games
      for (const epicGame of epicGames) {
        try {
          // Epic Game Datenstruktur entsprechend der API-Antwort verarbeiten
          const gameName = epicGame.app_title || epicGame.metadata?.title;
          const appName = epicGame.app_name;

          if (!gameName) {
            result.errors.push(
              `Spiel ohne Namen gefunden (app_name: ${appName}) - übersprungen`
            );
            continue;
          }
          // Prüfe ob Spiel bereits existiert oder erstelle es
          const existingGame = await GamesService.findGameByName(gameName);
          let gameId: number;

          if (existingGame) {
            gameId = existingGame.id;
          } else {
            // Erstelle neues Spiel mit IGDB-Anreicherung
            const gameResult =
              await GamesService.findOrCreateGameWithIGDBRelevance(gameName);
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
            console.log(
              `UserGame für "${gameName}" bereits vorhanden - übersprungen`
            );
            result.updated++;
          } else {
            // Erstelle neues UserGame
            await prisma.userGame.create({
              data: {
                userId,
                gameId,
                playtimeMinutes: 0, // Epic liefert meist keine Spielzeiten
                lastPlayed: null,
                isInstalled: false, // Epic API zeigt nicht direkt Installationsstatus
                isFavorite: false
              }
            });
            result.imported++;
          }
        } catch (error) {
          const errorMsg = `Fehler beim Importieren von "${
            epicGame.app_title || epicGame.app_name || 'Unbekanntes Spiel'
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
}
