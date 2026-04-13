import { Suspense } from "react";

import { Builders, BuildersSectionSkeleton } from "@/components/builders";
import { Community } from "@/components/community";
import { Events } from "@/components/events";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { PageSections } from "@/components/page-sections";
import { Ticker } from "@/components/ticker";
import { WhatWeDo } from "@/components/what-we-do";
import { fetchHomePage } from "@/lib/sanity/fetch-home-page";
import type { HomeSectionBlock } from "@/lib/sanity/types";

/** Revalidate home when Sanity content changes (tune or switch to webhook revalidation later). */
export const revalidate = 60;

export default async function Home() {
  const home = await fetchHomePage();
  const sections = (home?.sections ?? []).filter(
    (b): b is HomeSectionBlock => Boolean(b?._key && b?._type),
  );
  const useSanityLayout = sections.length > 0;

  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans">
      <Navbar />
      <main className="flex w-full flex-1 flex-col">
        {useSanityLayout ? (
          <PageSections sections={sections} />
        ) : (
          <>
            <Hero />
            <Ticker />
            <WhatWeDo />
            <Events />
            <Suspense fallback={<BuildersSectionSkeleton />}>
              <Builders />
            </Suspense>
            <Community />
            <Faq />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
