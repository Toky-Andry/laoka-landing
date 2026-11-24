'use client';
import { Download } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { APK_URL, APP } from '@/lib/config';

const WEEK = [
  ['Lun', 'Akoho rony'],
  ['Mar', 'Crevette sy romazava'],
  ['Mer', 'Ravitoto sy henankisoa'],
  ['Jeu', 'Trondro fritte'],
  ['Ven', 'Ovy sy patsa'],
  ['Sam', 'Henan’omby ritra'],
  ['Dim', 'Akoho fritte'],
];
const STEP = 130; // ms entre deux lignes du menu

const Dots = () => <span className="mx-2 flex-1 border-b-2 border-dotted border-cream/20" />;

export default function Cta() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const end = WEEK.length * STEP;

  return (
    <section className="container-x pb-20 md:pb-28">
      <div ref={ref} className={`grid items-center gap-14 md:grid-cols-[1fr_1.05fr] ${seen ? 'in' : ''}`}>
        <div>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
            Fini le « qu’est-ce qu’on mange ? »
          </h2>
          <p className="mt-4 max-w-sm text-lg text-ink/70">Gratuit, sans publicité, et sans compte à créer.</p>
          <a href={APK_URL} className="btn-brand mt-8"><Download size={18} /> Télécharger Laoka</a>
          <p className="mt-4 text-sm text-ink/50">Android 7+ · {APP.size}</p>
        </div>

        <div className="relative transition duration-300 md:-rotate-[1.2deg] md:hover:rotate-0">
          <div className="rounded-[1.75rem] bg-ink p-3 shadow-2xl shadow-ink/20">
            <div className="rounded-[1.4rem] border-2 border-dashed border-cream/20 px-6 py-8 text-cream md:px-9">
              <p className="text-center font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand">Menu de la semaine</p>
              <ul className="mt-6 grid gap-3.5">
                {WEEK.map(([day, dish], i) => (
                  <li key={day} className="week-item flex items-baseline" style={{ animationDelay: `${i * STEP}ms` }}>
                    <span className="w-10 shrink-0 text-[13px] font-bold uppercase tracking-widest text-brand">{day}</span>
                    <Dots />
                    <span className="text-right text-[15px] font-medium">{dish}</span>
                  </li>
                ))}
              </ul>
              <div className="week-item mt-6 flex items-baseline border-t border-cream/15 pt-5 font-display text-xl font-extrabold" style={{ animationDelay: `${end + 100}ms` }}>
                <span>Addition</span>
                <Dots />
                <span className="text-brand">0 Ar</span>
              </div>
            </div>
          </div>
          <span
            className="stamp absolute -right-2 -top-5 rounded-xl border-[3px] border-brand bg-cream px-4 py-1.5 font-display text-xl font-extrabold uppercase tracking-widest text-brand shadow-lg"
            style={{ animationDelay: `${end + 500}ms` }}
          >
            Gratuit
          </span>
        </div>
      </div>
    </section>
  );
}
