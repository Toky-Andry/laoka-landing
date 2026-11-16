import { Download } from 'lucide-react';
import { APK_URL } from '@/lib/config';
import Logo from './Logo';

const links = [
  ['Fonctionnalités', '#features'],
  ['Installation', '#install'],
  ['Questions', '#faq'],
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/80 backdrop-blur-lg">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden gap-8 text-sm font-medium text-ink/70 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-brand">{label}</a>
          ))}
        </nav>
        <a href={APK_URL} className="btn-brand !px-5 !py-2.5 text-sm">
          <Download size={16} /> Télécharger
        </a>
      </div>
    </header>
  );
}
