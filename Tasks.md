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

---

## Phase 1: Kernfunktionalität & UI (MVP)

**Ziel:** Funktionaler Prototyp zur Validierung der Bibliothekszentralisierung, Basis-Angebotsübersicht und des UI.

- **Datenbank-Setup & Schema:**
  - [x] Definiere das initiale Supabase DB-Schema für Benutzer (Erweiterung der Auth-Tabelle), Spiele, Benutzer-Spiele (Verknüpfung), Basis-Deals. (14. Mai 2025)
  - [x] Implementiere Prisma-Modelle basierend auf dem Supabase-Schema. (14. Mai 2025)
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
  - [x] Erstelle Navigationskomponente (`NavBar.vue`). (29. Mai 2025)
  - [x] Erstelle einklappbare Seitennavigation für angemeldete Benutzer (`AppSidebar.vue`). (29. Mai 2025)
  - [x] Implementiere Layout für authentifizierte Benutzer (`authenticated.vue`). (29. Mai 2025)
  - [ ] Richte Basis-Routing ein (Landing, Bibliothek, Angebote).
  - [x] Erstelle Platzhalter-Seiten (`LandingPage.vue`, `LibraryPage.vue`, `DealsPage.vue`). (29. Mai 2025)
  - [x] Implementiere das dunkle UI-Design konsistent auf den Basis-Seiten. (29. Mai 2025)
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
  - [x] Erweitere das DB-Schema entsprechend. (14. Mai 2025)
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

---

## Entdeckt während der Arbeit

**29. Mai 2025 - Sidebar Navigation Implementation:**

- [x] Erstelle einklappbare Seitennavigation (`AppSidebar.vue`) mit folgenden Features:
  - Einklappbar auf nur Icons oder vollständige Labels
  - Tooltips für eingeklappten Zustand
  - Aktive Seiten-Markierung mit Purple-Theme
  - Benutzerinformationen im Footer (Avatar, Name, Level, XP)
  - Lokale Speicherung des Sidebar-Status in localStorage
- [x] Implementiere Sidebar-Toggle Komponente (`SidebarToggle.vue`):
  - Floating Toggle-Button mit Animation
  - Automatische Positionsanpassung je nach Sidebar-Status
- [x] Erstelle authenticated Layout (`layouts/authenticated.vue`):
  - Vollständige Integration der Sidebar
  - Responsive Content-Area mit automatischen Margins
  - Platzierung für Notifications
- [x] Implementiere Detailnavigation in Sidebar:

  - Sub-Navigation für aktive Hauptbereiche
  - Filteroptionen für Meine Spiele (Alle, Zuletzt gespielt, Favoriten)
  - Filteroptionen für Angebote (Alle, Kostenlos, Hohe Rabatte)
  - Filteroptionen für Wishlist (Alle, Im Angebot, Bald verfügbar)
  - Unterseiten für Einstellungen (Profil, Plattformen, Benachrichtigungen)

- [x] Erstelle vollständige Seiten mit modernem UI:
  - `pages/my-games.vue` - Spielebibliothek mit Filtern, Suche, Statistiken
  - `pages/deals.vue` - Angebots-Übersicht mit umfangreichen Filteroptionen
  - `pages/wishlist.vue` - Wishlist mit Preisverfolgung und Statistiken
- [x] Aktualisiere bestehende Seiten auf neues Layout:
  - `pages/dashboard.vue` - Layout von 'application' zu 'authenticated'
  - `pages/account.vue` - Layout von 'application' zu 'authenticated'

**Technische Details:**

- Verwendung von Heroicons für konsistente Icon-Darstellung
- Responsive Design mit Tailwind CSS
- Smooth Transitions und Hover-Effekte
- Consistent Purple/Blue Gradient Theme
- Mock-Daten für Entwicklung (später durch echte APIs zu ersetzen)

**31. Mai 2025 - AppHeader Verbesserung:**

- [x] AppHeader-Design überarbeiten: Logo links, Avatar-Menü rechts, cooler Dropdown-Style mit Navigation zu profile.vue und settings.vue (31. Mai 2025)

**31. Mai 2025 - AuthContext Middleware Behebung:**

- [x] Problem mit `authContext` Middleware behoben (31. Mai 2025):
  - Cookie-Parsing-Problematik identifiziert: Middleware suchte nach `'sb-access-token'` aber Supabase verwendet projektspezifische Cookie-Namen
  - Middleware auf korrekte `serverSupabaseUser()` Funktion umgestellt, die automatisch Supabase-Cookies parst
  - Erweiterte Logging-Funktionalität hinzugefügt mit Emojis für bessere Sichtbarkeit
  - Middleware-Ausführung für `/api/trpc` Pfade bestätigt und getestet
  - Error-Handling verbessert mit try-catch Block
  - Vollständig funktionsfähige Authentifizierung für TRPC-Routen implementiert

**31. Mai 2025 - NexusCredits Dashboard Überarbeitung:**

- [x] NexusCredits-Karte im Dashboard komplett überarbeitet (31. Mai 2025):
  - Elegantes Premium-Design mit Indigo/Purple Farbschema
  - Animierte Hintergrundeffekte und glühende Elemente
  - Verbessertes Credit-Icon mit rotierendem Border und Glow-Effekt
  - Dezente "Aufladen"-Verlinkung statt prominenter Kauf-Button
  - Professionelle Balance-Anzeige mit Gradient-Text
  - Wert-Anzeige in Euro hinzugefügt
  - Sicherheits-Badge integriert
  - Dekorative Akzent-Elemente für Gaming-Ästhetik
  - Tailwind-Animationen erweitert (spin-slow, pulse-slow)

**31. Mai 2025 - NexusCredits Silber-Design:**

- [x] NexusCredits-Karte auf stilvolles Silber-Design umgestellt (31. Mai 2025):
  - Elegante Slate/Gray Farbpalette statt Purple/Indigo
  - Reduzierte Höhe: p-4 statt p-6, kleinere Abstände
  - Kompakteres Design: Icon 16x16 statt 20x20, Text 2xl statt 3xl
  - Silber-Gradienten für Text und Effekte
  - Angepasste Hover-Effekte und Animationen
  - Modernerer, minimalistischerer Look

**31. Mai 2025 - Dashboard Hover-Effekte:**

- [x] Partikel-Elemente entfernt und Hover-Rahmen-Effekte hinzugefügt (31. Mai 2025):
  - Dekorative Partikel-Punkte (animate-ping, animate-pulse) aus NexusCredits-Karte entfernt
  - Hover-Rahmen-Effekte zu Total Games Karte hinzugefügt: hover:border-purple-400/50
  - Hover-Rahmen-Effekte zu Hours Played Karte hinzugefügt: hover:border-blue-400/50
  - Hover-Rahmen-Effekte zu Achievements Karte hinzugefügt: hover:border-green-400/50
  - Hover-Rahmen-Effekte zu Recently Played Games Karte hinzugefügt: hover:border-purple-400/50
  - Hover-Rahmen-Effekte zu Weekly Activity Chart Karte hinzugefügt: hover:border-blue-400/50
  - Hover-Rahmen-Effekte zu Recent Achievements Karte hinzugefügt: hover:border-yellow-400/50
  - Hover-Rahmen-Effekte zu Featured Deals Karte hinzugefügt: hover:border-red-400/50
  - Hover-Rahmen-Effekte zu Quick Actions Karte hinzugefügt: hover:border-yellow-400/50
  - Alle Hover-Effekte mit transition-all duration-500 für sanfte Animationen
  - Konsistente Farb-Themenzuordnung für verschiedene Kartentypen
