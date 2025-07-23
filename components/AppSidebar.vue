<script setup lang="ts">
  const emit = defineEmits<{
    hoverChange: [isHovered: boolean];
  }>();
  const route = useRoute();
  const isHovered = ref(false);
  let hoverTimeout: NodeJS.Timeout | null = null;

  // Hover mit Verzögerung
  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    hoverTimeout = setTimeout(() => {
      isHovered.value = true;
    }, 750); // 300ms Verzögerung
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    isHovered.value = false;
  };

  // Zeige erweiterte Sidebar nur bei Hover
  const showExpanded = computed(() => isHovered.value);
  // Emittiere Hover-Status Änderungen
  watch(isHovered, newValue => {
    emit('hoverChange', newValue);
  });
  // Navigation items mit Icons und Labels (vereinfacht ohne Untermenüs)
  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: 'heroicons:home-20-solid'
    },
    {
      name: 'Meine Spiele',
      path: '/my-games',
      icon: 'heroicons:puzzle-piece-20-solid'
    },
    {
      name: 'Angebote',
      path: '/deals',
      icon: 'heroicons:tag-20-solid'
    },
    {
      name: 'Wishlist',
      path: '/wishlist',
      icon: 'heroicons:heart-20-solid'
    },
    {
      name: 'Profil',
      path: '/settings',
      icon: 'heroicons:user-20-solid'
    }
  ];
  // Überprüfe ob ein Pfad aktiv ist
  const isActiveRoute = (path: string) => {
    return route.path === path || route.path.startsWith(path + '/');
  };
</script>
<template>
  <aside
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    class="group fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] flex flex-col bg-gray-900 overflow-hidden transition-all duration-500 ease-out"
    :style="{ width: showExpanded ? '256px' : '68px' }">
    <!-- Futuristischer Hintergrund mit Gradient und Glow -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-lg border-r border-purple-500/20 shadow-2xl">
      <!-- Animierter Glow-Effekt -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-green-600/5 animate-pulse-slow"></div>
      <!-- Border Glow -->
      <div
        class="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-green-500/50 shadow-glow"></div>
    </div>
    <!-- Navigation Content Container -->
    <div class="relative z-10 flex flex-col h-full min-h-0 overflow-hidden">
      <!-- Navigation (nimmt verfügbaren Platz ein) -->
      <nav class="flex-1 px-2 pt-4 min-h-0 overflow-hidden">
        <div class="h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
          <ul class="space-y-2 pb-4">
            <li v-for="item in navigationItems" :key="item.path">
              <NuxtLink
                :to="item.path"
                class="group/nav relative flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                :class="{
                  'bg-gradient-to-r from-purple-600/30 to-blue-600/20 text-white shadow-lg shadow-purple-500/25 border border-purple-500/30':
                    isActiveRoute(item.path),
                  'text-gray-300 hover:text-white hover:bg-gray-700/40 hover:shadow-md':
                    !isActiveRoute(item.path)
                }">
                <!-- Icon mit Glow-Effekt -->
                <div
                  class="relative flex-shrink-0 flex items-center justify-center w-8">
                  <Icon
                    :name="item.icon"
                    class="w-5 h-5 transition-all duration-300"
                    :class="{
                      'text-purple-300 drop-shadow-glow': isActiveRoute(
                        item.path
                      ),
                      'text-gray-400 group-hover/nav:text-white group-hover/nav:drop-shadow-sm':
                        !isActiveRoute(item.path)
                    }" />
                  <div
                    v-if="isActiveRoute(item.path)"
                    class="absolute inset-0 bg-purple-400/30 rounded-full blur-md animate-pulse-slow"></div>
                </div>
                <!-- Label mit Slide-In Animation -->
                <span
                  v-if="showExpanded"
                  class="ml-4 transition-all duration-500 ease-out whitespace-nowrap overflow-hidden text-ellipsis flex-1 min-w-0"
                  :class="
                    showExpanded
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-4 opacity-0'
                  ">
                  {{ item.name }}
                </span>
                <!-- Hover Glow Effekt -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 -z-10"></div>
                <!-- Active Indicator -->
                <div
                  v-if="isActiveRoute(item.path)"
                  class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-400 to-blue-400 rounded-r-full shadow-glow animate-pulse-slow"></div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </aside>
</template>
<style scoped>
  /* Verhindere horizontale Scrollbars */
  aside {
    overflow-x: hidden;
  }
  /* Custom Scrollbar */
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
  /* Verhindere Text-Overflow für alle Elemente */
  .truncate-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
  /* Glow Effects */
  .shadow-glow {
    box-shadow: 0 0 10px currentColor;
  }
  .drop-shadow-glow {
    filter: drop-shadow(0 0 8px currentColor);
  }
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
  .animate-pulse-slow {
    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
  /* Hover Effects */
  .group:hover .group-hover\:opacity-100 {
    opacity: 1;
  }
</style>
