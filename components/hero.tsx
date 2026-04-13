import Image from "next/image";

import { HeroAusEffect } from "@/components/auseffect/hero-auseffect";
import type { HeroSectionBlock } from "@/lib/sanity/types";

const defaultCopy = {
  headlineLine1: "Australia's Home",
  headlineLine2Prefix: "for",
  headlineLine3: "Builders",
  tagline:
    "Accelerating founders, creatives & institutions driving internet capital markets on solana",
} as const;

type HeroProps = {
  block?: Pick<
    HeroSectionBlock,
    "headlineLine1" | "headlineLine2Prefix" | "headlineLine3" | "tagline"
  > | null;
};

export function Hero({ block }: HeroProps) {
  const headlineLine1 = block?.headlineLine1?.trim() || defaultCopy.headlineLine1;
  const headlineLine2Prefix =
    block?.headlineLine2Prefix?.trim() || defaultCopy.headlineLine2Prefix;
  const headlineLine3 = block?.headlineLine3?.trim() || defaultCopy.headlineLine3;
  const tagline = block?.tagline?.trim() || defaultCopy.tagline;

  return (
    <section className="relative w-full overflow-hidden bg-hero">
      <HeroAusEffect />
      <div className="mx-auto flex min-h-[min(70vh,680px)] w-full max-w-6xl items-start px-5 pb-14 pt-28 sm:px-10 sm:pb-18 sm:pt-32 lg:px-16 lg:pt-36">
        <div className="relative z-10 max-w-[820px] space-y-6 sm:space-y-10">
          <h1 className="text-[44px] leading-[0.95] font-black text-black sm:text-[62px] lg:text-[84px]">
            <span className="block">{headlineLine1}</span>
            <span className="block">
              {headlineLine2Prefix}{" "}
              <Image
                alt="Solana"
                src="/Solana-logo.svg"
                width={360}
                height={53}
                className="mb-1 inline-block h-auto w-[170px] align-baseline sm:mb-2 sm:w-[230px] lg:w-[320px]"
                priority
              />
            </span>
            <span className="block italic">{headlineLine3}</span>
          </h1>

          <p className="max-w-[760px] text-[22px] leading-[1.08] font-bold text-black sm:text-[34px] lg:text-[54px]">
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
