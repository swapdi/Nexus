import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { FullUser, UserStats } from '~/lib/services/user.service';
import { useLoading } from '~/stores/loading.store';

export const useUserStore = defineStore('user', () => {
  // Loading store integration
  const { loading } = useLoading();

  const user = ref<FullUser | null>(null);
  const stats = ref<UserStats | null>(null);

  const init = async () => {
    if (!user.value) {
      return await loading(
        'account-init',
        'Lade Benutzerdaten...',
        async () => {
          const { $client } = useNuxtApp();

          try {
            const { dbUser: _user } = await $client.user.getCurrentUser.query();
            if (_user) {
              user.value = _user as FullUser;
            }
          } catch (error) {
            console.error('Error fetching user:', error);
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

  const loadStats = async () => {
    return await loading(
      'user-stats',
      'Lade Benutzerstatistiken...',
      async () => {
        const { $client } = useNuxtApp();

        try {
          const userStats = await $client.user.getUserStats.query();
          stats.value = userStats;
          return userStats;
        } catch (error) {
          console.error('Error fetching user stats:', error);
          useNotifyStore().notify(
            'Fehler beim Laden der Statistiken. Bitte versuche es später erneut.',
            3
          );
          throw error;
        }
      },
      'data'
    );
  };

  const updateProfile = async (data: {
    display_name?: string;
    email?: string;
  }) => {
    return await loading(
      'update-profile',
      'Profil wird aktualisiert...',
      async () => {
        const { $client } = useNuxtApp();

        try {
          const updatedUser = await $client.user.updateProfile.mutate(data);
          user.value = updatedUser;
          useNotifyStore().notify('Profil erfolgreich aktualisiert', 1);
          return updatedUser;
        } catch (error) {
          console.error('Error updating profile:', error);
          useNotifyStore().notify('Fehler beim Aktualisieren des Profils', 3);
          throw error;
        }
      },
      'process'
    );
  };

  const addXP = async (xp: number) => {
    const { $client } = useNuxtApp();
    try {
      const updatedUser = await $client.user.addXP.mutate({ xp });
      user.value = updatedUser;
      return updatedUser;
    } catch (error) {
      console.error('Error adding XP:', error);
      throw error;
    }
  };

  const updateCredits = async (credits: number) => {
    const { $client } = useNuxtApp();
    try {
      const updatedUser = await $client.user.updateCredits.mutate({ credits });
      user.value = updatedUser;
      return updatedUser;
    } catch (error) {
      console.error('Error updating credits:', error);
      throw error;
    }
  };

  const deleteAccount = async () => {
    return await loading(
      'delete-account',
      'Konto wird gelöscht...',
      async () => {
        const { $client } = useNuxtApp();

        try {
          await $client.user.deleteAccount.mutate();
          user.value = null;
          stats.value = null;
          useNotifyStore().notify('Konto erfolgreich gelöscht', 1);
          return true;
        } catch (error) {
          console.error('Error deleting account:', error);
          useNotifyStore().notify('Fehler beim Löschen des Kontos', 3);
          throw error;
        }
      },
      'process'
    );
  };

  const signout = () => {
    user.value = null;
    stats.value = null;
  };

  return {
    user,
    stats,
    init,
    loadStats,
    updateProfile,
    addXP,
    updateCredits,
    deleteAccount,
    signout
  };
});
