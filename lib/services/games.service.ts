import { PrismaClient } from '~/prisma/client';
import { IGDBService } from './igdb.service';
const prisma = new PrismaClient();

export namespace GamesService {
  /**
   * Suche nach Spielen in der zentralen Datenbank
   */
  export async function searchGames(options: GameSearchOptions = {}): Promise<{
    games: PrismaGame[];
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
  export async function getGameById(id: number): Promise<PrismaGame | null> {
    return prisma.game.findUnique({
      where: { id }
    });
  }

  /**
   * Suche nach ähnlichen Spielen in der lokalen Datenbank
   * Verwendet String-Ähnlichkeitsalgorithmen zur besseren Zuordnung
   */
  export async function findSimilarGameInDatabase(
    gameName: string
  ): Promise<PrismaGame | null> {
    try {
      // Hole alle Spiele aus der DB (mit Limit für Performance)
      const allGames = await prisma.game.findMany({
        take: 10000 // Limit für Performance
      });

      if (allGames.length === 0) {
        return null;
      }

      const normalizedSearchName = normalizeGameTitle(gameName);
      let bestMatch: PrismaGame | null = null;
      let bestScore = 0;
      const minScore = 0.7; // Mindest-Ähnlichkeit für lokale DB

      for (const game of allGames) {
        const normalizedGameName = normalizeGameTitle(game.name);

        // Verschiedene Ähnlichkeits-Checks
        let score = 0;

        // Exakte Übereinstimmung (sollte nicht vorkommen, da schon gecheckt)
        if (normalizedGameName === normalizedSearchName) {
          score = 1.0;
        }
        // Beginnt mit oder enthält
        else if (
          normalizedGameName.startsWith(normalizedSearchName) ||
          normalizedSearchName.startsWith(normalizedGameName)
        ) {
          score = 0.9;
        } else if (
          normalizedGameName.includes(normalizedSearchName) ||
          normalizedSearchName.includes(normalizedGameName)
        ) {
          score = 0.8;
        } else {
          // Verwende die gleiche String-Ähnlichkeit wie IGDB
          score = calculateLocalStringSimilarity(
            normalizedSearchName,
            normalizedGameName
          );
        }

        // Edition-spezifische Behandlung
        score = adjustScoreForEditions(gameName, game.name, score);

        if (score > bestScore && score >= minScore) {
          bestScore = score;
          bestMatch = game;
        }
      }

      if (bestMatch && bestScore >= minScore) {
        console.log(
          `🎯 Lokale DB Ähnlichkeit: "${gameName}" -> "${
            bestMatch.name
          }" (Score: ${bestScore.toFixed(2)})`
        );
        return bestMatch;
      }

      return null;
    } catch (error) {
      console.error('Fehler bei findSimilarGameInDatabase:', error);
      return null;
    }
  }

  /**
   * Normalisiert Spieltitel für lokale Vergleiche
   */
  function normalizeGameTitle(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[™®©]/g, '')
      .replace(/['']/g, "'")
      .replace(/[""]/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Berechnet String-Ähnlichkeit für lokale DB-Suche
   */
  function calculateLocalStringSimilarity(
    query: string,
    target: string
  ): number {
    const queryWords = query.split(/\s+/).filter(w => w.length > 0);
    const targetWords = target.split(/\s+/).filter(w => w.length > 0);

    if (queryWords.length === 0 || targetWords.length === 0) return 0;

    let totalMatches = 0;

    for (const queryWord of queryWords) {
      let bestWordMatch = 0;

      for (const targetWord of targetWords) {
        let wordScore = 0;

        if (queryWord === targetWord) {
          wordScore = 1.0;
        } else if (
          queryWord.includes(targetWord) ||
          targetWord.includes(queryWord)
        ) {
          const longer =
            queryWord.length > targetWord.length ? queryWord : targetWord;
          const shorter =
            queryWord.length <= targetWord.length ? queryWord : targetWord;
          wordScore = shorter.length / longer.length;
        } else if (queryWord.length >= 3 && targetWord.length >= 3) {
          const distance = levenshteinDistance(queryWord, targetWord);
          const maxLen = Math.max(queryWord.length, targetWord.length);
          const similarity = 1 - distance / maxLen;
          if (similarity >= 0.8) {
            wordScore = similarity;
          }
        }

        if (wordScore > bestWordMatch) {
          bestWordMatch = wordScore;
        }
      }

      totalMatches += bestWordMatch;
    }

    const avgWordMatch = totalMatches / queryWords.length;
    const wordCountPenalty =
      Math.abs(queryWords.length - targetWords.length) /
      Math.max(queryWords.length, targetWords.length);

    return Math.max(0, avgWordMatch - wordCountPenalty * 0.2);
  }

  /**
   * Levenshtein-Distanz für lokale String-Vergleiche
   */
  function levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  }

  /**
   * Passt den Score für Edition-spezifische Fälle an
   * Z.B. "Cyberpunk 2077: Ultimate Edition" vs "Cyberpunk 2077"
   */
  function adjustScoreForEditions(
    searchName: string,
    dbName: string,
    currentScore: number
  ): number {
    const editionKeywords = [
      'Gold',
      'Deluxe',
      'Ultimate',
      'Complete',
      'GOTY',
      'Premium',
      'Special',
      'Enhanced',
      'Definitive',
      'Remastered',
      'HD',
      "Director's Cut",
      'Game of the Year',
      "Collector's",
      'Digital',
      'Edition'
    ];

    const searchNormalized = normalizeGameTitle(searchName);
    const dbNormalized = normalizeGameTitle(dbName);

    // Entferne Edition-Keywords aus beiden Titeln
    let searchBase = searchNormalized;
    let dbBase = dbNormalized;

    editionKeywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      searchBase = searchBase
        .replace(new RegExp(`\\s*${keywordLower}\\s*(edition)?`, 'gi'), '')
        .trim();
      dbBase = dbBase
        .replace(new RegExp(`\\s*${keywordLower}\\s*(edition)?`, 'gi'), '')
        .trim();
    });

