import { Bell, Dices } from 'lucide-react';

const meals = [
  ['Ovy sy patsa', 'Aujourd’hui', 'bg-amber-200'],
  ['Akoho rony', 'Demain', 'bg-violet-200'],
];
const stats = [['9', 'Planifiés'], ['52', 'Au tahiry'], ['2', 'À acheter']];

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] md:w-[310px]">
      <div className="rounded-[2.6rem] border-[10px] border-ink bg-cream p-4 shadow-2xl shadow-brand/30">
        <p className="text-[10px] font-bold tracking-[0.2em] text-brand">TONGASOA</p>
        <p className="font-display text-xl font-extrabold">Laoka Herinandro</p>
        <p className="mb-4 text-[11px] text-ink/50">Mercredi · Alarobia</p>
        {meals.map(([name, when, tint], i) => (
          <div key={name} className={`mb-3 flex items-center gap-3 rounded-2xl border-l-4 bg-white p-2.5 shadow-sm ${i ? 'border-violet-500' : 'border-brand'}`}>
            <div className={`h-11 w-11 rounded-xl ${tint}`} />
            <div>
              <p className="text-[10px] text-ink/40">{when}</p>
              <p className="text-sm font-bold">{name}</p>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-2 text-center">
          {stats.map(([n, l]) => (
            <div key={l} className="rounded-xl bg-white py-2 shadow-sm">
              <p className="font-display text-lg font-extrabold">{n}</p>
              <p className="text-[9px] text-ink/40">{l}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-brand p-3 text-sm font-bold text-white">
          <Dices size={18} /> Ahodino ny kodiarana !
        </div>
      </div>
      <div className="absolute -left-8 top-24 hidden items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-xs font-semibold shadow-xl md:flex">
        <Bell size={14} className="text-brand" /> Sakafo androany · 8h00
      </div>
    </div>
  );
}
