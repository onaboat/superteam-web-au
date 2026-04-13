import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { MemberCardModel } from "@/lib/members/types";

function twitterHandleLabel(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/^\//, "");
    const seg = path.split("/").filter(Boolean)[0];
    if (seg) return `@${seg}`;
    return "X / Twitter";
  } catch {
    return "X / Twitter";
  }
}

export function MemberCard({ member }: { member: MemberCardModel }) {
  const displayTags =
    member.skills.filter(Boolean).slice(0, 4).length > 0
      ? member.skills.filter(Boolean).slice(0, 4)
      : ["Member"];

  return (
    <Card className="flex h-full min-h-[260px] w-full min-w-0 flex-col border-2 border-chart-1 bg-primary p-3 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-chart-1)] sm:min-h-[272px] sm:p-4">
      <CardContent className="flex flex-1 flex-col gap-0 p-0">
        <Avatar square size="lg" className="mx-auto size-12 sm:size-14">
          {member.photoUrl ? (
            <AvatarImage src={member.photoUrl} alt="" />
          ) : (
            <AvatarFallback className="rounded-none bg-chart-5 text-chart-1">
              {member.name.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        <h3 className="mt-3 w-full break-words text-left text-sm font-bold leading-snug text-chart-1 sm:mt-4 sm:text-base">
          {member.name}
        </h3>
        {member.title ? (
          <p className="mt-1 w-full break-words text-left text-xs font-normal leading-snug text-chart-1 sm:text-sm">
            {member.title}
          </p>
        ) : null}
        {member.company ? (
          <p className="mt-0.5 w-full break-words text-left text-[11px] font-medium leading-snug text-foreground/80 sm:text-xs">
            {member.company}
          </p>
        ) : null}

        <div className="mt-3 flex flex-wrap justify-start gap-1.5 sm:mt-4 sm:gap-2">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="border border-chart-1 bg-chart-5 px-1.5 py-px text-[10px] font-medium leading-tight text-chart-1 sm:px-2 sm:py-0.5 sm:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-auto pt-4 text-left text-xs text-foreground sm:pt-5 sm:text-sm">
          {member.twitterUrl ? (
            <Link
              href={member.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline-offset-2 hover:underline"
            >
              {twitterHandleLabel(member.twitterUrl)}
            </Link>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
