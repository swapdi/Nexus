import { PrismaClient, type User } from '~/prisma/client';
const prisma = new PrismaClient();
export interface FullUser extends User {
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
      name: string;
      coverUrl: string | null;
    };
  }>;
  wishlistItems: Array<{
    id: number;
    gameId: number;
    addedAt: Date;
    game: {
      id: number;
      name: string;
      coverUrl: string | null;
    };
  }>;
}
export interface UserUpdateData {
  display_name?: string;
  email?: string;
  steamId?: string | null;
  epicConnect?: boolean;
  gogConnect?: boolean;
}
export interface UserStats {
  totalGames: number;
  totalPlaytimeHours: number;
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
        userGames: {
          include: {
            game: {
              select: {
                id: true,
                name: true,
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
                name: true,
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
        userGames: {
          include: {
            game: {
              select: {
                id: true,
                name: true,
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
                name: true,
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
        userGames: {
          include: {
            game: {
              select: {
                id: true,
                name: true,
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
                name: true,
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
        userGames: {
          include: {
            game: {
              select: {
                id: true,
                name: true,
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
                name: true,
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
        userGames: true
      }
    });
    if (!user) {
      throw new Error('Benutzer nicht gefunden');
    }
    // Statistiken über Composable berechnen
    const { calculateUserStats } = useUserStats();
    return calculateUserStats(user);
  }
}
