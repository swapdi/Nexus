import { router } from '~/server/trpc/trpc';
import { dealsRouter } from './deals.router';
import { gamesRouter } from './games.router';
import { librariesRouter } from './libraries.router';
import { messagesRouter } from './messages.router';
import { userRouter } from './user.router';
import { wishlistRouter } from './wishlist.router';

export const appRouter = router({
  user: userRouter,
  games: gamesRouter,
  deals: dealsRouter,
  libraries: librariesRouter,
  messages: messagesRouter,
  wishlist: wishlistRouter
});
// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;
