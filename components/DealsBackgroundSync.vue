<template>
  <div
    v-if="dealsStore.isBackgroundSyncing || showLastSync"
    class="bg-gray-800/90 border border-gray-700 rounded-lg p-3 mb-4">
    <!-- Aktive Synchronisation -->
    <div
      v-if="dealsStore.isBackgroundSyncing"
      class="flex items-center space-x-3">
      <div class="flex-shrink-0">
        <div
          class="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-white">
          Deals werden im Hintergrund synchronisiert...
        </p>
        <p v-if="dealsStore.syncProgress" class="text-xs text-gray-400">
          {{ dealsStore.syncProgress.message }}
        </p>
      </div>
      <div class="flex-shrink-0">
        <Icon name="mdi:cloud-download" class="h-5 w-5 text-blue-400" />
      </div>
    </div>
    <!-- Letzte Synchronisation -->
    <div
      v-else-if="showLastSync && dealsStore.lastSyncTime"
      class="flex items-center space-x-3">
      <div class="flex-shrink-0">
        <Icon name="mdi:check-circle" class="h-5 w-5 text-green-400" />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm text-gray-300">
          Letzte Synchronisation: {{ formatLastSync }}
        </p>
      </div>
      <button
        @click="hideLastSync"
        class="flex-shrink-0 text-gray-400 hover:text-gray-300 transition-colors">
        <Icon name="mdi:close" class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
  interface Props {
    showLastSync?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    showLastSync: true
  });
  const dealsStore = useDealsStore();
  const showLastSyncInfo = ref(props.showLastSync);
  const showLastSync = computed(() => {
    return showLastSyncInfo.value && !dealsStore.isBackgroundSyncing;
  });
  const formatLastSync = computed(() => {
    if (!dealsStore.lastSyncTime) return '';
    const now = new Date();
    const syncTime = new Date(dealsStore.lastSyncTime);
    const diffMinutes = Math.floor(
      (now.getTime() - syncTime.getTime()) / (1000 * 60)
    );
    if (diffMinutes === 0) return 'gerade eben';
    if (diffMinutes === 1) return 'vor 1 Minute';
    if (diffMinutes < 60) return `vor ${diffMinutes} Minuten`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours === 1) return 'vor 1 Stunde';
    if (diffHours < 24) return `vor ${diffHours} Stunden`;
    return syncTime.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  });
  const hideLastSync = () => {
    showLastSyncInfo.value = false;
  };
</script>
