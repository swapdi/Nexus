# --- Build Stage ---
# Hier wird die Nuxt-Anwendung gebaut
FROM node:20-alpine AS builder
WORKDIR /app

# Installiere OpenSSL für Prisma
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

# Kopiere Prisma Schema und generiere Client
COPY prisma ./prisma
RUN npx prisma generate

# Kopiere Rest der Anwendung und baue
COPY . .
RUN npm run build

# --- Production Stage ---
# Hier wird eine schlanke Node.js-Umgebung für den Betrieb vorbereitet
FROM node:20-alpine
WORKDIR /app

# Installiere OpenSSL für Prisma Runtime
RUN apk add --no-cache openssl

# Kopiere nur die notwendigen Dateien aus der Build-Stage
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Setze Umgebungsvariablen für den Produktivbetrieb
ENV HOST=0.0.0.0
ENV PORT=3333
ENV NODE_ENV=production

EXPOSE 3333

# Starte die Anwendung
CMD [ "node", ".output/server/index.mjs" ]