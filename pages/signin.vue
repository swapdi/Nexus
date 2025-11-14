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

  // Demo-Login mit echten Supabase Credentials
  const handleDemoLogin = async () => {
    try {
      loading.value = true;

      // Login mit echtem Supabase Demo-User
      const { error } = await supabase.auth.signInWithPassword({
        email: 'demo@nexus.app',
        password: 'DemoNexus2024!'
      });

      if (error) {
        throw error;
      }

      // Warte kurz bis Supabase Session gesetzt ist
      await new Promise(resolve => setTimeout(resolve, 500));

      // DEMO MODE: Stelle Steam-Verbindung automatisch wieder her
      try {
        await userStore.linkSteamProfile('76561198275522280');
        console.log('Demo: Steam ID wiederhergestellt');
      } catch (steamError) {
        console.log('Demo: Steam ID konnte nicht wiederhergestellt werden', steamError);
        // Nicht kritisch, weiter zum Dashboard
      }

      notifyStore.notify(
        'Willkommen zur Nexus Demo!',
        NotificationType.Success
      );

      navigateTo('/dashboard', { replace: true });
    } catch (error: any) {
      console.error('Demo login error:', error);
      notifyStore.notify(
        'Demo-Login fehlgeschlagen: ' + (error.message || error),
        NotificationType.Error
      );
    } finally {
      loading.value = false;
    }
  };

  // Redirect wenn bereits eingeloggt
  onMounted(() => {
    if (user.value) {
      navigateTo('/dashboard', { replace: true });
    }
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
          box-shadow:
            0 0 12px 3px rgba(168, 85, 247, 0.45),
            0 0 12px 3px rgba(59, 130, 246, 0.35),
            0 0 12px 3px rgba(16, 185, 129, 0.25);
        "
        aria-hidden="true" />

      <div class="text-center">
        <Icon
          name="heroicons:rocket-launch"
          class="text-6xl text-purple-500 mx-auto mb-6" />
        <h2 class="text-3xl font-bold mb-4">Nexus Portfolio Demo</h2>
        <p class="text-gray-400 mb-8">
          Erlebe die Nexus Gaming-Plattform in Aktion.<br />
          Melde dich mit dem Demo-Account an.
        </p>

        <button
          @click="handleDemoLogin"
          :disabled="loading"
          class="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
          <span v-if="!loading" class="flex items-center justify-center gap-2">
            <Icon name="heroicons:play-circle" class="text-xl" />
            Demo starten
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            <Icon name="eos-icons:loading" class="text-xl" />
            Lädt...
          </span>
        </button>

        <p class="text-sm text-gray-500 mt-6">
          Demo-User:
          <span class="text-purple-400 font-mono">demo@nexus.app</span>
        </p>
      </div>
    </div>
  </div>
</template>
