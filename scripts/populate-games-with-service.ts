import { GamesService } from '../lib/services/games.service';
import { type IGDBGameData } from '../lib/services/igdb.service';

// Rate limiting - max 4 requests per second
const RATE_LIMIT_DELAY = 250; // 250ms between requests
const BATCH_SIZE = 100; // Process 100 games per batch

// IGDB API credentials
const IGDB_CLIENT_ID = process.env.IGDB_CLIENT_ID;
const IGDB_CLIENT_SECRET = process.env.IGDB_CLIENT_SECRET;

if (!IGDB_CLIENT_ID || !IGDB_CLIENT_SECRET) {
  throw new Error('IGDB credentials not found in environment variables');
}

let accessToken: string | null = null;

/**
 * Get IGDB access token
 */
async function getAccessToken(): Promise<string> {
  if (accessToken) return accessToken;

  const response = await fetch(`https://id.twitch.tv/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: IGDB_CLIENT_ID!,
      client_secret: IGDB_CLIENT_SECRET!,
      grant_type: 'client_credentials'
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  const data = await response.json();
  accessToken = data.access_token;
  return accessToken!;
}

/**
 * Fetch games from IGDB API
 */
async function fetchGamesFromIGDB(offset: number = 0): Promise<any[]> {
  const token = await getAccessToken();

  const query = `
    fields name, summary, first_release_date, total_rating, cover.image_id, screenshots.image_id, 
           genres.name, involved_companies.company.name, involved_companies.developer, 
           involved_companies.publisher, platforms.name;
    where platforms.name = "PC (Microsoft Windows)" & total_rating > 0;
    limit ${BATCH_SIZE};
    offset ${offset};
    sort total_rating desc;
  `;

  const response = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      'Client-ID': IGDB_CLIENT_ID!,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: query
  });

  if (!response.ok) {
    throw new Error(`IGDB API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Convert IGDB game data to our format
 */
function convertIGDBGameData(igdbGame: any): IGDBGameData {
  const developers =
    igdbGame.involved_companies
      ?.filter((ic: any) => ic.developer)
      .map((ic: any) => ic.company?.name)
      .filter(Boolean) || [];

  const publishers =
    igdbGame.involved_companies
      ?.filter((ic: any) => ic.publisher)
      .map((ic: any) => ic.company?.name)
      .filter(Boolean) || [];

  const genres = igdbGame.genres?.map((g: any) => g.name).filter(Boolean) || [];

  const coverUrl = igdbGame.cover?.image_id
    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${igdbGame.cover.image_id}.jpg`
    : undefined;

  const screenshotUrls =
    igdbGame.screenshots?.map(
      (s: any) =>
        `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${s.image_id}.jpg`
    ) || [];

  return {
    id: igdbGame.id,
    name: igdbGame.name,
    summary: igdbGame.summary || undefined,
    firstReleaseDate: igdbGame.first_release_date
      ? new Date(igdbGame.first_release_date * 1000)
      : undefined,
    totalRating: igdbGame.total_rating || undefined,
    coverUrl: coverUrl || undefined,
    screenshotUrls,
    genres,
    developers,
    publishers
  };
}

/**
 * Save games to database using GamesService
 */
async function saveGamesToDatabase(games: IGDBGameData[]): Promise<{
  created: number;
  updated: number;
  errors: string[];
}> {
  const result = {
    created: 0,
    updated: 0,
    errors: [] as string[]
  };

  for (const gameData of games) {
    try {
      const importResult = await GamesService.createOrUpdateGameFromIGDB(
        gameData
      );

      if (importResult.success) {
        if (importResult.isNew) {
          result.created++;
        } else {
          result.updated++;
        }
        console.log(
          `✓ ${importResult.isNew ? 'Created' : 'Updated'}: ${gameData.name}`
        );
      } else {
        result.errors.push(
          `Failed to import ${gameData.name}: ${
            importResult.message || 'Unknown error'
          }`
        );
      }
    } catch (error) {
      const errorMsg = `Error importing ${gameData.name}: ${
        error instanceof Error ? error.message : error
      }`;
      result.errors.push(errorMsg);
      console.error(`✗ ${errorMsg}`);
    }
  }

  return result;
}

/**
 * Sleep function for rate limiting
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main function to populate the database
 */
async function populateDatabase(): Promise<void> {
  console.log('🚀 Starting IGDB database population...');
  console.log(
    `📊 Batch size: ${BATCH_SIZE}, Rate limit: ${RATE_LIMIT_DELAY}ms`
  );

  let offset = 0;
  let totalProcessed = 0;
  let totalCreated = 0;
  let totalUpdated = 0;
  let totalErrors = 0;

  while (true) {
    try {
      console.log(`\n📥 Fetching games from IGDB (offset: ${offset})...`);

      // Fetch games from IGDB
      const rawGames = await fetchGamesFromIGDB(offset);

      if (rawGames.length === 0) {
        console.log('✅ No more games to fetch. Import complete!');
        break;
      }

      console.log(`📋 Received ${rawGames.length} games from IGDB`);

      // Convert to our format
      const games = rawGames.map(convertIGDBGameData);

      // Save to database
      const batchResult = await saveGamesToDatabase(games);

      // Update totals
      totalProcessed += games.length;
      totalCreated += batchResult.created;
      totalUpdated += batchResult.updated;
      totalErrors += batchResult.errors.length;

      console.log(
        `📊 Batch complete: ${batchResult.created} created, ${batchResult.updated} updated, ${batchResult.errors.length} errors`
      );

      if (batchResult.errors.length > 0) {
        console.log('❌ Errors in this batch:');
        batchResult.errors.forEach(error => console.log(`   - ${error}`));
      }

      offset += rawGames.length;

      // Rate limiting
      if (rawGames.length === BATCH_SIZE) {
        console.log(`⏱️ Rate limiting: waiting ${RATE_LIMIT_DELAY}ms...`);
        await sleep(RATE_LIMIT_DELAY);
      }
    } catch (error) {
      console.error(`❌ Error in batch starting at offset ${offset}:`, error);

      // Continue with next batch after error
      offset += BATCH_SIZE;
      totalErrors++;

      // Wait a bit longer after error
      await sleep(RATE_LIMIT_DELAY * 2);
    }
  }

  console.log('\n🎉 Database population complete!');
  console.log(`📊 Final statistics:`);
  console.log(`   - Total processed: ${totalProcessed}`);
  console.log(`   - Games created: ${totalCreated}`);
  console.log(`   - Games updated: ${totalUpdated}`);
  console.log(`   - Errors: ${totalErrors}`);
}

// Run the script
populateDatabase().catch(console.error);
