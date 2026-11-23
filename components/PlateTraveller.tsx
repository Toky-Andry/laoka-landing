'use client';
import { useEffect, useRef, useState } from 'react';
import { DISHES } from '@/lib/dishes';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// Une seule assiette : elle quitte le hero au défilement, se pose à côté de la liste
// des fonctionnalités et tourne pendant qu’on lit.
export default function PlateTraveller() {
  const el = useRef<HTMLDivElement>(null);
  const [dish, setDish] = useState(0);

  useEffect(() => {
    const on = (e: Event) => setDish((e as CustomEvent<number>).detail);
    window.addEventListener('dish', on);
    return () => window.removeEventListener('dish', on);
  }, []);

  useEffect(() => {
    const node = el.current;
    const plate = document.querySelector<HTMLElement>('[data-plate]');
    const dock = document.querySelector<HTMLElement>('[data-dock]');
    if (!node || !plate || !dock) return;
    const wide = matchMedia('(min-width: 768px)');
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;

    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      if (!wide.matches || y < 4) {
        node.style.opacity = '0';
        plate.style.visibility = '';
        return;
      }
      const a = plate.getBoundingClientRect();
      const d = dock.getBoundingClientRect();
      const t = ease(Math.min(1, y / (innerHeight * 0.85)));
      const w = lerp(a.width, d.width, t);
      const cx = lerp(a.left + a.width / 2, d.left + d.width / 2, t);
      const cy = lerp(a.top + a.height / 2, d.top + d.height / 2, t);
      const spin = still.matches ? 0 : t * 20 + y * 0.06;
      node.style.width = node.style.height = `${w}px`;
      node.style.transform = `translate(${cx - w / 2}px, ${cy - w / 2}px) rotate(${spin}deg)`;
      node.style.opacity = '1';
      plate.style.visibility = 'hidden';
    };
    const tick = () => { if (!raf) raf = requestAnimationFrame(frame); };

    tick();
    addEventListener('scroll', tick, { passive: true });
    addEventListener('resize', tick);
    return () => {
      removeEventListener('scroll', tick);
      removeEventListener('resize', tick);
      cancelAnimationFrame(raf);
      plate.style.visibility = '';
    };
  }, []);

  return (
    <div
      ref={el}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 rounded-full bg-white opacity-0 shadow-2xl shadow-brand/25 ring-1 ring-ink/5"
      style={{ willChange: 'transform, width, height' }}
    >
      <img src={DISHES[dish].src} alt="" className="absolute inset-[11%] h-[78%] w-[78%] rounded-full object-cover" />
    </div>
  );
}
