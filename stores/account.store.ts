import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { FullDBUser } from '~~/lib/services/service.types';

export const useAccountStore = defineStore('account', () => {
  const dbUser = ref<FullDBUser | null>(null);
  const activeAccountId = ref<number | null>(null);
  const activeAccount = computed(() => dbUser.value?.account);

  const init = async () => {
    const { $client } = useNuxtApp();
    if (!dbUser.value) {
      const { dbUser: _dbUser } = await $client.auth.getDBUser.query();
      if (_dbUser) {
        dbUser.value = _dbUser;
        if (_dbUser.account) {
          activeAccountId.value = _dbUser.account.id;
        }
      }
    }
  };

  const signout = () => {
    dbUser.value = null;
    activeAccountId.value = null;
  };

  const changeAccountName = async (new_name: string) => {
    if (!activeAccount.value) {
      return;
    }
    const { $client } = useNuxtApp();
    const { account } = await $client.account.changeAccountName.mutate({
      new_name
    });
    if (account && dbUser.value && dbUser.value.account) {
      dbUser.value.account.name = account.name;
    }
  };

  return {
    dbUser,
    activeAccountId,
    activeAccount,
    init,
    signout,
    changeAccountName
  };
});
