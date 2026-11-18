// Le bol du logo, avec de la vapeur qui monte en boucle.
const STEAM = ['M40 40c-7-8 7-13 0-24', 'M60 40c-7-8 7-13 0-24', 'M80 40c-7-8 7-13 0-24'];

export default function BowlSteam() {
  return (
    <svg viewBox="0 0 120 112" className="h-28 w-28" fill="none" aria-hidden>
      {STEAM.map((d, i) => (
        <path key={d} d={d} stroke="#241810" strokeOpacity="0.35" strokeWidth="3.5" strokeLinecap="round" className="steam" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
      <path d="M10 52h100a50 50 0 0 1-100 0Z" fill="#ec7f13" />
      <ellipse cx="60" cy="52" rx="50" ry="9" fill="#c4620a" />
      <circle cx="46" cy="53" r="3.5" fill="#46a037" />
      <circle cx="72" cy="55" r="4" fill="#d83b23" />
      <circle cx="60" cy="51" r="2.5" fill="#f0c43a" />
    </svg>
  );
}
