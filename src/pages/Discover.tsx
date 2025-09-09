import React, { useMemo, useState } from "react";

/**
 * TailCircle — Discover (30-dog seed, no-fail)
 * - 30 realistic dog profiles seeded locally for an “endless” feel
 * - SafeImage hides any failed image and advances
 * - Floating action bar (never blocked by bottom tabs)
 * - Minimal “like/nope” logic (advance through deck). Hook to backend later.
 *
 * Later: replace SEED_DOGS with Supabase fetch. See TODO near the bottom.
 */

type Dog = {
  id: string;
  name: string;
  age: string;       // e.g., "2y"
  distance: string;  // e.g., "1.2 mi"
  vibes: string[];
  photo: string;     // real-dog photo url
};

const SEED_DOGS: Dog[] = [
  // Photos served by place.dog are real dogs (photography), good CORS, stable.
  // Vary sizes/ids to diversify images.
  { id: "1",  name: "Luna",   age: "2y", distance: "1.2 mi", vibes: ["Playful","Fetch","Good with pups"], photo: "https://place.dog/1200/800?id=101" },
  { id: "2",  name: "Rocky",  age: "4y", distance: "2.8 mi", vibes: ["Swimmer","Calm","Leash trained"],  photo: "https://place.dog/1200/800?id=102" },
  { id: "3",  name: "Maya",   age: "1y", distance: "0.7 mi", vibes: ["High energy","Friendly","Parks"],   photo: "https://place.dog/1200/800?id=103" },
  { id: "4",  name: "Cooper", age: "3y", distance: "3.1 mi", vibes: ["Ball chaser","Gentle","Smart"],     photo: "https://place.dog/1200/800?id=104" },
  { id: "5",  name: "Bella",  age: "5y", distance: "2.2 mi", vibes: ["Sun napper","Treat lover"],         photo: "https://place.dog/1200/800?id=105" },
  { id: "6",  name: "Duke",   age: "2y", distance: "4.5 mi", vibes: ["Fetch","Agility","Friendly"],       photo: "https://place.dog/1200/800?id=106" },
  { id: "7",  name: "Zoe",    age: "3y", distance: "1.9 mi", vibes: ["Beach","Swimmer","Kids ok"],        photo: "https://place.dog/1200/800?id=107" },
  { id: "8",  name: "Buddy",  age: "6y", distance: "0.9 mi", vibes: ["Calm","Tricks","Snuggler"],         photo: "https://place.dog/1200/800?id=108" },
  { id: "9",  name: "Nova",   age: "2y", distance: "2.4 mi", vibes: ["Trail runs","Hydrants","Zoomies"],  photo: "https://place.dog/1200/800?id=109" },
  { id: "10", name: "Milo",   age: "1y", distance: "3.7 mi", vibes: ["High drive","Playgroups"],          photo: "https://place.dog/1200/800?id=110" },
  { id: "11", name: "Ruby",   age: "4y", distance: "5.1 mi", vibes: ["Treat puzzles","Calm"],             photo: "https://place.dog/1200/800?id=111" },
  { id: "12", name: "Rex",    age: "3y", distance: "2.0 mi", vibes: ["Ball pro","Obedience"],             photo: "https://place.dog/1200/800?id=112" },
  { id: "13", name: "Chloe",  age: "2y", distance: "1.3 mi", vibes: ["Friendly","Fetch"],                 photo: "https://place.dog/1200/800?id=113" },
  { id: "14", name: "Zeus",   age: "5y", distance: "6.0 mi", vibes: ["Guardian","Calm"],                  photo: "https://place.dog/1200/800?id=114" },
  { id: "15", name: "Piper",  age: "1y", distance: "3.0 mi", vibes: ["Zoomies","Dog parks"],              photo: "https://place.dog/1200/800?id=115" },
  { id: "16", name: "Mocha",  age: "2y", distance: "0.8 mi", vibes: ["Snuggler","Friendly"],              photo: "https://place.dog/1200/800?id=116" },
  { id: "17", name: "Bear",   age: "4y", distance: "4.2 mi", vibes: ["Hikes","Loyal"],                    photo: "https://place.dog/1200/800?id=117" },
  { id: "18", name: "Sadie",  age: "3y", distance: "2.6 mi", vibes: ["Kids ok","Fetch"],                  photo: "https://place.dog/1200/800?id=118" },
  { id: "19", name: "Finn",   age: "2y", distance: "1.1 mi", vibes: ["Water","Agility"],                  photo: "https://place.dog/1200/800?id=119" },
  { id: "20", name: "Olive",  age: "5y", distance: "3.3 mi", vibes: ["Calm","Beach naps"],                photo: "https://place.dog/1200/800?id=120" },
  { id: "21", name: "Thor",   age: "3y", distance: "2.9 mi", vibes: ["Frisbee","Friendly"],               photo: "https://place.dog/1200/800?id=121" },
  { id: "22", name: "Maggie", age: "2y", distance: "1.4 mi", vibes: ["Gentle","Parks"],                   photo: "https://place.dog/1200/800?id=122" },
  { id: "23", name: "Jax",    age: "1y", distance: "0.6 mi", vibes: ["High energy","Playgroups"],         photo: "https://place.dog/1200/800?id=123" },
  { id: "24", name: "Nala",   age: "4y", distance: "2.1 mi", vibes: ["Leash trained","Friendly"],         photo: "https://place.dog/1200/800?id=124" },
  { id: "25", name: "Scout",  age: "3y", distance: "5.6 mi", vibes: ["Trails","Obedience"],               photo: "https://place.dog/1200/800?id=125" },
  { id: "26", name: "Coco",   age: "2y", distance: "1.7 mi", vibes: ["Tricks","Treats"],                  photo: "https://place.dog/1200/800?id=126" },
  { id: "27", name: "Teddy",  age: "6y", distance: "2.5 mi", vibes: ["Calm","Friendly"],                  photo: "https://place.dog/1200/800?id=127" },
  { id: "28", name: "Koda",   age: "2y", distance: "4.8 mi", vibes: ["Snow","Hikes"],                     photo: "https://place.dog/1200/800?id=128" },
  { id: "29", name: "Ellie",  age: "1y", distance: "0.9 mi", vibes: ["Playful","Kids ok"],                photo: "https://place.dog/1200/800?id=129" },
  { id: "30", name: "Odin",   age: "3y", distance: "3.9 mi", vibes: ["Water","Fetch"],                    photo: "https://place.dog/1200/800?id=130" },
];

