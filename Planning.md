# Planning.md

## Projekt: Nexus

**Vision:**
Eine zentrale, plattformübergreifende Anwendung, die PC-Spielebibliotheken vereint, Angebote intelligent darstellt, Gamification integriert und ein innovatives Kaufmodell ermöglicht. Ziel ist es, die Verwaltung und das Erlebnis digitaler Spiele für PC-Gamer zu revolutionieren.

**Kernfunktionen:**

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

**Technische Architektur:**

- **Frontend:** Vue.js (SPA), gerendert/strukturiert von Nuxt 3.
- **Full-Stack Framework:** Nuxt 3 (für Seiten-Routing, Server-Side Rendering/Logik, API-Routen).
- **Backend-as-a-Service:** Supabase (PostgreSQL-Datenbank, Authentifizierung, Storage).
- **Datenbank-Interaktion:** Prisma ORM (mit Supabase).
- **Styling:** Tailwind CSS.
- **API-Integrationen:**
  - Supabase Client (Auth, DB-Zugriff).
  - Externe APIs: Steam Web API, IGDB API, Anbieter-Schnittstellen (konzeptionell für Kaufmodell).
- **Payment Gateway:** Stripe (für Credit-Käufe).
- **(Zukünftige Option) Desktop:** Electron (Wrapper für die Web-App, für OS-Integration wie Spielstart).

**Monetarisierung (Konzeptionell):**

- **Freemium:** Kernfunktionen kostenlos.
- **Premium-Abonnement:** Erweiterte Features (detaillierte Statistiken, erweiterte Benachrichtigungen, Premium-Kosmetik, werbefrei).
- **Verkauf von In-App-Credits:** Direkter Kauf von Credits mit Echtgeld.
- **Affiliate Marketing:** Provisionen durch Weiterleitung zu Deals, teilweise als Credits an Nutzer.

**Zielgruppen:**

- PC-Gamer mit multiplen Spielebibliotheken.
- Gamer, die aktiv nach Deals und Freebies suchen.
- Nutzer, die ihre Spielesammlung organisieren und pflegen möchten.
- Nutzer, die Gamification in Anwendungssoftware schätzen.

**Validierung (MVP Fokus):**

Siehe `Tasks.md` Phase 1. Validierung der Kernfunktionen: Benutzerkonto, Import (1-2 Plattformen), zentrale Anzeige mit Metadaten, Basis-Angebotsübersicht, Navigation.

**Deployment-Ziel:**
Webanwendung (gehostet), zukünftig optional Desktop (Electron).

**Dokumentation:**
Diese `Planning.md`, `Tasks.md`, Code-Kommentare, API-Dokumentation (falls relevant).

## Projektfortschritt

- [x] Projektinitialisierung (Nuxt 3 + Supabase + Tailwind Boilerplate)
- [ ] Basis-Struktur (Layout, Navigation, Platzhalter-Seiten)
- [ ] ... (Weitere abgeschlossene Meilensteine)

**Nächste Schritte:**
Siehe `Tasks.md`.
