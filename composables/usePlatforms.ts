import { ref } from 'vue';

export const usePlatforms = () => {
  const platforms = ref<
    Array<{
      id: number;
      name: string;
      slug: string;
      iconUrl: string | null;
    }>
  >([]);

  /**
   * Hole Platform-Informationen für UserGame
   */
  const getPlatformInfo = (platformDRMs: number[] | undefined) => {
    if (!platformDRMs || platformDRMs.length === 0) {
      return [];
    }

    return platforms.value.filter(p => platformDRMs.includes(p.id));
  };

  /**
   * Hole Platform Icon für Anzeige
   */
  const getPlatformIcon = (platformSlug: string) => {
    const iconMap: Record<string, string> = {
      steam: 'simple-icons:steam',
      epic: 'simple-icons:epicgames',
      gog: 'simple-icons:gog'
    };

    return iconMap[platformSlug] || 'heroicons:computer-desktop';
  };

  /**
   * Hole Platform-Farbe für Styling
   */
  const getPlatformColor = (platformSlug: string) => {
    const colorMap: Record<string, string> = {
      steam: 'text-blue-400',
      epic: 'text-orange-400',
      gog: 'text-purple-400'
    };

    return colorMap[platformSlug] || 'text-gray-400';
  };

  /**
   * Lade Plattformen von der API
   */
  const loadPlatforms = async () => {
    try {
      const { $client } = useNuxtApp();
      // TODO: Implementiere API-Endpunkt für Plattformen
      // const result = await $client.platforms.getAllPlatforms.query();
      // platforms.value = result;

      // Temporäre Fallback-Daten bis API implementiert ist
      platforms.value = [
        {
          id: 1,
          name: 'Steam',
          slug: 'steam',
          iconUrl: '/img/stores/icons/0.png'
        },
        {
          id: 2,
          name: 'Epic Games Store',
          slug: 'epic',
          iconUrl: '/img/stores/icons/24.png'
        },
        { id: 3, name: 'GOG', slug: 'gog', iconUrl: '/img/stores/icons/6.png' }
      ];
    } catch (error) {
      console.error('Fehler beim Laden der Plattformen:', error);
    }
  };

  return {
    platforms: readonly(platforms),
    getPlatformInfo,
    getPlatformIcon,
    getPlatformColor,
    loadPlatforms
  };
};
