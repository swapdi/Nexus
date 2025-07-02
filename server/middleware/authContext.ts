import { serverSupabaseUser } from '#supabase/server';
import { defineEventHandler } from 'h3';
import { UserService } from '~/lib/services/user.service';

export default defineEventHandler(async event => {
  if (!event.path.startsWith('/api/trpc')) {
    return;
  }
  try {
    const user = await serverSupabaseUser(event);
    if (user) {
      event.context.user = user;
      let dbUser = await UserService.getUserBySupabaseId(user.id);
      if (!dbUser && user) {
        dbUser = await UserService.createUser(
          user.id,
          user.user_metadata.full_name
            ? user.user_metadata.full_name
            : 'no name supplied'
        );
      }
      if (dbUser) {
        event.context.dbUser = dbUser;
      }
    }
  } catch (error) {
    console.error('🚨 Error in auth middleware:', error);
  }
});
