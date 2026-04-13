-- Member intake + public directory (manual publish via Dashboard)
-- Run in Supabase SQL Editor or via CLI: supabase db push

-- Application status
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
    CREATE TYPE public.application_status AS ENUM ('pending', 'approved', 'rejected');
  END IF;
END$$;

-- Role / experience enums for validation at DB layer
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'member_role') THEN
    CREATE TYPE public.member_role AS ENUM (
      'builder',
      'designer',
      'founder',
      'creative',
      'operator',
      'institution'
    );
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'experience_level') THEN
    CREATE TYPE public.experience_level AS ENUM (
      'learning',
      'early',
      'mid',
      'senior',
      'lead'
    );
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS public.member_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  location text NOT NULL,
  role public.member_role NOT NULL,
  skills text[] NOT NULL DEFAULT '{}',
  experience_level public.experience_level NOT NULL,
  twitter_url text,
  github_url text,
  portfolio_url text,
  looking_for text NOT NULL,
  status public.application_status NOT NULL DEFAULT 'pending',
  internal_notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.member_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES public.member_applications (id) ON DELETE SET NULL,
  display_name text NOT NULL,
  location text,
  title text,
  company text,
  photo_url text,
  skills text[] NOT NULL DEFAULT '{}',
  skill_filters text[] NOT NULL DEFAULT '{}',
  experience_level public.experience_level,
  twitter_url text,
  github_url text,
  portfolio_url text,
  looking_for text,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_member_profiles_published_true
  ON public.member_profiles (published)
  WHERE published = true;

CREATE INDEX IF NOT EXISTS idx_member_profiles_skill_filters
  ON public.member_profiles USING gin (skill_filters);

CREATE INDEX IF NOT EXISTS idx_member_applications_status_created
  ON public.member_applications (status, created_at DESC);

-- RLS
ALTER TABLE public.member_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_profiles ENABLE ROW LEVEL SECURITY;

-- Applications: no policies for anon/authenticated → all access denied (inserts use service role only)

-- Published profiles readable by site visitors
DROP POLICY IF EXISTS "member_profiles_select_published" ON public.member_profiles;
CREATE POLICY "member_profiles_select_published"
  ON public.member_profiles
  FOR SELECT
  TO authenticated, anon
  USING (published = true);

COMMENT ON TABLE public.member_applications IS 'Get Involved submissions; approve/reject in Supabase Dashboard';
COMMENT ON TABLE public.member_profiles IS 'Public directory rows; set published=true after manual approval';

-- Optional: set updated_at on profile edits (run in SQL Editor if you want automatic timestamps)
-- CREATE OR REPLACE FUNCTION public.set_member_profiles_updated_at() RETURNS trigger ...
