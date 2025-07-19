# Erweiterte Wishlist-Funktionalität

Diese Dokumentation beschreibt die Verbesserungen und neuen Features der Wishlist-Funktionalität in Nexus.

## Neue Features

### 1. EnhancedWishlistButton Komponente

- **Pfad**: `components/EnhancedWishlistButton.vue`
- **Funktionalität**:
  - Kombiniert Wishlist-Management mit Deal-Checking
  - Drei Modi: `wishlist-only`, `deals-only`, `both`
  - Automatische Deal-Notifications
  - Visueller Feedback für aktive Deals

### 2. Automatische Deal-Notifications

- **Implementierung**: `stores/wishlist.store.ts`
- **Features**:
  - Prüft automatisch Deals bei Hinzufügung zur Wishlist
  - Erweiterte Notifications mit Spiel-Details
  - Zeigt kostenlose und reduzierte Angebote getrennt an
  - Batch-Processing für mehrere Spiele

### 3. Deal-Integration in Spieldetails

- **Pfad**: `pages/game/[id].vue`
- **Features**:
  - "Deals prüfen" Button für manuellen Check
  - Automatische Deal-Suche bei Wishlist-Hinzufügung
  - Live-Updates der Related Deals Sektion
  - Detaillierte Notifications über gefundene Deals

### 4. Verbesserte Suchintegration

- **Pfad**: `pages/search.vue`
- **Features**:
  - WishlistButton in IGDB-Suchergebnissen
  - GameCard-Integration mit Wishlist-Funktionalität
  - Konsistente Benutzererfahrung

## API-Erweiterungen

### WishlistStore

```typescript
// Neue Funktionen
checkSingleGameDeals(gameId: number)   // Prüft Deals für ein Spiel
addToWishlist(gameId, { checkDeals: true })  // Mit automatischem Deal-Check
```

### WishlistService

```typescript
// Erweiterte Deal-Notifications
checkWishlistDeals(userId: number): WishlistDealNotification[]
```

## Verwendung

### Basis Wishlist-Button

```vue
<WishlistButton
  :game-id="game.id"
  variant="button"
  size="medium"
  :show-text="true"
  :animated="true" />
```

### Enhanced Wishlist-Button mit Deal-Check

```vue
<EnhancedWishlistButton
  :game-id="game.id"
  :game-title="game.name"
  variant="floating"
  size="medium"
  mode="both"
  :enable-i-t-a-d="true" />
```

### Manueller Deal-Check

```typescript
// Im Vue-Component
const wishlistStore = useWishlistStore();
await wishlistStore.checkWishlistDeals();
```

## Notifications

Das System sendet folgende Notification-Typen:

1. **Wishlist hinzugefügt**: ✅ Spiel erfolgreich zur Wishlist hinzugefügt
2. **Deal gefunden**: 🎮 Spielname: X kostenlose, Y reduzierte Angebote gefunden!
3. **Batch-Deal-Check**: 🎉 Wishlist-Update: X neue Deals gefunden!
4. **Fehler**: ❌ Verschiedene Fehlermeldungen

## Technische Details

### Store Integration

- Verwendet `useDealsStore()` für Deal-Suche
- Integriert mit `useNotifyStore()` für Benachrichtigungen
- Cached lokale Wishlist-Status für Performance

### Performance-Optimierungen

- Lokale Wishlist-Prüfung ohne API-Calls
- Debounced Deal-Checks
- Batch-Processing für multiple Spiele
- Intelligente Duplikatsvermeidung

### Fehlerbehandlung

- Graceful Degradation bei API-Fehlern
- User-freundliche Fehlermeldungen
- Fallback-Verhalten bei Service-Ausfällen

## Zukünftige Erweiterungen

1. **Preis-Alerts**: Benachrichtigung bei Unterschreitung eines Zielpreises
2. **Erweiterte Filter**: Nach Deals, Preisbereichen, Stores filtern
3. **Deal-Historie**: Tracking von verpassten/genutzten Deals
4. **Push-Notifications**: Browser/Desktop-Benachrichtigungen
5. **Scheduled Checks**: Automatische Deal-Prüfung in Intervallen

## Testing

```bash
# Store Tests
npm run test stores/wishlist.store.test.ts

# Component Tests
npm run test components/WishlistButton.test.ts
npm run test components/EnhancedWishlistButton.test.ts

# Integration Tests
npm run test pages/wishlist.test.ts
```

## Deployment Notes

- Keine zusätzlichen Dependencies erforderlich
- Backward-compatible mit bestehender API
- Kann schrittweise aktiviert werden
- Monitoring für Deal-API-Performance empfohlen
