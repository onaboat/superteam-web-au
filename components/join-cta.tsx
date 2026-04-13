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