    // Wenn die Basis-Titel identisch sind, sehr hoher Score
    if (searchBase === dbBase && searchBase.length >= 3) {
      return Math.max(currentScore, 0.95);
    }

    // Wenn einer den anderen enthält, guter Score
    if (
      (searchBase.includes(dbBase) || dbBase.includes(searchBase)) &&
      Math.min(searchBase.length, dbBase.length) >= 3
    ) {
      return Math.max(currentScore, 0.85);
    }

    return currentScore;
  }

  /**
   * Verbesserte IGDB-Suche basierend auf Relevanz, Popularität und Erscheinungsjahr
   * Grund: Wie IGDB-Webseite - nimmt das relevanteste erste Ergebnis
   * Mit Fallback-Strategien für bereinigte Titel
   */ export async function findOrCreateGameWithIGDBRelevance(
    gameName: string
  ): Promise<GameImportResult | undefined> {
    try {
      // Schritt 1: Prüfe exakte Übereinstimmung in lokaler Datenbank
      const exactMatch = await findGameByName(gameName);
      if (exactMatch) {
        console.log(
          `✅ Exakte Übereinstimmung gefunden: "${gameName}" -> "${exactMatch.name}"`
        );
        return {
          success: true,
          game: exactMatch,
          isNew: false,
          message: 'Spiel bereits in der Datenbank (exakte Übereinstimmung)'
        };
      }

      // Schritt 2: Prüfe ähnliche Spiele in lokaler Datenbank
      const similarGame = await findSimilarGameInDatabase(gameName);
      if (similarGame) {
        console.log(
          `✅ Ähnliches Spiel in DB gefunden: "${gameName}" -> "${similarGame.name}"`
        );
        return {
          success: true,
          game: similarGame,
          isNew: false,
          message: `Ähnliches Spiel in DB gefunden: "${similarGame.name}"`
        };
      }

      // Schritt 3: Suche in IGDB API
      console.log(`🔍 Suche in IGDB für: "${gameName}"`);
      const igdbGameData: IGDBGameData | null =
        await IGDBService.findGameByTitle(gameName);
      if (!igdbGameData) {
        console.log(`❌ Kein IGDB-Ergebnis für: "${gameName}"`);
        return undefined;
      }

      // Schritt 4: Prüfe ob das IGDB-Spiel bereits in der DB ist
      const existingByIGDB = await prisma.game.findUnique({
        where: { igdbId: igdbGameData.id }
      });
      if (existingByIGDB) {
        console.log(
          `✅ IGDB-Spiel bereits in DB: "${gameName}" -> "${existingByIGDB.name}" (IGDB ID: ${igdbGameData.id})`
        );
        return {
          success: true,
          game: existingByIGDB,
          isNew: false,
          message: `Spiel mit IGDB-ID bereits vorhanden: "${existingByIGDB.name}"`
        };
      }

      // Schritt 5: Erstelle neues Spiel mit IGDB-Daten
      console.log(
        `➕ Erstelle neues Spiel: "${gameName}" -> "${igdbGameData.name}"`
      );
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
  ): Promise<PrismaGame> {
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
        storyline: gameData.storyline,
        firstReleaseDate: gameData.firstReleaseDate,
        coverUrl: gameData.coverUrl,
        screenshots: gameData.screenshotUrls || [],
        videos: gameData.videoUrls || [],
        websites: gameData.websites
          ? JSON.parse(JSON.stringify(gameData.websites))
          : null,
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

  export async function findGameByName(
    gameName: string
  ): Promise<PrismaGame | null> {
    const normalizedName = gameName.trim();

    // Nur exakte Suche (case-insensitive) - keine Fuzzy-Suche!
    const exactMatch = await prisma.game.findFirst({
      where: { name: { equals: normalizedName, mode: 'insensitive' } }
    });

    return exactMatch;
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
