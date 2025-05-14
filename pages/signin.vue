<script setup lang="ts">
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  const accountStore = useAccountStore();
  const notifyStore = useNotifyStore();

  const loading = ref(false);
  const email = ref('');
  const password = ref('');
  const config = useRuntimeConfig();

  const handleStandardSignin = async () => {
    console.log(
      `handleStandardSignin email.value:${email.value}, password.value:${password.value}`
    );
    try {
      loading.value = true;
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      });
      if (error) throw error;
    } catch (error) {
      notifyStore.notify(error, NotificationType.Error);
    } finally {
      loading.value = false;
    }
  };

  const handleGoogleSignin = async () => {
    console.log('handleGoogleSignin');
    try {
      loading.value = true;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${config.public.siteRootUrl}/confirm`
        }
      });
      if (error) throw error;
    } catch (error) {
      notifyStore.notify(error, NotificationType.Error);
    } finally {
      loading.value = false;
    }
  };
  definePageMeta({
    title: 'Anmelden'
  });
  watchEffect(async () => {
    if (user.value) {
      await accountStore.init();
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

      <h2 class="text-3xl font-bold text-center mb-8">Anmelden</h2>

      <form class="space-y-6" @submit.prevent="handleStandardSignin">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-300"
            >E-Mail</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="deine@email.de"
            required />
        </div>

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium text-gray-300"
              >Passwort</label
            >
            <NuxtLink
              to="/forgot-password"
              class="text-sm text-blue-400 hover:text-blue-300"
              >Vergessen?</NuxtLink
            >
          </div>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="••••••••"
            required />
        </div>

        <div class="flex items-center">
          <input
            id="remember"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500" />
          <label for="remember" class="ml-2 block text-sm text-gray-300"
            >Angemeldet bleiben</label
          >
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-md transition-all duration-300 transform hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="loading">Wird geladen...</span>
          <span v-else>Anmelden</span>
        </button>

        <div class="text-center text-gray-400 text-sm">
          Noch kein Konto?
          <NuxtLink to="/signup" class="text-blue-400 hover:text-blue-300"
            >Registrieren</NuxtLink
          >
        </div>
      </form>

      <div class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-600" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-800 text-gray-400"
              >Oder anmelden mit</span
            >
          </div>
        </div>

        <div class="mt-6 space-y-3">
          <button
            @click="handleGoogleSignin"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-600 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="20px"
              height="20px">
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            <span>Mit Google anmelden</span>
          </button>
          <button
            @click="handleOAuthSignin('microsoft')"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-600 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="20px"
              height="20px">
              <path
                fill="#ff5722"
                d="M6 6H22V22H6z"
                transform="rotate(-180 14 14)" />
              <path
                fill="#4caf50"
                d="M26 6H42V22H26z"
                transform="rotate(-180 34 14)" />
              <path
                fill="#ffc107"
                d="M26 26H42V42H26z"
                transform="rotate(-180 34 34)" />
              <path
                fill="#03a9f4"
                d="M6 26H22V42H6z"
                transform="rotate(-180 14 34)" />
            </svg>
            <span>Mit Microsoft anmelden</span>
          </button>
          <button
            @click="handleOAuthSignin('apple')"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-600 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              width="16px"
              height="20px">
              <path
                fill="currentColor"
                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <span>Mit Apple anmelden</span>
          </button>
          <button
            @click="handleOAuthSignin('github')"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-600 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20px"
              height="20px">
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span>Mit GitHub anmelden</span>
          </button>
        </div>
        <div class="mt-6 text-center">
          <p class="text-xs text-gray-400">
            Du kannst später deine Spielekonten (Steam, Epic, GOG) mit deinem
            Nexus-Account verknüpfen.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
