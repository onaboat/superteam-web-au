import Image from "next/image";
import {
  CalendarBlank,
  Circle,
  MapPin,
  VideoCamera,
} from "@phosphor-icons/react/ssr";
import { ArrowSquareOut } from "@phosphor-icons/react/ssr";

import { PrimaryButton } from "@/components/ui/primary-button";
import { LUMA_CALENDAR_URL } from "@/lib/luma";

const STATS = [
  {
    icon: CalendarBlank,
    value: "25+",
    label: "Events hosted",
  },
  {
    icon: MapPin,
    value: "4",
    label: "Cities across Australia",
  },
] as const;

const MOCK_EVENTS = [
  {
    id: "1",
    dateLabel: "11 Apr Saturday",
    time: "10:00",
    title:
      "Saturday Build Sessions - National (Colosseum Frontier Hackathon) | Superteam Australia: The Outback Frontier",
    location: "Google Meet",
    locationKind: "virtual" as const,
    tags: ["Australia Wide", "Colosseum Hackathon", "Outback Frontier"],
    image: "/build%20Images/Events.jpg",
  },
  {
    id: "2",
    dateLabel: "14 Apr Tuesday",
    time: "18:00",
    title:
      "Developer Office Hours (Colosseum Frontier Hackathon) | Superteam Australia: The Outback Frontier",
    location: "TBA",
    locationKind: "tba" as const,
    tags: ["Australia Wide", "Colosseum Hackathon", "Outback Frontier"],
    image: "/build%20Images/Events.jpg",
  },
  {
    id: "3",
    dateLabel: "15 Apr Wednesday",
    time: "18:30",
    title: "Sydney Launch | Superteam Australia",
    location: "Circular Quay, Sydney",
    locationKind: "physical" as const,
    tags: ["Sydney", "Launch Event"],
    image: "/build%20Images/Events.jpg",
  },
  {
    id: "4",
    dateLabel: "16 Apr Thursday",
    time: "17:30",
    title:
      "Sydney Developer Meetup (Colosseum Frontier Hackathon) | Superteam Australia",
    location: "Sydney, NSW",
    locationKind: "physical" as const,
    tags: ["Sydney", "Colosseum Hackathon"],
    image: "/build%20Images/Events.jpg",
  },
];

function LocationRow({
  location,
  kind,
}: {
  location: string;
  kind: "virtual" | "physical" | "tba";
}) {
  const Icon = kind === "virtual" ? VideoCamera : MapPin;
  return (
    <p className="flex items-start gap-2 text-sm text-muted-foreground">
      <Icon
        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
        weight="regular"
        aria-hidden
      />
      <span>{location}</span>
    </p>
  );
}

export function Events() {
  return (
    <section className="w-full  py-14 text-card-foreground sm:py-18">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12 lg:px-16">
        <div className="space-y-8">
          <h2 className="text-4xl font-black leading-tight text-chart-1 sm:text-5xl">
            Join us at upcoming events.
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-background px-4 py-4 text-foreground sm:px-5 sm:py-5"
                >
                  <Icon
                    className="mb-3 size-7 text-chart-1"
                    weight="duotone"
                    aria-hidden
                  />
                  <p className="text-3xl font-black tracking-tight text-chart-1 sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-2 border-chart-1 bg-primary p-4 sm:p-5">
          <ul className="space-y-0">
            {MOCK_EVENTS.map((event, index) => (
              <li key={event.id} className="flex gap-3 pb-8 last:pb-0">
                <div className="flex w-5 shrink-0 flex-col items-center self-stretch">
                  <span className="mt-1.5 size-2.5 shrink-0 bg-chart-1 ring-2 ring-primary" />
                  {/* Timeline rail only *between* items; none after the final marker (nothing follows). */}
                  {index < MOCK_EVENTS.length - 1 ? (
                    <span
                      className="mx-auto mt-2 w-px flex-1 min-h-[48px] bg-chart-1"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="text-sm font-semibold text-primary-foreground">
                    {event.dateLabel}
                  </p>

                  <article className="overflow-hidden bg-background p-4 ring-1 ring-border sm:p-5">
                    <div className="flex gap-4">
                      <div className="min-w-0 flex-1 space-y-3">
                        <p className="text-xs font-medium text-muted-foreground">
                          {event.time}
                        </p>
                        <h3 className="text-base font-bold leading-snug text-foreground sm:text-lg">
                          {event.title}
                        </h3>
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Circle
                            className="size-3 shrink-0 text-primary"
                            weight="fill"
                            aria-hidden
                          />
                          <span>By Superteam Australia</span>
                        </p>
                        <LocationRow
                          location={event.location}
                          kind={event.locationKind}
                        />
                        <div className="flex flex-wrap gap-2 pt-1">
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="border border-chart-1 bg-primary/40 px-2.5 py-0.5 text-xs font-medium text-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="relative size-[88px] shrink-0 overflow-hidden sm:size-[104px]">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="104px"
                        />
                      </div>
                    </div>
                  </article>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-center lg:justify-start">
          <PrimaryButton asChild>
            <a
              href={LUMA_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              View all events on Luma
              <ArrowSquareOut className="size-5" weight="bold" />
            </a>
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
