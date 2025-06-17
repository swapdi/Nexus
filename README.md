<img src="./public/favicon.ico" alt="Nexus Logo" width="150"/>

# Nexus

## Vision

Nexus ist eine zentrale, plattformübergreifende Anwendung, die PC-Spielebibliotheken vereint, Angebote intelligent darstellt, Gamification integriert und ein innovatives Kaufmodell ermöglicht. Ziel ist es, die Verwaltung und das Erlebnis digitaler Spiele für PC-Gamer zu revolutionieren.

## Kernfunktionen (Geplant)

- **Bibliotheks-Zentralisierung:** Import und Anzeige von Spielen von Hauptplattformen (Steam, Epic, GOG). Einheitliche Übersicht.
- **Automatisierte Metadaten:** Anreicherung der importierten Spiele mit umfassenden Infos (Cover, Beschreibung, Genre) von externen Datenbanken (IGDB).
- **Angebots-Aggregation:** Sammeln und Anzeigen aktueller Deals und kostenloser Spiele von verschiedenen Stores. Filtermöglichkeiten.
- **Gamification-System:** Leveling, Achievements, In-App-Währung (Credits) basierend auf Nutzeraktionen und Bibliotheksdaten.
- **Währungs- & Kaufmodell (Konzept für Uni-Projekt):**
  - Credits verdienen (Gamification, Affiliate-Payback).
  - Credits kaufen (In-App Purchase via Payment Gateway).
  - Credits einlösen für store-spezifisches Guthaben/Keys (basierend auf angenommenen Partnerverträgen).
- **Benutzerkonto-Management:** Registrierung, Login, Profilverwaltung (via Supabase Auth).
- **User Interface:** Modernes, dunkles Design mit Fokus auf Usability und Gaming-Ästhetik (Vue.js + Tailwind CSS).

## Technische Architektur

- **Frontend:** Vue.js (SPA), gerendert/strukturiert von Nuxt 3.
- **Full-Stack Framework:** Nuxt 3 (für Seiten-Routing, Server-Side Rendering/Logik, API-Routen).
- **Backend-as-a-Service:** Supabase (PostgreSQL-Datenbank, Authentifizierung, Storage).
- **Datenbank-Interaktion:** Prisma ORM (mit Supabase).
- **Styling:** Tailwind CSS.
- **API-Integrationen:**
  - Supabase Client (Auth, DB-Zugriff).
  - Externe APIs: Steam Web API, IGDB API, Anbieter-Schnittstellen (konzeptionell für Kaufmodell).
- **Payment Gateway (Konzeptionell):** Stripe (für Credit-Käufe).
- **(Zukünftige Option) Desktop:** Electron (Wrapper für die Web-App, für OS-Integration wie Spielstart).

## Aktueller Implementierungsstand

### ✅ Vollständig implementiert

- **Benutzerauthentifizierung:** Registrierung, Login, Logout über Supabase Auth
- **Steam-Bibliotheksimport:** Vollständige Integration der Steam Web API mit Echtzeit-Progress-Tracking
- **IGDB-Metadaten-Anreicherung:** Automatische Anreicherung mit Beschreibungen, Genres, Cover-Bildern
- **Spielebibliotheks-Anzeige:** Filterable und sortierbare Spieleübersicht mit verschiedenen Ansichtsmodi
- **View-Mode-System:** 4 verschiedene Ansichtsmodi (Große Kacheln, Mittlere Kacheln, Mini-Kacheln, Listenansicht) mit localStorage-Persistierung
- **Responsive UI:** Modernes, dunkles Design mit Tailwind CSS
- **Gamification-Grundlagen:** Credits-System und User-XP-Framework
- **Real-time Progress-Tracking:** Server-Sent Events für Live-Import-Updates

### 🚧 In Entwicklung

- **Epic Games Store Import:** API-Integration geplant
- **GOG-Import:** API-Integration geplant
- **Angebots-Aggregation:** Deal-Sammlungs-System
- **Erweiterte Gamification:** Achievement-System und Level-Berechnung

### 🔧 Technische Features

#### Progress-Tracking-System

Das Projekt implementiert ein fortschrittliches Progress-Tracking-System für lang andauernde Operationen wie Steam-Imports:

