<template>
  <div class="pb-16">
    <!-- Hero-Bereich mit RGB-Effekten -->
    <section class="py-16 relative overflow-hidden">
      <!-- RGB-Hintergrund-Animation -->
      <div
        class="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px] opacity-20" />
      <div
        class="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-purple-500/20 to-transparent animate-pulse-slow" />
      <div
        class="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-blue-500/20 to-transparent animate-pulse-slow" />

      <div class="container mx-auto px-4 py-12 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1
            class="text-5xl md:text-7xl font-extrabold mb-6 animate-text bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
            GameVault
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-8">
            Deine ultimative Spieleverwaltung für alle Plattformen
          </p>
          <p class="text-lg text-gray-400 mb-12">
            Steam, Epic Games, GOG und mehr - Alles an einem Ort
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <button
              class="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              Kostenlos starten
            </button>
            <button
              class="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-md text-lg font-medium transition-all duration-300">
              Mehr erfahren
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features-Bereich -->
    <section class="py-24 bg-gray-800/50 relative">
      <!-- RGB-Border-Effekt -->
      <div
        class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500" />

      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
          Features
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div
            class="p-6 bg-gray-800/70 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(124,58,237,0.2)]">
            <div
              class="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <span class="text-xl">🎮</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">Alle Spiele an einem Ort</h3>
            <p class="text-gray-400">
              Importiere und verwalte deine Spielebibliotheken von Steam, Epic
              Games, GOG und weiteren Plattformen in einer übersichtlichen
              Oberfläche.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="p-6 bg-gray-800/70 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <div
              class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4">
              <span class="text-xl">💰</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">Die besten Deals</h3>
            <p class="text-gray-400">
              Verpasse nie wieder Angebote oder kostenlose Spiele. GameVault
              informiert dich über alle aktuellen Deals auf allen Plattformen.
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="p-6 bg-gray-800/70 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <div
              class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
              <span class="text-xl">🔄</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">
              Automatische Synchronisation
            </h3>
            <p class="text-gray-400">
              Verbinde deine Gaming-Accounts und lasse deine Bibliothek
              automatisch aktualisieren, wenn du neue Spiele kaufst.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Plattformen-Bereich -->
    <section class="py-24 relative">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
          Unterstützte Plattformen
        </h2>

        <div
          class="flex flex-wrap justify-center gap-8 items-center max-w-4xl mx-auto">
          <div
            class="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
            <span class="text-2xl">Steam</span>
          </div>
          <div
            class="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
            <span class="text-2xl">Epic</span>
          </div>
          <div
            class="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
            <span class="text-2xl">GOG</span>
          </div>
          <div
            class="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
            <span class="text-2xl">Origin</span>
          </div>
          <div
            class="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
            <span class="text-2xl">Uplay</span>
          </div>
          <div
            class="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
            <span class="text-2xl">+</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA-Bereich -->
    <section
      class="py-16 bg-gradient-to-br from-violet-950/50 to-gray-900/50 relative">
      <!-- RGB-Effekt an den Rändern -->
      <div
        class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500" />
      <div
        class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500" />

      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">
          Bereit, deine Spieleverwaltung zu revolutionieren?
        </h2>
        <p class="text-xl text-gray-300 mb-8">
          Registriere dich jetzt kostenlos und starte mit GameVault
        </p>
        <button
          class="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-md text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(124,58,237,0.5)]">
          Jetzt kostenlos anmelden
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
  const user = useSupabaseUser();
  watchEffect(() => {
    if (user.value) {
      navigateTo('/dashboard', { replace: true });
    }
  });
  definePageMeta({
    title: 'GameVault - Deine All-in-One Spieleverwaltung'
  });
</script>

<style>
  .animate-text {
    background-size: 200% auto;
    animation: textShine 3s linear infinite;
  }

  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes textShine {
    to {
      background-position: 200% center;
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.4;
    }
  }
</style>
