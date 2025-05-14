<script setup lang="ts">
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  const config = useRuntimeConfig(); // Hinzugefügt für redirectTo

  const notifyStore = useNotifyStore();

  const loading = ref(false);
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const signUpOk = ref(false);
  const provider = ref(''); // Für spezifisches Feedback bei OAuth Buttons

  const handleStandardSignup = async () => {
    if (password.value !== confirmPassword.value) {
      notifyStore.notify(
        'Die Passwörter stimmen nicht überein.',
        NotificationType.Error
      );
      return;
    }
    try {
      loading.value = true;
      provider.value = 'email';
      // Option: Metadaten für handle_new_user Trigger hinzufügen (z.B. display_name, falls vorhanden)
      // const { data, error } = await supabase.auth.signUp({
      //   email: email.value,
      //   password: password.value,
      //   options: {
      //     data: {
      //       display_name: 'Initialer Name' // Optional, falls du ein Namensfeld hinzufügst
      //     },
      //     emailRedirectTo: `${config.public.siteRootUrl}/confirm` // Wichtig für E-Mail Bestätigung
      //   }
      // });

      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          emailRedirectTo: `${config.public.siteRootUrl}/confirm` // Wichtig für E-Mail Bestätigung
        }
      });

      if (error) {
        throw error;
      } else {
        signUpOk.value = true;
        // Optional: E-Mail und Passwort-Felder leeren
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
      }
    } catch (error: any) {
      notifyStore.notify(
        error.message || 'Fehler bei der Registrierung.',
        NotificationType.Error
      );
    } finally {
      loading.value = false;
      provider.value = '';
    }
  };

  const handleOAuthSignup = async (
    providerName: 'google' | 'microsoft' | 'apple' | 'github'
  ) => {
    console.log(`handleOAuthSignup for ${providerName}`);
    try {
      loading.value = true;
      provider.value = providerName;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: providerName,
        options: {
          redirectTo: `${config.public.siteRootUrl}/confirm` // Konsistent mit Login und wichtig
        }
      });
      if (error) throw error;
    } catch (error: any) {
      notifyStore.notify(
        error.message || 'Fehler bei der OAuth-Anmeldung.',
        NotificationType.Error
      );
    } finally {
      loading.value = false;
      provider.value = '';
    }
  };

  definePageMeta({
    title: 'Registrieren' // Titel angepasst
  });

  watchEffect(async () => {
    if (user.value) {
      // Ggf. accountStore.init() hier, falls es nach Registrierung & Auto-Login relevant ist
      // Direkt nach SignUp ist der User oft noch nicht voll "aktiv" (E-Mail Bestätigung)
      // Aber Supabase setzt user.value oft schon.
      // navigateTo('/dashboard', { replace: true }); // Weiterleitung erfolgt erst nach E-Mail Bestätigung wirklich sinnvoll
    }
  });
</script>

<template>
  <div
    class="min-h-[80vh] flex items-center justify-center py-16 relative overflow-hidden text-white">
    <div class="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
    <div class="absolute inset-0 backdrop-blur-3xl" />
    <div
      class="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow-far" />
    <div
      class="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse-slow-far animation-delay-2000ms" />

    <div
      class="group max-w-md w-full p-8 bg-gray-800/80 rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.3)] backdrop-blur-sm relative z-10 border border-gray-700">
      <div
        class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
        style="
          box-shadow: 0 0 12px 3px rgba(168, 85, 247, 0.45),
            /* Lila */ 0 0 12px 3px rgba(59, 130, 246, 0.35),
            /* Blau */ 0 0 12px 3px rgba(16, 185, 129, 0.25); /* Grün */
        "
        aria-hidden="true" />

      <h1 class="text-3xl font-bold text-center mb-8 text-gray-100">
        Registrieren
      </h1>

      <div
        v-if="signUpOk"
        class="p-4 mb-6 bg-green-500/20 border border-green-500/50 rounded-md text-center text-green-300">
        Registrierung erfolgreich! Bitte überprüfe dein E-Mail-Postfach für
        einen Bestätigungslink.
      </div>

      <form v-else @submit.prevent="handleStandardSignup" class="space-y-6">
        <div>
          <label
            for="signup-email"
            class="block text-sm font-medium text-gray-300 mb-1"
            >E-Mail</label
          >
          <input
            v-model="email"
            id="signup-email"
            type="email"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="deine@email.de"
            required />
        </div>
        <div>
          <label
            for="signup-password"
            class="block text-sm font-medium text-gray-300 mb-1"
            >Passwort</label
          >
          <input
            v-model="password"
            id="signup-password"
            type="password"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Mindestens 6 Zeichen"
            required />
        </div>
        <div>
          <label
            for="signup-confirmPassword"
            class="block text-sm font-medium text-gray-300 mb-1"
            >Passwort bestätigen</label
          >
          <input
            v-model="confirmPassword"
            id="signup-confirmPassword"
            type="password"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Passwort erneut eingeben"
            required />
          <p
            v-if="password && confirmPassword && password !== confirmPassword"
            class="text-red-400 text-xs mt-1">
            Passwörter stimmen nicht überein.
          </p>
        </div>
        <button
          :disabled="
            loading || !email || !password || password !== confirmPassword
          "
          type="submit"
          class="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-md transition-all duration-300 transform hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="loading && provider === 'email'">Wird erstellt...</span>
          <span v-else>Konto erstellen</span>
        </button>
        <div class="text-center text-gray-400 text-sm">
          Bereits ein Konto?
          <NuxtLink
            to="/signin"
            class="text-blue-400 hover:text-blue-300 font-medium"
            >Anmelden</NuxtLink
          >
        </div>
      </form>

      <div v-if="!signUpOk" class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-600" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-800 text-gray-400"
              >Oder registrieren mit</span
            >
          </div>
        </div>

        <div class="mt-6 space-y-3">
          <button
            @click="handleOAuthSignup('google')"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-600 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name="logos:google-icon" class="w-5 h-5" />
            <span v-if="loading && provider === 'google'">Verbinde...</span>
            <span v-else>Mit Google fortfahren</span>
          </button>
          <button
            @click="handleOAuthSignup('microsoft')"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-600 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name="logos:microsoft-icon" class="w-5 h-5" />
            <span v-if="loading && provider === 'microsoft'">Verbinde...</span>
            <span v-else>Mit Microsoft fortfahren</span>
          </button>
          <button
            @click="handleOAuthSignup('apple')"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-600 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name="logos:apple" class="w-5 h-5" />
            <span v-if="loading && provider === 'apple'">Verbinde...</span>
            <span v-else>Mit Apple fortfahren</span>
          </button>
          <button
            @click="handleOAuthSignup('github')"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-600 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name="logos:github-icon" class="w-5 h-5" />
            <span v-if="loading && provider === 'github'">Verbinde...</span>
            <span v-else>Mit GitHub fortfahren</span>
          </button>
        </div>
      </div>

      <div class="mt-8 text-center">
        <p class="text-xs text-gray-500">
          Durch die Fortsetzung stimmst du unseren
          <NuxtLink
            to="/terms"
            class="text-gray-400 hover:text-gray-300 underline"
            >Nutzungsbedingungen</NuxtLink
          >
          und
          <NuxtLink
            to="/privacy"
            class="text-gray-400 hover:text-gray-300 underline"
            >Datenschutzrichtlinien</NuxtLink
          >
          zu.
        </p>
      </div>
    </div>
  </div>
</template>
