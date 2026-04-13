# Get Involved & Member Directory — Implementation Plan

This document describes how the onboarding form, Supabase backend, Sanity CMS, and Next.js app fit together for Superteam Australia. **Directory listings are manual-approval only**; operators use the **Supabase Dashboard** (no custom admin app in v1).

---

## 1. Goals

- **Get Involved**: Structured intake (multi-step or single page) with fast, mobile-first UX.
- **Member directory**: Search and filter by skills (including Core Team, Rust, Frontend, Design, Content, Growth, Product, Community), member cards with photo, name, title, company, skills, X link, with room for smooth transitions/animations.
- **Operations**: Submissions land in Postgres; **only approved profiles** appear on the public site.
- **Editorial**: Sanity continues to own marketing copy and home section layout; **not** the member database.

---

## 2. Architecture

| Layer | Responsibility |
|--------|----------------|
| **Sanity** | Home page block order, hero and section copy; optional `membersSection` for directory headline, intro, and “featured” strip limits. |
| **Supabase (Postgres)** | `member_applications` (intake), `member_profiles` (public directory rows), RLS, optional Storage for avatars later. |
| **Next.js** | Server Actions / Route Handlers for form submit (service role); Server Components to load published profiles; Client Components for form wizard and filters only where needed. |

**Source of truth**: Member data for the directory lives in **`member_profiles`**. Sanity does not duplicate profile rows.

---

## 3. Data Model (Supabase)

### 3.1 `member_applications`

One row per form submission.

| Field (conceptual) | Notes |
|--------------------|--------|
| `id` | `uuid`, primary key, default `gen_random_uuid()` |
| `full_name` | text |
| `location` | text |
| `role` | enum or text check: Builder, Designer, Founder, Creative, Operator, Institution |
| `skills` | `text[]` or comma-normalized text (match product decision) |
| `experience_level` | text or enum (junior / mid / senior / etc. as defined) |
| `twitter_url`, `github_url`, `portfolio_url` | text, nullable |
| `looking_for` | text |
| `status` | `pending` \| `approved` \| `rejected`, default `pending` |
| `created_at` | `timestamptz`, default `now()` |
| Optional | `internal_notes` for operators (dashboard only) |

**Public clients**: Insert-only path from the app (validated server-side). **No public SELECT** on this table.

### 3.2 `member_profiles`

Rows that power **`/members`** and any home “featured” UI.

| Field (conceptual) | Notes |
|--------------------|--------|
| `id` | `uuid`, PK |
| `application_id` | nullable FK → `member_applications(id)` for audit |
| `display_name` | text |
| `location` | text |
| `title` | text (e.g. role label on card) |
| `company` | text, nullable |
| `photo_url` | text (URL or Storage path), nullable |
| `skills` | `text[]` for display tags |
| `skill_filters` | `text[]` aligned to directory filters (Core Team, Rust, Frontend, Design, Content, Growth, Product, Community) |
| `twitter_url` | text, nullable |
| `github_url`, `portfolio_url` | optional on card |
| `looking_for` | text, optional public |
| `published` | boolean, default `false` — **must be `true` for the app to show the row** |
| `created_at`, `updated_at` | `timestamptz` |

**Rule**: A person appears on the site only if **`published = true`**. Approval workflow (below) ensures only intended rows are published.

### 3.3 Row Level Security (RLS)

- **`member_applications`**: Deny anonymous/authenticated `SELECT`. Allow `INSERT` only via controlled path: preferably **Server Action using service role** (bypasses RLS), or a tight `INSERT` policy plus validation—team choice during implementation.
- **`member_profiles`**: `SELECT` for `anon` (and `authenticated` if needed) **only where `published = true`**. No direct client `INSERT`/`UPDATE`/`DELETE`; mutations happen in Dashboard (service role) or later via secured admin RPC.

### 3.4 Indexes

- `member_profiles (published)` partial index where `published = true` for listing.
- GIN on `skill_filters` (and `skills` if filtered) for overlap queries.

---

## 4. Approval Workflow (Supabase Dashboard)

Operators do **not** use a custom admin UI in v1.

1. Open **Table Editor → `member_applications`**, sort by `created_at` desc, filter `status = pending`.
2. **Reject**: Set `status = rejected` (optionally fill `internal_notes`).
3. **Approve**:
   - Set `status = approved` on the application.
   - **Insert** a row into **`member_profiles`**, mapping fields from the application, set **`published = true`**, set **`application_id`**.
