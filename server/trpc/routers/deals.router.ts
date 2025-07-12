// Deals Router - BEREINIGT
// Grund: Nur noch syncAndLoadDeals Workflow für optimale Performance

import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { DealsService } from '~/lib/services/deals.service';
import { publicProcedure, router } from '../trpc';

export const dealsRouter = router({
  /**
   * Holt alle Deals aus der Datenbank mit optionalen Filtern
   */
  getAllDeals: publicProcedure
    .input(
      z
        .object({
          gameId: z.number().optional(),
          storeName: z.string().optional(),
          priceMax: z.number().min(0).optional(),
          priceMin: z.number().min(0).optional(),
          discountMin: z.number().min(0).max(100).optional(),
          isFreebie: z.boolean().optional(),
          isActive: z.boolean().default(true),
          source: z.string().optional(),
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0)
        })
        .optional()
    )
    .query(async ({ input }) => {
      try {
        const filters = input || {};
        return await DealsService.searchDeals(filters);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch deals: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        });
      }
    }),

  // ===== CHEAPSHARK INTEGRATION =====

  /**
   * Lädt aktuelle CheapShark Deals, speichert neue in DB und gibt alle DB-Deals zurück
   * Grund: Kompletter Workflow für Deal-Seite - CheapShark sync + DB laden
   */
  syncAndLoadDeals: publicProcedure
    .input(
      z
        .object({
          pageSize: z.number().min(1).max(60).default(50),
          sortBy: z
            .enum([
              'Deal Rating',
              'Title',
              'Savings',
              'Price',
              'Metacritic',
              'Reviews',
              'Release',
              'Store',
              'Recent'
            ])
            .default('Deal Rating'),
          desc: z.boolean().default(true),
          cleanupDays: z.number().min(1).max(30).default(7)
        })
        .optional()
    )
    .query(async ({ input }) => {
      try {
        const {
          pageSize = 50,
          sortBy = 'Deal Rating',
          desc = true,
          cleanupDays = 7
        } = input || {};

        // Schritt 1: Veraltete Deals bereinigen
        await DealsService.cleanupExpiredDeals(cleanupDays);

        // Schritt 2: Aktuelle CheapShark Deals laden
        const cheapSharkDeals = await DealsService.getAllCheapSharkDeals({
          pageSize,
          sortBy,
          desc
        });

        // Schritt 3: Neue Deals in Datenbank speichern (ohne gameId für globale Deals)
        if (cheapSharkDeals && cheapSharkDeals.length > 0) {
          await DealsService.saveCheapSharkDeals(cheapSharkDeals, null);
        }

        // Schritt 4: Alle aktuellen Deals aus Datenbank laden und zurückgeben
        const allDeals = await DealsService.searchDeals({
          isActive: true,
          limit: 100
        });

        return {
          deals: allDeals,
          syncedCount: cheapSharkDeals?.length || 0,
          totalDeals: allDeals.length
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to sync and load deals: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        });
      }
    })
});
