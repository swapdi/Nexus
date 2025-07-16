/**
 * Composable für Benutzer-Statistiken und Level-System
 * Grund: Komplexe Berechnungslogik aus UserService in wiederverwendbares Composable auslagern
 */
export interface UserStatsCalculation {
  totalGames: number;
  totalPlaytimeHours: number;
}

export const useUserStats = () => {
  /**
   * Berechne Benutzer-Statistiken aus rohen Daten
   */
  const calculateUserStats = (userData: {
    userGames: Array<{ playtimeMinutes: number | null; isFavorite?: boolean }>;
  }): UserStatsCalculation => {
    // Gesamtspielzeit in Stunden berechnen
    const totalPlaytimeMinutes = userData.userGames.reduce(
      (sum, game) => sum + (game.playtimeMinutes || 0),
      0
    );
    const totalPlaytimeHours = Math.floor(totalPlaytimeMinutes / 60);

    return {
      totalGames: userData.userGames.length,
      totalPlaytimeHours
    };
  };

  /**
   * Formatiere Spielzeit für Anzeige
   */
  const formatPlaytime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} Min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours < 24) {
      return remainingMinutes > 0
        ? `${hours}h ${remainingMinutes}m`
        : `${hours}h`;
    }
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
  };

  return {
    calculateUserStats,
    formatPlaytime
  };
};
