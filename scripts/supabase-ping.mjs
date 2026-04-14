/**
 * Verify connectivity to your Supabase *project* (HTTPS API + anon key).
 *
 * Usage: npm run supabase:ping
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) in .env.local",
  );
  process.exit(1);
}

let host;
let projectRef = "(unknown)";
try {
  const u = new URL(url);
  host = u.hostname;
  const m = /^([^.]+)\.supabase\.co$/i.exec(host);
  if (m) projectRef = m[1];
} catch {
  console.error("NEXT_PUBLIC_SUPABASE_URL is not a valid URL");
  process.exit(1);
}

console.log(`Project ref from env: ${projectRef}`);
console.log(
  "Dashboard → Project Settings → General → Reference ID should match that ref.\n",
);

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { error } = await supabase
  .from("member_profiles")
  .select("id", { head: true, count: "exact" });

if (!error) {
  console.log(
    `OK — API reachable; PostgREST can read public.member_profiles (${host}).`,
  );
  process.exit(0);
}

const msg = error.message ?? "";
if (
  msg.includes("Could not find the table") ||
  msg.includes("schema cache") ||
  error.code === "PGRST205"
) {
  console.log(
    `OK — API reachable (${host}); member_profiles missing — apply migration (npm run db:apply after supabase link, or SQL Editor).`,
  );
  process.exit(0);
}

console.error("Could not reach Supabase API:", msg);
process.exit(1);
