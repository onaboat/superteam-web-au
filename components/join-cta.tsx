import Link from "next/link";

import { OutlineButton } from "@/components/ui/outline-button";
import { PrimaryButton } from "@/components/ui/primary-button";
import { JOIN_CTA } from "@/lib/config/join-cta";

export function JoinCta() {
  return (
    <section className="w-full bg-background py-14 sm:py-18">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-10 lg:px-16">
        <h2 className="text-headingbig ">
          {JOIN_CTA.headline}
        </h2>
        <p className="mt-4 text-subheading ">
          {JOIN_CTA.subheadline}
        </p>

        <div className="mt-8 flex flex-wrap justify-start gap-4">
          {JOIN_CTA.buttons.map((button) =>
            button.external ? (
              <PrimaryButton key={button.id} asChild className="h-10 px-4 text-sm sm:h-12 sm:px-7 sm:text-lg">
                <a
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {button.label}
                </a>
              </PrimaryButton>
            ) : (
              <PrimaryButton key={button.id} asChild className="h-10 px-4 text-sm sm:h-12 sm:px-7 sm:text-lg">
                <Link href={button.href}>{button.label}</Link>
              </PrimaryButton>
            )
          )}
        </div>
      </div>
    </section>
  );
}
