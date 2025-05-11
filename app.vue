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
      'GameVault ist deine zentrale Plattform zur Verwaltung all deiner PC-Spiele von Steam, Epic Games Store, GOG und mehr. Behalte den Überblick über deine gesamte Bibliothek, entdecke die besten Angebote und maximiere dein Spielerlebnis mit Gamification.',
    ogDescription:
      'GameVault ist deine zentrale Plattform zur Verwaltung all deiner PC-Spiele von Steam, Epic Games Store, GOG und mehr. Behalte den Überblick über deine gesamte Bibliothek, entdecke die besten Angebote und maximiere dein Spielerlebnis mit Gamification.',
    twitterCard: 'summary_large_image'
  });
</script>
