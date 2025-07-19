# Wishlist & Messages System - Implementation

## Überblick

Diese Implementierung fügt ein vollständiges Wishlist-System mit Nachrichten-basierten Deal-Benachrichtigungen hinzu:

### Neue Features

- **Wishlist-Management**: Spiele zur Wunschliste hinzufügen/entfernen
- **Deal-Benachrichtigungen**: Automatische Benachrichtigungen für Wishlist-Deals
- **Messages-System**: Server-Nachrichten für Deal-Alerts
- **Dashboard-Integration**: Messages Widget im Dashboard
- **Cron-Job Support**: Automatische Deal-Prüfung

## Neue Datenbankstrukturen

### Messages Tabelle

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  receiver_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  media TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE
);
```

### User Erweiterungen

- Neue Relationen zu `sent_messages` und `received_messages`

## Architektur

### Backend Services

- **`lib/services/messages.service.ts`**: CRUD-Operationen für Nachrichten
- **`lib/services/wishlist.service.ts`**: Wishlist-Management und Deal-Prüfung

### TRPC Router

- **`server/trpc/routers/messages.router.ts`**: API-Endpunkte für Nachrichten
- **`server/trpc/routers/wishlist.router.ts`**: API-Endpunkte für Wishlist

### Frontend Stores (Pinia)

- **`stores/messages.store.ts`**: Client-State für Nachrichten
- **`stores/wishlist.store.ts`**: Client-State für Wishlist

### Vue Components

- **`components/MessagesWidget.vue`**: Dashboard-Widget für Nachrichten
- **`components/WishlistButton.vue`**: Wiederverwendbarer Wishlist-Button
- **`pages/messages.vue`**: Vollständige Nachrichten-Seite
- **`pages/wishlist-new.vue`**: Neue Wishlist-Seite (Beispiel)

## API Endpunkte

### Messages

- `messages.getUserMessages` - Alle Nachrichten abrufen
- `messages.getUnreadMessages` - Ungelesene Nachrichten
- `messages.getUnreadMessageCount` - Anzahl ungelesener Nachrichten
- `messages.createMessage` - Neue Nachricht erstellen
- `messages.markAsRead` - Nachricht als gelesen markieren
- `messages.markAllAsRead` - Alle Nachrichten als gelesen markieren
- `messages.deleteMessage` - Nachricht löschen

### Wishlist

- `wishlist.getUserWishlist` - Benuzer-Wishlist abrufen
- `wishlist.addToWishlist` - Spiel hinzufügen
- `wishlist.removeFromWishlist` - Spiel entfernen
- `wishlist.isInWishlist` - Wishlist-Status prüfen
- `wishlist.getWishlistCount` - Anzahl Items
- `wishlist.checkWishlistDeals` - Deals prüfen und Nachrichten erstellen

## Deal-Benachrichtigung Flow

1. **Automatische Prüfung**: Cron-Job oder manuelle Auslösung
2. **Deal-Erkennung**: Suche nach aktuellen Deals für Wishlist-Items
3. **Filterung**: Nur relevante Deals (Rabatte > 0% oder Freebies)
4. **Nachricht-Erstellung**: Server-Nachricht an Benutzer
5. **Frontend-Anzeige**: Nachrichten im Dashboard und Messages-Seite

## Integration in bestehende Seiten

### Dashboard

```vue
<!-- In dashboard.vue hinzugefügt -->
<MessagesWidget :max-messages="5" />
```

### Dashboard onMounted Erweiterung

```typescript
wishlistStore.checkWishlistDeals(), messagesStore.refreshUnreadCount();
```

## Verwendung

### Wishlist Button Component

```vue
<WishlistButton :game-id="game.id" variant="button" show-text />
```

### Messages Widget

```vue
<MessagesWidget :max-messages="10" :show-all="false" />
```

## Cron Job Setup

### Skript ausführen

```bash
# Einmalig
tsx scripts/check-wishlist-deals.ts

# Als Cron Job (alle 2 Stunden)
0 */2 * * * cd /path/to/nexus && tsx scripts/check-wishlist-deals.ts
```

## Nächste Schritte

1. **Migration ausführen**: `npx prisma migrate dev`
2. **Dashboard testen**: Nachrichten-Widget im Dashboard prüfen
3. **Wishlist-Seite**: `wishlist-new.vue` → `wishlist.vue` ersetzen
4. **Cron-Job einrichten**: Produktionsumgebung konfigurieren
5. **Game Cards erweitern**: WishlistButton in Game-Komponenten integrieren

## Beispiel Nachrichten

### Deal-Alert (Freebie)

```
🎉 Großartige Neuigkeiten! "Cyberpunk 2077" ist jetzt kostenlos bei Epic Games verfügbar!
```

### Deal-Alert (Rabatt)

```
💰 Deal-Alert für "The Witcher 3"! Jetzt 75% günstiger bei Steam für 9,99€ (statt 39,99€)
```

### Mehrere Deals

```
💰 3 Deals für "Red Dead Redemption 2" gefunden! Bester Rabatt: 60%
```

## Technische Hinweise

- **Server-Nachrichten**: `senderId = null` kennzeichnet System-Nachrichten
- **Performance**: Wishlist-Status wird lokal gecacht für bessere UX
- **Error Handling**: Umfassende Fehlerbehandlung in allen Services
- **Loading States**: Loading-Integration über `useLoading` Store
- **Notifications**: User-Feedback über `useNotifyStore`
