# Tasks.md

## Projekt-Tasks für Nexus

Dies ist die zentrale Task-Liste für das Projekt Nexus. Tasks werden hier definiert, verfolgt und bei Bedarf überarbeitet.

**Status-Legende:**

- [ ] Offen / To Do
- [x] Abgeschlossen / Done
- [-] Blockiert / Blocked
- [>] In Bearbeitung / In Progress

---

## Phase 1: Kernfunktionalität & UI (MVP)

**Ziel:** Funktionaler Prototyp zur Validierung der Bibliothekszentralisierung, Basis-Angebotsübersicht und des UI.

- **Datenbank-Setup & Schema:**
  - [ ] Definiere das initiale Supabase DB-Schema für Benutzer (Erweiterung der Auth-Tabelle), Spiele, Benutzer-Spiele (Verknüpfung), Basis-Deals.
  - [ ] Implementiere Prisma-Modelle basierend auf dem Supabase-Schema.
  - [ ] Richte die DB-Verbindung in Nuxt/Prisma ein.
- **Benutzerauthentifizierung:**
  - [ ] Richte Supabase Auth ein (E-Mail/Passwort).
  - [ ] Implementiere Registrierungs-Seite und -Logik.
  - [ ] Implementiere Login-Seite und -Logik.
  - [ ] Implementiere Logout-Funktion.
  - [ ] Richte E-Mail-Bestätigungs-Templates ein (via Supabase).
  - [ ] Implementiere "Passwort vergessen"-Funktion.
- **Basis UI & Navigation:**
  - [ ] Richte Nuxt 3 Projekt mit Tailwind CSS ein.
  - [ ] Erstelle Haupt-Layout (`MainLayout.vue`).
  - [ ] Erstelle Navigationskomponente (`NavBar.vue`).
  - [ ] Richte Basis-Routing ein (Landing, Bibliothek, Angebote).
  - [ ] Erstelle Platzhalter-Seiten (`LandingPage.vue`, `LibraryPage.vue`, `DealsPage.vue`).
  - [ ] Implementiere das dunkle UI-Design konsistent auf den Basis-Seiten.
- **Bibliotheksimport (Steam MVP):**
  - [ ] Implementiere Backend/Nuxt Server API-Route zum Aufruf der Steam Web API (`GetOwnedGames`).
  - [ ] Implementiere Frontend UI (Button, Eingabefeld für SteamID/Link - siehe frühere Diskussionen).
  - [ ] Sende die SteamID/Link vom Frontend an die Backend-Route.
  - [ ] Verarbeite die Steam API-Antwort im Backend.
  - [ ] Speichere die Steam-Spiele (mit Benutzerverknüpfung) in der Supabase DB.
- **Metadaten (IGDB MVP):**
  - [ ] Richte IGDB API-Zugang ein.
  - [ ] Implementiere Backend/Nuxt Server Logik zum Abruf von Spieldetails (Cover, Genres, Beschreibung) von IGDB basierend auf Steam-Spieltitel/AppID.
  - [ ] Speichere die IGDB-Daten zusammen mit den importierten Spielen in der DB.
  - [ ] Erweitere das DB-Schema entsprechend.
- **Bibliotheksanzeige:**
  - [ ] Implementiere Backend/Nuxt Server API-Route zum Abrufen der Spielebibliothek des angemeldeten Benutzers aus der DB.
  - [ ] Implementiere Frontend UI auf `LibraryPage.vue` zur Anzeige der Spieleliste (mit Cover, Titel, Plattform).
  - [ ] Füge Basis-Filter/Sortierung (z.B. nach Plattform) hinzu.
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
  - [ ] Erweitere DB-Schema für multiple Plattform-IDs pro Spiel.
- **Gamification Kern:**
  - [ ] Erweitere DB-Schema für User-XP, Level, Achievements, Credits.
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
  - [ ] Erweitere DB-Schema für Credit-Transaktionen und ausgegebene Keys/Guthaben.
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
