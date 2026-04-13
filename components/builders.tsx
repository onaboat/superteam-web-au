import Image from "next/image";
import Link from "next/link";

import { MemberCard } from "@/components/member-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { getFeaturedProfiles } from "@/lib/data/members";
import { MOCK_MEMBER_CARDS } from "@/lib/members/mock-builders";
import { isSupabaseReadConfigured } from "@/lib/supabase/env";
import { rowToCardModel } from "@/lib/members/types";

export function BuildersSectionSkeleton() {
  return (
    <section className="w-full bg-background py-14 sm:py-18">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-16">
        <div className="h-12 max-w-md animate-pulse bg-chart-1/20" />
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-[260px] animate-pulse border-2 border-chart-1/30 bg-primary/20"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export async function Builders() {
  const readConfigured = isSupabaseReadConfigured();
  const rows = readConfigured ? await getFeaturedProfiles(7) : [];
  const useLive = readConfigured && rows.length > 0;
  const members = useLive
    ? rows.map((r) => rowToCardModel(r))
    : !readConfigured
      ? MOCK_MEMBER_CARDS
      : [];

  return (
    <section
      id="members"
      className="w-full scroll-mt-24 bg-background py-14 sm:py-18"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-16">
        <h2 className="flex flex-wrap items-center gap-3 text-4xl font-black leading-none text-chart-1 sm:text-5xl lg:gap-4">
          <span>Australian</span>
          <Image
            src="/build%20Images/SolanaLogoY.svg"
            alt="Solana"
            width={71}
            height={63}
            className="h-7 w-auto sm:h-9 lg:h-10"
          />
          <span>Builders</span>
        </h2>

        {readConfigured && rows.length === 0 ? (
          <div className="mt-10 border-2 border-dashed border-chart-1/60 bg-primary/25 px-5 py-10 text-center sm:px-8">
            <p className="text-base font-bold text-chart-1 sm:text-lg">
              Member spotlights go live here after profiles are published.
            </p>
            <p className="mt-2 text-sm text-foreground/90">
              Submit Get Involved — the team adds approved members to the directory.
            </p>
            <PrimaryButton asChild className="mt-6">
              <Link href="/get-involved">Get involved</Link>
            </PrimaryButton>
            <p className="mt-4 text-xs text-muted-foreground">
              <Link href="/members" className="underline underline-offset-2 hover:text-chart-1">
                Browse the full directory
              </Link>
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-2">
            {members.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        )}

        <div
          id="get-involved"
          className="mt-5 grid scroll-mt-24 grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:mt-4 lg:grid-cols-7 lg:gap-2"
        >
          <PrimaryButton asChild className="w-full border-2 border-chart-1 sm:w-auto lg:w-full">
            <Link href="/get-involved">Join now</Link>
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
