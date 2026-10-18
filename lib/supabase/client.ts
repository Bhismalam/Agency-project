import { createBrowserClient } from "@supabase/ssr";
import { supabasePublishableKey, supabaseUrl } from "./env";

/** Supabase client for Client Components (e.g. the login form). */
export function createClient() {
  return createBrowserClient(supabaseUrl(), supabasePublishableKey());
}
