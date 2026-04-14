"use server";

import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { isSupabaseSubmitConfigured } from "@/lib/supabase/env";
import { getInvolvedSchema } from "@/lib/validators/get-involved";

export type SubmitApplicationResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitMemberApplication(
  payload: unknown,
): Promise<SubmitApplicationResult> {
  if (!isSupabaseSubmitConfigured()) {
    return {
      ok: false,
      error:
        "Submissions are not configured. Add Supabase environment variables.",
    };
  }

  const parsed = getInvolvedSchema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      Object.values(first).flat()[0] ??
      parsed.error.issues[0]?.message ??
      "Invalid form data";
    return { ok: false, error: msg };
  }

  const supabase = createSupabaseServiceClient();
  if (!supabase) {
    return { ok: false, error: "Server configuration error." };
  }

  const v = parsed.data;
  const { error } = await supabase.from("member_applications").insert({
    full_name: v.full_name,
    location: v.location,
    role: v.role,
    skills: v.skills,
    experience_level: v.experience_level,
    twitter_url: v.twitter_url,
    github_url: v.github_url,
    portfolio_url: v.portfolio_url,
    looking_for: v.looking_for,
  });

  if (error) {
    console.error("submitMemberApplication:", error.message);
    return {
      ok: false,
      error: "Could not save your application. Please try again later.",
    };
  }

  return { ok: true };
}
