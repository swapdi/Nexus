<template>
  <header
    class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
    <div class="relative h-16 flex items-center">
      <!-- Logo - fest positioniert links über der Sidebar -->
      <div
        class="absolute left-0 top-0 flex items-center justify-center w-[78px] h-full">
        <NuxtLink to="/" class="flex items-center group">
          <img
            src="/favicon.ico"
            alt="Nexus"
            class="h-8 w-8 transition-all duration-200 group-hover:scale-105 drop-shadow-lg" />
        </NuxtLink>
      </div>
      <!-- User Section - fest positioniert rechts -->
      <div
        class="absolute right-0 top-0 flex items-center space-x-4 h-full pr-4 sm:pr-6 lg:pr-8">
        <UserCredits />
        <UserAccount />
      </div>
      <!-- Hauptinhalt mit Padding für Logo und User Section -->
      <div class="w-full pl-[78px] pr-[200px] h-full flex items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="flex items-center">
            <!-- Global Search -->
            <div class="flex-1 max-w-lg">
              <GlobalSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
  // Dunkles Gaming-Header ohne komplexe Ladeanzeigen
</script>
<style scoped>
  /* Dunkles Gaming-Header Design */
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(10px);
  }
</style>
