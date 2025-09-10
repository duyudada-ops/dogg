import type { NextApiRequest, NextApiResponse } from "next";

// Unified event type for the frontend
type EventItem = {
  id: string;
  name: string;
  url: string;
  image: string | null;
  start: string | null;   // ISO string
  venue: string | null;
  city: string | null;
  lat?: number | null;
  lng?: number | null;
  source: "eventbrite" | "seatgeek" | "ticketmaster" | "ics";
};

const EB_TOKEN = process.env.EVENTBRITE_API_KEY;      // Bearer token
const SG_CLIENT = process.env.SEATGEEK_CLIENT_ID;     // query param client_id
const TM_KEY = process.env.TICKETMASTER_API_KEY;      // query param apikey
const ICS_FEEDS = (process.env.ICS_FEEDS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// ---- Providers ----

async function fromEventbrite(params: URLSearchParams): Promise<EventItem[]> {
  if (!EB_TOKEN) return [];
  const url = new URL("https://www.eventbriteapi.com/v3/events/search/");
  params.forEach((v, k) => url.searchParams.set(k, v));
  // Always prefer upcoming only
  url.searchParams.set("sort_by", "date");
  try {
    const r = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${EB_TOKEN}` },
    });
    if (!r.ok) return [];
    const json = await r.json();
    const now = Date.now();
    return (json?.events || [])
      .map((e: any) => {
        const startIso = e?.start?.utc ?? null;
        return {
          id: `eb_${e.id}`,
          name: e?.name?.text ?? "Event",
          url: e?.url ?? "#",
          image: e?.logo?.url ?? null,
          start: startIso,
          venue: null,
          city: null,
          lat: null,
          lng: null,
          source: "eventbrite" as const,
        };
      })
      .filter((e: EventItem) => !e.start || new Date(e.start).getTime() >= now);
  } catch {
    return [];
  }
}

async function fromSeatGeek(params: URLSearchParams): Promise<EventItem[]> {
  if (!SG_CLIENT) return [];
  const url = new URL("https://api.seatgeek.com/2/events");
  params.forEach((v, k) => url.searchParams.set(k, v));
  url.searchParams.set("client_id", SG_CLIENT);
  // Keep it to upcoming
  url.searchParams.set("datetime_utc.gte", new Date().toISOString());

  try {
    const r = await fetch(url.toString());
    if (!r.ok) return [];
    const json = await r.json();
    return (json?.events || []).map((e: any) => ({
      id: `sg_${e.id}`,
      name: e.title,
      url: e.url,
      image: e.performers?.[0]?.image || null,
      start: e.datetime_utc || null,
      venue: e.venue?.name || null,
      city: e.venue?.city || null,
      lat: e.venue?.location?.lat ?? e.venue?.location?.lat ?? e.venue?.location?.lat ?? e.venue?.location?.lat,
      lng: e.venue?.location?.lon ?? e.venue?.location?.lon ?? e.venue?.location?.lon ?? e.venue?.location?.lon,
      source: "seatgeek" as const,
    }));
  } catch {
    return [];
  }
}

async function fromTicketmaster(params: URLSearchParams): Promise<EventItem[]> {
  if (!TM_KEY) return [];
  const url = new URL("https://app.ticketmaster.com/discovery/v2/events.json");
  params.forEach((v, k) => url.searchParams.set(k, v));
  url.searchParams.set("apikey", TM_KEY);
  try {
    const r = await fetch(url.toString());
    if (!r.ok) return [];
    const json = await r.json();
    const events = json?._embedded?.events || [];
    const now = Date.now();
    return events
      .map((e: any) => {
        const venue = e._embedded?.venues?.[0];
        const startIso = e.dates?.start?.dateTime ?? null;
        return {
          id: `tm_${e.id}`,
          name: e.name,
          url: e.url,
          image: e.images?.[0]?.url ?? null,
          start: startIso,
          venue: venue?.name ?? null,
          city: venue?.city?.name ?? null,
          lat: venue?.location ? Number(venue.location.latitude) : null,
          lng: venue?.location ? Number(venue.location.longitude) : null,
          source: "ticketmaster" as const,
        };
      })
      .filter((e: EventItem) => !e.start || new Date(e.start).getTime() >= now);
  } catch {
    return [];
  }
}

// Minimal ICS parser (DTSTART, SUMMARY, URL)
function parseICS(text: string): EventItem[] {
  const lines = text.split(/\r?\n/);
  const items: EventItem[] = [];
  let cur: Record<string, string> | null = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (line === "BEGIN:VEVENT") cur = {};
    else if (line === "END:VEVENT" && cur) {
      const start = cur["DTSTART"] || cur["DTSTART;TZID"] || null;
      const iso = start
        ? // Handle like 20250109T200000Z or 20250109T200000
          new Date(
            start.endsWith("Z")
              ? start
              : start.replace(
                  /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,
                  "$1-$2-$3T$4:$5:$6Z"
                )
          ).toISOString()
        : null;
      items.push({
        id: `ics_${(cur["UID"] || cur["URL"] || cur["SUMMARY"] || Math.random().toString(36)).slice(0, 24)}`,
        name: cur["SUMMARY"] || "Event",
        url: cur["URL"] || "#",
        image: null,
        start: iso,
        venue: cur["LOCATION"] || null,
        city: null,
        source: "ics",
      });
      cur = null;
    } else if (cur) {
      const idx = line.indexOf(":");
      if (idx > 0) {
        const key = line.slice(0, idx).split(";")[0];
        const val = line.slice(idx + 1);
        cur[key] = val;
      }
    }
  }
  // Future-only
  const now = Date.now();
  return items.filter(e => !e.start || new Date(e.start).getTime() >= now);
}

async function fromICS(feeds: string[]): Promise<EventItem[]> {
  if (!feeds.length) return [];
  const all = await Promise.all(
    feeds.map(async (u) => {
      try {
        const r = await fetch(u);
        if (!r.ok) return [];
        const text = await r.text();
        return parseICS(text);
      } catch {
        return [];
      }
    })
  );
  return all.flat();
}

// ---- Handler ----

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      q = "dog",
      lat,
      lng,
      within = "25mi", // e.g. "25mi"
      size = "24",
      providers = "eb,sg,tm,ics", // eventbrite, seatgeek, ticketmaster, ics
    } = req.query as Record<string, string>;

    // Provider params
    const eb = new URLSearchParams();
    eb.set("q", q);
    eb.set("sort_by", "date");
    eb.set("expand", "venue"); // optional
    if (lat && lng) {
      eb.set("location.latitude", lat);
      eb.set("location.longitude", lng);
      eb.set("location.within", within);
    }

    const sg = new URLSearchParams();
    sg.set("q", q);
    if (lat && lng) {
      sg.set("lat", lat);
      sg.set("lon", lng);
      sg.set("range", within); // e.g. 25mi
    }
    sg.set("per_page", size);

    const tm = new URLSearchParams();
    tm.set("keyword", q);
    tm.set("size", size);
    if (lat && lng) tm.set("latlong", `${lat},${lng}`);
    tm.set("radius", within.replace("mi", "")); // miles as number

    const wantEB = providers.includes("eb");
    const wantSG = providers.includes("sg");
    const wantTM = providers.includes("tm");
    const wantICS = providers.includes("ics");

    const [ebList, sgList, tmList, icsList] = await Promise.all([
      wantEB ? fromEventbrite(eb) : Promise.resolve([]),
      wantSG ? fromSeatGeek(sg) : Promise.resolve([]),
      wantTM ? fromTicketmaster(tm) : Promise.resolve([]),
      wantICS ? fromICS(ICS_FEEDS) : Promise.resolve([]),
    ]);

    // Merge & sort (soonest first)
    const merged = [...ebList, ...sgList, ...tmList, ...icsList].sort((a, b) => {
      const ta = a.start ? new Date(a.start).getTime() : Number.MAX_SAFE_INTEGER;
      const tb = b.start ? new Date(b.start).getTime() : Number.MAX_SAFE_INTEGER;
      return ta - tb;
    });

    res.status(200).json({ events: merged });
  } catch (e) {
    res.status(200).json({ events: [] }); // fail-soft
  }
}
