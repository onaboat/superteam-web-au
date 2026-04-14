import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicEnv } from "@/lib/supabase/env";

/** Browser client for Client Components (auth, realtime, etc.). */
export function createClient() {
  const env = getSupabasePublicEnv();
  if (!env) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL and anon/publishable key in environment.",
    );
  }
  return createBrowserClient(env.url, env.anonKey);
}
