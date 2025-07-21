export const useUserStore = defineStore('user', () => {
  const notifyStore = useNotifyStore();
  const { $client } = useNuxtApp();

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
          try {
            const { dbUser: _user } = await $client.user.getCurrentUser.query();
            if (_user) {
              user.value = _user as FullUser;
            }
          } catch (error) {
            console.error('Error fetching user:', error);
            notifyStore.notify(
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
        try {
          const userStats = await $client.user.getUserStats.query();
          stats.value = userStats;
          return userStats;
        } catch (error) {
          console.error('Error fetching user stats:', error);
          notifyStore.notify(
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
        try {
          const updatedUser = await $client.user.updateProfile.mutate(data);
          user.value = updatedUser;
          notifyStore.notify('Profil erfolgreich aktualisiert', 1);
          return updatedUser;
        } catch (error) {
          console.error('Error updating profile:', error);
          notifyStore.notify('Fehler beim Aktualisieren des Profils', 3);
          throw error;
        }
      },
      'process'
    );
  };
  const deleteAccount = async () => {
    return await loading(
      'delete-account',
      'Konto wird gelöscht...',
      async () => {
        try {
          await $client.user.deleteAccount.mutate();
          user.value = null;
          stats.value = null;
          notifyStore.notify('Konto erfolgreich gelöscht', 1);
          return true;
        } catch (error) {
          console.error('Error deleting account:', error);
          notifyStore.notify('Fehler beim Löschen des Kontos', 3);
          throw error;
        }
      },
      'process'
    );
  };
  const linkSteamProfile = async (steamId: string) => {
    return await loading(
      'steam-link',
      'Steam-Profil wird verknüpft...',
      async () => {
        try {
          const result = await $client.user.linkSteamProfile.mutate({
            steamId: steamId.trim()
          });

          if (result.success) {
            // Refresh user data to get updated steamId
            await init();
            notifyStore.notify('Steam-Profil erfolgreich verknüpft!', 1);
          } else {
            notifyStore.notify(
              result.message || 'Fehler beim Verknüpfen des Steam-Profils',
              2
            );
          }

          return result;
        } catch (error: any) {
          console.error('Error linking Steam profile:', error);
          notifyStore.notify('Verknüpfung fehlgeschlagen', 3);
          throw error;
        }
      },
      'process'
    );
  };
  const unlinkSteamProfile = async () => {
    return await loading(
      'steam-unlink',
      'Steam-Profil wird getrennt...',
      async () => {
        try {
          const result = await $client.user.unlinkSteamProfile.mutate();

          if (result.success) {
            // Refresh user data to remove steamId
            await init();
            notifyStore.notify('Steam-Profil erfolgreich getrennt!', 1);
          } else {
            notifyStore.notify(
              result.message || 'Fehler beim Trennen des Steam-Profils',
              2
            );
          }

          return result;
        } catch (error: any) {
          console.error('Error unlinking Steam profile:', error);
          notifyStore.notify('Trennung fehlgeschlagen', 3);
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
    deleteAccount,
    linkSteamProfile,
    unlinkSteamProfile,
    signout
  };
});
