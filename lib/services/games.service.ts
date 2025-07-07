import { PrismaClient, type Game, type UserGame } from '~/prisma/client';
import { IGDBService, type IGDBGameData } from './igdb.service';

const prisma = new PrismaClient();

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

// ============================================================================
// ZENTRALE SPIELE-OPERATIONEN
// ============================================================================

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

    // Textsuche
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
   * Hole ein Spiel anhand der IGDB ID
   */
  export async function getGameByIGDBId(igdbId: number): Promise<Game | null> {
    return prisma.game.findUnique({
      where: { igdbId }
    });
  }

  /**
   * Finde oder erstelle ein Spiel basierend auf dem Namen
   * Verwendet IGDB zur Datenbeschaffung wenn das Spiel nicht existiert
   */
  export async function findOrCreateGame(
    gameName: string,
    platformName?: string
  ): Promise<GameImportResult> {
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

      // Suche in IGDB und erstelle Spiel direkt
      const igdbGameData = await IGDBService.searchAndConvertGame(
        gameName,
        platformName
      );
      if (!igdbGameData) {
        // Erstelle minimales Spiel ohne IGDB-Daten
        const newGame = await createMinimalGame(gameName);
        return {
          success: true,
          game: newGame,
          isNew: true,
          message: 'Spiel ohne IGDB-Daten erstellt'
        };
      }

      // Prüfe ob bereits ein Spiel mit dieser IGDB-ID existiert
      const existingByIGDB = await getGameByIGDBId(igdbGameData.id);
      if (existingByIGDB) {
        return {
          success: true,
          game: existingByIGDB,
          isNew: false,
          message: 'Spiel mit IGDB-ID bereits vorhanden'
        };
      }

      // Erstelle neues Spiel mit IGDB-Daten
      const newGame = await createGameFromIGDBData(igdbGameData);

      return {
        success: true,
        game: newGame,
        isNew: true,
        message: 'Spiel mit IGDB-Daten erstellt'
      };
    } catch (error) {
      console.error('Fehler beim Finden/Erstellen des Spiels:', error);
      const message =
        error instanceof Error ? error.message : 'Unbekannter Fehler';
      throw new Error(`Spiel konnte nicht importiert werden: ${message}`);
    }
  }

  /**
   * Aktualisiere ein Spiel mit neuen IGDB-Daten
   */
  export async function updateGameWithIGDB(
    gameId: number,
    gameName: string,
    platformName?: string
  ): Promise<Game> {
    const igdbGameData = await IGDBService.searchAndConvertGame(
      gameName,
      platformName
    );
    if (!igdbGameData) {
      throw new Error('IGDB-Spiel nicht gefunden');
    }

    return prisma.game.update({
      where: { id: gameId },
      data: {
        igdbId: igdbGameData.id,
        name: igdbGameData.name,
        summary: igdbGameData.summary,
        firstReleaseDate: igdbGameData.firstReleaseDate,
        totalRating: igdbGameData.totalRating,
        coverUrl: igdbGameData.coverUrl,
        screenshots: igdbGameData.screenshotUrls || [],
        genres: igdbGameData.genres || [],
        developers: igdbGameData.developers || [],
        publishers: igdbGameData.publishers || [],
        lastSyncedAt: new Date()
      }
    });
  }

  /**
   * Erstelle oder aktualisiere ein Spiel mit IGDB-Daten
   * Für Batch-Import von IGDB-Spielen optimiert
   */
  export async function createOrUpdateGameFromIGDB(
    igdbData: IGDBGameData
  ): Promise<GameImportResult> {
    try {
      // Prüfe ob bereits ein Spiel mit dieser IGDB-ID existiert
      const existingGame = await getGameByIGDBId(igdbData.id);

      if (existingGame) {
        // Aktualisiere bestehendes Spiel
        const updatedGame = await prisma.game.update({
          where: { id: existingGame.id },
          data: {
            name: igdbData.name,
            summary: igdbData.summary,
            firstReleaseDate: igdbData.firstReleaseDate,
            totalRating: igdbData.totalRating,
            coverUrl: igdbData.coverUrl,
            screenshots: igdbData.screenshotUrls || [],
            genres: igdbData.genres || [],
            developers: igdbData.developers || [],
            publishers: igdbData.publishers || [],
            lastSyncedAt: new Date(),
            updatedAt: new Date()
          }
        });

        return {
          success: true,
          game: updatedGame,
          isNew: false,
          message: 'Spiel aktualisiert'
        };
      }

      // Erstelle neues Spiel
      const newGame = await createGameFromIGDBData(igdbData);

      return {
        success: true,
        game: newGame,
        isNew: true,
        message: 'Spiel erstellt'
      };
    } catch (error) {
      console.error('Fehler beim Erstellen/Aktualisieren des Spiels:', error);
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
    platformName?: string,
    playtimeMinutes?: number
  ): Promise<UserGameWithDetails> {
    // Finde oder erstelle das Spiel
    const importResult = await findOrCreateGame(gameName, platformName);

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
   * Steam-Bibliothek importieren - erstellt nur UserGames
   * Spiele werden über IGDB gefunden/erstellt falls sie nicht existieren
   */
  export async function importSteamLibrary(
    userId: number,
    steamInput: string,
    operationId?: string
  ): Promise<{
    success: boolean;
    imported: number;
    updated: number;
    skipped: number;
    errors: string[];
  }> {
    // TODO: Steam-API-Integration um aus steamInput Steam-Spiele zu holen
    console.log(
      `Steam import for user ${userId} with input: ${steamInput}, operation: ${operationId}`
    );

    // Platzhalter für Steam-Spiele (normalerweise würde hier Steam Web API aufgerufen)
    const steamGames: Array<{
      appId: number;
      name: string;
      playtimeMinutes: number;
      lastPlayed?: Date;
    }> = [];

    const result = {
      success: true,
      imported: 0,
      updated: 0,
      skipped: 0,
      errors: [] as string[]
    };

    for (const steamGame of steamGames) {
      try {
        // Finde oder erstelle das Game
        const gameResult = await findOrCreateGame(steamGame.name, 'Steam');

        if (!gameResult.success) {
          result.errors.push(
            `Fehler bei Spiel "${steamGame.name}": ${gameResult.message}`
          );
          continue;
        }

        // Prüfe ob UserGame bereits existiert
        const existingUserGame = await prisma.userGame.findFirst({
          where: {
            userId,
            gameId: gameResult.game.id
          }
        });

        if (existingUserGame) {
          // Aktualisiere bestehendes UserGame
          await prisma.userGame.update({
            where: { id: existingUserGame.id },
            data: {
              playtimeMinutes: steamGame.playtimeMinutes,
              lastPlayed: steamGame.lastPlayed
            }
          });
          result.updated++;
          continue;
        }

        // Erstelle UserGame
        await prisma.userGame.create({
          data: {
            userId,
            gameId: gameResult.game.id,
            playtimeMinutes: steamGame.playtimeMinutes,
            lastPlayed: steamGame.lastPlayed,
            isInstalled: false,
            isFavorite: false
          }
        });

        result.imported++;
      } catch (error) {
        const errorMsg = `Fehler beim Importieren von "${steamGame.name}": ${error}`;
        result.errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    return result;
  }

  /**
   * Steam-Bibliothek schnell importieren (ohne IGDB-Anreicherung)
   */
  export async function importSteamLibraryFast(
    userId: number,
    steamInput: string,
    operationId?: string
  ): Promise<{
    success: boolean;
    imported: number;
    updated: number;
    skipped: number;
    errors: string[];
  }> {
    // TODO: Implementierung für schnellen Steam-Import ohne IGDB
    console.log(
      `Fast Steam import for user ${userId} with input: ${steamInput}`
    );

    return {
      success: true,
      imported: 0,
      updated: 0,
      skipped: 0,
      errors: []
    };
  }

  /**
   * Hintergrund-IGDB-Anreicherung für importierte Spiele
   */
  export async function enrichGamesBackground(
    platformSlug: string,
    operationId?: string
  ): Promise<{
    success: boolean;
    enriched: number;
    errors: string[];
  }> {
    // TODO: Implementierung für Hintergrund-Anreicherung
    console.log(`Background enrichment for platform: ${platformSlug}`);

    return {
      success: true,
      enriched: 0,
      errors: []
    };
  }

  // ============================================================================
  // HILFSFUNKTIONEN (INTERN)
  // ============================================================================

  /**
   * Finde Spiel anhand des Namens (fuzzy search)
   */
  async function findGameByName(gameName: string): Promise<Game | null> {
    // Zuerst exakte Suche
    const exactMatch = await prisma.game.findFirst({
      where: { name: { equals: gameName, mode: 'insensitive' } }
    });

    if (exactMatch) return exactMatch;

    // Dann fuzzy search
    const fuzzyMatch = await prisma.game.findFirst({
      where: { name: { contains: gameName, mode: 'insensitive' } }
    });

    return fuzzyMatch;
  }

  /**
   * Erstelle minimales Spiel ohne IGDB-Daten
   */
  async function createMinimalGame(gameName: string): Promise<Game> {
    return prisma.game.create({
      data: {
        name: gameName,
        slug: gameName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }

  /**
   * Erstelle Spiel aus IGDB-Daten
   */
  async function createGameFromIGDBData(igdbData: IGDBGameData): Promise<Game> {
    return prisma.game.create({
      data: {
        igdbId: igdbData.id,
        name: igdbData.name,
        slug: igdbData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        summary: igdbData.summary,
        firstReleaseDate: igdbData.firstReleaseDate,
        coverUrl: igdbData.coverUrl,
        screenshots: igdbData.screenshotUrls || [],
        totalRating: igdbData.totalRating,
        genres: igdbData.genres || [],
        developers: igdbData.developers || [],
        publishers: igdbData.publishers || [],
        lastSyncedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  }
}
