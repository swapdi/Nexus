<script lang="ts" setup>
  const modalIsVisible = ref(false);
  interface Props {
    showOk?: boolean;
    showCancel?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    showOk: true,
    showCancel: false
  });
  const open = () => {
    modalIsVisible.value = true;
  };
  const close = () => {
    modalIsVisible.value = false;
  };
  defineExpose({ open, close });
  const emit = defineEmits(['closeOk', 'closeCancel']);
  const closeOk = () => {
    emit('closeOk');
    modalIsVisible.value = false;
  };
  const closeCancel = () => {
    emit('closeCancel');
    modalIsVisible.value = false;
  };
</script>

<template>
  <input
    type="checkbox"
    id="my-modal"
    class="modal-toggle"
    v-model="modalIsVisible" />
  <div class="modal">
    <div class="modal-box">
      <slot />
      <div class="flex justify-end space-x-2">
        <div class="modal-action" v-if="showOk">
          <label class="btn btn-success" @click="closeOk()">Ok</label>
        </div>
        <div class="modal-action" v-if="showCancel">
          <label class="btn btn-error" @click="closeCancel()">Cancel</label>
        </div>
      </div>
    </div>
  </div>
</template>
