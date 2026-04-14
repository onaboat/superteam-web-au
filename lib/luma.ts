export const LUMA_CALENDAR_URL = "https://luma.com/SuperteamAU";

const LUMA_API = "https://public-api.luma.com/v1/calendar/list-events";

export type LumaEventRow = {
  id: string;
  name: string;
  startAt: string;
  coverUrl?: string;
  locationLabel: string;
};

type ListEventsEntry = {
  event?: {
    id?: string;
    name?: string;
    start_at?: string;
    cover_url?: string | null;
    geo_address_json?: {
      address?: string | null;
      city?: string | null;
      region?: string | null;
      country?: string | null;
    } | null;
    meeting_url?: string | null;
  };
};

function formatLocation(ev: NonNullable<ListEventsEntry["event"]>): string {
  const geo = ev.geo_address_json;
  if (geo?.city && geo?.region) {
    return `${geo.city}, ${geo.region}`;
  }
  if (geo?.city) return geo.city;
  if (geo?.address) return geo.address;
  if (ev.meeting_url) {
    try {
      return new URL(ev.meeting_url).hostname.replace(/^www\./, "");
    } catch {
      return ev.meeting_url;
    }
  }
  return "TBA";
}

function mapEntry(entry: ListEventsEntry): LumaEventRow | null {
  const ev = entry.event;
  if (!ev?.id || !ev.name || !ev.start_at) return null;
  return {
    id: ev.id,
    name: ev.name,
    startAt: ev.start_at,
    coverUrl: ev.cover_url ?? undefined,
    locationLabel: formatLocation(ev),
  };
}

export async function getLumaUpcomingEvents(): Promise<{
  events: LumaEventRow[];
  error?: string;
} | null> {
  const key = process.env.LUMA_API_KEY;
  if (!key?.trim()) {
    return null;
  }

  const after = new Date().toISOString();
  const url = new URL(LUMA_API);
  url.searchParams.set("after", after);
  url.searchParams.set("pagination_limit", "20");
  url.searchParams.set("sort_column", "start_at");
  url.searchParams.set("sort_direction", "asc");

  try {
    const res = await fetch(url.toString(), {
      headers: { "x-luma-api-key": key },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        events: [],
        error: `Luma API ${res.status}: ${text.slice(0, 200)}`,
      };
    }

    const data = (await res.json()) as {
      entries?: ListEventsEntry[];
    };

    const events = (data.entries ?? [])
      .map(mapEntry)
      .filter((e): e is LumaEventRow => e !== null);

    return { events };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { events: [], error: message };
  }
}

export function lumaEventStats(events: LumaEventRow[]) {
  const cities = new Set<string>();
  for (const e of events) {
    const label = e.locationLabel;
    if (label && label !== "TBA") {
      const city = label.split(",")[0]?.trim();
      if (city) cities.add(city);
    }
  }
  return {
    upcomingCount: events.length,
    cityCount: cities.size,
  };
}
