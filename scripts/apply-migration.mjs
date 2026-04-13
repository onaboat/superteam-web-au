/**
 * Apply SQL migration(s) to the remote Supabase Postgres instance.
 *
 * Requires a Postgres connection string (not the anon key):
 * Dashboard → Project Settings → Database → Connection string → URI
 *
 * Forces an IPv4 route when the hostname has an A record, avoiding EHOSTUNREACH on
 * broken IPv6 networks. TLS uses servername (SNI) for the original hostname when
 * connecting to the resolved IPv4 address.
 *
 * Usage: npm run db:migrate
 */
import dns from "node:dns";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import pgConn from "pg-connection-string";

dns.setDefaultResultOrder("ipv4first");

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const migrationFile = join(
  root,
  "supabase/migrations/20260413120000_member_intake.sql",
);

const url =
  process.env.SUPABASE_DATABASE_URL?.trim() ||
  process.env.DIRECT_URL?.trim();

if (!url) {
  console.error(
    "Missing SUPABASE_DATABASE_URL (or DIRECT_URL) in the environment.\n" +
      "1. Supabase Dashboard → Project Settings → Database\n" +
      "2. Copy the URI connection string (includes your DB password)\n" +
      "3. Add SUPABASE_DATABASE_URL=... to .env.local\n" +
      "4. npm run db:migrate",
  );
  process.exit(1);
}

const sql = readFileSync(migrationFile, "utf8");

function isIpv4Literal(host) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(host ?? "");
}

/**
 * @returns {Promise<import('pg').Client>}
 */
async function createMigrationClient(connectionString) {
  const isLocalOnly =
    /\.local|localhost|127\.0\.0\.1/i.test(connectionString) &&
    !connectionString.includes("supabase.co");

  if (isLocalOnly) {
    return new pg.Client({ connectionString, ssl: false });
  }

  const config = pgConn.parseIntoClientConfig(connectionString);
  const host = config.host;

  if (!host || isIpv4Literal(host)) {
    return new pg.Client({
      ...config,
      ssl:
        typeof config.ssl === "object" && config.ssl !== null
          ? config.ssl
          : { rejectUnauthorized: false },
    });
  }

  try {
    const addrs = await dns.promises.resolve4(host);
    const address = addrs[0];
    if (!address) throw new Error("no A records");

    return new pg.Client({
      ...config,
      host: address,
      ssl: {
        ...(typeof config.ssl === "object" && config.ssl !== null
          ? config.ssl
          : {}),
        rejectUnauthorized: false,
        servername: host,
      },
    });
  } catch {
    return new pg.Client({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }
}

const client = await createMigrationClient(url);

try {
  await client.connect();
  await client.query(sql);
  console.log("OK — migration applied:", migrationFile);
} catch (err) {
  console.error("Migration failed:", err.message);
  if (
    String(err.message).includes("EHOSTUNREACH") ||
    String(err.message).includes("2406:")
  ) {
    console.error(
      "\nTip: Use the Transaction pooler URI (port 6543, …pooler.supabase.com)\n" +
        "from Database → Connection string, or run the SQL in the SQL Editor.",
    );
  }
  process.exit(1);
} finally {
  await client.end().catch(() => {});
}
