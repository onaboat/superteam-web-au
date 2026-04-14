"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { MemberCard } from "@/components/member-card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Input } from "@/components/ui/input";
import { SKILL_FILTER_OPTIONS } from "@/lib/members/constants";
import type { MemberProfileRow } from "@/lib/members/types";
import { rowToCardModel } from "@/lib/members/types";

type Props = {
  profiles: MemberProfileRow[];
};

export function MembersDirectory({ profiles }: Props) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  };

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    let list = profiles;

    if (term) {
      list = list.filter((p) => {
        const hay = [
          p.display_name,
          p.location ?? "",
          p.title ?? "",
          p.company ?? "",
          ...(p.skills ?? []),
          ...(p.skill_filters ?? []),
          p.looking_for ?? "",
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(term);
      });
    }

    if (activeFilters.length > 0) {
      const sel = new Set(activeFilters);
      list = list.filter((p) => {
        const tags = [...(p.skill_filters ?? []), ...(p.skills ?? [])];
        return tags.some((t) => sel.has(t));
      });
    }

    return list;
  }, [profiles, query, activeFilters]);

  const cards = useMemo(
    () => filtered.map((row) => rowToCardModel(row)),
    [filtered],
  );

  if (profiles.length === 0) {
    return (
      <div className="border-2 border-chart-1 bg-primary/40 px-6 py-14 text-center sm:px-10">
        <p className="text-xl font-black text-chart-1 sm:text-2xl">
          Directory coming online
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-foreground sm:text-base">
          Public profiles are added manually after the team reviews Get Involved submissions.
          Apply to be considered — no spam, no auto-listing.
        </p>
        <PrimaryButton asChild className="mt-8">
          <Link href="/get-involved">Get involved</Link>
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <label className="block max-w-md flex-1 space-y-2">
          <span className="text-sm font-bold text-chart-1">Search</span>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, location, skills…"
            aria-label="Search members"
          />
        </label>
      </div>

      <div>
        <p className="text-sm font-bold text-chart-1">Filter by skill area</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SKILL_FILTER_OPTIONS.map((f) => {
            const on = activeFilters.includes(f);
            return (
              <button
                key={f}
                type="button"
                onClick={() => toggleFilter(f)}
                className={`border-2 px-2.5 py-1 text-xs font-bold transition-colors sm:text-sm ${
                  on
                    ? "border-chart-1 bg-chart-1 text-black"
                    : "border-chart-1/50 bg-background text-chart-1 hover:border-chart-1"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {cards.length === 0 ? (
        <div className="border-2 border-dashed border-chart-1/50 bg-primary/30 px-6 py-12 text-center">
          <p className="text-lg font-bold text-chart-1">No matches yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try different keywords or clear filters — or check back as new members are published.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-3">
          {cards.map((m, i) => (
            <li
              key={m.id}
              className="animate-in fade-in duration-300"
              style={{ animationDelay: `${Math.min(i, 12) * 35}ms` }}
            >
              <MemberCard member={m} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
