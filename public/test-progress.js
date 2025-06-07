// Test-Script für das neue Progress-Tracking-System
// Dieses Script kann in der Browser-Konsole ausgeführt werden

console.log('🧪 Nexus Progress-Tracking Test');

// Simuliere eine Operation-ID
const operationId = `test-operation-${Date.now()}`;

// Test SSE-Verbindung
const testSSEConnection = () => {
  console.log(`📡 Teste SSE-Verbindung zu: /api/progress/${operationId}`);

  const eventSource = new EventSource(`/api/progress/${operationId}`);

  eventSource.onopen = () => {
    console.log('✅ SSE-Verbindung erfolgreich geöffnet');
  };

  eventSource.onmessage = event => {
    console.log('📨 SSE-Nachricht erhalten:', event.data);
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'connected') {
        console.log('🔗 SSE-Verbindung bestätigt');
      } else if (data.type === 'progress') {
        console.log(
          `📊 Progress-Update: ${data.current}/${data.total} - ${data.message}`
        );
      }
    } catch (error) {
      console.error('❌ Fehler beim Parsen der SSE-Nachricht:', error);
    }
  };

  eventSource.onerror = error => {
    console.error('❌ SSE-Verbindungsfehler:', error);
  };

  // Test-Updates nach 2 Sekunden beenden
  setTimeout(() => {
    console.log('🛑 Schließe SSE-Verbindung');
    eventSource.close();
  }, 10000);

  return eventSource;
};

// Teste Progress-Update-Funktion (nur für Development)
const testProgressUpdate = async () => {
  console.log('📤 Teste Progress-Update-Funktion...');

  try {
    // Simuliere Progress-Updates
    const updates = [
      { current: 0, total: 100, message: 'Test gestartet...' },
      { current: 25, total: 100, message: 'Erste Phase abgeschlossen' },
      { current: 50, total: 100, message: 'Hälfte erreicht' },
      { current: 75, total: 100, message: 'Fast fertig...' },
      { current: 100, total: 100, message: 'Test abgeschlossen!' }
    ];

    for (let i = 0; i < updates.length; i++) {
      setTimeout(() => {
        const update = updates[i];
        console.log(
          `📊 Simuliere Progress: ${update.current}/${update.total} - ${update.message}`
        );

        // Hier würde normalerweise sendProgressUpdate aufgerufen
        // sendProgressUpdate(operationId, update.current, update.total, update.message);
      }, i * 1000);
    }
  } catch (error) {
    console.error('❌ Fehler beim Testen der Progress-Updates:', error);
  }
};

// Zeige verfügbare Test-Funktionen
console.log(`
🎯 Verfügbare Test-Funktionen:
- testSSEConnection() - Teste Server-Sent Events Verbindung
- testProgressUpdate() - Simuliere Progress-Updates

Beispiel:
testSSEConnection();
`);

// Export für Browser-Console
window.nexusProgressTest = {
  testSSEConnection,
  testProgressUpdate,
  operationId
};
