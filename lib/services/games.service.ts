import {
  useGameEnrichment,
  type BatchEnrichmentResult
} from '~/composables/useGameEnrichment';
import { useGameUtils } from '~/composables/useGameUtils';
import { useSteamImport } from '~/composables/useSteamImport';
import {
  PrismaClient,
  type Game,
  type Platform,
  type PlatformGame,
  type UserGame
} from '~/prisma/client';
import { IGDBService } from './igdb.service';

// Extended Game type with relations
type GameWithRelations = Game & {
  platformGames: (PlatformGame & {
    platform: Platform;
  })[];
};

const prisma = new PrismaClient();

export interface GameWithPlatforms {
  id: number; // Game ID (nicht UserGame ID)
  userGameId: number; // UserGame ID für Benutzerdaten
  title: string;
  description?: string | null;
  coverUrl: string | null;
  releaseDate?: Date | string | null;
  developer?: string | null;
  publisher?: string | null;
  genres: string[];
  playtimeMinutes: number;
  lastPlayed: Date | null;
  rating: number | null; // IGDB global rating
  notes?: string | null;
  isInstalled?: boolean;
  isFavorite?: boolean;
  platforms: string[];
  addedAt: Date;
}

export interface UserGameStats {
  totalGames: number;
  totalPlaytimeHours: number;
  platformStats: Record<string, number>;
}

export interface ImportResult {
  success: boolean;
  totalGames: number;
  imported: number;
  updated: number;
  skipped: number;
  errors: number;
  enriched?: number; // Anzahl der Spiele mit IGDB-Daten angereichert
  enrichmentErrors?: number; // Anzahl der IGDB-Anreicherungsfehler
  message?: string; // Optionale Nachricht
}

export namespace GamesService {
  // ============================================================================
  // USER GAMES OPERATIONS
  // ============================================================================

  export async function getUserGames(
    userId: number
  ): Promise<GameWithPlatforms[]> {
    const userGames = await prisma.userGame.findMany({
      where: {
        userId: userId
      },
      include: {
        game: {
          include: {
            platformGames: {
              include: {
                platform: true
              }
            }
          }
        }
      },
      orderBy: {
        addedAt: 'desc'
      }
    });

    return userGames.map(userGame => ({
      id: userGame.game.id, // Game ID
      userGameId: userGame.id, // UserGame ID
      title: userGame.game.title,
      description: userGame.game.description,
      coverUrl: userGame.game.coverUrl,
      releaseDate: userGame.game.releaseDate,
      developer: userGame.game.developer,
      publisher: userGame.game.publisher,
      genres: userGame.game.genres,
      playtimeMinutes: userGame.playtimeMinutes || 0,
      lastPlayed: userGame.lastPlayed,
      rating: userGame.game.rating,
      notes: userGame.notes,
      isInstalled: userGame.isInstalled,
      isFavorite: userGame.isFavorite,
      platforms: userGame.game.platformGames.map(pg => pg.platform.name),
      addedAt: userGame.addedAt
    }));
  }

  export async function getUserGameById(
    userGameId: number
  ): Promise<UserGame | null> {
    return prisma.userGame.findUnique({
      where: { id: userGameId },
      include: {
        game: {
          include: {
            platformGames: {
              include: {
                platform: true
              }
            }
          }
        },
        user: true
      }
    });
  }

  export async function getUserGameByUserAndGame(
    userId: number,
    gameId: number
  ): Promise<UserGame | null> {
    return prisma.userGame.findUnique({
      where: {
        userId_gameId: {
          userId: userId,
          gameId: gameId
        }
      },
      include: {
        game: {
          include: {
            platformGames: {
              include: {
                platform: true
              }
            }
          }
        },
        user: true
      }
    });
  }

  export async function createUserGame(
    userId: number,
    gameId: number,
    playtimeMinutes?: number,
    lastPlayed?: Date,
    notes?: string
  ): Promise<UserGame> {
    return prisma.userGame.create({
      data: {
        userId: userId,
        gameId: gameId,
        playtimeMinutes: playtimeMinutes,
        lastPlayed: lastPlayed,
        notes: notes
      },
      include: {
        game: {
          include: {
            platformGames: {
              include: {
                platform: true
              }
            }
          }
        },
        user: true
      }
    });
  }

