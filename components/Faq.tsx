import { ChevronDown } from 'lucide-react';

const faqs = [
  ['Pourquoi Android affiche-t-il un avertissement ?', 'Android prévient pour toute application installée hors du Play Store. Laoka ne demande aucun compte et garde ses données uniquement sur votre téléphone.'],
  ['Faut-il une connexion internet ?', 'Non. Le planning, le tahiry et la roue fonctionnent hors ligne. Seul le partage WhatsApp demande l’application WhatsApp.'],
  ['Pourquoi l’application pèse-t-elle 87 Mo ?', 'Elle embarque tout ce qu’il faut pour fonctionner sans connexion, dont les photos des 52 laoka.'],
  ['Existe-t-elle sur iPhone ?', 'Pas pour l’instant : Laoka est disponible uniquement sur Android.'],
];

export default function Faq() {
  return (
    <section id="faq" className="container-x max-w-3xl py-20 md:py-28">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">Bon à savoir</h2>
        </div>
        <div data-dock className="hidden aspect-square w-36 md:block" />
      </div>
      <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map(([q, a]) => (
          <details key={q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {q}
              <ChevronDown size={20} className="shrink-0 text-brand transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink/60">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
