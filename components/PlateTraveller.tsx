'use client';
import { useEffect, useRef } from 'react';
import { DISHES } from '@/lib/dishes';

const N = DISHES.length;
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

// Une seule assiette pour toute la page.
// Ordinateur : elle se pose sur chaque [data-dock] et glisse de l’un à l’autre en changeant de plat.
// Mobile : elle rétrécit jusqu’au centre de la barre du haut ([data-nav-dock]), puis tourne avec
// le défilement et change de plat à chaque section.
export default function PlateTraveller() {
  const el = useRef<HTMLDivElement>(null);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);
  const base = useRef(0); // plat affiché dans le hero

  useEffect(() => {
    const on = (e: Event) => { base.current = (e as CustomEvent<number>).detail; };
    window.addEventListener('dish', on);
    return () => window.removeEventListener('dish', on);
  }, []);

  useEffect(() => {
    const node = el.current;
    const plate = document.querySelector<HTMLElement>('[data-plate]');
    const navDock = document.querySelector<HTMLElement>('[data-nav-dock]');
    const docks = Array.from(document.querySelectorAll<HTMLElement>('[data-dock]'));
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));
    if (!node || !plate) return;
    const wide = matchMedia('(min-width: 768px)');
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;

    const hide = () => {
      node.style.opacity = '0';
      plate.style.visibility = '';
    };

    // Place l’assiette entre deux rectangles (a → b), avec fondu entre deux plats.
    const place = (a: DOMRect, b: DOMRect, t: number, y: number, from: number, to: number, mix: number) => {
      const w = lerp(a.width, b.width, t);
      const cx = lerp(a.left + a.width / 2, b.left + b.width / 2, t);
      const cy = lerp(a.top + a.height / 2, b.top + b.height / 2, t);
      imgs.current.forEach((im, k) => {
        if (im) im.style.opacity = k === to ? String(mix) : k === from ? String(1 - mix) : '0';
      });
      node.style.width = node.style.height = `${w}px`;
      node.style.transform = `translate(${cx - w / 2}px, ${cy - w / 2}px) rotate(${still.matches ? 0 : y * 0.06 + t * 40}deg)`;
      node.style.opacity = '1';
      plate.style.visibility = 'hidden';
    };

    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = innerHeight;
      if (y < 4) return hide();

      if (!wide.matches) {
        if (!navDock) return hide();
        // arrivée dans la barre en un demi-écran de défilement
        const t = smooth(clamp(y / (vh * 0.55)));
        // p = nombre de sections passées (avec fondu), 0 = hero
        let p = 0;
        sections.slice(1).forEach((s) => { p += clamp((vh * 0.6 - s.getBoundingClientRect().top) / (vh * 0.2)); });
        const k = Math.floor(p);
        return place(plate.getBoundingClientRect(), navDock.getBoundingClientRect(), t, y, (base.current + k) % N, (base.current + k + 1) % N, p - k);
      }

      if (docks.length === 0) return hide();
      const anchors = [plate, ...docks];
      // valeur de défilement où la section de chaque ancre est centrée (0 pour le hero)
      const at = anchors.map((a, i) => {
        const sec = a.closest('section');
        if (i === 0 || !sec) return 0;
        const r = sec.getBoundingClientRect();
        return r.top + y + r.height / 2 - vh / 2;
      });
      let i = 0;
      while (i < anchors.length - 2 && y >= at[i + 1]) i++;
      const raw = clamp((y - at[i]) / Math.max(1, at[i + 1] - at[i]));
      const t = smooth(clamp((raw - 0.25) / 0.5)); // pause au début et à la fin du trajet
      place(anchors[i].getBoundingClientRect(), anchors[i + 1].getBoundingClientRect(), t, y, (base.current + i) % N, (base.current + i + 1) % N, t);
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
      className="pointer-events-none fixed left-0 top-0 z-40 rounded-full bg-white opacity-0 shadow-2xl shadow-brand/25 ring-1 ring-ink/5 max-md:z-[60]"
      style={{ willChange: 'transform, width, height' }}
    >
      {DISHES.map((d, k) => (
        <img
          key={d.slug}
          ref={(n) => { imgs.current[k] = n; }}
          src={d.src}
          alt=""
          style={{ opacity: k === 0 ? 1 : 0 }}
          className="absolute inset-[11%] h-[78%] w-[78%] rounded-full object-cover"
        />
      ))}
    </div>
  );
}
