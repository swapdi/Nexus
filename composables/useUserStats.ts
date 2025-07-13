/**
 * Composable für Benutzer-Statistiken und Level-System
 * Grund: Komplexe Berechnungslogik aus UserService in wiederverwendbares Composable auslagern
 */
export interface UserStatsCalculation {
  totalGames: number;
  totalPlaytimeHours: number;
  totalAchievements: number;
  currentLevel: number;
  currentXP: number;
  credits: number;
}
export interface LevelCalculationResult {
  newLevel: number;
  newXP: number;
  levelUp: boolean;
  levelsGained: number;
}
export interface CreditsValidationResult {
  isValid: boolean;
  newCreditsAmount: number;
  error?: string;
}
export const useUserStats = () => {
  /**
   * Berechne Benutzer-Statistiken aus rohen Daten
   */
  const calculateUserStats = (userData: {
    userGames: Array<{ playtimeMinutes: number | null }>;
    userAchievements: Array<any>;
    level: number;
    xp: number;
    credits: number;
  }): UserStatsCalculation => {
    // Gesamtspielzeit in Stunden berechnen
    const totalPlaytimeMinutes = userData.userGames.reduce(
      (sum, game) => sum + (game.playtimeMinutes || 0),
      0
    );
    const totalPlaytimeHours = Math.floor(totalPlaytimeMinutes / 60);
    return {
      totalGames: userData.userGames.length,
      totalPlaytimeHours,
      totalAchievements: userData.userAchievements.length,
      currentLevel: userData.level,
      currentXP: userData.xp,
      credits: userData.credits
    };
  };
  /**
   * Berechne neuen Level basierend auf XP
   * Grund: Level-Berechnungslogik zentralisieren und testbar machen
   */
  const calculateLevelFromXP = (
    currentXP: number,
    additionalXP: number,
    currentLevel: number
  ): LevelCalculationResult => {
    const newXP = currentXP + additionalXP;
    const newLevel = Math.floor(newXP / 1000) + 1; // 1000 XP pro Level
    const levelUp = newLevel > currentLevel;
    const levelsGained = newLevel - currentLevel;
    return {
      newLevel,
      newXP,
      levelUp,
      levelsGained
    };
  };
  /**
   * Validiere Credits-Transaktion
   * Grund: Credits-Validierungslogik aus Service extrahieren
   */
  const validateCreditsTransaction = (
    currentCredits: number,
    creditsChange: number
  ): CreditsValidationResult => {
    const newCreditsAmount = currentCredits + creditsChange;
    if (newCreditsAmount < 0) {
      return {
        isValid: false,
        newCreditsAmount: currentCredits,
        error: 'Nicht genügend Credits verfügbar'
      };
    }
    return {
      isValid: true,
      newCreditsAmount
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
  /**
   * Berechne XP-Belohnung basierend auf Aktion
   */
  const calculateXPReward = (
    action: 'game_import' | 'achievement' | 'review' | 'custom',
    amount?: number
  ): number => {
    const xpRewards = {
      game_import: 10, // Pro importiertem Spiel
      achievement: 50, // Pro freigeschaltetem Achievement
      review: 25, // Pro geschriebener Bewertung
      custom: amount || 0 // Benutzerdefiniert
    };
    return xpRewards[action];
  };
  return {
    calculateUserStats,
    calculateLevelFromXP,
    validateCreditsTransaction,
    formatPlaytime,
    calculateXPReward
  };
};
