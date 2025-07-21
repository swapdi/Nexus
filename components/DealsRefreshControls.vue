<template>
  <div class="flex items-center space-x-3">
    <!-- Refresh Button -->
    <button
      @click="handleRefresh"
      :disabled="isLoading || isBackgroundSyncing"
      class="inline-flex items-center px-2 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      :class="{
        'animate-pulse': isLoading
      }">
      <Icon
        name="mdi:refresh"
        class="h-6 w-6"
        :class="{
          'animate-spin': isLoading
        }" />
    </button>
    <!-- Background Sync Button -->
    <button
      v-if="!isBackgroundSyncing"
      @click="handleBackgroundSync"
      :disabled="isLoading"
      class="inline-flex items-center px-2 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
      <Icon name="mdi:cloud-sync" class="h-6 w-6" />
    </button>
  </div>
</template>
<script setup lang="ts">
  const dealsStore = useDealsStore();
  const loadingStore = useLoadingStore();
  const notifyStore = useNotifyStore();

  // Prüfe ob Background-Sync läuft über das Loading-System
  const isBackgroundSyncing = computed(() => {
    return loadingStore.operationsList.some(
      op => op.id === 'deals-background-sync'
    );
  });

  const isLoading = computed(() => {
    return loadingStore.hasNonBlockingOperation;
  });
  const handleRefresh = async () => {
    try {
      await dealsStore.loadDealsFromDB();
    } catch (error) {
      console.error('Refresh failed:', error);
    }
  };
  const handleBackgroundSync = async () => {
    try {
      await dealsStore.syncAllDealsInBackground();
    } catch (error) {
      console.error('Background sync failed:', error);
      notifyStore.notify(
        'Fehler beim Starten der Hintergrund-Synchronisation',
        2
      );
    }
  };
</script>
