import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card className="member-card">
      <CardHeader className="member-card-header">
        <Avatar square size="lg" className="size-20 shrink-0 sm:size-24">
          {member.photoUrl ? (
            <AvatarImage src={member.photoUrl} alt=""  />
          ) : null}
          <AvatarFallback className="rounded-none bg-chart-5 text-chart-1">
            {member.name.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <CardTitle className="member-card-title">{member.name}</CardTitle>
        {member.title ? (
          <CardDescription className="member-card-desc">
            {member.title}
          </CardDescription>
        ) : null}
        {member.company ? (
          <p className="member-card-company">{member.company}</p>
        ) : null}
      </CardHeader>

      <CardContent className="member-card-content">
        <div className="member-card-tags">
          {displayTags.map((tag) => (
            <span key={tag} className="member-card-tag">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="member-card-footer">
        <p className="member-card-footer-text text-black">
          {member.twitterUrl ? (
            <Link
              href={member.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="member-card-footer-link  underline-offset-2 hover:underline"
            >
              {twitterHandleLabel(member.twitterUrl)}
            </Link>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </p>
      </CardFooter>
    </Card>
  );
}