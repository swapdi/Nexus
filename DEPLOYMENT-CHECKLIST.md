# 🚀 Nexus Portfolio Demo - Deployment Checkliste

Diese Checkliste hilft dir, die Portfolio-Demo auf deinem Homeserver zu deployen.

## ✅ Vorbereitung

### 1. Server-Anforderungen prüfen
- [ ] Docker installiert (Version 20.10+)
- [ ] Docker Compose installiert (Version 2.0+)
- [ ] Min. 2GB RAM verfügbar
- [ ] Min. 10GB Speicher verfügbar
- [ ] Port 3000 verfügbar (oder anderen Port in docker-compose.yml anpassen)

### 2. API-Keys beschaffen
- [ ] **Steam API Key**: https://steamcommunity.com/dev/apikey
- [ ] **IGDB Credentials**: https://dev.twitch.tv/console/apps (erstelle neue App)
- [ ] **ITAD API Key**: https://itad.docs.apiary.io/#introduction/getting-started
- [ ] **Resend API Key**: https://resend.com/ (optional für E-Mail)

### 3. Supabase-Datenbank vorbereiten
- [ ] Demo-User in Datenbank angelegt (via `prisma/demo-user-setup.sql`)
- [ ] Service Role Key aus Supabase Dashboard kopiert

## 📦 Deployment Steps

### Schritt 1: Repository klonen
\`\`\`bash
git clone https://github.com/swapdi/Nexus.git
cd Nexus
git checkout portfolio-demo
\`\`\`

### Schritt 2: Environment konfigurieren
\`\`\`bash
# Kopiere Template
cp .env.production.example .env.production

# Bearbeite mit deinen Werten
nano .env.production
\`\`\`

**Wichtige Variablen:**
- `DATABASE_URL`: Deine PostgreSQL Connection String
- `SUPABASE_URL`: Deine Supabase Project URL
- `SUPABASE_KEY`: Anon Key aus Supabase Dashboard
- `SUPABASE_SERVICE_ROLE_KEY`: Service Role Key
- `STEAM_API_KEY`: Dein Steam API Key
- `IGDB_CLIENT_ID` & `IGDB_CLIENT_SECRET`: Twitch App Credentials
- `ITAD_API_KEY`: IsThereAnyDeal API Key
- `NUXT_SESSION_SECRET`: Generiere mit `openssl rand -base64 32`
- `SITE_URL`: Deine öffentliche URL (z.B. https://nexus.deine-domain.de)

### Schritt 3: Demo-User anlegen
\`\`\`bash
# Option A: Via psql
psql -h db.rzihqajfdtxqhgipkgpr.supabase.co \\
     -U postgres \\
     -d postgres \\
     -f prisma/demo-user-setup.sql

# Option B: Via Supabase Dashboard
# Kopiere SQL aus prisma/demo-user-setup.sql und führe im SQL Editor aus
\`\`\`

### Schritt 4: Container bauen und starten
\`\`\`bash
# Build Image
docker-compose build

# Starte Container
docker-compose up -d

# Prüfe Logs
docker-compose logs -f nexus-app
\`\`\`

### Schritt 5: Health-Check
\`\`\`bash
# Prüfe ob Container läuft
docker ps | grep nexus

# Test URL
curl http://localhost:3000
\`\`\`

## 🌐 Reverse Proxy Setup (Optional)

### Nginx
\`\`\`nginx
# /etc/nginx/sites-available/nexus
server {
    listen 443 ssl http2;
    server_name nexus.deine-domain.de;

    ssl_certificate /etc/letsencrypt/live/nexus.deine-domain.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/nexus.deine-domain.de/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
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

\`\`\`bash
# Aktiviere Site
sudo ln -s /etc/nginx/sites-available/nexus /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
\`\`\`

### Traefik (Docker Labels)
Füge in `docker-compose.yml` unter `nexus-app` hinzu:
\`\`\`yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.nexus.rule=Host(\`nexus.deine-domain.de\`)"
  - "traefik.http.routers.nexus.entrypoints=websecure"
  - "traefik.http.routers.nexus.tls.certresolver=letsencrypt"
  - "traefik.http.services.nexus.loadbalancer.server.port=3000"
\`\`\`

## 🔍 Troubleshooting

### Container startet nicht
\`\`\`bash
# Prüfe Logs
docker-compose logs nexus-app

# Prüfe Environment
docker-compose config
\`\`\`

### Datenbank-Verbindung fehlgeschlagen
- [ ] DATABASE_URL korrekt?
- [ ] Firewall erlaubt Zugriff auf Supabase?
- [ ] Credentials richtig kopiert?

### Steam-Import funktioniert nicht
- [ ] STEAM_API_KEY gültig?
- [ ] Demo-User hat Steam ID hinterlegt?
- [ ] Steam Web API erreichbar?

### IGDB Metadaten laden nicht
- [ ] IGDB_CLIENT_ID korrekt?
- [ ] IGDB_CLIENT_SECRET korrekt?
- [ ] Twitch App Status "verified"?

## 📊 Monitoring

### Container-Status prüfen
\`\`\`bash
# Status
docker ps

# Resource Usage
docker stats nexus-portfolio-demo

# Health-Check
docker inspect --format='{{.State.Health.Status}}' nexus-portfolio-demo
\`\`\`

### Logs überwachen
\`\`\`bash
# Live Logs
docker-compose logs -f

# Letzte 100 Zeilen
docker-compose logs --tail=100
\`\`\`

## 🔄 Updates

### Update auf neuere Version
\`\`\`bash
# Pull latest changes
git pull origin portfolio-demo

# Rebuild Container
docker-compose down
docker-compose build --no-cache
docker-compose up -d
\`\`\`

## 🛑 Stoppen & Entfernen

### Container stoppen
\`\`\`bash
docker-compose stop
\`\`\`

### Container entfernen
\`\`\`bash
docker-compose down

# Mit Volumes
docker-compose down -v
\`\`\`

## 📝 Finale Checks

Nach erfolgreichem Deployment:

- [ ] Landing Page lädt unter `http://deine-domain.de`
- [ ] "Demo ausprobieren"-Button funktioniert
- [ ] Automatischer Login zur Demo-User
- [ ] Dashboard zeigt Steam-Bibliothek (76561198275522280)
- [ ] Deals-Seite lädt aktuelle Angebote
- [ ] Navigation funktioniert
- [ ] Keine Fehler in Browser-Console

## 🎉 Fertig!

Deine Nexus Portfolio-Demo ist jetzt online unter:
**https://nexus.deine-domain.de**

Teile den Link in deinem Portfolio, auf LinkedIn oder bei Bewerbungen!
