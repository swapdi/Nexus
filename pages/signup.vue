<script setup lang="ts">
// ===== PORTFOLIO DEMO VERSION =====
// Registrierung ist in der Demo deaktiviert

definePageMeta({
  title: \"Registrierung deaktiviert\"
});

// Redirect zur Signin (Demo-Login)
onMounted(() => {
  navigateTo(\"/signin\", { replace: true });
});
</script>

<template>
  <div
    class="min-h-[80vh] flex items-center justify-center py-16 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
    <div class="absolute inset-0 backdrop-blur-3xl" />
    
    <div class="max-w-md w-full p-8 bg-gray-800/80 rounded-lg shadow-xl backdrop-blur-sm relative z-10 border border-gray-700 text-center">
      <Icon name="heroicons:information-circle" class="text-6xl text-blue-500 mx-auto mb-4" />
      <h2 class="text-2xl font-bold mb-4">Portfolio Demo Modus</h2>
      <p class="text-gray-400 mb-6">
        Die Registrierung ist in der Portfolio-Demo deaktiviert. Du wirst automatisch mit dem Demo-Account angemeldet.
      </p>
      <p class="text-sm text-gray-500">
        Weiterleitung zur Demo...
      </p>
    </div>
  </div>
</template>
