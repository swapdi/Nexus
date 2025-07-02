import { z } from 'zod';
import { DealsService } from '~/lib/services/deals.service';
import { publicProcedure, router } from '../trpc';

const dealFiltersSchema = z.object({
  storeName: z.string().optional(),
  isFreebie: z.boolean().optional(),
  maxPrice: z.number().min(0).optional(),
  minDiscount: z.number().min(0).max(100).optional(),
  isActive: z.boolean().optional().default(true),
  limit: z.number().min(1).max(100).optional().default(50),
  offset: z.number().min(0).optional().default(0)
});

const dealSortSchema = z
  .enum([
    'price-asc',
    'price-desc',
    'discount-desc',
    'discount-asc',
    'recent',
    'ending-soon'
  ])
  .optional()
  .default('recent');

const createDealSchema = z.object({
  gameId: z.number(),
  platformGameId: z.number().optional(),
  title: z.string().min(1),
  storeName: z.string().min(1),
  price: z.number().min(0).optional(),
  discountPercent: z.number().min(0).max(100).optional(),
  originalPrice: z.number().min(0).optional(),
  url: z.string().url(),
  validFrom: z.date().optional(),
  validUntil: z.date().optional(),
  isFreebie: z.boolean().optional().default(false)
});

export const dealsRouter = router({
  /**
   * Hole alle Deals mit optionalen Filtern
   */
  getDeals: publicProcedure
    .input(
      z.object({
        filters: dealFiltersSchema.optional().default({}),
        sortBy: dealSortSchema
      })
    )
    .query(async ({ input }) => {
      try {
        const deals = await DealsService.getDeals(input.filters, input.sortBy);
        return {
          success: true,
          deals
        };
      } catch (error) {
        console.error('Error in getDeals:', error);
        throw new Error('Failed to fetch deals');
      }
    }),

  /**
   * Hole einen spezifischen Deal
   */
  getDealById: publicProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(async ({ input }) => {
      try {
        const deal = await DealsService.getDealById(input.id);
        if (!deal) {
          throw new Error('Deal not found');
        }
        return {
          success: true,
          deal
        };
      } catch (error) {
        console.error('Error in getDealById:', error);
        throw new Error('Failed to fetch deal');
      }
    }),

  /**
   * Hole Deals für ein bestimmtes Spiel
   */
  getDealsByGameId: publicProcedure
    .input(
      z.object({
        gameId: z.number()
      })
    )
    .query(async ({ input }) => {
      try {
        const deals = await DealsService.getDealsByGameId(input.gameId);
        return {
          success: true,
          deals
        };
      } catch (error) {
        console.error('Error in getDealsByGameId:', error);
        throw new Error('Failed to fetch deals for game');
      }
    }),

  /**
   * Hole verfügbare Store-Namen für Filter
   */
  getAvailableStores: publicProcedure.query(async () => {
    try {
      const stores = await DealsService.getAvailableStores();
      return {
        success: true,
        stores
      };
    } catch (error) {
      console.error('Error in getAvailableStores:', error);
      throw new Error('Failed to fetch available stores');
    }
  }),

  /**
   * Hole Deal-Statistiken
   */
  getDealStats: publicProcedure.query(async () => {
    try {
      const stats = await DealsService.getDealStats();
      return {
        success: true,
        stats
      };
    } catch (error) {
      console.error('Error in getDealStats:', error);
      throw new Error('Failed to fetch deal statistics');
    }
  }),

  /**
   * Erstelle einen neuen Deal (für Admin/Import-Prozesse)
   */
  createDeal: publicProcedure
    .input(createDealSchema)
    .mutation(async ({ input }) => {
      try {
        const deal = await DealsService.createDeal(input);
        return {
          success: true,
          deal
        };
      } catch (error) {
        console.error('Error in createDeal:', error);
        throw new Error('Failed to create deal');
      }
    }),

  /**
   * Aktualisiere einen Deal
   */
  updateDeal: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: createDealSchema.partial()
      })
    )
    .mutation(async ({ input }) => {
      try {
        const deal = await DealsService.updateDeal(input.id, input.data);
        return {
          success: true,
          deal
        };
      } catch (error) {
        console.error('Error in updateDeal:', error);
        throw new Error('Failed to update deal');
      }
    }),

  /**
   * Lösche einen Deal
   */
  deleteDeal: publicProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(async ({ input }) => {
      try {
        await DealsService.deleteDeal(input.id);
        return {
          success: true
        };
      } catch (error) {
        console.error('Error in deleteDeal:', error);
        throw new Error('Failed to delete deal');
      }
    }),

  /**
   * Erstelle oder aktualisiere Deal (Upsert)
   */
  upsertDeal: publicProcedure
    .input(
      z.object({
        gameId: z.number(),
        storeName: z.string(),
        data: createDealSchema.omit({ gameId: true, storeName: true })
      })
    )
    .mutation(async ({ input }) => {
      try {
        const deal = await DealsService.upsertDeal(
          input.gameId,
          input.storeName,
          input.data
        );
        return {
          success: true,
          deal
        };
      } catch (error) {
        console.error('Error in upsertDeal:', error);
        throw new Error('Failed to upsert deal');
      }
    }),

  /**
   * Aggregiere Deals von allen Quellen (für Admin/Cron)
   */
  aggregateDeals: publicProcedure.mutation(async () => {
    try {
      const results = await DealsService.aggregateAllDeals();
      return {
        success: true,
        results
      };
    } catch (error) {
      console.error('Error in aggregateDeals:', error);
      throw new Error('Failed to aggregate deals');
    }
  }),

  /**
   * Bereinige abgelaufene Deals
   */
  cleanupExpiredDeals: publicProcedure.mutation(async () => {
    try {
      const count = await DealsService.cleanupExpiredDeals();
      return {
        success: true,
        deletedCount: count
      };
    } catch (error) {
      console.error('Error in cleanupExpiredDeals:', error);
      throw new Error('Failed to cleanup expired deals');
    }
  })
});
