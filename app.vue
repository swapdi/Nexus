<template>
  <div class="flex flex-col min-h-screen bg-base-100">
    <AppHeader />
    <div class="flex-grow">
      <main>
        <NuxtPage />
      </main>
    </div>
    <AppFooter />
  </div>
</template>
<script setup lang="ts">
  useSeoMeta({
    title: 'GameVault',
    ogTitle: 'GameVault',
    ogUrl: 'https://gamevault.netlify.app/',
    ogType: 'website',
    // fbAppId: '1111222233334444', // you will need this if you authenticate with fb
    description:
      'With SupaNuxt SaaS, you can easily get started building your next web application. Our pre-configured tech stack and industry leading features make it easy to get up and running in no time.',
    ogDescription:
      'With SupaNuxt SaaS, you can easily get started building your next web application. Our pre-configured tech stack and industry leading features make it easy to get up and running in no time.',
    twitterCard: 'summary_large_image'
  });
</script>
