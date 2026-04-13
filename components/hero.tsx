import Image from "next/image";

import { HeroAusEffect } from "@/components/auseffect/hero-auseffect";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-hero">
      <HeroAusEffect />
      <div className="mx-auto flex min-h-[min(70vh,680px)] w-full max-w-6xl items-start px-5 pb-14 pt-28 sm:px-10 sm:pb-18 sm:pt-32 lg:px-16 lg:pt-36">
        <div className="relative z-10 max-w-[820px] space-y-6 sm:space-y-10">
          <h1 className="text-[44px] leading-[0.95] font-black text-black sm:text-[62px] lg:text-[84px]">
            <span className="block">Australia&apos;s Home</span>
            <span className="block">
              for{" "}
              <Image
                alt="Solana"
                src="/Solana-logo.svg"
                width={360}
                height={53}
                className="mb-1 inline-block h-auto w-[170px] align-baseline sm:mb-2 sm:w-[230px] lg:w-[320px]"
                priority
              />
            </span>
            <span className="block italic">Builders</span>
          </h1>

          <p className="max-w-[760px] text-[22px] leading-[1.08] font-bold text-black sm:text-[34px] lg:text-[54px]">
            Accelerating founders, creatives & institutions driving internet
            capital markets on solana
          </p>
        </div>
      </div>
    </section>
  );
}
