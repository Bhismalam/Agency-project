import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { supabaseUrl } from "./env";

/**
 * Privileged client that BYPASSES row-level security. Server-only.
 * Use it only where there is no signed-in user to act as (storing program
 * applications) or for auth admin calls (inviting members) — and only after
 * the caller has been checked.
 */
export function createAdminClient() {
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Missing env var SUPABASE_SECRET_KEY. See .env.example.");
  }

  return createSupabaseClient(supabaseUrl(), secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
