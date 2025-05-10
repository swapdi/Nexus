<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ACCOUNT_ACCESS } from '~~/prisma/account-access-enum';

  const accountStore = useAccountStore();
  const { activeMembership } = storeToRefs(accountStore);

  onMounted(async () => {
    await accountStore.init();
  });
</script>
<template>
  <div
    class="flex flex-col items-center max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div class="text-center mb-12">
      <h2
        class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
        Flexible Pläne für jeden Bedarf
      </h2>
      <p class="text-xl text-gray-500">
        GameVault ist für alle da. Egal, ob du ein Einzelspieler bist oder ein
        Team von Entwicklern, wir haben den richtigen Plan für dich.
        <br />
        <span class="font-bold"
          >Starte jetzt mit unserem kostenlosen Plan!</span
        >
      </p>
    </div>

    <div class="flex flex-col md:flex-row justify-center items-center">
      <!-- Free Plan -->
      <div
        class="bg-white rounded-lg shadow-lg text-center px-6 py-8 md:mx-4 md:my-4 md:flex-1">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Free Tier</h3>
        <p class="text-3xl font-bold text-gray-900 mb-4">
          $0<span class="text-gray-600 text-lg">/mo</span>
        </p>
        <button
          v-if="!activeMembership"
          @click.prevent="navigateTo('/signup')"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
          Start for free
        </button>
      </div>

      <!-- Personal Plan -->
      <div
        class="bg-white rounded-lg shadow-lg text-center px-6 py-8 md:mx-4 md:my-4 md:flex-1">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Premium Tier</h3>
        <p class="text-3xl font-bold text-gray-900 mb-4">
          $10<span class="text-gray-600 text-lg">/mo</span>
        </p>

        <!-- logged in user gets a subscribe button-->
        <form
          action="/create-checkout-session"
          method="POST"
          v-if="
            activeMembership &&
            (activeMembership.access === ACCOUNT_ACCESS.OWNER ||
              activeMembership.access !== ACCOUNT_ACCESS.ADMIN) &&
            activeMembership?.account.plan_name !== 'Premium Tier'
          ">
          <input
            type="hidden"
            name="account_id"
            :value="activeMembership?.account_id" />
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
            Subscribe
          </button>
        </form>
        <!-- anon user gets a link to sign up -->
        <button
          v-if="!activeMembership"
          @click.prevent="navigateTo('/signup')"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
          Get started
        </button>
      </div>
    </div>
  </div>
</template>
