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
