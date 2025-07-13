import type { inferAsyncReturnType } from '@trpc/server';
import { H3Event } from 'h3';
export async function createContext(event: H3Event) {
  return {
    user: event.context.user, // the Supabase User
    dbUser: event.context.dbUser, // the corresponding Database User
    event // required to enable setCookie and other context features
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
