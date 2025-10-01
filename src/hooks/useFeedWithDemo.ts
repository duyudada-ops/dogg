import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  getDemoProfilesForRegion,
  buildCountyKey,
  regionKeyFromLatLng,
  DemoProfile,
} from "@/lib/seededDemoProfiles";
import { dogPhotos } from "../../data/dogPhotos";

// Simple hash function for deterministic photo selection
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export type NormalizedProfile = {
  id: string;
  name: string;
  age: number;
  breed: string;
  size: "Small" | "Medium" | "Large";
  temperament: string[];
  bio: string;
  photoUrl?: string;
  distanceMiles?: number;
  location?: string;
  verified?: boolean;
  isDemo?: boolean;
};

type RealDogProfile = {
  id: string;
  name: string;
  age: number;
  breed: string;
  gender: string;
  bio: string | null;
  photo_url: string | null;
  location: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  is_demo: boolean | null;
};

export function useFeedWithDemo(opts: {
  userCounty?: string | null;
  userState?: string | null;
  userLat?: number | null;
  userLng?: number | null;
  limit?: number;
}) {
  const { userCounty, userState, userLat, userLng, limit = 25 } = opts;

  const [items, setItems] = useState<NormalizedProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const regionKey = useMemo(() => {
    if (userCounty && userState) return buildCountyKey(userState, userCounty);
    if (typeof userLat === "number" && typeof userLng === "number")
      return regionKeyFromLatLng(userLat, userLng);
    return "geo:0,0"; // Default region
  }, [userCounty, userState, userLat, userLng]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setIsDemo(false);
      setError(null);

      try {
        // Fetch real dog profiles from database
        const { data, error } = await supabase
          .from("dog_profiles")
          .select("*")
          .eq("is_demo", false)
          .order("created_at", { ascending: false })
          .limit(limit);

        if (error) throw error;

        if (data && data.length > 0) {
          const normalized: NormalizedProfile[] = (data as RealDogProfile[]).map(
            (p) => {
              // Sanitize photo_url - only allow local dog photos
              let safePhotoUrl: string | undefined;
              if (p.photo_url && p.photo_url.startsWith('/dog-profiles/')) {
                safePhotoUrl = p.photo_url;
              } else {
                // Use deterministic local photo based on dog's ID
                const index = hashString(p.id) % dogPhotos.length;
                safePhotoUrl = dogPhotos[index].src;
              }
              
              return {
                id: p.id,
                name: p.name,
                age: p.age,
                breed: p.breed,
                size: "Medium" as const, // Default since not in schema
                temperament: ["Friendly", "Playful"], // Default traits
                bio: p.bio ?? "Friendly and excited to meet new friends!",
                photoUrl: safePhotoUrl,
                distanceMiles: Math.round(Math.random() * 10 + 1), // Mock distance
                location: p.location ?? "Nearby",
                verified: true,
                isDemo: false,
              };
            }
          );
          setItems(normalized);
          setLoading(false);
          return;
        }

        // No real data → fall back to deterministic demo profiles
        const demo = getDemoProfilesForRegion(regionKey, limit).map(
          (d: DemoProfile): NormalizedProfile => ({
            id: d.id,
            name: d.name,
            age: d.age,
            breed: d.breed,
            size: d.size,
            temperament: d.traits,
            bio: d.about,
            photoUrl: d.photoUrl,
            distanceMiles: d.distanceMiles,
            location: d.neighborhood,
            verified: d.verified,
            isDemo: true,
          })
        );
        setItems(demo);
        setIsDemo(true);
      } catch (e: any) {
        console.error("Feed error → using demo set:", e);
        const demo = getDemoProfilesForRegion(regionKey, limit).map(
          (d: DemoProfile): NormalizedProfile => ({
            id: d.id,
            name: d.name,
            age: d.age,
            breed: d.breed,
            size: d.size,
            temperament: d.traits,
            bio: d.about,
            photoUrl: d.photoUrl,
            distanceMiles: d.distanceMiles,
            location: d.neighborhood,
            verified: d.verified,
            isDemo: true,
          })
        );
        setItems(demo);
        setIsDemo(true);
        setError(e?.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, [regionKey, limit]);

  return { items, loading, isDemo, error };
}