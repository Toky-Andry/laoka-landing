export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h18a9 9 0 0 1-18 0Z" />
          <path d="M8 8c0-1.5 1-1.5 1-3M12 8c0-1.5 1-1.5 1-3M16 8c0-1.5 1-1.5 1-3" />
        </svg>
      </span>
      <span className={`font-display text-xl font-extrabold ${light ? 'text-white' : 'text-ink'}`}>Laoka</span>
    </a>
  );
}
