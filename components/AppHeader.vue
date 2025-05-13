<script setup lang="ts">
  const user = useSupabaseUser();
  const mobileMenuOpen = ref(false); // State for mobile menu toggle

  // Close mobile menu on navigation (optional, but good UX)
  watch(
    () => useRoute().path,
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
          <NuxtLink
            to="/"
            class="flex items-center space-x-3 rtl:space-x-reverse group">
            <img
              src="/favicon.ico"
              alt="Nexus Logo"
              class="h-7 w-8 transition-transform duration-300 ease-in-out group-hover:animate-pulse" />
            <span
              class="self-center text-xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 transition-opacity duration-300 group-hover:opacity-80">
              Nexus
            </span>
          </NuxtLink>
        </div>

        <div class="hidden lg:flex items-center space-x-6">
          <NuxtLink
            v-if="user"
            to="/dashboard"
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
            active-class="text-white bg-gray-700/70">
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/pricing"
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
            active-class="text-white bg-gray-700/70">
            Pricing
          </NuxtLink>
          <NuxtLink
            v-if="!user"
            to="/signin"
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
            active-class="text-white bg-gray-700/70">
            Sign In
          </NuxtLink>
          <NuxtLink
            v-if="!user"
            to="/signup"
            class="px-4 py-2 bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 hover:from-purple-700 hover:via-blue-600 hover:to-green-600 rounded-md text-sm font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-md hover:shadow-lg">
            Start for free
          </NuxtLink>
          <a
            v-if="!user"
            title="github"
            href="https://github.com/JavascriptMick/supanuxt-saas"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-white transition-colors">
            <Icon name="mdi:github" size="1.5em" />
          </a>
        </div>

        <div class="flex items-center">
          <Notifications
            class="mr-3 text-gray-400 hover:text-white transition-colors" />

          <UserAccount v-if="user" :user="user" />

          <div class="lg:hidden ml-3">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="mobileMenuOpen">
              <span class="sr-only">Open main menu</span>
              <svg
                v-if="!mobileMenuOpen"
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg
                v-if="mobileMenuOpen"
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="mobileMenuOpen"
      class="lg:hidden border-t border-gray-700/60"
      id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NuxtLink
          v-if="user"
          to="/dashboard"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          active-class="text-white bg-gray-700/70">
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="/pricing"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          active-class="text-white bg-gray-700/70">
          Pricing
        </NuxtLink>
        <NuxtLink
          v-if="!user"
          to="/signin"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          active-class="text-white bg-gray-700/70">
          Sign In
        </NuxtLink>
        <NuxtLink
          v-if="!user"
          to="/signup"
          class="block w-full text-center mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 hover:from-purple-700 hover:via-blue-600 hover:to-green-600 rounded-md text-base font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-md hover:shadow-lg">
          Start for free
        </NuxtLink>
        <a
          v-if="!user"
          title="github"
          href="https://github.com/JavascriptMick/supanuxt-saas"
          target="_blank"
          rel="noopener noreferrer"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
          <Icon name="mdi:github" class="inline-block mr-2" /> GitHub
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .group:hover .group-hover\:animate-pulse {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; /* Tailwind pulse animation */
  }
  .icon {
    vertical-align: middle;
  }
</style>
