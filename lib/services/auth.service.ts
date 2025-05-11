import prisma_client from '~~/prisma/prisma.client';
import { fullDBUser, type FullDBUser } from './service.types';

export namespace AuthService {
  export async function getFullUserBySupabaseId(
    supabase_uid: string
  ): Promise<FullDBUser | null> {
    return prisma_client.user.findFirst({
      where: { supabase_uid },
      ...fullDBUser
    });
  }

  export async function getUserById(
    user_id: number
  ): Promise<FullDBUser | null> {
    return prisma_client.user.findFirstOrThrow({
      where: { id: user_id },
      ...fullDBUser
    });
  }

  export async function createUser(
    supabase_uid: string,
    display_name: string,
    email: string
  ): Promise<FullDBUser | null> {
    return prisma_client.user.create({
      data: {
        supabase_uid: supabase_uid,
        display_name: display_name,
        email: email
      },
      ...fullDBUser
    });
  }

  export async function deleteUser(user_id: number): Promise<FullDBUser> {
    return prisma_client.user.delete({
      where: { id: user_id },
      ...fullDBUser
    });
  }
}
