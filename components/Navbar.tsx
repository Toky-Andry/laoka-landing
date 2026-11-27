'use client';
import { Download, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { APK_URL } from '@/lib/config';
import Logo from './Logo';

const links = [
  ['Fonctionnalités', '#features'],
  ['Installation', '#install'],
  ['Questions', '#faq'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open ? 'border-ink/10 bg-cream/90 backdrop-blur-lg' : 'border-transparent bg-transparent'
      }`}
    >
      {/* 3 colonnes : logo à gauche, liens exactement au centre, bouton calé à droite */}
      <div className="container-x grid h-16 grid-cols-[1fr_auto_1fr] items-center">
        <div className="col-start-1 flex items-center justify-start gap-3">
          <Logo />
          {/* Mobile : l’assiette vient se poser ici, à côté du logo */}
          <div data-nav-dock className="h-11 w-11 shrink-0 md:hidden" />
        </div>

        <nav className="col-start-2 hidden items-center gap-9 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="group relative py-1 text-[15px] font-medium text-ink/75 transition hover:text-ink">
              {label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded bg-brand transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="col-start-3 flex items-center justify-end gap-2">
          <a
            href={APK_URL}
            className="hidden items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand sm:inline-flex"
          >
            <Download size={16} /> Télécharger
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-ink/10 bg-white md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="container-x grid gap-1 pb-5 md:hidden">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium hover:bg-white">
              {label}
            </a>
          ))}
          <a href={APK_URL} className="btn-brand mt-2">
            <Download size={18} /> Télécharger l’APK
          </a>
        </nav>
      )}
    </header>
  );
}
