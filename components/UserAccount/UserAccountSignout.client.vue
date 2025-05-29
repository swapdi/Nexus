<script setup lang="ts">
  const supabase = useSupabaseClient();
  const accountStore = useAccountStore();

  async function signout() {
    await supabase.auth.signOut();
    if (accountStore) {
      accountStore.signout();
    }
    navigateTo('/', { replace: true });
  }
</script>
<template>
  <a href="#" @click.prevent="signout()">Signout</a>
</template>
