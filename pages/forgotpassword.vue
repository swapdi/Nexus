<script setup lang="ts">
  const supabase = useSupabaseClient();
  const config = useRuntimeConfig();
  const notifyStore = useNotifyStore();

  const loading = ref(false);
  const email = ref('');
  const emailSent = ref(false);

  const sendResetPasswordLink = async () => {
    try {
      loading.value = true;
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        email.value,
        {
          redirectTo: `${config.public.siteRootUrl}/resetpassword`
        }
      );
      if (error) throw error;
      else {
        emailSent.value = true;
        notifyStore.notify(
          'Passwort-Reset-Link wurde gesendet. Überprüfe dein E-Mail-Postfach.',
          NotificationType.Success
        );
      }
    } catch (error) {
      notifyStore.notify(error, NotificationType.Error);
    } finally {
      loading.value = false;
    }
  };

  definePageMeta({
    title: 'Passwort vergessen'
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

    <div
      class="group max-w-md w-full p-8 bg-gray-800/80 rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.3)] backdrop-blur-sm relative z-10 border border-gray-700">
      <div
        class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
        style="
          box-shadow: 0 0 12px 3px rgba(168, 85, 247, 0.45),
            0 0 12px 3px rgba(59, 130, 246, 0.35),
            0 0 12px 3px rgba(16, 185, 129, 0.25);
        "
        aria-hidden="true" />

      <h2 class="text-3xl font-bold text-center mb-8 text-white">
        Passwort vergessen
      </h2>

      <div
        v-if="emailSent"
        class="p-4 mb-6 bg-green-500/20 border border-green-500/50 rounded-md text-center text-green-300">
        <h3 class="font-semibold mb-2">E-Mail gesendet!</h3>
        <p class="text-sm">
          Wir haben dir einen Link zum Zurücksetzen deines Passworts an
          <strong>{{ email }}</strong> gesendet. Überprüfe dein E-Mail-Postfach
          und folge den Anweisungen.
        </p>
        <div class="mt-4 text-center">
          <NuxtLink
            to="/signin"
            class="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Zurück zur Anmeldung
          </NuxtLink>
        </div>
      </div>

      <form v-else @submit.prevent="sendResetPasswordLink" class="space-y-6">
        <div class="text-center text-gray-300 text-sm mb-6">
          Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum
          Zurücksetzen deines Passworts.
        </div>

        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-300"
            >E-Mail-Adresse</label
          >
          <input
            v-model="email"
            id="email"
            type="email"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder-gray-400"
            placeholder="deine@email.de"
            required />
        </div>

        <button
          :disabled="loading || email === ''"
          type="submit"
          class="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-md transition-all duration-300 transform hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="loading">Sende Link...</span>
          <span v-else>Passwort-Reset-Link senden</span>
        </button>

        <div class="text-center">
          <NuxtLink
            to="/signin"
            class="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Zurück zur Anmeldung
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
