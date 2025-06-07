import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useLoading } from '~/stores/loading.store';
import type {
  GameWithPlatforms,
  UserGameStats,
  ImportResult
} from '~/lib/services/games.service';

export const useGamesStore = defineStore('games', () => {
  // Loading store integration
  const { loading, progressLoading } = useLoading();

  // State
  const games = ref<GameWithPlatforms[]>([]);
  const stats = ref<UserGameStats | null>(null);
  const lastImportResult = ref<ImportResult | null>(null);
  const error = ref<string | null>(null);
  // Neue State für Auswahlmodus
  const isSelectionMode = ref(false);
  const selectedGameIds = ref<Set<number>>(new Set());
  const isRemovingGames = ref(false);

  // Getters
  const totalGames = computed(() => games.value.length);

  const gamesByPlatform = computed(() => {
    const platformGroups: Record<string, GameWithPlatforms[]> = {};
    games.value.forEach(game => {
      game.platforms.forEach(platform => {
        if (!platformGroups[platform]) {
          platformGroups[platform] = [];
        }
        platformGroups[platform].push(game);
      });
    });
    return platformGroups;
  });

  const availablePlatforms = computed(() => {
    const platforms = new Set<string>();
    games.value.forEach(game => {
      game.platforms.forEach(platform => platforms.add(platform));
    });
    return Array.from(platforms).sort();
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
      .filter(game => game.playtimeMinutes > 0)
      .sort((a, b) => b.playtimeMinutes - a.playtimeMinutes)
      .slice(0, 10);
  }); // Actions
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
  ): Promise<ImportResult | null> => {
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

  // Neue Funktionen für Auswahlmodus
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

  const selectAllFilteredGames = (filteredGames: GameWithPlatforms[]) => {
    filteredGames.forEach(game => selectedGameIds.value.add(game.id));
  };

  const deselectAllGames = () => {
    selectedGameIds.value.clear();
  };
  const removeSelectedGames = async (): Promise<boolean> => {
    if (selectedGameIds.value.size === 0 || isRemovingGames.value) {
      return false;
    }

    return await progressLoading(
      'remove-games',
      'Entferne Spiele aus der Bibliothek...',
      async updateProgress => {
        const { $client } = useNuxtApp();
        const notifyStore = useNotifyStore();

        try {
          isRemovingGames.value = true;
          const gameIdsArray = Array.from(selectedGameIds.value);

          // Fortschritt initialisieren
          updateProgress(0, gameIdsArray.length, 'Bereite Entfernung vor...');

          const result = await $client.games.removeGamesFromLibrary.mutate({
            gameIds: gameIdsArray
          });

          if (result.success) {
            updateProgress(
              gameIdsArray.length * 0.8,
              gameIdsArray.length,
              'Aktualisiere lokale Daten...'
            );

            // Erfolgreiche Entfernung
            const message = `${result.removedCount} Spiel${
              result.removedCount > 1 || 0 ? 'e' : ''
            } erfolgreich aus der Bibliothek entfernt.`;
            notifyStore.notify(message, 1);

            // Entfernte Spiele aus dem lokalen State entfernen
            games.value = games.value.filter(
              game => !gameIdsArray.includes(game.id)
            );

            updateProgress(
              gameIdsArray.length * 0.9,
              gameIdsArray.length,
              'Lade Statistiken neu...'
            );
            // Statistiken neu berechnen
            await loadStats();

            // Auswahlmodus beenden
            exitSelectionMode();
            updateProgress(
              gameIdsArray.length,
              gameIdsArray.length,
              'Abgeschlossen'
            );
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

  const searchGames = (query: string) => {
    if (!query.trim()) return games.value;

    const searchTerm = query.toLowerCase().trim();
    return games.value.filter(
      game =>
        game.title.toLowerCase().includes(searchTerm) ||
        game.genres.some(genre => genre.toLowerCase().includes(searchTerm)) ||
        game.platforms.some(platform =>
          platform.toLowerCase().includes(searchTerm)
        )
    );
  };

  const filterGamesByPlatform = (platform: string) => {
    if (platform === 'all') return games.value;
    return games.value.filter(game => game.platforms.includes(platform));
  };

  const sortGames = (games: GameWithPlatforms[], sortBy: string) => {
    const gamesCopy = [...games];

    switch (sortBy) {
      case 'title':
        return gamesCopy.sort((a, b) => a.title.localeCompare(b.title));
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
        return gamesCopy.sort((a, b) => b.playtimeMinutes - a.playtimeMinutes);
      case 'rating':
        return gamesCopy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
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
      game.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))
    );
  };

  const getTopRatedGames = (limit: number = 10) => {
    return games.value
      .filter(game => game.rating && game.rating > 0)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
  };

  const getUnratedGames = () => {
    return games.value.filter(game => !game.rating || game.rating === 0);
  };

  const getGamesByPlaytime = (minHours: number = 0) => {
    const minMinutes = minHours * 60;
    return games.value.filter(game => game.playtimeMinutes >= minMinutes);
  };

  const getGamesByPlatformName = (platformName: string) => {
    return games.value.filter(game =>
      game.platforms.some(p => p.toLowerCase() === platformName.toLowerCase())
    );
  };

  const getAvailableGenres = computed(() => {
    const genres = new Set<string>();
    games.value.forEach(game => {
      game.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
  });

  const totalPlaytimeHours = computed(() => {
    const totalMinutes = games.value.reduce(
      (sum, game) => sum + game.playtimeMinutes,
      0
    );
    return Math.floor(totalMinutes / 60);
  });

  const averageRating = computed(() => {
    const ratedGames = games.value.filter(
      game => game.rating && game.rating > 0
    );
    if (ratedGames.length === 0) return 0;
    const sum = ratedGames.reduce(
      (total, game) => total + (game.rating || 0),
      0
    );
    return Math.round((sum / ratedGames.length) * 10) / 10;
  });

  // Initialize data when store is first used
  const init = async () => {
    if (games.value.length === 0) {
      await refreshData();
    }
  }; // Reset store
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
    averageRating,

    // Actions
    loadGames,
    loadStats,
    importSteamLibrary,
    refreshData,
    getGameById,
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
    reset,
    // Neue Aktionen für Auswahlmodus
    enterSelectionMode,
    exitSelectionMode,
    toggleGameSelection,
    selectAllFilteredGames,
    deselectAllGames,
    removeSelectedGames
  };
});
