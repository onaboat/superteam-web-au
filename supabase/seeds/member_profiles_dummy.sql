-- Dummy data for testing the public members directory.
-- Safe to re-run: removes these demo rows, then re-inserts.
--
-- Run in Supabase SQL Editor after the migration has been applied.

BEGIN;

DELETE FROM public.member_profiles
WHERE display_name IN (
  'Ava Chen',
  'Noah Singh',
  'Mia Thompson',
  'Liam Patel',
  'Sophie Nguyen',
  'Ethan Brooks',
  'Grace Wilson',
  'Jack Rivera',
  'Isla Morgan',
  'Oliver James'
);

INSERT INTO public.member_profiles (
  display_name,
  location,
  title,
  company,
  photo_url,
  skills,
  skill_filters,
  experience_level,
  twitter_url,
  github_url,
  portfolio_url,
  looking_for,
  published
)
VALUES
  (
    'Ava Chen',
    'Sydney, NSW',
    'Solana Frontend Engineer',
    'Coastline Labs',
    NULL,
    ARRAY['Frontend', 'Rust', 'Product'],
    ARRAY['Frontend', 'Rust', 'Product'],
    'senior',
    'https://x.com/avachen_dev',
    'https://github.com/ava-chen',
    'https://avachen.dev',
    'Looking for design-minded founders building consumer crypto products.',
    true
  ),
  (
    'Noah Singh',
    'Melbourne, VIC',
    'Founder',
    'Harbor Protocol',
    NULL,
    ARRAY['Founder', 'Growth', 'Community'],
    ARRAY['Growth', 'Community'],
    'lead',
    'https://x.com/noahbuilds',
    'https://github.com/noah-singh',
    NULL,
    'Looking for operators and growth partners for go-to-market experiments.',
    true
  ),
  (
    'Mia Thompson',
    'Brisbane, QLD',
    'Product Designer',
    'Studio Sol',
    NULL,
    ARRAY['Design', 'Frontend', 'Content'],
    ARRAY['Design', 'Frontend', 'Content'],
    'mid',
    'https://x.com/miathompson_ui',
    NULL,
    'https://miathompson.design',
    'Looking for early teams that need brand + UX for launches.',
    true
  ),
  (
    'Liam Patel',
    'Perth, WA',
    'Rust Smart Contract Engineer',
    'Nullpoint',
    NULL,
    ARRAY['Rust', 'Core Team'],
    ARRAY['Rust', 'Core Team'],
    'lead',
    NULL,
    'https://github.com/liampatel',
    NULL,
    'Looking for ambitious protocol teams and audit-minded collaborators.',
    true
  ),
  (
    'Sophie Nguyen',
    'Adelaide, SA',
    'Community Lead',
    'South Node',
    NULL,
    ARRAY['Community', 'Content', 'Growth'],
    ARRAY['Community', 'Content', 'Growth'],
    'senior',
    'https://x.com/sophienguyen_au',
    NULL,
    NULL,
    'Looking for meetup hosts and creators to grow local builder energy.',
    true
  ),
  (
    'Ethan Brooks',
    'Canberra, ACT',
    'DevRel Engineer',
    'Open Ledger AU',
    NULL,
    ARRAY['Core Team', 'Content', 'Product'],
    ARRAY['Core Team', 'Content', 'Product'],
    'senior',
    'https://x.com/ethanbrooksdev',
    'https://github.com/ethan-brooks',
    'https://ethanbrooks.dev',
    'Looking for projects that need docs, workshops, and developer onboarding.',
    true
  ),
  (
    'Grace Wilson',
    'Gold Coast, QLD',
    'Product Manager',
    'Pacific Chain',
    NULL,
    ARRAY['Product', 'Growth', 'Founder'],
    ARRAY['Product', 'Growth'],
    'mid',
    NULL,
    NULL,
    NULL,
    'Looking for technical co-founders and pilots with student communities.',
    true
  ),
  (
    'Jack Rivera',
    'Newcastle, NSW',
    'Creative Technologist',
    'Signal House',
    NULL,
    ARRAY['Creative', 'Design', 'Frontend'],
    ARRAY['Design', 'Frontend', 'Content'],
    'early',
    'https://x.com/jackrivera_xyz',
    'https://github.com/jrivera-creative',
    'https://jackrivera.art',
    'Looking for teams building memorable web experiences on Solana.',
    true
  ),
  (
    'Isla Morgan',
    'Hobart, TAS',
    'Operations Lead',
    'Tidal Ventures',
    NULL,
    ARRAY['Operator', 'Community', 'Growth'],
    ARRAY['Community', 'Growth', 'Core Team'],
    'senior',
    'https://x.com/islamorgan_ops',
    NULL,
    NULL,
    'Looking for founders who need help with execution and community systems.',
    true
  ),
  (
    'Oliver James',
    'Darwin, NT',
    'Institutional Partnerships',
    'Top End Capital',
    NULL,
    ARRAY['Institution', 'Product', 'Content'],
    ARRAY['Product', 'Content', 'Core Team'],
    'lead',
    'https://x.com/oliverjames_icm',
    NULL,
    NULL,
    'Looking for teams ready for ecosystem partnerships and distribution.',
    true
  );

COMMIT;
