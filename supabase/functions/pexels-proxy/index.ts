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

    // Multiple searches for diverse dog photos without children
    const searches = [
      "dog playing fetch outdoor",
      "dog sleeping peacefully",
      "dog swimming pool water",
      "dog wearing sunglasses cool",
      "chubby fat dog adorable",
      "dog at dog show competition",
      "excited happy dog portrait"
    ];
    
    const allPhotos = [];
    
    for (const query of searches) {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=6&orientation=landscape`,
          {
            headers: {
              Authorization: pexelsApiKey,
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          const photos = data.photos?.slice(0, 6) || [];
          allPhotos.push(...photos);
        }
      } catch (error) {
        console.error(`Error fetching photos for query "${query}":`, error);
      }
    }

    // Extract and format photo URLs, limit to 40 total
    const photos = allPhotos.slice(0, 40).map((photo: any) => ({
      src: photo.src.large,
      alt: `${photo.alt || 'Adorable dog photo'} - Photo by ${photo.photographer} on Pexels`,
      photographer: photo.photographer,
      url: photo.url,
    }));

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