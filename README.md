<img src="./assets/images/supanuxt_logo_200.png" alt="Nexus Logo" width="150"/>

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
      # Beispiel: postgresql://postgres:[DEIN_PASSWORT]@db.[DEINE_PROJEKT_ID].supabase.co:5432/postgres

      # Optional für Stripe (spätere Phasen)
      # STRIPE_SECRET_KEY="DEIN_STRIPE_SECRET_KEY"
      # STRIPE_ENDPOINT_SECRET="DEIN_STRIPE_WEBHOOK_SECRET"
      ```

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
