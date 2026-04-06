import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

function formatICalDate(dateStr: string): string {
  return dateStr.replace(/-/g, "");
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const propertySlug = url.searchParams.get("property") || "ai-due-leoni";

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Get property
    const { data: property } = await supabase
      .from("properties")
      .select("id, name")
      .eq("slug", propertySlug)
      .eq("is_active", true)
      .single();

    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    // Get all active bookings and blocks
    const today = new Date().toISOString().split("T")[0];

    const { data: bookings } = await supabase
      .from("bookings")
      .select("*")
      .eq("property_id", property.id)
      .neq("status", "cancelled")
      .gte("check_out", today);

    const { data: blocks } = await supabase
      .from("availability_blocks")
      .select("*")
      .eq("property_id", property.id)
      .gte("end_date", today);

    // Build iCal
    let ical = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Ai due leoni//Availability//EN\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\nX-WR-CALNAME:${property.name} - Disponibilità\r\n`;

    for (const booking of bookings || []) {
      ical += `BEGIN:VEVENT\r\n`;
      ical += `UID:booking-${booking.id}@aidueleoni.com\r\n`;
      ical += `DTSTART;VALUE=DATE:${formatICalDate(booking.check_in)}\r\n`;
      ical += `DTEND;VALUE=DATE:${formatICalDate(booking.check_out)}\r\n`;
      ical += `SUMMARY:${booking.guest_name || "Prenotazione"}\r\n`;
      ical += `STATUS:CONFIRMED\r\n`;
      ical += `END:VEVENT\r\n`;
    }

    for (const block of blocks || []) {
      ical += `BEGIN:VEVENT\r\n`;
      ical += `UID:block-${block.id}@aidueleoni.com\r\n`;
      ical += `DTSTART;VALUE=DATE:${formatICalDate(block.start_date)}\r\n`;
      ical += `DTEND;VALUE=DATE:${formatICalDate(block.end_date)}\r\n`;
      ical += `SUMMARY:${block.reason || "Non disponibile"}\r\n`;
      ical += `STATUS:CONFIRMED\r\n`;
      ical += `END:VEVENT\r\n`;
    }

    ical += `END:VCALENDAR\r\n`;

    return new Response(ical, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="${propertySlug}.ics"`,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response("Internal error", { status: 500 });
  }
});