// Utility: shuffle once per mount so the deck feels fresh.
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Discover() {
  const [deck, setDeck] = useState<Dog[]>(() => shuffle(SEED_DOGS));
  const [i, setI] = useState(0);
  const dog = deck[i];

  const like = () => setI((p) => Math.min(p + 1, deck.length));
  const nope = () => setI((p) => Math.min(p + 1, deck.length));
  const next = () => setI((p) => Math.min(p + 1, deck.length));

  if (!dog) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-amber-200 via-rose-200 to-sky-200">
        <div className="rounded-2xl bg-white/90 p-8 shadow-xl text-center">
          <div className="text-xl font-semibold">You’re all caught up 🎉</div>
          <p className="mt-2 text-slate-600">Check back later or tap Boost.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-amber-200 via-rose-200 to-sky-200 pb-[140px]"
      style={{ paddingBottom: "calc(140px + env(safe-area-inset-bottom))" }}
    >
      {/* Top bar */}
      <div className="mx-auto flex h-16 w-full max-w-screen-sm items-center justify-between px-4">
        <div className="font-semibold text-slate-800">TailCircle</div>
        <button
          className="rounded-full bg-fuchsia-600/90 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03] active:scale-95"
          onClick={() => {/* hook to Stripe later */}}
        >
          🚀 Boost
        </button>
      </div>

      {/* Card */}
      <div className="mx-auto mt-2 grid w-full max-w-screen-sm place-items-center px-4">
        <div className="relative h-[70vh] w-full rounded-3xl shadow-2xl overflow-hidden mb-14 md:mb-16">
          <SafeImage src={dog.photo} alt={dog.name} onFail={next} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
          <div className="absolute bottom-0 w-full p-5 pb-10 md:pb-14">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-white drop-shadow">
                  {dog.name} <span className="text-white/80">{dog.age}</span>
                </div>
                <div className="mt-1 text-sm text-white/80">{dog.distance} away</div>
              </div>
              <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow">
                Verified ✅
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {dog.vibes.map((v) => (
                <span key={v} className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating actions above bottom nav */}
      <div
        className="fixed inset-x-0 z-30 grid place-items-center pointer-events-none"
        style={{ bottom: "calc(112px + env(safe-area-inset-bottom))" }}
      >
        <div className="pointer-events-auto flex items-center gap-6 rounded-full bg-white/90 px-6 py-3 shadow-xl backdrop-blur">
          <CircleBtn label="Nope" onClick={nope}>✖️</CircleBtn>
          <CircleBtn big label="Playdate" onClick={like}>🐾</CircleBtn>
          <CircleBtn label="Save" onClick={() => {/* favorite later */}}>⭐</CircleBtn>
        </div>
      </div>
    </div>
  );
}

function SafeImage({ src, alt, onFail }: { src: string; alt: string; onFail: () => void }) {
  const [ok, setOk] = useState(true);
  const [loaded, setLoaded] = useState(false);
  return ok ? (
    <img
      src={src}
      alt={alt}
      className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setOk(false);
        onFail();
      }}
      draggable={false}
    />
  ) : (
    // If a photo fails, we show a subtle placeholder for one frame
    <div className="h-full w-full bg-slate-200" />
  );
}

function CircleBtn({
  children,
  onClick,
  label,
  big = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  big?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`grid place-items-center rounded-full bg-white/95 shadow-lg shadow-slate-400/30 transition active:scale-95 ${
        big ? "h-20 w-20 text-2xl" : "h-14 w-14 text-xl"
      }`}
    >
      <span>{children}</span>
    </button>
  );
}

// Optional compatibility for different routers
export const Component = Discover;
export const Page = Discover;

/* ===========================
   TODO: Swap to Supabase later
   ===========================
   - Create storage bucket 'gallery' (public) and folder 'dogs/'
   - Upload your curated 100+ dog photos there (real only).
   - Add a small fetch at the top of Discover:
     const { data } = await supabase.storage.from('gallery').list('dogs', { limit: 60 });
     then build photo URLs and map into Dog[]; if (data?.length) use that deck else fallback to SEED_DOGS.
*/
