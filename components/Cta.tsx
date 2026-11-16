import { Download } from 'lucide-react';
import { APK_URL } from '@/lib/config';

export default function Cta() {
  return (
    <section className="container-x pb-20 md:pb-28">
      <div className="rounded-[2rem] bg-brand px-6 py-14 text-center text-white shadow-2xl shadow-brand/30 md:py-20">
        <h2 className="mx-auto max-w-2xl font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Fini le « qu’est-ce qu’on mange ? »
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/85">Gratuit, sans publicité, et sans compte à créer.</p>
        <a href={APK_URL} className="btn mt-8 bg-white text-brand-dark hover:-translate-y-0.5 hover:shadow-xl">
          <Download size={18} /> Télécharger Laoka
        </a>
      </div>
    </section>
  );
}
