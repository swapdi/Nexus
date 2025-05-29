<script setup lang="ts">
  import type { User } from '~/prisma/client';

  const accountStore = useAccountStore();
  const user = ref<User | null>(null);
  const route = useRoute();
  const mobileMenuOpen = ref(false);

  onMounted(async () => {
    await accountStore.init();
    user.value = accountStore.user;
  });
  watch(
    () => route.path,
    () => {
      mobileMenuOpen.value = false;
    }
  );
</script>

<template>
  <nav
    class="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/60 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <img
              src="/favicon.ico"
              alt="Nexus Logo"
              class="h-7 w-8 transition-transform duration-300 group-hover:animate-pulse" />
            <span
              class="self-center text-xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 transition-opacity duration-300 group-hover:opacity-80"
              >Nexus</span
            >
          </NuxtLink>
        </div>

        <div class="hidden lg:flex items-center space-x-6">
          <NuxtLink
            to="/dashboard"
            class="nav-link"
            active-class="nav-link-active-exact"
            >Dashboard</NuxtLink
          >
          <NuxtLink
            to="/my-games"
            class="nav-link"
            active-class="nav-link-active-exact"
            >Meine Spiele</NuxtLink
          >
          <NuxtLink
            to="/deals"
            class="nav-link"
            active-class="nav-link-active-exact"
            >Angebote</NuxtLink
          >
        </div>

        <div class="flex items-center">
          <template v-if="user">
            <UserAccount :user="user" />
          </template>
          <div class="lg:hidden ml-3">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu-app">
              <span class="sr-only">Hauptmenü öffnen</span>
              <Icon
                v-if="!mobileMenuOpen"
                name="heroicons:bars-3-20-solid"
                class="block h-6 w-6"
                aria-hidden="true" />
              <Icon
                v-else
                name="heroicons:x-mark-20-solid"
                class="block h-6 w-6"
                aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="mobileMenuOpen"
      class="lg:hidden border-t border-gray-700/60"
      id="mobile-menu-app">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NuxtLink
          to="/dashboard"
          class="mobile-link"
          active-class="mobile-link-active-exact"
          >Dashboard</NuxtLink
        >
        <NuxtLink
          to="/my-games"
          class="mobile-link"
          active-class="mobile-link-active-exact"
          >Meine Spiele</NuxtLink
        >
        <NuxtLink
          to="/deals"
          class="mobile-link"
          active-class="mobile-link-active-exact"
          >Angebote</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>

<style scoped>
  .nav-link {
    @apply px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors;
  }
  .nav-link-active-exact {
    @apply text-white bg-gray-700/70;
  } /* Für exakte Übereinstimmung */
  .mobile-link {
    @apply block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors;
  }
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .group:hover .group-hover\:animate-pulse {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
