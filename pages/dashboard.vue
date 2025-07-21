<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
    title: 'Dashboard - Gaming Nexus',
    layout: 'authenticated'
  });
  const { getStoreBannerURL, getStoreLogoURL } = useStoreUtils();
  const userStore = useUserStore();
  const gamesStore = useGamesStore();
  const dealsStore = useDealsStore();
  const wishlistStore = useWishlistStore();
  const messagesStore = useMessagesStore();

  const user = computed(() => userStore.user);
  const stats = computed(() => userStore.stats);
  const recentGames = computed(() => gamesStore.recentlyPlayed.slice(0, 4));
  const featuredDeals = computed(() =>
    dealsStore.deals
      .filter(deal => deal.discountPercent && deal.discountPercent > 0)
      .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
      .slice(0, 3)
  );

  // Gaming-Tipps
  const gamingTips = [
    {
      text: 'Tipp: Nutze die Wishlist-Funktion, um bei Preisreduktionen benachrichtigt zu werden!',
      icon: 'heroicons:heart-20-solid'
    },
    {
      text: 'Wusstest du? Die Deal-Synchronisation läuft automatisch im Hintergrund!',
      icon: 'heroicons:fire-20-solid'
    },
    {
      text: 'Pro-Tipp: Sortiere Deals nach Rating, um die besten Angebote zu finden!',
      icon: 'heroicons:star-20-solid'
    },
    {
      text: 'Organisiere deine Bibliothek mit Favoriten für schnelleren Zugriff!',
      icon: 'heroicons:squares-2x2-20-solid'
    },
    {
      text: 'Nutze die globale Suche, um schnell Spiele und Deals zu finden!',
      icon: 'heroicons:magnifying-glass-20-solid'
    }
  ];

  const randomTip = ref(
    gamingTips[Math.floor(Math.random() * gamingTips.length)]
  );

  // Aktuelle Uhrzeit für Begrüßung
  const currentTime = ref(new Date());
  const greeting = computed(() => {
    const hour = currentTime.value.getHours();
    if (hour < 12) return 'Guten Morgen';
    if (hour < 18) return 'Guten Tag';
    return 'Guten Abend';
  });

  // Update Zeit jede Minute
  onMounted(async () => {
    setInterval(() => {
      currentTime.value = new Date();
    }, 60000);

    // Rotiere Tipps alle 30 Sekunden
    setInterval(() => {
      randomTip.value =
        gamingTips[Math.floor(Math.random() * gamingTips.length)];
    }, 30000);

    // Benutzer initialisieren (falls noch nicht geschehen)
    await userStore.init();

    // Daten laden mit Fehlerbehandlung
    try {
      await Promise.all([
        userStore.loadStats().catch(err => {
          console.error('Fehler beim Laden der User Stats:', err);
          return null;
        }),
        gamesStore.loadGames().catch(err => {
          console.error('Fehler beim Laden der Spiele:', err);
          return null;
        }),
        dealsStore.loadDealsFromDB().catch(err => {
          console.error('Fehler beim Laden der Deals:', err);
          return null;
        }),
        wishlistStore.checkWishlistDeals().catch(err => {
          console.error('Fehler beim Prüfen der Wishlist-Deals:', err);
          return null;
        }),
        messagesStore.refreshUnreadCount().catch(err => {
          console.error('Fehler beim Laden der Nachrichten-Anzahl:', err);
          return null;
        })
      ]);
    } catch (error) {
      console.error('Fehler beim Laden der Dashboard-Daten:', error);
    }
  });
