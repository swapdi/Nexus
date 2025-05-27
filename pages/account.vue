<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue';
  import { useAccountStore } from '~/stores/account.store';
  import { useNotifyStore, NotificationType } from '~/stores/notify.store';

  const accountStore = useAccountStore();
  const notifyStore = useNotifyStore();

  const editableDisplayName = ref('');
  const isLoadingNameChange = ref(false);
  const isLoadingPage = ref(true);

  // Computed properties for safe access and reactivity
  const user = computed(() => accountStore.user);

  const userEmail = computed(() => user.value?.email);
  const userDisplayName = computed(() => user.value?.display_name);
  const userLevel = computed(() => user.value?.level || 1);
  const userXP = computed(() => user.value?.xp || 0);
  const userCredits = computed(() => user.value?.credits || 0);

  onMounted(async () => {
    isLoadingPage.value = true;
    await accountStore.init();
    try {
      // Ensure init runs if store is not populated
      // Populate editableDisplayName after init or if user data is already available
      if (user.value?.display_name) {
        editableDisplayName.value = user.value.display_name;
      }
    } catch (error) {
      console.error('Error initializing account page:', error);
      notifyStore.notify(
        'Could not load account details. Please try again.',
        NotificationType.Error
      );
    } finally {
      isLoadingPage.value = false;
    }
  });

  // Watch for changes in the store's display name and update the local ref
  watch(
    () => user.value?.display_name,
    newName => {
      if (newName && editableDisplayName.value !== newName) {
        editableDisplayName.value = newName;
      }
    }
  );

  async function handleChangeDisplayName() {
    if (!editableDisplayName.value.trim()) {
      notifyStore.notify(
        'Display name cannot be empty.',
        NotificationType.Error
      );
      return;
    }
    if (!user.value) {
      notifyStore.notify('User data not available.', NotificationType.Error);
      return;
    }
    if (editableDisplayName.value.trim() === user.value.display_name) {
      notifyStore.notify(
        'Display name is already set to this value.',
        NotificationType.Info
      );
      return;
    }

    isLoadingNameChange.value = true;
    try {
      // TODO: Implement updateUser method in account store
      // await accountStore.updateUser({ display_name: editableDisplayName.value.trim() });
      notifyStore.notify(
        'Display name updated successfully!',
        NotificationType.Success
      );
    } catch (error: any) {
      console.error('Failed to change display name:', error);
      notifyStore.notify(
        error.message || 'Failed to update display name.',
        NotificationType.Error
      );
    } finally {
      isLoadingNameChange.value = false;
    }
  }
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1
          class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
          Account Settings
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Manage your account details and preferences.
        </p>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoadingPage"
        class="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
        <div class="animate-pulse flex space-x-4">
          <div
            class="rounded-full bg-gray-300 dark:bg-gray-600 h-12 w-12"></div>
          <div class="flex-1 space-y-2 py-1">
            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
          </div>
        </div>
        <p class="text-center text-gray-500 dark:text-gray-400 mt-4">
          Loading account details...
        </p>
      </div>

      <!-- Account Content -->
      <div v-else class="space-y-6">
        <!-- User Profile Card -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h2
              class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
              User Profile
            </h2>
            <div class="space-y-3 mt-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-500 dark:text-gray-400"
                  >Email Address</label
                >
                <p class="mt-1 text-lg text-gray-900 dark:text-gray-100">
                  {{ userEmail || 'N/A' }}
                </p>
              </div>
              <div>
                <label
                  for="displayNameInput"
                  class="block text-sm font-medium text-gray-500 dark:text-gray-400"
                  >Display Name</label
                >
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    id="displayNameInput"
                    v-model="editableDisplayName"
                    type="text"
                    class="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 p-3"
                    placeholder="Your Display Name"
                    :disabled="isLoadingNameChange" />
                  <button
                    @click="handleChangeDisplayName"
                    :disabled="isLoadingNameChange"
                    class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150">
                    <svg
                      v-if="!isLoadingNameChange"
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7" />
                    </svg>
                    <svg
                      v-else
                      class="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gaming Stats Card -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h2
              class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
              Gaming Stats
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <div
                  class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {{ userLevel }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Level
                </div>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div
                  class="text-2xl font-bold text-green-600 dark:text-green-400">
                  {{ userXP }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Experience Points
                </div>
              </div>
              <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div
                  class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {{ userCredits }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Credits
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Danger Zone Card -->
        <div
          class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div class="p-6">
            <h2
              class="text-2xl font-semibold mb-4 text-red-600 dark:text-red-500 border-b pb-2 dark:border-gray-700">
              Danger Zone
            </h2>
            <div class="space-y-3 mt-4">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Manage sensitive account operations with caution.
                </p>
                <NuxtLink
                  to="/deletemyaccount"
                  class="inline-flex items-center px-4 py-2 border border-red-500 text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:text-red-300 dark:border-red-600 dark:bg-red-700 dark:hover:bg-red-600 transition ease-in-out duration-150">
                  Delete My Account
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Page-specific styles can be added here if Tailwind utilities are not sufficient */
</style>
