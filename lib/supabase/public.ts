import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { supabasePublishableKey, supabaseUrl } from "./env";

/**
 * Anonymous, cookie-less client for reading public content (published team
 * members, projects, posts, programs). Because it never touches the request,
 * it is safe inside cached functions ("use cache"). Row-level security applies.
 */
export function createPublicClient() {
  return createSupabaseClient(supabaseUrl(), supabasePublishableKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
