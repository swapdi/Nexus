export const useSteamImport = () => {
  /**
   * Steam-Bibliothek von Steam API abrufen
   */
  const fetchSteamLibrary = async (steamId: string): Promise<SteamGame[]> => {
    try {
      const apiKey = process.env.STEAM_API_KEY;
      if (!apiKey) {
        throw new Error('Steam API Key nicht konfiguriert');
      }
      const response = await fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`
      );
      if (!response.ok) {
        console.error('Steam API Error:', response.status, response.statusText);
        throw new Error(`Steam API Error: ${response.status}`);
      }
      const data: SteamLibraryResponse = await response.json();
      if (!data.response?.games) {
        throw new Error(
          'Keine Spiele in der Steam-Bibliothek gefunden oder Profil ist privat'
        );
      }
      return data.response.games;
    } catch (error) {
      console.error('Fehler beim Laden der Steam-Bibliothek:', error);
      throw error;
    }
  };
  const isValidSteamID = (idString: string) => {
    if (!idString || typeof idString !== 'string') {
      return false;
    }
    // Reguläre Ausdrücke für die gängigen Formate
    const steamID2Regex = /^STEAM_[01]:[01]:\d+$/;
    const steamID3Regex = /^\[U:1:\d+\]$/;
    const steamID64Regex = /^7656119\d{10}$/;
    // Prüft, ob der String auf eines der Muster passt
    const patterns = [steamID64Regex, steamID2Regex, steamID3Regex];
    return patterns.some(regex => regex.test(idString));
  };
  /**
   * Steam Cover-URL für ein Spiel generieren
   */
  const getSteamCoverUrl = (appId: number): string => {
    return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900.jpg`;
  };
  /**
   * Steam Store-URL für ein Spiel generieren
   */
  const getSteamStoreUrl = (appId: number): string => {
    return `https://store.steampowered.com/app/${appId}/`;
  };
  /**
   * Steam Icon-URL für ein Spiel generieren
   */
  const getSteamIconUrl = (appId: number, iconHash?: string): string => {
    if (!iconHash) {
      return '';
    }
    return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/${iconHash}.ico`;
  };

  return {
    fetchSteamLibrary,
    isValidSteamID,
    getSteamCoverUrl,
    getSteamStoreUrl,
    getSteamIconUrl
  };
};
