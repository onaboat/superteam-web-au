# P0 Gap Remediation Design Spec

**Date:** 2026-04-13  
**Status:** Approved  
**Scope:** Address P0 gaps from brief comparison — Partners grid, Join CTA, Events Luma CTA

---

## Overview

This spec covers the implementation of three new components and one enhancement to close the P0 gaps identified in `docs/gap-remediation-plan.md`.

### Items in Scope

| # | Item | Type |
|---|------|------|
| 1 | Ecosystem/Partners logo grid | New section |
| 2 | Join CTA section | New section |
| 3 | Events Luma CTA | Enhancement |
| 4 | Deploy live demo | Already complete (superteam-aus-web.vercel.app) |
| 5 | Past events display | Descoped — focus on upcoming only |

### Approach

**Hybrid (Config + CMS-ready):** Content lives in TypeScript config files for fast iteration. Structure supports future migration to Sanity CMS by swapping data sources.

---

## 1. Partners Logo Grid

### Location

After Builders section, before Community section.

### Data Source

**File:** `lib/config/partners.ts`

```typescript
export interface Partner {
  name: string;
  logo: string;  // Path to SVG in /public/partners/
  url: string;
}

export const PARTNERS: Partner[] = [
  // To be populated with real partner data
  // { name: "Example", logo: "/partners/example.svg", url: "https://example.com" },
];
```

### Component

**File:** `components/partners.tsx`

**Behavior:**
- Section hidden if `PARTNERS.length === 0`
- Responsive grid: 4 cols (lg), 3 cols (md), 2 cols (sm)
- Logo styling: grayscale by default, full color on hover
- Hover effects: `scale-105`, subtle glow/shadow
- Each logo links to partner URL (opens new tab)
- Accessible: proper alt text, focus states

**Markup structure:**
```tsx
<section id="partners" className="w-full bg-background py-14 sm:py-18">
  <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-16">
    <h2>Ecosystem & Partners</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Partner logos */}
    </div>
  </div>
</section>
```

**Styling tokens:**
- Background: `bg-background`
- Title: `text-chart-1`, `text-4xl font-black`
- Logo hover: `hover:scale-105 transition-transform`
- Grayscale: `grayscale hover:grayscale-0`

### Assets

Directory: `/public/partners/`

Placeholder SVGs until real logos provided. Recommended dimensions: 160x80px or similar aspect ratio.

---

## 2. Join CTA Section

### Location

After FAQ section, before Footer.

### Data Source

**File:** `lib/config/join-cta.ts`

```typescript
export interface JoinButton {
  label: string;
  href: string;
  external?: boolean;  // Opens in new tab if true
}

export const JOIN_CTA = {
  headline: "Ready to join",
  subheadline: "Everything you need to know about Superteam Australia.",
  buttons: [
    { label: "Get Involved", href: "/get-involved", external: false },
    { label: "Join Telegram", href: "https://t.me/SuperteamAU", external: true },
    { label: "Follow on X", href: "https://x.com/SuperteamAU", external: true },
  ] as JoinButton[],
} as const;
```

### Component

**File:** `components/join-cta.tsx`

**Markup structure:**
```tsx
<section className="w-full bg-background py-14 sm:py-18">
  <div className="mx-auto w-full max-w-4xl px-5 sm:px-10 lg:px-16 text-center">
    <h2>Ready to join</h2>
    <p>Everything you need to know about Superteam Australia.</p>
    <div className="flex flex-wrap justify-center gap-4">
      {/* Buttons */}
    </div>
  </div>
</section>
```

**Styling tokens:**
- Background: `bg-background`
- Headline: `text-chart-1`, `text-4xl font-black italic`
- Subheadline: `text-foreground`, `text-xl font-bold`
- Buttons: Use `OutlineButton` component (see below)

### New UI Component

**File:** `components/ui/outline-button.tsx`

Wraps `Button` with brand-specific outline styling to match the screenshot reference.

