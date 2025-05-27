<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  const accountStore = useAccountStore();
  const { user } = storeToRefs(accountStore);

  onMounted(async () => {
    await accountStore.init();
  });
</script>

<template>
  <!-- Komponente wird nicht mehr benötigt, da es keine Accounts mehr gibt -->
  <!-- Kann in Zukunft für andere Benutzeroptionen verwendet werden -->
  <template v-if="user">
    <li class="text-sm text-gray-400">
      Angemeldet als {{ user.display_name || user.email }}
    </li>
  </template>
</template>
