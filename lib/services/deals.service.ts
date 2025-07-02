import { PrismaClient, type Prisma } from '~/prisma/client';
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
      // Für MVP: Mock-Deals sammeln
      const mockDeals = await getMockDeals();

      for (const externalDeal of mockDeals) {
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
   * Mock-Deals für MVP (später durch echte APIs ersetzen)
   */
  async function getMockDeals(): Promise<ExternalDeal[]> {
    // Grund: Realistische Mock-Daten für besseres MVP-Testing
    return [
      {
        title: 'Cyberpunk 2077',
        storeName: 'Steam',
        originalPrice: 59.99,
        price: 29.99,
        discountPercent: 50,
        url: 'https://store.steampowered.com/app/1091500/',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 Tage
        isFreebie: false,
        source: 'steam'
      },
      {
        title: 'Control',
        storeName: 'Epic Games Store',
        originalPrice: 39.99,
        price: 0,
        discountPercent: 100,
        url: 'https://store.epicgames.com/en-US/p/control',
        validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 Tage
        isFreebie: true,
        source: 'epic'
      },
      {
        title: 'The Witcher 3: Wild Hunt',
        storeName: 'GOG',
        originalPrice: 49.99,
        price: 9.99,
        discountPercent: 80,
        url: 'https://www.gog.com/game/the_witcher_3_wild_hunt',
        validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 Tage
        isFreebie: false,
        source: 'gog'
      },
      {
        title: 'Hades',
        storeName: 'Steam',
        originalPrice: 24.99,
        price: 12.49,
        discountPercent: 50,
        url: 'https://store.steampowered.com/app/1145360/',
        validUntil: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 Tage
        isFreebie: false,
        source: 'steam'
      },
      {
        title: 'Hollow Knight',
        storeName: 'Steam',
        originalPrice: 14.99,
        price: 7.49,
        discountPercent: 50,
        url: 'https://store.steampowered.com/app/367520/',
        validUntil: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 Tage
        isFreebie: false,
        source: 'steam'
      },
      {
        title: 'Stardew Valley',
        storeName: 'GOG',
        originalPrice: 13.99,
        price: 6.99,
        discountPercent: 50,
        url: 'https://www.gog.com/game/stardew_valley',
        validUntil: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 Tage
        isFreebie: false,
        source: 'gog'
      },
      {
        title: 'Fall Guys',
        storeName: 'Steam',
        originalPrice: 19.99,
        price: 0,
        discountPercent: 100,
        url: 'https://store.steampowered.com/app/1097150/',
        isFreebie: true,
        source: 'steam'
      }
    ];
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
