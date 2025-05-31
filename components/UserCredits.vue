<template>
  <NuxtLink :to="'/credits'">
    <div
      class="flex items-center space-x-2 rounded-md px-4 py-2 border-b-2 border-slate-500/30 hover:border-white transition-all duration-300 group">
      <!-- Münz-Icon mit subtiler Animation -->
      <div class="relative">
        <img
          src="/assets/images/NexusCredit.png"
          alt="Nexus Credit"
          class="w-6 h-6 object-contain drop-shadow-lg filter brightness-60" />
        <!-- Glitzer-Effekt -->
      </div>

      <!-- Credits-Anzahl -->
      <span
        class="text-slate-400 font-semibold text-sm group-hover:text-white transition-colors duration-300">
        {{ formattedCredits }}
      </span>

      <!-- "Credits" Label -->
      <span
        class="text-slate-400 text-xs font-medium group-hover:text-white transition-colors duration-300">
        Credits
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
  const accountStore = useAccountStore();

  // Grund: Credits formatieren für bessere Lesbarkeit (z.B. 1.234 statt 1234)
  const formattedCredits = computed(() => {
    const credits = accountStore.user?.credits || 0;
    return credits.toLocaleString('de-DE');
  });
</script>
