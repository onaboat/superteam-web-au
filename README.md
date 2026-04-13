# Superteam Australia — Web

Marketing and community site for **Superteam Australia**: home page, **Get Involved** intake, and a **Members** directory backed by Supabase. Editorial content and section order for the home page can be driven by **Sanity** when configured.

## Stack

- **Next.js** (App Router) · **React** · **TypeScript**
- **Tailwind CSS** · **shadcn-style** UI primitives (`components/ui/`)
- **Sanity** — optional home page blocks and copy (`lib/sanity/`, `studio-superteam-aus/`)
- **Supabase** — Postgres for member applications and published directory profiles

This repo targets a **non-stock** Next.js major version. If something behaves unlike “classic” Next.js, check the in-repo guides under `node_modules/next/dist/docs/` and deprecation notes.

## Prerequisites

- **Node.js** 20+ (recommended)
- **npm** (or compatible package manager)

## Quick start

```bash
git clone <repository-url>
cd aus-superteam
npm install
cp .env.example .env.local
```

Fill `.env.local` (see [Environment variables](#environment-variables)), then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy **`.env.example`** → **`.env.local`**. Never commit real secrets.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (`https://<project-ref>.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Anon** / **publishable** key (same JWT; browser-safe with RLS) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Optional alias for the anon key if your dashboard uses that name |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** — Get Involved form inserts; bypasses RLS |
| `NEXT_PUBLIC_SANITY_*`, `SANITY_*` | Sanity CMS (see existing keys in `.env.example` / your studio) |

`.env.local` is gitignored; `.env.example` is committed as a template.

## Supabase

1. **Create a project** at [supabase.com](https://supabase.com) (or use an existing one).
2. **Apply the schema** (pick one):

   - **npm script (recommended here):** In the Supabase Dashboard go to **Project Settings → Database** and copy a **URI** connection string (this uses your **database password**, not the anon/publishable API key). If `npm run db:migrate` fails with **`EHOSTUNREACH` and an IPv6 address** (`2406:…`), use the **Transaction pooler** URI (port **6543**, host `…pooler.supabase.com`) instead of the direct `db.…supabase.co` host. Add it to `.env.local` as `SUPABASE_DATABASE_URL`, then run:

     ```bash
     npm run db:migrate
     ```

   - **SQL Editor:** Paste and run `supabase/migrations/20260413120000_member_intake.sql`.

   - **Supabase CLI:** After `supabase login`, run `supabase link --project-ref <ref> -p <db-password>` then `npm run db:push`.

3. **Keys**: In the dashboard (**Project Settings → API**), copy the project URL, **anon** (publishable) key, and **service_role** (secret) into `.env.local`.

**Operations:** Intake rows live in `member_applications`. Public directory rows are `member_profiles` with `published = true`. Approvals are done in the **Supabase Dashboard** (Table Editor), not in this app — see [`docs/get-involved-member-directory-plan.md`](docs/get-involved-member-directory-plan.md).

## Sanity (optional)

- Content API and live preview are wired in `lib/sanity/`.
- The editing studio lives under **`studio-superteam-aus/`** — see [`studio-superteam-aus/README.md`](studio-superteam-aus/README.md) for studio-specific commands.

If no Sanity document is returned for the home page, the app falls back to the built-in sections in `app/page.tsx`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run lint` | ESLint |

## Main routes

| Path | Description |
|------|-------------|
| `/` | Home |
| `/get-involved` | Multi-step onboarding form → `member_applications` |
| `/members` | Searchable directory of **published** profiles |

## Documentation

- [Get Involved & member directory plan](docs/get-involved-member-directory-plan.md) — data model, RLS, approval workflow, implementation notes.

## Deploy

Configure the same environment variables on your host (e.g. Vercel). Use the **anon** key in public env vars and keep **`SUPABASE_SERVICE_ROLE_KEY`** only on the server.

---

Built with Next.js. For generic Next.js docs, see [nextjs.org/docs](https://nextjs.org/docs).
