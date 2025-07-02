/**
 * Composable für Game-Enrichment mit IGDB Integration
 * Grund: Komplexe Anreicherungslogik und IGDB-Suchlogik vereint
 */

// Generische Enrichment Interfaces
export interface EnrichmentOptions {
  forceUpdate?: boolean;
  skipIfComplete?: boolean;
  batchSize?: number;
  delayBetweenRequests?: number;
}

export interface EnrichmentResult {
  enriched: boolean;
  skipped: boolean;
  error?: string;
  updatedFields: string[];
}

export interface BatchEnrichmentResult {
  total: number;
  enriched: number;
  skipped: number;
  errors: number;
  errorDetails?: string[];
  message?: string;
}

export interface GameEnrichmentData {
  description?: string;
  coverUrl?: string;
  releaseDate?: Date;
  developer?: string;
  publisher?: string;
  genres?: string[];
  rating?: number;
}

// IGDB API Interfaces
export interface IGDBGame {
  id: number;
  name: string;
  summary?: string;
  cover?: {
    id: number;
    url: string;
  };
  screenshots?: Array<{
    id: number;
    url: string;
  }>;
  genres?: Array<{
    id: number;
    name: string;
  }>;
  platforms?: Array<{
    id: number;
    name: string;
    abbreviation?: string;
  }>;
  involved_companies?: Array<{
    id: number;
    company: {
      id: number;
      name: string;
    };
    developer: boolean;
    publisher: boolean;
  }>;
  release_dates?: Array<{
    id: number;
    date: number;
    platform: number;
  }>;
  rating?: number;
  rating_count?: number;
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  first_release_date?: number;
  total_rating?: number;
  total_rating_count?: number;
}

export interface IGDBSearchResult {
  id: number;
  name: string;
  first_release_date?: number;
  platforms?: Array<{
    id: number;
    name: string;
  }>;
}

export interface EnrichedGameData {
  description?: string;
  coverUrl?: string;
  screenshotUrls?: string[];
  genres?: string[];
  developer?: string;
  publisher?: string;
  releaseDate?: Date;
  rating?: number;
  igdbId?: number;
}

