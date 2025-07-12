// Deals Service - BEREINIGT
// Grund: Nur noch die Funktionen die für den syncAndLoadDeals Workflow benötigt werden

import type { Deal, Game } from '~/prisma/client';
import { PrismaClient } from '~/prisma/client';
import { CheapSharkService, type CheapSharkDeal } from './cheapshark.service';
import { GamesService } from './games.service';

const prisma = new PrismaClient();

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

      // Grund: Filter nur anwenden wenn sie definiert sind
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
      if (filters.source)
        where.source = { contains: filters.source, mode: 'insensitive' };

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
          // Grund: Verwende verbesserte IGDB-Relevanz-Suche
          const gameResult =
            await GamesService.findOrCreateGameWithIGDBRelevance(
              cheapSharkDeal.title
            );
          if (gameResult && gameResult.success && gameResult.game) {
            finalGameId = gameResult.game.id;
            console.log(
              `Found/created game: ${gameResult.game.name} (ID: ${finalGameId}) for deal: ${cheapSharkDeal.title}`
            );
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
          console.log(
            `Deal already exists: ${dealData.title} (${dealData.externalId})`
          );
          continue;
        }

        // Grund: Neuen Deal erstellen
        const newDeal = await prisma.deal.create({
          data: dealData
        });

        savedDeals.push(newDeal);
        console.log(`Saved new deal: ${newDeal.title}`);
      }

      console.log(`Saved ${savedDeals.length} new deals from CheapShark`);
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

      console.log(`Cleaned up ${result.count} expired deals`);
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
}
