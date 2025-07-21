import { defineStore } from 'pinia';
import type { UserGameWithDetails } from '~/lib/services/games.service';
import type { IGDBGame } from '~/lib/services/igdb.service';

export const useGamesStore = defineStore('games', () => {
  const { $client } = useNuxtApp();
  const notifyStore = useNotifyStore();

  // Loading store integration
  const { loading } = useLoading();
  // State
  const games = ref<UserGameWithDetails[]>([]);
  const stats = ref<any | null>(null); // TODO: Define proper stats type
  const error = ref<string | null>(null);
  // Neue State für Auswahlmodus
  const isSelectionMode = ref(false);
  const selectedGameIds = ref<Set<number>>(new Set());
  const isRemovingGames = ref(false);
  // Getters
  const totalGames = computed(() => games.value.length);
  const gamesByPlatform = computed(() => {
    const platformGroups: Record<string, UserGameWithDetails[]> = {};

    games.value.forEach(userGame => {
      const platformDRMs = userGame.platformDRMs || [];

      if (platformDRMs.length === 0) {
        // Spiele ohne Platform-Zuordnung
        if (!platformGroups['unknown']) {
          platformGroups['unknown'] = [];
        }
        platformGroups['unknown'].push(userGame);
      } else {
        // Spiele zu ihren jeweiligen Plattformen zuordnen
        platformDRMs.forEach(platformId => {
          const platformName = getPlatformNameById(platformId);
          if (!platformGroups[platformName]) {
            platformGroups[platformName] = [];
          }
          platformGroups[platformName].push(userGame);
        });
      }
    });

    return platformGroups;
  });

  const availablePlatforms = computed(() => {
    const platformIds = new Set<number>();

    games.value.forEach(userGame => {
      const platformDRMs = userGame.platformDRMs || [];
      platformDRMs.forEach(id => platformIds.add(id));
    });

    return Array.from(platformIds).map(id => ({
      id,
      name: getPlatformNameById(id),
      slug: getPlatformSlugById(id)
    }));
  });

  // Utility-Funktionen für Platform-Mapping
  const getPlatformNameById = (platformId: number): string => {
    const platformMap: Record<number, string> = {
      1: 'Steam',
      2: 'Epic Games',
      3: 'GOG'
    };
    return platformMap[platformId] || 'Unbekannt';
  };

  const getPlatformSlugById = (platformId: number): string => {
    const platformMap: Record<number, string> = {
      1: 'steam',
      2: 'epic',
      3: 'gog'
    };
    return platformMap[platformId] || 'unknown';
  };
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
  const isGameOwned = (gameId: number): boolean => {
    return games.value.some((userGame: any) => userGame.gameId === gameId);
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
  const getGameById = async (gameId: number) => {
    return await loading(
      'game-details',
      'Lade Spiel-Details...',
      async () => {
        try {
          error.value = null;
          const gameData = await $client.games.getGameById.query({
            gameId: gameId
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
  // Neue Funktion: Finde Spiel nach UserGame ID
  const getUserGameById = async (userGameId: number) => {
    return await loading(
      'game-details',
      'Lade Spiel-Details...',
      async () => {
        try {
          error.value = null;
          const gameData = await $client.games.getUserGame.query({
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

    // Filter nach Platform ID oder Slug
    if (platform === 'steam') {
      return games.value.filter(game => game.platformDRMs?.includes(1));
    }
    if (platform === 'epic') {
      return games.value.filter(game => game.platformDRMs?.includes(2));
    }
    if (platform === 'gog') {
      return games.value.filter(game => game.platformDRMs?.includes(3));
    }
    if (platform === 'unknown') {
      return games.value.filter(
        game => !game.platformDRMs || game.platformDRMs.length === 0
      );
    }

    // Fallback für numerische Platform-IDs
    const platformId = parseInt(platform);
    if (!isNaN(platformId)) {
      return games.value.filter(game =>
        game.platformDRMs?.includes(platformId)
      );
    }

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
  /**
   * Aktualisiert die Notizen für ein UserGame
   * Grund: Zentrale Verwaltung von Game-bezogenen Operationen im Store
   */
  const updateGameNotes = async (userGameId: number, notes: string | null) => {
    return await loading(
      'update-notes',
      'Speichere Notizen...',
      async () => {
        try {
          error.value = null;
          const updatedGame = await $client.games.updateGameNotes.mutate({
            userGameId,
            notes: notes // Frontend trimmt bereits und sendet null für leere Strings
          });

          if (updatedGame) {
            // Aktualisiere das Spiel im lokalen Store
            const gameIndex = games.value.findIndex(g => g.id === userGameId);
            if (gameIndex !== -1) {
              games.value[gameIndex] = updatedGame;
            }
            notifyStore.notify('Notizen erfolgreich gespeichert', 1);
          }

          return updatedGame;
        } catch (err: any) {
          const errorMessage =
            err.message || 'Fehler beim Speichern der Notizen';
          error.value = errorMessage;
          notifyStore.notify(errorMessage, 3);
          console.error('Fehler beim Speichern der Notizen:', err);
          throw err;
        }
      },
      'process'
    );
  };
  const searchDatabase = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    try {
      const response = await $client.games.searchGames.query({
        searchTerm: searchQuery,
        limit: 50
      });
      return response.games;
      // Apply filters after loading results
    } catch (error) {
      console.error('Database search error:', error);
    }
  };
  const searchIGDB = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    try {
      const response = await $client.games.searchIGDB.query({
        searchTerm: searchQuery,
        limit: 20
      });
      return response.games;
    } catch (error) {
      console.error('IGDB search error:', error);
    }
  };

  const navigateToIGDBGame = async (igdbGame: IGDBGame) => {
    return await loading('load-igdb-game', 'Lade IGDB-Spiel...', async () => {
      try {
        const game = await $client.games.addGameFromIGDBSearch.mutate({
          igdbName: igdbGame.name
        });
        return game;
      } catch (error) {
        console.error('Error adding game from IGDB:', error);
      }
    });
  };

  // Reset store
  const reset = () => {
    games.value = [];
    stats.value = null;
    error.value = null;
    isSelectionMode.value = false;
    selectedGameIds.value.clear();
    isRemovingGames.value = false;
  };
  return {
    // State
    games,
    stats,
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
    isGameOwned,
    loadGames,
    loadStats,
    refreshData,
    getGameById,
    getUserGameById,
    updateGameNotes,
    searchGames,
    filterGamesByPlatform,
    sortGames,
    formatPlayTime,
    getPlatformNameById,
    getPlatformSlugById,
    init,
    reset,
    searchDatabase,
    searchIGDB,
    navigateToIGDBGame,
    // Neue Aktionen für Auswahlmodus
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
