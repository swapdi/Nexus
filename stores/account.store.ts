import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLoading } from '~/stores/loading.store';
import type {
  User,
  UserAchievement,
  UserGame,
  Wishlist
} from '~/prisma/client';
import type { FullUser } from '~/lib/services/types.service';

export const useAccountStore = defineStore('account', () => {
  // Loading store integration
  const { loading } = useLoading();
  type DBUser = User & {
    userAchievements: UserAchievement[];
    userGames: UserGame[];
    wishlistItems: Wishlist[];
  };
  const user = ref<DBUser | null>(null);

  const init = async () => {
    if (!user.value) {
      return await loading(
        'account-init',
        'Lade Benutzerdaten...',
        async () => {
          const { $client } = useNuxtApp();

          try {
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
            throw error;
          }
        },
        'data'
      );
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

  const signout = () => {
    user.value = null;
  };
  return {
    user,
    fullUser,
    init,
    signout
  };
});
