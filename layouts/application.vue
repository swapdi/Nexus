<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white">
    <AppHeader />
    <Notifications
      class="mr-3 text-gray-400 hover:text-white transition-colors" />
    <div class="flex-grow">
      <main class="container mx-auto py-6 sm:py-8 px-4">
        <NuxtPage />
      </main>
    </div>
    <AppFooter />
  </div>
</template>
