import { defineEventHandler, parseCookies } from 'h3';
import { serverSupabaseUser } from '#supabase/server';
import { AuthService } from '~/lib/services/auth.service';

export default defineEventHandler(async event => {
  if (!event.path.startsWith('/api/trpc')) {
    return;
  }

  const cookies = parseCookies(event);
  if (cookies && cookies['sb-access-token']) {
    const user = await serverSupabaseUser(event);
    if (user) {
      event.context.user = user;

      let dbUser = await AuthService.getUserBySupabaseId(user.id);

      if (!dbUser && user) {
        dbUser = await AuthService.createUser(
          user.id,
          user.user_metadata.full_name
            ? user.user_metadata.full_name
            : 'no name supplied'
        );
        console.log(`\n Created DB User \n ${JSON.stringify(dbUser)}\n`);
      }
      if (dbUser) event.context.dbUser = dbUser;
    }
  }
});
