<script setup lang="ts">
  interface Props {
    platform: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'icon' | 'badge';
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    variant: 'icon'
  });

  // Platform Types
  type PlatformKey =
    | 'Steam'
    | 'Epic'
    | 'Epic Games'
    | 'GOG'
    | 'Xbox Game Pass'
    | 'Xbox'
    | 'Origin'
    | 'EA App'
    | 'Uplay'
    | 'Ubisoft'
    | 'Battle.net'
    | 'Itch.io'
    | 'Itch'
    | 'Microsoft Store'
    | 'Rockstar'
    | 'Bethesda'
    | 'default';

  // Platform logo mapping zu Simple Icons (über nuxt-icon)
  const platformIcons: Record<PlatformKey, string> = {
    Steam: 'simple-icons:steam',
    Epic: 'simple-icons:epicgames',
    'Epic Games': 'simple-icons:epicgames',
    GOG: 'simple-icons:gog',
    'Xbox Game Pass': 'simple-icons:xbox',
    Xbox: 'simple-icons:xbox',
    Origin: 'simple-icons:origin',
    'EA App': 'simple-icons:ea',
    Uplay: 'simple-icons:ubisoft',
    Ubisoft: 'simple-icons:ubisoft',
    'Battle.net': 'simple-icons:battlenet',
    'Itch.io': 'simple-icons:itchdotio',
    Itch: 'simple-icons:itchdotio',
    'Microsoft Store': 'simple-icons:microsoft',
    Rockstar: 'simple-icons:rockstargames',
    Bethesda: 'simple-icons:bethesda',
    default: 'heroicons:computer-desktop-20-solid'
  };

  // Platform Farben (Für dunklen Hintergrund optimiert)
  const platformColors: Record<PlatformKey, string> = {
    Steam: 'text-[#66C0F4]', // Steam blau, aber heller
    Epic: 'text-white',
    'Epic Games': 'text-white',
    GOG: 'text-[#86328A]',
    'Xbox Game Pass': 'text-[#107C10]',
    Xbox: 'text-[#107C10]',
    Origin: 'text-[#F56500]',
    'EA App': 'text-[#F56500]',
    Uplay: 'text-[#0F7CCD]',
    Ubisoft: 'text-[#0F7CCD]',
    'Battle.net': 'text-[#00AEFF]',
    'Itch.io': 'text-[#FA5C5C]',
    Itch: 'text-[#FA5C5C]',
    'Microsoft Store': 'text-[#00BCF2]',
    Rockstar: 'text-[#FCAF17]',
    Bethesda: 'text-[#D4AF37]',
    default: 'text-gray-400'
  };

  // Size mapping
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Container size für badge variant
  const containerSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  // Normalisiere Platform Namen und finde Matches
  const normalizedPlatform = computed((): PlatformKey => {
    const platform = props.platform.trim();

    // Direkte Übereinstimmung
    if (platformIcons[platform as PlatformKey]) {
      return platform as PlatformKey;
    }

    // Suche nach teilweisen Übereinstimmungen (case-insensitive)
    for (const key of Object.keys(platformIcons) as PlatformKey[]) {
      if (
        platform.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(platform.toLowerCase())
      ) {
        return key;
      }
    }

    return 'default';
  });

  const iconName = computed(() => platformIcons[normalizedPlatform.value]);
  const iconColor = computed(() => platformColors[normalizedPlatform.value]);
  const iconSize = computed(() => sizeClasses[props.size]);
  const containerSize = computed(() => containerSizes[props.size]);
</script>

<template>
  <div
    v-if="variant === 'badge'"
    :class="[
      containerSize,
      'bg-black/70 rounded-md backdrop-blur-sm flex items-center justify-center'
    ]">
    <Icon :name="iconName" :class="[iconSize, iconColor]" />
  </div>

  <Icon v-else :name="iconName" :class="[iconSize, iconColor]" />
</template>
