import Image from "next/image";
import Link from "next/link";

const NAVIGATE_LINKS = [
  { label: "About", href: "#" },
  { label: "Members", href: "#" },
  { label: "Frequently asked questions", href: "#" },
  { label: "Get Involved", href: "#" },
] as const;

const COMMUNITY_LINKS = [
  { label: "Twitter / X", href: "https://x.com" },
  { label: "Telegram", href: "#" },
  { label: "Luma", href: "#" },
] as const;

const ECOSYSTEM_LINKS = [
  { label: "Superteam Global", href: "#" },
  { label: "Solana", href: "https://solana.com" },
  { label: "Superteam Earn", href: "#" },
] as const;

export function Footer() {
  return (
    <footer className="w-full bg-chart-1 text-black">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
          <div className="relative h-36 w-36 shrink-0 sm:h-40 sm:w-40">
            <Image
              src="/Logo%20-%20Primary-STA.svg"
              alt="Superteam Australia"
              width={160}
              height={160}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
            <div>
              <h3 className="text-base font-bold">Navigate</h3>
              <ul className="mt-4 space-y-2">
                {NAVIGATE_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm font-normal underline underline-offset-2 hover:opacity-80"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold">Community</h3>
              <ul className="mt-4 space-y-2">
                {COMMUNITY_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm font-normal underline underline-offset-2 hover:opacity-80"
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold">Ecosystem</h3>
              <ul className="mt-4 space-y-2">
                {ECOSYSTEM_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm font-normal underline underline-offset-2 hover:opacity-80"
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-14 max-w-5xl text-2xl font-bold leading-tight sm:mt-16 sm:text-3xl lg:text-4xl">
          Accelerating founders, creatives & institutions driving internet
          capital markets on solana
        </p>
      </div>
    </footer>
  );
}
