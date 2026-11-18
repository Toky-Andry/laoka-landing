import { ChefHat, Clock, Smartphone } from 'lucide-react';
import { APP } from '@/lib/config';

const meta = [
  { icon: Clock, label: '2 minutes' },
  { icon: Smartphone, label: '1 téléphone' },
  { icon: ChefHat, label: 'Facile' },
];
const ingredients = [
  'Un téléphone Android 7 ou plus',
  `${APP.size} d’espace libre`,
  'L’autorisation d’installer depuis votre navigateur',
];
const steps = [
  ['Ouvrir', 'le fichier Laoka.apk dans vos téléchargements.'],
  ['Autoriser', 'l’installation si Android le demande.'],
  ['Servir', `Lancez Laoka : ${APP.laoka} laoka sont déjà prêts.`],
];

export default function RecipeCard() {
  return (
    <article className="fade-in rounded-[1.75rem] bg-white p-3 shadow-2xl shadow-ink/10 transition duration-300 md:rotate-[1.2deg] md:hover:rotate-0">
      <div className="rounded-[1.4rem] border-2 border-dashed border-brand/30 p-6 md:p-8">
        <p className="eyebrow">Recette n° 1</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Installer Laoka</h2>

        <ul className="mt-5 flex flex-wrap gap-2">
          {meta.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand-dark">
              <Icon size={14} /> {label}
            </li>
          ))}
        </ul>

        <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-ink/40">Ingrédients</h3>
        <ul className="mt-3 grid gap-2 text-sm">
          {ingredients.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /> {item}
            </li>
          ))}
        </ul>

        <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-ink/40">Préparation</h3>
        <ol className="mt-3 grid gap-4">
          {steps.map(([verb, text], i) => (
            <li key={verb} className="flex items-start gap-4">
              <span className="font-display text-4xl font-extrabold leading-none text-brand/80">{i + 1}</span>
              <p className="pt-1 text-sm leading-snug"><b>{verb}</b> {text}</p>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
