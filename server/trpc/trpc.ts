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
// import { ACCOUNT_ACCESS } from '~~/prisma/account-access-enum'; // Removed
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
      dbUser: ctx.dbUser, // Ensure dbUser is passed along
      // Ensure activeAccountId is number | undefined
      activeAccountId: ctx.dbUser?.account?.id // This will be number | undefined
    }
  });
});

// Renamed and simplified from isMemberWithAccessesForActiveAccountId
const hasAccountAccess = t.middleware(({ next, ctx }) => {
  if (!ctx.dbUser?.account) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User does not have an associated account.'
    });
  }
  // No specific access levels like OWNER, ADMIN anymore in the context of memberships
  // The user associated with the account is implicitly the owner/admin.
  return next({ ctx });
});

export const isAccountWithFeature = (feature: string) =>
  t.middleware(({ next, ctx }) => {
    if (!ctx.dbUser?.account) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User does not have an associated account.'
      });
    }

    if (!ctx.dbUser.account.features.includes(feature)) {
      throw new TRPCError({
        code: 'FORBIDDEN', // Changed from UNAUTHORIZED for clarity
        message: `Account does not have the ${feature} feature.`
      });
    }

    return next({ ctx });
  });

/**
 * Procedures
 **/
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

// memberProcedure now simply checks if the user has an account.
export const memberProcedure = protectedProcedure.use(hasAccountAccess);

// readWriteProcedure, adminProcedure, and ownerProcedure become aliases of memberProcedure
// as the 1-to-1 relationship implies full control by the associated user.
// If finer-grained control within an account is needed in the future (e.g., for features),
// this would need a different approach, perhaps by checking specific fields on the Account model.
export const readWriteProcedure = memberProcedure;
export const adminProcedure = memberProcedure;
export const ownerProcedure = memberProcedure;

export const accountHasSpecialFeature = isAccountWithFeature('SPECIAL_FEATURE');

export const router = t.router;
export const middleware = t.middleware;
