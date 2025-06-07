<!-- filepath: c:\Users\jgram\git\Nexus\components\ViewModeToggle.vue -->
<template>
  <div
    class="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1 border border-gray-700/50">
    <button
      v-for="mode in VIEW_MODES"
      :key="mode.id"
      @click="handleModeChange(mode.id)"
      :class="[
        'flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200',
        currentViewMode === mode.id
          ? 'bg-purple-600 text-white shadow-md'
          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
      ]"
      :title="mode.name">
      <Icon :name="mode.icon" class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
  const { currentViewMode, setViewMode, VIEW_MODES } = useViewMode();

  const handleModeChange = (mode: ViewMode) => {
    console.log(
      'ViewModeToggle: Changing view mode from',
      currentViewMode.value,
      'to:',
      mode
    );
    setViewMode(mode);

    // Zusätzliche Debugging-Info
    nextTick(() => {
      console.log(
        'ViewModeToggle: After setViewMode, currentViewMode is now:',
        currentViewMode.value
      );
    });
  };
</script>
