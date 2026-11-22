'use client';
import { BookOpen, Bell, CalendarDays, Dices, Share2, ShoppingCart, Sparkles } from 'lucide-react';
import { APP } from '@/lib/config';
import { useInView } from './useInView';

const FEATURES = [
  { icon: CalendarDays, title: 'Planning de la semaine', text: 'Organisez vos repas du lundi au dimanche. Ajoutez, modifiez ou supprimez un laoka en deux touches.' },
  { icon: BookOpen, title: 'Tahiry ny laoka', text: `${APP.laoka} laoka malgaches avec photos, et vos propres recettes en plus.` },
  { icon: Dices, title: 'Roue aléatoire', text: 'Un tour de roue et le laoka du jour est choisi.' },
  { icon: ShoppingCart, title: 'Liste de courses', text: 'Générée depuis votre planning, avec quantités et suivi de ce qui est acheté.' },
  { icon: Bell, title: 'Rappels', text: 'Une notification à 8h et à 19h pour ne rien oublier.' },
  { icon: Sparkles, title: 'Remplissage auto', text: 'Toute la semaine remplie en un geste.' },
  { icon: Share2, title: 'Partage WhatsApp', text: 'Envoyez votre liste de courses en un clic.' },
];

export default function Features() {
  const { ref, seen } = useInView<HTMLUListElement>();

  return (
    <section id="features" className="container-x grid gap-12 py-20 md:grid-cols-[0.8fr_1.4fr] md:gap-16 md:py-28">
      <div className="self-start md:sticky md:top-28">
        <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">
          Tout pour organiser vos repas
        </h2>
        <p className="mt-4 max-w-xs text-ink/65">Sept outils dans une seule app, qui marche aussi sans connexion.</p>
        <div data-dock className="mt-10 hidden aspect-square w-52 md:block" />
      </div>

      <ul ref={ref} className={`group/list ${seen ? 'in' : ''}`}>
        {FEATURES.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="week-item border-t border-ink/10 last:border-b" style={{ animationDelay: `${i * 90}ms` }}>
            <div className="group flex items-start gap-5 py-6 transition-opacity duration-300 group-hover/list:opacity-40 hover:!opacity-100">
              <span className="w-9 shrink-0 pt-1 font-display text-xl font-extrabold text-ink/25 transition-colors group-hover:text-brand">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 transition-transform duration-300 group-hover:translate-x-2">
                <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h3>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink/60">{text}</p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/10 text-ink/40 transition group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                <Icon size={20} />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
