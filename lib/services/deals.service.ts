// Deals Service - BEREINIGT
// Grund: Nur noch die Funktionen die für den syncAndLoadDeals Workflow benötigt werden

import { useGameUtils } from '~/composables/useGameUtils';
import type { Deal, Game } from '~/prisma/client';
import { PrismaClient } from '~/prisma/client';
import { CheapSharkService, type CheapSharkDeal } from './cheapshark.service';

const prisma = new PrismaClient();

// Grund: Importiere Game Utils für Titel-Bereinigung und progressive Varianten
const { generateProgressiveVariants } = useGameUtils();

export interface DealWithGame extends Deal {
  game: Game;
}
export interface DealCreateInput {
  gameId: number;
  title: string;
  storeName: string;
  price?: number;
  discountPercent?: number;
  originalPrice?: number;
  url: string;
  validFrom?: Date;
  validUntil?: Date;
  isFreebie?: boolean;
  externalId?: string;
  source?: string;
}

export interface DealSearchFilters {
  gameId?: number;
  storeName?: string;
  priceMax?: number;
  priceMin?: number;
  discountMin?: number;
  isFreebie?: boolean;
  isActive?: boolean;
  source?: string;
  limit?: number;
  offset?: number;
}

export namespace DealsService {
  // ===== CORE WORKFLOW FUNCTIONS =====

