# Nexus Portfolio Demo 🎮

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://nexus.deine-domain.de)
[![Branch](https://img.shields.io/badge/Branch-portfolio--demo-blue)](https://github.com/swapdi/Nexus/tree/portfolio-demo)

> **Portfolio-Demo Version**: Diese Version von Nexus ist speziell für Portfolio-Präsentationen konfiguriert. Sie verwendet einen fest hinterlegten Demo-Account mit einer vorausgefüllten Steam-Bibliothek, um die Funktionalitäten der Anwendung zu demonstrieren.

## 🌟 Was ist Nexus?

Nexus ist eine **plattformübergreifende Spieleverwaltung**, die deine Gaming-Bibliotheken von Steam, Epic Games, GOG und weiteren Plattformen an einem zentralen Ort vereint. Die Anwendung bietet:

- 📚 **Zentrale Bibliotheksverwaltung** - Alle Spiele an einem Ort
- 💰 **Deal-Aggregation** - Verpasse nie wieder Top-Angebote
- 🎯 **Gamification** - Level-System, Achievements, In-App Credits
- 📊 **Statistiken & Insights** - Detaillierte Übersicht deiner Gaming-Aktivitäten
- 🔔 **Benachrichtigungen** - Automatische Alerts für Wunschlisten-Deals

## 🎭 Demo-Modus

Diese Portfolio-Demo nutzt einen vorkonfigurierten Demo-Account:
- **Steam ID**: 76561198275522280
- **Funktionen**: Vollständige Demonstration aller Features
- **Authentifizierung**: Automatischer Login ohne Registrierung

## 🚀 Deployment (Docker)

### Voraussetzungen

- Docker & Docker Compose installiert
- Zugriff auf eine Supabase-Datenbank
- API-Keys für Steam, IGDB, ITAD (siehe unten)

### Quick Start

1. **Repository klonen**
   \`\`\`bash
   git clone https://github.com/swapdi/Nexus.git
   cd Nexus
   git checkout portfolio-demo
   \`\`\`

2. **Environment-Variablen konfigurieren**
   \`\`\`bash
   cp .env.production.example .env.production
   # Bearbeite .env.production mit deinen API-Keys
   \`\`\`

3. **Demo-User in Datenbank anlegen**
   \`\`\`bash
   # Mit psql oder Supabase Dashboard:
   psql -h db.rzihqajfdtxqhgipkgpr.supabase.co -U postgres -d postgres -f prisma/demo-user-setup.sql
   \`\`\`

4. **Docker Container starten**
   \`\`\`bash
   docker-compose up -d
   \`\`\`

5. **Anwendung aufrufen**
   ```
   http://localhost:3001
   ```
   
   > **Hinweis**: Der Container läuft auf Port 3001 (Host) → 3000 (Container), da Port 3000 möglicherweise bereits von anderen Services belegt ist.

### Production Deployment (mit Reverse Proxy)

Wenn du Nexus hinter einem Reverse Proxy wie Nginx oder Traefik betreibst:

#### Nginx Beispiel
\`\`\`nginx
server {
    listen 443 ssl http2;
    server_name nexus.deine-domain.de;

    ssl_certificate /pfad/zu/cert.pem;
    ssl_certificate_key /pfad/zu/key.pem;

    location / {
        proxy_pass http://localhost:3001;  # Angepasst auf Port 3001
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
\`\`\`

#### Traefik Beispiel (docker-compose.yml)
\`\`\`yaml
services:
  nexus-app:
    # ... existing config
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.nexus.rule=Host(\`nexus.deine-domain.de\`)"
      - "traefik.http.routers.nexus.entrypoints=websecure"
      - "traefik.http.routers.nexus.tls.certresolver=myresolver"
      - "traefik.http.services.nexus.loadbalancer.server.port=3000"
\`\`\`

## 🔑 Benötigte API-Keys

### Steam Web API
- **Beschaffung**: https://steamcommunity.com/dev/apikey
- **Verwendung**: Import von Steam-Bibliotheken
- **Kosten**: Kostenlos

### IGDB API (Twitch Developer)
- **Beschaffung**: https://dev.twitch.tv/console/apps
- **Verwendung**: Spiele-Metadaten (Cover, Screenshots, Ratings)
- **Kosten**: Kostenlos

### ITAD API (IsThereAnyDeal)
- **Beschaffung**: https://itad.docs.apiary.io/
- **Verwendung**: Deal-Tracking und Preis-Historie
- **Kosten**: Kostenlos mit Rate-Limiting

### Resend (Email)
- **Beschaffung**: https://resend.com/
- **Verwendung**: Transaktionale E-Mails (Benachrichtigungen)
- **Kosten**: 100 E-Mails/Tag kostenlos

### Supabase
- **Beschaffung**: https://supabase.com/
- **Verwendung**: Datenbank, Authentifizierung, Storage
- **Kosten**: Free Tier verfügbar

## 🛠️ Technologie-Stack

- **Frontend**: Vue.js 3, Nuxt 3, Tailwind CSS
- **Backend**: Nuxt Server API, tRPC
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Auth**: Supabase Auth
- **Deployment**: Docker, Docker Compose

## 📂 Projekt-Struktur

\`\`\`
Nexus/
├── components/        # Vue-Komponenten
├── composables/       # Nuxt Composables
├── layouts/          # Layout-Templates
├── lib/              # Services & Business Logic
├── pages/            # Seiten-Routen
├── prisma/           # Datenbankschema & Migrations
├── server/           # Server-API (tRPC)
├── stores/           # Pinia State Management
├── Dockerfile        # Docker Build-Datei
├── docker-compose.yml # Docker Compose Config
└── .env.production.example
\`\`\`

## 🔧 Entwicklung

Falls du lokal entwickeln möchtest:

\`\`\`bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Prisma Client generieren
npx prisma generate

# Database Migrations anwenden
npx prisma migrate dev
\`\`\`

## 📝 Unterschiede zur Main-Version

Diese `portfolio-demo` Branch unterscheidet sich vom `main` Branch:

1. **Auth-Flow**: Automatischer Login mit Demo-User (ID 999)
2. **Registrierung**: Deaktiviert (Redirect zur Signin)
3. **Landing Page**: Portfolio-Badge und Demo-Hinweis
4. **User Store**: Erweitert um `loadDemoUser()` Funktion
5. **TRPC**: Neuer `getDemoUser` Endpoint

## 🤝 Kontakt & Weitere Projekte

- **Portfolio**: [https://swapdi.de](https://swapdi.de)
- **GitHub**: [@swapdi](https://github.com/swapdi)
- **LinkedIn**: [Dein Profil](https://linkedin.com/in/dein-profil)

## 📜 Lizenz

Dieses Projekt wurde als Portfolio-Projekt im Rahmen eines Universitätskurses entwickelt.

---

**Hinweis**: Diese Demo-Version dient ausschließlich Präsentationszwecken. Für eine produktive Nutzung sollte die Main-Version mit vollständiger Authentifizierung verwendet werden.