4. **Unpublish**: Set **`published = false`** on the profile (or delete the profile row) to remove from the public directory without deleting the application record.

Saved filters in the Dashboard can speed up the pending queue.

---

## 5. App Routes & UX

| Route / surface | Behavior |
|-----------------|----------|
| **Get Involved** | e.g. `/get-involved` — form only; success state explains review before directory listing. |
| **Member directory** | e.g. `/members` — server-fetched list of `member_profiles` where `published = true`; client filters/search as designed. |
| **Navbar** | Point **Get Involved** to `/get-involved`; point **Members** to `/members` (or keep hash anchors only if matching `id`s are added on the home page—prefer real routes for form and directory). |

**Form UX**: Multi-step recommended for mobile; reuse existing UI primitives (`Button`, `Card`, inputs under `components/ui/`). Validate with shared schema (e.g. Zod) in Server Actions.

**Directory UX**: Reuse or refactor **`BuilderCard`**-style layout from `components/builders.tsx` so props come from Supabase, not mocks. Animations: CSS / `tw-animate-css`; add motion library only if needed.

---

## 6. Sanity CMS Integration

- **Optional block**: `membersSection` on `homePage` — fields such as section title, subtitle, optional “View all” label, max featured count.
- **Rendering**: `PageSections` switch includes `membersSection` → component that runs a **server-side query** for N published profiles (e.g. random or `updated_at` desc) and links to `/members`.
- **Types**: Extend `lib/sanity/types.ts` and studio schema in lockstep (`studio-superteam-aus/schemaTypes/`).

If this block is deferred, the home page can keep static **`Builders`** until the Supabase-backed component replaces mock data.

---

## 7. Environment & Dependencies

- **Env**: Copy [`.env.example`](../.env.example) to `.env.local` and set:
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public reads of published profiles.
  - `SUPABASE_SERVICE_ROLE_KEY` — **server only** (Get Involved inserts); never expose to the client.
- **Database**: Run the SQL in [`supabase/migrations/20260413120000_member_intake.sql`](../supabase/migrations/20260413120000_member_intake.sql) in the Supabase SQL Editor (or use the Supabase CLI).
- **Package**: `@supabase/supabase-js`, `zod` (installed). Optional later: `@supabase/ssr` if you add auth.

---

## 8. Implementation Phases (Suggested Order)

1. **Supabase**: Create tables, enums, indexes, RLS policies; verify inserts/selects from SQL editor.
2. **Next.js server client**: Supabase server utilities (anon client for reads of published profiles; service role only inside Server Actions).
3. **Get Involved**: `/get-involved` page + Server Action → insert `member_applications` + confirmation UI.
4. **Directory**: `/members` + query published profiles; refactor builder card to accept typed props; search/filter UI.
5. **Home integration**: Replace or supplement `MOCK_BUILDERS` in `builders.tsx` with featured query; wire navbar links.
6. **Sanity** (optional): `membersSection` block + `PageSections` branch.
7. **Polish**: Loading/empty states, a11y, rate limiting / spam hardening for the form (follow-up).

---

## 9. Future Enhancements (Out of Scope for v1)

- Conditional form branches by role (same schema; UI state machine).
- User tagging and segmentation (extra columns or junction tables; export/webhooks).
- Supabase Auth + “edit my profile”.
- Avatar upload to Storage.
- Confirmation email / automation (Resend, etc.).
- On-demand revalidation when profiles change (webhook).

---

## 10. Success Criteria

- [x] Submissions appear in `member_applications` with correct validation (Server Action + Zod).
- [x] No public `SELECT` on applications (RLS: no policies for anon/authenticated; service role used server-side only).
- [x] Directory shows **only** `member_profiles` with `published = true`.
- [x] Operators can approve end-to-end using **only** the Supabase Dashboard (insert/update published profiles manually).
- [x] Sanity-driven home still works; `Builders` wrapped in `Suspense` for async data.

**When publishing a profile in the Dashboard**, copy skill labels that match app filters exactly (`Core Team`, `Rust`, `Frontend`, etc.) into `skill_filters` so directory filters work.

---

*Last updated: implementation landed — routes `/get-involved` and `/members`, shared `MemberCard`, SQL migration in repo.*
