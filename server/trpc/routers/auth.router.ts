import { publicProcedure, router } from '../trpc';

export const authRouter = router({
  getDBUser: publicProcedure.query(({ ctx }) => {
    return {
      dbUser: ctx.dbUser // Für Rückwärtskompatibilität, enthält jetzt User ohne Account
    };
  }),

  getUser: publicProcedure.query(({ ctx }) => {
    return {
      user: ctx.dbUser // Neuer Name für den User
    };
  })
});
