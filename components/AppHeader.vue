<template>
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <img src="/NexusFont.png" alt="Nexus" class="h-8 w-auto" />
          </NuxtLink>
        </div>

        <!-- User Section -->
        <div class="flex items-center space-x-4">
          <UserCredits />
          <UserAccount />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  // Keine komplexen Ladeanzeigen oder Hintergrund-Operationen mehr
</script>

<style scoped>
  /* Einfaches, sauberes Header-Design */
  header {
    position: sticky;
    top: 0;
    z-index: 10;
  }
</style>