- **Server-Sent Events (SSE):** Echtzeit-Updates vom Backend zum Frontend
- **Fallback-Mechanismus:** Automatischer Fallback auf standard Progress-Anzeige bei SSE-Fehlern
- **Batch-Processing:** Optimierte Import-Performance mit 15er-Batches
- **Detaillierte Progress-Nachrichten:** Spezifische Fortschrittsmeldungen für jede Import-Phase

#### Hintergrund-Anreicherung-System

Neues System für verbesserte Benutzererfahrung beim Steam-Import:

- **Minimierbare Import-Dialoge:** Steam-Import-Dialog kann während der Verarbeitung minimiert werden
- **Header-Fortschrittsbalken:** Zentrale Anzeige von Hintergrund-Operationen im AppHeader
- **Sofortige Spielanzeige:** Importierte Spiele werden sofort ohne IGDB-Daten angezeigt
- **Asynchrone IGDB-Anreicherung:** IGDB-Metadaten werden im Hintergrund ergänzt, ohne den Benutzer zu blockieren
- **Hintergrund-Benachrichtigungen:** Elegant positionierte Benachrichtigungen für laufende Hintergrund-Prozesse

**Dateien:**

- `server/api/progress/[operationId].get.ts` - SSE-Endpunkt für Progress-Updates
- `components/LibraryImport.vue` - Frontend Progress-Integration mit Minimierungsfunktion
- `components/AppHeader.vue` - Header-Fortschrittsbalken für Hintergrund-Operationen
- `server/trpc/routers/games.router.ts` - Backend Progress-Implementation mit schnellem Import
- `stores/loading.store.ts` - Erweiterte Loading-States für Hintergrund-Operationen

### 🎮 Steam Import & Hintergrundanreicherung

Der Steam-Import wurde mit einem Hintergrundanreicherungssystem optimiert:

**Import-Workflow:**

1. **Schneller Initial-Import**: Steam-Spiele werden sofort mit Basis-Metadaten importiert
2. **Hintergrundanreicherung**: IGDB-Daten werden asynchron geladen und hinzugefügt
3. **Minimierbare UI**: Der Import-Dialog kann minimiert werden, während die Anreicherung läuft

**UI-Verhalten:**

- **Vordergrundoperationen**: Zeigen das Modal/LoadingOverlay und blockieren die UI
- **Hintergrundoperationen**: Nur Header-Progressbar und Notifications, UI bleibt nutzbar
- **Auto-Minimierung**: Import-Dialog minimiert sich automatisch bei reinen Hintergrundoperationen

**Technische Details:**

- Loading Store unterscheidet zwischen `hasForegroundOperations` und `hasBackgroundOperations`
- Separate Mutations für schnellen Import (`importSteamLibraryFast`) und Hintergrundanreicherung (`enrichGamesFromIGDB`)
- Progressbar im Header für laufende Hintergrundoperationen

## Projektstruktur (Überblick)

Das Projekt folgt einer typischen Nuxt 3 Struktur:

- `components/`: Wiederverwendbare Vue-Komponenten.
- `pages/`: Verzeichnisbasierte Routen und Ansichten.
- `server/`: API-Endpunkte und serverseitige Logik.
- `prisma/`: Datenbank-Schema (`schema.prisma`) und Prisma-Client.
- `stores/`: Pinia-Stores für das State Management.
- `layouts/`: Layout-Vorlagen für Seiten.
- `public/`: Öffentlich zugängliche statische Dateien (z.B. `favicon.ico`).
- `assets/`: Statische Projekt-Assets (z.B. CSS, Bilder die vom Build-Prozess verarbeitet werden).

## Setup für die Entwicklung

### Voraussetzungen

- Node.js (aktuelle LTS-Version wird empfohlen)
- pnpm (bevorzugter Paketmanager für dieses Projekt)
  - Alternativ npm oder yarn, wobei pnpm für konsistente Abhängigkeitsinstallationen sorgt.
- Ein Supabase-Konto und ein eingerichtetes Projekt.
- (Optional für spätere Phasen) Ein Stripe-Konto für die Payment-Integration.

### Installationsschritte

1.  **Repository klonen:**

    ```bash
    git clone <URL_DES_GIT_REPOSITORIES> Nexus
    cd Nexus
    ```

