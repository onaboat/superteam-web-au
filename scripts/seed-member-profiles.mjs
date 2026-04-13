/**
 * Seed dummy member profiles via Supabase HTTPS API.
 *
 * Usage:
 *   npm run db:seed:members
 *
 * Requirements in .env.local:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!url || !serviceRole) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRole, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const rows = [
  {
    display_name: "Ava Chen",
    location: "Sydney, NSW",
    title: "Solana Frontend Engineer",
    company: "Coastline Labs",
    photo_url: null,
    skills: ["Frontend", "Rust", "Product"],
    skill_filters: ["Frontend", "Rust", "Product"],
    experience_level: "senior",
    twitter_url: "https://x.com/avachen_dev",
    github_url: "https://github.com/ava-chen",
    portfolio_url: "https://avachen.dev",
    looking_for: "Looking for design-minded founders building consumer crypto products.",
    published: true,
  },
  {
    display_name: "Noah Singh",
    location: "Melbourne, VIC",
    title: "Founder",
    company: "Harbor Protocol",
    photo_url: null,
    skills: ["Founder", "Growth", "Community"],
    skill_filters: ["Growth", "Community"],
    experience_level: "lead",
    twitter_url: "https://x.com/noahbuilds",
    github_url: "https://github.com/noah-singh",
    portfolio_url: null,
    looking_for: "Looking for operators and growth partners for go-to-market experiments.",
    published: true,
  },
  {
    display_name: "Mia Thompson",
    location: "Brisbane, QLD",
    title: "Product Designer",
    company: "Studio Sol",
    photo_url: null,
    skills: ["Design", "Frontend", "Content"],
    skill_filters: ["Design", "Frontend", "Content"],
    experience_level: "mid",
    twitter_url: "https://x.com/miathompson_ui",
    github_url: null,
    portfolio_url: "https://miathompson.design",
    looking_for: "Looking for early teams that need brand + UX for launches.",
    published: true,
  },
  {
    display_name: "Liam Patel",
    location: "Perth, WA",
    title: "Rust Smart Contract Engineer",
    company: "Nullpoint",
    photo_url: null,
    skills: ["Rust", "Core Team"],
    skill_filters: ["Rust", "Core Team"],
    experience_level: "lead",
    twitter_url: null,
    github_url: "https://github.com/liampatel",
    portfolio_url: null,
    looking_for: "Looking for ambitious protocol teams and audit-minded collaborators.",
    published: true,
  },
  {
    display_name: "Sophie Nguyen",
    location: "Adelaide, SA",
    title: "Community Lead",
    company: "South Node",
    photo_url: null,
    skills: ["Community", "Content", "Growth"],
    skill_filters: ["Community", "Content", "Growth"],
    experience_level: "senior",
    twitter_url: "https://x.com/sophienguyen_au",
    github_url: null,
    portfolio_url: null,
    looking_for: "Looking for meetup hosts and creators to grow local builder energy.",
    published: true,
  },
  {
    display_name: "Ethan Brooks",
    location: "Canberra, ACT",
    title: "DevRel Engineer",
    company: "Open Ledger AU",
    photo_url: null,
    skills: ["Core Team", "Content", "Product"],
    skill_filters: ["Core Team", "Content", "Product"],
    experience_level: "senior",
    twitter_url: "https://x.com/ethanbrooksdev",
    github_url: "https://github.com/ethan-brooks",
    portfolio_url: "https://ethanbrooks.dev",
    looking_for: "Looking for projects that need docs, workshops, and developer onboarding.",
    published: true,
  },
  {
    display_name: "Grace Wilson",
    location: "Gold Coast, QLD",
    title: "Product Manager",
    company: "Pacific Chain",
    photo_url: null,
    skills: ["Product", "Growth", "Founder"],
    skill_filters: ["Product", "Growth"],
    experience_level: "mid",
    twitter_url: null,
    github_url: null,
    portfolio_url: null,
    looking_for: "Looking for technical co-founders and pilots with student communities.",
    published: true,
  },
  {
    display_name: "Jack Rivera",
    location: "Newcastle, NSW",
    title: "Creative Technologist",
    company: "Signal House",
    photo_url: null,
    skills: ["Creative", "Design", "Frontend"],
    skill_filters: ["Design", "Frontend", "Content"],
    experience_level: "early",
    twitter_url: "https://x.com/jackrivera_xyz",
    github_url: "https://github.com/jrivera-creative",
    portfolio_url: "https://jackrivera.art",
    looking_for: "Looking for teams building memorable web experiences on Solana.",
    published: true,
  },
  {
    display_name: "Isla Morgan",
    location: "Hobart, TAS",
    title: "Operations Lead",
    company: "Tidal Ventures",
    photo_url: null,
    skills: ["Operator", "Community", "Growth"],
    skill_filters: ["Community", "Growth", "Core Team"],
    experience_level: "senior",
    twitter_url: "https://x.com/islamorgan_ops",
    github_url: null,
    portfolio_url: null,
    looking_for: "Looking for founders who need help with execution and community systems.",
    published: true,
  },
  {
    display_name: "Oliver James",
    location: "Darwin, NT",
    title: "Institutional Partnerships",
    company: "Top End Capital",
    photo_url: null,
    skills: ["Institution", "Product", "Content"],
    skill_filters: ["Product", "Content", "Core Team"],
    experience_level: "lead",
    twitter_url: "https://x.com/oliverjames_icm",
    github_url: null,
    portfolio_url: null,
    looking_for: "Looking for teams ready for ecosystem partnerships and distribution.",
    published: true,
  },
];

const names = rows.map((row) => row.display_name);

const { error: deleteError } = await supabase
  .from("member_profiles")
  .delete()
  .in("display_name", names);

if (deleteError) {
  console.error("Seeding failed while deleting existing rows:", deleteError.message);
  process.exit(1);
}

const { error: insertError } = await supabase.from("member_profiles").insert(rows);

if (insertError) {
  console.error("Seeding failed while inserting rows:", insertError.message);
  process.exit(1);
}

console.log(`OK — seeded ${rows.length} dummy member profiles.`);
