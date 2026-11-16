import { Download, ShieldCheck } from 'lucide-react';
import { APK_URL, APP } from '@/lib/config';
import PhoneMockup from './PhoneMockup';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-brand/15 blur-3xl" />
      <div className="container-x relative grid items-center gap-14 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-semibold text-brand-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Application Android gratuite
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            Quel <span className="text-brand">laoka</span> ce soir ?
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">
            Planifiez vos repas de la semaine, générez votre liste de courses et laissez la roue décider quand l’inspiration manque.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={APK_URL} className="btn-brand"><Download size={18} /> Télécharger l’APK</a>
            <a href="#features" className="btn-ghost">Découvrir</a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-ink/50">
            <ShieldCheck size={16} /> Version {APP.version} · {APP.size} · Android 7+
          </p>
        </div>
        <PhoneMockup />
      </div>
    </section>
  );
}
