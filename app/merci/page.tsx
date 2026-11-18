import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import AutoDownload from '@/components/AutoDownload';
import BowlSteam from '@/components/BowlSteam';
import Logo from '@/components/Logo';
import RecipeCard from '@/components/RecipeCard';
import { APP } from '@/lib/config';

export const metadata: Metadata = { title: 'Merci — Laoka', robots: { index: false } };

export default function Merci() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container-x flex h-16 items-center justify-between">
        <Logo />
        <a href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/70 hover:text-brand">
          <ArrowLeft size={16} /> Accueil
        </a>
      </header>

      <main className="container-x grid flex-1 items-center gap-12 py-10 md:grid-cols-[1.05fr_1fr] md:py-16">
        <div>
          <BowlSteam />
          <p className="eyebrow mt-6">Téléchargement</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
            Misaotra,<br />
            <span className="text-brand">mazotoa !</span>
          </h1>
          <p className="mt-4 max-w-sm text-ink/70">
            Merci d’avoir choisi Laoka. Votre fichier de {APP.size} arrive : suivez la recette.
          </p>
          <AutoDownload />
        </div>
        <RecipeCard />
      </main>
    </div>
  );
}
