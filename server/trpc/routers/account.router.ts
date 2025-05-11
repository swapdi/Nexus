import { router, publicProcedure } from '../trpc';

export const accountRouter = router({
  getDBUser: publicProcedure.query(({ ctx }) => {
    return {
      dbUser: ctx.dbUser
    };
  }),
  getActiveAccountId: publicProcedure.query(({ ctx }) => {
    return {
      activeAccountId: ctx.dbUser?.account?.id ?? null
    };
  })
});
