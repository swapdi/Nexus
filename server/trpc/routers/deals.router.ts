import { z } from 'zod';
import { CheapSharkService } from '~/lib/services/cheapshark.service';
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

const regionSchema = z
  .enum(['US', 'EU', 'GLOBAL'])
  .optional()
  .default('GLOBAL');

// Helper function: Prüfe ob Deals aktualisiert werden müssen
async function shouldRefreshDeals(): Promise<boolean> {
  try {
    const stats = await DealsService.getDealStats();
    if (stats.totalDeals === 0) {
      return true; // Keine Deals vorhanden
    }

    // Prüfe das Alter der neuesten Deals (z.B. älter als 2 Stunden)
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    // Hier würden wir normalerweise das discoveredAt Datum prüfen
    // Für jetzt return true wenn weniger als 10 Deals vorhanden
    return stats.totalDeals < 10;
  } catch (error) {
    console.error('Error checking deal freshness:', error);
    return true; // Im Fehlerfall refreshen
  }
}

// Helper function: Hole Zeit der letzten Deal-Aktualisierung
async function getLastDealUpdateTime(): Promise<string | null> {
  try {
    // Hier würden wir normalerweise das neueste discoveredAt Datum holen
    // Für jetzt geben wir die aktuelle Zeit zurück
    return new Date().toISOString();
  } catch (error) {
    console.error('Error getting last update time:', error);
    return null;
  }
}

