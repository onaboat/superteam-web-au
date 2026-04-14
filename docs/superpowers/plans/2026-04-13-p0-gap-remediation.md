# P0 Gap Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Partners logo grid, Join CTA section, and Events Luma CTA to close P0 gaps from the brief comparison.

**Architecture:** Config-driven components with TypeScript data files. New UI primitive (OutlineButton) following existing PrimaryButton pattern. Components render conditionally based on config data.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Phosphor Icons

**Spec:** `docs/superpowers/specs/2026-04-13-p0-gap-remediation-design.md`

---

## Task 1: Create OutlineButton UI Component

**Files:**
- Create: `components/ui/outline-button.tsx`

- [ ] **Step 1: Create the OutlineButton component**

Create `components/ui/outline-button.tsx`:

```tsx
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OutlineButtonProps = React.ComponentProps<typeof Button>;

const outlineButtonClass =
  "h-12 border-2 border-primary bg-transparent px-7 text-base font-bold text-foreground hover:bg-primary/20 focus-visible:ring-primary";

function OutlineButton({ className, ...props }: OutlineButtonProps) {
  return <Button className={cn(outlineButtonClass, className)} {...props} />;
}

export { OutlineButton, outlineButtonClass };
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

Expected: No errors related to outline-button.tsx

- [ ] **Step 3: Commit**

```bash
git add components/ui/outline-button.tsx
git commit -m "feat(ui): add OutlineButton component"
```

---

## Task 2: Create Partners Config

**Files:**
- Create: `lib/config/partners.ts`

- [ ] **Step 1: Create config directory**

```bash
mkdir -p lib/config
```

- [ ] **Step 2: Create partners config file**

Create `lib/config/partners.ts`:

```typescript
export interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export const PARTNERS: Partner[] = [
  // Populated when partner logos are provided
  // Example:
  // {
  //   id: "solana",
  //   name: "Solana",
  //   logo: "/partners/solana.svg",
  //   url: "https://solana.com",
  // },
];
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add lib/config/partners.ts
git commit -m "feat(config): add partners data config"
```

---

## Task 3: Create Partners Component

**Files:**
- Create: `components/partners.tsx`
- Create: `public/partners/.gitkeep`

- [ ] **Step 1: Create partners directory for assets**

```bash
mkdir -p public/partners
touch public/partners/.gitkeep
```

- [ ] **Step 2: Create Partners component**

Create `components/partners.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";

import { PARTNERS } from "@/lib/config/partners";

