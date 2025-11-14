<template>
  <div class="pb-16 bg-gray-900 text-white">
    <!-- Hero-Bereich mit RGB-Effekten und NexusFont -->
    <section
      class="py-20 relative overflow-hidden min-h-screen flex items-center justify-center">
      <!-- RGB-Hintergrund-Animation -->
      <div
        class="absolute inset-0 bg-grid-white/5 bg-[size:40px_40px] opacity-10 animate-pulse-slow-far" />
      <div class="absolute inset-0 z-0">
        <div
          class="absolute top-0 -left-[20%] h-full w-[150%] bg-gradient-to-r from-purple-600/30 via-transparent to-transparent animate-pulse-horizontal-slow opacity-50" />
        <div
          class="absolute top-0 -right-[20%] h-full w-[150%] bg-gradient-to-l from-blue-600/30 via-transparent to-transparent animate-pulse-horizontal-slow delay-2000 opacity-50" />
        <div
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1/2 w-full bg-gradient-to-t from-green-500/20 via-transparent to-transparent animate-pulse-vertical-slow opacity-30" />
      </div>
      <div class="container mx-auto px-4 py-12 relative z-10 text-center">
        <img
          src="/favicon.ico"
          alt="Nexus Logo"
          class="mx-auto mb-8 h-38 w-40 animate-float" />
        <img
          src="/NexusFont.png"
          alt="Nexus Branding"
          class="mx-auto mb-10 h-auto max-w-lg md:max-w-2xl animate-text-pop-in"
          style="filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.7))" />
        <p
          class="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up"
          style="animation-delay: 0.5s">
          Deine ultimative Spieleverwaltung für alle Plattformen
        </p>
        <p
          class="text-lg text-gray-400 mb-6 animate-fade-in-up"
          style="animation-delay: 0.8s">
          Steam, Epic Games, GOG und mehr - Alles an einem Ort
        </p>
        <!-- Portfolio Demo Badge -->
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full mb-8 animate-fade-in-up"
          style="animation-delay: 1s">
          <Icon name="heroicons:eye" class="text-purple-400 text-xl" />
          <span class="text-sm font-medium text-purple-300">
            Portfolio Demo - Interaktive Vorschau mit meiner Steam-Bibliothek
          </span>
        </div>
        <div
          class="flex flex-wrap gap-6 justify-center animate-fade-in-up"
          style="animation-delay: 1.1s">
          <NuxtLink
            to="/signin"
            class="px-10 py-4 bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 hover:from-purple-700 hover:via-blue-600 hover:to-green-600 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(124,58,237,0.6),_0_0_25px_rgba(59,130,246,0.4),_0_0_25px_rgba(16,185,129,0.3)] focus:outline-none focus:ring-4 focus:ring-purple-500/50">
            Demo ausprobieren
          </NuxtLink>
          <a
            href="#features"
            class="px-10 py-4 bg-gray-700/70 hover:bg-gray-600/90 border border-gray-600 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(100,116,139,0.4)] focus:outline-none focus:ring-4 focus:ring-gray-500/50">
            Mehr erfahren
          </a>
        </div>
      </div>
    </section>
    <!-- Features-Bereich -->
    <section
      id="features"
      class="py-24 bg-gray-800/60 relative backdrop-blur-sm">
      <div
        class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 animate-border-flow" />
      <div class="container mx-auto px-4">
        <h2
          class="text-4xl md:text-5xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
          Entdecke die Power von Nexus
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <!-- Feature 1 -->
          <div
            class="p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl border border-purple-500/30 hover:border-purple-500/70 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(124,58,237,0.4)] group relative overflow-hidden">
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div
              class="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]">
              <Icon
                name="heroicons:rectangle-group"
                class="text-white text-4xl" />
            </div>
            <h3 class="relative text-2xl font-bold mb-4 text-white">
              Alle Spiele an einem Ort
            </h3>
            <p class="relative text-gray-400 leading-relaxed">
              Importiere und verwalte deine Spielebibliotheken von Steam, Epic
              Games, GOG und weiteren Plattformen in einer übersichtlichen,
              futuristischen Oberfläche.
            </p>
          </div>
          <!-- Feature 2 -->
          <div
            class="p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl border border-blue-500/30 hover:border-blue-500/70 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(59,130,246,0.4)] group relative overflow-hidden">
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div
              class="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]">
              <Icon name="heroicons:tag" class="text-white text-4xl" />
            </div>
            <h3 class="relative text-2xl font-bold mb-4 text-white">
              Die besten Deals
            </h3>
            <p class="relative text-gray-400 leading-relaxed">
              Verpasse nie wieder Angebote oder kostenlose Spiele. Nexus scannt
              alle Plattformen und informiert dich über Top-Deals.
            </p>
          </div>
          <!-- Feature 3 -->
          <div
            class="p-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl border border-green-500/30 hover:border-green-500/70 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)] group relative overflow-hidden">
            <div
              class="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div
              class="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]">
              <Icon name="heroicons:arrow-path" class="text-white text-4xl" />
            </div>
            <h3 class="relative text-2xl font-bold mb-4 text-white">
              Automatische Synchronisation
            </h3>
            <p class="relative text-gray-400 leading-relaxed">
              Verbinde deine Gaming-Accounts und lasse deine Bibliothek
              automatisch aktualisieren, wenn du neue Spiele kaufst oder
              installierst.
            </p>
          </div>
        </div>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 animate-border-flow-reverse" />
    </section>
    <!-- Plattformen-Bereich -->
    <section class="py-24 relative">
      <div class="absolute inset-0 opacity-5 overflow-hidden">
        <div
          class="absolute -top-1/2 -left-1/4 w-full h-full bg-purple-500/30 rounded-full filter blur-[150px] animate-pulse-slow-far"></div>
        <div
          class="absolute -bottom-1/2 -right-1/4 w-full h-full bg-blue-500/30 rounded-full filter blur-[150px] animate-pulse-slow-far animation-delay-2000ms"></div>
      </div>
      <div class="container mx-auto px-4 relative z-10">
        <h2
          class="text-4xl md:text-5xl font-bold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
          Unterstützte Plattformen
        </h2>
        <div
          class="flex flex-wrap justify-center gap-6 items-center max-w-6xl mx-auto">
          <!-- Steam -->
          <div
            class="group relative w-40 h-40 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl flex flex-col items-center justify-center border border-gray-700/50 hover:border-blue-400/70 transition-all duration-500 transform hover:scale-110 hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)] cursor-pointer overflow-hidden">
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-600/10 transition-all duration-500"></div>
            <Icon
              name="simple-icons:steam"
              class="relative text-6xl text-gray-400 group-hover:text-blue-400 transition-all duration-300 transform group-hover:scale-110" />
            <span
              class="relative mt-3 text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300"
              >Steam</span
            >
          </div>
          <!-- Epic Games -->
          <div
            class="group relative w-40 h-40 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl flex flex-col items-center justify-center border border-gray-700/50 hover:border-slate-300/70 transition-all duration-500 transform hover:scale-110 hover:shadow-[0_10px_40px_rgba(226,232,240,0.3)] cursor-pointer overflow-hidden">
            <div
              class="absolute inset-0 bg-gradient-to-br from-slate-100/0 to-slate-100/0 group-hover:from-slate-100/10 group-hover:to-slate-200/10 transition-all duration-500"></div>
            <Icon
              name="simple-icons:epicgames"
              class="relative text-6xl text-gray-400 group-hover:text-slate-200 transition-all duration-300 transform group-hover:scale-110" />
            <span
              class="relative mt-3 text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300"
              >Epic Games</span
            >
          </div>
          <!-- GOG -->
          <div
            class="group relative w-40 h-40 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl flex flex-col items-center justify-center border border-gray-700/50 hover:border-purple-400/70 transition-all duration-500 transform hover:scale-110 hover:shadow-[0_10px_40px_rgba(168,85,247,0.3)] cursor-pointer overflow-hidden">
            <div
              class="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-purple-600/10 transition-all duration-500"></div>
            <Icon
              name="simple-icons:gogdotcom"
              class="relative text-6xl text-gray-400 group-hover:text-purple-400 transition-all duration-300 transform group-hover:scale-110" />
            <span
              class="relative mt-3 text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300"
              >GOG</span
            >
          </div>
          <!-- EA (Origin) -->
          <div
            class="group relative w-40 h-40 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl flex flex-col items-center justify-center border border-gray-700/50 hover:border-red-400/70 transition-all duration-500 transform hover:scale-110 hover:shadow-[0_10px_40px_rgba(239,68,68,0.3)] cursor-pointer overflow-hidden">
            <div
              class="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:to-red-600/10 transition-all duration-500"></div>
            <Icon
              name="simple-icons:ea"
              class="relative text-6xl text-gray-400 group-hover:text-red-400 transition-all duration-300 transform group-hover:scale-110" />
            <span
              class="relative mt-3 text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300"
              >EA / Origin</span
            >
          </div>
          <!-- Ubisoft -->
          <div
            class="group relative w-40 h-40 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl flex flex-col items-center justify-center border border-gray-700/50 hover:border-blue-500/70 transition-all duration-500 transform hover:scale-110 hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)] cursor-pointer overflow-hidden">
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-blue-700/10 transition-all duration-500"></div>
            <Icon
              name="simple-icons:ubisoft"
              class="relative text-6xl text-gray-400 group-hover:text-blue-500 transition-all duration-300 transform group-hover:scale-110" />
            <span
              class="relative mt-3 text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300"
              >Ubisoft</span
            >
          </div>
          <!-- Battle.net -->
          <div
            class="group relative w-40 h-40 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl flex flex-col items-center justify-center border border-gray-700/50 hover:border-cyan-400/70 transition-all duration-500 transform hover:scale-110 hover:shadow-[0_10px_40px_rgba(34,211,238,0.3)] cursor-pointer overflow-hidden">
            <div
              class="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-cyan-600/10 transition-all duration-500"></div>
            <Icon
              name="simple-icons:battledotnet"
              class="relative text-6xl text-gray-400 group-hover:text-cyan-400 transition-all duration-300 transform group-hover:scale-110" />
            <span
              class="relative mt-3 text-sm font-semibold text-gray-400 group-hover:text-white transition-colors duration-300"
              >Battle.net</span
            >
          </div>
        </div>
        <p class="text-center text-gray-400 mt-12 text-lg">
          Wir erweitern ständig unsere Unterstützung für weitere
          Gaming-Plattformen!
        </p>
      </div>
    </section>
    <!-- CTA-Bereich -->
    <section
      class="py-24 bg-gradient-to-br from-purple-900/70 via-gray-900 to-blue-900/70 relative overflow-hidden">
      <div class="absolute inset-0 opacity-30">
        <div
          class="absolute top-0 left-0 w-1/2 h-full bg-gradient-radial from-purple-500/50 to-transparent filter blur-[100px] animate-pulse-slow-far"></div>
        <div
          class="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-radial from-blue-500/50 to-transparent filter blur-[100px] animate-pulse-slow-far animation-delay-3000ms"></div>
      </div>
      <div
        class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 animate-border-flow" />
      <div
        class="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 animate-border-flow-reverse" />
      <div class="container mx-auto px-4 text-center relative z-10">
        <h2 class="text-4xl md:text-5xl font-bold mb-8">
          Bereit, deine Spieleverwaltung zu
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400"
            >revolutionieren</span
          >?
        </h2>
        <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Registriere dich jetzt kostenlos und tauche ein in die Zukunft des
          Gamings mit Nexus.
        </p>
        <button
          class="px-12 py-5 bg-gradient-to-r from-purple-600 via-blue-500 to-green-500 hover:from-purple-700 hover:via-blue-600 hover:to-green-600 rounded-lg text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.7),_0_0_30px_rgba(59,130,246,0.5),_0_0_30px_rgba(16,185,129,0.4)] focus:outline-none focus:ring-4 focus:ring-purple-500/60">
          Jetzt kostenlos anmelden
        </button>
      </div>
    </section>
  </div>
  <footer
    class="bg-gradient-to-t from-gray-950 to-gray-900 text-gray-400 pt-16 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        <div class="md:col-span-1 lg:col-span-1">
          <NuxtLink
            to="/"
            class="flex items-center space-x-3 rtl:space-x-reverse mb-4 group">
            <img
              src="/favicon.ico"
              alt="Nexus Logo"
              class="h-8 w-8 transition-transform duration-300 ease-in-out group-hover:animate-pulse" />
            <span
              class="self-center text-xl font-semibold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 transition-opacity duration-300 group-hover:opacity-80">
              Nexus
            </span>
          </NuxtLink>
          <p class="text-sm">
            Deine ultimative Spieleverwaltung für alle Plattformen. Entdecke,
            verwalte und spare.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-200 mb-4">Navigation</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink
                to="/#features"
                class="hover:text-white transition-colors"
                >Features</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/pricing" class="hover:text-white transition-colors"
                >Pricing</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/signin" class="hover:text-white transition-colors"
                >Anmelden</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/signup" class="hover:text-white transition-colors"
                >Kostenlos starten</NuxtLink
              >
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-200 mb-4">Rechtliches</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/terms" class="hover:text-white transition-colors"
                >Nutzungsbedingungen</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/privacy" class="hover:text-white transition-colors"
                >Datenschutz</NuxtLink
              >
            </li>
            <li>
              <button
                type="button"
                data-cc="show-preferencesModal"
                class="bg-transparent border-none p-0 hover:text-white transition-colors duration-200 cursor-pointer text-sm">
                Cookie-Einstellungen
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-200 mb-4">Folge uns</h3>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors"
              ><Icon name="mdi:twitter" size="1.5em"
            /></a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors"
              ><Icon name="mdi:discord" size="1.5em"
            /></a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors"
              ><Icon name="mdi:github" size="1.5em"
            /></a>
          </div>
        </div>
      </div>
      <div class="text-center border-t border-gray-700/60 pt-8 mt-8">
        <p>
          &copy; {{ new Date().getFullYear() }} Nexus. Alle Rechte vorbehalten.
        </p>
      </div>
    </div>
  </footer>
