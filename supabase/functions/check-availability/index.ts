import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.49.4/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const url = new URL(req.url);
    const propertySlug = url.searchParams.get("property") || "ai-due-leoni";

    // Get property
    const { data: property } = await supabase
      .from("properties")
      .select("id")
      .eq("slug", propertySlug)
      .eq("is_active", true)
      .single();

    if (!property) {
      return new Response(JSON.stringify({ error: "Property not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get unavailable dates
    const { data: unavailable, error } = await supabase.rpc("get_unavailable_dates", {
      _property_id: property.id,
    });

    if (error) throw error;

    return new Response(JSON.stringify({ property_id: property.id, unavailable_dates: unavailable }), {
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
