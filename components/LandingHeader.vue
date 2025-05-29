<script setup lang="ts">
  const user = useSupabaseUser();
  const route = useRoute();
  const mobileMenuOpen = ref(false);

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
        <div class="flex items-center space-x-4 md:space-x-6">
          <NuxtLink
            to="/"
            class="flex-shrink-0 flex items-center space-x-3 group">
            <img
              src="/favicon.ico"
              alt="Nexus Logo"
              class="h-7 w-8 transition-transform duration-300 group-hover:animate-pulse" />
            <span
              class="self-center text-xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 transition-opacity duration-300 group-hover:opacity-80"
              >Nexus</span
            >
          </NuxtLink>

          <div class="hidden lg:flex items-center space-x-3 md:space-x-5">
            <NuxtLink to="/#features" class="nav-link">Features</NuxtLink>
            <NuxtLink
              to="/pricing"
              class="nav-link"
              active-class="nav-link-active-exact"
              >Pricing</NuxtLink
            >
            <a
              title="GitHub"
              href="https://github.com/swapdi/Nexus"
              target="_blank"
              rel="noopener noreferrer"
              class="nav-link text-gray-400 hover:text-white transition-colors ml-1">
              <Icon name="mdi:github" size="1.5em" />
            </a>
          </div>
        </div>

        <div class="flex items-center">
          <div class="hidden lg:flex items-center space-x-3 md:space-x-4">
            <template v-if="!user">
              <NuxtLink
                to="/signin"
                class="nav-link whitespace-nowrap"
                active-class="nav-link-active-exact"
                >Anmelden</NuxtLink
              >
              <NuxtLink
                to="/signup"
                class="primary-cta-button whitespace-nowrap"
                >Kostenlos starten</NuxtLink
              >
            </template>
            <template v-else>
              <NuxtLink
                to="/dashboard"
                class="primary-cta-button whitespace-nowrap"
                >Zum Dashboard</NuxtLink
              >
            </template>
          </div>

          <div class="lg:hidden ml-3">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu-landing">
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
      class="lg:hidden border-t border-gray-700/60 positioned absolute top-16 left-0 right-0 bg-gray-900/80 overflow-hidden"
      id="mobile-menu-landing">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NuxtLink to="/#features" class="mobile-link">Features</NuxtLink>
        <NuxtLink
          to="/pricing"
          class="mobile-link"
          active-class="mobile-link-active-exact"
          >Pricing</NuxtLink
        >

        <hr class="my-2 border-gray-700/50" />

        <template v-if="!user">
          <NuxtLink
            to="/signin"
            class="mobile-link"
            active-class="mobile-link-active-exact"
            >Anmelden</NuxtLink
          >
          <NuxtLink to="/signup" class="mobile-cta-button mt-1"
            >Kostenlos starten</NuxtLink
          >
        </template>
        <template v-else>
          <NuxtLink to="/dashboard" class="mobile-cta-button mt-1"
            >Zum Dashboard</NuxtLink
          >
        </template>
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
  }
  .primary-cta-button {
    @apply px-4 py-2 bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 hover:from-purple-700 hover:via-blue-600 hover:to-green-600 rounded-md text-sm font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-md hover:shadow-lg;
  }

  .mobile-link {
    @apply block px-3 py-2 rounded-md text-base text-center font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors;
  }
  .mobile-cta-button {
    @apply block w-full text-center mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 hover:from-purple-700 hover:via-blue-600 hover:to-green-600 rounded-md text-base font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-md hover:shadow-lg;
  }

  /* Animationen und andere Stile bleiben erhalten */
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
