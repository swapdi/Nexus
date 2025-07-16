<template>
  <NuxtLink
    :to="'/credits'"
    class="relative flex items-center bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-full shadow-lg group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-cyan-500/50">
    <div
      class="flex items-center justify-center w-10 h-10 bg-slate-900/80 rounded-full border-2 border-slate-700 group-hover:border-cyan-400 transition-all duration-300">
      <img
        src="~/assets/images/NexusCredit.PNG"
        alt="Nexus Credit"
        class="w-6 h-6 object-contain transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110" />
    </div>
    <div class="pl-0 pr-4 py-2">
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400 group-hover:from-white group-hover:to-cyan-300 font-bold text-sm transition-all duration-300">
        {{ formattedCredits }}
      </span>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
  const userStore = useUserStore();
  // Grund: Credits formatieren für bessere Lesbarkeit (z.B. 1.234 statt 1234)
  const formattedCredits = computed(() => {
    const credits = userStore.user?.credits || 0;
    return credits.toLocaleString('de-DE');
  });
</script>
