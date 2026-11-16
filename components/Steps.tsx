import { Download, ShieldCheck, Smartphone } from 'lucide-react';
import { APK_URL, APP } from '@/lib/config';

const steps = [
  { icon: Download, title: 'Télécharger', text: `Touchez le bouton : le fichier Laoka.apk (${APP.size}) arrive dans vos téléchargements.` },
  { icon: ShieldCheck, title: 'Autoriser', text: 'Si Android le demande, autorisez l’installation depuis votre navigateur (Paramètres, Sécurité, Applications inconnues).' },
  { icon: Smartphone, title: 'Installer', text: `Ouvrez le fichier, installez, puis lancez Laoka. ${APP.laoka} laoka sont déjà prêts.` },
];

export default function Steps() {
  return (
    <section id="install" className="bg-ink py-20 text-white md:py-28">
      <div className="container-x">
        <p className="eyebrow">Installation</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">Prêt en trois étapes</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand"><Icon size={22} /></span>
                <span className="font-display text-4xl font-extrabold text-white/15">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{text}</p>
            </div>
          ))}
        </div>
        <a href={APK_URL} className="btn-brand mt-10"><Download size={18} /> Télécharger l’APK</a>
      </div>
    </section>
  );
}
