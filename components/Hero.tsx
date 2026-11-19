import { Download, ShieldCheck } from 'lucide-react';
import { APK_URL, APP } from '@/lib/config';
import DishStage from './DishStage';

export default function Hero() {
  return (
    <section className="relative -mt-16 flex overflow-hidden pt-16 md:min-h-[100svh] md:items-center">
      <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-brand/15 blur-3xl" />
      <div className="container-x relative grid w-full items-center gap-10 py-12 md:grid-cols-2 md:gap-14 md:py-[clamp(1.5rem,5vh,4rem)]">
        <div>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
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
        <DishStage />
      </div>
    </section>
  );
}
