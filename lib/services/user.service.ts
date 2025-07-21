import { PrismaClient } from '~/prisma/client';
const prisma = new PrismaClient();

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

    // Statistiken direkt berechnen (ohne Composable für Server-Side)
    const totalPlaytimeMinutes = user.userGames.reduce(
      (sum, game) => sum + (game.playtimeMinutes || 0),
      0
    );
    const totalPlaytimeHours = Math.floor(totalPlaytimeMinutes / 60);

    return {
      totalGames: user.userGames.length,
      totalPlaytimeHours
    };
  }
}
