import type { MemberProfileRow } from "@/lib/members/types";
import { createSupabaseAnonClient } from "@/lib/supabase/server-anon";

export async function getPublishedProfiles(options?: {
  limit?: number;
}): Promise<MemberProfileRow[]> {
  const supabase = createSupabaseAnonClient();
  if (!supabase) return [];

  let q = supabase
    .from("member_profiles")
    .select(
      "id, display_name, location, title, company, photo_url, skills, skill_filters, experience_level, twitter_url, github_url, portfolio_url, looking_for, published, created_at, updated_at",
    )
    .eq("published", true)
    .order("updated_at", { ascending: false });

  const limit = options?.limit;
  if (limit != null && limit > 0) {
    q = q.limit(limit);
  }

  const { data, error } = await q;

  if (error) {
    console.error("getPublishedProfiles:", error.message);
    return [];
  }

  return (data ?? []) as MemberProfileRow[];
}

export async function getFeaturedProfiles(
  limit: number,
): Promise<MemberProfileRow[]> {
  return getPublishedProfiles({ limit });
}
