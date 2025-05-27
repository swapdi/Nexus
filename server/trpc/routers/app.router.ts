import { router } from '~/server/trpc/trpc';
import { authRouter } from './auth.router';

export const appRouter = router({
  auth: authRouter
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;
