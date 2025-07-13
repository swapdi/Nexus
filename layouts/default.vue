<script setup lang="ts">
  const route = useRoute();
  const showStickyFooter = computed(() => route.path !== '/');
</script>
<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white">
    <LandingHeader />
    <Notifications
      class="mr-3 text-gray-400 hover:text-white transition-colors" />
    <div class="flex-grow">
      <main>
        <NuxtPage />
      </main>
    </div>
    <AppFooter v-if="showStickyFooter" />
  </div>
</template>
