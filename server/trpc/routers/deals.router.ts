// Deals Router - BEREINIGT
// Grund: Nur noch syncAndLoadDeals Workflow für optimale Performance
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { DealsService } from '~/lib/services/deals.service';
import { publicProcedure, router } from '../trpc';
export const dealsRouter = router({
  /**
   * Lädt Deals schnell aus der Datenbank (ohne CheapShark Sync)
   * Grund: Schneller UI-Load für bessere User Experience
   */
  loadDealsFromDB: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(500).default(100),
          offset: z.number().min(0).default(0)
        })
        .optional()
    )
    .query(async ({ input }) => {
      try {
        const { limit = 100, offset = 0 } = input || {};
        const deals = await DealsService.searchDeals({
          isActive: true,
          limit,
          offset
        });
        return {
          deals,
          totalDeals: deals.length
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to load deals from database: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        });
      }
    }),
  // ===== CHEAPSHARK INTEGRATION =====
  /**
   * Lädt alle verfügbaren CheapShark Deals im Hintergrund (ohne Limit)
   * Grund: Vollständige Synchronisation aller Deals für maximale Abdeckung
   */
  syncAllDealsBackground: publicProcedure
    .input(
      z
        .object({
          cleanupDays: z.number().min(1).max(100).default(7),
          maxPages: z.number().min(1).max(60).default(45), // Reduziert auf sicheren Wert
          stopOnEmpty: z.boolean().default(true),
          maxEmptyPages: z.number().min(1).max(10).default(3),
          maxAge: z.number().min(1).max(10000).default(2500),
          rateLimitDelay: z.number().min(100).max(5000).default(800) // Längere Pausen
        })
        .optional()
    )
    .mutation(async ({ input }) => {
      try {
        const {
          cleanupDays = 100,
          //maxPages = 45,
          maxPages = 1,
          stopOnEmpty = true,
          maxEmptyPages = 3,
          maxAge = 2400,
          rateLimitDelay = 800
        } = input || {};
        // Schritt 1: Veraltete Deals bereinigen
        await DealsService.cleanupExpiredDeals(cleanupDays);
        let totalSynced = 0;
        let currentPage = 0;
        let emptyPagesCount = 0;
        // Schritt 2: Lade alle verfügbaren Seiten bis keine Deals mehr gefunden werden
        while (currentPage < maxPages) {
          try {
            const cheapSharkDeals = await DealsService.getAllCheapSharkDeals({
              pageNumber: currentPage,
              //pageSize: 60,
              pageSize: 10,
              sortBy: 'Deal Rating',
              desc: true,
              maxAge: maxAge // Filter Deals älter als X Tage
            });
            // Prüfe ob Seite leer ist
            if (!cheapSharkDeals || cheapSharkDeals.length === 0) {
              emptyPagesCount++;
              if (stopOnEmpty && emptyPagesCount >= maxEmptyPages) {
                break;
              }
            } else {
              emptyPagesCount = 0; // Reset wenn wieder Deals gefunden werden
              // Schritt 3: Deals in Datenbank speichern
              await DealsService.saveCheapSharkDeals(cheapSharkDeals, null);
              totalSynced += cheapSharkDeals.length;
            }
            currentPage++;
            // Angepasste Pause zwischen API-Calls basierend auf Rate-Limiting-Erfahrung
            if (currentPage < maxPages) {
              // Längere Pausen nach jeder 10. Seite um 429 Errors zu vermeiden
              const delay =
                currentPage % 10 === 0 ? rateLimitDelay * 2 : rateLimitDelay;
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          } catch (apiError: any) {
            console.error(
              `API Error on page ${currentPage}:`,
              apiError.message
            );
            // Bei 429 (Rate Limit) oder 400 (Bad Request) stoppen
            if (
              apiError.message?.includes('429') ||
              apiError.message?.includes('400')
            ) {
              break;
            }
            // Bei anderen Fehlern: Seite überspringen und weitermachen
            emptyPagesCount++;
            if (emptyPagesCount >= maxEmptyPages) {
              break;
            }
          }
        }
        return {
          success: true,
          totalSynced,
          pagesProcessed: currentPage,
          emptyPagesFound: emptyPagesCount,
          stoppedReason:
            currentPage >= maxPages ? 'MAX_PAGES_REACHED' : 'NO_MORE_DEALS'
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to sync all deals in background: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        });
      }
    })
});