  /**
   * Sucht nach Deals basierend auf Filtern
   * @param filters Such-Filter
   * @returns Array der gefundenen Deals
   */
  export async function searchDeals(
    filters: DealSearchFilters = {}
  ): Promise<DealWithGame[]> {
    try {
      const where: any = {};
      if (filters.gameId) where.gameId = filters.gameId;
      if (filters.storeName)
        where.storeName = { contains: filters.storeName, mode: 'insensitive' };
      if (filters.priceMax !== undefined)
        where.price = { ...where.price, lte: filters.priceMax };
      if (filters.priceMin !== undefined)
        where.price = { ...where.price, gte: filters.priceMin };
      if (filters.discountMin !== undefined)
        where.discountPercent = {
          ...where.discountPercent,
          gte: filters.discountMin
        };
      if (filters.isFreebie !== undefined) where.isFreebie = filters.isFreebie;
      if (filters.isActive !== undefined) {
        if (filters.isActive) {
          where.OR = [
            { validUntil: null },
            { validUntil: { gte: new Date() } }
          ];
        } else {
          where.validUntil = { lt: new Date() };
        }
      }
      if (filters.source) {
        where.source = { contains: filters.source, mode: 'insensitive' };
      }

      const deals = await prisma.deal.findMany({
        where,
        include: {
          game: true
        },
        orderBy: [{ discoveredAt: 'desc' }, { id: 'desc' }],
        take: filters.limit,
        skip: filters.offset
      });

      return deals as DealWithGame[];
    } catch (error) {
      console.error('Error searching deals:', error);
      throw new Error(
        `Failed to search deals: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  /**
   * Progressive Spielsuche mit systematischer Titel-Kürzung
   * Grund: Entfernt schrittweise Wörter von rechts bis ein Spiel gefunden wird
   */
  export async function findGameWithVariants(dealTitle: string) {
    console.log(`🔍 Starting progressive game search for: "${dealTitle}"`);

    // Grund: Generiere progressive Varianten durch systematisches Kürzen
    const titleVariants = generateProgressiveVariants(dealTitle);

    if (titleVariants.length === 0) {
      console.warn(`⚠️  No valid variants generated for: "${dealTitle}"`);
      return null;
    }

    console.log(`📋 Generated ${titleVariants.length} progressive variants`);

    // Grund: Versuche jede Variante progressiv - von spezifisch zu allgemein
    for (let i = 0; i < titleVariants.length; i++) {
      const variant = titleVariants[i];

      try {
        console.log(
          `[${i + 1}/${
            titleVariants.length
          }] 🔎 Searching IGDB for: "${variant}"`
        );

        // Grund: Nutze einfache IGDB-Suche statt komplexer GamesService-Logik
        const gameResult = await DealsService.findGameForDeal(variant);

        if (gameResult && gameResult.success && gameResult.game) {
          console.log(
            `✅ SUCCESS! Found game "${gameResult.game.name}" using variant "${variant}"`
          );
          console.log(
            `🎯 Search completed after ${i + 1}/${
              titleVariants.length
            } attempts`
          );
          return gameResult;
        } else {
          console.log(`❌ No match found for variant "${variant}"`);
        }
      } catch (error) {
        console.warn(`⚠️  Error searching for variant "${variant}":`, error);
        continue;
      }
    }

    console.warn(
      `🚫 FAILED: No game found for any of ${titleVariants.length} variants of: "${dealTitle}"`
    );
    console.log(`📝 All attempted variants:`, titleVariants);
    return null;
  }

  // ===== CHEAPSHARK INTEGRATION =====

  /**
   * Konvertiert einen CheapShark Deal zu unserem Deal-Format
   * @param cheapSharkDeal CheapShark Deal Objekt
   * @param gameId Optional: Verknüpfung zu unserem Game
   * @returns DealCreateInput für die Erstellung
   */
  export async function convertCheapSharkDeal(
    cheapSharkDeal: CheapSharkDeal,
    gameId?: number | null
  ): Promise<DealCreateInput | null> {
    try {
      // Grund: Validierung der notwendigen CheapShark Daten
      if (!cheapSharkDeal.dealID || !cheapSharkDeal.title) {
        console.warn('Invalid CheapShark deal: missing dealID or title');
        return null;
      }

      const salePrice = parseFloat(cheapSharkDeal.salePrice || '0');
      const normalPrice = parseFloat(cheapSharkDeal.normalPrice || '0');
      const savings = parseFloat(cheapSharkDeal.savings || '0');

      // Grund: Store-Namen aus CheapShark Service holen
      const storeName = CheapSharkService.getStoreName(cheapSharkDeal.storeID);

      // Grund: Spiel finden oder erstellen wenn keine gameId gegeben
      let finalGameId = gameId;
      if (!finalGameId) {
        try {
          // Grund: Nutze progressive Spielsuche mit systematischen Titel-Varianten
          const gameResult = await DealsService.findGameWithVariants(
            cheapSharkDeal.title
          );

          if (gameResult && gameResult.success && gameResult.game) {
            finalGameId = gameResult.game.id;
          } else {
            console.warn(
              `Could not find/create game for deal: ${cheapSharkDeal.title}`
            );
            return null;
          }
        } catch (error) {
          console.error('Error finding/creating game for deal:', error);
          return null;
        }
      }

      return {
        gameId: finalGameId,
        title: cheapSharkDeal.title,
        storeName: storeName,
        price: salePrice > 0 ? salePrice : undefined,
        originalPrice: normalPrice > 0 ? normalPrice : undefined,
        discountPercent: savings > 0 ? savings : undefined,
        url: `https://www.cheapshark.com/redirect?dealID=${cheapSharkDeal.dealID}`,
        validFrom: new Date(), // Grund: Aktuelles Datum setzen
        isFreebie: salePrice === 0,
        externalId: cheapSharkDeal.dealID,
        source: 'CheapShark'
      };
    } catch (error) {
      console.error('Error converting CheapShark deal:', error);
      return null;
    }
  }

