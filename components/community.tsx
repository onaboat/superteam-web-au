import Image from "next/image";
import type { ReactNode } from "react";
import {
  ChatCircle,
  Heart,
  Info,
  LinkSimple,
  SealCheck,
} from "@phosphor-icons/react/ssr";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

function Mention({ children }: { children: ReactNode }) {
  return <span className="text-blue-400">{children}</span>;
}

function TweetLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-blue-400 underline-offset-2 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

type PostUser = {
  name: string;
  handle: string;
  avatarSrc: string;
  verified?: boolean;
};

type Quoted = {
  author: string;
  handle: string;
  text: string;
};

type CommunityPost = {
  id: string;
  user: PostUser;
  body: ReactNode;
  quoted?: Quoted;
  imageAlt?: string;
  imageSrc?: string;
  timestamp: string;
  likes: number;
  replies: number;
  actionLabel: string;
};

const MOCK_POSTS: CommunityPost[] = [
  {
    id: "1",
    user: {
      name: "Superteam Australia",
      handle: "@SuperteamAU",
      avatarSrc: "/builders_images/SAU.jpg",
      verified: true,
    },
    body: (
      <>
        Build weekend is on — bring your idea to the{" "}
        <Mention>@colosseum</Mention> hackathon track. We&apos;ll be pairing
        teams with mentors all Saturday.
      </>
    ),
    imageSrc: "/twiter_mock/Link1.png",
    imageAlt: "Product preview",
    timestamp: "10:44 AM · Apr 4, 2026",
    likes: 48,
    replies: 4,
    actionLabel: "Read 4 replies",
  },
  {
    id: "2",
    user: {
      name: "Colosseum",
      handle: "@colosseum",
      avatarSrc: "/builders_images/SAU.jpg",
      verified: true,
    },
    body: (
      <>
        Meet <Mention>@Colosseum</Mention> Copilot — know the landscape before
        you build.{" "}
        <TweetLink href="https://colosseum.org">colosseum.org</TweetLink>
      </>
    ),
    imageSrc: "/twiter_mock/Link1.png",
    imageAlt: "Product preview",
    timestamp: "9:12 AM · Apr 3, 2026",
    likes: 112,
    replies: 9,
    actionLabel: "Read more on X",
  },
  {
    id: "3",
    user: {
      name: "Superteam Australia",
      handle: "@SuperteamAU",
      avatarSrc: "/builders_images/SAU.jpg",
      verified: true,
    },
    body: (
      <>
        Saturday Build Sessions are live — grab a seat on{" "}
        <TweetLink href="https://luma.com">luma.com</TweetLink> (Australia-wide
        slots).
      </>
    ),
    timestamp: "4:01 PM · Apr 2, 2026",
    likes: 23,
    replies: 1,
    actionLabel: "Read 1 reply",
  },
  {
    id: "4",
    user: {
      name: "Superteam Australia",
      handle: "@SuperteamAU",
      avatarSrc: "/builders_images/SAU.jpg",
      verified: true,
    },
    body: (
      <>
        Australia, it&apos;s time to earn. New listings are up for the Website
        Design &amp; Build Challenge — tap in.
      </>
    ),
    imageSrc: "/twiter_mock/Link2.png",
    imageAlt: "Challenge listings preview",
    timestamp: "11:20 AM · Apr 1, 2026",
    likes: 67,
    replies: 6,
    actionLabel: "Read more on X",
  },
  {
    id: "5",
    user: {
      name: "Superteam Australia",
      handle: "@SuperteamAU",
      avatarSrc: "/builders_images/SAU.jpg",
      verified: true,
    },
    body: (
      <>
        Major cities — Sydney · Melbourne · Brisbane · Perth. Rooftop launches
        &amp; builder nights through April. DM to host a satellite meetup.
      </>
    ),
    timestamp: "8:05 PM · Mar 30, 2026",
    likes: 91,
    replies: 15,
    actionLabel: "Read more on X",
  },
  {
    id: "6",
    user: {
      name: "Superteam Australia",
      handle: "@SuperteamAU",
      avatarSrc: "/builders_images/SAU.jpg",
      verified: true,
    },
    body: (
      <>
        We keep saying &quot;hackathon&quot; for <Mention>@colosseum</Mention>{" "}
        — here&apos;s why that framing matters for founders vs. weekend
        sprints.
      </>
    ),
   imageSrc: "/twiter_mock/Link3.png",
   imageAlt: "Product preview",
    timestamp: "2:33 PM · Mar 29, 2026",
    likes: 54,
    replies: 7,
    actionLabel: "Read more on X",
  },
  {
    id: "7",
    user: {
      name: "K | Superteam",
      handle: "@k_superteam",
      avatarSrc: "https://i.pravatar.cc/96?img=33",
    },
    body: (
      <>
        Colosseum is closer to a startup competition than a classic hackathon —
        teams are building toward launch, not a slide deck.
      </>
    ),

    imageSrc: "/twiter_mock/Link4.png",
    imageAlt: "Product preview",
    timestamp: "6:50 AM · Mar 28, 2026",
    likes: 201,
    replies: 22,
    actionLabel: "Read more on X",
  },
  {
    id: "8",
    user: {
      name: "Superteam Australia",
      handle: "@SuperteamAU",
      avatarSrc: "/builders_images/SAU.jpg",
      verified: true,
    },
    body: (
      <>
        Australia just set the direction for digital assets — policy and
        implementation moving in lockstep. Analysis on{" "}
        <TweetLink href="https://coindesk.com">coindesk.com</TweetLink>.
      </>
    ),
    timestamp: "7:18 AM · Mar 27, 2026",
    likes: 134,
    replies: 18,
    actionLabel: "Read more on X",
  },
];

function XMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function PostCard({ post }: { post: CommunityPost }) {
  return (
    <Card className="mb-6 break-inside-avoid text-foreground">
      <CardHeader className="relative border-b border-chart-1/25 px-3 pt-3 pb-2">
        <span className="absolute top-3 right-3 text-foreground/70">
          <XMark className="size-4" />
        </span>
        <div className="flex gap-2.5 pr-8">
          <Avatar square size="default" className="size-10">
            <AvatarImage src={post.user.avatarSrc} alt="" />
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              <span className="truncate text-sm font-bold text-foreground">
                {post.user.name}
              </span>
              {post.user.verified ? (
                <SealCheck
                  className="size-4 shrink-0 text-chart-1"
                  weight="fill"
                  aria-label="Verified"
                />
              ) : null}
            </div>
            <p className="text-[13px] text-blue-400">{post.user.handle}</p>
            <button
              type="button"
              className="mt-0.5 text-[13px] font-medium text-blue-400 hover:underline"
            >
              Follow
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-3 pt-2 pb-3">
        <div className="text-[15px] leading-snug text-foreground">
          {post.body}
        </div>

        {post.quoted ? (
          <div className="border border-chart-1/30 bg-primary/35 p-3 text-sm">
            <p className="font-semibold text-foreground">
              {post.quoted.author}{" "}
              <span className="font-normal text-blue-400">
                {post.quoted.handle}
              </span>
            </p>
            <p className="mt-1 text-foreground/90">{post.quoted.text}</p>
          </div>
        ) : null}

        {post.imageSrc ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-chart-1/25 bg-primary/25">
            <Image
              src={post.imageSrc}
              alt={post.imageAlt ?? ""}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : null}

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <time>{post.timestamp}</time>
          <Info className="size-3.5 opacity-70" aria-hidden />
        </div>

        <div className="flex items-center gap-4 border-t border-chart-1/25 pt-2 text-muted-foreground">
          <span className="flex items-center gap-1.5 text-[13px]">
            <Heart className="size-4" weight="regular" aria-hidden />
            {post.likes}
          </span>
          <span className="flex items-center gap-1.5 text-[13px]">
            <ChatCircle className="size-4" weight="regular" aria-hidden />
            {post.replies}
          </span>
          <button
            type="button"
            className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"
            aria-label="Copy link"
          >
            <LinkSimple className="size-4" aria-hidden />
            Copy link
          </button>
        </div>
      </CardContent>

      <CardFooter className="border-t border-chart-1/25 px-3 pt-2 pb-3">
        <button
          type="button"
          className="w-full border border-blue-400 py-2 text-sm font-medium text-blue-400 hover:bg-blue-400/10"
        >
          {post.actionLabel}
        </button>
      </CardFooter>
    </Card>
  );
}

export function Community() {
  return (
    <section className="w-full bg-background ">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-10 lg:px-16">
        {/* <h2 className="text-4xl font-black leading-none text-chart-1 sm:text-5xl">
          Community
        </h2> */}

        <div className="mt-10 columns-1 gap-6 md:columns-2 lg:columns-3 lg:gap-8">
          {MOCK_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
