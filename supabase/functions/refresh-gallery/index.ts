import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[REFRESH-GALLERY] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Gallery refresh started");

    // Use service role to bypass RLS for provider photo imports
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const pexelsApiKey = Deno.env.get("PEXELS_API_KEY");
    if (!pexelsApiKey) {
      throw new Error("PEXELS_API_KEY not found");
    }

    // Define search queries for variety
    const searchQueries = [
      "happy dogs playing",
      "cute puppies",
      "dogs in nature",
      "dog portraits",
      "dogs running",
      "golden retriever"
    ];

    let totalPhotosAdded = 0;

    for (const query of searchQueries) {
      try {
        logStep(`Fetching photos for query: ${query}`);
        
        const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10&orientation=all`, {
          headers: {
            'Authorization': pexelsApiKey,
          },
        });

        if (!response.ok) {
          logStep(`Pexels API error for query "${query}"`, { status: response.status });
          continue;
        }

        const data = await response.json();
        const photos = data.photos || [];

        logStep(`Retrieved ${photos.length} photos for query: ${query}`);

        for (const photo of photos) {
          try {
            // Check if photo already exists
            const { data: existing } = await supabaseClient
              .from("gallery_photos")
              .select("id")
              .eq("source_id", photo.id.toString())
              .eq("source", "pexels")
              .single();

            if (existing) {
              logStep(`Photo ${photo.id} already exists, skipping`);
              continue;
            }

            // Insert new photo
            const { error: insertError } = await supabaseClient
              .from("gallery_photos")
              .insert({
                src: photo.src.large,
                alt: photo.alt || `Dog photo by ${photo.photographer}`,
                source: "pexels",
                source_id: photo.id.toString(),
                credited_to: photo.photographer,
                width: photo.width,
                height: photo.height,
                is_public: true,
                user_id: null, // Provider photos have no user owner
                vibe: "happy" // Default vibe for dog photos
              });

            if (insertError) {
              logStep(`Error inserting photo ${photo.id}`, { error: insertError });
            } else {
              totalPhotosAdded++;
              logStep(`Successfully added photo ${photo.id} by ${photo.photographer}`);
            }

          } catch (photoError) {
            logStep(`Error processing photo ${photo.id}`, { error: photoError });
          }
        }

        // Rate limiting - small delay between queries
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (queryError) {
        logStep(`Error fetching photos for query "${query}"`, { error: queryError });
      }
    }

    logStep("Gallery refresh completed", { totalPhotosAdded });

    return new Response(JSON.stringify({ 
      success: true,
      photos_added: totalPhotosAdded,
      message: `Successfully refreshed gallery with ${totalPhotosAdded} new photos`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    logStep("ERROR in refresh-gallery", { error: error.message });
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});