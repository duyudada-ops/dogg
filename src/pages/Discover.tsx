import React, { useState } from "react";

type Dog = {
  id: string;
  name: string;
  age: string;
  distance: string;
  vibes: string[];
  photo: string;
};

const DUMMY_DOGS: Dog[] = [
  { id: "1", name: "Luna", age: "2y", distance: "1.2 mi", vibes: ["Playful","Fetch","Good with pups"], photo: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1400&auto=format&fit=crop" },
  { id: "2", name: "Rocky", age: "4y", distance: "2.8 mi", vibes: ["Swimmer","Calm","Leash trained"], photo: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1400&auto=format&fit=crop" },
  { id: "3", name: "Maya", age: "1y", distance: "0.7 mi", vibes: ["High energy","Friendly","Loves parks"], photo: "https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=1400&auto=format&fit=crop" },
];

export default function Discover() {
  const [i, setI] = useState(0);
  const dog = DUMMY_DOGS[i];

  const next = () => setI((p) => Math.min(p + 1, DUMMY_DOGS.length));
  const like = () => next();
  const nope = () => next();

  if (!dog) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-amber-200 via-rose-200 to-sky-200">
        <div className="rounded-2xl bg-white/90 p-8 shadow-xl text-center">
          <div className="text-xl font-semibold">You’re all caught up 🎉</div>
          <p className="mt-2 text-slate-600">Come back later or add more profiles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-amber-200 via-rose-200 to-sky-200">
      <div className="mx-auto flex h-16 w-full max-w-screen-sm items-center justify-between px-4">
        <div className="font-semibold text-slate-800">TailCircle</div>
        <button
          className="rounded-full bg-fuchsia-600/90 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03] active:scale-95"
          onClick={() => {/* connect to paywall later */}}
        >
          🚀 Boost
        </button>
      </div>

      <div className="mx-auto mt-2 grid w-full max-w-screen-sm place-items-center px-4">
        <div className="relative h-[70vh] w-full rounded-3xl shadow-2xl overflow-hidden">
          <img src={dog.photo} alt={dog.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
          <div className="absolute bottom-0 w-full p-5">
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

{/* Floating actions above bottom nav */}
<div
  className="fixed inset-x-0 z-30 grid place-items-center"
  style={{ bottom: "calc(88px + env(safe-area-inset-bottom))" }} // ~height of your bottom tabs
>
  <div className="flex items-center gap-6 rounded-full bg-white/90 px-6 py-3 shadow-xl backdrop-blur">
    <CircleBtn label="Nope" onClick={nope}>✖️</CircleBtn>
    <CircleBtn big label="Playdate" onClick={like}>🐾</CircleBtn>
    <CircleBtn label="Save" onClick={() => { /* favorite later */ }}>⭐</CircleBtn>
  </div>
</div>


        <p className="mt-3 text-xs text-slate-600">Tap Playdate or Nope to cycle demo cards.</p>
      </div>
    </div>
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
      className={`grid place-items-center rounded-full bg-white/90 shadow-lg shadow-slate-400/30 transition active:scale-95 ${
        big ? "h-20 w-20 text-2xl" : "h-14 w-14 text-xl"
      }`}
    >
      <span>{children}</span>
    </button>
  );
}

export const Component = Discover;
export const Page = Discover;