</script>
<template>
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div
      class="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 p-8">
      <!-- Animated Background -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-green-600/5 animate-pulse-slow"></div>
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
      <div class="relative z-10">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1
              class="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
              {{ greeting }}, {{ user?.display_name || 'Gamer' }}! 🎮
            </h1>
            <p class="text-lg text-gray-300">
              Bereit für dein nächstes Gaming-Abenteuer? Hier ist deine
              Übersicht.
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Gaming Stats -->
      <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Total Games -->
        <div
          class="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-xl p-6 border border-purple-500/20 relative overflow-hidden group hover:border-purple-400/50 transition-all duration-500">
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-2">
              <Icon
                name="heroicons:squares-2x2-20-solid"
                class="w-8 h-8 text-purple-400" />
            </div>
            <div class="text-3xl font-bold text-white mb-1">
              {{ stats?.totalGames || 0 }}
            </div>
            <div class="text-sm text-gray-400">Spiele in Bibliothek</div>
          </div>
        </div>
        <!-- Hours Played -->
        <div
          class="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-6 border border-blue-500/20 relative overflow-hidden group hover:border-blue-400/50 transition-all duration-500">
          <div
            class="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-2">
              <Icon
                name="heroicons:clock-20-solid"
                class="w-8 h-8 text-blue-400" />
            </div>
            <div class="text-3xl font-bold text-white mb-1">
              {{ stats?.totalPlaytimeHours || 0 }}
            </div>
            <div class="text-sm text-gray-400">Gespielte Stunden</div>
          </div>
        </div>
        <div
          class="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-6 border border-green-500/20 relative overflow-hidden group hover:border-green-400/50 transition-all duration-500">
          <div
            class="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-2">
              <Icon
                name="heroicons:heart-20-solid"
                class="w-8 h-8 text-green-400" />
            </div>
            <div class="text-3xl font-bold text-white mb-1">
              {{ user?.userGames?.filter(g => g.isFavorite).length || 0 }}
            </div>
            <div class="text-sm text-gray-400">Favoriten</div>
          </div>
        </div>
      </div>
      <!-- Right Column: Nexus Credits -->
      <div class="flex flex-col">
        <!-- Stylish Silver Credits Card -->
        <div
          class="bg-gradient-to-br from-slate-800 via-gray-700/80 to-slate-900 rounded-xl p-4 border border-slate-400/30 relative overflow-hidden group hover:border-slate-300/50 transition-all duration-500 shadow-xl">
          <!-- Animated Background Effects -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-slate-300/3 via-gray-300/5 to-slate-400/3 animate-pulse-slow"></div>
          <div
            class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-300/8 to-gray-300/8 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>
          <div
            class="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-slate-400/8 to-gray-400/8 rounded-full blur-xl transform -translate-x-10 translate-y-10"></div>
          <!-- Header with Purchase Link -->
          <div class="relative z-10 flex items-center justify-between mb-3">
            <div class="flex items-center space-x-2">
              <div
                class="w-7 h-7 bg-gradient-to-br from-slate-400 to-gray-500 rounded-lg flex items-center justify-center shadow-md">
                <Icon
                  name="heroicons:banknotes-20-solid"
                  class="w-4 h-4 text-white" />
              </div>
              <span
                class="text-sm font-semibold text-slate-200 uppercase tracking-wide">
                Guthaben
              </span>
            </div>
            <!-- Discrete Purchase Link -->
            <NuxtLink
              :to="'/credits/purchase'"
              class="text-slate-300 hover:text-slate-100 text-sm font-medium transition-colors"
              title="Credits nachkaufen">
              <Icon
                name="heroicons:plus-circle-20-solid"
                class="w-9 h-9 text-white" />
            </NuxtLink>
          </div>
          <!-- Large 3D Coin in Background -->
          <div class="absolute bottom-2 right-4 z-0 pointer-events-none">
            <!-- Credit Icon with Enhanced Styling -->
            <div class="relative">
              <div class="w-32 h-32 relative">
                <!-- Outer glow ring -->
                <div
                  class="absolute inset-0 rounded-full bg-gradient-to-r from-slate-300/15 to-gray-300/15 blur-sm"></div>
                <!-- Rotating border effect -->
                <div
                  class="absolute inset-1 rounded-full border-2 border-slate-300/20 animate-spin-slow"></div>
                <!-- Credit container with 3D coin flip effect -->
                <div
                  class="absolute inset-2 bg-gradient-to-br from-slate-700/80 via-gray-600/40 to-slate-800/80 rounded-full flex items-center justify-center shadow-xl border border-slate-400/30 group-hover:border-slate-300/50 transition-all duration-500 perspective-1000">
                  <!-- 3D Rotating Coin -->
                  <div
                    class="w-full h-full relative preserve-3d group-hover:animate-coin-flip">
                    <!-- Front of coin -->
                    <div class="absolute inset-0 backface-hidden rounded-full">
                      <img
                        src="/assets/images/NexusCredit.PNG"
                        alt="Nexus Credit"
                        class="w-full h-full object-contain drop-shadow-lg filter brightness-60" />
                    </div>
                    <!-- Back of coin (slightly different appearance for realism) -->
                    <div
                      class="absolute inset-0 backface-hidden rotate-y-180 rounded-full">
                      <img
                        src="/assets/images/NexusCredit.PNG"
                        alt="Nexus Credit Back"
                        class="w-full h-full object-contain drop-shadow-lg filter brightness-60 contrast-105 hue-rotate-15" />
                    </div>
                    <!-- Coin edge highlight effect -->
                    <div
                      class="absolute inset-0 rounded-full border-2 border-gradient-to-r from-transparent via-slate-200/20 to-transparent opacity-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Balance Display -->
          <div class="space-y-1">
            <div class="text-3xl font-bold text-white mb-1">
              {{ user?.credits || 0 }}
            </div>
            <div class="text-slate-300/80 text-xs font-medium tracking-widest">
              Nexus Credits
            </div>
          </div>
          <!-- Credit Value Hint -->
          <div class="mt-2 text-xs text-slate-400/70">
            ≈ {{ ((user?.credits || 0) * 0.01).toFixed(2) }}€ Wert
          </div>
        </div>
      </div>
    </div>
    <!-- Main Content Grid - Reorganized layout -->
    <div class="space-y-8">
      <!-- First Row: Recently Played Games and Hot Deals side by side -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recently Played Games - Takes 2/3 of the width -->
        <div
          class="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-purple-400/50 transition-all duration-500">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon
                name="heroicons:play-20-solid"
                class="w-6 h-6 text-purple-400 mr-2" />
              Zuletzt gespielt
            </h2>
            <NuxtLink
              to="/my-games"
              class="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
              Alle anzeigen →
            </NuxtLink>
          </div>
          <div class="grid grid-cols-4 md:grid-cols-4 gap-4">
            <div
              v-if="recentGames.length === 0"
              class="col-span-4 text-center text-gray-500 py-8">
              <Icon
                name="heroicons:squares-2x2-20-solid"
                class="w-12 h-12 mx-auto mb-2 text-gray-600" />
              <p>Noch keine Spiele gespielt</p>
              <p class="text-sm">
                Importiere deine Steam-Bibliothek in den
                <NuxtLink
                  to="/settings"
                  class="text-purple-400 hover:text-purple-300">
                  Einstellungen
                </NuxtLink>
              </p>
            </div>
            <div
              v-for="game in recentGames"
              :key="game.id"
              class="group relative bg-gray-900/50 rounded-lg overflow-hidden border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1">
              <!-- Game Cover -->
              <div class="aspect-[3/4] relative overflow-hidden">
                <img
                  :src="game.game.coverUrl || '/gameplaceholder.jpg'"
                  :alt="game.game.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <!-- Game Info -->
              <div class="p-3">
                <h3 class="font-medium text-white text-sm mb-1 truncate">
                  {{ game.game.name }}
                </h3>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-purple-300">{{
                    game.lastPlayed
                      ? new Date(game.lastPlayed).toLocaleDateString('de-DE')
                      : 'Nie gespielt'
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Hot Deals - Takes 1/3 of the width -->
        <div
          class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 flex-1 flex flex-col hover:border-red-400/50 transition-all duration-500">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon
                name="heroicons:fire-20-solid"
                class="w-6 h-6 text-red-400 mr-2" />
              Heiße Deals
            </h2>
            <NuxtLink
              to="/deals"
              class="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
              Alle Deals →
            </NuxtLink>
          </div>
          <div class="space-y-4 flex-1 overflow-y-auto custom-scrollbar">
            <div
              v-if="featuredDeals.length === 0"
              class="text-center text-gray-500 py-8">
              <Icon
                name="heroicons:fire-20-solid"
                class="w-12 h-12 mx-auto mb-2 text-gray-600" />
              <p>Keine aktuellen Deals</p>
              <p class="text-sm">Deals werden automatisch synchronisiert</p>
            </div>
            <div
              v-for="deal in featuredDeals"
              :key="deal.id"
              class="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg border border-gray-600/30 hover:border-red-500/30 transition-all duration-300 group">
              <div
                class="w-12 h-16 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                <img
                  :src="deal.game?.coverUrl || '/gameplaceholder.jpg'"
                  :alt="deal.game?.name || deal.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-medium text-white text-sm mb-1 truncate">
                  {{ deal.game?.name || deal.title }}
                </h3>
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-lg font-bold text-green-400"
                    >{{ deal.price?.toFixed(2) || '0.00' }}€</span
                  >
                  <span
                    v-if="deal.originalPrice"
                    class="text-sm text-gray-400 line-through"
                    >{{ deal.originalPrice?.toFixed(2) }}€</span
                  >
                  <span
                    v-if="deal.discountPercent"
                    class="text-xs bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded"
                    >-{{ deal.discountPercent?.toFixed(0) }}%</span
                  >
                </div>
                <div class="flex items-center justify-between">
                  <img
                    :src="getStoreBannerURL(deal.storeName)"
                    :alt="`${deal.storeName} Banner`"
                    class="h-6 max-w-[80px] object-contain opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Third Row: Messages and Gaming Tips -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Messages Widget - Takes 2/3 of the width -->
        <div class="lg:col-span-2">
          <MessagesWidget :max-messages="5" />
        </div>

        <!-- Gaming Tip des Tages - Takes 1/3 of the width -->
        <div
          class="bg-gradient-to-br from-cyan-800/60 via-cyan-800/50 to-blue-900/60 backdrop-blur-sm rounded-2xl border border-cyan-700/50 p-6 hover:border-cyan-400/50 transition-all duration-500 relative overflow-hidden">
          <!-- Animated Background Effects -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 animate-pulse-slow"></div>
          <div
            class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-white flex items-center">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Icon
                    name="heroicons:light-bulb-20-solid"
                    class="w-6 h-6 text-white" />
                </div>
                Gaming Tipp
              </h2>
              <div class="animate-pulse-slow">
                <Icon
                  name="heroicons:arrow-path-20-solid"
                  class="w-5 h-5 text-cyan-300" />
              </div>
            </div>

            <!-- Tip Content -->
            <div class="relative overflow-hidden mb-6">
              <div
                class="relative z-10 p-6 bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-xl border border-cyan-500/20 backdrop-blur-sm">
                <!-- Decorative Quote Mark -->
                <div class="absolute top-3 left-3 w-8 h-8 text-cyan-400/30">
                  <Icon
                    name="heroicons:chat-bubble-left-ellipsis-20-solid"
                    class="w-full h-full" />
                </div>

                <div class="flex items-start space-x-4 pl-6">
                  <div class="flex-shrink-0 mt-1">
                    <div
                      class="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-400/30">
                      <Icon
                        :name="randomTip.icon"
                        class="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <p class="text-gray-100 leading-relaxed font-medium">
                    {{ randomTip.text }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Progress Dots -->
            <div class="flex justify-center mt-4 space-x-2">
              <div
                v-for="i in 5"
                :key="i"
                class="w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"
                :style="`animation-delay: ${i * 0.2}s`"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- Second Row: Platform Status & Gaming Tips -->
      <div class="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <!-- Platform Integration Status - Takes 2/3 of the width -->
        <div
          class="lg:col-span-2 bg-gradient-to-br from-gray-800/60 via-gray-800/50 to-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 hover:border-orange-400/50 transition-all duration-500 relative overflow-hidden">
          <!-- Animated Background Effects -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-purple-500/5 to-blue-500/5 animate-pulse-slow"></div>
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-purple-500/10 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-bold text-white flex items-center">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Icon
                    name="heroicons:squares-plus-20-solid"
                    class="w-6 h-6 text-white" />
                </div>
                Gaming Plattformen
              </h2>
              <div class="text-sm text-gray-400">Verbindungsstatus</div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Steam Status -->
              <div
                class="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-600/30 hover:border-blue-400/50 transition-all duration-500 transform hover:-translate-y-1">
                <!-- Steam Logo Background -->
                <div
                  class="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <img
                    :src="getStoreBannerURL('Steam')"
                    alt="Steam Logo"
                    class="w-16 h-16 object-contain filter brightness-200" />
                </div>

                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <img
                          :src="getStoreLogoURL('Steam')"
                          alt="Steam"
                          class="w-8 h-8 object-contain filter brightness-200" />
                      </div>
                      <div>
                        <div class="font-bold text-white text-lg">Steam</div>
                        <div class="text-sm text-gray-400">Gaming Platform</div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div
                        :class="`w-4 h-4 rounded-full shadow-lg ${
                          user?.steamId
                            ? 'bg-green-400 shadow-green-400/50'
                            : 'bg-gray-500'
                        }`">
                        <div
                          :class="`w-full h-full rounded-full ${
                            user?.steamId ? 'animate-pulse bg-green-300' : ''
                          }`"></div>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-300">Status</span>
                      <span
                        :class="`text-sm font-medium ${
                          user?.steamId ? 'text-green-400' : 'text-gray-400'
                        }`">
                        {{ user?.steamId ? 'Verbunden' : 'Nicht verbunden' }}
                      </span>
                    </div>
                    <div
                      v-if="user?.steamId"
                      class="flex justify-between items-center">
                      <span class="text-sm text-gray-300">Steam ID</span>
                      <span class="text-sm font-mono text-blue-400"
                        >{{ user.steamId.slice(0, 10) }}...</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Epic Games Status -->
              <div
                class="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-600/30 hover:border-purple-400/50 transition-all duration-500 transform hover:-translate-y-1">
                <!-- Epic Logo Background -->
                <div
                  class="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <img
                    :src="getStoreBannerURL('Epic Games Store')"
                    alt="Epic Games Logo"
                    class="w-16 h-16 object-contain filter brightness-200" />
                </div>

                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <img
                          :src="getStoreBannerURL('Epic Games Store')"
                          alt="Epic Games"
                          class="w-8 h-8 object-contain filter brightness-200" />
                      </div>
                      <div>
                        <div class="font-bold text-white text-lg">
                          Epic Games
                        </div>
                        <div class="text-sm text-gray-400">Gaming Platform</div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div
                        :class="`w-4 h-4 rounded-full shadow-lg ${
                          user?.epicConnect
                            ? 'bg-green-400 shadow-green-400/50'
                            : 'bg-gray-500'
                        }`">
                        <div
                          :class="`w-full h-full rounded-full ${
                            user?.epicConnect
                              ? 'animate-pulse bg-green-300'
                              : ''
                          }`"></div>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-300">Status</span>
                      <span
                        :class="`text-sm font-medium ${
                          user?.epicConnect ? 'text-green-400' : 'text-gray-400'
                        }`">
                        {{
                          user?.epicConnect ? 'Verbunden' : 'Nicht verbunden'
                        }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-300">Free Games</span>
                      <span class="text-sm text-purple-400">Verfügbar</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- GOG Status -->
              <div
                class="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-600/30 hover:border-red-400/50 transition-all duration-500 transform hover:-translate-y-1">
                <!-- GOG Logo Background -->
                <div
                  class="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <img
                    :src="getStoreBannerURL('GOG')"
                    alt="GOG Logo"
                    class="w-16 h-16 object-contain filter brightness-200" />
                </div>

                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <img
                          :src="getStoreLogoURL('GOG')"
                          alt="GOG"
                          class="w-8 h-8 object-contain filter brightness-200" />
                      </div>
                      <div>
                        <div class="font-bold text-white text-lg">GOG</div>
                        <div class="text-sm text-gray-400">DRM-Free Games</div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div
                        :class="`w-4 h-4 rounded-full shadow-lg ${
                          user?.gogConnect
                            ? 'bg-green-400 shadow-green-400/50'
                            : 'bg-gray-500'
                        }`">
                        <div
                          :class="`w-full h-full rounded-full ${
                            user?.gogConnect ? 'animate-pulse bg-green-300' : ''
                          }`"></div>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-300">Status</span>
                      <span
                        :class="`text-sm font-medium ${
                          user?.gogConnect ? 'text-green-400' : 'text-gray-400'
                        }`">
                        {{ user?.gogConnect ? 'Verbunden' : 'Nicht verbunden' }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-300">DRM-Free</span>
                      <span class="text-sm text-red-400">✓ Garantiert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Connection Management -->
            <div
              class="mt-8 flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-xl border border-orange-500/20">
              <div class="flex items-center space-x-3">
                <Icon
                  name="heroicons:cog-6-tooth-20-solid"
                  class="w-6 h-6 text-orange-400" />
                <div>
                  <div class="font-medium text-white">
                    Verbindungen verwalten
                  </div>
                  <div class="text-sm text-gray-400">
                    Plattformen verbinden oder trennen
                  </div>
                </div>
              </div>
              <NuxtLink
                to="/settings"
                class="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25">
                Einstellungen
                <Icon
                  name="heroicons:arrow-right-20-solid"
                  class="w-4 h-4 ml-2" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  /* Animations */
  @keyframes pulse-slow {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.8;
    }
  }
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes spin-reverse {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  .animate-pulse-slow {
    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
  .animate-spin-reverse {
    animation: spin-reverse 6s linear infinite;
  }
  /* Custom scrollbar for any overflow content */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(147, 51, 234, 0.5) rgba(75, 85, 99, 0.1);
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(75, 85, 99, 0.1);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(
      to bottom,
      rgba(147, 51, 234, 0.6),
      rgba(59, 130, 246, 0.6)
    );
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(
      to bottom,
      rgba(147, 51, 234, 0.9),
      rgba(59, 130, 246, 0.9)
    );
  }
</style>
