// Même logo que l’icône de l’app : « La », un bol de soupe à la place du o, « ka. »
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#"
      aria-label="Laoka"
      className={`flex items-center font-display text-[1.6rem] font-extrabold leading-none tracking-tight ${light ? 'text-white' : 'text-ink'}`}
    >
      La
      <svg viewBox="0 0 36 36" aria-hidden className="mx-px h-[0.95em] w-[0.95em] translate-y-[0.06em]" fill="none">
        <path d="M10 12c0-2.5 2-2.5 2-5.5M18 12c0-2.5 2-2.5 2-5.5M26 12c0-2.5 2-2.5 2-5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M3 18h30a15 15 0 0 1-30 0Z" fill="#ec7f13" />
        <ellipse cx="18" cy="18" rx="15" ry="3" fill="#c4620a" />
      </svg>
      ka<span className="text-brand">.</span>
    </a>
  );
}