</template>
<script setup>
  const user = useSupabaseUser();
  watchEffect(() => {
    if (user.value) {
      navigateTo('/dashboard', { replace: true });
    }
  });
  definePageMeta({
    title: 'Nexus - Deine All-in-One Spieleverwaltung der Zukunft'
  });
</script>
<style>
  /* Globale Stile für die Seite */
  body {
    background-color: #0a0a0f;
    color: #e0e0e0;
  }
  .bg-grid-white\/5 {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  }
  .animate-text-pop-in {
    animation: textPopIn 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
    opacity: 0;
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  .animate-pulse-slow-far {
    animation: pulse-far 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-pulse-horizontal-slow {
    animation: pulse-horizontal 6s ease-in-out infinite alternate;
  }
  .animate-pulse-vertical-slow {
    animation: pulse-vertical 7s ease-in-out infinite alternate;
  }
  .animate-border-flow {
    animation: borderFlow 5s linear infinite;
  }
  .animate-border-flow-reverse {
    animation: borderFlowReverse 5s linear infinite;
  }
  .delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-2000ms {
    animation-delay: 2s;
  } /* Konsistenz */
  .animation-delay-3000ms {
    animation-delay: 3s;
  }
  button.bg-transparent {
    line-height: inherit;
  }
  .group:hover .group-hover\:animate-pulse {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes textPopIn {
    0% {
      opacity: 0;
      transform: scale(0.5) translateY(20px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
  }
  @keyframes pulse-far {
    0%,
    100% {
      opacity: 0.1;
      transform: scale(0.95);
    }
    50% {
      opacity: 0.3;
      transform: scale(1.05);
    }
  }
  @keyframes pulse-horizontal {
    0% {
      transform: translateX(-10%);
      opacity: 0;
    }
    10% {
      /* Erscheinen an der Startposition */
      transform: translateX(-10%);
      opacity: 0.4;
    }
    90% {
      /* Bewegung zur Endposition, bleibt sichtbar */
      transform: translateX(10%);
      opacity: 0.4;
    }
    100% {
      /* Verschwinden an der Endposition */
      transform: translateX(10%);
      opacity: 0;
    }
  }
  @keyframes pulse-vertical {
    from {
      transform: translateY(-15%);
      opacity: 0.1;
    }
    to {
      transform: translateY(15%);
      opacity: 0.3;
    }
  }
  @keyframes borderFlow {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  }
  @keyframes borderFlowReverse {
    0% {
      background-position: 200% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
