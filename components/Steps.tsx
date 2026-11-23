'use client';
import { Download, ShieldCheck, Smartphone } from 'lucide-react';
import type { ReactNode } from 'react';
import { APK_URL, APP } from '@/lib/config';
import { useInView } from './useInView';

// Petites maquettes d’interface Android, animées quand la section arrive à l’écran.
const Chip = ({ children }: { children: ReactNode }) => (
  <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-sm">{children}</div>
);

const steps = [
  {
    icon: Download,
    title: 'Télécharger',
    text: `Touchez le bouton : le fichier Laoka.apk (${APP.size}) arrive dans vos téléchargements.`,
    visual: (
      <Chip>
        <Download size={18} className="shrink-0 text-brand" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">Laoka.apk <span className="text-white/40">· {APP.size}</span></p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-0 rounded-full bg-brand transition-all delay-700 duration-[2200ms] group-[.in]:w-full" />
          </div>
        </div>
      </Chip>
    ),
  },
  {
    icon: ShieldCheck,
    title: 'Autoriser',
    text: 'Si Android le demande, autorisez l’installation depuis votre navigateur (Paramètres, Sécurité, Applications inconnues).',
    visual: (
      <Chip>
        <span className="flex-1 font-medium">Autoriser cette source</span>
        <span className="relative h-6 w-11 rounded-full bg-white/20 transition-colors delay-[1400ms] duration-500 group-[.in]:bg-brand">
          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform delay-[1400ms] duration-500 group-[.in]:translate-x-5" />
        </span>
      </Chip>
    ),
  },
  {
    icon: Smartphone,
    title: 'Installer',
    text: `Ouvrez le fichier, installez, puis lancez Laoka. ${APP.laoka} laoka sont déjà prêts.`,
    visual: (
      <Chip>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18a9 9 0 0 1-18 0Z" />
            <path d="M8 8c0-1.5 1-1.5 1-3M12 8c0-1.5 1-1.5 1-3M16 8c0-1.5 1-1.5 1-3" />
          </svg>
        </span>
        <span className="flex-1 font-medium">Laoka</span>
        <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-ink">Ouvrir</span>
      </Chip>
    ),
  },
];

export default function Steps() {
  const { ref, seen } = useInView<HTMLDivElement>();

  return (
    <section id="install" className="bg-ink py-20 text-white md:py-28">
      <div ref={ref} className={`container-x group ${seen ? 'in' : ''}`}>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Installation</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">Prêt en trois étapes</h2>
          </div>
          <div data-dock className="hidden aspect-square w-40 md:block" />
        </div>

        <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          <span aria-hidden className="absolute left-6 right-6 top-6 hidden h-px bg-white/10 md:block">
            <span className="block h-full origin-left scale-x-0 bg-brand transition-transform duration-[2200ms] group-[.in]:scale-x-100" />
          </span>
          {steps.map(({ icon: Icon, title, text, visual }, i) => (
            <li key={title} className="week-item relative" style={{ animationDelay: `${i * 250}ms` }}>
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-ink text-brand ring-2 ring-brand">
                <Icon size={20} />
              </span>
              <p className="mt-5 font-display text-sm font-extrabold tracking-widest text-white/30">0{i + 1}</p>
              <h3 className="mt-1 font-display text-2xl font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{text}</p>
              {visual}
            </li>
          ))}
        </ol>

        <a href={APK_URL} className="btn-brand mt-12">
          <Download size={18} /> Télécharger l’APK
        </a>
      </div>
    </section>
  );
}
