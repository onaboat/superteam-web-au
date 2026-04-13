# Gap Remediation Plan

Prioritized plan to address gaps between the current implementation and the Superteam Australia website challenge brief.

## Priority Tiers

| Tier | Criteria |
|------|----------|
| **P0 - Must Do** | High reward, directly required by brief |
| **P1 - Should Do** | Good ROI, strengthens submission |
| **P2 - Nice to Have** | Polish items, optional enhancements |
| **P3 - Defer** | Low ROI or out of scope for submission |

---

## P0 — Must Do

| # | Item | Effort | Reward | Notes |
|---|------|--------|--------|-------|
| 1 | **Ecosystem/Partners logo grid section** | 🟢 Low (2-3h) | 🔴 High | Static component, curated logos, hover effects. Explicitly required in brief. |
| 2 | **Live Luma API integration** | 🟡 Medium (3-4h) | 🔴 High | API helper exists (`getLumaUpcomingEvents`). Wire to Events component, replace mock data. |
| 3 | **Dedicated Join CTA section** | 🟢 Low (1-2h) | 🟡 Medium | Simple section above footer with Telegram/Discord/Twitter links. Brief section 9. |
| 4 | **Deploy live demo** | 🟢 Low (1h) | 🔴 High | Vercel deploy, add URL to README. Bonus deliverable that's easy win. |
| 5 | **Past events display** | 🟡 Medium (2-3h) | 🟡 Medium | Add tab or section for past events from Luma. Brief explicitly mentions "highlight past events". |

**P0 Total Effort: ~10-13 hours**

---

## P1 — Should Do

| # | Item | Effort | Reward | Notes |
|---|------|--------|--------|-------|
| 6 | **Animated stat counters** | 🟢 Low (2h) | 🟡 Medium | Framer Motion `useInView` + count-up animation. "Animated counters encouraged" in brief. |
| 7 | **Embedded Luma widget** | 🟡 Medium (2-3h) | 🟡 Medium | Luma provides embed code. Alternative to custom event cards. Brief lists as "optional". |
| 8 | **Partners CMS management** | 🟢 Low (2h) | 🟡 Medium | Sanity schema for partners array (logo, name, url). Enables section 6 to be editable. |
| 9 | **Badge system for members** | 🟡 Medium (3-4h) | 🟡 Medium | Add `badges` column to profiles, display on cards. Differentiator mentioned in brief. |
| 10 | **Architecture diagram** | 🟢 Low (1h) | 🟡 Medium | Mermaid or Excalidraw diagram of Next.js → Sanity/Supabase/Luma. Bonus deliverable. |
| 11 | **"Explore Opportunities" CTA** | 🟢 Low (1h) | 🟡 Medium | Add second hero CTA linking to events or a new opportunities section/page. |

**P1 Total Effort: ~11-15 hours**

---

## P2 — Nice to Have

| # | Item | Effort | Reward | Notes |
|---|------|--------|--------|-------|
| 12 | **Expandable member profiles / modal** | 🟡 Medium (4h) | 🟢 Low | Modal with full bio, all links, contributions. UX polish. |
| 13 | **Real Twitter embeds** | 🟡 Medium (3h) | 🟢 Low | Twitter embed API or oEmbed. Current mock cards look similar enough. |
| 14 | **Calendar-style events interface** | 🟡 Medium (4-5h) | 🟢 Low | Monthly calendar view. Timeline already works well. |
| 15 | **Conditional form logic by role** | 🟡 Medium (3h) | 🟢 Low | Different questions for Institution vs Builder. Marked "optional" in brief. |
| 16 | **Design rationale doc** | 🟡 Medium (2-3h) | 🟢 Low | Notion/PDF explaining design decisions. Bonus deliverable. |
| 17 | **Announcements CMS feature** | 🟡 Medium (3h) | 🟢 Low | Sanity schema + banner component. Not in core brief. |

**P2 Total Effort: ~19-21 hours**

---

## P3 — Defer

| # | Item | Effort | Reward | Notes |
|---|------|--------|--------|-------|
| 18 | **Ecosystem contributions tracking** | 🔴 High (8-10h) | 🟢 Low | Schema changes, data collection pipeline, UI. Cool but heavy lift for "may include". |
| 19 | **Custom admin UI for approvals** | 🔴 High (10-15h) | 🟢 Low | Supabase dashboard works. Full admin app is overkill for submission. |
| 20 | **Automated follow-up emails** | 🔴 High (5-6h) | 🟢 Low | Resend/SendGrid integration. Marked "optional", ops concern not demo. |
| 21 | **Web3 wallet integration** | 🔴 High (8-12h) | 🟢 Low | Brief says "optional". Not needed for marketing site MVP. |

**P3 — Recommend skipping for submission**

---

