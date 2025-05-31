<script setup lang="ts">
  import auth from '~/middleware/auth';
  import type { User } from '~/prisma/client';
  const accountStore = useAccountStore();
  const user = ref<User | null>(null);
  const sidebarHovered = ref(false);
  definePageMeta({
    middleware: ['auth']
  });
  onMounted(async () => {
    accountStore.init();
    user.value = accountStore.user;
  });

  const handleSidebarHover = (isHovered: boolean) => {
    sidebarHovered.value = isHovered;
  };
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Fixed Header (über allem) -->
    <AppHeader />
    <!-- Sidebar -->
    <AppSidebar :user="user" @hover-change="handleSidebarHover" />
    <!-- Main Content Area -->
    <Notifications
      class="mr-3 text-gray-400 hover:text-white transition-colors" />
    <div
      class="pt-1 transition-all duration-500 ease-out relative z-10"
      :class="sidebarHovered ? 'ml-64' : 'ml-20'">
      <!-- Notifications -->

      <!-- Page Content -->
      <main class="min-h-[calc(100vh-4rem)] overflow-y-auto">
        <div class="container mx-auto py-6 sm:py-8 px-4">
          <NuxtPage />
        </div>
      </main>

      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<style scoped>
  /* Smooth transitions für den Content-Bereich */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>
