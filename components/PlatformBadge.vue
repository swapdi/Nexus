<script setup lang="ts">
import type { Platform } from '~/prisma/client';

defineProps<{
  platform: Platform;
}>();
</script>

<template>
  <div
    class="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700/40 font-medium"
  >
    <img
      v-if="platform.iconUrl"
      :src="platform.iconUrl"
      :alt="platform.name"
      class="w-4 h-4"
    />
    <span>{{ platform.name }}</span>
  </div>
</template>
