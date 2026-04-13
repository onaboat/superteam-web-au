/** Publishable key (dashboard) or legacy anon key — same JWT role. */
export function getSupabasePublishableOrAnonKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
  );
}

/** Anon key + URL — enough to read published profiles. */
export function isSupabaseReadConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() && getSupabasePublishableOrAnonKey(),
  );
}

/** Service role + public env — required for Get Involved submissions (server only). */
export function isSupabaseSubmitConfigured(): boolean {
  return Boolean(
    isSupabaseReadConfigured() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  );
}

export function getSupabasePublicEnv(): {
  url: string;
  anonKey: string;
} | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = getSupabasePublishableOrAnonKey();
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export function getSupabaseServiceRoleKey(): string | null {
  const k = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return k ?? null;
}
