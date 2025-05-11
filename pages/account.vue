<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue';
  import { useAccountStore } from '~/stores/account.store';
  import { useNotifyStore, NotificationType } from '~/stores/notify.store'; // Import NotificationType

  const accountStore = useAccountStore();
  const notifyStore = useNotifyStore();

  const editableAccountName = ref('');
  const isLoadingNameChange = ref(false);
  const isLoadingPage = ref(true); // Added for initial loading state

  // Computed properties for safe access and reactivity
  const account = computed(() => accountStore.activeAccount);
  const user = computed(() => accountStore.dbUser);

  const userEmail = computed(() => user.value?.email);
  const userDisplayName = computed(() => user.value?.display_name);
  const accountName = computed(() => account.value?.name);
  const accountFeatures = computed(() => account.value?.features || []);
  const currentPeriodEnds = computed(() => {
    if (account.value?.current_period_ends) {
      return new Date(account.value.current_period_ends).toLocaleDateString();
    }
    return 'N/A';
  });

  onMounted(async () => {
    isLoadingPage.value = true;
    try {
      // Ensure init runs if store is not populated or if essential data is missing
      if (
        !accountStore.activeAccount ||
        !accountStore.dbUser ||
        !accountStore.activeAccount.name
      ) {
        await accountStore.init();
      }
      // Populate editableAccountName after init or if account data is already available
      if (account.value?.name) {
        editableAccountName.value = account.value.name;
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

  // Watch for changes in the store's account name and update the local ref
  watch(
    () => account.value?.name,
    newName => {
      if (newName && editableAccountName.value !== newName) {
        editableAccountName.value = newName;
      }
    }
  );

  async function handleChangeAccountName() {
    if (!editableAccountName.value.trim()) {
      notifyStore.notify(
        'Account name cannot be empty.',
        NotificationType.Error
      );
      return;
    }
    if (!account.value) {
      notifyStore.notify('Account data not available.', NotificationType.Error);
      return;
    }
    if (editableAccountName.value.trim() === account.value.name) {
      notifyStore.notify(
        'Account name is already set to this value.',
        NotificationType.Info
      );
      return;
    }

    isLoadingNameChange.value = true;
    try {
      await accountStore.changeAccountName(editableAccountName.value.trim());
      notifyStore.notify(
        'Account name updated successfully!',
        NotificationType.Success
      );
    } catch (error: any) {
      console.error('Failed to change account name:', error);
      notifyStore.notify(
        error.message || 'Failed to update account name.',
        NotificationType.Error
      );
    } finally {
      isLoadingNameChange.value = false;
    }
  }
</script>

<template>
  <div class="container mx-auto p-4 md:p-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
      Account Settings
    </h1>

    <div v-if="isLoadingPage" class="text-center py-10">
      <svg
        class="animate-spin h-8 w-8 text-indigo-600 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
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
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Loading account details...
      </p>
    </div>

    <div
      v-else-if="!isLoadingPage && !account && !user"
      class="text-center py-10 bg-red-50 dark:bg-red-900 p-4 rounded-lg shadow">
      <p class="text-red-700 dark:text-red-300 font-semibold">
        Could not load account details.
      </p>
      <p class="text-red-600 dark:text-red-400 text-sm">
        Please try again later or contact support.
      </p>
    </div>

    <div v-else class="space-y-8">
      <!-- User Information Card -->
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
                class="block text-sm font-medium text-gray-500 dark:text-gray-400"
                >Display Name</label
              >
              <p class="mt-1 text-lg text-gray-900 dark:text-gray-100">
                {{ userDisplayName || 'N/A' }}
              </p>
              <!-- Future: Add edit functionality for display name if required -->
            </div>
          </div>
        </div>
      </div>

      <!-- Account Details Card -->
      <div
        class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        <div class="p-6">
          <h2
            class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
            Account Details
          </h2>
          <div class="space-y-4 mt-4">
            <div>
              <label
                for="accountNameInput"
                class="block text-sm font-medium text-gray-500 dark:text-gray-400"
                >Account Name</label
              >
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  id="accountNameInput"
                  v-model="editableAccountName"
                  type="text"
                  class="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 p-3"
                  placeholder="Your Account Name"
                  :disabled="isLoadingNameChange" />
                <button
                  @click="handleChangeAccountName"
                  :disabled="
                    isLoadingNameChange ||
                    editableAccountName === (account?.name || '') ||
                    !editableAccountName.trim()
                  "
                  class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition ease-in-out duration-150">
                  <svg
                    v-if="isLoadingNameChange"
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
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
                  <span v-if="isLoadingNameChange">Saving...</span>
                  <span v-else>Save Name</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Subscription & Features Card -->
      <div
        class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        <div class="p-6">
          <h2
            class="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300 border-b pb-2 dark:border-gray-700">
            Subscription & Features
          </h2>
          <div class="space-y-3 mt-4">
            <div>
              <label
                class="block text-sm font-medium text-gray-500 dark:text-gray-400"
                >Current Billing Period Ends</label
              >
              <p class="mt-1 text-lg text-gray-900 dark:text-gray-100">
                {{ currentPeriodEnds }}
              </p>
            </div>
            <div>
              <label
                class="block text-sm font-medium text-gray-500 dark:text-gray-400"
                >Active Features</label
              >
              <div
                v-if="accountFeatures.length > 0"
                class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="feature in accountFeatures"
                  :key="feature"
                  class="px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full dark:bg-green-700 dark:text-green-200">
                  {{ feature }}
                </span>
              </div>
              <p v-else class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                No special features currently active.
              </p>
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
</template>

<style scoped>
  /* Page-specific styles can be added here if Tailwind utilities are not sufficient */
</style>
