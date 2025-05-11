import { TRPCError } from '@trpc/server';
// import { setCookie } from 'h3'; // No longer needed if changeActiveAccount is removed
import {
  router,
  adminProcedure,
  publicProcedure,
  protectedProcedure,
  ownerProcedure // ownerProcedure might also need re-evaluation or become similar to adminProcedure
} from '../trpc';
// import { ACCOUNT_ACCESS } from '~~/prisma/account-access-enum'; // Removed
import { z } from 'zod';
import { AccountService } from '~~/lib/services/account.service';
// import type { MembershipWithAccount } from '~~/lib/services/service.types'; // Removed

/*
  Note: The authorization model has shifted to a 1-to-1 User-Account relationship.
  Procedures like adminProcedure and ownerProcedure will need to be updated in trpc.ts
  to reflect this, likely by checking ctx.dbUser.account directly instead of memberships.
  The Bang (!) operator on ctx.dbUser.account!.id assumes these procedures ensure its existence.
*/
export const accountRouter = router({
  getDBUser: publicProcedure.query(({ ctx }) => {
    // ctx.dbUser structure has changed due to schema update (user.account instead of user.memberships)
    return {
      dbUser: ctx.dbUser
    };
  }),
  getActiveAccountId: publicProcedure.query(({ ctx }) => {
    // With a 1-to-1 User-Account model, the active account ID is simply the user's account ID.
    // The concept of ctx.activeAccountId (populated by middleware) also needs review.
    return {
      activeAccountId: ctx.dbUser?.account?.id ?? null
    };
  }),
  // changeActiveAccount procedure removed as users now have a single, direct account.
  // The cookie 'preferred-active-account-id' is no longer relevant.

  changeAccountName: adminProcedure // adminProcedure needs update in trpc.ts
    .input(z.object({ new_name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // adminProcedure should ensure ctx.dbUser.account exists.
      if (!ctx.dbUser?.account) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User has no account.'
        });
      }
      const account = await AccountService.changeAccountName(
        ctx.dbUser.account.id,
        input.new_name
      );
      return {
        account
      };
    })
  // rotateJoinPassword procedure removed as the field is not on the Account model
  // and the corresponding service function was removed.

  // Removed acceptPendingMembership procedure
  // Removed rejectPendingMembership procedure
  // Removed deleteMembership procedure
  // Removed changeUserAccessWithinAccount procedure
  // Removed claimOwnershipOfAccount procedure
});
