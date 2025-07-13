<script setup lang="ts">
  const user = useSupabaseUser();
  const isDropdownOpen = ref(false);
  const dropdownRef = ref<HTMLElement>();
  // Grund: Dropdown schließen wenn außerhalb geklickt wird
  function handleClickOutside(event: MouseEvent) {
    if (
      dropdownRef.value &&
      !dropdownRef.value.contains(event.target as Node)
    ) {
      isDropdownOpen.value = false;
    }
  }
  // Grund: Event Listener für Click-Outside hinzufügen/entfernen
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  // Grund: Toggle-Funktion für das Dropdown
  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
  }
  // Grund: Dropdown schließen bei Navigation
  function handleNavigation() {
    isDropdownOpen.value = false;
  }
</script>
<template>
  <div ref="dropdownRef" class="relative">
    <!-- Avatar Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-3 p-2 rounded-xl transition-all duration-300 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-purple-500/20 group">
      <!-- Avatar mit Glow-Effekt -->
      <div class="relative">
        <div
          class="w-10 h-10 rounded-full ring-2 ring-purple-500/30 group-hover:ring-purple-400/60 transition-all duration-300 overflow-hidden">
          <img
            v-if="user?.user_metadata?.avatar_url"
            :src="user.user_metadata.avatar_url"
            alt="Avatar"
            class="w-full h-full object-cover" />
          <img
            v-else
            src="~/assets/images/avatar.svg"
            alt="Default Avatar"
            class="w-full h-full object-cover" />
        </div>
        <!-- Online-Indicator -->
        <div
          class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full ring-2 ring-gray-900"></div>
      </div>
      <!-- User Name (optional, kann ausgeblendet werden auf kleinen Bildschirmen) -->
      <div class="hidden md:block text-left">
        <p
          class="text-sm font-medium text-gray-100 group-hover:text-white transition-colors">
          {{ user?.user_metadata?.full_name || 'User' }}
        </p>
        <p
          class="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
          {{ user?.email }}
        </p>
      </div>
      <!-- Dropdown Arrow -->
      <svg
        :class="{ 'rotate-180': isDropdownOpen }"
        class="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-all duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95">
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 mt-2 w-72 bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl ring-1 ring-purple-500/20 border border-gray-700/50 overflow-hidden z-50">
        <!-- User Info Header -->
        <div
          class="px-6 py-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-gray-700/50">
          <div class="flex items-center space-x-3">
            <div
              class="w-12 h-12 rounded-full ring-2 ring-purple-400/50 overflow-hidden">
              <img
                v-if="user?.user_metadata?.avatar_url"
                :src="user.user_metadata.avatar_url"
                alt="Avatar"
                class="w-full h-full object-cover" />
              <img
                v-else
                src="~/assets/images/avatar.svg"
                alt="Default Avatar"
                class="w-full h-full object-cover" />
            </div>
            <div>
              <p class="font-semibold text-gray-100">
                {{ user?.user_metadata?.full_name || 'User' }}
              </p>
              <p class="text-sm text-gray-400">{{ user?.email }}</p>
            </div>
          </div>
        </div>
        <!-- Menu Items -->
        <div class="py-2">
          <!-- Profile -->
          <NuxtLink
            to="/profile"
            @click="handleNavigation"
            class="flex items-center px-6 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-transparent transition-all duration-200 group">
            <svg
              class="w-5 h-5 mr-3 text-purple-400 group-hover:text-purple-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="font-medium">Profil</span>
          </NuxtLink>
          <!-- Settings -->
          <NuxtLink
            to="/settings"
            @click="handleNavigation"
            class="flex items-center px-6 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-transparent transition-all duration-200 group">
            <svg
              class="w-5 h-5 mr-3 text-blue-400 group-hover:text-blue-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="font-medium">Einstellungen</span>
          </NuxtLink>
          <hr class="my-2 border-gray-700/50" />
          <!-- Logout -->
          <UserAccountSignout @click="handleNavigation" />
        </div>
      </div>
    </Transition>
  </div>
</template>
