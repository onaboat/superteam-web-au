import Image from "next/image";
import Link from "next/link";

import { PrimaryButton } from "@/components/ui/primary-button";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Events", href: "/#events" },
  { label: "Members", href: "/members" },
  { label: "FAQ", href: "/#faq" },
] as const;

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-3 py-4 sm:px-4 sm:py-5">
        <Link
          href="/"
          className="inline-flex h-12 items-center border-2 border-chart-1 bg-chart-1 px-3"
          aria-label="Superteam Australia home"
        >
          <Image
            src="/SuperTeamAusFlag.png"
            alt="Superteam Australia"
            width={160}
            height={33}
            priority
            className="h-auto"
          />
        </Link>

        <div className="flex items-center gap-2">
          <nav
            className="hidden h-12 items-center bg-primary px-5 lg:flex"
            aria-label="Primary"
          >
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                {...(item.href.startsWith("http")
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
                className="text-base font-bold text-chart-1 transition-opacity hover:opacity-90 xl:text-lg"
              >
                {item.label}
                {index < navItems.length - 1 && <span className="mx-5 inline-block xl:mx-8" />}
              </Link>
            ))}
          </nav>

          <PrimaryButton asChild className="h-10 px-4 text-sm sm:h-12 sm:px-7 sm:text-lg">
            <Link href="/get-involved">Get Involved</Link>
          </PrimaryButton>
        </div>
      </div>
    </header>
  );
}
