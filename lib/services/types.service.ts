import type { User as PrismaUser } from '~/prisma/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

/**
 * Erweiterte User-Typ mit verknüpften Supabase-Informationen
 * Kombiniert Datenbank-User mit Supabase Auth-Daten
 */
export type FullUser = {
  /** Basis-User Informationen aus der Datenbank */
  dbUser: PrismaUser;
  /** Supabase Auth-User Informationen */
  account: SupabaseUser;
};
