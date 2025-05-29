import type {
  User,
  UserAchievement,
  UserGame,
  Wishlist
} from '~/prisma/client';
import type { FullUser } from '~/lib/services/types.service';

export const useAccountStore = defineStore('account', () => {
  type DBUser = User & {
    userAchievements: UserAchievement[];
    userGames: UserGame[];
    wishlistItems: Wishlist[];
  };
  const user = ref<DBUser | null>(null);
  const loadingUser = ref(false);
  const init = async () => {
    const { $client } = useNuxtApp();
    if (!user.value) {
      try {
        loadingUser.value = true;
        const { dbUser: _user } = await $client.auth.getDBUser.query();
        if (_user) {
          user.value = _user;
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        // Optionally handle the error, e.g., show a notification
        useNotifyStore().notify(
          'Fehler beim Laden des Benutzers. Bitte versuche es später erneut.',
          3
        );
        user.value = null;
      } finally {
        loadingUser.value = false;
      }
    }
  };

  const fullUser = computed<FullUser | null>(() => {
    const supabaseUser = useSupabaseUser().value;
    if (!user.value || !supabaseUser) return null;
    return {
      dbUser: user.value,
      account: supabaseUser
    };
  });
  console.log(fullUser.value);
  const signout = () => {
    user.value = null;
  };

  return {
    user,
    fullUser,
    loadingUser,
    init,
    signout
  };
});
