import { PrismaClient } from '~/prisma/client';
const prisma = new PrismaClient();

export namespace DealsService {
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
          game: true // Game kann null sein
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
   * Findet oder erstellt ein Spiel für einen Deal-Titel
   * Grund: Nutzt zentrale IGDB-Funktion für konsistente Spielerkennung
   */
  export async function findOrCreateGameForDeal(dealTitle: string) {
    try {
      const { IGDBService } = await import('./igdb.service');
      const igdbGameData = await IGDBService.findGameByTitle(dealTitle);
      if (!igdbGameData) {
        return null;
      }
      // Grund: Prüfe ob das Spiel bereits in unserer DB existiert
      const existingGame = await prisma.game.findUnique({
        where: { igdbId: igdbGameData.id }
      });
      if (existingGame) {
        return existingGame;
      }
      // Grund: Erstelle neues Spiel mit IGDB-Daten
      const newGame = await prisma.game.create({
        data: {
          igdbId: igdbGameData.id,
          name: igdbGameData.name,
          slug: igdbGameData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          summary: igdbGameData.summary,
          firstReleaseDate: igdbGameData.firstReleaseDate,
          coverUrl: igdbGameData.coverUrl,
          screenshots: igdbGameData.screenshotUrls || [],
          totalRating: igdbGameData.totalRating,
          genres: igdbGameData.genres || [],
          developers: igdbGameData.developers || [],
          publishers: igdbGameData.publishers || [],
          lastSyncedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      return newGame;
    } catch (error) {
      console.error(`❌ [Deals] Error finding game for "${dealTitle}":`, error);
      return null;
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
      const dealRating = parseFloat(cheapSharkDeal.dealRating || '0');
      // Grund: Store-Namen aus CheapShark Service holen
      const storeName = useStoreUtils().getStoreName(cheapSharkDeal.storeID);
      // Grund: Spiel finden oder erstellen wenn keine gameId gegeben
      let finalGameId = gameId;
      if (!finalGameId) {
        try {
          // Grund: Nutze zentrale Spielsuche
          const foundGame = await findOrCreateGameForDeal(cheapSharkDeal.title);
          if (foundGame) {
            finalGameId = foundGame.id;
          } else {
            finalGameId = null;
          }
        } catch (error) {
          console.error('Error finding/creating game for deal:', error);
          // Grund: Deal trotzdem erstellen auch wenn Game-Suche fehlschlägt
          finalGameId = null;
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
        source: 'CheapShark',
        thumb: cheapSharkDeal.thumb || undefined, // Grund: Thumbnail URL speichern
        rating: dealRating > 0 ? dealRating : undefined // Grund: Deal Rating hinzufügen
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
  ): Promise<PrismaDeal[]> {
    const savedDeals: PrismaDeal[] = [];
    try {
      for (const cheapSharkDeal of cheapSharkDeals) {
        // Grund: Prüfen ob Deal bereits existiert (basierend auf externalId)
        const existingDeal = await prisma.deal.findFirst({
          where: {
            externalId: cheapSharkDeal.dealID,
            source: 'CheapShark'
          }
        });
        if (existingDeal) {
          continue;
        }
        // Grund: Deal-Daten konvertieren (jetzt async)
        const dealData = await convertCheapSharkDeal(cheapSharkDeal, gameId);
        if (!dealData) continue;
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
}
