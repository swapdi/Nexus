import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '~/prisma/client';

export const useAccountStore = defineStore('account', () => {
  const user = ref<User | null>(null);
  const init = async () => {
    const { $client } = useNuxtApp();
    if (!user.value) {
      const { dbUser: _user } = await $client.auth.getDBUser.query();
      if (_user) {
        user.value = _user;
      }
    }
  };

  const signout = () => {
    user.value = null;
  };

  return {
    user,
    init,
    signout
  };
});
