import React from "react";

export default function Discover() {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-amber-200 via-rose-200 to-sky-200">
      <div className="rounded-2xl bg-white/90 p-8 shadow-xl">
        <h1 className="text-2xl font-bold">Discover route OK ✅</h1>
        <p className="mt-2 text-slate-600">If you can see this, the crash was inside the fancy card code.</p>
      </div>
    </div>
  );
}

// router compatibility (harmless if unused)
export const Component = Discover;
export const Page = Discover;
