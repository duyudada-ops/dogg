"use client";

import React, { useEffect, useRef } from 'react';
import { Event } from '@/lib/types';

interface EventMapProps {
  events: Event[];
}

export const EventMap: React.FC<EventMapProps> = ({ events }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Check if Mapbox token is available
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!mapboxToken) {
      // Fallback UI when Mapbox token is not available
      return;
    }

    // Dynamic import to avoid SSR issues
    import('mapbox-gl').then((mapboxgl) => {
      if (!mapContainer.current) return;
      
      mapboxgl.default.accessToken = mapboxToken;
      
      map.current = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-98.5795, 39.8283], // Center of US
        zoom: 4,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

      // Add markers for events
      events.forEach((event) => {
        if (event.latitude && event.longitude) {
          // Create custom marker element
          const markerEl = document.createElement('div');
          markerEl.className = 'bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform';
          markerEl.textContent = '🐕';

          const popup = new mapboxgl.default.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-semibold">${event.title}</h3>
              <p class="text-sm text-gray-600">${event.location_name || ''}</p>
              <p class="text-xs text-gray-500">${new Date(event.date).toLocaleDateString()}</p>
            </div>
          `);

          new mapboxgl.default.Marker(markerEl)
            .setLngLat([event.longitude, event.latitude])
            .setPopup(popup)
            .addTo(map.current);
        }
      });

      // Fit map to show all events
      if (events.length > 0) {
        const coordinates = events
          .filter(e => e.latitude && e.longitude)
          .map(e => [e.longitude!, e.latitude!]);
        
        if (coordinates.length > 0) {
          const bounds = new mapboxgl.default.LngLatBounds();
          coordinates.forEach(coord => bounds.extend(coord as [number, number]));
          map.current.fitBounds(bounds, { padding: 50 });
        }
      }
    }).catch((error) => {
      console.error('Error loading Mapbox:', error);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [events]);

  // Fallback UI when Mapbox is not available
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!mapboxToken) {
    return (
      <div className="h-[400px] w-full rounded-lg bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <h3 className="font-semibold mb-2">Map View</h3>
          <p className="text-sm text-muted-foreground">
            Mapbox token required to display interactive map
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapContainer} 
        className="h-[400px] w-full rounded-lg overflow-hidden"
      />
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-muted-foreground">
        {events.length} events shown
      </div>
    </div>
  );
};