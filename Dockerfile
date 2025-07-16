# --- Build Stage ---
# Hier wird die Nuxt-Anwendung gebaut
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Production Stage ---
# Hier wird eine schlanke Node.js-Umgebung für den Betrieb vorbereitet
FROM node:20-alpine
WORKDIR /app

# Kopiere nur die notwendigen Dateien aus der Build-Stage
COPY --from=builder /app/.output ./.output

# Setze Umgebungsvariablen für den Produktivbetrieb
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

# Starte die Anwendung
CMD [ "node", ".output/server/index.mjs" ]