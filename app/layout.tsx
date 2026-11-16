import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Laoka — Planifiez vos repas malgaches",
  description: "Application Android gratuite pour planifier vos laoka malgaches. Planning semaine, liste de courses, roue spin et notifications.",
  keywords: "laoka, malgache, madagascar, planning repas, android app",
  openGraph: {
    title: "Laoka — Planifiez vos repas malgaches",
    description: "Planifiez vos laoka malgaches pour toute la semaine.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ec7f13" />
        <link rel="icon" href="/icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