## Recommended Execution Order

```
Week 1 Focus: P0 (Core Requirements)
├── Day 1: Partners logo grid + Join CTA section
├── Day 2: Wire Luma API to Events component
├── Day 3: Past events display + Vercel deploy
└── Day 4: Test, polish, update README

Week 2 Focus: P1 (Strengthen Submission)
├── Day 1: Animated counters + Explore Opportunities CTA
├── Day 2: Badge system (schema + UI)
├── Day 3: Partners CMS schema + Luma embed option
└── Day 4: Architecture diagram + final QA
```

---

## Effort/Reward Matrix

```
                    REWARD
                Low       Medium      High
         ┌─────────┬──────────┬──────────┐
    Low  │ —       │ #3,#6,   │ #1,#4    │  ◀── START HERE
         │         │ #10,#11  │          │
  E ─────┼─────────┼──────────┼──────────┤
  F Med  │ #12,#13,│ #7,#8,#9 │ #2,#5    │  ◀── THEN HERE
  F      │ #14,#15 │          │          │
  O ─────┼─────────┼──────────┼──────────┤
  R High │ #18,#19,│ —        │ —        │  ◀── SKIP
  T      │ #20,#21 │          │          │
         └─────────┴──────────┴──────────┘
```

---

## Summary

| Tier | Items | Total Effort | Recommendation |
|------|-------|--------------|----------------|
| **P0** | 5 | ~10-13h | Do all — core brief requirements |
| **P1** | 6 | ~11-15h | Do most — strong differentiators |
| **P2** | 6 | ~19-21h | Cherry-pick if time allows |
| **P3** | 4 | ~31-43h | Skip for submission |

**Minimum viable completion: P0 only (~2 days)**

**Recommended completion: P0 + P1 (~4-5 days)**

---

## Reference: Full Gap Analysis

See the detailed comparison table below for context on each gap.

### Landing Page Sections

| Brief Requirement | Status | Current Implementation | Gap |
|---|---|---|---|
| **Hero Section** | ✅ Built | Hero with headline, tagline, Australian design (HeroAusEffect canvas), CTAs | — |
| **Hero CTAs: Get Involved, Explore Opportunities** | ⚠️ Partial | "Get Involved" present; "Explore Opportunities" not explicitly shown | Missing "Explore Opportunities" CTA |
| **Dynamic visuals/animations** | ✅ Built | HeroAusEffect canvas with Australian fauna SVGs | — |
| **Mission / What We Do** | ✅ Built | Five pillars (Builder Support, Capital, Growth, Talent, Institutional) | — |
| **Stats / Impact Section** | ⚠️ Partial | Stats in ticker + events section (members, events, cities) | No **animated counters** as encouraged |
| **Events - Luma Integration** | ⚠️ Partial | Navbar links to Luma calendar; `getLumaUpcomingEvents()` stubbed | No **embedded Luma widget**; no live API data; uses mock events |
| **Events - Past Events** | ❌ Missing | Only upcoming events shown | No past events display |
| **Events - Calendar Interface** | ❌ Missing | Timeline layout only | No calendar-style interface option |
| **Members - Talent Showcase** | ✅ Built | 7 featured profiles from Supabase with photo, name, skills, Twitter | — |
| **Members - Ecosystem Contributions** | ❌ Missing | Not tracked | No hackathon wins, projects built, grants, DAO contributions, bounties |
| **Members - Badge System** | ❌ Missing | — | No Builder/Hackathon Winner/Core Contributor badges |
| **Members - Expandable Profiles/Modal** | ❌ Missing | Card-only display | No expandable or modal views |
| **Members - Featured Contributors** | ⚠️ Partial | Random 7 featured | No explicit "featured" tagging system |
| **Ecosystem / Partners Logo Grid** | ❌ Missing | — | No partners/ecosystem logo grid section |
| **Ecosystem - Hover Effects** | ❌ Missing | — | No colour/scale/glow hover interactions |
| **Community - Embedded Tweets** | ⚠️ Partial | Mock X/Twitter-style posts (curated, not real embeds) | No real Twitter API embeds |
| **Community - Testimonials** | ⚠️ Partial | Mock posts contain testimonial-like content | No structured testimonial section |
| **FAQ** | ✅ Built | 4 questions in Radix accordion (What is ST AU, how to get involved, opportunities, institutions) | — |
| **Join CTA Section** | ⚠️ Partial | Links in footer (Twitter, Telegram, Luma) | No dedicated prominent **Join CTA section** with all socials |
| **Footer** | ✅ Built | Logo, Navigate, Community, Ecosystem links, global Superteam link | — |

### Get Involved Form

