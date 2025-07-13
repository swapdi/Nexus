<script setup lang="ts">
  const supabase = useSupabaseClient();
  const userStore = useUserStore();
  async function signout() {
    await supabase.auth.signOut();
    if (userStore) {
      userStore.signout();
    }
    navigateTo('/', { replace: true });
  }
</script>
<template>
  <button
    @click="signout"
    class="flex items-center w-full px-6 py-3 text-gray-300 hover:text-red-300 hover:bg-gradient-to-r hover:from-red-600/20 hover:to-transparent transition-all duration-200 group">
    <svg
      class="w-5 h-5 mr-3 text-red-400 group-hover:text-red-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
    </svg>
    <span class="font-medium">Abmelden</span>
  </button>
</template>
