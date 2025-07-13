import { useGameUtils } from '~/composables/useGameUtils';
import { PrismaClient, type Game, type UserGame } from '~/prisma/client';

const prisma = new PrismaClient();
const { generateProgressiveVariants, findBestGameMatch } = useGameUtils();

// ============================================================================
// TYPEN & INTERFACES
// ============================================================================

export interface GameSearchOptions {
  searchTerm?: string;
  genres?: string[];
  developers?: string[];
  publishers?: string[];
  minRating?: number;
  limit?: number;
  offset?: number;
}

export interface GameImportResult {
  success: boolean;
  game: Game;
  isNew: boolean;
  message?: string;
}

export interface UserGameWithDetails extends UserGame {
  game: Game;
}

export namespace GamesService {
  /**
   * Suche nach Spielen in der zentralen Datenbank
   */
  export async function searchGames(options: GameSearchOptions = {}): Promise<{
    games: Game[];
    total: number;
    hasMore: boolean;
  }> {
    const {
      searchTerm,
      genres = [],
      developers = [],
      publishers = [],
      minRating,
      limit = 20,
      offset = 0
    } = options;

    // Baue WHERE-Bedingungen
    const where: any = {};
    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { summary: { contains: searchTerm, mode: 'insensitive' } }
      ];
    }
    // Genre-Filter
    if (genres.length > 0) {
      where.genres = { hasSome: genres };
    }
    // Developer-Filter
    if (developers.length > 0) {
      where.developers = { hasSome: developers };
    }
    // Publisher-Filter
    if (publishers.length > 0) {
      where.publishers = { hasSome: publishers };
    }
    // Rating-Filter
    if (minRating !== undefined) {
      where.totalRating = { gte: minRating };
    }
    // Ausführen der Suche
    const [games, total] = await Promise.all([
      prisma.game.findMany({
        where,
        orderBy: [
          { totalRating: 'desc' },
          { firstReleaseDate: 'desc' },
          { name: 'asc' }
        ],
        skip: offset,
        take: limit
      }),
      prisma.game.count({ where })
    ]);

    return {
      games,
      total,
      hasMore: offset + limit < total
    };
  }

  /**
   * Hole ein Spiel anhand der ID
   */
  export async function getGameById(id: number): Promise<Game | null> {
    return prisma.game.findUnique({
      where: { id }
    });
  }

  /**
   * Verbesserte IGDB-Suche basierend auf Relevanz, Popularität und Erscheinungsjahr
   * Grund: Wie IGDB-Webseite - nimmt das relevanteste erste Ergebnis
   * Mit Fallback-Strategien für bereinigte Titel
   */
  export async function findOrCreateGameWithIGDBRelevance(
    gameName: string
  ): Promise<GameImportResult | undefined> {
    try {
      // Prüfe zuerst lokale Datenbank
      const existingGame = await findGameByName(gameName);
      if (existingGame) {
        return {
          success: true,
          game: existingGame,
          isNew: false,
          message: 'Spiel bereits in der Datenbank'
        };
      }
      const titleVariants = generateProgressiveVariants(gameName);
      for (const titleVariant of titleVariants) {
        try {
          const { IGDBService } = await import('./igdb.service');
          const searchResults = await IGDBService.searchGames(titleVariant, 20);
          if (searchResults.length === 0) {
            console.log(`No IGDB results for variant: "${titleVariant}"`);
            continue;
          }
          // Grund: Einfacher Relevanz-Check OHNE doppelte Titel-Varianten
          const bestMatch = findBestGameMatch(titleVariant, searchResults);

          if (!bestMatch) {
            continue;
          }
          const existingByIGDB = await prisma.game.findUnique({
            where: { igdbId: bestMatch.id }
          });
          if (existingByIGDB) {
            return {
              success: true,
              game: existingByIGDB,
              isNew: false,
              message: `Spiel mit IGDB-ID bereits vorhanden (gefunden mit Variante: "${titleVariant}")`
            };
          }
          const newIGDBGame = await IGDBService.getGameDetails(bestMatch.id);
          if (!newIGDBGame) {
            console.log(`Failed to get details for IGDB game ${bestMatch.id}`);
            continue;
          }
          const igdbGameData = IGDBService.convertIGDBGame(newIGDBGame);
          const newGame = await prisma.game.create({
            data: {
              igdbId: igdbGameData.id,
              name: igdbGameData.name,
              slug: igdbGameData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              summary: igdbGameData.summary,
              firstReleaseDate: igdbGameData.firstReleaseDate,
              coverUrl: igdbGameData.coverUrl,
              screenshots: igdbGameData.screenshotUrls || [],
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
            message: `Spiel erstellt mit IGDB-Daten (ID: ${bestMatch.id}, gefunden mit Variante: "${titleVariant}")`
          };
        } catch (igdbError) {
          console.error(`IGDB Error for variant "${titleVariant}":`, igdbError);
          continue;
        }
      }
      console.warn(`All title variants failed for: "${gameName}"`);
      return undefined;
    } catch (error) {
      console.error('Error in findOrCreateGameWithIGDBRelevance:', error);
      throw new Error(
        `Failed to find or create game: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
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
      const existingGame = await findGameByName(gameName);
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
        const igdbGameData = await IGDBService.searchAndConvertGame(gameName);

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
        console.log(`IGDB-Suche für "${gameName}" fehlgeschlagen:`, igdbError);
      }
    } catch (error) {
      console.error('Fehler beim Finden/Erstellen des Spiels:', error);
      const message =
        error instanceof Error ? error.message : 'Unbekannter Fehler';
      throw new Error(`Spiel konnte nicht importiert werden: ${message}`);
    }
  }

  // ============================================================================
  // USER GAMES OPERATIONEN
  // ============================================================================

  /**
   * Hole alle Spiele eines Users
   */
  export async function getUserGames(
    userId: number
  ): Promise<UserGameWithDetails[]> {
    return prisma.userGame.findMany({
      where: { userId },
      include: { game: true },
      orderBy: { addedAt: 'desc' }
    });
  }

  /**
   * Füge ein Spiel zur User-Bibliothek hinzu
   */
  export async function addGameToUser(
    userId: number,
    gameName: string,
    playtimeMinutes?: number
  ): Promise<UserGameWithDetails | null> {
    // Finde oder erstelle das Spiel
    const importResult = await findOrCreateGameWithIGDBRelevance(gameName);
    if (!importResult || !importResult.game) {
      throw new Error(
        `Spiel "${gameName}" konnte nicht gefunden oder erstellt werden.`
      );
    }
    // Prüfe ob User das Spiel bereits hat
    const existingUserGame = await prisma.userGame.findUnique({
      where: {
        userId_gameId: {
          userId,
          gameId: importResult.game.id
        }
      }
    });

    if (existingUserGame) {
      // Aktualisiere Spielzeit falls angegeben
      if (playtimeMinutes !== undefined) {
        const updatedUserGame = await prisma.userGame.update({
          where: { id: existingUserGame.id },
          data: { playtimeMinutes },
          include: { game: true }
        });
        return updatedUserGame;
      }

      // Gib existierendes UserGame zurück
      return prisma.userGame.findUnique({
        where: { id: existingUserGame.id },
        include: { game: true }
      }) as Promise<UserGameWithDetails>;
    }

    // Erstelle neues UserGame
    return prisma.userGame.create({
      data: {
        userId,
        gameId: importResult.game.id,
        playtimeMinutes: playtimeMinutes || 0
      },
      include: { game: true }
    });
  }

  /**
   * Aktualisiere User-Game-Daten
   */
  export async function updateUserGame(
    userGameId: number,
    data: {
      playtimeMinutes?: number;
      lastPlayed?: Date;
      notes?: string;
      isInstalled?: boolean;
      isFavorite?: boolean;
    }
  ): Promise<UserGameWithDetails> {
    return prisma.userGame.update({
      where: { id: userGameId },
      data,
      include: { game: true }
    });
  }

  /**
   * Entferne ein Spiel aus der User-Bibliothek
   */
  export async function removeGameFromUser(userGameId: number): Promise<void> {
    await prisma.userGame.delete({
      where: { id: userGameId }
    });
  }

  /**
   * Hole ein UserGame anhand der ID
   */
  export async function getUserGameById(
    userGameId: number
  ): Promise<UserGameWithDetails | null> {
    return prisma.userGame.findUnique({
      where: { id: userGameId },
      include: { game: true }
    });
  }

  /**
   * Entferne ein UserGame anhand der ID
   */
  export async function deleteUserGame(userGameId: number): Promise<void> {
    await prisma.userGame.delete({
      where: { id: userGameId }
    });
  }

  /**
   * Hole User-Statistiken
   */
  export async function getUserStats(userId: number): Promise<{
    totalGames: number;
    totalPlaytime: number;
    averagePlaytime: number;
    favoriteGames: number;
    recentlyPlayed: UserGameWithDetails[];
    topGenres: Array<{ genre: string; count: number }>;
  }> {
    const userGames = await prisma.userGame.findMany({
      where: { userId },
      include: { game: true }
    });

    const totalGames = userGames.length;
    const totalPlaytime = userGames.reduce(
      (sum, ug) => sum + (ug.playtimeMinutes || 0),
      0
    );
    const averagePlaytime =
      totalGames > 0 ? Math.round(totalPlaytime / totalGames) : 0;
    const favoriteGames = userGames.filter(ug => ug.isFavorite).length;

    const recentlyPlayed = userGames
      .filter(ug => ug.lastPlayed)
      .sort(
        (a, b) =>
          new Date(b.lastPlayed!).getTime() - new Date(a.lastPlayed!).getTime()
      )
      .slice(0, 5);

    // Genre-Statistiken berechnen
    const genreCounts = new Map<string, number>();
    userGames.forEach(ug => {
      ug.game.genres.forEach(genre => {
        genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
      });
    });

    const topGenres = Array.from(genreCounts.entries())
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalGames,
      totalPlaytime,
      averagePlaytime,
      favoriteGames,
      recentlyPlayed,
      topGenres
    };
  }

  // ============================================================================
  // STEAM IMPORT OPERATIONEN
  // ============================================================================

  /**
   * Steam-Bibliothek importieren - Einfache Variante mit optionaler IGDB-Anreicherung
   * Erstellt nur neue Spiele basierend auf dem Namen, fügt IGDB-Daten hinzu wenn verfügbar
   * Steam Cover-URLs werden bevorzugt und überschreiben vorhandene Cover
   */
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
          const existingGame = await findGameByName(steamGame.name);
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

  // ============================================================================
  // HILFSFUNKTIONEN (INTERN)
  // ============================================================================

  /**
   * Finde Spiel anhand des Namens (fuzzy search)
   * Grund: Spiele können leicht unterschiedliche Namen haben
   */
  async function findGameByName(gameName: string): Promise<Game | null> {
    const normalizedName = gameName.trim();

    // Zuerst exakte Suche (case-insensitive)
    const exactMatch = await prisma.game.findFirst({
      where: { name: { equals: normalizedName, mode: 'insensitive' } }
    });
    if (exactMatch) return exactMatch;
    const fuzzyMatch = await prisma.game.findFirst({
      where: { name: { contains: normalizedName, mode: 'insensitive' } }
    });
    if (fuzzyMatch) return fuzzyMatch;
    const normalizedSearchTitles = generateProgressiveVariants(normalizedName);

    if (normalizedSearchTitles.length > 0) {
      const allGames = await prisma.game.findMany({
        select: { id: true, name: true, slug: true }
      });
      for (const game of allGames) {
        const normalizedGameTitles = generateProgressiveVariants(game.name);
        // Prüfe auf exakte Übereinstimmung zwischen allen Varianten
        for (const searchVariant of normalizedSearchTitles) {
          for (const gameVariant of normalizedGameTitles) {
            if (searchVariant === gameVariant) {
              return prisma.game.findUnique({ where: { id: game.id } });
            }
            // Prüfe auf enthält-Beziehung in beide Richtungen
            if (
              gameVariant.includes(searchVariant) ||
              searchVariant.includes(gameVariant)
            ) {
              return prisma.game.findUnique({ where: { id: game.id } });
            }
          }
        }
      }
    }
    // Fallback: Versuche auch umgekehrt - wenn DB-Name im Suchbegriff enthalten ist
    const reverseMatch = await prisma.game.findFirst({
      where: {
        OR: [
          { name: { contains: normalizedName, mode: 'insensitive' } },
          {
            slug: {
              contains: normalizedName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-'),
              mode: 'insensitive'
            }
          }
        ]
      }
    });

    return reverseMatch;
  }
}
