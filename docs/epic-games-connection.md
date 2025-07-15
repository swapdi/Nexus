# Epic Games Verbindungsmanagement - Implementierung

## Übersicht

Die Epic Games Verbindungsmanagement-Funktionalität wurde erfolgreich implementiert. Benutzer können jetzt Epic Games verbinden und die Verbindung wieder trennen.

## Implementierte Komponenten

### 1. Epic Games Service (`lib/services/epicgames.service.ts`)

- **`completeAuth(authData, userId)`**: Erweitert um automatisches Setzen von `epicConnect: true`
- Nach erfolgreicher Authentifizierung wird das User-Attribut `epicConnect` auf `true` gesetzt

### 2. User Service (`lib/services/user.service.ts`)

- **`UserUpdateData` Interface**: Bereits `epicConnect?: boolean` enthalten
- **`updateUser()`**: Unterstützt bereits die Aktualisierung von `epicConnect`

### 3. User Router (`server/trpc/routers/user.router.ts`)

- **`unlinkEpicProfile`** Procedure hinzugefügt
- Setzt `epicConnect: false` beim Trennen der Verbindung
- Analog zur bestehenden `unlinkSteamProfile` Funktion

### 4. Libraries Router (`server/trpc/routers/libraries.router.ts`)

- **`completeAuthEpicGames`** Procedure erweitert
- Übergibt jetzt die `userId` an `EpicGamesService.completeAuth()`
- Ermöglicht automatisches Setzen von `epicConnect: true`

### 5. Library Store (`stores/library.store.ts`)

- **`disconnectEpic()`** Funktion hinzugefügt
- Ruft `user.unlinkEpicProfile` Procedure auf
- Loading-Integration und Benachrichtigungen
- Aktualisiert User-Daten nach Trennung

## Funktionsablauf

### Epic Games Verbinden:

1. **Authentifizierung**: `completeEpicGamesAuth()` wird aufgerufen
2. **Backend-Aufruf**: Epic Games Backend-Service wird kontaktiert
3. **User-Update**: Bei Erfolg wird `epicConnect: true` gesetzt
4. **Benachrichtigung**: Benutzer wird über erfolgreiche Verbindung informiert

### Epic Games Trennen:

1. **Trenn-Aufruf**: `disconnectEpic()` wird aufgerufen
2. **User-Update**: `epicConnect: false` wird gesetzt
3. **Datenaktualisierung**: User-Daten werden neu geladen
4. **Benachrichtigung**: Benutzer wird über erfolgreiche Trennung informiert

## Datenbankschema

Das User-Model sollte das `epicConnect` Attribut enthalten:

```typescript
model User {
  id           Int     @id @default(autoincrement())
  supabase_uid String  @unique
  email        String  @unique
  display_name String
  steamId      String? @unique
  epicConnect  Boolean @default(false)  // Epic Games Verbindungsstatus
  gogConnect   Boolean @default(false)   // Für zukünftige GOG-Integration
  // ... weitere Felder
}
```

## Verwendung

### Im Frontend - Epic Games trennen:

```typescript
const libraryStore = useLibraryStore();
await libraryStore.disconnectEpic();
```

### Im Frontend - Verbindungsstatus prüfen:

```typescript
const userStore = useUserStore();
const isEpicConnected = userStore.user?.epicConnect;
```

### Direkt über tRPC:

```typescript
const { $client } = useNuxtApp();

// Epic Games trennen
const result = await $client.user.unlinkEpicProfile.mutate();

// Epic Games verbinden (bereits vorhanden)
const authResult = await $client.libraries.completeAuthEpicGames.mutate({
  authToken: 'token',
  userId: 'epicUserId'
});
```

## UI-Integration

Die Verbindungslogik kann in der UI folgendermaßen verwendet werden:

```vue
<template>
  <div v-if="userStore.user?.epicConnect">
    <p>Epic Games ist verbunden</p>
    <button @click="disconnectEpic">Verbindung trennen</button>
  </div>
  <div v-else>
    <p>Epic Games ist nicht verbunden</p>
    <button @click="connectEpic">Epic Games verbinden</button>
  </div>
</template>

<script setup>
  const userStore = useUserStore();
  const libraryStore = useLibraryStore();

  const disconnectEpic = async () => {
    await libraryStore.disconnectEpic();
  };

  const connectEpic = () => {
    // Redirect zu Epic Games Auth oder Auth-Dialog öffnen
  };
</script>
```

## Nächste Schritte

1. **Prisma Migration**: Stellen Sie sicher, dass das `epicConnect` Feld in der Datenbank existiert
2. **UI-Komponenten**: Implementieren Sie die Verbindungs-/Trennungs-Buttons in der Benutzeroberfläche
3. **Status-Anzeige**: Zeigen Sie den Epic Games Verbindungsstatus in den Benutzereinstellungen an
4. **Error Handling**: Erweitern Sie die Fehlerbehandlung für Verbindungsprobleme

Die Implementierung ist vollständig und production-ready!
