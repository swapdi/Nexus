# Tasks.md

## Projekt-Tasks für Nexus

Dies ist die zentrale Task-Liste für das Projekt Nexus. Tasks werden hier definiert, verfolgt und bei Bedarf überarbeitet.

**Status-Legende:**

- [ ] Offen / To Do
- [x] Abgeschlossen / Done
- [-] Blockiert / Blocked
- [>] In Bearbeitung / In Progress

---

## Entdeckt während der Arbeit - UI/UX Verbesserungen

- [x] 3D Münzrotations-Effekt für Nexus Credits Karte erstellt (30. Dezember 2024)
  - [x] Hover-only Aktivierung implementiert
  - [x] Konsistente 2-Sekunden Rotation ohne Pause
  - [x] Münze in die untere rechte Ecke der Karte repositioniert
  - [x] Münzgröße vergrößert für bessere Sichtbarkeit
- [x] User Credits Anzeige im App Header implementiert (31. Mai 2025)
- [x] Angepasste E-Mail-Templates für Supabase erstellt (1. Juni 2025)
  - [x] Gaming-orientiertes Design mit Nexus-Branding - [x] Alle 5 Template-Typen angepasst (Registrierung, Passwort-Reset, E-Mail-Änderung, Magic Link, Einladung)
  - [x] Responsive Design und Sicherheitshinweise integriert
  - [x] Dokumentation und Installationsanleitung erstellt
- [x] Games.service.ts überarbeitet und TypeScript-Fehler behoben (1. Juni 2025)
  - [x] Date | null vs Date | undefined Typen-Konflikte in processSteamGameImport behoben
  - [x] Saubere Struktur nach auth.service.ts Vorbild beibehalten
  - [x] Alle CRUD-Operationen in logische Sektionen organisiert
  - [x] Games.store.ts vollständig überarbeitet (1. Juni 2025)
    - [x] ImportResult Interface aus games.service.ts importiert
    - [x] Erweiterte Hilfsfunktionen hinzugefügt: getGamesByGenre, getTopRatedGames, getUnratedGames
    - [x] Verbesserte formatPlayTime Funktion mit "Nicht gespielt" für 0 Minuten
    - [x] Neue computed properties: getAvailableGenres, totalPlaytimeHours, averageRating
    - [x] Plattform-basierte Filterung: getGamesByPlatformName
    - [x] TypeScript-Fehler behoben und saubere Struktur etabliert
  - [x] Games.router.ts an überarbeiteten games.service.ts angepasst (1. Juni 2025)
    - [x] GamesService Namespace-Aufrufe statt Klasseninstanziierung
    - [x] Korrekte Parameter für findOrCreatePlatform Funktion
    - [x] Alle TypeScript-Fehler behoben
  - [x] Steam-Import Duplikatschutz überprüft und verbessert (1. Juni 2025)
    - [x] Duplicate-Prevention auf mehreren Ebenen bestätigt (DB Constraints + Code-Logik)
    - [x] LibraryImport.vue UI verbessert: Anzeige von "updated" Spielen
    - [x] Bessere Benachrichtigungen für verschiedene Import-Szenarien
    - [x] Test-Dokumentation für Steam-Import-Duplikatschutz erstellt
- [x] Spielanzeige-Verbesserungen in my-games.vue implementiert (2. Juni 2025)
  - [x] Fallback für Cover-Bilder auf gameplaceholder.jpg umgestellt
  - [x] Platform-Logos in der oberen linken Ecke der Spielkarten hinzugefügt
  - [x] iconUrl aus Platform-Modell für Platform-Logo-Anzeige genutzt
  - [x] Fallback für fehlende Platform-Logos (erster Buchstabe des Platform-Namens)
  - [x] Platform-Text-Badges in die untere linke Ecke verschoben für bessere Anordnung

---

## Phase 1: Kernfunktionalität & UI (MVP)

**Ziel:** Funktionaler Prototyp zur Validierung der Bibliothekszentralisierung, Basis-Angebotsübersicht und des UI.

- **Datenbank-Setup & Schema:**
  - [x] Definiere das initiale Supabase DB-Schema für Benutzer (Erweiterung der Auth-Tabelle), Spiele, Benutzer-Spiele (Verknüpfung), Basis-Deals. (14. Mai 2025)
  - [x] Implementiere Prisma-Modelle basierend auf dem Supabase-Schema. (14. Mai 2025)
  - [x] Richte die DB-Verbindung in Nuxt/Prisma ein.
