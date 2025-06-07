import {
  PrismaClient,
  type Game,
  type UserGame,
  type Platform,
  type PlatformGame
} from '~/prisma/client';
import { IGDBService, type EnrichedGameData } from './igdb.service';

// Extended Game type with relations
type GameWithRelations = Game & {
  platformGames: (PlatformGame & {
    platform: Platform;
  })[];
};

const prisma = new PrismaClient();

export interface GameWithPlatforms {
  id: number;
  title: string;
  description?: string | null;
  coverUrl: string | null;
  releaseDate?: Date | string | null;
  developer?: string | null;
  publisher?: string | null;
  genres: string[];
  playtimeMinutes: number;
  lastPlayed: Date | null;
  rating: number | null;
  notes?: string | null;
  isInstalled?: boolean;
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
}

export namespace GamesService {
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
      id: userGame.id,
      title: userGame.game.title,
      description: userGame.game.description,
      coverUrl: userGame.game.coverUrl,
      releaseDate: userGame.game.releaseDate,
      developer: userGame.game.developer,
      publisher: userGame.game.publisher,
      genres: userGame.game.genres,
      playtimeMinutes: userGame.playtimeMinutes || 0,
      lastPlayed: userGame.lastPlayed,
      rating: userGame.rating,
      notes: userGame.notes,
      isInstalled: userGame.isInstalled,
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
    rating?: number,
    notes?: string
  ): Promise<UserGame> {
    return prisma.userGame.create({
      data: {
        userId: userId,
        gameId: gameId,
        playtimeMinutes: playtimeMinutes,
        lastPlayed: lastPlayed,
        rating: rating,
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
      rating?: number;
      notes?: string;
      isInstalled?: boolean;
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
    console.log(`Deleting user game with ID: ${userGameId}`);
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
        genres: data.genres || []
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

  /**
   * Suche Spiele nach Titel
   */
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

    // Plattform-Statistiken berechnen
    const platformStats = userGames.reduce((acc, userGame) => {
      userGame.game.platformGames.forEach(pg => {
        const platformName = pg.platform.name;
        if (!acc[platformName]) {
          acc[platformName] = 0;
        }
        acc[platformName]++;
      });
      return acc;
    }, {} as Record<string, number>);

    return {
      totalGames,
      totalPlaytimeHours: Math.floor(
        (totalPlaytime._sum.playtimeMinutes || 0) / 60
      ),
      platformStats
    };
  }

  // ============================================================================
  // IMPORT & SYNC OPERATIONS
  // ============================================================================

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
      // Prüfen ob Spiel bereits existiert
      let game = await getGameByPlatformId(
        steamPlatformId,
        steamGame.appid.toString()
      );

      // Spiel erstellen falls es nicht existiert
      if (!game) {
        const coverUrl = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steamGame.appid}/library_600x900.jpg`;
        const storeUrl = `https://store.steampowered.com/app/${steamGame.appid}/`;

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
  // Spiel mit IGDB-Daten anreichern
  export async function enrichGameWithIGDB(
    gameId: number,
    gameName: string,
    platformName?: string,
    forceUpdate: boolean = false
  ): Promise<boolean> {
    try {
      console.log(`[IGDB] Starting enrichment for: "${gameName}"`);

      // Prüfe ob das Spiel bereits IGDB-Daten hat
      const game = await getGameById(gameId);
      if (!game) {
        console.log(`[IGDB] Game not found in DB: ${gameName}`);
        return false;
      } // Überspringen falls bereits beschreibung und genres vorhanden sind (außer bei forceUpdate)
      if (!forceUpdate && game.description && game.genres.length > 0) {
        console.log(`[IGDB] Game already has metadata, skipping: ${gameName}`);
        return false;
      }

      console.log(`[IGDB] Fetching data for: "${gameName}" (ID: ${gameId})`);

      // IGDB-Daten abrufen
      const enrichedData = await IGDBService.enrichGameData(
        gameName,
        platformName
      );

      if (!enrichedData || Object.keys(enrichedData).length === 0) {
        console.log(`[IGDB] No data found for: "${gameName}"`);
        return false;
      }

      // Spiel mit neuen Daten aktualisieren
      const updateData: {
        description?: string;
        coverUrl?: string;
        releaseDate?: Date;
        developer?: string;
        publisher?: string;
        genres?: string[];
      } = {};
      if (enrichedData.description && (!game.description || forceUpdate)) {
        updateData.description = enrichedData.description;
      }

      // IGDB Cover-URLs nur verwenden wenn kein Cover vorhanden ist oder forceUpdate aktiviert
      if (enrichedData.coverUrl && (!game.coverUrl || forceUpdate)) {
        updateData.coverUrl = enrichedData.coverUrl;
      }

      if (enrichedData.releaseDate && (!game.releaseDate || forceUpdate)) {
        updateData.releaseDate = enrichedData.releaseDate;
      }

      if (enrichedData.developer && (!game.developer || forceUpdate)) {
        updateData.developer = enrichedData.developer;
      }

      if (enrichedData.publisher && (!game.publisher || forceUpdate)) {
        updateData.publisher = enrichedData.publisher;
      }

      if (
        enrichedData.genres &&
        enrichedData.genres.length > 0 &&
        (game.genres.length === 0 || forceUpdate)
      ) {
        updateData.genres = enrichedData.genres;
      }

      // Nur aktualisieren wenn neue Daten vorhanden sind
      if (Object.keys(updateData).length > 0) {
        await updateGame(gameId, updateData);
        console.log(
          `Spiel "${gameName}" mit IGDB-Daten aktualisiert:`,
          Object.keys(updateData)
        );
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
  // Erweiterte Steam-Import-Funktion mit automatischer IGDB-Anreicherung
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
      // Prüfe ob Spiel bereits existiert
      let game = await getGameByPlatformId(
        steamPlatformId,
        steamGame.appid.toString()
      );
      let wasNewGame = false;

      // Spiel erstellen falls es nicht existiert - mit Steam-Metadaten
      if (!game) {
        const coverUrl = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steamGame.appid}/library_600x900.jpg`;
        const storeUrl = `https://store.steampowered.com/app/${steamGame.appid}/`;

        game = await createGameWithPlatform(
          steamGame.name,
          steamPlatformId,
          steamGame.appid.toString(),
          { coverUrl: coverUrl }, // Steam Cover-URL als Basis
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
      } // IGDB-Anreicherung - IMMER für neue Spiele, nur für bestehende wenn aktiviert
      let enriched = false;
      if (wasNewGame) {
        // Neue Spiele IMMER mit Steam-first IGDB-Anreicherung
        console.log(
          `Mandatory Steam-first IGDB enrichment for new game: ${steamGame.name}`
        );
        enriched = await enrichSteamGameWithIGDB(game.id, steamGame.name);
        console.log(
          `Steam-first IGDB enrichment result for ${steamGame.name}: ${enriched}`
        );

        // Verzögerung um IGDB API zu schonen
        await new Promise(resolve => setTimeout(resolve, 250));
      } else if (enableEnrichment) {
        // Bestehende Spiele nur anreichern wenn explizit aktiviert und unvollständige Metadaten
        const shouldEnrich =
          !game.description || game.genres.length === 0 || !game.coverUrl;

        if (shouldEnrich) {
          console.log(
            `Optional Steam-first IGDB enrichment for existing game with missing data: ${steamGame.name}`
          );
          enriched = await enrichSteamGameWithIGDB(game.id, steamGame.name);
          console.log(
            `Steam-first IGDB enrichment result for ${steamGame.name}: ${enriched}`
          );

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

  // Spezielle IGDB-Anreicherung für Steam-Spiele - ergänzt nur fehlende Daten
  export async function enrichSteamGameWithIGDB(
    gameId: number,
    gameName: string,
    forceUpdate: boolean = false
  ): Promise<boolean> {
    try {
      console.log(`[IGDB Steam] Starting enrichment for: "${gameName}"`);

      // Spiel laden
      const game = await getGameById(gameId);
      if (!game) {
        console.log(`[IGDB Steam] Game not found in DB: ${gameName}`);
        return false;
      }

      // Prüfe welche Daten fehlen (Steam liefert normalerweise nur Titel und Cover)
      const missingData = {
        description: !game.description,
        genres: !game.genres || game.genres.length === 0,
        developer: !game.developer,
        publisher: !game.publisher,
        releaseDate: !game.releaseDate
      };

      // Überspringen falls bereits alle wichtigen Daten vorhanden sind (außer bei forceUpdate)
      if (!forceUpdate && !missingData.description && !missingData.genres) {
        console.log(
          `[IGDB Steam] Game already has essential metadata, skipping: ${gameName}`
        );
        return false;
      }

      console.log(`[IGDB Steam] Missing data for "${gameName}":`, missingData);

      // IGDB-Daten abrufen
      const enrichedData = await IGDBService.enrichGameData(gameName, 'Steam');

      if (!enrichedData || Object.keys(enrichedData).length === 0) {
        console.log(`[IGDB Steam] No data found for: "${gameName}"`);
        return false;
      }

      // Nur fehlende Daten ergänzen
      const updateData: {
        description?: string;
        coverUrl?: string;
        releaseDate?: Date;
        developer?: string;
        publisher?: string;
        genres?: string[];
      } = {};

      // Beschreibung nur ergänzen wenn fehlt
      if (
        enrichedData.description &&
        (missingData.description || forceUpdate)
      ) {
        updateData.description = enrichedData.description;
      } // Cover nur ergänzen wenn kein Cover vorhanden ist (Steam-Cover haben Priorität)
      if (enrichedData.coverUrl && (!game.coverUrl || forceUpdate)) {
        updateData.coverUrl = enrichedData.coverUrl;
      }

      // Release-Datum nur ergänzen wenn fehlt
      if (
        enrichedData.releaseDate &&
        (missingData.releaseDate || forceUpdate)
      ) {
        updateData.releaseDate = enrichedData.releaseDate;
      }

      // Developer nur ergänzen wenn fehlt
      if (enrichedData.developer && (missingData.developer || forceUpdate)) {
        updateData.developer = enrichedData.developer;
      }

      // Publisher nur ergänzen wenn fehlt
      if (enrichedData.publisher && (missingData.publisher || forceUpdate)) {
        updateData.publisher = enrichedData.publisher;
      }

      // Genres nur ergänzen wenn fehlen
      if (
        enrichedData.genres &&
        enrichedData.genres.length > 0 &&
        (missingData.genres || forceUpdate)
      ) {
        updateData.genres = enrichedData.genres;
      }

      // Nur aktualisieren wenn neue Daten vorhanden sind
      if (Object.keys(updateData).length > 0) {
        await updateGame(gameId, updateData);
        console.log(
          `[IGDB Steam] Spiel "${gameName}" mit fehlenden IGDB-Daten ergänzt:`,
          Object.keys(updateData)
        );
        return true;
      }

      console.log(
        `[IGDB Steam] No missing data to supplement for: "${gameName}"`
      );
      return false;
    } catch (error) {
      console.error(
        `[IGDB Steam] Fehler beim Ergänzen von "${gameName}" mit IGDB-Daten:`,
        error
      );
      return false;
    }
  }

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
      id: userGame.id,
      title: userGame.game.title,
      description: userGame.game.description,
      coverUrl: userGame.game.coverUrl,
      releaseDate: userGame.game.releaseDate,
      developer: userGame.game.developer,
      publisher: userGame.game.publisher,
      genres: userGame.game.genres,
      playtimeMinutes: userGame.playtimeMinutes || 0,
      lastPlayed: userGame.lastPlayed,
      rating: userGame.rating,
      notes: userGame.notes,
      isInstalled: userGame.isInstalled,
      platforms: userGame.game.platformGames.map(pg => pg.platform.name),
      addedAt: userGame.addedAt
    };
  }
}
