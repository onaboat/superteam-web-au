/** Matches Postgres enum `member_role`. */
export const MEMBER_ROLES = [
  { value: "builder", label: "Builder" },
  { value: "designer", label: "Designer" },
  { value: "founder", label: "Founder" },
  { value: "creative", label: "Creative" },
  { value: "operator", label: "Operator" },
  { value: "institution", label: "Institution" },
] as const;

export type MemberRoleValue = (typeof MEMBER_ROLES)[number]["value"];

/** Matches Postgres enum `experience_level`. */
export const EXPERIENCE_LEVELS = [
  { value: "learning", label: "Learning / exploring" },
  { value: "early", label: "Early career" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead / principal" },
] as const;

export type ExperienceLevelValue = (typeof EXPERIENCE_LEVELS)[number]["value"];

/** Directory filter chips + intake skills (stored as text in `skills` / `skill_filters`). */
export const SKILL_FILTER_OPTIONS = [
  "Core Team",
  "Rust",
  "Frontend",
  "Design",
  "Content",
  "Growth",
  "Product",
  "Community",
] as const;

export type SkillFilterOption = (typeof SKILL_FILTER_OPTIONS)[number];
