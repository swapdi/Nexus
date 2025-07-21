import { config } from 'dotenv';
import { GamesService } from '../lib/services/games.service';
import type { IGDBGameData } from '../types';

// Load environment variables from .env file
config();

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
    fields name, summary, storyline, first_release_date, total_rating, cover.image_id, screenshots.image_id, 
           videos.video_id, videos.name, websites.category, websites.url,
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
 * Sleep function for rate limiting
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Convert raw IGDB API response to IGDBGameData format
 */
function convertToIGDBGameData(rawGame: any): IGDBGameData {
  // Extract cover URL
  let coverUrl: string | undefined;
  if (rawGame.cover?.image_id) {
    coverUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${rawGame.cover.image_id}.jpg`;
  }

  // Extract screenshot URLs
  const screenshotUrls: string[] = [];
  if (rawGame.screenshots && Array.isArray(rawGame.screenshots)) {
    rawGame.screenshots.forEach((screenshot: any) => {
      if (screenshot.image_id) {
        screenshotUrls.push(
          `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${screenshot.image_id}.jpg`
        );
      }
    });
  }

  // Extract video URLs
  const videoUrls: string[] = [];
  if (rawGame.videos && Array.isArray(rawGame.videos)) {
    rawGame.videos.forEach((video: any) => {
      if (video.video_id) {
        // IGDB videos are usually YouTube videos
        videoUrls.push(`https://www.youtube.com/watch?v=${video.video_id}`);
      }
    });
  }

  // Extract websites
  const websites: Array<{ category: number; url: string }> = [];
  if (rawGame.websites && Array.isArray(rawGame.websites)) {
    rawGame.websites.forEach((website: any) => {
      if (website.url && website.category !== undefined) {
        websites.push({
          category: website.category,
          url: website.url
        });
      }
    });
  }

  // Extract genres
  const genres: string[] = [];
  if (rawGame.genres && Array.isArray(rawGame.genres)) {
    rawGame.genres.forEach((genre: any) => {
      if (genre.name) {
        genres.push(genre.name);
      }
    });
  }

  // Extract developers and publishers
  const developers: string[] = [];
  const publishers: string[] = [];
  if (rawGame.involved_companies && Array.isArray(rawGame.involved_companies)) {
    rawGame.involved_companies.forEach((company: any) => {
      if (company.company?.name) {
        if (company.developer) {
          developers.push(company.company.name);
        }
        if (company.publisher) {
          publishers.push(company.company.name);
        }
      }
    });
  }

  // Extract platforms
  const platforms: string[] = [];
  if (rawGame.platforms && Array.isArray(rawGame.platforms)) {
    rawGame.platforms.forEach((platform: any) => {
      if (platform.name) {
        platforms.push(platform.name);
      }
    });
  }

  // Convert release date
  let firstReleaseDate: Date | undefined;
  if (rawGame.first_release_date) {
    firstReleaseDate = new Date(rawGame.first_release_date * 1000); // IGDB uses Unix timestamps
  }

  return {
    id: rawGame.id,
    name: rawGame.name,
    summary: rawGame.summary || undefined,
    storyline: rawGame.storyline || undefined,
    coverUrl,
    screenshotUrls: screenshotUrls.length > 0 ? screenshotUrls : undefined,
    videoUrls: videoUrls.length > 0 ? videoUrls : undefined,
    websites: websites.length > 0 ? websites : undefined,
    genres: genres.length > 0 ? genres : undefined,
    developers: developers.length > 0 ? developers : undefined,
    publishers: publishers.length > 0 ? publishers : undefined,
    firstReleaseDate,
    totalRating: rawGame.total_rating || undefined,
    platforms: platforms.length > 0 ? platforms : undefined
  };
}

/**
 * Main function to populate the database
 */
async function populateDatabase(): Promise<void> {
  console.log(
    `📊 Batch size: ${BATCH_SIZE}, Rate limit: ${RATE_LIMIT_DELAY}ms`
  );
  let offset = 0;
  let totalProcessed = 0;
  let totalCreated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  while (true) {
    try {
      // Fetch games from IGDB
      const rawGames = await fetchGamesFromIGDB(offset);
      if (rawGames.length === 0) {
        console.log('✅ No more games to process');
        break;
      }

      console.log(
        `🔄 Processing batch of ${rawGames.length} games (offset: ${offset})`
      );

      // Process each game individually
      for (const rawGame of rawGames) {
        try {
          if (!rawGame.name || !rawGame.id) {
            console.log('⚠️ Skipping game without name or ID');
            totalErrors++;
            continue;
          }

          // Convert to IGDBGameData format
          const gameData = convertToIGDBGameData(rawGame);

          // Use createGameFromIGDB which handles duplicate checks
          const createdGame = await GamesService.createGameFromIGDB(gameData);

          if (createdGame) {
            totalProcessed++;
            // Check if game was actually created or already existed
            const wasCreated =
              createdGame.createdAt &&
              Date.now() - new Date(createdGame.createdAt).getTime() < 10000; // Created within last 10 seconds

            if (wasCreated) {
              totalCreated++;
              console.log(
                `✅ Created: ${gameData.name} (IGDB ID: ${gameData.id})`
              );
            } else {
              totalSkipped++;
              console.log(
                `♻️ Already exists: ${gameData.name} (IGDB ID: ${gameData.id})`
              );
            }
          } else {
            totalErrors++;
            console.log(`❌ Failed to create: ${gameData.name}`);
          }

          // Rate limiting between individual games
          await sleep(RATE_LIMIT_DELAY);
        } catch (error) {
          totalErrors++;
          console.error(`❌ Error processing game "${rawGame.name}":`, error);
          // Continue with next game after error
          await sleep(RATE_LIMIT_DELAY);
        }
      }

      console.log(
        `📊 Batch complete: ${totalCreated} created, ${totalSkipped} skipped, ${totalErrors} errors`
      );

      offset += rawGames.length;

      // Additional delay between batches
      if (rawGames.length === BATCH_SIZE) {
        console.log(`⏳ Waiting ${RATE_LIMIT_DELAY}ms before next batch...`);
        await sleep(RATE_LIMIT_DELAY);
      }
    } catch (error) {
      console.error(`❌ Error in batch starting at offset ${offset}:`, error);
      totalErrors++;
      // Continue with next batch after error
      offset += BATCH_SIZE;
      // Wait longer after batch error
      await sleep(RATE_LIMIT_DELAY * 3);
    }
  }

  console.log('\n📈 Final Statistics:');
  console.log(`Total processed: ${totalProcessed}`);
  console.log(`Total created: ${totalCreated}`);
  console.log(`Total skipped (already existed): ${totalSkipped}`);
  console.log(`Total errors: ${totalErrors}`);
}

// Run the script
populateDatabase().catch(console.error);
