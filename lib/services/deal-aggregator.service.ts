import { DealsService, type CreateDealInput } from './deals.service';
import { GamesService } from './games.service';

/**
 * Deal Aggregator Service - Sammelt Deals von verschiedenen Quellen
 *
 * Für den MVP verwenden wir Mock-Daten, später können echte APIs integriert werden:
 * - Steam API für Sale-Informationen
 * - Epic Games Store Deals
 * - GOG Galaxy API
 * - Reddit GameDeals Scraping
 * - IsThereAnyDeal.com API
 */

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

export namespace DealAggregatorService {
  /**
   * Sammle Deals von allen verfügbaren Quellen
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
      const dealData: Omit<CreateDealInput, 'gameId'> = {
        title: externalDeal.title,
        storeName: externalDeal.storeName,
        price: externalDeal.price,
        originalPrice: externalDeal.originalPrice,
        discountPercent: externalDeal.discountPercent,
        url: externalDeal.url,
        validUntil: externalDeal.validUntil,
        isFreebie: externalDeal.isFreebie || false
      };

      // Versuche existierenden Deal zu finden
      const existingDeals = await DealsService.getDealsByGameId(game.id);
      const existingDeal = existingDeals.find(
        deal =>
          deal.storeName.toLowerCase() === externalDeal.storeName.toLowerCase()
      );

      let deal;
      let created = false;

      if (existingDeal) {
        // Aktualisiere existierenden Deal
        deal = await DealsService.updateDeal(existingDeal.id, dealData);
      } else {
        // Erstelle neuen Deal
        deal = await DealsService.createDeal({
          gameId: game.id,
          ...dealData
        });
        created = true;
      }

      return { created, deal };
    } catch (error) {
      console.error('Error processing external deal:', error);
      throw error;
    }
  }

  /**
   * Finde oder erstelle Spiel basierend auf Deal-Informationen
   */
  async function findOrCreateGameFromDeal(externalDeal: ExternalDeal) {
    try {
      // Versuche Spiel anhand des Titels zu finden
      let games = await GamesService.searchGamesByTitle(externalDeal.title);

      if (games.length > 0) {
        return games[0]; // Nehme das erste gefundene Spiel
      } // Grund: Spiel nicht gefunden, erstelle neues
      console.log(`Creating new game from deal: ${externalDeal.title}`);

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
        validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 Tage
        isFreebie: false,
        source: 'steam'
      },
      {
        title: 'Among Us',
        storeName: 'Steam',
        originalPrice: 4.99,
        price: 1.99,
        discountPercent: 60,
        url: 'https://store.steampowered.com/app/945360/',
        validUntil: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 Tage
        isFreebie: false,
        source: 'steam'
      },
      {
        title: 'Rocket League',
        storeName: 'Epic Games Store',
        originalPrice: 19.99,
        price: 0,
        discountPercent: 100,
        url: 'https://store.epicgames.com/en-US/p/rocket-league',
        isFreebie: true,
        source: 'epic'
      },
      {
        title: 'Subnautica',
        storeName: 'Epic Games Store',
        originalPrice: 29.99,
        price: 0,
        discountPercent: 100,
        url: 'https://store.epicgames.com/en-US/p/subnautica',
        validUntil: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 Tag
        isFreebie: true,
        source: 'epic'
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
   * Bereinige alte Deals automatisch
   */
  export async function cleanupOldDeals(): Promise<number> {
    try {
      return await DealsService.cleanupExpiredDeals();
    } catch (error) {
      console.error('Error cleaning up old deals:', error);
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
}
