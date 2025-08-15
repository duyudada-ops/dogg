import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const pexelsApiKey = Deno.env.get("PEXELS_API_KEY");
    if (!pexelsApiKey) {
      throw new Error("PEXELS_API_KEY is not configured");
    }

    const response = await fetch(
      "https://api.pexels.com/v1/search?query=cute+dog+puppy&per_page=30&orientation=landscape",
      {
        headers: {
          Authorization: pexelsApiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract and format photo URLs
    const photos = data.photos?.map((photo: any) => ({
      src: photo.src.large,
      alt: `${photo.alt || 'Cute dog photo'} - Photo by ${photo.photographer} on Pexels`,
      photographer: photo.photographer,
      url: photo.url,
    })) || [];

    return new Response(JSON.stringify({ photos }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Pexels proxy error:', error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch photos" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});