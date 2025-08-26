import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const eventbriteToken = Deno.env.get('EVENTBRITE_API_KEY')!

    if (!eventbriteToken) {
      throw new Error('Eventbrite API key not found')
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { searchParams } = new URL(req.url)
    const city = searchParams.get('city') || 'London'
    const category = searchParams.get('category') || ''
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)

    console.log(`Fetching events for city: ${city}, category: ${category}`)

    // Fetch events from Eventbrite API with future date filtering
    const eventbriteUrl = new URL('https://www.eventbriteapi.com/v3/events/search/')
    eventbriteUrl.searchParams.append('location.address', city)
    eventbriteUrl.searchParams.append('expand', 'venue,organizer,category,subcategory')
    eventbriteUrl.searchParams.append('token', eventbriteToken)
    eventbriteUrl.searchParams.append('page_size', limit.toString())
    eventbriteUrl.searchParams.append('sort_by', 'date')
    
    // Only get future, live events
    eventbriteUrl.searchParams.append('start_date.range_start', new Date().toISOString())
    eventbriteUrl.searchParams.append('status', 'live')
    
    // Add dog-related search terms
    const dogSearchTerms = 'dog OR canine OR pet OR puppy'
    eventbriteUrl.searchParams.append('q', dogSearchTerms)
    
    if (category) {
      eventbriteUrl.searchParams.append('categories', category)
    }

    const response = await fetch(eventbriteUrl.toString())
    
    if (!response.ok) {
      throw new Error(`Eventbrite API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    console.log(`Found ${data.events?.length || 0} events from Eventbrite`)

    // Transform Eventbrite events to our format
    const transformedEvents = data.events?.map((event: any) => ({
      eventbrite_id: event.id,
      title: event.name?.text || 'Untitled Event',
      description: event.description?.text || '',
      start_time: event.start?.utc,
      end_time: event.end?.utc,
      venue_name: event.venue?.name || '',
      venue_address: event.venue?.address?.localized_address_display || '',
      city: event.venue?.address?.city || city,
      country: event.venue?.address?.country || '',
      latitude: event.venue?.latitude ? parseFloat(event.venue.latitude) : null,
      longitude: event.venue?.longitude ? parseFloat(event.venue.longitude) : null,
      organizer_name: event.organizer?.name || '',
      organizer_description: event.organizer?.description?.text || '',
      ticket_url: event.url,
      image_url: event.logo?.url || null,
      category: event.category?.name || 'General',
      subcategory: event.subcategory?.name || '',
      is_free: event.is_free || false,
      is_online: event.online_event || false,
      capacity: event.capacity ? parseInt(event.capacity) : null,
    })) || []

    // Store events in database (upsert to avoid duplicates)
    if (transformedEvents.length > 0) {
      const { error: upsertError } = await supabase
        .from('events')
        .upsert(transformedEvents, { 
          onConflict: 'eventbrite_id',
          ignoreDuplicates: false 
        })

      if (upsertError) {
        console.error('Error storing events:', upsertError)
        throw upsertError
      }

      console.log(`Successfully stored ${transformedEvents.length} events`)
    }

    // Fetch stored events from database
    let query = supabase
      .from('events')
      .select('*')
      .gte('start_time', new Date().toISOString())
      .order('start_time', { ascending: true })
      .limit(limit)

    if (city && city !== 'all') {
      query = query.ilike('city', `%${city}%`)
    }

    if (category) {
      query = query.ilike('category', `%${category}%`)
    }

    const { data: events, error } = await query

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ 
        events: events || [],
        count: events?.length || 0,
        source: 'eventbrite'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in fetch-events function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        events: [],
        count: 0
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})