export const dealsRouter = router({
  /**
   * PERFORMANCE OPTIMIERT: Hole Deals (zuerst Datenbank, bei Bedarf CheapShark)
   * Diese Funktion prüft zuerst, ob aktuelle Deals in der DB vorhanden sind.
   * Falls nicht oder zu alt, wird automatisch CheapShark abgefragt und die DB aktualisiert.
   */
  getDeals: publicProcedure
    .input(
      z.object({
        filters: dealFiltersSchema.optional().default({}),
        sortBy: dealSortSchema,
        forceRefresh: z.boolean().optional().default(false) // Für "Aktualisieren" Button
      })
    )
    .query(async ({ input }) => {
      try {
        // Prüfe ob Refresh erzwungen wird oder DB-Deals zu alt sind
        const shouldRefresh =
          input.forceRefresh || (await shouldRefreshDeals());

        if (shouldRefresh) {
          console.log('🔄 Refreshing deals from CheapShark...');

          // Aggregiere neue Deals von CheapShark
          const freshDeals = await CheapSharkService.aggregateDeals({
            maxDeals: 200,
            storeIDs: ['1', '25', '7', '3'], // Steam, Epic, GOG, GMG
            minSavings: 15,
            maxPrice: 80
          });

          // Verarbeite und speichere in DB
          for (const externalDeal of freshDeals) {
            try {
              await DealsService.processExternalDeal(externalDeal);
            } catch (error) {
              console.error(
                `Failed to process deal: ${externalDeal.title}`,
                error
              );
            }
          }

          console.log(
            `✅ Processed ${freshDeals.length} deals from CheapShark`
          );
        }

        // Hole Deals aus der Datenbank (immer aktuell nach Refresh)
        const deals = await DealsService.getDeals(input.filters, input.sortBy);

        return {
          success: true,
          deals,
          isFromCache: !shouldRefresh,
          lastUpdated: await getLastDealUpdateTime()
        };
      } catch (error) {
        console.error('Error in getDeals:', error);
        throw new Error('Failed to fetch deals');
      }
    }),

  /**
   * MANUELLER REFRESH: Erzwinge Aktualisierung von CheapShark
   */
  refreshDeals: publicProcedure
    .input(
      z.object({
        maxDeals: z.number().min(1).max(500).optional().default(200),
        storeIDs: z.array(z.string()).optional(),
        minSavings: z.number().min(0).max(100).optional().default(15)
      })
    )
    .mutation(async ({ input }) => {
      try {
        console.log('🔄 Manual refresh triggered...');

        // Hole neue Deals von CheapShark
        const externalDeals = await CheapSharkService.aggregateDeals({
          maxDeals: input.maxDeals,
          storeIDs: input.storeIDs || ['1', '25', '7', '3'],
          minSavings: input.minSavings,
          maxPrice: 80
        });

        let imported = 0;
        let updated = 0;
        const errors: string[] = [];

        // Verarbeite jeden Deal
        for (const externalDeal of externalDeals) {
          try {
            const result = await DealsService.processExternalDeal(externalDeal);
            if (result.created) {
              imported++;
            } else {
              updated++;
            }
          } catch (error) {
            const errorMsg = `Failed to process ${externalDeal.title}: ${error}`;
            errors.push(errorMsg);
            console.error(errorMsg);
          }
        }

        return {
          success: true,
          imported,
          updated,
          errors,
          total: externalDeals.length
        };
      } catch (error) {
        console.error('Error in refreshDeals:', error);
        throw new Error('Failed to refresh deals');
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
   * Suche nach Deals für ein spezifisches Spiel (mit Live-Suche)
   */
  searchGameDeals: publicProcedure
    .input(
      z.object({
        gameTitle: z.string().min(1),
        includeLive: z.boolean().optional().default(false) // Optional: Auch CheapShark durchsuchen
      })
    )
    .query(async ({ input }) => {
      try {
        if (input.includeLive) {
          // Live-Suche über CheapShark
          const liveDeals = await DealsService.searchGameDeals(input.gameTitle);
          return {
            success: true,
            deals: liveDeals,
            source: 'live'
          };
        } else {
          // Suche in der Datenbank
          const dbDeals = await DealsService.getDealsByGameId(0); // TODO: Implement proper search
          return {
            success: true,
            deals: dbDeals,
            source: 'database'
          };
        }
      } catch (error) {
        console.error('Error in searchGameDeals:', error);
        throw new Error('Failed to search game deals');
      }
    }),

  /**
   * REGIONAL: Hole regionale Deals mit Unterstützung für verschiedene Regionen
   */
  getRegionalDeals: publicProcedure
    .input(
      z.object({
        region: regionSchema,
        filters: dealFiltersSchema.optional().default({}),
        sortBy: dealSortSchema,
        forceRefresh: z.boolean().optional().default(false)
      })
    )
    .query(async ({ input }) => {
      try {
        const { region, filters, sortBy, forceRefresh } = input;

        // Bei forceRefresh: Hole neue regionale Deals
        if (forceRefresh) {
          console.log(`🌍 Refreshing deals for region: ${region}`);

          const aggregationResult = await DealsService.aggregateRegionalDeals(
            region,
            {
              maxDeals: 100,
              minSavings: 20,
              maxPrice: 100
            }
          );

          console.log(`Regional refresh completed:`, aggregationResult);
        }

        // Hole Deals aus DB (gefiltert nach Region)
        const deals = await DealsService.getRegionalDeals(
          region,
          filters,
          sortBy
        );
        const lastUpdate = await getLastDealUpdateTime();

        return {
          success: true,
          deals,
          region,
          lastUpdate,
          fromCache: !forceRefresh,
          total: deals.length
        };
      } catch (error) {
        console.error('Error in getRegionalDeals:', error);
        throw new Error(`Failed to get regional deals for ${input.region}`);
      }
    }),

  /**
   * REGIONAL: Aggregiere Deals für eine spezifische Region
   */
  refreshRegionalDeals: publicProcedure
    .input(
      z.object({
        region: regionSchema,
        options: z
          .object({
            maxDeals: z.number().min(10).max(200).optional().default(100),
            minSavings: z.number().min(0).max(95).optional().default(25),
            maxPrice: z.number().min(1).max(500).optional().default(100)
          })
          .optional()
          .default({})
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { region, options } = input;

        console.log(`🔄 Starting regional deal refresh for: ${region}`);

        const result = await DealsService.aggregateRegionalDeals(
          region,
          options
        );

        return {
          success: true,
          region,
          processed: result.processed,
          newDeals: result.newDeals,
          updatedDeals: result.updatedDeals,
          errors: result.errors,
          message: `Successfully processed ${result.processed} deals for ${region}`
        };
      } catch (error) {
        console.error('Error in refreshRegionalDeals:', error);
        throw new Error(`Failed to refresh regional deals for ${input.region}`);
      }
    })
});
