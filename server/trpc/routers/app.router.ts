import { router } from '~/server/trpc/trpc';
import { dealsRouter } from './deals.router';
import { gamesRouter } from './games.router';
import { userRouter } from './user.router';

export const appRouter = router({
  user: userRouter,
  games: gamesRouter,
  deals: dealsRouter
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;
