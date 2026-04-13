import { Builders } from "@/components/builders";
import { Community } from "@/components/community";
import { Events } from "@/components/events";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
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
        return <Builders key={block._key} />;
      case "communitySection":
        return <Community key={block._key} />;
      case "faqSection":
        return <Faq key={block._key} />;
      default:
        console.warn("Unknown home section block:", block);
        return null;
    }
  });
}