- **Benutzerauthentifizierung:**
  - [x] Richte Supabase Auth ein (E-Mail/Passwort).
  - [x] Implementiere Registrierungs-Seite und -Logik.
  - [x] Implementiere Login-Seite und -Logik.
  - [x] Implementiere Logout-Funktion.
  - [x] Richte E-Mail-Bestätigungs-Templates ein (via Supabase). (1. Juni 2025)
  - [x] Implementiere "Passwort vergessen"-Funktion.
- **Basis UI & Navigation:**
  - [x] Richte Nuxt 3 Projekt mit Tailwind CSS ein.
  - [x] Erstelle Haupt-Layout (`default.vue`).
  - [x] Erstelle Navigationskomponente (`NavBar.vue`). (29. Mai 2025)
  - [x] Erstelle einklappbare Seitennavigation für angemeldete Benutzer (`AppSidebar.vue`). (29. Mai 2025)
  - [x] Implementiere Layout für authentifizierte Benutzer (`authenticated.vue`). (29. Mai 2025)
  - [x] Richte Basis-Routing ein (Landing, Bibliothek, Angebote).
  - [x] Erstelle Platzhalter-Seiten (`LandingPage.vue`, `LibraryPage.vue`, `DealsPage.vue`). (29. Mai 2025)
  - [x] Implementiere das dunkle UI-Design konsistent auf den Basis-Seiten. (29. Mai 2025)
- **Bibliotheksimport (Steam MVP):**
  - [x] Implementiere Backend/Nuxt Server API-Route zum Aufruf der Steam Web API (`GetOwnedGames`). (1. Juni 2025)
  - [x] Implementiere Frontend UI (Button, Eingabefeld für SteamID/Link - siehe frühere Diskussionen). (1. Juni 2025)
  - [x] Sende die SteamID/Link vom Frontend an die Backend-Route. (1. Juni 2025)
  - [x] Verarbeite die Steam API-Antwort im Backend. (1. Juni 2025)
  - [x] Speichere die Steam-Spiele (mit Benutzerverknüpfung) in der Supabase DB. (1. Juni 2025)
  - [x] Erstelle games.service.ts für Datenbankoperationen. (1. Juni 2025)
  - [x] Erweitere TRPC-Kontext um Prisma-Datenbankverbindung. (1. Juni 2025)
- **Metadaten (IGDB MVP):**
  - [ ] Richte IGDB API-Zugang ein.
  - [ ] Implementiere Backend/Nuxt Server Logik zum Abruf von Spieldetails (Cover, Genres, Beschreibung) von IGDB basierend auf Steam-Spieltitel/AppID.
  - [ ] Speichere die IGDB-Daten zusammen mit den importierten Spielen in der DB.
  - [x] Erweitere das DB-Schema entsprechend. (14. Mai 2025)
- **Bibliotheksanzeige:**
  - [x] Implementiere Backend/Nuxt Server API-Route zum Abrufen der Spielebibliothek des angemeldeten Benutzers aus der DB. (1. Juni 2025)
  - [x] Implementiere Frontend UI auf `my-games.vue` zur Anzeige der Spieleliste (mit Cover, Titel, Plattform). (1. Juni 2025)
  - [x] Füge Basis-Filter/Sortierung (z.B. nach Plattform) hinzu. (1. Juni 2025)
- **Angebotsübersicht (MVP):**
  - [ ] Implementiere Backend/Nuxt Server Logik oder nutze einen Feed, um eine Liste aktueller Deals/Freebies zu erhalten (Start mit wenigen Quellen oder Mock-Daten).
  - [ ] Speichere Basis-Deal-Daten in der DB.
  - [ ] Implementiere Frontend UI auf `DealsPage.vue` zur Anzeige der Dealsliste (Titel, Plattform, Rabatt, Preis).

---

## Phase 2: Erweiterte Plattformen & Gamification Basis

**Ziel:** Integration weiterer Plattformen, Einführung der Basis-Gamification und Währung.

- **Bibliotheksimport (weitere Plattformen):**
  - [ ] Implementiere Import für Epic Games Store (Recherche API/Methoden).
  - [ ] Implementiere Import für GOG (Recherche API/Methoden).
  - [x] Erweitere DB-Schema für multiple Plattform-IDs pro Spiel. (14. Mai 2025)
- **Gamification Kern:**
  - [x] Erweitere DB-Schema für User-XP, Level, Achievements, Credits. (14. Mai 2025)
  - [ ] Implementiere Basis-Logik für XP-Vergabe bei Kernaktionen (Import, Metadaten-Vervollständigung).
  - [ ] Implementiere Level-Berechnung basierend auf XP.
  - [ ] Implementiere Basis-Achievements (z.B. "10 Spiele importiert", "Steam importiert").
  - [ ] Zeige User-Level und XP im UI (z.B. in der NavBar oder einem Profilbereich).
  - [ ] Implementiere In-App-Währung (Credits) Saldo im UI.
