import { Suspense } from "react";

import { Builders, BuildersSectionSkeleton } from "@/components/builders";
import { Community } from "@/components/community";
import { Events } from "@/components/events";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { JoinCta } from "@/components/join-cta";
import { Partners } from "@/components/partners";
import { Ticker } from "@/components/ticker";
import { WhatWeDo } from "@/components/what-we-do";
import type { HomeSectionBlock } from "@/lib/sanity/types";

export function PageSections({ sections }: { sections: HomeSectionBlock[] }) {
  return sections.map((block) => {
    switch (block._type) {
      case "heroSection":
        return <Hero key={block._key} block={block} />;
      case "tickerSection":
        return <Ticker key={block._key} />;
      case "whatWeDoSection":
        return <WhatWeDo key={block._key} />;
      case "eventsSection":
        return <Events key={block._key} />;
      case "buildersSection":
        return (
          <Suspense key={block._key} fallback={<BuildersSectionSkeleton />}>
            <Builders />
          </Suspense>
        );
      case "partnersSection":
        return <Partners key={block._key} />;
      case "communitySection":
        return <Community key={block._key} />;
      case "faqSection":
        return <Faq key={block._key} />;
      case "joinCtaSection":
        return <JoinCta key={block._key} />;
      default:
        console.warn("Unknown home section block:", block);
        return null;
    }
  });
}
