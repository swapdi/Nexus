<template>
  <div class="flex flex-col min-h-screen bg-base-100">
    <AppHeader />
    <div class="flex-grow">
      <main>
        <NuxtPage />
      </main>
    </div>
    <AppFooter v-if="$route.path !== '/'" />
  </div>
</template>
<script setup lang="ts">
  useSeoMeta({
    title: 'Nexus',
    ogTitle: 'Nexus',
    ogUrl: 'https://nexus.netlify.app/',
    ogType: 'website',
    description:
      'Nexus ist deine zentrale Plattform zur Verwaltung all deiner PC-Spiele von Steam, Epic Games Store, GOG und mehr. Behalte den Überblick über deine gesamte Bibliothek, entdecke die besten Angebote und maximiere dein Spielerlebnis mit Gamification.',
    ogDescription:
      'Nexus ist deine zentrale Plattform zur Verwaltung all deiner PC-Spiele von Steam, Epic Games Store, GOG und mehr. Behalte den Überblick über deine gesamte Bibliothek, entdecke die besten Angebote und maximiere dein Spielerlebnis mit Gamification.',
    twitterCard: 'summary_large_image'
  });
</script>