  /**
   * Speichert CheapShark Deals in der Datenbank (ohne Duplikate)
   * @param cheapSharkDeals Array von CheapShark Deals
   * @param gameId Optional: Spiel-ID für Verknüpfung
   * @returns Array der gespeicherten Deals
   */
  export async function saveCheapSharkDeals(
    cheapSharkDeals: CheapSharkDeal[],
    gameId?: number | null
  ): Promise<Deal[]> {
    const savedDeals: Deal[] = [];

    try {
      for (const cheapSharkDeal of cheapSharkDeals) {
        // Grund: Deal-Daten konvertieren (jetzt async)
        const dealData = await convertCheapSharkDeal(cheapSharkDeal, gameId);
        if (!dealData) continue;

        // Grund: Prüfen ob Deal bereits existiert (basierend auf externalId)
        const existingDeal = await prisma.deal.findFirst({
          where: {
            externalId: dealData.externalId,
            source: 'CheapShark'
          }
        });
        if (existingDeal) {
          continue;
        }
        // Grund: Neuen Deal erstellen
        const newDeal = await prisma.deal.create({
          data: dealData
        });

        savedDeals.push(newDeal);
      }
      return savedDeals;
    } catch (error) {
      console.error('Error saving CheapShark deals:', error);
      throw new Error(
        `Failed to save CheapShark deals: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  /**
   * Bereinigt abgelaufene/veraltete Deals
   * @param olderThanDays Deals älter als X Tage löschen
   * @returns Anzahl der gelöschten Deals
   */
  export async function cleanupExpiredDeals(
    olderThanDays: number = 7
  ): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

      // Grund: Löschen von abgelaufenen und veralteten Deals
      const result = await prisma.deal.deleteMany({
        where: {
          OR: [
            {
              // Deals mit explizitem Ablaufdatum
              validUntil: {
                lt: new Date()
              }
            },
            {
              // Alte Deals ohne Ablaufdatum
              discoveredAt: {
                lt: cutoffDate
              },
              validUntil: null
            }
          ]
        }
      });

      return result.count;
    } catch (error) {
      console.error('Error cleaning up expired deals:', error);
      throw new Error(
        `Failed to cleanup expired deals: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }

  // ===== CHEAPSHARK API WRAPPERS =====

  /**
   * Wrapper für CheapShark getAllDeals
   */
  export async function getAllCheapSharkDeals(options: any = {}) {
    return await CheapSharkService.getAllDeals(options);
  }

  /**
   * Vereinfachte IGDB-Spielsuche nur für DealsService
   * Grund: Vermeidet doppelte Komplexität zwischen GamesService und DealsService
   */
  export async function findGameForDeal(dealTitle: string) {
    console.log(`🔍 Simple IGDB search for deal: "${dealTitle}"`);

    try {
      // Grund: Direkte IGDB-Suche ohne komplexe Logik
      const { IGDBService } = await import('./igdb.service');
      const searchResults = await IGDBService.searchGames(dealTitle, 10);

      if (searchResults.length === 0) {
        console.log(`❌ No IGDB results for deal title: "${dealTitle}"`);
        return null;
      }

      // Grund: Nimm einfach das erste, best-bewertete Ergebnis
      const bestResult = searchResults[0];
      console.log(
        `✅ Found IGDB game for deal: "${bestResult.name}" (ID: ${bestResult.id})`
      );

      // Grund: Prüfe ob bereits in der Datenbank
      const existingGame = await prisma.game.findUnique({
        where: { igdbId: bestResult.id }
      });

      if (existingGame) {
        console.log(`🎯 Game already exists in DB: "${existingGame.name}"`);
        return {
          success: true,
          game: existingGame,
          isNew: false,
          message: 'Spiel bereits vorhanden'
        };
      }

      // Grund: Hole detaillierte Spiel-Daten und erstelle neues Spiel
      const gameDetails = await IGDBService.getGameDetails(bestResult.id);
      if (!gameDetails) {
        console.log(
          `❌ Could not get game details for IGDB ID: ${bestResult.id}`
        );
        return null;
      }

      const gameData = IGDBService.convertIGDBGame(gameDetails);
      const newGame = await prisma.game.create({
        data: {
          igdbId: gameData.id,
          name: gameData.name,
          slug: gameData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          summary: gameData.summary,
          firstReleaseDate: gameData.firstReleaseDate,
          coverUrl: gameData.coverUrl,
          screenshots: gameData.screenshotUrls || [],
          totalRating: gameData.totalRating,
          genres: gameData.genres || [],
          developers: gameData.developers || [],
          publishers: gameData.publishers || [],
          lastSyncedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      console.log(
        `🎉 Created new game for deal: "${newGame.name}" (ID: ${newGame.id})`
      );
      return {
        success: true,
        game: newGame,
        isNew: true,
        message: 'Spiel erstellt'
      };
    } catch (error) {
      console.error(`❌ Error finding game for deal "${dealTitle}":`, error);
      return null;
    }
  }
}