2.  **Abhängigkeiten installieren:**

    ```bash
    pnpm install
    ```

3.  **Umgebungsvariablen einrichten:**

    - Erstelle eine Datei namens `.env` im Stammverzeichnis des Projekts.
    - Kopiere den Inhalt der Datei `.env.example` (falls vorhanden, ansonsten manuell die benötigten Variablen eintragen) in die `.env` Datei.
    - Trage deine spezifischen Werte für die folgenden Variablen ein:

      ```env
      # Supabase
      SUPABASE_URL="DEINE_SUPABASE_PROJEKT_URL"
      SUPABASE_KEY="DEIN_SUPABASE_ANON_KEY" # Öffentlich, sicher für den Client-Side Gebrauch

      # Prisma (Verbindung zur Supabase Datenbank)
      DATABASE_URL="DEIN_POSTGRESQL_CONNECTION_STRING_VON_SUPABASE"
      # Beispiel: postgresql://postgres:[DEIN_PASSWORT]@db.[DEINE_PROJEKT_ID].supabase.co:5432/postgres      # Steam API
      STEAM_API_KEY="DEIN_STEAM_WEB_API_KEY"

      # IGDB API (für Spiel-Metadaten) - Erfordert Twitch Developer Account
      IGDB_CLIENT_ID="DEIN_IGDB_CLIENT_ID"
      IGDB_CLIENT_SECRET="DEIN_IGDB_CLIENT_SECRET"

      # Optional für Stripe (spätere Phasen)
      # STRIPE_SECRET_KEY="DEIN_STRIPE_SECRET_KEY"
      # STRIPE_ENDPOINT_SECRET="DEIN_STRIPE_WEBHOOK_SECRET"
      ```

    - **Steam API Key:** Erhalte einen API-Key von [steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey)
    - **IGDB API:** Siehe detaillierte Anleitung in [IGDB_SETUP.md](./IGDB_SETUP.md)
    - **Wichtig:** Den `DATABASE_URL` String findest du in deinem Supabase Projekt unter `Project Settings` > `Database` > `Connection string` (den URI-Typ verwenden). Stelle sicher, dass du `[YOUR-PASSWORD]` durch dein Datenbankpasswort ersetzt.

4.  **Datenbank-Schema synchronisieren:**
    Nachdem die `DATABASE_URL` in der `.env` Datei konfiguriert ist, synchronisiere dein lokales Prisma-Schema mit der Supabase-Datenbank:

    ```bash
    pnpm prisma db push
    ```

    Dieser Befehl erstellt die Tabellen und Strukturen gemäß `prisma/schema.prisma` in deiner Datenbank.

5.  **Prisma Client generieren:**
    Damit dein Code typsicheren Zugriff auf die Datenbank hat, generiere den Prisma Client:

    ```bash
    pnpm prisma generate
    ```

6.  **(Optional) Seed-Daten laden:**
    Wenn ein Seed-Skript (`prisma/seed.ts`) vorhanden ist, um die Datenbank mit initialen Daten zu füllen:
    ```bash
    pnpm prisma db seed
    ```

### Entwicklungs-Server starten

Führe folgenden Befehl aus, um den Nuxt 3 Entwicklungs-Server zu starten:

```bash
pnpm dev
```

Die Anwendung ist dann standardmäßig unter `http://localhost:3000` erreichbar.

## Wichtige Dokumente im Projekt

- **`PLANNING.md`**: Enthält detailliertere Informationen zur Vision, Zielgruppen, Monetarisierungskonzepten und dem geplanten Projektfortschritt.
- **`Tasks.md`**: Eine detaillierte Auflistung der Entwicklungsaufgaben, aufgeteilt in Phasen, mit ihrem jeweiligen Status.
- **`nuxt.config.ts`**: Die Hauptkonfigurationsdatei für das Nuxt 3 Framework, inklusive Module, Build-Einstellungen und Laufzeitkonfiguration.
- **`prisma/schema.prisma`**: Die maßgebliche Datei für die Definition des Datenbankschemas und der Modelle.

## Beitragende

Informationen zu Beitragenden können hier ergänzt werden.

## Lizenz

Dieses Projekt steht unter der [MIT Lizenz](LICENSE) (sofern nicht anders angegeben).
