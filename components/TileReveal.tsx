'use client';
import { useEffect, useState } from 'react';

const COLS = 10;
const ROWS = 6;
const DURATION = 600;

export default function TileReveal() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true);
      return;
    }
    const tiles = Array.from(document.querySelectorAll<HTMLElement>('[data-tile]'));
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    const t0 = performance.now() + 250;
    let hidden = 0;
    let raf = 0;
    const tick = (now: number) => {
      const n = Math.floor((Math.max(0, now - t0) / DURATION) * tiles.length);
      while (hidden < Math.min(n, tiles.length)) tiles[hidden++].style.visibility = 'hidden';
      if (hidden >= tiles.length) setDone(true);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (done) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => (
        <div key={i} data-tile className="bg-brand-soft" />
      ))}
    </div>
  );
}
