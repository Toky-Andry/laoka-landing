import { APK_URL, APP } from '@/lib/config';
import Logo from './Logo';

const links = [
  ['Fonctionnalités', '#features'],
  ['Installation', '#install'],
  ['Questions', '#faq'],
  ['Télécharger', APK_URL],
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <Logo light />
        <ul className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
          {links.map(([label, href]) => (
            <li key={label}><a href={href} className="transition hover:text-white">{label}</a></li>
          ))}
        </ul>
        <p className="text-sm text-white/40">© 2026 Laoka · v{APP.version} · Fait à Madagascar</p>
      </div>
    </footer>
  );
}
