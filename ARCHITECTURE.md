# Nexus Architektur-Dokumentation

## Architektur-Überblick

Die Nexus-Anwendung folgt einer klaren und modularen Architekturstruktur mit definierten Verantwortlichkeiten für jede Schicht:

```
UI (Vue Komponenten) → Pinia Stores → TRPC Client → TRPC Router → Services → Composables → DB/API
```

Jede Schicht hat eine spezifische Verantwortung:

- **UI**: Präsentation und Benutzerinteraktion
- **Pinia Stores**: Zustandsverwaltung und UI-Logik
- **TRPC Router**: API-Endpunkte und Validierung
- **Services**: Datenoperationen und externe API-Aufrufe
- **Composables**: Wiederverwendbare Geschäftslogik
- **DB/API**: Datenbankzugriff und externe APIs

## Durchgeführte Überarbeitungen

### 1. User/Auth Service Konsolidierung ✅

#### Vorher:

- `auth.service.ts` - Auth-spezifische Funktionen
- `user.service.ts` - User-Management Funktionen
- `auth.router.ts` - Auth TRPC Router
- `account.store.ts` - Pinia Store für Account-Management

#### Nachher:

- `user.service.ts` - Konsolidierter Service für alle User- und Auth-Funktionen
- `user.router.ts` - Einheitlicher TRPC Router für User-Management
- `user.store.ts` - Umbenennung von account.store.ts für Konsistenz

### 2. Composables Integration ✅

#### Vorher:

- Geschäftslogik war in Services vermischt mit DB/API-Aufrufen
- Redundante Implementierungen für ähnliche Funktionalitäten
- Keine klare Trennung zwischen Datenoperationen und Geschäftslogik

#### Nachher:

- Alle komplexe Geschäftslogik in wiederverwendbare Composables extrahiert
- Services konzentrieren sich auf Datenbankoperationen und API-Aufrufe
- Klar definierte Schnittstellen zwischen Services und Composables

### 3. Konsolidierung redundanter Composables ✅

#### Vorher:

- `useSteamAPI.ts` und `useSteamImport.ts` - Doppelte Steam-API-Funktionalität
- `useGameEnrichment.ts` und `useIGDBEnrichment.ts` - Überlappende IGDB-Funktionalität
- `DealAggregatorService` als separater Service

#### Nachher:

- `useSteamImport.ts` - Vereint alle Steam-API und Import-Funktionalität
- `useGameEnrichment.ts` - Vereint alle IGDB und Anreicherungs-Funktionalität
- `DealsService` mit integrierter Deal-Aggregations-Funktionalität

### 4. Hauptkomponenten der aktuellen Architektur

#### Services:

- `user.service.ts` - User-Management, Authentifizierung, Statistiken
- `games.service.ts` - Spiele-Bibliothek, delegiert an `IGDBService` und nutzt Composables
- `igdb.service.ts` - IGDB API Integration, nutzt `useGameEnrichment`
- `deals.service.ts` - Deal-Management, Deal-Aggregation, nutzt `useDealAggregation`
- `util.service.ts` - Utility-Funktionen

#### TRPC Router:

- `user.router.ts` - User-Endpunkte (Auth, Profil, Credits, XP)
- `games.router.ts` - Spiele-Endpunkte
- `deals.router.ts` - Deal-Endpunkte

#### Pinia Stores:

- `user.store.ts` - User-State-Management
- `games.store.ts` - Spiele-State-Management
- `deals.store.ts` - Deal-State-Management
- `loading.store.ts` - Loading-States
- `notify.store.ts` - Benachrichtigungen

#### Composables:

- `useGameEnrichment.ts` - Spieledaten-Anreicherung mit IGDB
- `useSteamImport.ts` - Steam-Bibliotheksimport und API-Interaktion
- `useDealAggregation.ts` - Angebots-Aggregation und -Verarbeitung
- `useGameUtils.ts` - Hilfsfunktionen für Spieledaten
- `useUserStats.ts` - Benutzerbibliotheksstatistiken
- `useViewMode.ts` - UI-Ansichtsmodi
- `useServerProgress.ts` - Server-seitige Operationsfortschritte

