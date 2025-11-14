# --- Build Stage ---
# Hier wird die Nuxt-Anwendung gebaut
FROM node:20-alpine AS builder
WORKDIR /app

# Installiere OpenSSL für Prisma
RUN apk add --no-cache openssl

# Setze Prisma Binary Target für Linux
ENV PRISMA_CLI_BINARY_TARGETS=linux-musl-openssl-3.0.x

COPY package*.json ./
RUN npm install

# Kopiere Prisma Schema und generiere Client explizit für Linux
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
RUN apk add --no-cache openssl libgcc

# Kopiere Build Output
COPY --from=builder /app/.output ./.output

# Kopiere Prisma (wird als external behandelt und muss separat verfügbar sein)
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Setze Umgebungsvariablen für den Produktivbetrieb
ENV HOST=0.0.0.0
ENV PORT=3333
ENV NODE_ENV=production

EXPOSE 3333

# Starte die Anwendung
CMD [ "node", ".output/server/index.mjs" ]