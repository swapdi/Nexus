<script setup lang="ts">
  // ===== PORTFOLIO DEMO VERSION =====
  // Diese Version ermöglicht automatisches Anmelden mit Demo-User
  // Demo-User: ID 999, Steam ID 76561198275522280
  
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  const userStore = useUserStore();
  const notifyStore = useNotifyStore();
  const loading = ref(false);
  
  definePageMeta({
    title: 'Demo Anmeldung'
  });
  
  // Auto-Login mit Demo-User (ohne echte Supabase Auth)
  const handleDemoLogin = async () => {
    try {
      loading.value = true;
      
      // Für die Demo: Simuliere User-Objekt im Store
      // In der echten Demo würden wir den User direkt aus der DB laden
      await userStore.loadDemoUser(999);
      
      notifyStore.notify('Willkommen zur Nexus Demo!', NotificationType.Success);
      navigateTo('/dashboard', { replace: true });
    } catch (error) {
      notifyStore.notify('Demo-Login fehlgeschlagen: ' + error, NotificationType.Error);
    } finally {
      loading.value = false;
    }
  };
  
  // Redirect wenn bereits eingeloggt
  watchEffect(async () => {
    if (user.value || userStore.user) {
      navigateTo('/dashboard', { replace: true });
    }
  });
  
  // Auto-Login beim Mount
  onMounted(() => {
    handleDemoLogin();
  });
</script>
<template>
  <div
    class="min-h-[80vh] flex items-center justify-center py-16 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
    <div class="absolute inset-0 backdrop-blur-3xl" />
    <div
      class="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl" />
    <div
      class="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl" />
    
    <!-- Demo Loading Card -->
    <div
      class="group max-w-md w-full p-8 bg-gray-800/80 rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.3)] backdrop-blur-sm relative z-10 border border-gray-700">
      <div
        class="absolute inset-0 rounded-lg opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
        style="
          box-shadow: 0 0 12px 3px rgba(168, 85, 247, 0.45),
            0 0 12px 3px rgba(59, 130, 246, 0.35),
            0 0 12px 3px rgba(16, 185, 129, 0.25);
        "
        aria-hidden="true" />
      
      <div class="text-center">
        <Icon name="heroicons:rocket-launch" class="text-6xl text-purple-500 mx-auto mb-6 animate-pulse" />
        <h2 class="text-3xl font-bold mb-4">Nexus Portfolio Demo</h2>
        <p class="text-gray-400 mb-8">
          Du wirst automatisch mit dem Demo-Account angemeldet...
        </p>
        <div class="flex items-center justify-center gap-2">
          <div class="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
          <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
          <div class="w-3 h-3 bg-green-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
        </div>
      </div>
    </div>
  </div>
</template>
