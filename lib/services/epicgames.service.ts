import { PrismaClient } from '@prisma/client';
import { GamesService } from './games.service';
import { PlatformService } from './platform.service';

const prisma = new PrismaClient();

export namespace EpicGamesService {
  // Die Basis-URL des Docker/Flask-Backends
  const backendUrl = 'https://epic.swapdi.de';
  export interface EpicGamesAuthData {
    auth_token: string;
    user_id: string;
  }

  export const completeAuth = async (
    authData: EpicGamesAuthData,
    userId: number
  ) => {
    try {
      const data = await $fetch<{ authenticated: boolean }>(
        `${backendUrl}/auth/complete`,
        {
          method: 'POST',
          headers: {
            'X-API-Key': process.env.EPIC_GAMES_API_KEY || '',
            'Content-Type': 'application/json'
          },
          body: { auth_token: authData.auth_token, user_id: authData.user_id }
        }
      );

      // Wenn die Epic Games Authentifizierung erfolgreich war, setze epicConnect auf true
      if (data && data.authenticated) {
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
      const games = await $fetch<any[]>(`${backendUrl}/games/${userId}`, {
        method: 'GET',
        headers: {
          'X-API-Key': process.env.EPIC_GAMES_API_KEY || ''
        }
      });
      return games;
    } catch (error) {
      console.error('Fehler beim Abrufen der Spiele:', error);
      return [];
    }
  };

  export const checkConfig = async (userId: string) => {
    try {
      const response = await $fetch(`${backendUrl}/auth/status/${userId}`, {
        method: 'GET',
        headers: {
          'X-API-Key': process.env.EPIC_GAMES_API_KEY || ''
        }
      });
      return response;
    } catch (error) {
      console.error('Fehler beim Überprüfen der Konfiguration:', error);
      return false;
    }
  };

  export const removeEpicGamesAuth = async (
    userId: number
  ): Promise<boolean> => {
    try {
      const response: any = await $fetch(
        `${backendUrl}/auth/delete/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'X-API-Key': process.env.EPIC_GAMES_API_KEY || ''
          }
        }
      );
      if (
        response &&
        response.message === 'Benutzer wurde erfolgreich abgemeldet.'
      ) {
        // Prisma-Update, um epicConnect auf false zu setzen
        await prisma.user.update({
          where: { id: userId },
          data: { epicConnect: false }
        });
        return true;
      }
    } catch (error) {
      console.error(
        'Fehler beim Entfernen der Epic Games-Authentifizierung:',
        error
      );
    }
    return false;
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
      // Hole Epic Games Platform ID
      const epicPlatformId = await PlatformService.getEpicPlatformId();

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
          // Epic Game Datenstruktur entsprechend der API-Antwort verarbeiten
          const gameName = epicGame.app_title || epicGame.metadata?.title;
          const appName = epicGame.app_name;

          if (!gameName) {
            result.errors.push(
              `Spiel ohne Namen gefunden (app_name: ${appName}) - übersprungen`
            );
            continue;
          }
          // Schritt 1: Prüfe ob Spiel bereits in der lokalen Datenbank existiert (nach Titel)
          const existingGame = await GamesService.findGameByName(gameName);
          let gameId: number | null = null;

          if (existingGame) {
            gameId = existingGame.id;
          } else {
            // Schritt 2: Spiel nicht in Datenbank - suche bei IGDB
            try {
              const gameResult =
                await GamesService.findOrCreateGameWithIGDBRelevance(gameName);
              if (gameResult?.game) {
                gameId = gameResult.game.id;
              }
              // Schritt 3: Kein Spiel in IGDB gefunden - gameId bleibt null
            } catch (igdbError) {
              console.error(
                `IGDB-Suche für "${gameName}" fehlgeschlagen:`,
                igdbError
              );
            }
          }
          if (gameId) {
            // Prüfe ob UserGame bereits existiert
            const existingUserGame = await prisma.userGame.findFirst({
              where: {
                userId,
                gameId
              }
            });

            if (existingUserGame) {
              // Aktualisiere bestehendes UserGame und füge Epic Platform hinzu wenn nicht vorhanden
              const currentPlatforms = existingUserGame.platformDRMs || [];
              const updatedPlatforms = currentPlatforms.includes(epicPlatformId)
                ? currentPlatforms
                : [...currentPlatforms, epicPlatformId];

              await prisma.userGame.update({
                where: { id: existingUserGame.id },
                data: {
                  platformDRMs: updatedPlatforms
                }
              });
              result.updated++;
            } else {
              // Erstelle neues UserGame mit Epic Platform
              await prisma.userGame.create({
                data: {
                  userId,
                  gameId: gameId, // gameId ist garantiert nicht null in diesem Block
                  isInstalled: false, // Epic API zeigt nicht direkt Installationsstatus
                  isFavorite: false,
                  platformDRMs: [epicPlatformId]
                }
              });
              result.imported++;
            }
          } else {
            result.skipped++;
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
