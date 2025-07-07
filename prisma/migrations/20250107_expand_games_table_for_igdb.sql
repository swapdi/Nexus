-- Migration: Erweitere Game-Tabelle für zentrale Spieledatenbank mit IGDB-Daten

-- Füge neue IGDB-Spalten hinzu
ALTER TABLE games 
ADD COLUMN igdb_id INTEGER UNIQUE,
ADD COLUMN slug TEXT UNIQUE,
ADD COLUMN summary TEXT,
ADD COLUMN storyline TEXT,
ADD COLUMN first_release_date TIMESTAMPTZ,
ADD COLUMN total_rating DOUBLE PRECISION,
ADD COLUMN total_rating_count INTEGER,
ADD COLUMN aggregated_rating DOUBLE PRECISION,
ADD COLUMN aggregated_rating_count INTEGER,
ADD COLUMN screenshots TEXT[],
ADD COLUMN themes TEXT[],
ADD COLUMN game_modes TEXT[],
ADD COLUMN keywords TEXT[],
ADD COLUMN developers TEXT[],
ADD COLUMN publishers TEXT[],
ADD COLUMN websites JSONB,
ADD COLUMN external_games JSONB,
ADD COLUMN age_ratings JSONB,
ADD COLUMN last_synced_at TIMESTAMPTZ;

-- Migriere bestehende Daten
UPDATE games 
SET 
  summary = description,
  developers = CASE WHEN developer IS NOT NULL THEN ARRAY[developer] ELSE ARRAY[]::TEXT[] END,
  publishers = CASE WHEN publisher IS NOT NULL THEN ARRAY[publisher] ELSE ARRAY[]::TEXT[] END,
  first_release_date = release_date,
  total_rating = rating,
  last_synced_at = CURRENT_TIMESTAMP
WHERE description IS NOT NULL OR developer IS NOT NULL OR publisher IS NOT NULL OR release_date IS NOT NULL OR rating IS NOT NULL;

-- Erstelle Indizes für bessere Performance
CREATE INDEX CONCURRENTLY idx_games_igdb_id ON games(igdb_id) WHERE igdb_id IS NOT NULL;
CREATE INDEX CONCURRENTLY idx_games_slug ON games(slug) WHERE slug IS NOT NULL;
CREATE INDEX CONCURRENTLY idx_games_total_rating ON games(total_rating) WHERE total_rating IS NOT NULL;
CREATE INDEX CONCURRENTLY idx_games_first_release_date ON games(first_release_date) WHERE first_release_date IS NOT NULL;
CREATE INDEX CONCURRENTLY idx_games_last_synced_at ON games(last_synced_at) WHERE last_synced_at IS NOT NULL;

-- Erstelle Index für Genre-Suche
CREATE INDEX CONCURRENTLY idx_games_genres_gin ON games USING gin(genres) WHERE array_length(genres, 1) > 0;

-- Erstelle Index für Developer-Suche
CREATE INDEX CONCURRENTLY idx_games_developers_gin ON games USING gin(developers) WHERE array_length(developers, 1) > 0;

-- Erstelle Index für Publisher-Suche
CREATE INDEX CONCURRENTLY idx_games_publishers_gin ON games USING gin(publishers) WHERE array_length(publishers, 1) > 0;

-- Erstelle Index für externe Spiele-Referenzen
CREATE INDEX CONCURRENTLY idx_games_external_games_gin ON games USING gin(external_games) WHERE external_games IS NOT NULL;

-- Füge Constraint für IGDB ID hinzu (nur positive Werte)
ALTER TABLE games ADD CONSTRAINT chk_games_igdb_id_positive CHECK (igdb_id IS NULL OR igdb_id > 0);

-- Füge Constraint für Rating-Bereiche hinzu
ALTER TABLE games ADD CONSTRAINT chk_games_total_rating_range CHECK (total_rating IS NULL OR (total_rating >= 0 AND total_rating <= 100));
ALTER TABLE games ADD CONSTRAINT chk_games_aggregated_rating_range CHECK (aggregated_rating IS NULL OR (aggregated_rating >= 0 AND aggregated_rating <= 100));

-- Kommentare für Dokumentation
COMMENT ON COLUMN games.igdb_id IS 'Eindeutige ID aus der IGDB API';
COMMENT ON COLUMN games.slug IS 'URL-sicherer, eindeutiger Bezeichner aus IGDB';
COMMENT ON COLUMN games.summary IS 'Kurzbeschreibung des Spiels aus IGDB';
COMMENT ON COLUMN games.storyline IS 'Detaillierte Story-Beschreibung aus IGDB';
COMMENT ON COLUMN games.first_release_date IS 'Erstes Veröffentlichungsdatum aus IGDB';
COMMENT ON COLUMN games.total_rating IS 'Gesamtbewertung aus IGDB (0-100)';
COMMENT ON COLUMN games.total_rating_count IS 'Anzahl der Bewertungen für total_rating';
COMMENT ON COLUMN games.aggregated_rating IS 'Kritiker-Bewertung aus IGDB (0-100)';
COMMENT ON COLUMN games.aggregated_rating_count IS 'Anzahl der Kritiker-Bewertungen';
COMMENT ON COLUMN games.screenshots IS 'Array von Screenshot-URLs aus IGDB';
COMMENT ON COLUMN games.themes IS 'Array von Themen-Namen aus IGDB';
COMMENT ON COLUMN games.game_modes IS 'Array von Spielmodi-Namen aus IGDB';
COMMENT ON COLUMN games.keywords IS 'Array von Schlüsselwörtern aus IGDB';
COMMENT ON COLUMN games.developers IS 'Array von Entwickler-Namen aus IGDB';
COMMENT ON COLUMN games.publishers IS 'Array von Publisher-Namen aus IGDB';
COMMENT ON COLUMN games.websites IS 'JSON-Objekt mit Website-Informationen aus IGDB';
COMMENT ON COLUMN games.external_games IS 'JSON-Objekt mit externen Spiele-Referenzen (Steam, Epic etc.)';
COMMENT ON COLUMN games.age_ratings IS 'JSON-Objekt mit Alterseinstufungen aus IGDB';
COMMENT ON COLUMN games.last_synced_at IS 'Zeitstempel der letzten Synchronisation mit IGDB';

-- Erstelle Funktion zur Aktualisierung des last_synced_at Timestamps
CREATE OR REPLACE FUNCTION update_games_last_synced_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_synced_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Erstelle Trigger für automatische Aktualisierung
CREATE TRIGGER trigger_games_update_last_synced_at
  BEFORE UPDATE ON games
  FOR EACH ROW
  EXECUTE FUNCTION update_games_last_synced_at();
