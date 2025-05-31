<template>
  <nav
    class="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-purple-500/20 shadow-2xl">
    <div class="px-6">
      <div class="flex justify-between items-center h-16">
        <!-- Logo & Titel - ganz links -->
        <div class="flex items-center">
          <NuxtLink to="/dashboard" class="flex items-center space-x-3 group">
            <div class="relative">
              <img
                src="/favicon.ico"
                alt="Nexus Logo"
                class="h-8 w-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
            </div>
            <span
              class="text-2xl font-bold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 transition-all duration-300 group-hover:from-purple-300 group-hover:via-blue-300 group-hover:to-cyan-300">
              Nexus
            </span>
          </NuxtLink>
        </div>
        <!-- Avatar & Dropdown Menü - ganz rechts -->
        <div class="flex items-center space-x-4">
          <!-- User Credits -->
          <UserCredits />

          <!-- User Account -->
          <UserAccount />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  /* Glow-Effekt für das Logo */
  .group:hover .group-hover\:scale-110 {
    filter: drop-shadow(0 0 8px rgba(147, 51, 234, 0.4));
  }

  /* Smooth gradient animation */
  @keyframes gradient-shift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
</style>
