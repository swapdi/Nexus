import { PrismaClient, type Prisma } from '~/prisma/client';
import type { Region } from './cheapshark.service';
const prisma = new PrismaClient();

export type DealWithRelations = Prisma.DealGetPayload<{
  include: {
    game: true;
    platformGame: {
      include: {
        platform: true;
      };
    };
  };
}>;

export type CreateDealInput = {
  gameId: number;
  platformGameId?: number;
  title: string;
  storeName: string;
  price?: number;
  discountPercent?: number;
  originalPrice?: number;
  url: string;
  validFrom?: Date;
  validUntil?: Date;
  isFreebie?: boolean;
};

export type DealFilters = {
  storeName?: string;
  isFreebie?: boolean;
  maxPrice?: number;
  minDiscount?: number;
  isActive?: boolean; // Nur aktuelle Deals (validUntil in der Zukunft)
  limit?: number;
  offset?: number;
};

export type DealSortOptions =
  | 'price-asc'
  | 'price-desc'
  | 'discount-desc'
  | 'discount-asc'
  | 'recent'
  | 'ending-soon';

export type DealSource =
  | 'steam'
  | 'epic'
  | 'gog'
  | 'humble'
  | 'reddit'
  | 'manual';

export type ExternalDeal = {
  title: string;
  storeName: string;
  price?: number;
  originalPrice?: number;
  discountPercent?: number;
  url: string;
  validUntil?: Date;
  isFreebie?: boolean;
  source: DealSource;
  externalId?: string;
};

export namespace DealsService {
  /**
   * Erstelle einen neuen Deal
   */
  export async function createDeal(
    data: CreateDealInput
  ): Promise<DealWithRelations> {
    try {
      return await prisma.deal.create({
        data: {
          ...data,
          discoveredAt: new Date(),
          updatedAt: new Date()
        },
        include: {
          game: true,
          platformGame: {
            include: {
              platform: true
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating deal:', error);
      throw new Error('Failed to create deal');
    }
  }

  /**
   * Hole alle Deals mit optionalen Filtern
   */
  export async function getDeals(
    filters: DealFilters = {},
    sortBy: DealSortOptions = 'recent'
  ): Promise<DealWithRelations[]> {
    try {
      const {
        storeName,
        isFreebie,
        maxPrice,
        minDiscount,
        isActive = true,
        limit = 50,
        offset = 0
      } = filters;

      // Grund: Dynamisches Where-Objekt für flexible Filterung
      const where: Prisma.DealWhereInput = {};

      if (storeName) {
        where.storeName = {
          contains: storeName,
          mode: 'insensitive'
        };
      }

      if (typeof isFreebie === 'boolean') {
        where.isFreebie = isFreebie;
      }

      if (typeof maxPrice === 'number') {
        where.price = {
          lte: maxPrice
        };
      }

      if (typeof minDiscount === 'number') {
        where.discountPercent = {
          gte: minDiscount
        };
      }

      // Nur aktuelle Deals (nicht abgelaufen)
      if (isActive) {
        where.OR = [
          { validUntil: null }, // Deals ohne Ablaufdatum
          { validUntil: { gte: new Date() } } // Deals die noch gültig sind
        ];
      }

      // Grund: Verschiedene Sortieroptionen für bessere UX
      const orderBy = getSortOrder(sortBy);

      return await prisma.deal.findMany({
        where,
        include: {
          game: true,
          platformGame: {
            include: {
              platform: true
            }
          }
        },
        orderBy,
        take: limit,
        skip: offset
      });
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw new Error('Failed to fetch deals');
    }
  }

  /**
   * Hole einen spezifischen Deal
   */
  export async function getDealById(
    id: number
  ): Promise<DealWithRelations | null> {
    try {
      return await prisma.deal.findUnique({
        where: { id },
        include: {
          game: true,
          platformGame: {
            include: {
              platform: true
            }
          }
        }
      });
    } catch (error) {
      console.error('Error fetching deal by ID:', error);
      throw new Error('Failed to fetch deal');
    }
  }

  /**
   * Aktualisiere Deal-Informationen
   */
  export async function updateDeal(
    id: number,
    data: Partial<CreateDealInput>
  ): Promise<DealWithRelations> {
    try {
      return await prisma.deal.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date()
        },
        include: {
          game: true,
          platformGame: {
            include: {
              platform: true
            }
          }
        }
      });
    } catch (error) {
      console.error('Error updating deal:', error);
      throw new Error('Failed to update deal');
    }
  }

  /**
   * Lösche einen Deal
   */
  export async function deleteDeal(id: number): Promise<void> {
    try {
      await prisma.deal.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error deleting deal:', error);
      throw new Error('Failed to delete deal');
    }
  }

  /**
   * Hole Deals für ein bestimmtes Spiel
   */
  export async function getDealsByGameId(
    gameId: number
  ): Promise<DealWithRelations[]> {
    try {
      return await prisma.deal.findMany({
        where: {
          gameId,
          OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }]
        },
        include: {
          game: true,
          platformGame: {
            include: {
              platform: true
            }
          }
        },
        orderBy: [
          { isFreebie: 'desc' }, // Freebies zuerst
          { discountPercent: 'desc' }, // Dann höchste Rabatte
          { price: 'asc' } // Dann niedrigste Preise
        ]
      });
    } catch (error) {
      console.error('Error fetching deals by game ID:', error);
      throw new Error('Failed to fetch deals for game');
    }
  }

