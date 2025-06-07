import type { inferAsyncReturnType } from '@trpc/server';
import { H3Event } from 'h3';
import { PrismaClient } from '~/prisma/client';

// Globale Prisma-Instanz für Entwicklung (verhindert zu viele Verbindungen)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function createContext(event: H3Event) {
  return {
    user: event.context.user, // the Supabase User
    dbUser: event.context.dbUser, // the corresponding Database User
    db: prisma, // Prisma Database Client
    event // required to enable setCookie and other context features
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
