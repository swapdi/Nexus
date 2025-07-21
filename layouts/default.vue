<script setup lang="ts">
  const route = useRoute();
  const showStickyFooter = computed(() => route.path !== '/');
</script>
<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white">
    <LandingHeader />

    <!-- Loading States -->
    <LoadingOverlay />
    <!-- Blockierende Operationen -->
    <LoadingIndicator />
    <!-- Nicht-blockierende API-Calls -->
    <LoadingMinimized />
    <!-- Minimierte blockierende Operationen -->

    <!-- Notifications -->
    <Notifications />

    <div class="flex-grow">
      <main>
        <NuxtPage />
      </main>
    </div>
    <AppFooter v-if="showStickyFooter" />
  </div>
</template>
