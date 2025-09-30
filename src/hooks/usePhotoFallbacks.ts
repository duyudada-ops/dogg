import { useEffect, useMemo, useState } from 'react';

type Photo = { src: string; alt?: string; vibe?: string };

async function preload(src: string): Promise<boolean> {
  try {
    const ok = await new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
    return ok;
  } catch {
    return false;
  }
}

/**
 * Returns the primary photos but replaces any that fail to load
 * with unique items from fallbacks. Keeps array length + order.
 */
export function usePhotoFallbacks(primary: Photo[], fallbacks: Photo[]) {
  const [finals, setFinals] = useState<Photo[]>(primary);

  const base = useMemo(() => primary.slice(0), [primary]);
  const pool = useMemo(() => fallbacks.slice(0), [fallbacks]);

  useEffect(() => {
    let disposed = false;

    (async () => {
      const used = new Set<string>();
      const out: Photo[] = [];

      // mark primary sources so we don't duplicate with fallbacks
      base.forEach(p => used.add(p.src));

      for (let i = 0; i < base.length; i++) {
        const p = base[i];
        const ok = await preload(p.src);

        if (ok) {
          out.push(p);
        } else {
          // find next unused fallback
          const fb = pool.find(f => !used.has(f.src));
          if (fb) {
            used.add(fb.src);
            out.push({ ...fb, vibe: p.vibe ?? fb.vibe });
            // remove picked fallback from pool
            pool.splice(pool.indexOf(fb), 1);
          } else {
            // nothing left; keep original to preserve length
            out.push(p);
          }
        }
        if (disposed) return;
      }

      if (!disposed) setFinals(out);
    })();

    return () => { disposed = true; };
  }, [base, pool]);

  return finals;
}