export function Partners() {
  if (PARTNERS.length === 0) {
    return null;
  }

  return (
    <section
      id="partners"
      className="w-full scroll-mt-24 bg-background py-14 sm:py-18"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-16">
        <h2 className="text-4xl font-black leading-none text-chart-1 sm:text-5xl">
          Ecosystem & Partners
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {PARTNERS.map((partner) => (
            <Link
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center border-2 border-transparent bg-primary/20 p-6 transition-all hover:border-chart-1 hover:bg-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chart-1 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={80}
                className="h-12 w-auto object-contain grayscale transition-all group-hover:scale-105 group-hover:grayscale-0 sm:h-16"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add components/partners.tsx public/partners/.gitkeep
git commit -m "feat: add Partners logo grid component"
```

---

## Task 4: Create JoinCta Config

**Files:**
- Create: `lib/config/join-cta.ts`

- [ ] **Step 1: Create join-cta config file**

Create `lib/config/join-cta.ts`:

```typescript
export interface JoinButton {
  id: string;
  label: string;
  href: string;
  external: boolean;
}

export const JOIN_CTA = {
  headline: "Ready to join",
  subheadline: "Everything you need to know about Superteam Australia.",
  buttons: [
    {
      id: "get-involved",
      label: "Get Involved",
      href: "/get-involved",
      external: false,
    },
    {
      id: "telegram",
      label: "Join Telegram",
      href: "https://t.me/SuperteamAU",
      external: true,
    },
    {
      id: "twitter",
      label: "Follow on X",
      href: "https://x.com/SuperteamAU",
      external: true,
    },
  ] satisfies JoinButton[],
} as const;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add lib/config/join-cta.ts
git commit -m "feat(config): add join CTA content config"
```

---

## Task 5: Create JoinCta Component

**Files:**
- Create: `components/join-cta.tsx`

- [ ] **Step 1: Create JoinCta component**

Create `components/join-cta.tsx`:

```tsx
import Link from "next/link";

import { OutlineButton } from "@/components/ui/outline-button";
import { JOIN_CTA } from "@/lib/config/join-cta";

export function JoinCta() {
  return (
    <section className="w-full bg-background py-14 sm:py-18">
      <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-10 lg:px-16">
        <h2 className="text-4xl font-black italic leading-tight text-chart-1 sm:text-5xl">
          {JOIN_CTA.headline}
        </h2>
        <p className="mt-4 text-xl font-bold text-foreground">
          {JOIN_CTA.subheadline}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {JOIN_CTA.buttons.map((button) =>
            button.external ? (
              <OutlineButton key={button.id} asChild>
                <a
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {button.label}
                </a>
              </OutlineButton>
            ) : (
              <OutlineButton key={button.id} asChild>
                <Link href={button.href}>{button.label}</Link>
              </OutlineButton>
            )
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add components/join-cta.tsx
git commit -m "feat: add JoinCta section component"
```

---

## Task 6: Enhance Events with Luma CTA

**Files:**
- Modify: `components/events.tsx`

- [ ] **Step 1: Add imports to events.tsx**

At the top of `components/events.tsx`, add these imports after the existing ones:

```tsx
import { ArrowSquareOut } from "@phosphor-icons/react/ssr";

import { PrimaryButton } from "@/components/ui/primary-button";
import { LUMA_CALENDAR_URL } from "@/lib/luma";
```

- [ ] **Step 2: Add Luma CTA after timeline**

In the `Events` component, add the CTA inside the section, after the closing `</div>` of the grid container (after line ~119 where the grid div closes):

Find this closing structure:
```tsx
          </div>
        </div>
      </div>
    </section>
```

Change it to:
```tsx
          </div>
        </div>

        <div className="mt-8 flex justify-center lg:justify-start">
          <PrimaryButton asChild>
            <a
              href={LUMA_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              View all events on Luma
              <ArrowSquareOut className="size-5" weight="bold" />
            </a>
          </PrimaryButton>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add components/events.tsx
git commit -m "feat(events): add View all on Luma CTA button"
```

---

## Task 7: Integrate New Sections into Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add imports to page.tsx**

At the top of `app/page.tsx`, add these imports with the other component imports:

```tsx
import { JoinCta } from "@/components/join-cta";
import { Partners } from "@/components/partners";
```

- [ ] **Step 2: Add Partners section after Builders**

In the JSX, find the `<Builders />` component and add `<Partners />` after it:

Change:
```tsx
            <Suspense fallback={<BuildersSectionSkeleton />}>
              <Builders />
            </Suspense>
            <Community />
```

To:
```tsx
            <Suspense fallback={<BuildersSectionSkeleton />}>
              <Builders />
            </Suspense>
            <Partners />
            <Community />
```

- [ ] **Step 3: Add JoinCta section after Faq**

Find the `<Faq />` component and add `<JoinCta />` after it:

Change:
```tsx
            <Faq />
          </>
        )}
      </main>
```

To:
```tsx
            <Faq />
            <JoinCta />
          </>
        )}
      </main>
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): integrate Partners and JoinCta sections"
```

---

## Task 8: Visual Verification

**Files:** None (manual testing)

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify Events Luma CTA**

Open http://localhost:3000

Scroll to Events section. Verify:
- "View all events on Luma" button appears below the timeline
- Button has gold shadow styling (PrimaryButton)
- Clicking opens https://luma.com/SuperteamAU in new tab
- Arrow icon displays next to text

- [ ] **Step 3: Verify Partners section (empty state)**

Scroll down page. Verify:
- Partners section is NOT visible (because PARTNERS array is empty)
- No layout gaps or broken rendering

- [ ] **Step 4: Verify JoinCta section**

Scroll to bottom of page (above footer). Verify:
- "Ready to join" headline in gold italic
- Subheadline text below
- Three buttons: "Get Involved", "Join Telegram", "Follow on X"
- Buttons have green outline styling
- "Get Involved" navigates to /get-involved
- External links open in new tabs

- [ ] **Step 5: Test responsiveness**

Resize browser window to mobile width (~375px). Verify:
- JoinCta buttons stack vertically
- All text remains readable
- No horizontal overflow

- [ ] **Step 6: Run production build**

```bash
npm run build
```

Expected: Build completes successfully with no errors

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "chore: verify P0 gap remediation complete"
```

---

## Task 9: Test Partners with Sample Data (Optional)

**Files:**
- Modify: `lib/config/partners.ts`
- Create: `public/partners/placeholder.svg`

This task demonstrates the Partners section works when populated. Run this to verify, then revert if you don't have real partner logos yet.

- [ ] **Step 1: Create placeholder SVG**

Create `public/partners/placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" fill="none">
  <rect width="160" height="80" rx="4" fill="#1a1a1a"/>
  <text x="80" y="45" text-anchor="middle" fill="#666" font-family="system-ui" font-size="14">Partner Logo</text>
</svg>
```

- [ ] **Step 2: Add sample partner data**

Update `lib/config/partners.ts` to add sample entries:

```typescript
export const PARTNERS: Partner[] = [
  {
    id: "partner-1",
    name: "Partner 1",
    logo: "/partners/placeholder.svg",
    url: "https://example.com",
  },
  {
    id: "partner-2",
    name: "Partner 2",
    logo: "/partners/placeholder.svg",
    url: "https://example.com",
  },
  {
    id: "partner-3",
    name: "Partner 3",
    logo: "/partners/placeholder.svg",
    url: "https://example.com",
  },
  {
    id: "partner-4",
    name: "Partner 4",
    logo: "/partners/placeholder.svg",
    url: "https://example.com",
  },
];
```

- [ ] **Step 3: Verify Partners section displays**

Open http://localhost:3000

Scroll to Partners section (after Builders). Verify:
- "Ecosystem & Partners" heading visible
- 4 partner cards in grid
- Cards have grayscale filter
- Hover shows color + scale effect
- Links open in new tab

- [ ] **Step 4: Revert sample data (if not keeping)**

If you don't want placeholder data in production:

```bash
git checkout lib/config/partners.ts
rm public/partners/placeholder.svg
```

Or commit if keeping for demo:

```bash
git add lib/config/partners.ts public/partners/placeholder.svg
git commit -m "feat(partners): add placeholder data for demo"
```

---

## Summary

| Task | Component | Status |
|------|-----------|--------|
| 1 | OutlineButton UI | ⬜ |
| 2 | Partners config | ⬜ |
| 3 | Partners component | ⬜ |
| 4 | JoinCta config | ⬜ |
| 5 | JoinCta component | ⬜ |
| 6 | Events Luma CTA | ⬜ |
| 7 | Page integration | ⬜ |
| 8 | Visual verification | ⬜ |
| 9 | Partners sample data (optional) | ⬜ |

**Estimated time:** 45-60 minutes

**After completion:** Push to trigger Vercel deploy, verify at https://superteam-aus-web.vercel.app/
