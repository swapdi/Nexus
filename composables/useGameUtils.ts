/**
 * Composable für Game-bezogene Utility-Funktionen
 * Grund: Datenverarbeitung und Berechnungen aus Services extrahiert
 */

// ============================================================================
// TYPES
// ============================================================================

export interface GameData {
  // IGDB Fields
  id?: number;
  name: string;
  summary?: string;
  developers?: string[];
  publishers?: string[];
  firstReleaseDate?: Date | string;
  totalRating?: number;
  coverUrl?: string;
  screenshots?: string[];
  genres?: string[];
  themes?: string[];
  gameModes?: string[];
  keywords?: string[];

  // Common Fields
  platforms?: string[];
  isFavorite?: boolean;
  playtimeMinutes?: number;
}

export interface GameStats {
  totalGames: number;
  totalPlaytimeHours: number;
  averageRating: number;
  topGenres: Array<{ genre: string; count: number }>;
  platformDistribution: Record<string, number>;
  completionStats: {
    completed: number;
    inProgress: number;
    notStarted: number;
  };
}

export interface PlatformStats {
  name: string;
  gameCount: number;
  totalPlaytime: number;
  averagePlaytime: number;
  topGames: Array<{
    name: string;
    playtime: number;
  }>;
}

export const useGameUtils = () => {
  /**
   * Konvertiert Minuten in lesbare Stunden/Minuten-Darstellung
   */
  const formatPlaytime = (minutes: number): string => {
    if (minutes === 0) return '0 Minuten';

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} Min`;
    }

    if (remainingMinutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${remainingMinutes}m`;
  };

  // ============================================================================
  // IGDB GAME DATA FUNCTIONS
  // ============================================================================

  /**
   * Hole den Spielnamen
   */
  const getGameName = (game: GameData): string => {
    return game.name || 'Unbekanntes Spiel';
  };

  /**
   * Hole die Spielbeschreibung
   */
  const getGameDescription = (game: GameData): string | null => {
    return game.summary || null;
  };

  /**
   * Hole den Hauptentwickler
   */
  const getGameDeveloper = (game: GameData): string | null => {
    if (game.developers && game.developers.length > 0) {
      return game.developers[0];
    }
    return null;
  };

  /**
   * Hole alle Entwickler als Array
   */
  const getGameDevelopers = (game: GameData): string[] => {
    return game.developers || [];
  };

  /**
   * Hole den Hauptpublisher
   */
  const getGamePublisher = (game: GameData): string | null => {
    if (game.publishers && game.publishers.length > 0) {
      return game.publishers[0];
    }
    return null;
  };

  /**
   * Hole alle Publisher als Array
   */
  const getGamePublishers = (game: GameData): string[] => {
    return game.publishers || [];
  };

  /**
   * Hole das Veröffentlichungsdatum
   */
  const getGameReleaseDate = (game: GameData): Date | null => {
    const date = game.firstReleaseDate;
    if (!date) return null;
    return date instanceof Date ? date : new Date(date);
  };

  /**
   * Hole die Bewertung
   */
  const getGameRating = (game: GameData): number | null => {
    return game.totalRating || null;
  };

  /**
   * Hole das Cover-Bild (mit Fallback)
   */
  const getGameCoverUrl = (game: GameData): string => {
    return game.coverUrl || './gameplaceholder.jpg';
  };

  /**
   * Hole die Genres als Array
   */
  const getGameGenres = (game: GameData): string[] => {
    return game.genres || [];
  };

  /**
   * Formatiere die Bewertung für die Anzeige
   */
  const formatGameRating = (game: GameData): string => {
    const rating = getGameRating(game);
    if (!rating) return 'N/A';
    return rating.toFixed(1);
  };

  /**
   * Formatiere Genres als String
   */
  const formatGameGenres = (game: GameData, maxGenres: number = 3): string => {
    const genres = getGameGenres(game);
    if (genres.length === 0) return 'Unbekannt';

    if (genres.length <= maxGenres) {
      return genres.join(', ');
    }

    return `${genres.slice(0, maxGenres).join(', ')} +${
      genres.length - maxGenres
    }`;
  };

  /**
   * Prüfe ob ein Spiel dem Suchbegriff entspricht
   */
  const gameMatchesSearch = (game: GameData, searchTerm: string): boolean => {
    const term = searchTerm.toLowerCase();
    const name = getGameName(game).toLowerCase();
    const description = getGameDescription(game)?.toLowerCase() || '';
    const developer = getGameDeveloper(game)?.toLowerCase() || '';
    const genres = getGameGenres(game)
      .map(g => g.toLowerCase())
      .join(' ');

    return (
      name.includes(term) ||
      description.includes(term) ||
      developer.includes(term) ||
      genres.includes(term)
    );
  };

  /**
   * Berechnet Spielzeit-Kategorien
   */
  const categorizePlaytime = (
    minutes: number
  ): 'not-played' | 'short' | 'medium' | 'long' | 'marathon' => {
    if (minutes === 0) return 'not-played';
    if (minutes < 120) return 'short'; // < 2 Stunden
    if (minutes < 600) return 'medium'; // < 10 Stunden
    if (minutes < 3000) return 'long'; // < 50 Stunden
    return 'marathon'; // 50+ Stunden
  };

  /**
   * Generiert Cover-URL für Steam-Spiele
   */
  const generateSteamCoverUrl = (
    appId: number,
    size: 'small' | 'medium' | 'large' = 'medium'
  ): string => {
    const sizeMap = {
      small: '184x69', // Header capsule
      medium: '300x300', // Library capsule
      large: '600x900' // Portrait
    };

    return `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/library_${sizeMap[size]}.jpg`;
  };

  /**
   * Normalisiert Spieltitel für Vergleiche
   */
  const normalizeTitle = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[™®©]/g, '')
      .replace(/[:\-–—]/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\b(the|a|an)\b/g, '')
      .replace(
        /\b(edition|deluxe|goty|complete|ultimate|remastered|definitive)\b/g,
        ''
      )
      .trim();
  };

  /**
   * Extrahiert Genre-Statistiken
   */
  const calculateGenreStats = (
    games: Array<{ genres: string[] }>
  ): Array<{ genre: string; count: number; percentage: number }> => {
    const genreCounts = new Map<string, number>();

    games.forEach(game => {
      game.genres.forEach(genre => {
        genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
      });
    });

    const totalGames = games.length;
    const result = Array.from(genreCounts.entries())
      .map(([genre, count]) => ({
        genre,
        count,
        percentage: Math.round((count / totalGames) * 100)
      }))
      .sort((a, b) => b.count - a.count);

    return result;
  };

  /**
   * Berechnet Plattform-Verteilung
   */
  const calculatePlatformDistribution = (
    games: Array<{ platforms: string[] }>
  ): Record<string, number> => {
    const platformCounts: Record<string, number> = {};

    games.forEach(game => {
      game.platforms.forEach(platform => {
        platformCounts[platform] = (platformCounts[platform] || 0) + 1;
      });
    });

    return platformCounts;
  };

  /**
   * Findet ähnliche Spiele basierend auf Genres
   */
  const findSimilarGames = (
    targetGame: { genres: string[] },
    allGames: Array<{ id: number; name: string; genres: string[] }>,
    limit: number = 5
  ): Array<{ id: number; name: string; similarity: number }> => {
    const targetGenres = new Set(targetGame.genres);

    const similarities = allGames
      .map(game => {
        const gameGenres = new Set(game.genres);
        const intersection = new Set(
          [...targetGenres].filter(x => gameGenres.has(x))
        );
        const union = new Set([...targetGenres, ...gameGenres]);

        const similarity = intersection.size / union.size;

        return {
          id: game.id,
          name: game.name,
          similarity
        };
      })
      .filter(item => item.similarity > 0)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);

    return similarities;
  };

  /**
   * Berechnet Spiel-Bewertungsklassen
   */
  const calculateRatingClass = (
    rating: number | null
  ): 'excellent' | 'good' | 'average' | 'poor' | 'unrated' => {
    if (rating === null) return 'unrated';

    if (rating >= 90) return 'excellent';
    if (rating >= 75) return 'good';
    if (rating >= 60) return 'average';
    return 'poor';
  };

  /**
   * Formatiert Veröffentlichungsdatum
   */
  const formatReleaseDate = (date: Date | string | null): string => {
    if (!date) return 'Unbekannt';

    const releaseDate = new Date(date);
    if (isNaN(releaseDate.getTime())) return 'Unbekannt';

    return releaseDate.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * Berechnet "Zeit seit letztem Spiel"
   */
  const calculateTimeSinceLastPlayed = (lastPlayed: Date | null): string => {
    if (!lastPlayed) return 'Nie gespielt';

    const now = new Date();
    const diffMs = now.getTime() - new Date(lastPlayed).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Heute';
    if (diffDays === 1) return 'Gestern';
    if (diffDays < 7) return `Vor ${diffDays} Tagen`;
    if (diffDays < 30) return `Vor ${Math.floor(diffDays / 7)} Wochen`;
    if (diffDays < 365) return `Vor ${Math.floor(diffDays / 30)} Monaten`;

    return `Vor ${Math.floor(diffDays / 365)} Jahren`;
  };

  /**
   * Sortiert Spiele nach verschiedenen Kriterien
   */
  const sortGames = <
    T extends {
      name: string;
      playtimeMinutes?: number;
      lastPlayed?: Date | null;
      addedAt?: Date;
    }
  >(
    games: T[],
    sortBy: 'name' | 'playtime' | 'recent' | 'added'
  ): T[] => {
    const sorted = [...games];

    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));

      case 'playtime':
        return sorted.sort(
          (a, b) => (b.playtimeMinutes || 0) - (a.playtimeMinutes || 0)
        );

      case 'recent':
        return sorted.sort((a, b) => {
          const aTime = a.lastPlayed ? new Date(a.lastPlayed).getTime() : 0;
          const bTime = b.lastPlayed ? new Date(b.lastPlayed).getTime() : 0;
          return bTime - aTime;
        });

      case 'added':
        return sorted.sort((a, b) => {
          const aTime = a.addedAt ? new Date(a.addedAt).getTime() : 0;
          const bTime = b.addedAt ? new Date(b.addedAt).getTime() : 0;
          return bTime - aTime;
        });

      default:
        return sorted;
    }
  };

  /**
   * Generiert Spielestatistiken-Zusammenfassung
   */
  const generateGamesSummary = (
    games: Array<{
      name: string;
      genres: string[];
      platforms: string[];
      playtimeMinutes: number;
      totalRating: number | null;
      lastPlayed: Date | null;
    }>
  ): GameStats => {
    const totalGames = games.length;
    const totalPlaytimeMinutes = games.reduce(
      (sum, game) => sum + game.playtimeMinutes,
      0
    );
    const totalPlaytimeHours =
      Math.round((totalPlaytimeMinutes / 60) * 10) / 10;

    const ratedGames = games.filter(game => game.totalRating !== null);
    const averageRating =
      ratedGames.length > 0
        ? Math.round(
            ratedGames.reduce((sum, game) => sum + (game.totalRating || 0), 0) /
              ratedGames.length
          )
        : 0;

    const topGenres = calculateGenreStats(games).slice(0, 5);
    const platformDistribution = calculatePlatformDistribution(games);

    const completionStats = {
      completed: games.filter(game => game.playtimeMinutes > 600).length, // 10+ Stunden als "completed"
      inProgress: games.filter(
        game => game.playtimeMinutes > 0 && game.playtimeMinutes <= 600
      ).length,
      notStarted: games.filter(game => game.playtimeMinutes === 0).length
    };

    return {
      totalGames,
      totalPlaytimeHours,
      averageRating,
      topGenres,
      platformDistribution,
      completionStats
    };
  };

  /**
   * Berechne Plattform-Statistiken aus UserGames
   */
  const calculatePlatformStats = (
    userGames: Array<{
      game: {
        platformGames: Array<{
          platform: {
            name: string;
          };
        }>;
      };
    }>
  ): Record<string, number> => {
    return userGames.reduce((acc, userGame) => {
      userGame.game.platformGames.forEach(pg => {
        const platformName = pg.platform.name;
        if (!acc[platformName]) {
          acc[platformName] = 0;
        }
        acc[platformName]++;
      });
      return acc;
    }, {} as Record<string, number>);
  };

  return {
    formatPlaytime,
    categorizePlaytime,
    generateSteamCoverUrl,
    normalizeTitle,
    calculateGenreStats,
    calculatePlatformDistribution,
    findSimilarGames,
    calculateRatingClass,
    formatReleaseDate,
    calculateTimeSinceLastPlayed,
    sortGames,
    generateGamesSummary,
    calculatePlatformStats,
    // IGDB Game Data Funktionen
    getGameName,
    getGameDescription,
    getGameDeveloper,
    getGameDevelopers,
    getGamePublisher,
    getGamePublishers,
    getGameReleaseDate,
    getGameRating,
    getGameCoverUrl,
    getGameGenres,
    formatGameRating,
    formatGameGenres,
    gameMatchesSearch
  };
};
