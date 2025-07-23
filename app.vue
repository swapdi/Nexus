<script setup lang="ts">
  useSeoMeta({
    titleTemplate: titleChunk => {
      return titleChunk
        ? `${titleChunk}`
        : 'Nexus - Deine All-in-One Spieleverwaltung';
    },
    ogTitle: 'Nexus - Deine All-in-One Spieleverwaltung',
    ogUrl: 'https://nexus.swapdi.de/',
    ogType: 'website',
    description:
      'Nexus ist deine zentrale Plattform zur Verwaltung all deiner PC-Spiele von Steam, Epic Games Store, GOG und mehr. Behalte den Überblick über deine gesamte Bibliothek, entdecke die besten Angebote und maximiere dein Spielerlebnis mit Gamification.',
    ogDescription:
      'Nexus ist deine zentrale Plattform zur Verwaltung all deiner PC-Spiele von Steam, Epic Games Store, GOG und mehr. Behalte den Überblick über deine gesamte Bibliothek, entdecke die besten Angebote und maximiere dein Spielerlebnis mit Gamification.'
  });
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LoadingOverlay />
  </div>
</template>
