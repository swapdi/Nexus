import { PrismaClient, type User } from '~/prisma/client';
import type { FullUser } from './types.service';
const prisma = new PrismaClient();

export namespace AuthService {
  export async function getUserBySupabaseId(
    supabase_uid: string
  ): Promise<User | null> {
    return prisma.user.findFirst({
      where: { supabase_uid },
      include: {
        userAchievements: {
          include: {
            achievement: true
          }
        },
        userGames: {
          include: {
            game: true
          }
        },
        wishlistItems: {
          include: {
            game: true
          }
        }
      }
    });
  }

  export async function getUserById(user_id: number): Promise<User | null> {
    return prisma.user.findFirst({
      where: { id: user_id },
      include: {
        userAchievements: {
          include: {
            achievement: true
          }
        },
        userGames: {
          include: {
            game: true
          }
        },
        wishlistItems: {
          include: {
            game: true
          }
        }
      }
    });
  }

  export async function createUser(
    supabase_uid: string,
    display_name: string
  ): Promise<User> {
    return prisma.user.create({
      data: {
        supabase_uid,
        display_name
      },
      include: {
        userAchievements: {
          include: {
            achievement: true
          }
        },
        userGames: {
          include: {
            game: true
          }
        },
        wishlistItems: {
          include: {
            game: true
          }
        }
      }
    });
  }

  export async function deleteUser(user_id: number): Promise<User> {
    return prisma.user.delete({
      where: { id: user_id },
      include: {
        userAchievements: {
          include: {
            achievement: true
          }
        },
        userGames: {
          include: {
            game: true
          }
        },
        wishlistItems: {
          include: {
            game: true
          }
        }
      }
    });
  }

  export async function updateUser(
    user_id: number,
    data: {
      display_name?: string;
      email?: string;
      xp?: number;
      level?: number;
      credits?: number;
    }
  ): Promise<User> {
    return prisma.user.update({
      where: { id: user_id },
      data,
      include: {
        userAchievements: {
          include: {
            achievement: true
          }
        },
        userGames: {
          include: {
            game: true
          }
        },
        wishlistItems: {
          include: {
            game: true
          }
        }
      }
    });
  }
}
