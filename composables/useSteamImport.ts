/**
 * Composable für Steam API Integration und Import Funktionalität
 * Grund: Alle Steam-bezogenen Operationen in einem Composable vereint
 */

// Steam API Interfaces
export interface SteamGame {
  appid: number;
  name: string;
  playtime_forever: number;
  rtime_last_played?: number;
  img_icon_url?: string;
  img_logo_url?: string;
}

export interface SteamLibraryResponse {
  response: {
    game_count: number;
    games: SteamGame[];
  };
}

export interface SteamResolveResponse {
  response: {
    steamid?: string;
    success: number;
  };
}

// Steam Import Interfaces
export interface SteamImportOptions {
  userId: number;
  platformId: number;
  withIGDBEnrichment?: boolean;
  batchSize?: number;
  operationId?: string;
}

export interface SteamImportProgress {
  current: number;
  total: number;
  phase: 'validation' | 'fetching' | 'importing' | 'enriching' | 'completed';
  message: string;
}

export interface SteamImportResult {
  success: boolean;
  totalGames: number;
  imported: number;
  updated: number;
  skipped: number;
  errors: number;
  enriched?: number;
  enrichmentErrors?: number;
  message?: string;
}

export const useSteamImport = () => {
  // ============================================================================
  // STEAM API FUNKTIONEN
  // ============================================================================

  /**
   * Validiert und extrahiert Steam ID aus verschiedenen Eingabeformaten
   */
  const extractSteamId = async (input: string): Promise<string | null> => {
    // Steam ID 64 (17 Ziffern)
    const steamId64Match = input.match(/\b\d{17}\b/);
    if (steamId64Match) {
      return steamId64Match[0];
    }

    // Steam Profil URL
    const profileUrlMatch = input.match(
      /steamcommunity\.com\/profiles\/(\d{17})/
    );
    if (profileUrlMatch) {
      return profileUrlMatch[1];
    }

    // Steam Custom URL - verwende ResolveVanityURL API
    const vanityUrlMatch = input.match(
      /steamcommunity\.com\/id\/([a-zA-Z0-9_-]+)/
    );
    if (vanityUrlMatch) {
      return await resolveSteamVanityUrl(vanityUrlMatch[1]);
    }

    // Versuche direkt als Vanity URL
    if (/^[a-zA-Z0-9_-]+$/.test(input)) {
      return await resolveSteamVanityUrl(input);
    }

    return null;
  };

  /**
   * Steam Vanity URL zu Steam ID auflösen
   */
  const resolveSteamVanityUrl = async (
    vanityUrl: string
  ): Promise<string | null> => {
    try {
      const apiKey = process.env.STEAM_API_KEY;
      if (!apiKey) {
        throw new Error('Steam API Key nicht konfiguriert');
      }

      const response = await fetch(
        `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${apiKey}&vanityurl=${vanityUrl}`
      );

      if (!response.ok) {
        console.error('Steam API Error:', response.status, response.statusText);
        return null;
      }

      const data: SteamResolveResponse = await response.json();

      if (data.response.success === 1 && data.response.steamid) {
        return data.response.steamid;
      }

      return null;
    } catch (error) {
      console.error('Fehler beim Auflösen der Steam Vanity URL:', error);
      return null;
    }
  };

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

      console.log(
        `Steam-Bibliothek geladen: ${data.response.game_count} Spiele`
      );
      return data.response.games;
    } catch (error) {
      console.error('Fehler beim Laden der Steam-Bibliothek:', error);
      throw error;
    }
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

  // ============================================================================
  // STEAM IMPORT FUNKTIONEN
  // ============================================================================

  /**
   * Verarbeitet Steam-Spiele in Batches
   * HINWEIS: Dies orchestriert den Batch-Prozess, die eigentliche Spiel-Verarbeitung erfolgt im GamesService
   */
  const processGamesBatch = async (
    games: any[],
    options: SteamImportOptions,
    onProgress?: (progress: SteamImportProgress) => void
  ) => {
    const {
      batchSize = 15,
      withIGDBEnrichment = false,
      userId,
      platformId
    } = options;
    const totalBatches = Math.ceil(games.length / batchSize);

    const importResults = {
      imported: 0,
      updated: 0,
      skipped: 0,
      errors: 0,
      enriched: 0,
      enrichmentErrors: 0
    };

    // Dynamischer Import des GamesService um zirkuläre Abhängigkeiten zu vermeiden
    const { GamesService } = await import('~/lib/services/games.service');

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const batchStart = batchIndex * batchSize;
      const batchEnd = Math.min(batchStart + batchSize, games.length);
      const batch = games.slice(batchStart, batchEnd);

      // Progress Update
      onProgress?.({
        current: batchStart,
        total: games.length,
        phase: 'importing',
        message: `Importiere Batch ${batchIndex + 1}/${totalBatches}...`
      });

      // Verarbeite jedes Spiel im Batch
      for (const game of batch) {
        try {
          const result = withIGDBEnrichment
            ? await GamesService.processSteamGameImportWithEnrichment(
                userId,
                game,
                platformId,
                true
              )
            : await GamesService.processSteamGameImport(
                userId,
                game,
                platformId
              );

          // Ergebnisse aggregieren basierend auf Return-Type
          if (typeof result === 'string') {
            // processSteamGameImport gibt string zurück
            if (result === 'imported') {
              importResults.imported++;
            } else if (result === 'updated') {
              importResults.updated++;
            } else {
              importResults.skipped++;
            }
          } else {
            // processSteamGameImportWithEnrichment gibt object zurück
            if (result.result === 'imported') {
              importResults.imported++;
            } else if (result.result === 'updated') {
              importResults.updated++;
            } else {
              importResults.skipped++;
            }

            // Anreicherung tracken
            if (result.enriched) {
              importResults.enriched++;
            }
          }
        } catch (error) {
          importResults.errors++;
          console.error(
            `Fehler beim Importieren von Spiel ${game.name}:`,
            error
          );
        }
      }

      // Kurze Pause zwischen Batches
      if (batchIndex < totalBatches - 1) {
        await new Promise(resolve =>
          setTimeout(resolve, withIGDBEnrichment ? 250 : 50)
        );
      }
    }

    return importResults;
  };

  /**
   * Validiert Steam Input und gibt aufbereitete Daten zurück
   */
  const validateSteamInput = async (
    input: string
  ): Promise<{
    isValid: boolean;
    type: string;
    value: string;
    steamId?: string;
  }> => {
    if (!input || input.trim().length === 0) {
      return { isValid: false, type: 'empty', value: '' };
    }

    const trimmedInput = input.trim();

    // Steam ID 64
    if (/^\d{17}$/.test(trimmedInput)) {
      return {
        isValid: true,
        type: 'steamid64',
        value: trimmedInput,
        steamId: trimmedInput
      };
    }

    // Steam Profile URL
    if (trimmedInput.includes('steamcommunity.com/profiles/')) {
      const steamId = await extractSteamId(trimmedInput);
      return {
        isValid: !!steamId,
        type: 'profile_url',
        value: trimmedInput,
        steamId: steamId || undefined
      };
    }

    // Steam Custom URL
    if (trimmedInput.includes('steamcommunity.com/id/')) {
      const steamId = await extractSteamId(trimmedInput);
      return {
        isValid: !!steamId,
        type: 'custom_url',
        value: trimmedInput,
        steamId: steamId || undefined
      };
    }

    // Direkte Custom URL
    if (/^[a-zA-Z0-9_]+$/.test(trimmedInput) && trimmedInput.length > 2) {
      const steamId = await resolveSteamVanityUrl(trimmedInput);
      return {
        isValid: !!steamId,
        type: 'username',
        value: trimmedInput,
        steamId: steamId || undefined
      };
    }

    return { isValid: false, type: 'invalid', value: trimmedInput };
  };

  /**
   * Berechnet XP-Belohnung für Import
   */
  const calculateImportXPReward = (importedCount: number): number => {
    return Math.min(importedCount * 10, 500); // Max 500 XP pro Import
  };

  /**
   * Erstellt Progress-Callback für Import-Prozess
   */
  const createProgressCallback = (operationId?: string) => {
    return (current: number, total: number, message: string) => {
      if (operationId && process.server) {
        // Server-side progress update
        // Hier könnte SSE oder WebSocket Integration erfolgen
        console.log(`[${operationId}] ${current}/${total}: ${message}`);
      }
    };
  };

  return {
    // Steam API Funktionen
    extractSteamId,
    resolveSteamVanityUrl,
    fetchSteamLibrary,
    getSteamCoverUrl,
    getSteamStoreUrl,
    getSteamIconUrl,
    // Steam Import Funktionen
    processGamesBatch,
    validateSteamInput,
    calculateImportXPReward,
    createProgressCallback
  };
};
