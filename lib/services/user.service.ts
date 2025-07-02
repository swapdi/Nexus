import { PrismaClient, type User } from '~/prisma/client';

const prisma = new PrismaClient();

export interface FullUser extends User {
  userAchievements: Array<{
    achievement: {
      id: number;
      name: string;
      description: string;
      iconUrl: string | null;
      xpReward: number;
    };
    unlockedAt: Date;
  }>;
  userGames: Array<{
    id: number;
    gameId: number;
    playtimeMinutes: number | null;
    lastPlayed: Date | null;
    notes: string | null;
    isInstalled: boolean;
    isFavorite: boolean;
    addedAt: Date;
    game: {
      id: number;
      title: string;
      coverUrl: string | null;
    };
  }>;
  wishlistItems: Array<{
    id: number;
    gameId: number;
    addedAt: Date;
    game: {
      id: number;
      title: string;
      coverUrl: string | null;
    };
  }>;
}

export interface UserUpdateData {
  display_name?: string;
  email?: string;
  xp?: number;
  level?: number;
  credits?: number;
}

export interface UserStats {
  totalGames: number;
  totalPlaytimeHours: number;
  totalAchievements: number;
  currentLevel: number;
  currentXP: number;
  credits: number;
}

export namespace UserService {
  /**
   * Benutzer über Supabase UID finden (Auth-Funktion)
   */
  export async function getUserBySupabaseId(
    supabase_uid: string
  ): Promise<FullUser | null> {
    const user = await prisma.user.findFirst({
      where: { supabase_uid },
      include: {
        userAchievements: {
          include: {
            achievement: {
              select: {
                id: true,
                name: true,
                description: true,
                iconUrl: true,
                xpReward: true
              }
            }
          }
        },
        userGames: {
          include: {
            game: {
              select: {
                id: true,
                title: true,
                coverUrl: true
              }
            }
          }
        },
        wishlistItems: {
          include: {
            game: {
              select: {
                id: true,
                title: true,
                coverUrl: true
              }
            }
          }
        }
      }
    });

    return user as FullUser | null;
  }

  /**
   * Benutzer über ID finden
   */
  export async function getUserById(user_id: number): Promise<FullUser | null> {
    const user = await prisma.user.findFirst({
      where: { id: user_id },
      include: {
        userAchievements: {
          include: {
            achievement: {
              select: {
                id: true,
                name: true,
                description: true,
                iconUrl: true,
                xpReward: true
              }
            }
          }
        },
        userGames: {
          include: {
            game: {
              select: {
                id: true,
                title: true,
                coverUrl: true
              }
            }
          }
        },
        wishlistItems: {
          include: {
            game: {
              select: {
                id: true,
                title: true,
                coverUrl: true
              }
            }
          }
        }
      }
    });

    return user as FullUser | null;
  }

  /**
   * Neuen Benutzer erstellen (Auth-Funktion)
   */
  export async function createUser(
    supabase_uid: string,
    display_name: string
  ): Promise<FullUser> {
    const user = await prisma.user.create({
      data: {
        supabase_uid,
        display_name,
        xp: 0,
        level: 1,
        credits: 100 // Startguthaben
      },
      include: {
        userAchievements: {
          include: {
            achievement: {
              select: {
                id: true,
                name: true,
                description: true,
                iconUrl: true,
                xpReward: true
              }
            }
          }
        },
        userGames: {
          include: {
            game: {
              select: {
                id: true,
                title: true,
                coverUrl: true
              }
            }
          }
        },
        wishlistItems: {
          include: {
            game: {
              select: {
                id: true,
                title: true,
                coverUrl: true
              }
            }
          }
        }
      }
    });

    return user as FullUser;
  }

  /**
   * Benutzerprofil aktualisieren (Auth-Funktion)
   */
  export async function updateUser(
    user_id: number,
    data: UserUpdateData
  ): Promise<FullUser> {
    const user = await prisma.user.update({
      where: { id: user_id },
      data,
      include: {
        userAchievements: {
          include: {
            achievement: {
              select: {
                id: true,
                name: true,
                description: true,
                iconUrl: true,
                xpReward: true
              }
            }
          }
        },
        userGames: {
          include: {
            game: {
              select: {
                id: true,
                title: true,
                coverUrl: true
              }
            }
          }
        },
        wishlistItems: {
          include: {
            game: {
              select: {
                id: true,
                title: true,
                coverUrl: true
              }
            }
          }
        }
      }
    });

    return user as FullUser;
  }

  /**
   * Benutzer löschen (Auth-Funktion mit Kaskadierung)
   */
  export async function deleteUser(user_id: number): Promise<void> {
    // Zuerst alle abhängigen Datensätze löschen
    await prisma.$transaction([
      // UserAchievements löschen
      prisma.userAchievement.deleteMany({
        where: { userId: user_id }
      }),
      // UserGames löschen
      prisma.userGame.deleteMany({
        where: { userId: user_id }
      }),
      // Wishlist-Einträge löschen
      prisma.wishlist.deleteMany({
        where: { userId: user_id }
      }),
      // Schließlich den Benutzer löschen
      prisma.user.delete({
        where: { id: user_id }
      })
    ]);
  }

  /**
   * Benutzerstatistiken abrufen
   */
  export async function getUserStats(user_id: number): Promise<UserStats> {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      include: {
        userGames: true,
        userAchievements: true
      }
    });

    if (!user) {
      throw new Error('Benutzer nicht gefunden');
    }

    // Gesamtspielzeit in Stunden berechnen
    const totalPlaytimeMinutes = user.userGames.reduce(
      (sum, game) => sum + (game.playtimeMinutes || 0),
      0
    );
    const totalPlaytimeHours = Math.floor(totalPlaytimeMinutes / 60);

    return {
      totalGames: user.userGames.length,
      totalPlaytimeHours,
      totalAchievements: user.userAchievements.length,
      currentLevel: user.level,
      currentXP: user.xp,
      credits: user.credits
    };
  }

  /**
   * XP zum Benutzer hinzufügen und Level berechnen
   */
  export async function addXP(user_id: number, xp: number): Promise<FullUser> {
    const user = await prisma.user.findUnique({
      where: { id: user_id }
    });

    if (!user) {
      throw new Error('Benutzer nicht gefunden');
    }

    const newXP = user.xp + xp;
    const newLevel = Math.floor(newXP / 1000) + 1; // Beispiel: 1000 XP pro Level

    return updateUser(user_id, {
      xp: newXP,
      level: newLevel
    });
  }

  /**
   * Credits zum Benutzer hinzufügen oder abziehen
   */
  export async function updateCredits(
    user_id: number,
    credits: number
  ): Promise<FullUser> {
    const user = await prisma.user.findUnique({
      where: { id: user_id }
    });

    if (!user) {
      throw new Error('Benutzer nicht gefunden');
    }

    if (user.credits + credits < 0) {
      throw new Error('Nicht genügend Credits verfügbar');
    }

    return updateUser(user_id, {
      credits: user.credits + credits
    });
  }
}
