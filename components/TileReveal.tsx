const COLS = 10;
const ROWS = 6;
const DURATION = 450; // ms : temps total pour effacer toutes les tuiles

// Composant serveur : chaque tuile disparaît toute seule via CSS, dans un ordre dispersé.
// 37 et 60 n’ont aucun diviseur commun, donc (i * 37) % 60 donne un ordre mélangé sans doublon.
export default function TileReveal() {
  const total = COLS * ROWS;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="tile-out bg-brand-soft"
          style={{ animationDelay: `${((i * 37) % total) * (DURATION / total)}ms` }}
        />
      ))}
    </div>
  );
}