- **Credits Verdienen (Basis):**
  - [ ] Implementiere Credit-Vergabe bei Level-Ups.
  - [ ] Implementiere Credit-Vergabe bei Achievement-Freischaltung.
- **Erweiterte Angebotsdaten:**
  - [ ] Integriere weitere Deal-Quellen (API/Feed).
  - [ ] Füge Preisvergleich für dasselbe Spiel auf verschiedenen Plattformen hinzu.
- **Wunschliste:**
  - [ ] Implementiere Wunschlisten-Funktionalität (Hinzufügen, Entfernen).
  - [ ] Implementiere Backend-Logik zur Überprüfung, ob gewünschte Spiele im Angebot sind.

---

## Phase 3: Währungssystem, Kaufmodell & Vertiefung

**Ziel:** Implementierung des komplexen Währungssystems, des fiktiven Kaufmodells und weiterer Features.

- **Credits Kaufen (MVP):**
  - [ ] Integriere Stripe Payment Gateway im Backend/Nuxt Server.
  - [ ] Implementiere UI und Backend-Logik zum Kauf von Credit-Paketen mit Echtgeld.
- **Credits Einlösen (Fiktives Kaufmodell):**
  - [x] Erweitere DB-Schema für Credit-Transaktionen und ausgegebene Keys/Guthaben. (14. Mai 2025)
  - [ ] Implementiere Backend-Logik für den Austausch von Credits gegen store-spezifisches Guthaben/Keys (Modellierung der Kommunikation mit angenommenen Anbieter-APIs).
  - [ ] Implementiere UI, um den Umtausch vorzunehmen (Auswahl Plattform/Betrag).
  - [ ] Implementiere UI zur Anzeige und Verwaltung der erhaltenen Keys/Guthaben-Codes.
- **Affiliate-Integration & Payback:**
  - [ ] Richte Affiliate-Konten bei Partnern ein (z.B. Steam, GOG, Key-Seller - falls möglich/relevant).
  - [ ] Integriere Affiliate-Links auf der Angebotsseite.
  - [ ] Implementiere Logik zur Verfolgung von Käufen über Affiliate-Links (oft serverseitig oder über Partner-Dashboards).
  - [ ] Implementiere Credit-Vergabe an Nutzer basierend auf Affiliate-Provisionen (Payback-System).
- **Erweiterte Gamification:**
  - [ ] Implementiere vielfältigere Achievement-Typen (Organisation, Deal-Verfolgung, etc.).
  - [ ] Implementiere Bestenlisten (z. B. Gesamt-XP, Bibliotheksgröße).
  - [ ] Implementiere Kosmetische Belohnungen, kaufbar mit Credits.
- **Detaillierte Bibliotheksdaten:**
  - [ ] Zeige detailliertere Spieldaten an (Release Date, Publisher, Developer, Bewertungen - von IGDB).
  - [ ] Füge Funktionen zur manuellen Bearbeitung/Hinzufügung von Spieldaten hinzu.
  - [ ] Implementiere Spielzeit-Tracking (Recherche Plattform-APIs, ggf. manuelle Eingabe).
- **Erweiterte Deal-Features:**
  - [ ] Implementiere Preisentwicklungsgrafiken.
  - [ ] Erweitere Benachrichtigungssystem (Wunschlisten-Preisalarm).

---

## Phase 4: Optimierung, Testing & (Optional) Desktop

**Ziel:** Anwendung stabilisieren, Performance optimieren und Desktop-Option prüfen.

- [ ] Umfassendes Testing (Unit, Integration, End-to-End).
- [ ] Performance-Optimierung von Backend und Frontend.
- [ ] Sicherheits-Review (insbesondere Auth, Payment, API-Keys).
- [ ] Fehlerprotokollierung und Monitoring einrichten.
- [ ] UI/UX Verfeinerungen basierend auf Tests/Feedback.
- [ ] Dokumentation abschließen (Code, System-Architektur).
- **(Optional) Electron Desktop Wrapper:**
  - [ ] Richte Electron-Integration für die Nuxt Web-App ein.
  - [ ] Implementiere IPC zwischen Renderer und Main Prozess.
  - [ ] Implementiere Logik zum Starten von Spielen/Launchern aus der Desktop-App (im Electron Main Prozess).
  - [ ] Passe UI/UX für Desktop an (z. B. Tray Icon, native Menüs - falls gewünscht).
