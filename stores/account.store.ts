import { defineStore } from 'pinia';
import type { FullUser } from '~/lib/services/types.service';

export const useAccountStore = defineStore('account', () => {
  const user = ref<FullUser | null>(null);
  const loadingUser = ref(false);
  const init = async () => {
    const { $client } = useNuxtApp();
    if (!user.value) {
      loadingUser.value = true;
      const result = await $client.auth.getDBUser.query();
      if (result) {
        user.value = {
          dbUser: result.dbUser,
          account: result.user
        };
        loadingUser.value = false;
      }
      console.log(user.value);
    }
  };

  const signout = () => {
    user.value = null;
  };

  return {
    user,
    loadingUser,
    init,
    signout
  };
});