### 5. Gelöschte/Obsolete Dateien ✅

- `auth.service.ts` - In user.service.ts konsolidiert
- `auth.router.ts` - Durch user.router.ts ersetzt
- `types.service.ts` - Nicht mehr benötigt, Typen in user.service.ts
- `account.store.ts` - Umbenannt zu user.store.ts
- `deal-aggregator.service.ts` - In deals.service.ts konsolidiert
- `useSteamAPI.ts` - In useSteamImport.ts konsolidiert
- `useIGDBEnrichment.ts` - In useGameEnrichment.ts konsolidiert

### 6. Vorteile der überarbeiteten Architektur

#### Verbesserte Trennung der Verantwortlichkeiten:

- **Composables**: Enthalten reine Geschäftslogik ohne DB/API-Aufrufe
- **Services**: Konzentrieren sich auf Datenbankoperationen und API-Aufrufe
- **Router**: Implementieren Input-Validierung und Zugriffskontrollen
- **Stores**: Handhaben nur UI-Zustand und TRPC-Aufrufe

#### Verbesserte Wartbarkeit:

- Wiederverwendbare Geschäftslogik in Composables
- Klare, einheitliche Struktur für alle Komponenten
- Reduzierte Codeduplizierung

#### Verbesserte Testbarkeit:

- Geschäftslogik in Composables ist unabhängig testbar
- Services können mit Mock-Composables getestet werden
- Klare Grenzen zwischen den Schichten erleichtern Unit-Tests

#### Type Safety:

- Vollständige TypeScript-Typen durch alle Schichten
- Konsistente Interface-Definitionen
- Compile-Zeit Validierung

### 7. Datenfluss-Beispiele

#### Beispiel: Steam-Spieleimport

1. UI-Komponente ruft Store-Methode auf
2. Store ruft TRPC-Client auf
3. TRPC-Router validiert Anfrage und ruft GamesService.importSteamGames auf
4. GamesService verwendet useSteamImport.extractSteamId zur Validierung
5. GamesService verwendet useSteamImport.fetchSteamLibrary für API-Aufruf
6. GamesService speichert Spiele in der Datenbank
7. GamesService ruft IGDBService für Metadaten auf
8. IGDBService verwendet useGameEnrichment für Anreicherungslogik

#### Beispiel: Deal-Aggregation

1. UI-Komponente ruft Store-Methode auf
2. Store ruft TRPC-Client auf
3. TRPC-Router validiert Anfrage und ruft DealsService.aggregateDeals auf
4. DealsService verwendet useDealAggregation.fetchExternalDeals
5. DealsService speichert aggregierte Deals in der Datenbank
6. DealsService gibt gefilterte Deals zurück

## Validierung

Die Anwendung folgt jetzt strikt der gewünschten Architektur:

- ✅ UI interagiert nur mit Stores
- ✅ Stores machen nur TRPC-Aufrufe
- ✅ TRPC Router delegieren an Services
- ✅ Services handhaben Datenbankzugriffe und nutzen Composables für Geschäftslogik
- ✅ Composables enthalten keine direkten DB/API-Aufrufe
- ✅ Keine direkten Prisma-Aufrufe in Stores/Routern
- ✅ Einheitliche Benennungskonventionen und Strukturen

## Nächste Schritte (Optional)

1. **Testing**: Unit-Tests für Services und Composables hinzufügen
2. **Caching**: Redis/Memory-Caching für Services implementieren
3. **Validation**: Zod-Schemas in Services für Input-Validierung
4. **Error Handling**: Einheitliche Error-Handling-Strategie
5. **Documentation**: OpenAPI/Swagger für TRPC-Endpunkte
6. **Performance Monitoring**: Telemetrie für kritische Pfade
