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
    <section className="w-full bg-background ">
      <div className="builders-shell">
        <div className="h-12 max-w-md animate-pulse bg-chart-1/20" />
        <div className="builders-member-grid mt-10">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="builders-skeleton-cell" />
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
      <div className="builders-shell">
        <h2 className="text-headingbig inline-flex items-baseline gap-2 whitespace-nowrap">
          <Image
            src="/build%20Images/SolanaLogoY.svg"
            alt="Solana"
            width={60}
            height={60}
            className="h-[0.70em] w-auto shrink-0 self-baseline"
          />
          <span>&nbsp;Builders Australia</span>
        </h2>

        {readConfigured && rows.length === 0 ? (
          <div className="mt-10 border-2 border-dashed border-chart-1/60 bg-primary/25 px-5 py-10 text-left sm:px-8">
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
          <div className="builders-member-grid mt-10">
            {members.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        )}

        <div id="get-involved" className="builders-cta-row">
          <PrimaryButton asChild className="w-full sm:w-auto">
            <Link href="/get-involved">Join now</Link>
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}