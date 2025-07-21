import dotenv from 'dotenv';
import { IGDBService } from '../lib/services/igdb.service';

// Lade Umgebungsvariablen
dotenv.config();

/**
 * Test-Script für verbesserte IGDB-Suche
 */
async function testIGDBSearch() {
  console.log('🔍 Teste verbesserte IGDB-Suche...\n');

  // Test-Fälle die Probleme verursacht haben
  const testCases = [
    'nordhold',
    'No One But You',
    'The Witcher 3',
    'Half-Life 2',
    'Portal',
    'Cyberpunk 2077',
    'Some Random Nonexistent Game 12345'
  ];

  for (const testCase of testCases) {
    try {
      console.log(`\n📝 Suche nach: "${testCase}"`);
      console.log('─'.repeat(50));

      const result = await IGDBService.findGameByTitle(testCase);

      if (result) {
        console.log(`✅ Gefunden: "${result.name}"`);
        console.log(`   IGDB ID: ${result.id}`);
        console.log(`   Genres: ${result.genres?.join(', ') || 'Keine'}`);
        console.log(`   Rating: ${result.totalRating || 'N/A'}`);
      } else {
        console.log('❌ Kein passendes Spiel gefunden');
      }

      // Kurze Pause zwischen Anfragen
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Fehler bei "${testCase}":`, error);
    }
  }

  console.log('\n✅ Test abgeschlossen!');
}

// Script ausführen
testIGDBSearch().catch(console.error);
