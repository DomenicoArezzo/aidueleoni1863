import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.49.4/cors";

interface ICalEvent {
  uid: string;
  summary: string;
  dtstart: string;
  dtend: string;
  description?: string;
  raw: string;
}

function parseICalDate(dateStr: string): string {
  // Handle formats: 20260415, 20260415T140000Z, 20260415T140000
  const clean = dateStr.replace(/[^0-9TZ]/g, "");
  if (clean.length >= 8) {
    const y = clean.substring(0, 4);
    const m = clean.substring(4, 6);
    const d = clean.substring(6, 8);
    return `${y}-${m}-${d}`;
  }
  return dateStr;
}

function parseICalEvents(icalData: string): ICalEvent[] {
  const events: ICalEvent[] = [];
  const eventBlocks = icalData.split("BEGIN:VEVENT");

  for (let i = 1; i < eventBlocks.length; i++) {
    const block = eventBlocks[i].split("END:VEVENT")[0];
    const lines = block.split(/\r?\n/);

    let uid = "";
    let summary = "";
    let dtstart = "";
    let dtend = "";
    let description = "";

    for (const line of lines) {
      if (line.startsWith("UID:")) uid = line.substring(4).trim();
      else if (line.startsWith("SUMMARY:")) summary = line.substring(8).trim();
      else if (line.startsWith("DTSTART")) {
        const val = line.includes(":") ? line.split(":").pop()! : "";
        dtstart = parseICalDate(val.trim());
      } else if (line.startsWith("DTEND")) {
        const val = line.includes(":") ? line.split(":").pop()! : "";
        dtend = parseICalDate(val.trim());
      } else if (line.startsWith("DESCRIPTION:")) {
        description = line.substring(12).trim();
      }
    }

    if (uid && dtstart) {
      if (!dtend) dtend = dtstart;
      events.push({ uid, summary, dtstart, dtend, description, raw: block });
    }
  }

  return events;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Get all active feeds
    const { data: feeds, error: feedsError } = await supabase
      .from("ical_feeds")
      .select("*, properties(id, name)")
      .eq("is_active", true);

    if (feedsError) throw feedsError;
    if (!feeds || feeds.length === 0) {
      return new Response(JSON.stringify({ message: "No active feeds" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results = [];

    for (const feed of feeds) {
      const startTime = Date.now();
      let eventsFound = 0, eventsCreated = 0, eventsUpdated = 0, eventsRemoved = 0;

      try {
        // Fetch iCal feed
        const response = await fetch(feed.ical_url, {
          headers: { "User-Agent": "AiDueLeoni-CalSync/1.0" },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const icalData = await response.text();
        const events = parseICalEvents(icalData);
        eventsFound = events.length;

        // Get existing bookings from this feed source
        const { data: existing } = await supabase
          .from("bookings")
          .select("id, external_uid, check_in, check_out")
          .eq("property_id", feed.property_id)
          .eq("source", feed.source);

        const existingMap = new Map(
          (existing || []).map((b) => [b.external_uid, b])
        );
        const processedUids = new Set<string>();

        // Upsert events
        for (const event of events) {
          processedUids.add(event.uid);
          const existingBooking = existingMap.get(event.uid);

          if (existingBooking) {
            // Update if dates changed
            if (
              existingBooking.check_in !== event.dtstart ||
              existingBooking.check_out !== event.dtend
            ) {
              await supabase
                .from("bookings")
                .update({
                  check_in: event.dtstart,
                  check_out: event.dtend,
                  guest_name: event.summary || null,
                  notes: event.description || null,
                  raw_ical_data: event.raw,
                })
                .eq("id", existingBooking.id);
              eventsUpdated++;
            }
          } else {
            // Create new booking
            await supabase.from("bookings").insert({
              property_id: feed.property_id,
              source: feed.source,
              status: "confirmed",
              external_uid: event.uid,
              guest_name: event.summary || null,
              check_in: event.dtstart,
              check_out: event.dtend,
              notes: event.description || null,
              raw_ical_data: event.raw,
            });
            eventsCreated++;
          }
        }

        // Remove bookings no longer in feed (future only)
        const today = new Date().toISOString().split("T")[0];
        for (const [uid, booking] of existingMap) {
          if (!processedUids.has(uid!) && booking.check_in >= today) {
            await supabase
              .from("bookings")
              .update({ status: "cancelled" })
              .eq("id", booking.id);
            eventsRemoved++;
          }
        }

        // Update feed last_synced
        await supabase
          .from("ical_feeds")
          .update({ last_synced_at: new Date().toISOString(), last_error: null })
          .eq("id", feed.id);

        // Log success
        const duration = Date.now() - startTime;
        await supabase.from("sync_logs").insert({
          feed_id: feed.id,
          property_id: feed.property_id,
          status: "success",
          events_found: eventsFound,
          events_created: eventsCreated,
          events_updated: eventsUpdated,
          events_removed: eventsRemoved,
          duration_ms: duration,
        });

        results.push({ feed: feed.name, status: "success", eventsFound, eventsCreated, eventsUpdated, eventsRemoved });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        const duration = Date.now() - startTime;

        await supabase
          .from("ical_feeds")
          .update({ last_error: errorMsg })
          .eq("id", feed.id);

        await supabase.from("sync_logs").insert({
          feed_id: feed.id,
          property_id: feed.property_id,
          status: "error",
          events_found: eventsFound,
          error_message: errorMsg,
          duration_ms: duration,
        });

        results.push({ feed: feed.name, status: "error", error: errorMsg });
      }
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
