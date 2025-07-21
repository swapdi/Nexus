import dotenv from 'dotenv';
import { GamesService } from '../lib/services/games.service';

// Lade Umgebungsvariablen
dotenv.config();

/**
 * Test-Script für verbesserte Steam/Epic Import-Logik
 */
async function testImprovedGameMatching() {
  console.log('🔍 Teste verbesserte Spiel-Zuordnung...\n');

  // Test-Fälle für häufige Steam/Epic Import-Probleme
  const testCases = [
    // Standard Fälle
    'The Witcher 3: Wild Hunt',
    'Cyberpunk 2077',

    // Edition-Probleme
    'Cyberpunk 2077: Ultimate Edition',
    'The Witcher 3: Wild Hunt - Game of the Year Edition',
    "Baldur's Gate 3: Digital Deluxe Edition",

    // Steam-spezifische Namen
    'Half-Life 2',
    'Portal 2',

    // Spiele die nicht in der DB sind
    'Some Super Rare Indie Game 2024',

    // Problematische Fälle
    'nordhold',
    'No One But You'
  ];

  for (const testCase of testCases) {
    try {
      console.log(`\n📝 Import-Test: "${testCase}"`);
      console.log('─'.repeat(60));

      const result = await GamesService.findOrCreateGameWithIGDBRelevance(
        testCase
      );

      if (result && result.success) {
        console.log(`✅ Zugeordnet zu: "${result.game.name}"`);
        console.log(`   ID: ${result.game.id}`);
        console.log(`   IGDB ID: ${result.game.igdbId}`);
        console.log(
          `   Status: ${result.isNew ? 'NEU ERSTELLT' : 'BEREITS VORHANDEN'}`
        );
        console.log(`   Grund: ${result.message}`);

        if (result.game.genres && result.game.genres.length > 0) {
          console.log(`   Genres: ${result.game.genres.join(', ')}`);
        }
      } else {
        console.log('❌ Kein passendes Spiel gefunden');
      }

      // Kurze Pause zwischen Tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Fehler bei "${testCase}":`, error);
    }
  }

  console.log('\n✅ Test abgeschlossen!');
}

// Script ausführen
testImprovedGameMatching().catch(console.error);
