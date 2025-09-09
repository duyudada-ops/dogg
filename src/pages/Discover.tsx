import React, { useMemo, useRef, useState } from "react";

/**
 * TailCircle — Discover (Swipe Cards)
 * - Full-screen card stack with like / nope and subtle tilt on drag
 * - Tag chips, distance, and quick actions
 * - “Boost” CTA (hook it to your paywall later)
 *
 * Pure React + Tailwind. No extra libraries.
 * Drop-in replacement for your /discover route.
 */

type Dog = {
  id: string;
  name: string;
  age: string;
  distance: string;
  vibes: string[];
  photo: string;
};

const DUMMY_DOGS: Dog[] = [
  {
    id: "1",
    name: "Luna",
    age: "2y",
    distance: "1.2 mi",
    vibes: ["Playful", "Fetch", "Good with pups"],
    photo:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Rocky",
    age: "4y",
    distance: "2.8 mi",
    vibes: ["Swimmer", "Calm", "Leash trained"],
    photo:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Maya",
    age: "1y",
    distance: "0.7 mi",
    vibes: ["High energy", "Friendly", "Loves parks"],
    photo:
      "https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function Discover() {
  const [deck, setDeck] = useState<Dog[]>(DUMMY_DOGS);
  const topCardId = deck[0]?.id;

  // pointer drag state for top card
  const dragRef = useRef({ x: 0, y: 0, active: false });

  const handleLike = () => swipeOut("right");
  const handleNope = () => swipeOut("left");
  const handleBoost = () => {
    // TODO: connect to Stripe paywall
    alert("Boost activated (demo). Make your dog profile top of stack for 30 min.");
  };

  function swipeOut(direction: "left" | "right") {
    // Animate-out by removing the top dog and rotating a little
    setDeck((prev) => prev.slice(1));
    // TODO: call your API to record like/nope + show “It’s a Match!” if both liked
  }

  // Style helpers for tag chips
  const tagStyle =
    "inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur";

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-amber-200 via-rose-200 to-sky-200">
      {/* Top bar */}
      <div className="mx-auto flex h-16 w-full max-w-screen-sm items-center justify-between px-4">
        <div className="font-semibold text-slate-800">TailCircle</div>
        <button
          onClick={handleBoost}
          className="rounded-full bg-fuchsia-600/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-[1.03] active:scale-95"
        >
          🚀 Boost
        </button>
      </div>

      {/* Card stack area */}
      <div className="mx-auto mt-2 grid w-full max-w-screen-sm place-items-center px-4">
        <div className="relative h-[70vh] w-full">
          {deck
            .slice(0, 3)
            .reverse()
            .map((dog, i) => {
              const isTop = dog.id === topCardId;
              const z = 50 - i;
              const scale = 1 - i * 0.03;
              const translateY = i * 10;

              return (
                <Card
                  key={dog.id}
                  dog={dog}
                  isTop={isTop}
                  style={{
                    zIndex: z,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                  }}
                  onDrag={(dx, dy) => {
                    if (!isTop) return;
                    dragRef.current.x = dx;
                    dragRef.current.y = dy;
                  }}
                  onRelease={(dx) => {
                    if (!isTop) return;
                    const threshold = 120;
                    if (dx > threshold) handleLike();
                    else if (dx < -threshold) handleNope();
                  }}
                />
              );
            })}
          {deck.length === 0 && (
            <div className="absolute inset-0 grid place-items-center rounded-3xl border border-white/30 bg-white/30 p-8 text-center text-slate-700 backdrop-blur">
              <div className="text-xl font-semibold">You’re all caught up 🎉</div>
              <p className="mt-2 text-sm">
                Check back later or tap <span className="font-semibold">Boost</span> to jump the queue.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex w-full max-w-md items-center justify-between">
          <CircleBtn label="Nope" onClick={handleNope}>✖️</CircleBtn>
          <CircleBtn big label="Playdate" onClick={handleLike}>🐾</CircleBtn>
          <CircleBtn label="Save" onClick={() => alert("Saved to favorites")}>⭐</CircleBtn>
        </div>

        {/* Helper copy */}
        <p className="mt-3 text-xs text-slate-600">Swipe left to pass · right to connect · long-press photo to zoom</p>
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

function Card({
  dog,
  isTop,
  style,
  onDrag,
  onRelease,
}: {
  dog: Dog;
  isTop: boolean;
  style?: React.CSSProperties;
  onDrag?: (dx: number, dy: number) => void;
  onRelease?: (dx: number, dy: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const state = useRef({ active: false, startX: 0, startY: 0, dx: 0, dy: 0 });

  function setTransform(dx: number, dy: number) {
    const rot = dx * 0.05;
    if (cardRef.current) {
      cardRef.current.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
    }
    onDrag?.(dx, dy);
  }

  function resetTransform() {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 200ms ease";
      cardRef.current.style.transform = "";
      setTimeout(() => {
        if (cardRef.current) cardRef.current.style.transition = "";
      }, 220);
    }
  }

  const handlers = useMemo(() => {
    const onPointerDown = (e: React.PointerEvent) => {
      if (!isTop) return;
      state.current.active = true;
      state.current.startX = e.clientX;
      state.current.startY = e.clientY;
      (e.target as Element).setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent) => {
      if (!state.current.active || !isTop) return;
      state.current.dx = e.clientX - state.current.startX;
      state.current.dy = e.clientY - state.current.startY;
      setTransform(state.current.dx, state.current.dy);
    };
    const onPointerUp = () => {
      if (!isTop) return;
      state.current.active = false;
      const { dx, dy } = state.current;
      const threshold = 120;
      if (dx > threshold || dx < -threshold) {
        onRelease?.(dx, dy);
        // quick fly-out animation
        if (cardRef.current) {
          const flyX = dx > 0 ? 800 : -800;
          cardRef.current.style.transition = "transform 260ms ease";
          cardRef.current.style.transform = `translate(${flyX}px, ${dy}px) rotate(${dx > 0 ? 25 : -25}deg)`;
        }
      } else {
        resetTransform();
      }
    };
    return { onPointerDown, onPointerMove, onPointerUp };
  }, [isTop, onRelease]);

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 select-none rounded-3xl shadow-2xl"
      style={style}
      {...handlers}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl">
        <img
          src={dog.photo}
          alt={`${dog.name}`}
          className="h-full w-full object-cover"
          draggable={false}
        />
        {/* gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
        {/* info */}
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
              <span key={v} className={tagStyle}>
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* like/nope labels (visual feedback on drag) */}
        {isTop && (
          <>
            <CornerLabel side="left" />
            <CornerLabel side="right" />
          </>
        )}
      </div>
    </div>
  );
}

function CornerLabel({ side }: { side: "left" | "right" }) {
  const base =
    "pointer-events-none absolute top-6 rounded-md border-2 px-3 py-1 text-lg font-extrabold tracking-widest";
  const left = "left-6 rotate-[-12deg] border-rose-500 text-rose-600 bg-white/90";
  const right = "right-6 rotate-[12deg] border-emerald-500 text-emerald-600 bg-white/90";
  return <div className={`${base} ${side === "left" ? left : right}`}>{side === "left" ? "NOPE" : "PLAYDATE"}</div>;
}
