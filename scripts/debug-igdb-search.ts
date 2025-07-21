import dotenv from 'dotenv';
import { IGDBService } from '../lib/services/igdb.service';

// Lade Umgebungsvariablen
dotenv.config();

/**
 * Debug-Script für IGDB-Suche
 */
async function debugIGDBSearch() {
  console.log('🔍 Debug IGDB-Suche...\n');

  const searchTerm = 'No One But You';

  try {
    console.log(`Suche nach: "${searchTerm}"`);

    // Direkter Aufruf der searchGames Funktion um alle Ergebnisse zu sehen
    const results = await IGDBService.searchGames(searchTerm, 10);

    console.log(`\nGefundene Spiele (${results.length}):`);
    console.log('═'.repeat(60));

    results.forEach((game, index) => {
      console.log(`${index + 1}. "${game.name}"`);
      console.log(`   IGDB ID: ${game.id}`);
      if (game.first_release_date) {
        const date = new Date(game.first_release_date * 1000);
        console.log(`   Release: ${date.getFullYear()}`);
      }
      console.log('');
    });
  } catch (error) {
    console.error('❌ Fehler:', error);
  }
}

// Script ausführen
debugIGDBSearch().catch(console.error);
