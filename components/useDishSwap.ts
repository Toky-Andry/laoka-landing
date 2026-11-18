import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { DISHES } from '@/lib/dishes';

const N = DISHES.length;
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// Le plat suivant quitte le rail, grossit et se pose sur l’assiette.
function fly(stage: HTMLElement, from: HTMLElement, to: HTMLElement, src: string) {
  const s = stage.getBoundingClientRect();
  const f = from.getBoundingClientRect();
  const t = to.getBoundingClientRect();
  const el = document.createElement('div');
  Object.assign(el.style, {
    position: 'absolute', left: `${f.left - s.left}px`, top: `${f.top - s.top}px`,
    width: `${f.width}px`, height: `${f.height}px`, borderRadius: '9999px',
    background: `url(${src}) center/cover`, zIndex: '4', pointerEvents: 'none',
    boxShadow: '0 12px 30px rgba(36,24,16,.25)',
  });
  stage.appendChild(el);
  const dx = t.left + t.width / 2 - (f.left + f.width / 2);
  const dy = t.top + t.height / 2 - (f.top + f.height / 2);
  const k = (t.width * 0.78) / f.width;
  el.animate(
    { transform: ['translate(0,0) scale(1)', `translate(${dx}px,${dy}px) scale(${k})`] },
    { duration: 950, delay: 60, easing: 'cubic-bezier(.22,.9,.3,1)', fill: 'both' },
  );
  el.animate(
    { opacity: [1, 1, 0.6, 0], offset: [0, 0.45, 0.72, 1] },
    { duration: 1010, delay: 60, easing: 'ease-in-out', fill: 'both' },
  ).finished.then(() => el.remove());
}

export function useDishSwap() {
  const [active, setActive] = useState(0); // plat sur l’assiette, rail, points
  const [shown, setShown] = useState(0); // titre affiché
  const stage = useRef<HTMLDivElement>(null);
  const plateBox = useRef<HTMLDivElement>(null);
  const titleEl = useRef<HTMLSpanElement>(null);
  const plates = useRef<(HTMLElement | null)[]>([]);
  const rail = useRef<Record<number, HTMLElement | null>>({});
  const cur = useRef(0);
  const busy = useRef(false);
  const paused = useRef(false);
  const nextAt = useRef(Date.now() + 2600);
  const startX = useRef(0);

  const swap = useCallback((t: number, user = false) => {
    const a = cur.current;
    const pa = plates.current[a];
    const pt = plates.current[t];
    if (busy.current || t === a || !pa || !pt || !stage.current || !plateBox.current) return;
    if (user) nextAt.current = Date.now() + 6000;
    if (reduced()) {
      pa.style.opacity = '0'; pt.style.opacity = '1';
      cur.current = t; setActive(t); setShown(t);
      return;
    }
    busy.current = true;
    pa.style.zIndex = '1'; pt.style.zIndex = '2';
    const fade = pt.animate({ opacity: [0, 1] }, { duration: 760, delay: 420, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'both' });
    fade.finished.then(() => {
      pt.style.opacity = '1'; pa.style.opacity = '0'; fade.cancel();
      busy.current = false;
      nextAt.current = Math.max(nextAt.current, Date.now() + 2000);
    });
    titleEl.current?.animate({ transform: ['translateY(0)', 'translateY(-105%)'] }, { duration: 250, delay: 100, easing: 'cubic-bezier(.55,0,.8,.3)', fill: 'forwards' });
    Object.values(rail.current).forEach((el) => el?.animate({ opacity: [1, 0] }, { duration: 200, delay: 100, fill: 'forwards' }));
    const from = rail.current[t] ?? rail.current[(a + 1) % N] ?? plateBox.current;
    fly(stage.current, from, plateBox.current, DISHES[t].src);
    setTimeout(() => setShown(t), 350);
    setTimeout(() => { cur.current = t; setActive(t); }, 600);
  }, []);

  useEffect(() => {
    if (reduced()) return;
    const id = setInterval(() => {
      if (!paused.current && !busy.current && !document.hidden && Date.now() >= nextAt.current) swap((cur.current + 1) % N);
    }, 300);
    return () => clearInterval(id);
  }, [swap]);

  const bind = {
    onPointerEnter: (e: PointerEvent) => { if (e.pointerType === 'mouse') paused.current = true; },
    onPointerLeave: () => { paused.current = false; },
    onPointerDown: (e: PointerEvent) => { startX.current = e.clientX; },
    onPointerUp: (e: PointerEvent) => {
      const dx = e.clientX - startX.current;
      if (Math.abs(dx) > 40) swap((cur.current + (dx < 0 ? 1 : N - 1)) % N, true);
    },
  };

  return { active, shown, swap, stage, plateBox, titleEl, plates, rail, bind };
}