| Brief Requirement | Status | Current Implementation | Gap |
|---|---|---|---|
| **Multi-step or single-page form** | ✅ Built | 4-step wizard | — |
| **Clean and fast UX** | ✅ Built | Progress chips, validation, transitions | — |
| **Mobile responsive** | ✅ Built | Responsive layout | — |
| **Name** | ✅ Built | Step 1 | — |
| **Location** | ✅ Built | Step 1 | — |
| **Role / Area** | ✅ Built | Step 2 (Builder, Designer, Founder, Creative, Operator, Institution) | — |
| **Skills** | ✅ Built | Step 3 multi-select | — |
| **Experience level** | ✅ Built | Step 2 (learning → lead) | — |
| **Links (Twitter/X, GitHub, portfolio)** | ✅ Built | Step 3 optional fields | — |
| **What they are looking for** | ✅ Built | Step 4 free text | — |
| **Conditional logic by user type** | ❌ Missing | Same flow for all roles | Different questions per role not implemented |
| **User tagging and segmentation** | ⚠️ Partial | Role/skills stored | No explicit segmentation system beyond raw data |
| **Supabase integration** | ✅ Built | Server action writes to `member_applications` | — |
| **Confirmation screen** | ✅ Built | "You're on the list" panel | — |
| **Follow-up communication** | ❌ Missing | — | No automated follow-up emails |

### Members Page

| Brief Requirement | Status | Current Implementation | Gap |
|---|---|---|---|
| **Full member directory** | ✅ Built | `/members` page | — |
| **Search functionality** | ✅ Built | Text search across name, location, title, skills | — |
| **Skill-based filters** | ✅ Built | Core Team, Rust, Frontend, Design, Content, Growth, Product, Community | — |
| **Member cards: Photo** | ✅ Built | Avatar with initial fallback | — |
| **Member cards: Name** | ✅ Built | `display_name` | — |
| **Member cards: Title** | ✅ Built | Present | — |
| **Member cards: Company** | ✅ Built | Present | — |
| **Member cards: Skills** | ✅ Built | Up to 4 skill chips | — |
| **Member cards: Twitter/X link** | ✅ Built | With @handle label | — |
| **Smooth animations** | ✅ Built | Hover lift/shadow, staggered fade-in | — |

### Technical Requirements

| Brief Requirement | Status | Current Implementation | Gap |
|---|---|---|---|
| **Next.js** | ✅ Built | App Router | — |
| **React** | ✅ Built | — | — |
| **Tailwind CSS** | ✅ Built | — | — |
| **Fully responsive** | ✅ Built | Mobile-first | — |
| **Supabase** | ✅ Built | Members + applications tables, RLS | — |
| **Luma integration** | ⚠️ Partial | URL links only; API helper stubbed | No live event data pulled from Luma API |
| **Twitter/X embeds** | ⚠️ Partial | Mock cards (not real Twitter embed API) | No Twitter API integration |
| **Animation libraries** | ✅ Built | Tailwind animate, custom transitions | — |
| **SEO optimization** | ✅ Built | Metadata, revalidation | — |
| **Web3 integrations** | ❌ Missing | — | No wallet connect or on-chain features |

### CMS Requirements

| Brief Requirement | Status | Current Implementation | Gap |
|---|---|---|---|
| **Add/edit/delete events** | ⚠️ Partial | Sanity schema supports; Luma is actual source | No Sanity-driven event CRUD; relies on Luma |
| **Manage member profiles** | ⚠️ Partial | Supabase admin dashboard manual editing | No custom admin UI for approvals |
| **Update partner logos** | ❌ Missing | No partners section exists | — |
| **Edit landing page content** | ✅ Built | Sanity `home` document + sections | — |
| **Publish announcements** | ❌ Missing | — | No announcements/highlights CMS feature |
| **Headless CMS** | ✅ Built | Sanity | — |
| **Role-based access control** | ⚠️ Partial | Supabase RLS; Sanity has own auth | No custom admin roles |
| **Media uploads** | ✅ Built | Sanity assets | — |
| **Real-time updates** | ⚠️ Partial | Sanity Live in draft mode | — |

### Deliverables

| Brief Requirement | Status | Notes |
|---|---|---|
| **Figma - Landing page (desktop + mobile)** | ❓ Unknown | Not visible in codebase (external deliverable) |
| **Figma - Members page (desktop + mobile)** | ❓ Unknown | Not visible in codebase |
| **Figma - Design system & components** | ❓ Unknown | Not visible in codebase |
| **GitHub Repository** | ✅ Present | Full Next.js codebase |
| **README.md documentation** | ✅ Present | Comprehensive README with stack, install, env vars, deployment |
| **Live demo link** | ❓ Unknown | Not mentioned in README |
| **Architecture diagram** | ❌ Missing | Not found |
| **Design rationale doc** | ❌ Missing | No Notion/PDF/Loom found |
