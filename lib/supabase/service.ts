import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSupabasePublicEnv, getSupabaseServiceRoleKey } from "@/lib/supabase/env";

/** Server-only client for inserting applications (bypasses RLS). Never import in client components. */
export function createSupabaseServiceClient(): SupabaseClient | null {
  const env = getSupabasePublicEnv();
  const serviceKey = getSupabaseServiceRoleKey();
  if (!env || !serviceKey) return null;
  return createClient(env.url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
