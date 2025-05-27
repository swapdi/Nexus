/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';
import superjson from 'superjson';
import { AccountLimitError } from '~~/lib/services/errors'; // This might be irrelevant now if plans/limits are removed

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter: opts => {
    const { shape, error } = opts;
    // Consider if AccountLimitError is still applicable with the new model
    if (!(error.cause instanceof AccountLimitError)) {
      return shape;
    }
    return {
      ...shape,
      data: {
        ...shape.data,
        httpStatus: 401, // Or another appropriate status for limit errors
        code: 'UNAUTHORIZED' // Or a more specific code like 'ACCOUNT_LIMIT_EXCEEDED'
      }
    };
  }
});

/**
 * Auth middlewares
 **/
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User not authenticated.'
    });
  }
  return next({
    ctx: {
      user: ctx.user,
      dbUser: ctx.dbUser // Ensure dbUser is passed along (no longer has accounts)
    }
  });
});

/**
 * Procedures
 **/
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

export const router = t.router;
export const middleware = t.middleware;