```typescript
const outlineButtonClass =
  "h-12 border-2 border-primary bg-transparent px-7 text-base font-bold text-foreground hover:bg-primary/20 focus-visible:ring-primary";
```

**Pattern:** Follows existing `PrimaryButton` wrapper pattern.

---

## 3. Events Luma CTA Enhancement

### Location

Within existing `components/events.tsx`, below the event timeline.

### Data Source

**File:** `lib/luma.ts` (existing)

Already has the constant:
```typescript
export const LUMA_CALENDAR_URL = "https://luma.com/SuperteamAU";
```

No new file needed — import from existing module.

### Changes to Events Component

**File:** `components/events.tsx`

Add a CTA button after the timeline:

```tsx
<div className="mt-8 text-center">
  <PrimaryButton asChild>
    <a href={LUMA_CALENDAR_URL} target="_blank" rel="noopener noreferrer">
      View all events on Luma
      <ArrowSquareOut className="ml-2 size-4" />
    </a>
  </PrimaryButton>
</div>
```

**Behavior:**
- Opens Luma calendar in new tab
- Uses existing `PrimaryButton` for consistency
- Icon: `ArrowSquareOut` from Phosphor icons (already in use)

---

## 4. Page Integration

### Modified File

**File:** `app/page.tsx`

### Updated Section Order

```tsx
<Navbar />
<main>
  <Hero />
  <Ticker />
  <WhatWeDo />
  <Events />           {/* Enhanced with Luma CTA */}
  <Builders />
  <Partners />         {/* NEW */}
  <Community />
  <Faq />
  <JoinCta />          {/* NEW */}
</main>
<Footer />
```

### Imports to Add

```tsx
import { Partners } from "@/components/partners";
import { JoinCta } from "@/components/join-cta";
```

---

## File Summary

### New Files

| Path | Purpose |
|------|---------|
| `lib/config/partners.ts` | Partner logo data |
| `lib/config/join-cta.ts` | Join CTA content |
| `components/partners.tsx` | Partners logo grid section |
| `components/join-cta.tsx` | Join CTA section |
| `components/ui/outline-button.tsx` | Outline button variant |

### Modified Files

| Path | Changes |
|------|---------|
| `components/events.tsx` | Add "View all on Luma" CTA button |
| `app/page.tsx` | Import and render Partners, JoinCta sections |

### Assets

| Path | Purpose |
|------|---------|
| `public/partners/` | Directory for partner logo SVGs |

---

## Design Tokens Reference

From `globals.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--chart-1` | Gold/yellow | Primary accent, headlines |
| `--primary` | Green | Button backgrounds |
| `--background` | #0a0a0a | Section backgrounds |
| `--foreground` | White | Body text |
| `--muted-foreground` | Gray | Secondary text |

**Component patterns:**
- Sharp corners: `rounded-none`
- Primary button shadow: `shadow-[3px_3px_0_0_var(--color-chart-1)]`
- Section padding: `py-14 sm:py-18`
- Container: `mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-16`

---

## Testing Checklist

- [ ] Partners section hidden when `PARTNERS` array empty
- [ ] Partners section displays when populated
- [ ] Partner logos grayscale → color on hover
- [ ] Partner links open in new tab
- [ ] Join CTA buttons render correctly
- [ ] Join CTA external links open in new tab
- [ ] Events Luma CTA opens lu.ma in new tab
- [ ] All sections responsive (mobile, tablet, desktop)
- [ ] Keyboard navigation works for all interactive elements
- [ ] No layout shifts or visual regressions

---

## Future Migration Path

To migrate config files to Sanity CMS:

1. Create Sanity schemas for `partner` and `joinCta` document types
2. Add fetcher functions in `lib/sanity/`
3. Update components to accept data as props
4. Fetch from Sanity in page/layout, pass to components
5. Remove config files once Sanity is source of truth

The component interfaces remain stable — only the data source changes.
