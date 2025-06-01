import { PrismaClient, type Prisma } from '~/prisma/client';
import { IGDBService, type EnrichedGameData } from './igdb.service';
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
