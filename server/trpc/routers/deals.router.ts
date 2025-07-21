// Deals Router - BEREINIGT
// Grund: Nur noch syncAndLoadDeals Workflow für optimale Performance
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { useStoreUtils } from '~/composables/useStoreUtils';
import { DealsService } from '~/lib/services/deals.service';
import { CheapSharkService } from '../../../lib/services/cheapshark.service';
import { ITADService } from '../../../lib/services/itad.service';
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
          const cheapSharkDeals = await CheapSharkService.getAllDeals({
            pageNumber: currentPage,
            pageSize: 60,
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

        // Schritt 2: Suche live Deals bei CheapShark
        const liveCSDeals = [];
        try {
          // Suche Game bei CheapShark
          const cheapSharkSearchResults =
            await CheapSharkService.searchGameByTitle(gameName);

          if (cheapSharkSearchResults.length > 0) {
            const cheapSharkGameId = cheapSharkSearchResults[0].gameID;
            const gameInfo = await CheapSharkService.getGameDeals(
              cheapSharkGameId
            );
            // Konvertiere zu unserem Deal-Format
            for (const deal of gameInfo.deals.slice(0, 6)) {
              liveCSDeals.push({
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
        // Schritt 3: Suche live Deals bei ITAD
        const liveITADDeals: any[] = [];
        try {
          const ITADGames = await ITADService.searchGamesByTitle(gameName);
          // Grund: for...of verwenden statt forEach für async/await
          for (const game of ITADGames) {
            try {
              const deals = await ITADService.getGamePrice([game.id]);
              // Grund: Prüfung ob dealGame und deals existieren
              const dealGame = deals[0];
              if (dealGame && dealGame.deals && dealGame.deals.length > 0) {
                dealGame.deals.forEach(deal => {
                  liveITADDeals.push({
                    gameId,
                    title: game.title,
                    storeName: deal.shop.name,
                    price: parseFloat(deal.price.amount.toString()),
                    originalPrice: parseFloat(deal.regular.amount.toString()),
                    discountPercent: parseFloat(deal.cut.toString()),
                    url: deal.url,
                    validFrom: new Date(),
                    validUntil: deal.expiry,
                    isFreebie: deal.price.amount === 0,
                    discoveredAt: new Date(),
                    updatedAt: new Date(),
                    externalId: game.id,
                    source: 'itad'
                  });
                });
              }
            } catch (gameError) {
              console.warn(
                `Fehler beim Laden der Deals für Spiel ${game.title}:`,
                gameError
              );
              // Grund: Einzelne Spiel-Fehler nicht den gesamten Prozess stoppen lassen
              continue;
            }
          }
        } catch (apiError) {
          console.warn('ITAD API Fehler bei Live-Suche:', apiError);
        }

        // Kombiniere gespeicherte und Live-Deals
        const allDeals = [...savedDeals, ...liveCSDeals, ...liveITADDeals];

        // Entferne Duplikate basierend auf externalId ODER Store+Preis-Kombination
        // Grund: Verschiedene APIs können gleiche Deals mit unterschiedlichen IDs haben
        const uniqueDeals = allDeals.filter((deal, index, self) => {
          const firstOccurrenceIndex = self.findIndex(d => {
            // Duplikat wenn externalId gleich ist (und beide haben eine)
            if (
              deal.externalId &&
              d.externalId &&
              deal.externalId === d.externalId
            ) {
              return true;
            }

            // Duplikat wenn Store und Preis gleich sind
            if (
              deal.storeName === d.storeName &&
              deal.price === d.price &&
              deal.storeName && // Store muss existieren
              deal.price !== undefined &&
              deal.price !== null // Preis muss existieren
            ) {
              return true;
            }

            return false;
          });

          // Deal beibehalten wenn es das erste Vorkommen ist oder kein Duplikat gefunden wurde
          return firstOccurrenceIndex === -1 || firstOccurrenceIndex === index;
        });

        return uniqueDeals;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to search game deals: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        });
      }
    }),

  // ===== ITAD API ENDPOINTS =====

  /**
   * ITAD-Spiele suchen
   */
  searchITADGames: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        results: z.number().min(1).max(100).default(20)
      })
    )
    .query(async ({ input }) => {
      try {
        return await ITADService.searchGamesByTitle(input.title, input.results);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to search ITAD games: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        });
      }
    }),

  /**
   * ITAD-Preis-Übersicht für Spiele abrufen
   */
  getITADPriceOverview: publicProcedure
    .input(
      z.object({
        gameIds: z.array(z.string()).min(1).max(200),
        country: z.string().optional(),
        shops: z.array(z.number()).optional(),
        vouchers: z.boolean().optional()
      })
    )
    .query(async ({ input }) => {
      try {
        const { gameIds, ...options } = input;
        return await ITADService.getPriceOverview(gameIds, options);
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to get ITAD price overview: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        });
      }
    })
});
