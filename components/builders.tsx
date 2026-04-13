import Image from "next/image";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { PrimaryButton } from "@/components/ui/primary-button";

type Builder = {
  id: string;
  name: string;
  title: string;
  tags: [string, string];
  handle: string;
  avatarSrc: string;
};

const MOCK_BUILDERS: Builder[] = [
  {
    id: "1",
    name: "Metasal",
    title: "Founder",
    tags: ["DevRel", "Product"],
    handle: "@metasal",
    avatarSrc: "https://i.pravatar.cc/128?img=12",
  },
  {
    id: "2",
    name: "Jordan Lee",
    title: "Core Contributor",
    tags: ["Engineering", "Community"],
    handle: "@jordanl",
    avatarSrc: "https://i.pravatar.cc/128?img=33",
  },
  {
    id: "3",
    name: "Samira Okafor",
    title: "Product Lead",
    tags: ["Product", "Design"],
    handle: "@samiraok",
    avatarSrc: "https://i.pravatar.cc/128?img=45",
  },
  {
    id: "4",
    name: "Chris Patel",
    title: "Developer Advocate",
    tags: ["DevRel", "Education"],
    handle: "@chrisp",
    avatarSrc: "https://i.pravatar.cc/128?img=52",
  },
  {
    id: "5",
    name: "Alex Nguyen",
    title: "Ecosystem",
    tags: ["Partnerships", "Growth"],
    handle: "@alexng",
    avatarSrc: "https://i.pravatar.cc/128?img=68",
  },
  {
    id: "6",
    name: "Riley Kim",
    title: "Operations",
    tags: ["Events", "Programs"],
    handle: "@rileyk",
    avatarSrc: "https://i.pravatar.cc/128?img=27",
  },
  {
    id: "7",
    name: "Taylor Singh",
    title: "Institutions",
    tags: ["Policy", "Research"],
    handle: "@taylors",
    avatarSrc: "https://i.pravatar.cc/128?img=15",
  },
];

function BuilderCard({ builder }: { builder: Builder }) {
  return (
    <Card className="flex h-full min-h-[260px] w-full min-w-0 flex-col border-2 border-chart-1 bg-primary p-3 sm:min-h-[272px] sm:p-4">
      <CardContent className="flex flex-1 flex-col gap-0 p-0">
        <Avatar square size="lg" className="mx-auto size-12 sm:size-14">
          <AvatarImage src={builder.avatarSrc} alt={builder.name} />
        </Avatar>

        <h3 className="mt-3 w-full break-words text-left text-sm font-bold leading-snug text-chart-1 sm:mt-4 sm:text-base">
          {builder.name}
        </h3>
        <p className="mt-1 w-full break-words text-left text-xs font-normal leading-snug text-chart-1 sm:text-sm">
          {builder.title}
        </p>

        <div className="mt-3 flex flex-wrap justify-start gap-1.5 sm:mt-4 sm:gap-2">
          {builder.tags.map((tag) => (
            <span
              key={tag}
              className="border border-chart-1 bg-chart-5 px-1.5 py-px text-[10px] font-medium leading-tight text-chart-1 sm:px-2 sm:py-0.5 sm:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-auto pt-4 text-left text-xs text-foreground sm:pt-5 sm:text-sm">
          {builder.handle}
        </p>
      </CardContent>
    </Card>
  );
}

export function Builders() {
  return (
    <section className="w-full bg-background py-14 sm:py-18">
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

        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-2">
          {MOCK_BUILDERS.map((builder) => (
            <BuilderCard key={builder.id} builder={builder} />
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:mt-4 lg:grid-cols-7 lg:gap-2">
          <PrimaryButton
            type="button"
            className="w-full border-2 border-chart-1 sm:w-auto lg:w-full"
          >
            Join now
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
