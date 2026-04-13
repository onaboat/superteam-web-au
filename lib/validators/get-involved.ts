import { z } from "zod";

import {
  EXPERIENCE_LEVELS,
  MEMBER_ROLES,
  SKILL_FILTER_OPTIONS,
} from "@/lib/members/constants";

const roleValues = MEMBER_ROLES.map((r) => r.value) as [string, ...string[]];
const expValues = EXPERIENCE_LEVELS.map((e) => e.value) as [string, ...string[]];

function optionalUrl(val: unknown): string | null {
  if (val == null || val === "") return null;
  const s = String(val).trim();
  if (!s) return null;
  let normalized = s;
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }
  try {
    const u = new URL(normalized);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.toString();
  } catch {
    return null;
  }
}

export const getInvolvedSchema = z.object({
  full_name: z.string().trim().min(2, "Name is required"),
  location: z.string().trim().min(2, "Location is required"),
  role: z.enum(roleValues),
  skills: z
    .array(z.string())
    .min(1, "Pick at least one skill area")
    .refine(
      (skills) =>
        skills.every((s) =>
          (SKILL_FILTER_OPTIONS as readonly string[]).includes(s),
        ),
      { message: "Invalid skill selection" },
    ),
  experience_level: z.enum(expValues),
  twitter_url: z
    .string()
    .nullish()
    .transform((v) => optionalUrl(v)),
  github_url: z
    .string()
    .nullish()
    .transform((v) => optionalUrl(v)),
  portfolio_url: z
    .string()
    .nullish()
    .transform((v) => optionalUrl(v)),
  looking_for: z.string().trim().min(10, "Add a bit more detail (10+ characters)"),
});

export type GetInvolvedValues = z.infer<typeof getInvolvedSchema>;
