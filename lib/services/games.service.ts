import {
  PrismaClient,
  type Game,
  type UserGame,
  type Platform,
  type PlatformGame
} from '~/prisma/client';
const prisma = new PrismaClient();

export interface GameWithPlatforms {
  id: number;
  title: string;
  coverUrl: string | null;
  genres: string[];
  playtimeMinutes: number;
  lastPlayed: Date | null;
  rating: number | null;
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
  skipped: number;
  errors: number;
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
      coverUrl: userGame.game.coverUrl,
      genres: userGame.game.genres,
      playtimeMinutes: userGame.playtimeMinutes || 0,
      lastPlayed: userGame.lastPlayed,
      rating: userGame.rating,
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
}
