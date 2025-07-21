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
    return name.includes(term);
  };

  return {
    formatPlaytime,
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