  export async function updateUserGame(
    userGameId: number,
    data: {
      playtimeMinutes?: number;
      lastPlayed?: Date;
      notes?: string | null;
      isInstalled?: boolean;
      isFavorite?: boolean;
    }
  ): Promise<UserGame> {
    return prisma.userGame.update({
      where: { id: userGameId },
      data: data,
      include: {
        game: {
          include: {
            platformGames: {
              include: {
                platform: true
              }
            }
          }
        },
        user: true
      }
    });
  }

  export async function deleteUserGame(userGameId: number): Promise<UserGame> {
    return prisma.userGame.delete({
      where: { id: userGameId },
      include: {
        game: {
          include: {
            platformGames: {
              include: {
                platform: true
              }
            }
          }
        },
        user: true
      }
    });
  }

  // ============================================================================
  // GAMES OPERATIONS
  // ============================================================================

  export async function getGameById(gameId: number): Promise<Game | null> {
    return prisma.game.findUnique({
      where: { id: gameId },
      include: {
        platformGames: {
          include: {
            platform: true
          }
        },
        userGames: {
          include: {
            user: true
          }
        },
        deals: true,
        wishlistedBy: {
          include: {
            user: true
          }
        }
      }
    });
  }

  export async function getGameByPlatformId(
    platformId: number,
    platformSpecificId: string
  ): Promise<Game | null> {
    const platformGame = await prisma.platformGame.findUnique({
      where: {
        platformId_platformSpecificId: {
          platformId: platformId,
          platformSpecificId: platformSpecificId
        }
      },
      include: {
        game: {
          include: {
            platformGames: {
              include: {
                platform: true
              }
            }
          }
        }
      }
    });

    return platformGame?.game || null;
  }

  export async function createGame(
    title: string,
    data: {
      description?: string;
      coverUrl?: string;
      releaseDate?: Date;
      developer?: string;
      publisher?: string;
      genres?: string[];
      rating?: number;
    }
  ): Promise<Game> {
    return prisma.game.create({
      data: {
        title: title,
        description: data.description,
        coverUrl: data.coverUrl,
        releaseDate: data.releaseDate,
        developer: data.developer,
        publisher: data.publisher,
        genres: data.genres || [],
        rating: data.rating
      },
      include: {
        platformGames: {
          include: {
            platform: true
          }
        },
        userGames: {
          include: {
            user: true
          }
        },
        deals: true,
        wishlistedBy: {
          include: {
            user: true
          }
        }
      }
    });
  }