export const useGameEnrichment = () => {
  /**
   * Bestimme ob ein Spiel angereichert werden sollte
   */
  const shouldEnrichGame = (
    game: {
      description?: string | null;
      coverUrl?: string | null;
      developer?: string | null;
      publisher?: string | null;
      genres: string[];
      rating?: number | null;
    },
    options: EnrichmentOptions = {}
  ): boolean => {
    const { forceUpdate = false, skipIfComplete = true } = options;

    if (forceUpdate) {
      return true;
    }

    if (!skipIfComplete) {
      return true;
    }

    // Prüfe ob wichtige Felder fehlen
    const missingDescription =
      !game.description || game.description.trim().length === 0;
    const missingGenres = !game.genres || game.genres.length === 0;
    const missingCover = !game.coverUrl || game.coverUrl.trim().length === 0;
    const missingDeveloper =
      !game.developer || game.developer.trim().length === 0;

    return (
      missingDescription || missingGenres || missingCover || missingDeveloper
    );
  };

  /**
   * Vergleiche aktuelle und neue Spieldaten und bestimme welche Felder aktualisiert werden sollen
   */
  const determineFieldsToUpdate = (
    currentGame: {
      description?: string | null;
      coverUrl?: string | null;
      releaseDate?: Date | null;
      developer?: string | null;
      publisher?: string | null;
      genres: string[];
      rating?: number | null;
    },
    enrichedData: GameEnrichmentData,
    forceUpdate: boolean = false
  ): { updateData: Partial<GameEnrichmentData>; updatedFields: string[] } => {
    const updateData: Partial<GameEnrichmentData> = {};
    const updatedFields: string[] = [];

    // Beschreibung
    if (enrichedData.description && (!currentGame.description || forceUpdate)) {
      updateData.description = enrichedData.description;
      updatedFields.push('description');
    }

    // Cover-URL (IGDB nur verwenden wenn kein Cover vorhanden oder forceUpdate)
    if (enrichedData.coverUrl && (!currentGame.coverUrl || forceUpdate)) {
      updateData.coverUrl = enrichedData.coverUrl;
      updatedFields.push('coverUrl');
    }

    // Veröffentlichungsdatum
    if (enrichedData.releaseDate && (!currentGame.releaseDate || forceUpdate)) {
      updateData.releaseDate = enrichedData.releaseDate;
      updatedFields.push('releaseDate');
    }

    // Entwickler
    if (enrichedData.developer && (!currentGame.developer || forceUpdate)) {
      updateData.developer = enrichedData.developer;
      updatedFields.push('developer');
    }

    // Publisher
    if (enrichedData.publisher && (!currentGame.publisher || forceUpdate)) {
      updateData.publisher = enrichedData.publisher;
      updatedFields.push('publisher');
    }

    // Genres
    if (
      enrichedData.genres &&
      enrichedData.genres.length > 0 &&
      (currentGame.genres.length === 0 || forceUpdate)
    ) {
      updateData.genres = enrichedData.genres;
      updatedFields.push('genres');
    }

    // Bewertung
    if (enrichedData.rating && (!currentGame.rating || forceUpdate)) {
      updateData.rating = enrichedData.rating;
      updatedFields.push('rating');
    }

    return { updateData, updatedFields };
  };

  /**
   * Verarbeite Batch-Anreicherung mit Fortschritt
   */
  const processBatchEnrichment = async (
    games: Array<{ id: number; title: string; platformName?: string }>,
    enrichmentFunction: (
      gameId: number,
      gameName: string,
      platformName?: string,
      forceUpdate?: boolean
    ) => Promise<boolean>,
    options: EnrichmentOptions = {},
    progressCallback?: (progress: {
      current: number;
      total: number;
      currentGame: string;
    }) => void
  ): Promise<BatchEnrichmentResult> => {
    const {
      batchSize = 10,
      delayBetweenRequests = 250,
      forceUpdate = false
    } = options;

    const result: BatchEnrichmentResult = {
      total: games.length,
      enriched: 0,
      skipped: 0,
      errors: 0,
      errorDetails: [],
      message: ''
    };

    // Spiele in Batches verarbeiten
    for (let i = 0; i < games.length; i += batchSize) {
      const batch = games.slice(i, Math.min(i + batchSize, games.length));

      const batchPromises = batch.map(async (game, batchIndex) => {
        const currentIndex = i + batchIndex;

        if (progressCallback) {
          progressCallback({
            current: currentIndex + 1,
            total: games.length,
            currentGame: game.title
          });
        }

        try {
          const enriched = await enrichmentFunction(
            game.id,
            game.title,
            game.platformName,
            forceUpdate
          );

          if (enriched) {
            result.enriched++;
          } else {
            result.skipped++;
          }

          // Verzögerung zwischen Anfragen um API zu schonen
          if (delayBetweenRequests > 0 && currentIndex < games.length - 1) {
            await new Promise(resolve =>
              setTimeout(resolve, delayBetweenRequests)
            );
          }

          return { success: true, game };
        } catch (error) {
          result.errors++;
          const errorMsg = `Fehler bei Anreicherung von "${game.title}": ${error}`;
          if (!result.errorDetails) {
            result.errorDetails = [];
          }
          result.errorDetails.push(errorMsg);
          console.error(errorMsg);

          return { success: false, game, error };
        }
      });

      // Warte bis alle Spiele im aktuellen Batch verarbeitet sind
      await Promise.all(batchPromises);
    }

    return result;
  };

  /**
   * Generiere Steam-spezifische Cover-URL falls IGDB fehlschlägt
   */
  const generateSteamCoverUrl = (steamAppId: string): string => {
    return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steamAppId}/library_600x900.jpg`;
  };

  /**
   * Validiere angereicherte Daten
   */
  const validateEnrichedData = (
    data: GameEnrichmentData
  ): { isValid: boolean; issues: string[] } => {
    const issues: string[] = [];

    // Beschreibung sollte nicht zu kurz sein
    if (data.description && data.description.length < 10) {
      issues.push('Beschreibung zu kurz');
    }

    // Cover-URL sollte valide sein
    if (data.coverUrl && !data.coverUrl.startsWith('http')) {
      issues.push('Ungültige Cover-URL');
    }

    // Genres sollten nicht leer sein
    if (data.genres && data.genres.length === 0) {
      issues.push('Genres-Array ist leer');
    }

    // Rating sollte im gültigen Bereich sein
    if (data.rating && (data.rating < 0 || data.rating > 100)) {
      issues.push('Rating außerhalb des gültigen Bereichs (0-100)');
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  };

  // ============================================================================
  // IGDB-SPEZIFISCHE FUNKTIONEN
  // ============================================================================

  /**
   * Steam-Namen für IGDB-Suche bereinigen
   */
  const cleanSteamGameName = (gameName: string): string => {
    return (
      gameName
        // Steam-spezifische Zusätze entfernen
        .replace(
          /\s*(Single Player|Multiplayer|Complete Edition|Digital Deluxe|Gold Edition|GOTY|Game of the Year|Definitive Edition|Enhanced Edition)$/i,
          ''
        )
        .replace(
          /\s*(Directors? Cut|Ultimate Edition|Collectors? Edition|Special Edition|Remastered|HD Edition|Deluxe Edition)$/i,
          ''
        )
        .replace(
          /\s*(Anniversary Edition|Legendary Edition|Premium Edition|Platinum Edition|Royal Edition|Standard Edition)$/i,
          ''
        )
        .replace(
          /\s*(Early Access|Beta|Alpha|Demo|Free|Free to Play|F2P)$/i,
          ''
        )
        .replace(/\s*\(.*?\)$/g, '') // Entferne Klammern am Ende
        .replace(/\s*\[.*?\]$/g, '') // Entferne eckige Klammern am Ende
        .replace(/[™®©]/g, '') // Entferne Trademark-Zeichen
        .replace(/\s*-\s*(Demo|Beta|Alpha|Early Access|Free|Lite)$/i, '') // Entferne Demo/Beta Zusätze
        .replace(/\s*:\s*(Demo|Beta|Alpha|Free|Lite)$/i, '') // Entferne Demo/Beta nach Doppelpunkt
        .replace(/\s+/g, ' ') // Normalisiere Leerzeichen
        .replace(/\s*&\s*/g, ' and ') // Ersetze & mit and
        .replace(/\s*\+\s*/g, ' Plus ') // Ersetze + mit Plus
        .trim()
    );
  };

  /**
   * Generiere verschiedene Suchvarianten eines Spielnamens
   */
  const generateSearchVariants = (gameName: string): string[] => {
    const variants: string[] = [];
    const cleaned = cleanSteamGameName(gameName);

    // 1. Bereinigter Name (höchste Priorität)
    variants.push(cleaned);

    // 2. Original-Name falls anders
    if (gameName !== cleaned) {
      variants.push(gameName);
    }

    // 3. Ohne Untertitel (alles vor : oder - entfernen)
    const withoutSubtitle = cleaned.split(/[:\-–—]/)[0].trim();
    if (withoutSubtitle !== cleaned && withoutSubtitle.length > 2) {
      variants.push(withoutSubtitle);
    }

    // 4. Ohne Nummerierungen am Ende (z.B. "Game 2" -> "Game")
    const withoutNumbers = cleaned.replace(/\s+\d+$/, '').trim();
    if (withoutNumbers !== cleaned && withoutNumbers.length > 2) {
      variants.push(withoutNumbers);
    }

    // 5. Wort-Variationen
    const words = cleaned.split(' ').filter(word => word.length > 0);
    if (words.length > 1) {
      // Ohne erstes Wort: "Call of Duty" -> "Duty"
      if (words.length > 2) {
        variants.push(words.slice(1).join(' '));
      }

      // Ohne letztes Wort: "Summoners War Sky Arena" -> "Summoners War Sky"
      variants.push(words.slice(0, -1).join(' '));

      // Erste zwei Wörter: "Summoners War Sky Arena" -> "Summoners War"
      if (words.length > 2) {
        variants.push(words.slice(0, 2).join(' '));
      }

      // Letzten zwei Wörter: "Call of Duty Modern Warfare" -> "Modern Warfare"
      if (words.length > 2) {
        variants.push(words.slice(-2).join(' '));
      }
    }

    // 6. Nur Kernbegriffe (längste und wichtigste Wörter)
    if (words.length > 1) {
      const coreWords = words
        .filter(word => word.length > 3) // Nur Wörter > 3 Zeichen
        .filter(
          word =>
            !['the', 'and', 'for', 'with', 'from'].includes(word.toLowerCase())
        ) // Häufige Füllwörter
        .sort((a, b) => b.length - a.length) // Längste zuerst
        .slice(0, 3); // Maximal 3 Kernwörter
      if (coreWords.length > 0) {
        variants.push(coreWords.join(' '));
      }
    }

    // Duplikate entfernen und leere/zu kurze Einträge filtern
    return [...new Set(variants)]
      .filter(variant => variant.length > 1)
      .slice(0, 15); // Maximal 15 Varianten zur Performance
  };

  /**
   * IGDB URL zu vollständiger Bild-URL konvertieren
   */
  const getImageUrl = (
    url: string,
    size:
      | 'thumb'
      | 'cover_small'
      | 'cover_big'
      | 'screenshot_med'
      | 'screenshot_big' = 'cover_big'
  ): string => {
    if (!url) return '';
    // Entferne "t_thumb" prefix falls vorhanden und füge gewünschte Größe hinzu
    const cleanUrl = url
      .replace(/^\/\//, 'https://')
      .replace(/t_thumb/, `t_${size}`);
    return cleanUrl.startsWith('https://') ? cleanUrl : `https:${cleanUrl}`;
  };

  /**
   * Spiel nach Namen suchen und beste Übereinstimmung finden
   */
  const findBestGameMatch = async (
    gameName: string,
    searchFunction: (
      query: string,
      limit?: number
    ) => Promise<IGDBSearchResult[]>,
    getDetailsFunction: (gameId: number) => Promise<IGDBGame | null>,
    platformName?: string
  ): Promise<IGDBGame | null> => {
    try {
      // Generiere alle Such-Varianten
      const searchVariants = generateSearchVariants(gameName);

      let allResults: IGDBSearchResult[] = [];
      let bestResults: IGDBSearchResult[] = [];

      // Durchsuche alle Varianten
      for (const variant of searchVariants) {
        const results = await searchFunction(variant, 5);

        if (results.length > 0) {
          allResults.push(...results);
          // Prüfe sofort, ob wir eine sehr gute Übereinstimmung haben
          for (const result of results) {
            const score = calculateAdvancedSimilarity(
              variant.toLowerCase(),
              result.name.toLowerCase()
            );

            // Bei sehr hoher Übereinstimmung sofort verwenden
            if (score >= 0.9) {
              return await getDetailsFunction(result.id);
            }

            if (score >= 0.7) {
              bestResults.push(result);
            }
          }
        }
      }

      // Falls keine Ergebnisse gefunden wurden, versuche partielle Suche
      if (allResults.length === 0) {
        const partialResults = await performPartialSearch(
          gameName,
          searchFunction
        );
        allResults.push(...partialResults);

        if (allResults.length === 0) {
          return null;
        }
      }

      // Entferne Duplikate basierend auf ID
      const uniqueResults = allResults.filter(
        (result, index, self) =>
          index === self.findIndex(r => r.id === result.id)
      );

      // Verwende beste Ergebnisse falls vorhanden, sonst alle
      const resultsToCheck =
        bestResults.length > 0 ? bestResults : uniqueResults;

      // Finde beste Übereinstimmung basierend auf Namen-Ähnlichkeit
      let bestMatch = resultsToCheck[0];
      let bestScore = 0;
      let bestVariant = '';

      // Teste gegen alle Such-Varianten für beste Übereinstimmung
      for (const result of resultsToCheck) {
        for (const variant of searchVariants) {
          const score = calculateAdvancedSimilarity(
            variant.toLowerCase(),
            result.name.toLowerCase()
          );

          if (score > bestScore) {
            bestMatch = result;
            bestScore = score;
            bestVariant = variant;
          }
        }

        // Teste auch gegen den ursprünglichen Namen
        const originalScore = calculateAdvancedSimilarity(
          gameName.toLowerCase(),
          result.name.toLowerCase()
        );

        if (originalScore > bestScore) {
          bestMatch = result;
          bestScore = originalScore;
          bestVariant = gameName;
        }
      }

      // Lowered threshold for better matching with improved similarity scoring
      const threshold = 0.3;
      if (bestScore < threshold) {
        return null;
      }

      // Detaillierte Informationen für die beste Übereinstimmung abrufen
      return await getDetailsFunction(bestMatch.id);
    } catch (error) {
      console.error('Fehler bei IGDB Spiel-Matching:', error);
      return null;
    }
  };

  /**
   * Partielle Suche als Fallback
   */
  const performPartialSearch = async (
    gameName: string,
    searchFunction: (
      query: string,
      limit?: number
    ) => Promise<IGDBSearchResult[]>
  ): Promise<IGDBSearchResult[]> => {
    try {
      const words = cleanSteamGameName(gameName)
        .split(' ')
        .filter(word => word.length > 3) // Nur längere Wörter
        .slice(0, 3); // Maximal 3 Wörter

      if (words.length === 0) return [];

      const results: IGDBSearchResult[] = [];

      // Suche nach einzelnen wichtigen Wörtern
      for (const word of words) {
        const wordResults = await searchFunction(word, 10);
        results.push(...wordResults);
      }

      // Entferne Duplikate und filtere relevante Ergebnisse
      const uniqueResults = results.filter(
        (result, index, self) =>
          index === self.findIndex(r => r.id === result.id)
      );

      // Filtere Ergebnisse, die mindestens ein Wort aus dem Original enthalten
      const relevantResults = uniqueResults.filter(result => {
        const resultWords = result.name.toLowerCase().split(' ');
        return words.some(word =>
          resultWords.some(
            rWord =>
              rWord.includes(word.toLowerCase()) ||
              word.toLowerCase().includes(rWord)
          )
        );
      });

      return relevantResults.slice(0, 15); // Maximal 15 Ergebnisse
    } catch (error) {
      console.error('[IGDB] Error in partial search:', error);
      return [];
    }
  };

  /**
   * Spielinformationen zu strukturierten Daten konvertieren
   */
  const convertToEnrichedData = (igdbGame: IGDBGame): EnrichedGameData => {
    const enrichedData: EnrichedGameData = {
      igdbId: igdbGame.id
    };

    // Beschreibung
    if (igdbGame.summary) {
      enrichedData.description = igdbGame.summary;
    }

    // Cover-Bild
    if (igdbGame.cover?.url) {
      enrichedData.coverUrl = getImageUrl(igdbGame.cover.url, 'cover_big');
    }

    // Screenshots
    if (igdbGame.screenshots && igdbGame.screenshots.length > 0) {
      enrichedData.screenshotUrls = igdbGame.screenshots
        .slice(0, 5) // Maximal 5 Screenshots
        .map(screenshot => getImageUrl(screenshot.url, 'screenshot_med'));
    }

    // Genres
    if (igdbGame.genres && igdbGame.genres.length > 0) {
      enrichedData.genres = igdbGame.genres.map(genre => genre.name);
    }

    // Developer und Publisher
    if (igdbGame.involved_companies && igdbGame.involved_companies.length > 0) {
      const developer = igdbGame.involved_companies.find(
        company => company.developer
      );
      const publisher = igdbGame.involved_companies.find(
        company => company.publisher
      );

      if (developer) {
        enrichedData.developer = developer.company.name;
      }
      if (publisher) {
        enrichedData.publisher = publisher.company.name;
      }
    }

    // Release-Datum
    if (igdbGame.first_release_date) {
      enrichedData.releaseDate = new Date(igdbGame.first_release_date * 1000);
    } else if (igdbGame.release_dates && igdbGame.release_dates.length > 0) {
      // Nimm das früheste Release-Datum
      const earliestDate = Math.min(
        ...igdbGame.release_dates.map(rd => rd.date)
      );
      enrichedData.releaseDate = new Date(earliestDate * 1000);
    }

    // Rating (verwende aggregated_rating falls verfügbar, sonst total_rating)
    if (
      igdbGame.aggregated_rating &&
      igdbGame.aggregated_rating_count &&
      igdbGame.aggregated_rating_count > 0
    ) {
      enrichedData.rating = igdbGame.aggregated_rating / 10; // Konvertiere zu 1-10 Skala mit Dezimalstellen
    } else if (
      igdbGame.total_rating &&
      igdbGame.total_rating_count &&
      igdbGame.total_rating_count > 0
    ) {
      enrichedData.rating = igdbGame.total_rating / 10;
    } else if (
      igdbGame.rating &&
      igdbGame.rating_count &&
      igdbGame.rating_count > 0
    ) {
      enrichedData.rating = igdbGame.rating / 10;
    }

    return enrichedData;
  };

  return {
    // Generische Enrichment Funktionen
    shouldEnrichGame,
    determineFieldsToUpdate,
    processBatchEnrichment,
    generateSteamCoverUrl,
    validateEnrichedData,
    // IGDB-spezifische Funktionen
    cleanSteamGameName,
    generateSearchVariants,
    getImageUrl,
    findBestGameMatch,
    convertToEnrichedData,
    performPartialSearch
  };
};

// ============================================================================
// HILFSFUNKTIONEN FÜR STRING-ÄHNLICHKEIT
// ============================================================================

function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) {
    return 1.0;
  }

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function calculateAdvancedSimilarity(str1: string, str2: string): number {
  // Grundscore basierend auf Levenshtein-Distanz
  let baseScore = calculateSimilarity(str1, str2);

  const words1 = str1
    .toLowerCase()
    .split(' ')
    .filter(w => w.length > 2);
  const words2 = str2
    .toLowerCase()
    .split(' ')
    .filter(w => w.length > 2);

  // Bonus für exakte Wort-Übereinstimmungen
  let exactWordMatches = 0;
  let partialWordMatches = 0;

  for (const word1 of words1) {
    for (const word2 of words2) {
      if (word1 === word2) {
        exactWordMatches++;
      } else if (word1.includes(word2) || word2.includes(word1)) {
        partialWordMatches++;
      }
    }
  }

  // Bonus-Score basierend auf Wort-Übereinstimmungen
  const maxWords = Math.max(words1.length, words2.length);
  if (maxWords > 0) {
    const wordMatchScore =
      (exactWordMatches * 2 + partialWordMatches) / (maxWords * 2);
    baseScore = Math.max(baseScore, wordMatchScore * 0.8); // Wort-Matches können bis zu 80% Score erreichen
  }

  // Bonus für Start-Übereinstimmungen
  if (
    str1.toLowerCase().startsWith(str2.toLowerCase()) ||
    str2.toLowerCase().startsWith(str1.toLowerCase())
  ) {
    baseScore += 0.1;
  }

  // Bonus für enthaltene Substrings
  if (
    str1.toLowerCase().includes(str2.toLowerCase()) ||
    str2.toLowerCase().includes(str1.toLowerCase())
  ) {
    baseScore += 0.05;
  }

  return Math.min(baseScore, 1.0); // Cap bei 1.0
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}
