import React from "react";

/** Full-bleed shimmer card used while content loads */
export function ShimmerCard() {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200 to-slate-100">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/40 to-transparent [background-size:200%_100%]" />
      <div className="absolute bottom-0 w-full p-5 pb-10">
        <div className="h-6 w-40 rounded bg-white/60" />
        <div className="mt-2 h-4 w-28 rounded bg-white/50" />
        <div className="mt-3 flex gap-2">
          <div className="h-7 w-20 rounded-full bg-white/50" />
          <div className="h-7 w-24 rounded-full bg-white/50" />
          <div className="h-7 w-28 rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  );
}

/** Small rectangular shimmer used in grids (e.g., Events) */
export function ShimmerTile() {
  return (
    <div className="overflow-hidden rounded-2xl bg-slate-100">
      <div className="aspect-[4/3] w-full animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 [background-size:200%_100%]" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-2/3 rounded bg-slate-200" />
        <div className="h-3 w-1/2 rounded bg-slate-200" />
      </div>
    </div>
  );
}
