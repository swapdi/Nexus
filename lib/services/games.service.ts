import { PrismaClient, type Game } from '~/prisma/client';
import { IGDBService } from './igdb.service';

import type {
  GameImportResult,
  GameSearchOptions,
  IGDBGameData,
  UserGameWithDetails
} from '~/types';
const prisma = new PrismaClient();

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
      // Fokus nur auf den Titel des Spiels für die Suche
      where.name = { contains: searchTerm, mode: 'insensitive' };
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
   */ export async function findOrCreateGameWithIGDBRelevance(
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
      // Grund: Nutze die zentrale IGDB-Funktion mit integrierter dynamischer Suche
      const igdbGameData: IGDBGameData | null =
        await IGDBService.findGameByTitle(gameName);
      if (!igdbGameData) {
        return undefined;
      }
      // Prüfe ob das Spiel bereits mit IGDB-ID existiert
      const existingByIGDB = await prisma.game.findUnique({
        where: { igdbId: igdbGameData.id }
      });
      if (existingByIGDB) {
        return {
          success: true,
          game: existingByIGDB,
          isNew: false,
          message: `Spiel mit IGDB-ID bereits vorhanden`
        };
      }
      // Erstelle neues Spiel mit IGDB-Daten
      const newGame = await createGameFromIGDB(igdbGameData);
      return {
        success: true,
        game: newGame,
        isNew: true,
        message: `Spiel erstellt mit IGDB-Daten (ID: ${igdbGameData.id})`
      };
    } catch (error) {
      console.error('Error in findOrCreateGameWithIGDBRelevance:', error);
      throw new Error(
        `Failed to find or create game: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  export async function createGameFromIGDB(
    gameData: IGDBGameData
  ): Promise<Game> {
    // Prüfe ob das Spiel bereits mit IGDB-ID existiert
    const existingGame = await prisma.game.findUnique({
      where: { igdbId: gameData.id }
    });
    if (existingGame) {
      return existingGame;
    }
    // Erstelle neues Spiel mit IGDB-Daten
    const newGame = await prisma.game.create({
      data: {
        igdbId: gameData.id,
        name: gameData.name,
        slug: gameData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        summary: gameData.summary,
        firstReleaseDate: gameData.firstReleaseDate,
        coverUrl: gameData.coverUrl,
        screenshots: gameData.screenshotUrls || [],
        videos: gameData.videoUrls || [],
        totalRating: gameData.totalRating,
        genres: gameData.genres || [],
        developers: gameData.developers || [],
        publishers: gameData.publishers || [],
        lastSyncedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    return newGame;
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
      notes?: string | null; // Erlaubt explizit null für Löschen
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

  export async function findGameByName(gameName: string): Promise<Game | null> {
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
    const normalizedSearchTitles = generateSimpleVariants(normalizedName);
    if (normalizedSearchTitles.length > 0) {
      const allGames = await prisma.game.findMany({
        select: { id: true, name: true, slug: true }
      });
      for (const game of allGames) {
        const normalizedGameTitles = generateSimpleVariants(game.name);
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
  // Hilfsfunktion für lokale DB-Suchen (vereinfacht)
  const generateSimpleVariants = (title: string): string[] => {
    const variants: string[] = [];
    const cleanedTitle = title.trim();
    if (!cleanedTitle) return [];
    variants.push(cleanedTitle);
    // Entferne Wörter von rechts
    const words = cleanedTitle.split(/\s+/);
    while (words.length > 1) {
      words.pop();
      const shortened = words.join(' ').trim();
      if (shortened.length >= 2) {
        variants.push(shortened);
      }
    }
    return [...new Set(variants)];
  };
}
