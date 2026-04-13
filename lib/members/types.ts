import type { ExperienceLevelValue, MemberRoleValue } from "@/lib/members/constants";

/** Row shape from `member_profiles` (published subset). */
export type MemberProfileRow = {
  id: string;
  display_name: string;
  location: string | null;
  title: string | null;
  company: string | null;
  photo_url: string | null;
  skills: string[] | null;
  skill_filters: string[] | null;
  experience_level: ExperienceLevelValue | null;
  twitter_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  looking_for: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

/** Props for shared member card UI. */
export type MemberCardModel = {
  id: string;
  name: string;
  title: string | null;
  company: string | null;
  skills: string[];
  photoUrl: string | null;
  twitterUrl: string | null;
};

export function rowToCardModel(row: MemberProfileRow): MemberCardModel {
  const merged = [...(row.skills ?? []), ...(row.skill_filters ?? [])].filter(
    Boolean,
  );
  const skills = [...new Set(merged)].slice(0, 8);
  return {
    id: row.id,
    name: row.display_name,
    title: row.title,
    company: row.company,
    skills: skills.slice(0, 6),
    photoUrl: row.photo_url,
    twitterUrl: row.twitter_url,
  };
}

export type MemberApplicationInsert = {
  full_name: string;
  location: string;
  role: MemberRoleValue;
  skills: string[];
  experience_level: ExperienceLevelValue;
  twitter_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  looking_for: string;
};
