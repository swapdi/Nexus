import { defineEventHandler, parseCookies } from 'h3';
import { serverSupabaseUser } from '#supabase/server';
import { AuthService } from '../../lib/services/auth.service';
import type { User } from '@supabase/supabase-js';

// Definition des FullDBUser-Typs direkt in dieser Datei
export type FullDBUser = {
  id: number;
  supabase_uid: string;
  display_name: string | null;
  xp: number;
  level: number;
  credits: number;
} | null;

// Explicitly type our context by 'Merging' our custom types with the H3EventContext (https://stackoverflow.com/a/76349232/95242)
declare module 'h3' {
  interface H3EventContext {
    user?: User; // the Supabase User
    dbUser?: FullDBUser; // the corresponding Database User
    activeAccountId?: number; // the account ID that is active for the user
  }
}

export default defineEventHandler(async event => {
  if (
    !(event.path.startsWith('/api/trpc') || event.path.startsWith('/api/note'))
  ) {
    return; // only apply middleware to working routes
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
            : 'no name supplied',
          user.email ? user.email : 'no@email.supplied'
        );
        console.log(`\n Created DB User \n ${JSON.stringify(dbUser)}\n`);
      }

      // Hier fehlte die Zuweisung zum Kontext
      event.context.dbUser = dbUser;
    }
  }
});
