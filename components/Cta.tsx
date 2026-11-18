'use client';
import { Check, Download } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { APK_URL } from '@/lib/config';

const WEEK = [
  ['Lun', 'Akoho rony', '#ec7f13'],
  ['Mar', 'Crevette sy romazava', '#f59e0b'],
  ['Mer', 'Ravitoto sy henankisoa', '#22c55e'],
  ['Jeu', 'Trondro fritte', '#3b82f6'],
  ['Ven', 'Ovy sy patsa', '#8b5cf6'],
  ['Sam', 'Henan’omby ritra', '#ef4444'],
  ['Dim', 'Akoho fritte', '#06b6d4'],
];
const STEP = 120; // ms entre deux jours

export default function Cta() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="container-x pb-20 md:pb-28">
      <div ref={ref} className={`rounded-[2rem] bg-brand px-5 py-14 text-center text-white shadow-2xl shadow-brand/30 md:px-10 md:py-20 ${seen ? 'in' : ''}`}>
        <h2 className="mx-auto max-w-2xl font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Fini le « qu’est-ce qu’on mange ? »
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/85">Gratuit, sans publicité, et sans compte à créer.</p>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
          {WEEK.map(([day, dish, color], i) => (
            <div key={day} className="week-item rounded-2xl bg-white p-3 text-left text-ink shadow-lg shadow-ink/10" style={{ animationDelay: `${i * STEP}ms` }}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color }}>{day}</span>
                <span className="grid h-5 w-5 place-items-center rounded-full text-white" style={{ background: color }}>
                  <Check size={12} strokeWidth={3} />
                </span>
              </div>
              <p className="mt-2 text-[13px] font-semibold leading-snug">{dish}</p>
            </div>
          ))}
        </div>

        <a href={APK_URL} className="week-item btn mt-10 bg-white text-brand-dark hover:-translate-y-0.5 hover:shadow-xl" style={{ animationDelay: `${WEEK.length * STEP + 250}ms` }}>
          <Download size={18} /> Télécharger Laoka
        </a>
      </div>
    </section>
  );
}
