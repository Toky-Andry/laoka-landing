'use client';
import { Download } from 'lucide-react';
import { APK_URL } from '@/lib/config';
import { DISHES } from '@/lib/dishes';
import { useDishSwap } from './useDishSwap';

export default function DishStage() {
  const s = useDishSwap();
  const shown = DISHES[s.shown];
  const act = DISHES[s.active];
  const next = [1, 2].map((o) => (s.active + o) % DISHES.length);

  return (
    <div ref={s.stage} {...s.bind} className="relative mx-auto flex w-full max-w-[420px] md:ml-auto md:mr-0 touch-pan-y select-none flex-col items-center">
      <div ref={s.plateBox} style={{ width: 'clamp(180px, 34vh, 300px)', height: 'clamp(180px, 34vh, 300px)' }}
        className="relative rounded-full bg-white shadow-2xl shadow-brand/25 ring-1 ring-ink/5">
        <div className="absolute inset-[6%] rounded-full ring-1 ring-ink/10" />
        {DISHES.map((d, i) => (
          <img
            key={d.slug}
            ref={(el) => { s.plates.current[i] = el; }}
            src={d.src}
            alt={d.name}
            style={{ opacity: i === 0 ? 1 : 0 }}
            className="absolute inset-[11%] h-[78%] w-[78%] rounded-full object-cover"
          />
        ))}
      </div>

      <div className="mt-7 text-center">
        <p className="eyebrow">{shown.day} · {shown.mg}</p>
        <div className="mt-2 h-11 overflow-hidden">
          <span key={s.shown} ref={s.titleEl} className="roll-in block font-display text-3xl font-extrabold leading-[2.75rem]">
            {shown.name}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        {next.map((i) => (
          <button
            key={`${s.active}-${i}`}
            ref={(el) => { s.rail.current[i] = el; }}
            onClick={() => s.swap(i, true)}
            aria-label={DISHES[i].name}
            className="rail-in h-16 w-16 overflow-hidden rounded-full shadow-lg ring-2 ring-white transition hover:-translate-y-1 hover:ring-brand"
          >
            <img src={DISHES[i].src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
        <div className="ml-2 flex items-center gap-1.5">
          {DISHES.map((d, i) => (
            <button
              key={d.slug}
              onClick={() => s.swap(i, true)}
              aria-label={d.name}
              className={`h-1 rounded-full transition-all duration-300 ${i === s.active ? 'w-5 bg-ink' : 'w-1.5 bg-ink/25'}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex w-full items-center gap-3 rounded-2xl bg-white p-2.5 shadow-xl shadow-ink/10">
        <div key={s.active} className="fade-in flex min-w-0 flex-1 items-center gap-3">
          <img src={act.src} alt="" className="h-11 w-11 rounded-xl object-cover" />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold uppercase tracking-wide">{act.name}</p>
            <p className="text-xs text-ink/50">{act.day} · {act.mg}</p>
          </div>
        </div>
        <a href={APK_URL} className="btn-brand !gap-2 !px-4 !py-2.5 text-sm">
          <Download size={16} /> Obtenir l’app
        </a>
      </div>
    </div>
  );
}
