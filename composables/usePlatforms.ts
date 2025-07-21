export const usePlatforms = () => {
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

  return {
    getPlatformIcon,
    getPlatformColor
  };
};
