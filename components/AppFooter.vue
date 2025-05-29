<template>
  <footer
    class="bottom-0 z-40 bg-gray-900/80 backdrop-blur-md border-t border-gray-700/60 text-gray-400 text-sm relative overflow-hidden">
    <div
      class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 animate-border-flow"
      style="background-size: 200% 100%" />

    <div class="container mx-auto px-4 py-3">
      <div
        class="flex flex-col sm:flex-row justify-between items-center gap-y-2">
        <p class="text-center sm:text-left">
          &copy; {{ new Date().getFullYear() }} Nexus. Alle Rechte vorbehalten.
        </p>

        <div
          class="flex flex-wrap justify-center sm:justify-end items-center gap-x-4 gap-y-1">
          <NuxtLink
            to="/terms"
            class="hover:text-white transition-colors duration-200">
            Nutzungsbedingungen
          </NuxtLink>
          <span class="hidden sm:inline">|</span>
          <NuxtLink
            to="/privacy"
            class="hover:text-white transition-colors duration-200">
            Datenschutz
          </NuxtLink>
          <span class="hidden sm:inline">|</span>
          <NuxtLink
            to="/contact"
            class="hover:text-white transition-colors duration-200">
            Kontakt
          </NuxtLink>
          <span class="hidden sm:inline">|</span>
          <button
            type="button"
            data-cc="show-preferencesModal"
            class="bg-transparent border-none p-0 hover:text-white transition-colors duration-200 cursor-pointer">
            Cookie-Einstellungen
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  @keyframes borderFlow {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  }

  .animate-border-flow {
    animation: borderFlow 5s linear infinite;
  }

  button.bg-transparent {
    line-height: inherit;
  }
</style>
