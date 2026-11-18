'use client';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { APK_FILE } from '@/lib/config';

const DELAY = 1200; // doit rester égal à la durée de .bar-fill

// Lance le téléchargement après la barre ; la page reste ouverte.
export default function AutoDownload() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setStarted(true);
      window.location.href = APK_FILE;
    }, DELAY);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="mt-8 max-w-sm" role="status" aria-live="polite">
      <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
        <div className="bar-fill h-full rounded-full bg-brand" />
      </div>
      <p className="mt-3 text-sm text-ink/60">
        {started ? 'Téléchargement lancé : regardez vos notifications.' : 'Préparation du téléchargement…'}
      </p>
      <a href={APK_FILE} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
        <Download size={14} /> Rien ne démarre ? Télécharger le fichier
      </a>
    </div>
  );
}
