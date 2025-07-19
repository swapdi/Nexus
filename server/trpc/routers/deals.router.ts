// Deals Router - BEREINIGT
// Grund: Nur noch syncAndLoadDeals Workflow für optimale Performance
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { useStoreUtils } from '~/composables/useStoreUtils';
import { DealsService } from '~/lib/services/deals.service';
import { publicProcedure, router } from '../trpc';
export const dealsRouter = router({
  searchDeals: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        isActive: z.boolean().optional()
      })
    )
    .query(async ({ input }) => {
      return await DealsService.searchDeals(input);
    }),
  /**
   * Lädt Deals schnell aus der Datenbank (ohne CheapShark Sync)
   * Grund: Schneller UI-Load für bessere User Experience
   */
  loadDealsFromDB: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1),
          offset: z.number().min(0).default(0)
        })
        .optional()
    )
    .query(async ({ input }) => {
      try {
        const { limit, offset } = input || {};

        // Lade die Deals für die aktuelle Seite
        const deals = await DealsService.searchDeals({
          isActive: true,
          limit,
          offset
        });

        return {
          deals
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
  syncAllDealsBackground: publicProcedure.mutation(async ({ input }) => {
    try {
      const {
        cleanupDays = 100,
        maxPages = 45,
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
          console.error(`API Error on page ${currentPage}:`, apiError.message);
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
  }),
  /**
   * Sucht Deals für ein bestimmtes Spiel (sowohl aus DB als auch live von CheapShark)
   * Grund: Live-Angebote auf Spieldetailseiten anzeigen
   */
  searchGameDeals: publicProcedure
    .input(
      z.object({
        gameId: z.number(),
        gameName: z.string(),
        slug: z.string().optional()
      })
    )
    .query(async ({ input }) => {
      try {
        const { gameId, gameName, slug } = input;

        // Schritt 1: Suche gespeicherte Deals in der Datenbank
        let savedDeals = await DealsService.searchDeals({
          gameId,
          isActive: true,
          limit: 10
        });

        // Falls keine direkten gameId matches, suche in allen Deals nach ähnlichem Titel
        if (savedDeals.length === 0) {
          // Lade alle aktiven Deals und filtere clientseitig nach Titel
          const allDeals = await DealsService.searchDeals({
            isActive: true,
            limit: 100
          });

          savedDeals = allDeals
            .filter(
              deal =>
                deal.title.toLowerCase().includes(gameName.toLowerCase()) ||
                (slug && deal.title.toLowerCase().includes(slug.toLowerCase()))
            )
            .slice(0, 10);
        }

        // Schritt 2: Suche live Deals bei CheapShark
        const liveDeals = [];
        try {
          // Importiere CheapShark Service nur hier im Router
          const { CheapSharkService } = await import(
            '~/lib/services/cheapshark.service'
          );

          // Suche Game bei CheapShark
          const gameSearchResults = await CheapSharkService.searchGameByTitle(
            gameName
          );

          if (gameSearchResults.length > 0) {
            const cheapSharkGameId = gameSearchResults[0].gameID;
            const gameInfo = await CheapSharkService.getGameDeals(
              cheapSharkGameId
            );

            // Konvertiere zu unserem Deal-Format
            for (const deal of gameInfo.deals.slice(0, 6)) {
              liveDeals.push({
                id: Math.floor(Math.random() * 1000000), // Temporäre ID
                gameId,
                title: gameInfo.info.title,
                storeName: useStoreUtils().getStoreName(deal.storeID),
                price: parseFloat(deal.price),
                originalPrice: parseFloat(deal.retailPrice),
                discountPercent: parseFloat(deal.savings),
                url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
                validFrom: new Date(),
                validUntil: null,
                isFreebie: false,
                discoveredAt: new Date(),
                updatedAt: new Date(),
                externalId: deal.dealID,
                source: 'cheapshark',
                platformIds: []
              });
            }
          }
        } catch (apiError) {
          console.warn('CheapShark API Fehler bei Live-Suche:', apiError);
          // Ignoriere API-Fehler und fahre nur mit gespeicherten Deals fort
        }

        // Kombiniere gespeicherte und Live-Deals
        const allDeals = [...savedDeals, ...liveDeals];

        // Entferne Duplikate basierend auf externalId
        const uniqueDeals = allDeals.filter(
          (deal, index, self) =>
            !deal.externalId ||
            self.findIndex(d => d.externalId === deal.externalId) === index
        );

        return uniqueDeals.slice(0, 6);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to search game deals: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        });
      }
    })
});
