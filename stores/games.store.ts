import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { UserGameWithDetails } from '~/lib/services/games.service';
import { useLoading } from '~/stores/loading.store';

export const useGamesStore = defineStore('games', () => {
  // Loading store integration
  const { loading } = useLoading();

  // State
  const games = ref<UserGameWithDetails[]>([]);
  const stats = ref<any | null>(null); // TODO: Define proper stats type
  const lastImportResult = ref<any | null>(null); // TODO: Define proper import result type
  const error = ref<string | null>(null);
  // Neue State für Auswahlmodus
  const isSelectionMode = ref(false);
  const selectedGameIds = ref<Set<number>>(new Set());
  const isRemovingGames = ref(false);

  // Getters
  const totalGames = computed(() => games.value.length);

  const gamesByPlatform = computed(() => {
    // Da die Game-Tabelle kein platforms-Feld hat, müssen wir die Plattform-Informationen
    // aus den PlatformGame-Relationen oder externen Daten beziehen
    // Für jetzt verwenden wir einen leeren Platzhalter
    const platformGroups: Record<string, UserGameWithDetails[]> = {};
    return platformGroups;
  });

  const availablePlatforms = computed(() => {
    // Platzhalter - wird implementiert wenn Plattform-Informationen verfügbar sind
    return [];
  });

  const recentlyPlayed = computed(() => {
    return games.value
      .filter(game => game.lastPlayed)
      .sort((a, b) => {
        if (!a.lastPlayed || !b.lastPlayed) return 0;
        return (
          new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime()
        );
      })
      .slice(0, 10);
  });

  const mostPlayed = computed(() => {
    return games.value
      .filter(game => game.playtimeMinutes && game.playtimeMinutes > 0)
      .sort((a, b) => (b.playtimeMinutes || 0) - (a.playtimeMinutes || 0))
      .slice(0, 10);
  });
  // Actions
  const loadGames = async () => {
    return await loading(
      'games-load',
      'Lade Spielebibliothek...',
      async () => {
        const { $client } = useNuxtApp();
        const notifyStore = useNotifyStore();
        try {
          error.value = null;
          const gamesData = await $client.games.getUserGames.query();
          games.value = gamesData;
        } catch (err: any) {
          error.value = err.message || 'Fehler beim Laden der Spiele';
          notifyStore.notify(error.value, 3);
          console.error('Fehler beim Laden der Spiele:', err);
          throw err;
        }
      },
      'data'
    );
  };
  const loadStats = async () => {
    return await loading(
      'games-stats',
      'Lade Spielstatistiken...',
      async () => {
        const { $client } = useNuxtApp();
        const notifyStore = useNotifyStore();

        try {
          const statsData = await $client.games.getUserStats.query();
          stats.value = statsData;
        } catch (err: any) {
          const errorMessage =
            err.message || 'Fehler beim Laden der Statistiken';
          notifyStore.notify(errorMessage, 3);
          console.error('Fehler beim Laden der Statistiken:', err);
          throw err;
        }
      },
      'data'
    );
  };
  const importSteamLibrary = async (
    steamInput: string
  ): Promise<any | null> => {
    // TODO: Define proper steam import return type
    return await loading(
      'steam-import',
      'Steam-Bibliothek importieren...',
      async () => {
        const { $client } = useNuxtApp();
        const notifyStore = useNotifyStore();

        try {
          error.value = null;

          const result = await $client.games.importSteamLibrary.mutate({
            steamInput: steamInput.trim()
          });

          lastImportResult.value = result;

          if (result.success) {
            // Detaillierte Erfolgsmeldung erstellen
            let message = 'Steam-Import abgeschlossen! ';
            if (result.imported > 0) {
              message += `${result.imported} neue Spiele importiert. `;
            }
            if (result.updated && result.updated > 0) {
              message += `${result.updated} Spiele aktualisiert. `;
            }
            if (result.skipped > 0) {
              message += `${result.skipped} bereits vorhandene Spiele übersprungen.`;
            }

            notifyStore.notify(message, 1);

            // Daten neu laden nach erfolgreichem Import
            await refreshData();
          }

          return result;
        } catch (err: any) {
          error.value = err.message || 'Fehler beim Steam-Import';
          notifyStore.notify(error.value, 3);
          console.error('Fehler beim Steam-Import:', err);
          throw err;
        }
      },
      'import'
    );
  };
  const refreshData = async () => {
    await Promise.all([loadGames(), loadStats()]);
  };

  // Funktionen für Auswahlmodus
  const toggleSelectionMode = () => {
    if (isSelectionMode.value) {
      exitSelectionMode();
    } else {
      enterSelectionMode();
    }
  };

  const enterSelectionMode = () => {
    isSelectionMode.value = true;
    selectedGameIds.value.clear();
  };

  const exitSelectionMode = () => {
    isSelectionMode.value = false;
    selectedGameIds.value.clear();
  };

  const toggleGameSelection = (gameId: number) => {
    if (selectedGameIds.value.has(gameId)) {
      selectedGameIds.value.delete(gameId);
    } else {
      selectedGameIds.value.add(gameId);
    }
  };

  const selectAllFilteredGames = (filteredGames: UserGameWithDetails[]) => {
    filteredGames.forEach(game => selectedGameIds.value.add(game.id));
  };

  const deselectAllGames = () => {
    selectedGameIds.value.clear();
  };
  const removeSelectedGames = async (): Promise<boolean> => {
    if (selectedGameIds.value.size === 0 || isRemovingGames.value) {
      return false;
    }

    return await loading(
      'remove-games',
      'Entferne Spiele aus der Bibliothek...',
      async () => {
        const { $client } = useNuxtApp();
        const notifyStore = useNotifyStore();

        try {
          isRemovingGames.value = true;
          const gameIdsArray = Array.from(selectedGameIds.value);

          const result = await $client.games.removeGamesFromLibrary.mutate({
            userGameIds: gameIdsArray
          });

          if (result.success) {
            // Erfolgreiche Entfernung
            const message = `${result.removedCount} Spiel${
              result.removedCount > 1 || 0 ? 'e' : ''
            } erfolgreich aus der Bibliothek entfernt.`;
            notifyStore.notify(message, 1);

            // Entfernte Spiele aus dem lokalen State entfernen
            games.value = games.value.filter(
              game => !gameIdsArray.includes(game.id)
            );

            // Statistiken neu berechnen
            await loadStats();

            // Auswahlmodus beenden
            exitSelectionMode();
            return true;
          }

          return false;
        } catch (err: any) {
          const errorMessage =
            err.message || 'Fehler beim Entfernen der Spiele';
          notifyStore.notify(errorMessage, 3);
          throw err;
        } finally {
          isRemovingGames.value = false;
        }
      },
      'process'
    );
  };
  const getGameById = (gameId: number) => {
    return games.value.find(game => game.id === gameId);
  };

  // Neue Funktion: Finde Spiel nach UserGame ID
  const getGameByUserGameId = (userGameId: number) => {
    return games.value.find(game => game.id === userGameId);
  };

  const getGameWithPlatforms = async (
    userGameId: number
  ): Promise<UserGameWithDetails | null> => {
    return await loading(
      'game-details',
      'Lade Spiel-Details...',
      async () => {
        const { $client } = useNuxtApp();
        const notifyStore = useNotifyStore();

        try {
          error.value = null;
          const gameData = await $client.games.getGameWithPlatforms.query({
            userGameId: userGameId
          });
          return gameData;
        } catch (err: any) {
          const errorMessage =
            err.message || 'Fehler beim Laden der Spiel-Details';
          notifyStore.notify(errorMessage, 3);
          console.error('Fehler beim Laden der Spiel-Details:', err);
          throw err;
        }
      },
      'data'
    );
  };

  const searchGames = (query: string) => {
    if (!query.trim()) return games.value;

    const searchTerm = query.toLowerCase().trim();
    return games.value.filter(
      game =>
        game.game.name.toLowerCase().includes(searchTerm) ||
        game.game.genres.some(genre => genre.toLowerCase().includes(searchTerm))
    );
  };

  const filterGamesByPlatform = (platform: string) => {
    if (platform === 'all') return games.value;
    // Plattform-Filtering wird implementiert wenn Plattform-Daten verfügbar sind
    return games.value;
  };

  const sortGames = (games: UserGameWithDetails[], sortBy: string) => {
    const gamesCopy = [...games];

    switch (sortBy) {
      case 'title':
        return gamesCopy.sort((a, b) => a.game.name.localeCompare(b.game.name));
      case 'lastPlayed':
        return gamesCopy.sort((a, b) => {
          if (!a.lastPlayed && !b.lastPlayed) return 0;
          if (!a.lastPlayed) return 1;
          if (!b.lastPlayed) return -1;
          return (
            new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime()
          );
        });
      case 'playTime':
        return gamesCopy.sort(
          (a, b) => (b.playtimeMinutes || 0) - (a.playtimeMinutes || 0)
        );
      case 'rating':
        return gamesCopy.sort(
          (a, b) => (b.game.totalRating || 0) - (a.game.totalRating || 0)
        );
      case 'addedAt':
        return gamesCopy.sort(
          (a, b) =>
            new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
        );
      default:
        return gamesCopy;
    }
  };

  const formatPlayTime = (minutes: number): string => {
    if (minutes === 0) return 'Nicht gespielt';
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours >= 100) return `${hours}h`;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}min`
      : `${hours}h`;
  };

  // Neue Hilfsfunktionen basierend auf games.service
  const getGamesByGenre = (genre: string) => {
    return games.value.filter(game =>
      game.game.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))
    );
  };

  const getTopRatedGames = (limit: number = 10) => {
    return games.value
      .filter(game => game.game.totalRating && game.game.totalRating > 0)
      .sort((a, b) => (b.game.totalRating || 0) - (a.game.totalRating || 0))
      .slice(0, limit);
  };

  const getUnratedGames = () => {
    return games.value.filter(
      game => !game.game.totalRating || game.game.totalRating === 0
    );
  };

  const getGamesByPlaytime = (minHours: number = 0) => {
    const minMinutes = minHours * 60;
    return games.value.filter(
      game => (game.playtimeMinutes || 0) >= minMinutes
    );
  };

  const getGamesByPlatformName = (platformName: string) => {
    // Plattform-Filtering wird implementiert wenn Plattform-Daten verfügbar sind
    return games.value;
  };

  const getAvailableGenres = computed(() => {
    const genres = new Set<string>();
    games.value.forEach(game => {
      game.game.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
  });

  const totalPlaytimeHours = computed(() => {
    const totalMinutes = games.value.reduce(
      (sum, game) => sum + (game.playtimeMinutes || 0),
      0
    );
    return Math.floor(totalMinutes / 60);
  });

  const averageRating = computed(() => {
    const ratedGames = games.value.filter(
      game => game.game.totalRating && game.game.totalRating > 0
    );
    if (ratedGames.length === 0) return 0;
    const sum = ratedGames.reduce(
      (total, game) => total + (game.game.totalRating || 0),
      0
    );
    return Math.round((sum / ratedGames.length) * 10) / 10;
  });

  // Initialize data when store is first used
  const init = async () => {
    if (games.value.length === 0) {
      await refreshData();
    }
  }; // Toggle Favorite für ein Spiel
  const toggleFavorite = async (userGameId: number) => {
    const { $client } = useNuxtApp();
    const notifyStore = useNotifyStore();

    try {
      const result = await $client.games.toggleFavorite.mutate({
        userGameId: userGameId
      });

      if (result.success) {
        // Lokalen State aktualisieren
        const gameIndex = games.value.findIndex(game => game.id === userGameId);
        if (gameIndex !== -1) {
          games.value[gameIndex].isFavorite = result.isFavorite;
        }

        // Erfolgs-Benachrichtigung
        const message = result.isFavorite
          ? 'Zu Favoriten hinzugefügt'
          : 'Aus Favoriten entfernt';
        notifyStore.notify(message, 1);

        return result.isFavorite;
      }
    } catch (err: any) {
      console.error('Fehler beim Ändern des Favoriten-Status:', err);
      notifyStore.notify('Fehler beim Ändern des Favoriten-Status', 3);
      throw err;
    }
  };

  // Reset store
  const reset = () => {
    games.value = [];
    stats.value = null;
    lastImportResult.value = null;
    error.value = null;
    isSelectionMode.value = false;
    selectedGameIds.value.clear();
    isRemovingGames.value = false;
  };
  return {
    // State
    games,
    stats,
    lastImportResult,
    error,
    isSelectionMode,
    selectedGameIds,
    isRemovingGames,

    // Getters
    totalGames,
    gamesByPlatform,
    availablePlatforms,
    recentlyPlayed,
    mostPlayed,
    getAvailableGenres,
    totalPlaytimeHours,
    averageRating, // Actions
    loadGames,
    loadStats,
    importSteamLibrary,
    refreshData,
    getGameById,
    getGameByUserGameId,
    getGameWithPlatforms,
    searchGames,
    filterGamesByPlatform,
    sortGames,
    formatPlayTime,
    getGamesByGenre,
    getTopRatedGames,
    getUnratedGames,
    getGamesByPlaytime,
    getGamesByPlatformName,
    init,
    reset, // Neue Aktionen für Auswahlmodus
    toggleSelectionMode,
    enterSelectionMode,
    exitSelectionMode,
    toggleGameSelection,
    selectAllFilteredGames,
    deselectAllGames,
    removeSelectedGames,
    toggleFavorite
  };
});
