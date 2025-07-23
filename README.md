<div align="center">
  <img src="./public/favicon.ico" alt="Nexus Logo" width="150"/>
  
  # Nexus
  
  **Die zentrale Gaming-Plattform für PC-Spieler**
  
  Eine innovative Full-Stack-Anwendung zur Verwaltung digitaler Spielebibliotheken, Deal-Aggregation und Gamification mit modernem Tech-Stack.
  
  [![Version](https://img.shields.io/badge/version-1.4.3-blue.svg)]()
  [![License](https://img.shields.io/badge/license-MIT-green.svg)]()
  [![Tech Stack](https://img.shields.io/badge/stack-Nuxt3%20%7C%20Vue.js%20%7C%20TypeScript%20%7C%20Supabase-purple.svg)]()
</div>

---

## 🚀 Vision & Kernfunktionen

**Nexus** revolutioniert die Verwaltung und das Erlebnis digitaler Spiele für PC-Gamer durch:

### 🎮 **Bibliotheks-Zentralisierung**

- **Multi-Platform Import**: Steam, Epic Games, GOG Bibliotheken
- **Einheitliche Übersicht**: Alle Spiele an einem Ort
- **Duplikat-Schutz**: Intelligente Erkennung bereits vorhandener Spiele
- **Automatische Metadaten**: Anreicherung mit IGDB-Daten (Cover, Beschreibungen, Genres)

### 💰 **Deal-Aggregation & Preisvergleich**

- **Live Deal-Tracking**: CheapShark & IsThereAnyDeal (ITAD) Integration
- **Intelligente Preishistorie**: Tracking von Preisentwicklungen
- **Wishlist-Benachrichtigungen**: Automatische Alerts bei Preisreduktionen
- **Multi-Store Vergleich**: Beste Angebote verschiedener Plattformen

### 🏆 **Gamification-System**

- **Credit-System**: Verdiene In-App-Währung durch Aktivitäten
- **Achievement-System**: Belohnungen für Bibliotheks-Aktivitäten
- **User Level & XP**: Progression durch Platform-Nutzung
- **Community-Features**: Statistiken und Vergleiche

### 🔐 **Benutzer-Management**

- **Sichere Authentifizierung**: Supabase Auth Integration
- **Profilverwaltung**: Personalisierte Gaming-Profile
- **Platform-Verknüpfung**: Steam ID & Epic Games Verbindung
- **Datenschutz**: DSGVO-konforme Datenverwaltung

---

## 🛠️ Tech-Stack & Architektur

### **Frontend**

- **Framework**: Nuxt 3 (Vue.js 3) mit Server-Side Rendering
- **Styling**: Tailwind CSS mit dunklem Gaming-Design
- **State Management**: Pinia für reaktive Zustandsverwaltung
- **Type Safety**: Vollständig typisiert mit TypeScript

### **Backend & APIs**

- **Backend-as-a-Service**: Supabase (PostgreSQL + Auth + Storage)
- **ORM**: Prisma für typsichere Datenbankoperationen
- **API Layer**: tRPC für End-to-End Type Safety
- **External APIs**:
  - Steam Web API (Bibliotheks-Import)
  - IGDB API (Metadaten & Cover)
  - CheapShark API (Deal-Aggregation)
  - IsThereAnyDeal API (Preisvergleich)

### **Development & DevOps**

- **Testing**: Vitest für Unit & Integration Tests
- **Code Quality**: TypeScript strict mode + ESLint
- **Build**: Nuxt 3 optimierte Production-Builds
- **Deployment**: Docker-ready mit Multi-Stage Builds

---

## 📱 Features & Seiten

### **🏠 Dashboard**

- Übersicht über Gaming-Statistiken & Credits
- Kürzlich gespielte Titel
- Aktuelle Top-Deals mit Rabatt-Highlights
- Gaming-Tipps & Neuigkeiten

### **🎯 Meine Spiele**

- Vollständige Bibliotheksübersicht aller Plattformen
- **Filter & Sortierung**: Nach Platform, Genre, Spielzeit
- **View-Modi**: Grid (Klein/Mittel/Groß), Liste, Kompakt
- **Import-Management**: Steam/Epic Games Bibliotheks-Sync
- **Spielstatistiken**: Spielzeit, letzter Start, Favoriten

### **🔥 Deals & Angebote**

- **Live Deal-Feed**: Aktuelle Rabatte von allen Stores
- **Erweiterte Filter**: Preis, Store, Rating, Gratis-Spiele
- **Deal-Details**: Preishistorie, Store-Links, Bewertungen
- **Background-Sync**: Automatische Updates ohne UI-Blockierung

### **💖 Wishlist**

- **Intelligente Überwachung**: Automatische Deal-Benachrichtigungen
- **Preis-Alerts**: Email/In-App bei Wunschpreis erreicht
- **Multi-Store Vergleich**: Beste Angebote für Wishlist-Titel
- **Quick-Actions**: Schnelles Hinzufügen/Entfernen

### **📧 Nachrichten**

- **Deal-Benachrichtigungen**: Neue Angebote für Wishlist-Spiele
- **System-Nachrichten**: Import-Status, Achievements
- **Filter & Archivierung**: Organisierte Inbox-Verwaltung

### **⚙️ Einstellungen**

- **Profilverwaltung**: Avatar, Display Name, Gaming-Präferenzen
- **Platform-Verknüpfung**: Steam ID, Epic Games Account
- **Benachrichtigungen**: Email & Push-Notification Settings
- **Datenschutz**: Account-Löschung, Datenexport

---

## 🚦 Installation & Setup

### **Voraussetzungen**

```bash
Node.js 18+
npm oder yarn
PostgreSQL Datenbank (lokal oder Supabase)
```

### **1. Repository klonen**

```bash
git clone https://github.com/yourusername/nexus.git
cd nexus
```

### **2. Dependencies installieren**

```bash
npm install
# oder
yarn install
```

### **3. Environment Setup**

Kopiere `.env.example` zu `.env` und konfiguriere:

```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/nexus"

# Supabase
SUPABASE_URL="your-supabase-url"
SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Steam API
STEAM_API_KEY="your-steam-api-key-here"

# IGDB API (für Metadaten) - Erfordert Twitch Developer Account
IGDB_CLIENT_ID="your-igdb-client-id"
IGDB_CLIENT_SECRET="your-igdb-client-secret"

# ITAD API (für Deal-Tracking und Webhooks)
ITAD_API_KEY="your-itad-api-key"

# Stripe (für Credit-Käufe)
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

# Session Secret
NUXT_SESSION_SECRET="your-session-secret-here"

# Epic Games API
EPIC_GAMES_API_KEY="your-epic-games-api-key"

# E-Mail-Versand (Resend)
RESEND_API_KEY="your-resend-api-key"
FROM_EMAIL="noreply@yourdomain.com"
SITE_URL="https://yourdomain.com"
```

### **4. Datenbank Setup**

```bash
# Prisma Migrationen ausführen
npx prisma migrate dev

# Seed-Daten laden (optional)
npx prisma db seed
```

### **5. Development Server starten**

```bash
npm run dev
# Zugänglich unter http://localhost:3000
```

---

## 🔗 API-Integrationen & Services

### **Steam Web API**

- **Bibliotheks-Import**: Automatischer Import der Steam-Bibliothek
- **Cover-Assets**: Hochauflösende Spiel-Cover von Steam CDN
- **Spielzeit-Tracking**: Import der Steam-Spielzeiten

### **IGDB (Internet Game Database)**

- **Metadaten-Anreicherung**: Automatische Spiel-Informationen
- **Cover & Screenshots**: Hochqualitative Gaming-Assets
- **Genre & Developer**: Strukturierte Spiel-Kategorisierung

### **CheapShark API**

- **Deal-Aggregation**: 30+ Gaming-Stores überwacht
- **Preishistorie**: Historische Preisentwicklung
- **Store-Vergleich**: Multi-Platform Preisvergleich

### **IsThereAnyDeal (ITAD)**

- **Erweiterte Deal-Suche**: Präzise Spiel-Matching
- **Voucher & Bundles**: Zusätzliche Rabatt-Optionen
- **Wishlist-Integration**: Proaktive Deal-Benachrichtigungen

---

## 🚀 Deployment

### **Docker Deployment**

```bash
# Docker Image erstellen
docker build -t nexus .

# Container starten
docker run -p 3000:3000 nexus
```

### **Production Considerations**

- **Environment Variables**: Sichere API-Keys in Production
- **Database**: Supabase oder managed PostgreSQL
- **CDN**: Nuxt Static Assets über CDN
- **Monitoring**: Error Tracking & Performance Monitoring

---

## 📄 Lizenz

Dieses Projekt steht unter der [MIT License](LICENSE).
