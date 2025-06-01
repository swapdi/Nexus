import { router } from '~/server/trpc/trpc';
import { authRouter } from './auth.router';
import { gamesRouter } from './games.router';

export const appRouter = router({
  auth: authRouter,
  games: gamesRouter
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;
