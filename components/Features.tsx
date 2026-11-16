import { BookOpen, Bell, CalendarDays, Dices, Share2, ShoppingCart, Sparkles } from 'lucide-react';
import { APP } from '@/lib/config';

const items = [
  { icon: CalendarDays, title: 'Planning de la semaine', text: 'Organisez vos repas du lundi au dimanche. Ajoutez, modifiez ou supprimez un laoka en deux touches.', span: 'md:col-span-2' },
  { icon: BookOpen, title: 'Tahiry ny laoka', text: `${APP.laoka} laoka malgaches avec photos, et vos propres recettes en plus.`, span: '' },
  { icon: Dices, title: 'Roue aléatoire', text: 'Un tour de roue et le laoka du jour est choisi.', span: '' },
  { icon: ShoppingCart, title: 'Liste de courses', text: 'Générée depuis votre planning, avec quantités et suivi de ce qui est acheté.', span: 'md:col-span-2' },
  { icon: Bell, title: 'Rappels', text: 'Une notification à 8h et à 19h pour ne rien oublier.', span: '' },
  { icon: Sparkles, title: 'Remplissage auto', text: 'Toute la semaine remplie en un geste.', span: '' },
  { icon: Share2, title: 'Partage WhatsApp', text: 'Envoyez votre liste de courses en un clic.', span: '' },
];

export default function Features() {
  return (
    <section id="features" className="container-x py-20 md:py-28">
      <p className="eyebrow">Fonctionnalités</p>
      <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold tracking-tight md:text-5xl">
        Tout pour organiser vos repas
      </h2>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {items.map(({ icon: Icon, title, text, span }, i) => (
          <div
            key={title}
            className={`rounded-3xl border p-7 transition duration-200 hover:-translate-y-1 ${span} ${
              i === 0
                ? 'border-brand bg-brand text-white shadow-xl shadow-brand/25'
                : 'border-ink/5 bg-white hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10'
            }`}
          >
            <span className={`grid h-11 w-11 place-items-center rounded-xl ${i === 0 ? 'bg-white/20' : 'bg-brand-soft text-brand'}`}>
              <Icon size={22} />
            </span>
            <h3 className="mt-5 text-lg font-bold">{title}</h3>
            <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? 'text-white/85' : 'text-ink/60'}`}>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
