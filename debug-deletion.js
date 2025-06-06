// Schnelles Debugging für die Löschfunktionalität
console.log('=== GAMES DELETION DEBUG ===');

// Simuliere eine API-Anfrage mit den Spiel-IDs
const testGameIds = [119, 118, 117, 79, 115];

console.log('Test Game IDs:', testGameIds);
console.log(
  'Types:',
  testGameIds.map(id => typeof id)
);

// Prüfe, ob die IDs korrekt als Zahlen übertragen werden
const apiPayload = {
  gameIds: testGameIds
};

console.log('API Payload:', JSON.stringify(apiPayload, null, 2));

// Simuliere, was im Backend passiert
testGameIds.forEach((gameId, index) => {
  console.log(`Game ${index + 1}: ID=${gameId}, Type=${typeof gameId}`);
});
