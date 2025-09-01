 // src/lib/seededDemoProfiles.ts
export type DemoProfile = {
  id: string;
  name: string;
  age: number;
  breed: string;
  size: "Small" | "Medium" | "Large";
  distanceMiles: number;
  neighborhood: string;
  about: string;
  traits: string[];
  photoUrl: string;
  lastActiveISO: string;
  verified: boolean;
};

// --- deterministic PRNG helpers ---
function hashStringToInt(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = <T,>(rng: () => number, arr: T[]) => arr[Math.floor(rng() * arr.length)];
const rand = (rng: () => number, min: number, max: number, dp = 1) =>
  Math.round((min + rng() * (max - min)) * Math.pow(10, dp)) / Math.pow(10, dp);

// --- vocab ---
const NAMES = ["Buddy","Luna","Max","Bella","Charlie","Daisy","Rocky","Lucy","Cooper","Molly","Bailey","Sadie","Tucker","Maggie","Leo","Zoe","Jack","Chloe","Duke","Penny","Bear","Rosie","Finn","Ruby","Milo"];
const BREEDS = ["Golden Retriever","Labrador","German Shepherd","French Bulldog","Poodle","Beagle","Australian Shepherd","Corgi","Husky","Boxer","Dachshund","Cavapoo","Bernedoodle","Malamute","Border Collie"];
const SIZES: Array<DemoProfile["size"]> = ["Small","Medium","Large"];
const TRAITS = ["Friendly","Energetic","Playful","Calm","Social","Smart","Gentle","Goofy","Curious","Athletic"];
const AREAS = ["Downtown","Riverside","North Park","South Hills","Midtown","Capitol","Lakeside","Old Town","Uptown","Harbor"];

// Import verified clean dog photos
import { dogPhotos, type DogVibe } from '../../data/dogPhotos';
import { galleryService } from './galleryService';

// Map actions to appropriate dog photo vibes
const ACTION_TO_VIBE_MAP: Record<string, DogVibe> = {
  playful: 'playing',
  sleeping: 'sleeping', 
  eating: 'normal',
  jumping: 'playing',
  swimming: 'swimming',
  costume: 'sunglasses',
  running: 'normal',
  beach: 'swimming',
  park: 'playing',
  hiking: 'normal'
};

const ACTIONS = Object.keys(ACTION_TO_VIBE_MAP);

/**
 * Get a verified clean dog photo based on action and deterministic seed
 * First tries gallery photos, falls back to static photos
 */
function getDogPhotoUrl(action: string, seed: number): string {
  const vibe = ACTION_TO_VIBE_MAP[action] || 'normal';
  const vibePhotos = dogPhotos.filter(photo => photo.vibe === vibe);
  const fallbackPhotos = dogPhotos.filter(photo => photo.vibe === 'normal');
  const photoArray = vibePhotos.length > 0 ? vibePhotos : fallbackPhotos;
  
  const photoIndex = seed % photoArray.length;
  return photoArray[photoIndex].src;
}

/** Build a stable county key, e.g. "CA|Los Angeles County" */
export function buildCountyKey(stateAbbr: string, countyName: string) {
  const clean = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();
  return `${clean(stateAbbr)}|${clean(countyName)}`;
}

/** If you only have lat/lng, make a stable geocell key */
export function regionKeyFromLatLng(lat: number, lng: number) {
  //  ~10–15km cells for stability
  const key = `geo:${lat.toFixed(2)},${lng.toFixed(2)}`;
  return key;
}

/**
 * Deterministically generate N demo profiles for a given region key.
 * Use `buildCountyKey('CA','Los Angeles County')` for counties, or `regionKeyFromLatLng`.
 */
export function getDemoProfilesForRegion(regionKey: string, count = 25): DemoProfile[] {
  const seed = hashStringToInt(regionKey);
  const rng = mulberry32(seed);
  const usedNames = new Set<string>();
  const out: DemoProfile[] = [];

  for (let i = 0; i < count; i++) {
    let name = pick(rng, NAMES);
    let attempts = 0;
    while (usedNames.has(name) && attempts < 10) { name = pick(rng, NAMES); attempts++; }
    usedNames.add(name);

    const age = Math.floor(rand(rng, 1, 12, 0));
    const breed = pick(rng, BREEDS);
    const size = pick(rng, SIZES);
    const distanceMiles = rand(rng, 0.3, 24.9, 1);
    const neighborhood = pick(rng, AREAS);
    const traits = Array.from(new Set([pick(rng, TRAITS), pick(rng, TRAITS), pick(rng, TRAITS)])).slice(0,3);
    const action = pick(rng, ACTIONS);

    const aboutMap: Record<string,string> = {
      playful: "Loves fetch and zoomies; always ready for the park!",
      sleeping: "Power nap pro. Couch cuddles are life.",
      eating: "Food-motivated and polite with treats.",
      jumping: "Agility star—can't resist a good leap!",
      swimming: "Absolute water pup—beach days are the best!",
      costume: "Fashion icon. Halloween all year.",
      running: "Morning jog buddy—endless stamina.",
      beach: "Sand digger and wave chaser.",
      park: "Social butterfly at the dog park.",
      hiking: "Trail explorer who loves new scents.",
    };
    const about = aboutMap[action] ?? "Friendly and excited to meet new friends!";

    out.push({
      id: crypto.randomUUID(),
      name,
      age,
      breed,
      size,
      distanceMiles,
      neighborhood,
      traits,
      about,
      lastActiveISO: new Date(Date.now() - Math.floor(rng()*6*60)*60*1000).toISOString(),
      verified: rng() > 0.6,
      photoUrl: getDogPhotoUrl(action, seed + i),
    });
  }
  return out;
}