/**
 * Composable für Benutzer-Statistiken und Level-System
 * Grund: Komplexe Berechnungslogik aus UserService in wiederverwendbares Composable auslagern
 */

export const useUserStats = () => {
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
    formatPlaytime
  };
};