  export async function searchGamesByTitle(title: string): Promise<Game[]> {
    return prisma.game.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive'
        }
      },
      include: {
        platformGames: {
          include: {
            platform: true
          }
        },
        userGames: {
          include: {
            user: true
          }
        },
        deals: true,
        wishlistedBy: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        title: 'asc'
      }
    });
  }

  export async function updateGame(
    gameId: number,
    data: {
      title?: string;
      description?: string;
      coverUrl?: string;
      releaseDate?: Date;
      developer?: string;
      publisher?: string;
      genres?: string[];
      rating?: number;
    }
  ): Promise<Game> {
    return prisma.game.update({
      where: { id: gameId },
      data: data,
      include: {
        platformGames: {
          include: {
            platform: true
          }
        },
        userGames: {
          include: {
            user: true
          }
        },
        deals: true,
        wishlistedBy: {
          include: {
            user: true
          }
        }
      }
    });
  }

  export async function deleteGame(gameId: number): Promise<Game> {
    return prisma.game.delete({
      where: { id: gameId },
      include: {
        platformGames: {
          include: {
            platform: true
          }
        },
        userGames: {
          include: {
            user: true
          }
        },
        deals: true,
        wishlistedBy: {
          include: {
            user: true
          }
        }
      }
    });
  }

  // ============================================================================
  // PLATFORMS OPERATIONS
  // ============================================================================

  export async function getPlatformById(
    platformId: number
  ): Promise<Platform | null> {
    return prisma.platform.findUnique({
      where: { id: platformId },
      include: {
        platformGames: {
          include: {
            game: true
          }
        }
      }
    });
  }

  export async function getPlatformBySlug(
    slug: string
  ): Promise<Platform | null> {
    return prisma.platform.findUnique({
      where: { slug: slug },
      include: {
        platformGames: {
          include: {
            game: true
          }
        }
      }
    });
  }

  export async function getAllPlatforms(): Promise<Platform[]> {
    return prisma.platform.findMany({
      include: {
        platformGames: {
          include: {
            game: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
  }

  export async function createPlatform(
    name: string,
    slug: string,
    data: {
      iconUrl?: string;
      siteUrl?: string;
    }
  ): Promise<Platform> {
    return prisma.platform.create({
      data: {
        name: name,
        slug: slug,
        iconUrl: data.iconUrl,
        siteUrl: data.siteUrl
      },
      include: {
        platformGames: {
          include: {
            game: true
          }
        }
      }
    });
  }

  export async function findOrCreatePlatform(
    name: string,
    slug: string,
    data?: {
      iconUrl?: string;
      siteUrl?: string;
    }
  ): Promise<Platform> {
    let platform = await getPlatformBySlug(slug);

    if (!platform) {
      platform = await createPlatform(name, slug, data || {});
    }

    return platform;
  }

  // ============================================================================
  // PLATFORM GAMES OPERATIONS
  // ============================================================================

  export async function createPlatformGame(
    gameId: number,
    platformId: number,
    platformSpecificId: string,
    url?: string
  ): Promise<PlatformGame> {
    return prisma.platformGame.create({
      data: {
        gameId: gameId,
        platformId: platformId,
        platformSpecificId: platformSpecificId,
        url: url
      },
      include: {
        game: true,
        platform: true,
        deals: true
      }
    });
  }

  export async function createGameWithPlatform(
    title: string,
    platformId: number,
    platformSpecificId: string,
    gameData: {
      description?: string;
      coverUrl?: string;
      releaseDate?: Date;
      developer?: string;
      publisher?: string;
      genres?: string[];
      rating?: number;
    },
    platformGameUrl?: string
  ): Promise<Game> {
    return prisma.game.create({
      data: {
        title: title,
        description: gameData.description,
        coverUrl: gameData.coverUrl,
        releaseDate: gameData.releaseDate,
        developer: gameData.developer,
        publisher: gameData.publisher,
        genres: gameData.genres || [],
        rating: gameData.rating,
        platformGames: {
          create: {
            platformId: platformId,
            platformSpecificId: platformSpecificId,
            url: platformGameUrl
          }
        }
      },
      include: {
        platformGames: {
          include: {
            platform: true
          }
        },
        userGames: {
          include: {
            user: true
          }
        },
        deals: true,
        wishlistedBy: {
          include: {
            user: true
          }
        }
      }
    });
  }

  // ============================================================================
  // STATISTICS & ANALYTICS
  // ============================================================================

  export async function getUserStats(userId: number): Promise<UserGameStats> {
    const [totalGames, totalPlaytime, userGames] = await Promise.all([
      prisma.userGame.count({
        where: { userId: userId }
      }),
      prisma.userGame.aggregate({
        where: { userId: userId },
        _sum: { playtimeMinutes: true }
      }),
      prisma.userGame.findMany({
        where: { userId: userId },
        include: {
          game: {
            include: {
              platformGames: {
                include: {
                  platform: true
                }
              }
            }
          }
        }
      })
    ]);

    // Verwende GameUtils Composable für Statistik-Berechnungen
    const { calculatePlatformStats } = useGameUtils();
    const platformStats = calculatePlatformStats(userGames);

    return {
      totalGames,
      totalPlaytimeHours: Math.floor(
        (totalPlaytime._sum.playtimeMinutes || 0) / 60
      ),
      platformStats
    };
  }

  // ============================================================================
  // GAME ENRICHMENT
  // ============================================================================

  /**
   * Spiel mit IGDB-Daten anreichern
   * Grund: Delegiert komplexe Anreicherungslogik an useGameEnrichment Composable
   */
  export async function enrichGameWithIGDB(
    gameId: number,
    gameName: string,
    platformName?: string,
    forceUpdate: boolean = false
  ): Promise<boolean> {
    try {
      // Prüfe ob das Spiel bereits IGDB-Daten hat
      const game = await getGameById(gameId);
      if (!game) {
        return false;
      }

      // Verwende Composable für Anreicherungslogik
      const {
        shouldEnrichGame,
        determineFieldsToUpdate,
        validateEnrichedData
      } = useGameEnrichment();

      // Prüfen ob Anreicherung nötig ist
      if (!shouldEnrichGame(game, { forceUpdate, skipIfComplete: true })) {
        return false;
      }

      // IGDB-Daten über IGDBService abrufen
      const enrichedData = await IGDBService.enrichGameData(
        gameName,
        platformName
      );

      if (!enrichedData || Object.keys(enrichedData).length === 0) {
        return false;
      }

      // Validiere die angereicherten Daten
      const validation = validateEnrichedData(enrichedData);
      if (!validation.isValid) {
        console.warn(
          `Ungültige IGDB-Daten für "${gameName}":`,
          validation.issues
        );
        return false;
      }

      // Bestimme welche Felder aktualisiert werden sollen über Composable
      const { updateData, updatedFields } = determineFieldsToUpdate(
        game,
        enrichedData,
        forceUpdate
      );

      // Nur aktualisieren wenn neue Daten vorhanden sind
      if (Object.keys(updateData).length > 0) {
        await updateGame(gameId, updateData);
        return true;
      }

      return false;
    } catch (error) {
      console.error(
        `Fehler beim Anreichern von "${gameName}" mit IGDB-Daten:`,
        error
      );
      return false;
    }
  }

  /**
   * Spezielle IGDB-Anreicherung für Steam-Spiele - ergänzt nur fehlende Daten
   */
  export async function enrichSteamGameWithIGDB(
    gameId: number,
    gameName: string,
    forceUpdate: boolean = false
  ): Promise<boolean> {
    try {
      // Spiel laden
      const game = await getGameById(gameId);
      if (!game) {
        return false;
      }

      // Verwende Composable für Anreicherungslogik
      const { shouldEnrichGame, determineFieldsToUpdate } = useGameEnrichment();

      // Prüfe welche Daten fehlen (Steam liefert normalerweise nur Titel und Cover)
      const missingData = {
        description: !game.description,
        genres: !game.genres || game.genres.length === 0,
        developer: !game.developer,
        publisher: !game.publisher,
        releaseDate: !game.releaseDate,
        rating: !game.rating
      };

      // Überspringen falls bereits alle wichtigen Daten vorhanden sind (außer bei forceUpdate)
      if (
        !forceUpdate &&
        !missingData.description &&
        !missingData.genres &&
        !missingData.rating
      ) {
        return false;
      }

      // IGDB-Daten über IGDBService abrufen
      const enrichedData = await IGDBService.enrichGameData(gameName, 'Steam');

      if (!enrichedData || Object.keys(enrichedData).length === 0) {
        return false;
      }

      // Bestimme welche Felder aktualisiert werden sollen (nur fehlende Daten)
      const { updateData } = determineFieldsToUpdate(
        game,
        enrichedData,
        false // Nie forcieren - nur fehlende Daten ergänzen
      );

      // Nur aktualisieren wenn neue Daten vorhanden sind
      if (Object.keys(updateData).length > 0) {
        await updateGame(gameId, updateData);
        return true;
      }

      return false;
    } catch (error) {
      console.error(
        `[IGDB Steam] Fehler beim Ergänzen von "${gameName}" mit IGDB-Daten:`,
        error
      );
      return false;
    }
  }

  // ============================================================================
  // STEAM IMPORT OPERATIONS
  // ============================================================================

  /**
   * Steam-Spiel verarbeiten und importieren
   */
  export async function processSteamGameImport(
    userId: number,
    steamGame: {
      appid: number;
      name: string;
      playtime_forever: number;
      rtime_last_played?: number;
    },
    steamPlatformId: number
  ): Promise<'imported' | 'updated' | 'skipped'> {
    try {
      const { getSteamCoverUrl, getSteamStoreUrl } = useSteamImport();

      // Prüfen ob Spiel bereits existiert
      let game = await getGameByPlatformId(
        steamPlatformId,
        steamGame.appid.toString()
      );

      // Spiel erstellen falls es nicht existiert
      if (!game) {
        const coverUrl = getSteamCoverUrl(steamGame.appid);
        const storeUrl = getSteamStoreUrl(steamGame.appid);

        game = await createGameWithPlatform(
          steamGame.name,
          steamPlatformId,
          steamGame.appid.toString(),
          { coverUrl: coverUrl },
          storeUrl
        );
      }

      // UserGame erstellen oder aktualisieren
      const existingUserGame = await getUserGameByUserAndGame(userId, game.id);
      const lastPlayed = steamGame.rtime_last_played
        ? new Date(steamGame.rtime_last_played * 1000)
        : null;

      if (!existingUserGame) {
        await createUserGame(
          userId,
          game.id,
          steamGame.playtime_forever,
          lastPlayed || undefined
        );
        return 'imported';
      } else {
        // Spielzeit aktualisieren falls größer
        if (
          steamGame.playtime_forever > (existingUserGame.playtimeMinutes || 0)
        ) {
          await updateUserGame(existingUserGame.id, {
            playtimeMinutes: steamGame.playtime_forever,
            lastPlayed: lastPlayed || undefined
          });
          return 'updated';
        }
        return 'skipped';
      }
    } catch (error) {
      console.error(
        `Fehler beim Verarbeiten von Spiel ${steamGame.name}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Erweiterte Steam-Import-Funktion mit automatischer IGDB-Anreicherung
   */
  export async function processSteamGameImportWithEnrichment(
    userId: number,
    steamGame: {
      appid: number;
      name: string;
      playtime_forever: number;
      rtime_last_played?: number;
    },
    steamPlatformId: number,
    enableEnrichment: boolean = true
  ): Promise<{
    result: 'imported' | 'updated' | 'skipped';
    enriched: boolean;
  }> {
    try {
      const { getSteamCoverUrl, getSteamStoreUrl } = useSteamImport();

      // Prüfe ob Spiel bereits existiert
      let game = await getGameByPlatformId(
        steamPlatformId,
        steamGame.appid.toString()
      );
      let wasNewGame = false;

      // Spiel erstellen falls es nicht existiert - mit Steam-Metadaten
      if (!game) {
        const coverUrl = getSteamCoverUrl(steamGame.appid);
        const storeUrl = getSteamStoreUrl(steamGame.appid);

        game = await createGameWithPlatform(
          steamGame.name,
          steamPlatformId,
          steamGame.appid.toString(),
          { coverUrl: coverUrl },
          storeUrl
        );
        wasNewGame = true;
      }

      // UserGame erstellen oder aktualisieren
      const existingUserGame = await getUserGameByUserAndGame(userId, game.id);
      const lastPlayed = steamGame.rtime_last_played
        ? new Date(steamGame.rtime_last_played * 1000)
        : null;

      let importResult: 'imported' | 'updated' | 'skipped' = 'skipped';

      if (!existingUserGame) {
        await createUserGame(
          userId,
          game.id,
          steamGame.playtime_forever,
          lastPlayed || undefined
        );
        importResult = 'imported';
      } else {
        // Spielzeit aktualisieren falls größer
        if (
          steamGame.playtime_forever > (existingUserGame.playtimeMinutes || 0)
        ) {
          await updateUserGame(existingUserGame.id, {
            playtimeMinutes: steamGame.playtime_forever,
            lastPlayed: lastPlayed || undefined
          });
          importResult = 'updated';
        }
      }

      // IGDB-Anreicherung - IMMER für neue Spiele, nur für bestehende wenn aktiviert
      let enriched = false;
      if (wasNewGame) {
        // Neue Spiele IMMER mit Steam-first IGDB-Anreicherung
        enriched = await enrichSteamGameWithIGDB(game.id, steamGame.name);

        // Verzögerung um IGDB API zu schonen
        await new Promise(resolve => setTimeout(resolve, 250));
      } else if (enableEnrichment) {
        // Bestehende Spiele nur anreichern wenn explizit aktiviert und unvollständige Metadaten
        const shouldEnrich =
          !game.description || game.genres.length === 0 || !game.coverUrl;
        if (shouldEnrich) {
          enriched = await enrichSteamGameWithIGDB(game.id, steamGame.name);

          // Verzögerung um IGDB API zu schonen
          await new Promise(resolve => setTimeout(resolve, 250));
        }
      }

      return { result: importResult, enriched };
    } catch (error) {
      console.error(
        `Fehler beim Verarbeiten von Spiel ${steamGame.name}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Steam-Bibliothek vollständig importieren
   */
  export async function importSteamLibrary(
    userId: number,
    steamInput: string,
    operationId?: string
  ): Promise<ImportResult> {
    try {
      const { extractSteamId, fetchSteamLibrary } = useSteamImport();

      // Steam ID extrahieren
      const steamId = await extractSteamId(steamInput);
      if (!steamId) {
        throw new Error('Ungültige Steam ID oder URL');
      }

      // Steam-Bibliothek abrufen
      const games = await fetchSteamLibrary(steamId);

      // Steam-Plattform finden oder erstellen
      const steamPlatform = await findOrCreatePlatform('Steam', 'steam', {
        siteUrl: 'https://store.steampowered.com'
      });

      // Verwende SteamImport Composable für Batch-Verarbeitung
      const { processGamesBatch } = useSteamImport();

      const result = await processGamesBatch(games, {
        userId,
        platformId: steamPlatform.id,
        withIGDBEnrichment: true,
        operationId
      });

      return {
        success: true,
        totalGames: games.length,
        imported: result.imported,
        updated: result.updated,
        skipped: result.skipped,
        errors: result.errors,
        enriched: result.enriched,
        enrichmentErrors: result.enrichmentErrors,
        message: `Steam-Import erfolgreich: ${result.imported} importiert, ${
          result.updated
        } aktualisiert, ${result.skipped} übersprungen${
          result.enriched ? `, ${result.enriched} angereichert` : ''
        }`
      };
    } catch (error) {
      console.error('Fehler beim Steam-Import:', error);
      return {
        success: false,
        totalGames: 0,
        imported: 0,
        updated: 0,
        skipped: 0,
        errors: 1,
        message: `Steam-Import fehlgeschlagen: ${
          error instanceof Error ? error.message : 'Unbekannter Fehler'
        }`
      };
    }
  }

  /**
   * Steam-Bibliothek schnell importieren (ohne IGDB-Anreicherung)
   */
  export async function importSteamLibraryFast(
    userId: number,
    steamInput: string,
    operationId?: string
  ): Promise<ImportResult> {
    try {
      const { extractSteamId, fetchSteamLibrary } = useSteamImport();

      // Steam ID extrahieren
      const steamId = await extractSteamId(steamInput);
      if (!steamId) {
        throw new Error('Ungültige Steam ID oder URL');
      }

      // Steam-Bibliothek abrufen
      const games = await fetchSteamLibrary(steamId);

      // Steam-Plattform finden oder erstellen
      const steamPlatform = await findOrCreatePlatform('Steam', 'steam', {
        siteUrl: 'https://store.steampowered.com'
      });

      // Verwende SteamImport Composable für Batch-Verarbeitung
      const { processGamesBatch } = useSteamImport();

      const result = await processGamesBatch(games, {
        userId,
        platformId: steamPlatform.id,
        withIGDBEnrichment: false, // Keine Anreicherung
        operationId
      });

      return {
        success: true,
        totalGames: games.length,
        imported: result.imported,
        updated: result.updated,
        skipped: result.skipped,
        errors: result.errors,
        message: `Steam-Import (schnell) erfolgreich: ${result.imported} importiert, ${result.updated} aktualisiert, ${result.skipped} übersprungen`
      };
    } catch (error) {
      console.error('Fehler beim Steam-Import (schnell):', error);
      return {
        success: false,
        totalGames: 0,
        imported: 0,
        updated: 0,
        skipped: 0,
        errors: 1,
        message: `Steam-Import (schnell) fehlgeschlagen: ${
          error instanceof Error ? error.message : 'Unbekannter Fehler'
        }`
      };
    }
  }

  // ============================================================================
  // USER REWARDS & XP
  // ============================================================================

  export async function rewardUserXP(
    userId: number,
    xpAmount: number
  ): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpAmount }
      }
    });
  }

  export async function rewardUserCredits(
    userId: number,
    creditsAmount: number
  ): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: { increment: creditsAmount }
      }
    });
  }

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  export async function getGameWithPlatforms(
    gameId: number,
    userId: number
  ): Promise<GameWithPlatforms | null> {
    const userGame = await prisma.userGame.findUnique({
      where: {
        userId_gameId: {
          userId: userId,
          gameId: gameId
        }
      },
      include: {
        game: {
          include: {
            platformGames: {
              include: {
                platform: true
              }
            }
          }
        }
      }
    });

    if (!userGame) {
      return null;
    }

    return {
      id: userGame.game.id, // Game ID
      userGameId: userGame.id, // UserGame ID
      title: userGame.game.title,
      description: userGame.game.description,
      coverUrl: userGame.game.coverUrl,
      releaseDate: userGame.game.releaseDate,
      developer: userGame.game.developer,
      publisher: userGame.game.publisher,
      genres: userGame.game.genres,
      playtimeMinutes: userGame.playtimeMinutes || 0,
      lastPlayed: userGame.lastPlayed,
      rating: userGame.game.rating, // IGDB global rating
      notes: userGame.notes,
      isInstalled: userGame.isInstalled,
      isFavorite: userGame.isFavorite,
      platforms: userGame.game.platformGames.map(pg => pg.platform.name),
      addedAt: userGame.addedAt
    };
  }

  // ============================================================================
  // BACKGROUND ENRICHMENT
  // ============================================================================

  /**
   * Hintergrund-Anreicherung für importierte Spiele
   * Führt eine IGDB-Anreicherung für alle Spiele einer bestimmten Plattform durch
   */
  export async function enrichGamesBackground(
    platformSlug: string = 'steam',
    operationId?: string
  ): Promise<BatchEnrichmentResult> {
    try {
      // Finde Plattform anhand des Slugs
      const platform = await prisma.platform.findUnique({
        where: { slug: platformSlug }
      });

      if (!platform) {
        throw new Error(`Plattform mit Slug '${platformSlug}' nicht gefunden`);
      }

      // Hole alle Spiele dieser Plattform
      const platformGames = await prisma.platformGame.findMany({
        where: { platformId: platform.id },
        include: { game: true }
      });

      if (platformGames.length === 0) {
        return {
          total: 0,
          enriched: 0,
          skipped: 0,
          errors: 0,
          message: `Keine Spiele für Plattform '${platform.name}' gefunden`
        };
      }

      // Server-Progress-Tracking (für zukünftige Implementierung)
      // TODO: Implementiere Server-seitiges Progress-Tracking
      let progressCallback:
        | ((current: number, total: number) => void)
        | undefined;

      if (operationId) {
        // Platzhalter für Progress-Tracking - kann später erweitert werden
        progressCallback = (current: number, total: number) => {
          // console.log(`Progress: ${current}/${total}`);
        };
      }

      // Statistiken initialisieren
      let enriched = 0;
      let skipped = 0;
      let errors = 0;

      // Alle Spiele durchgehen
      for (let i = 0; i < platformGames.length; i++) {
        const pg = platformGames[i];

        try {
          // Nur anreichern, wenn Daten fehlen
          const needsEnrichment =
            !pg.game.description ||
            !pg.game.releaseDate ||
            !pg.game.genres ||
            pg.game.genres.length === 0;

          if (needsEnrichment) {
            // Je nach Plattform die richtige Anreicherungsmethode verwenden
            let success = false;

            if (platformSlug === 'steam') {
              success = await enrichSteamGameWithIGDB(
                pg.game.id,
                pg.game.title
              );
            } else {
              success = await enrichGameWithIGDB(
                pg.game.id,
                pg.game.title,
                platform.name
              );
            }

            if (success) {
              enriched++;
            } else {
              skipped++;
            }
          } else {
            skipped++;
          }

          // Verzögerung einbauen, um die IGDB API zu schonen
          await new Promise(resolve => setTimeout(resolve, 300));
        } catch (error) {
          console.error(
            `Fehler bei Anreicherung von Spiel ${pg.game.title}:`,
            error
          );
          errors++;
        }

        // Fortschritt aktualisieren
        if (progressCallback) {
          progressCallback(i + 1, platformGames.length);
        }
      }

      // Ergebnis zurückgeben
      return {
        total: platformGames.length,
        enriched,
        skipped,
        errors,
        message: `Anreicherung abgeschlossen: ${enriched} angereichert, ${skipped} übersprungen, ${errors} fehlgeschlagen`
      };
    } catch (error) {
      console.error('Fehler bei Hintergrund-Anreicherung:', error);
      throw error;
    }
  }
}
