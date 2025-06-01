# IGDB API Setup

## Überblick

Die IGDB (Internet Game Database) API wird verwendet, um importierte Spiele mit umfangreichen Metadaten anzureichern:

- Beschreibungen
- Cover-Bilder
- Screenshots
- Genres
- Entwickler/Publisher-Informationen
- Bewertungen
- Release-Daten

## API-Credentials einrichten

### 1. Twitch Developer Account erstellen

Die IGDB API verwendet die Twitch API für Authentifizierung. Sie benötigen einen Twitch Developer Account:

1. Besuchen Sie [dev.twitch.tv](https://dev.twitch.tv)
2. Melden Sie sich mit Ihrem Twitch-Account an
3. Navigieren Sie zur Konsole

### 2. Anwendung registrieren

1. Klicken Sie auf "Register Your Application"
2. Füllen Sie die erforderlichen Felder aus:
   - **Name**: Nexus (oder ein eindeutiger Name)
   - **OAuth Redirect URLs**: `http://localhost` (für Entwicklung)
   - **Category**: Game Integration
3. Klicken Sie auf "Create"

### 3. Client Credentials erhalten

Nach der Registrierung erhalten Sie:

- **Client ID**: Wird direkt angezeigt
- **Client Secret**: Klicken Sie auf "New Secret" um ein Secret zu generieren

### 4. Umgebungsvariablen setzen

Kopieren Sie `.env.example` zu `.env` und tragen Sie Ihre Credentials ein:

```env
# IGDB API (für Metadaten) - Erfordert Twitch Developer Account
IGDB_CLIENT_ID="ihr-client-id-hier"
IGDB_CLIENT_SECRET="ihr-client-secret-hier"
```

## Funktionsweise

### OAuth2 Flow

Die Integration verwendet den OAuth2 Client Credentials Flow:

1. **Token Anfrage**: Client ID und Secret werden an Twitch OAuth2 gesendet
2. **Access Token**: Temporärer Access Token wird erhalten (ca. 60 Tage gültig)
3. **API Calls**: Access Token wird für IGDB API-Anfragen verwendet
4. **Token Caching**: Token wird im Speicher gecacht und automatisch erneuert

### Spiel-Anreicherung

1. **Suche**: Steam-Spielnamen werden bei IGDB gesucht
2. **Matching**: Ähnlichkeitsalgorithmus findet beste Übereinstimmung
3. **Details**: Detaillierte Informationen werden abgerufen
4. **Anreicherung**: Spiel-Datensatz wird mit IGDB-Daten ergänzt

### Rate Limiting

- Eingebaute Verzögerung von 250ms zwischen Anfragen
- Automatische Fehlerbehandlung bei API-Limits
- Graceful Fallback bei fehlenden Daten

## API-Dokumentation

- [IGDB API Documentation](https://api-docs.igdb.com/)
- [Twitch API Documentation](https://dev.twitch.tv/docs/api/)

## Troubleshooting

### Häufige Probleme

1. **401 Unauthorized**:

   - Prüfen Sie Client ID und Secret
   - Stellen Sie sicher, dass die Anwendung aktiv ist

2. **Token Errors**:

   - Token werden automatisch erneuert
   - Bei persistenten Problemen Anwendung neu starten

3. **Keine Spiel-Matches**:
   - Ähnlichkeitsschwelle liegt bei 60%
   - Spielnamen werden automatisch bereinigt
   - Nicht alle Spiele sind in der IGDB verfügbar

### Logs

Aktivieren Sie Console-Logs für Debugging:

- IGDB-Suchvorgänge werden geloggt
- Token-Erneuerung wird geloggt
- Fehler werden detailliert ausgegeben

## Testing

Nachdem die Credentials konfiguriert sind, können Sie die Integration testen:

1. Starten Sie die Anwendung
2. Führen Sie einen Steam-Import mit aktivierter IGDB-Anreicherung durch
3. Überprüfen Sie die Ergebnisse in der Import-Zusammenfassung

Die Anreicherung ist optional und kann in der Benutzeroberfläche deaktiviert werden.
