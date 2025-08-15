import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[AI-MATCH] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("AI matching started");

    const { dogId, userId } = await req.json();
    
    if (!dogId || !userId) {
      throw new Error("dogId and userId are required");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get the current dog's profile
    const { data: currentDog, error: dogError } = await supabaseClient
      .from("dog_profiles")
      .select("*")
      .eq("id", dogId)
      .single();

    if (dogError || !currentDog) {
      throw new Error("Dog profile not found");
    }

    logStep("Current dog found", { dogId, breed: currentDog.breed });

    // Get candidate dogs (excluding own dogs and already swiped dogs)
    const { data: candidates, error: candidatesError } = await supabaseClient
      .from("dog_profiles")
      .select("*")
      .neq("user_id", userId)
      .limit(50);

    if (candidatesError) {
      throw new Error("Error fetching candidate dogs");
    }

    logStep("Candidates found", { count: candidates?.length || 0 });

    // Simple scoring algorithm (can be enhanced with OpenAI later)
    const scoredCandidates = (candidates || []).map((candidate) => {
      let score = 0;
      
      // Breed compatibility
      if (candidate.breed && currentDog.breed && candidate.breed === currentDog.breed) {
        score += 20;
      }
      
      // Age compatibility (similar ages get higher scores)
      if (candidate.age && currentDog.age) {
        const ageDiff = Math.abs(candidate.age - currentDog.age);
        if (ageDiff <= 1) score += 15;
        else if (ageDiff <= 2) score += 10;
        else if (ageDiff <= 3) score += 5;
      }
      
      // Size compatibility (different genders often work better)
      if (candidate.gender && currentDog.gender && candidate.gender !== currentDog.gender) {
        score += 10;
      }
      
      // Location proximity (if available)
      if (candidate.location && currentDog.location && candidate.location === currentDog.location) {
        score += 8;
      }
      
      // Random factor for diversity
      score += Math.random() * 5;
      
      return {
        candidate,
        score: Math.round(score),
      };
    });

    // Sort by score and take top matches
    const topMatches = scoredCandidates
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    logStep("Matches scored", { topCount: topMatches.length });

    // Insert suggested matches into the matches table
    if (topMatches.length > 0) {
      const matchRows = topMatches.map(({ candidate, score }) => ({
        dog_a: currentDog.id,
        dog_b: candidate.id,
        liker_user_id: userId,
        liked_user_id: candidate.user_id,
        status: 'suggested',
        score,
      }));

      const { error: insertError } = await supabaseClient
        .from("matches")
        .upsert(matchRows, { 
          onConflict: 'dog_a,dog_b',
          ignoreDuplicates: true 
        });

      if (insertError) {
        logStep("Error inserting matches", { error: insertError });
      } else {
        logStep("Matches inserted successfully", { count: matchRows.length });
      }
    }

    return new Response(JSON.stringify({ 
      success: true,
      matches_found: topMatches.length,
      top_score: topMatches[0]?.score || 0,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    logStep("ERROR in ai-match", { error: error.message });
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});