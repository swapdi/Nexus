<template>
  <header
    class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
    <div class="relative h-16 flex items-center">
      <!-- Logo - fest positioniert links über der Sidebar -->
      <div
        class="absolute left-0 top-0 flex items-center justify-center w-[78px] h-full">
        <NuxtLink to="/" class="flex items-center group">
          <img
            src="/favicon.ico"
            alt="Nexus"
            class="h-8 w-8 transition-all duration-200 group-hover:scale-105 drop-shadow-lg" />
        </NuxtLink>
      </div>
      <!-- User Section - fest positioniert rechts -->
      <div
        class="absolute right-0 top-0 flex items-center space-x-2 sm:space-x-3 lg:space-x-4 h-full pr-2 sm:pr-4 lg:pr-8">
        <!-- Einheitlicher Loading-Indikator -->
        <div
          v-if="hasAnyOperation"
          class="flex items-center space-x-2 px-2 sm:px-3 py-1.5 bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/50 cursor-pointer group transition-all duration-200 hover:bg-gray-600/50"
          @click="handleLoadingClick"
          :title="loadingTooltip">
          <!-- Loading Spinner -->
          <div
            :class="[
              'w-4 h-4 rounded-full border-2 transition-colors',
              hasBlockingOperation
                ? 'border-gray-600 border-t-purple-500 group-hover:border-t-purple-400 animate-spin'
                : 'border-gray-600 border-t-blue-400 animate-spin'
            ]"></div>

          <!-- Operation Label - versteckt auf sehr kleinen Bildschirmen -->
          <span
            class="hidden sm:block text-sm text-gray-300 group-hover:text-white transition-colors max-w-24 lg:max-w-32 truncate">
            {{ currentOperationLabel }}
          </span>

          <!-- Expand Icon (nur bei blocking operations) -->
          <svg
            v-if="hasBlockingOperation && loadingStore.isMinimized"
            class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7l4-4m0 0l4 4m-4-4v18" />
          </svg>
        </div>

        <!-- Mobile Search Button - neben den Nachrichten Button -->
        <button
          v-show="!showMobileSearch"
          @click="toggleMobileSearch"
          class="md:hidden flex items-center justify-center w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm rounded-lg border border-gray-600/50 transition-all duration-200 group"
          title="Suche öffnen">
          <Icon
            name="heroicons:magnifying-glass"
            class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
        </button>
        <!-- Nachrichten Button -->
        <NuxtLink
          to="/messages"
          class="relative flex items-center justify-center w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm rounded-lg border border-gray-600/50 transition-all duration-200 group hover:scale-105"
          :title="
            messagesStore.hasUnreadMessages
              ? `${messagesStore.unreadCount} ungelesene Nachrichten`
              : 'Nachrichten'
          ">
          <!-- Messages Icon -->
          <Icon
            name="heroicons:chat-bubble-left-ellipsis"
            class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />

          <!-- Unread Badge -->
          <div
            v-if="messagesStore.hasUnreadMessages"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg animate-pulse">
            {{
              messagesStore.unreadCount > 99 ? '99+' : messagesStore.unreadCount
            }}
          </div>
        </NuxtLink>

        <UserCredits />
        <UserAccount />
      </div>
      <!-- Hauptinhalt mit responsivem Padding für Logo und User Section -->
      <div
        class="w-full pl-[78px] pr-[120px] sm:pr-[160px] lg:pr-[240px] h-full flex items-center">
        <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full">
          <div class="flex items-center">
            <!-- Global Search - responsive Anzeige -->
            <div
              class="hidden md:block flex-1 max-w-xs lg:max-w-lg xl:max-w-2xl">
              <GlobalSearch />
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Search Overlay -->
      <div
        v-if="showMobileSearch"
        class="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 p-4 md:hidden z-50">
        <div class="flex items-center gap-3">
          <div class="flex-1">
            <GlobalSearch />
          </div>
          <button
            @click="closeMobileSearch"
            class="flex items-center justify-center w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg border border-gray-600/50 transition-all duration-200"
            title="Suche schließen">
            <Icon
              name="heroicons:x-mark"
              class="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
  const loadingStore = useLoadingStore();
  const messagesStore = useMessagesStore();

  // Mobile Search State
  const showMobileSearch = ref(false);

  // Mobile Search Functions
  const toggleMobileSearch = () => {
    showMobileSearch.value = !showMobileSearch.value;
  };

  const closeMobileSearch = () => {
    showMobileSearch.value = false;
  };

  // Close mobile search when clicking outside or pressing escape
  onMounted(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileSearch();
      }
    };
    document.addEventListener('keydown', handleEscape);

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape);
    });
  });

  // Einheitliche Loading-Logik für Header
  const hasAnyOperation = computed(() => {
    return loadingStore.hasOperations;
  });

  const hasBlockingOperation = computed(() => {
    return loadingStore.hasBlockingOperation;
  });

  const hasNonBlockingOperation = computed(() => {
    return loadingStore.hasNonBlockingOperation;
  });

  const totalOperationCount = computed(() => {
    return loadingStore.operationsList.length;
  });

  const currentOperationLabel = computed(() => {
    // Priorisiere blocking operations
    if (hasBlockingOperation.value) {
      const blockingOp = loadingStore.operationsList.find(
        op => op.type === 'import' || op.type === 'process'
      );
      return blockingOp?.label || 'Lädt...';
    }

    // Sonst zeige die erste non-blocking operation
    const nonBlockingOp = loadingStore.operationsList.find(
      op => op.type === 'api' || op.type === 'data'
    );
    return nonBlockingOp?.label || 'Lädt...';
  });

  const loadingTooltip = computed(() => {
    const count = totalOperationCount.value;
    if (count === 1) {
      return `Vorgang läuft: ${currentOperationLabel.value}`;
    }
    return `${count} Vorgänge laufen - Klicken für Details`;
  });

  const handleLoadingClick = () => {
    if (hasBlockingOperation.value) {
      // Bei blocking operations: Toggle zwischen minimiert/maximiert
      if (loadingStore.isMinimized) {
        loadingStore.maximize();
      } else {
        loadingStore.minimize();
      }
    }
    // Bei non-blocking operations passiert nichts (nur Info-Anzeige)
  };
</script>
<style scoped>
  /* Dunkles Gaming-Header Design */
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(10px);
  }
</style>
