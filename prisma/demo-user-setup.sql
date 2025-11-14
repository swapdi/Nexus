-- Portfolio Demo User Setup
-- Dieser User wird verwendet für die Demo-Version der Anwendung

-- 1. Erstelle Demo-User in der users Tabelle basierend auf dem Prisma Schema
-- Display Name: Demo User | Steam ID: 76561198275522280
INSERT INTO "users" (
  id,
  "supabase_uid",
  "display_name",
  "steamId",
  credits,
  level,
  xp,
  "epicConnect",
  "gogConnect",
  "emailNotifications"
) VALUES (
  999,
  '00000000-0000-0000-0000-000000000001', -- Fake Supabase UID für Demo
  'Demo User',
  '76561198275522280',
  1000, -- Start mit 1000 Credits
  5,    -- Level 5
  2500, -- 2500 XP
  false,
  false,
  true
) ON CONFLICT (id) DO UPDATE SET
  "display_name" = EXCLUDED."display_name",
  "steamId" = EXCLUDED."steamId",
  credits = EXCLUDED.credits,
  level = EXCLUDED.level,
  xp = EXCLUDED.xp;

-- Hinweis: Die Steam-Bibliothek wird automatisch beim ersten Login importiert
-- über den Steam Import Service (composables/useSteamImport.ts)
