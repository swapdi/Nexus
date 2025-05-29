<script setup lang="ts">
  import type { User } from '~/prisma/client';

  const accountStore = useAccountStore();
  const user = ref<User | null>(null);

  onMounted(async () => {
    await accountStore.init();
    user.value = accountStore.user;
  });
</script>

<template>
  <nav
    class="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/60 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/dashboard" class="flex items-center space-x-3 group">
            <img
              src="/favicon.ico"
              alt="Nexus Logo"
              class="h-7 w-8 transition-transform duration-300 group-hover:animate-pulse" />
            <span
              class="self-center text-xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 transition-opacity duration-300 group-hover:opacity-80">
              Nexus
            </span>
          </NuxtLink>
        </div>

        <!-- User Account (nur Avatar und Dropdown) -->
        <div class="flex items-center">
          <template v-if="user">
            <UserAccount :user="user" />
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  .group:hover .group-hover\:animate-pulse {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