  /**
   * Hole verfügbare Store-Namen für Filter
   */
  export async function getAvailableStores(): Promise<string[]> {
    try {
      const stores = await prisma.deal.groupBy({
        by: ['storeName'],
        where: {
          OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }]
        },
        orderBy: {
          storeName: 'asc'
        }
      });

      return stores.map(store => store.storeName);
    } catch (error) {
      console.error('Error fetching available stores:', error);
      throw new Error('Failed to fetch available stores');
    }
  }

  /**
   * Entferne abgelaufene Deals
   */
  export async function cleanupExpiredDeals(): Promise<number> {
    try {
      const result = await prisma.deal.deleteMany({
        where: {
          validUntil: {
            lt: new Date()
          }
        }
      });

      console.log(`Cleaned up ${result.count} expired deals`);
      return result.count;
    } catch (error) {
      console.error('Error cleaning up expired deals:', error);
      throw new Error('Failed to cleanup expired deals');
    }
  }

  /**
   * Erstelle oder aktualisiere einen Deal (Upsert-Funktion)
   */
  export async function upsertDeal(
    gameId: number,
    storeName: string,
    data: Omit<CreateDealInput, 'gameId' | 'storeName'>
  ): Promise<DealWithRelations> {
    try {
      // Versuche existierenden Deal zu finden
      const existingDeal = await prisma.deal.findFirst({
        where: {
          gameId,
          storeName,
          OR: [{ validUntil: null }, { validUntil: { gte: new Date() } }]
        }
      });

      if (existingDeal) {
        // Aktualisiere existierenden Deal
        return await updateDeal(existingDeal.id, {
          ...data,
          gameId,
          storeName
        });
      } else {
        // Erstelle neuen Deal
        return await createDeal({ ...data, gameId, storeName });
      }
    } catch (error) {
      console.error('Error upserting deal:', error);
      throw new Error('Failed to upsert deal');
    }
  }

  /**
   * Statistiken über Deals
   */
  export async function getDealStats(): Promise<{
    totalDeals: number;
    freebies: number;
    averageDiscount: number;
    topStores: Array<{ name: string; count: number }>;
  }> {
    try {
      const now = new Date();

      const [totalDeals, freebies, discounts, storeStats] = await Promise.all([
        // Gesamtanzahl aktuelle Deals
        prisma.deal.count({
          where: {
            OR: [{ validUntil: null }, { validUntil: { gte: now } }]
          }
        }),

        // Anzahl Freebies
        prisma.deal.count({
          where: {
            isFreebie: true,
            OR: [{ validUntil: null }, { validUntil: { gte: now } }]
          }
        }),

        // Durchschnittlicher Rabatt
        prisma.deal.aggregate({
          where: {
            discountPercent: { gt: 0 },
            OR: [{ validUntil: null }, { validUntil: { gte: now } }]
          },
          _avg: {
            discountPercent: true
          }
        }),

        // Top Stores
        prisma.deal.groupBy({
          by: ['storeName'],
          where: {
            OR: [{ validUntil: null }, { validUntil: { gte: now } }]
          },
          _count: {
            id: true
          },
          orderBy: {
            _count: {
              id: 'desc'
            }
          },
          take: 5
        })
      ]);

      return {
        totalDeals,
        freebies,
        averageDiscount: Math.round(discounts._avg.discountPercent || 0),
        topStores: storeStats.map(store => ({
          name: store.storeName,
          count: store._count.id
        }))
      };
    } catch (error) {
      console.error('Error fetching deal statistics:', error);
      throw new Error('Failed to fetch deal statistics');
    }
  }

  /**
   * Suche nach Deals für ein spezifisches Spiel über externe APIs
   */
  export async function searchGameDeals(
    gameTitle: string
  ): Promise<ExternalDeal[]> {
    try {
      const { CheapSharkService } = await import('./cheapshark.service');

      console.log(`Searching for deals for game: ${gameTitle}`);

      // Suche nach dem Spiel
      const games = await CheapSharkService.searchGames(gameTitle, 5);

      if (games.length === 0) {
        console.log(`No games found for title: ${gameTitle}`);
        return [];
      }

      const allDeals: ExternalDeal[] = [];

      // Hole Deals für die gefundenen Spiele
      for (const game of games.slice(0, 3)) {
        // Nur die ersten 3 Ergebnisse
        try {
          const gameDeals = await CheapSharkService.getGameDeals(game.gameID);

          if (gameDeals && gameDeals.deals.length > 0) {
            // Hole Store-Informationen
            const stores = await CheapSharkService.getStores();
            const storeMap = new Map(
              stores.map(store => [store.storeID, store.storeName])
            );

            for (const deal of gameDeals.deals) {
              const storeName =
                storeMap.get(deal.storeID) || `Store ${deal.storeID}`;
              const price = parseFloat(deal.price);
              const retailPrice = parseFloat(deal.retailPrice);
              const savings = parseFloat(deal.savings);

              const externalDeal: ExternalDeal = {
                title: gameDeals.info.title,
                storeName,
                price: price > 0 ? price : undefined,
                originalPrice: retailPrice > price ? retailPrice : undefined,
                discountPercent: savings > 0 ? Math.round(savings) : undefined,
                url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
                validUntil: undefined,
                isFreebie: price === 0,
                source: 'manual',
                externalId: deal.dealID
              };

              allDeals.push(externalDeal);
            }
          }

          // Kurze Pause zwischen Anfragen
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(
            `Error fetching deals for game ${game.external}:`,
            error
          );
          continue;
        }
      }

      console.log(`Found ${allDeals.length} deals for ${gameTitle}`);
      return allDeals;
    } catch (error) {
      console.error('Error searching for game deals:', error);
      throw new Error('Failed to search for game deals');
    }
  }

  /**
   * Sammle Deals von allen verfügbaren Quellen (Deal Aggregation)
   */
  export async function aggregateAllDeals(): Promise<{
    imported: number;
    updated: number;
    errors: string[];
  }> {
    console.log('Starting deal aggregation...');

    const results = {
      imported: 0,
      updated: 0,
      errors: [] as string[]
    };

    try {
      // Importiere CheapShark Service
      const { CheapSharkService } = await import('./cheapshark.service');

      // Hole Deals von CheapShark
      const externalDeals = await CheapSharkService.aggregateDeals({
        maxDeals: 100,
        storeIDs: ['1', '25', '7', '3'], // Steam, Epic, GOG, GreenManGaming
        minSavings: 20,
        maxPrice: 60
      });

      console.log(`Found ${externalDeals.length} deals from CheapShark`);

      // Verarbeite jeden Deal
      for (const externalDeal of externalDeals) {
        try {
          const result = await processExternalDeal(externalDeal);
          if (result.created) {
            results.imported++;
          } else {
            results.updated++;
          }
        } catch (error) {
          const errorMsg = `Failed to process deal "${externalDeal.title}": ${error}`;
          console.error(errorMsg);
          results.errors.push(errorMsg);
        }
      }

      console.log(
        `Deal aggregation completed: ${results.imported} imported, ${results.updated} updated, ${results.errors.length} errors`
      );
    } catch (error) {
      const errorMsg = `Deal aggregation failed: ${error}`;
      console.error(errorMsg);
      results.errors.push(errorMsg);
    }

    return results;
  }

  /**
   * Verarbeite einen externen Deal
   */
  export async function processExternalDeal(
    externalDeal: ExternalDeal
  ): Promise<{
    created: boolean;
    deal: any;
  }> {
    try {
      // Versuche das Spiel zu finden oder zu erstellen
      const game = await findOrCreateGameFromDeal(externalDeal);

      // Erstelle Deal-Daten
      const dealData: CreateDealInput = {
        gameId: game.id,
        title: externalDeal.title,
        storeName: externalDeal.storeName,
        price: externalDeal.price,
        originalPrice: externalDeal.originalPrice,
        discountPercent: externalDeal.discountPercent,
        url: externalDeal.url,
        validUntil: externalDeal.validUntil,
        isFreebie: externalDeal.isFreebie || false
      };

      // Prüfe ob Deal bereits existiert
      const existingDeal = await prisma.deal.findFirst({
        where: {
          title: externalDeal.title,
          storeName: externalDeal.storeName,
          gameId: game.id
        }
      });

      if (existingDeal) {
        // Aktualisiere existierenden Deal
        const updatedDeal = await prisma.deal.update({
          where: { id: existingDeal.id },
          data: {
            price: dealData.price,
            originalPrice: dealData.originalPrice,
            discountPercent: dealData.discountPercent,
            validUntil: dealData.validUntil,
            isFreebie: dealData.isFreebie,
            discoveredAt: new Date() // Aktualisiere Discovery-Zeit
          }
        });

        return { created: false, deal: updatedDeal };
      } else {
        // Erstelle neuen Deal
        const newDeal = await createDeal(dealData);
        return { created: true, deal: newDeal };
      }
    } catch (error) {
      console.error('Error processing external deal:', error);
      throw error;
    }
  }

  /**
   * Finde oder erstelle ein Spiel basierend auf Deal-Informationen
   */
  async function findOrCreateGameFromDeal(
    externalDeal: ExternalDeal
  ): Promise<any> {
    try {
      // Verwende dynamischen Import für GamesService um zirkuläre Abhängigkeiten zu vermeiden
      const { GamesService } = await import('./games.service');

      // Versuche zuerst das Spiel zu finden
      const existingGame = await prisma.game.findFirst({
        where: {
          title: {
            contains: externalDeal.title,
            mode: 'insensitive'
          }
        }
      });

      if (existingGame) {
        return existingGame;
      }

      // Erstelle neues Spiel falls nicht gefunden
      const gameData = {
        description: undefined,
        coverUrl: undefined,
        releaseDate: undefined,
        developer: undefined,
        publisher: undefined,
        genres: [] as string[]
      };

      return await GamesService.createGame(externalDeal.title, gameData);
    } catch (error) {
      console.error('Error finding/creating game from deal:', error);
      throw error;
    }
  }

  /**
   * Teste Deal-Aggregation mit spezifischen Mock-Daten
   */
  export async function testAggregation(): Promise<void> {
    console.log('Running deal aggregation test...');

    const testDeals: ExternalDeal[] = [
      {
        title: 'Test Game 1',
        storeName: 'Test Store',
        price: 19.99,
        originalPrice: 39.99,
        discountPercent: 50,
        url: 'https://example.com/game1',
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
        isFreebie: false,
        source: 'manual'
      }
    ];

    for (const deal of testDeals) {
      try {
        await processExternalDeal(deal);
        console.log(`Successfully processed test deal: ${deal.title}`);
      } catch (error) {
        console.error(`Failed to process test deal: ${error}`);
      }
    }
  }

  /**
   * Aggregiere Deals aus externen Quellen mit regionaler Unterstützung
   */
  export async function aggregateRegionalDeals(
    region: Region = 'GLOBAL',
    options: {
      maxDeals?: number;
      minSavings?: number;
      maxPrice?: number;
      storeIDs?: string[];
    } = {}
  ): Promise<{
    processed: number;
    errors: number;
    newDeals: number;
    updatedDeals: number;
    region: Region;
  }> {
    const {
      maxDeals = 50,
      minSavings = 25,
      maxPrice = 100,
      storeIDs = []
    } = options;

    console.log(`Starting regional deal aggregation for region: ${region}`);

    let processed = 0;
    let errors = 0;
    let newDeals = 0;
    let updatedDeals = 0;

    try {
      // Verwende dynamischen Import um zirkuläre Abhängigkeiten zu vermeiden
      const { CheapSharkService: CheapShark } = await import(
        './cheapshark.service'
      );

      // Hole regionale Deals von CheapShark
      const deals = await CheapShark.getRegionalDeals(region, {
        pageSize: Math.min(maxDeals, 60),
        sortBy: 'Savings',
        desc: true,
        upperPrice: maxPrice,
        steamRating: 70 // Nur Spiele mit guter Bewertung
      });

      console.log(`Found ${deals.length} regional deals from CheapShark`);

      for (const deal of deals) {
        try {
          const savings = parseFloat(deal.savings);

          // Nur Deals mit mindestens X% Ersparnis
          if (savings >= minSavings) {
            // Verwende dynamischen Import um zirkuläre Abhängigkeiten zu vermeiden
            const { CheapSharkService: CheapShark } = await import(
              './cheapshark.service'
            );
            const externalDeal = CheapShark.convertToExternalDeal(
              deal,
              'CheapShark'
            );
            const result = await processExternalDeal(externalDeal);

            if (result.created) {
              newDeals++;
            } else {
              updatedDeals++;
            }
          }

          processed++;
        } catch (error) {
          console.error(`Error processing deal ${deal.title}:`, error);
          errors++;
        }
      }

      console.log(`Regional deal aggregation completed for ${region}:`, {
        processed,
        errors,
        newDeals,
        updatedDeals
      });

      return {
        processed,
        errors,
        newDeals,
        updatedDeals,
        region
      };
    } catch (error) {
      console.error('Error during regional deal aggregation:', error);
      throw new Error(`Failed to aggregate regional deals for ${region}`);
    }
  }

  /**
   * Hole regionale Deals aus der Datenbank
   */
  export async function getRegionalDeals(
    region: Region = 'GLOBAL',
    filters: DealFilters = {},
    sortBy: DealSortOptions = 'recent'
  ): Promise<DealWithRelations[]> {
    try {
      // Bestimme Store-Filter basierend auf Region
      const regionalStores = getRegionalStores(region);
      const storeFilter = filters.storeName
        ? [filters.storeName]
        : regionalStores;

      const deals = await getDeals(
        {
          ...filters,
          storeName: storeFilter.length > 0 ? storeFilter[0] : undefined // Vereinfachung für Demo
        },
        sortBy
      );

      // Filtere zusätzlich nach regionalen Stores
      return deals.filter(
        deal => storeFilter.length === 0 || storeFilter.includes(deal.storeName)
      );
    } catch (error) {
      console.error('Error fetching regional deals:', error);
      throw new Error('Failed to fetch regional deals');
    }
  }

  /**
   * Hilfsfunktion: Hole Store-Namen basierend auf Region
   */
  function getRegionalStores(region: Region): string[] {
    switch (region) {
      case 'US':
        return [
          'Steam',
          'Epic Games Store',
          'Humble Store',
          'Fanatical',
          'GamersGate'
        ];
      case 'EU':
        return [
          'Steam',
          'Gamesplanet',
          'Gamesload',
          'Green Man Gaming',
          'Humble Store'
        ];
      case 'GLOBAL':
      default:
        return [
          'Steam',
          'Epic Games Store',
          'Humble Store',
          'Fanatical',
          'Green Man Gaming',
          'GamersGate'
        ];
    }
  }
}

/**
 * Hilfsfunktion für Sortierung
 */
function getSortOrder(
  sortBy: DealSortOptions
): Prisma.DealOrderByWithRelationInput[] {
  switch (sortBy) {
    case 'price-asc':
      return [{ price: 'asc' }, { isFreebie: 'desc' }];
    case 'price-desc':
      return [{ price: 'desc' }, { isFreebie: 'asc' }];
    case 'discount-desc':
      return [{ discountPercent: 'desc' }, { isFreebie: 'desc' }];
    case 'discount-asc':
      return [{ discountPercent: 'asc' }, { isFreebie: 'asc' }];
    case 'ending-soon':
      return [
        { validUntil: 'asc' }, // Ablaufende zuerst
        { isFreebie: 'desc' }
      ];
    case 'recent':
    default:
      return [
        { discoveredAt: 'desc' }, // Neueste zuerst
        { isFreebie: 'desc' }
      ];
  }
}
