'use client';

import { useState, useEffect, useRef } from 'react';

const APK_URL = 'https://github.com/Toky-Andry/Kaly_mobile/releases/latest/download/Laoka.apk';
const APP_VERSION = '1.0.0';
const APP_SIZE = '87 MB';

const features = [
  {
    icon: '📅',
    title: 'Planning Herinandro',
    desc: 'Organisez vos repas pour les 7 jours de la semaine. Modifiez, ajoutez ou supprimez à tout moment.',
  },
  {
    icon: '📚',
    title: 'Tahiry ny Laoka',
    desc: '52 laoka malgaches pré-chargés avec photos. Ajoutez vos propres recettes facilement.',
  },
  {
    icon: '🎰',
    title: 'Spin Aléatoire',
    desc: 'Une roue animée choisit votre laoka au hasard quand vous manquez d\'inspiration.',
  },
  {
    icon: '🛒',
    title: 'Liste de Courses',
    desc: 'Générée automatiquement depuis votre planning. Partagez-la sur WhatsApp en un clic.',
  },
  {
    icon: '🔔',
    title: 'Notifications',
    desc: 'Rappels à 8h et 19h chaque jour. Ne manquez plus jamais de préparer votre laoka.',
  },
  {
    icon: '✨',
    title: 'Auto-remplissage',
    desc: 'Remplissez automatiquement toute votre semaine avec des laoka aléatoires depuis votre tahiry.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Téléchargez l\'APK',
    desc: 'Cliquez sur le bouton ci-dessous. Le fichier APK se télécharge directement sur votre téléphone.',
  },
  {
    num: '02',
    title: 'Autorisez l\'installation',
    desc: 'Android demandera d\'autoriser les sources inconnues. Allez dans Paramètres → Sécurité et activez l\'option.',
  },
  {
    num: '03',
    title: 'Ouvrez Laoka',
    desc: 'Installez le fichier téléchargé et lancez l\'app. 52 laoka sont déjà chargés, prêts à utiliser !',
  },
];

export default function Home() {
  const [downloaded, setDownloaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleDownload() {
    setDownloaded(true);
    window.open(APK_URL, '_blank');
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          new Notification('🍛 Laoka — Téléchargement démarré !', {
            body: 'Ouvrez le fichier APK pour installer l\'application.',
            icon: '/icon.png',
          });
        }
      });
    }
  }

  function scrollToFeatures() {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      {/* ══════════════════════════════ NAVBAR ══════════════════════════════ */}
      <nav className="navbar" style={{
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.6)',
      }}>
        <a href="#" className="navbar-logo">
          La<span>o</span>ka
        </a>
        <ul className="navbar-links">
          <li><a href="#features">Fonctionnalités</a></li>
          <li><a href="#install">Installation</a></li>
          <li>
            <button
              onClick={handleDownload}
              className="navbar-cta"
              style={{
                background: 'var(--orange)', color: 'white',
                border: 'none', cursor: 'pointer',
                padding: '10px 20px', borderRadius: '9999px',
                fontWeight: 700, fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              ⬇ Télécharger
            </button>
          </li>
        </ul>
      </nav>

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg-glow" />
        <div className="hero-bg-grid" />

        <div className="hero-content">
          <div className="hero-badge">
            <span>🇲🇬</span>
            Application Malgache · Android · Gratuit
          </div>

          <h1 className="hero-title">
            La<span className="accent">o</span>ka
          </h1>

          <p className="hero-subtitle">Herin&apos;andro</p>

          <p className="hero-desc">
            Planifiez vos <strong style={{ color: 'rgba(255,255,255,0.9)' }}>laoka malgaches</strong> pour toute
            la semaine. Avec liste de courses, notifications et roue aléatoire.
          </p>

          <div className="hero-actions">
            <button
              onClick={handleDownload}
              className={`btn-primary${downloaded ? ' success' : ''}`}
            >
              <span style={{ fontSize: '20px' }}>{downloaded ? '✅' : '⬇️'}</span>
              {downloaded ? 'Téléchargement démarré !' : 'Télécharger l\'APK Android'}
            </button>

            <button onClick={scrollToFeatures} className="btn-secondary">
              Voir les fonctionnalités
              <span style={{ fontSize: '16px' }}>↓</span>
            </button>
          </div>

          <p className="hero-meta" style={{ marginTop: '20px' }}>
            Version {APP_VERSION} · {APP_SIZE} · Android 7.0+
          </p>
        </div>
      </section>

      {/* ══════════════════════════════ STATS BAR ══════════════════════════════ */}
      <div className="stats-bar" style={{ background: '#111' }}>
        {[
          { num: '52', label: 'Laoka inclus' },
          { num: '100%', label: 'Gratuit' },
          { num: '0', label: 'Publicités' },
          { num: '5', label: 'Écrans' },
        ].map((s, i) => (
          <div className="stat-item" key={i}>
            <div className="stat-num" style={{ color: i === 0 ? 'var(--orange)' : 'white' }}>{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════ FEATURES ══════════════════════════════ */}
      <section className="section features-section" id="features">
        <div className="container">
          <div>
            <p className="section-label">Fonctionnalités</p>
            <h2 className="section-title">Tout ce dont vous avez besoin</h2>
            <p className="section-desc">
              Simple à utiliser, puissant au quotidien. Conçu pour les familles malgaches.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ HOW TO INSTALL ══════════════════════════════ */}
      <section className="section steps-section" id="install">
        <div className="container">
          <p className="section-label" style={{ color: 'var(--orange)' }}>Installation</p>
          <h2 className="section-title light">3 étapes simples</h2>
          <p className="section-desc light">
            Installez Laoka en moins de 2 minutes sur n&apos;importe quel Android.
          </p>

          <div className="steps-container">
            {steps.map((s, i) => (
              <div className="step-item" key={i}>
                <div className="step-num">{s.num}</div>
                <div className="step-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}

            <div className="warning-box">
              <span style={{ fontSize: '20px', flexShrink: 0 }}>⚠️</span>
              <p>
                <strong>Sources inconnues :</strong> Android peut bloquer l&apos;installation.
                Allez dans <strong>Paramètres → Sécurité → Installer des applications inconnues</strong> et
                autorisez votre navigateur. C&apos;est sûr et normal pour les APK hors Play Store.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ CTA FINAL ══════════════════════════════ */}
      <section className="section cta-section">
        <div className="cta-glow" />
        <div className="cta-inner">
          <h2 className="cta-title">
            Prêt à planifier<br />vos <span className="orange">laoka</span> ?
          </h2>
          <p className="cta-desc">
            Téléchargez gratuitement et commencez à organiser vos repas dès aujourd&apos;hui.
          </p>

          <button
            onClick={handleDownload}
            className={`btn-primary${downloaded ? ' success' : ''}`}
            style={{ fontSize: '17px', padding: '20px 48px' }}
          >
            <span style={{ fontSize: '22px' }}>{downloaded ? '✅' : '⬇️'}</span>
            {downloaded ? 'Téléchargement démarré !' : 'Télécharger gratuitement'}
          </button>

          <div className="cta-tags">
            <span className="tag">🤖 Android 7+</span>
            <span className="tag">📦 {APP_SIZE}</span>
            <span className="tag">🆓 100% gratuit</span>
            <span className="tag">📵 Sans publicité</span>
            <span className="tag">📶 Hors ligne</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ FOOTER ══════════════════════════════ */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              La<span>o</span>ka
            </div>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', marginTop: '8px' }}>
              Faite avec ❤️ pour les Malgaches
            </p>
          </div>

          <ul className="footer-links">
            <li><a href="#features">Fonctionnalités</a></li>
            <li><a href="#install">Installation</a></li>
            <li>
              <a href={APK_URL} target="_blank" rel="noopener noreferrer">
                Télécharger
              </a>
            </li>
          </ul>

          <p className="footer-copy">
            © 2026 Laoka · v{APP_VERSION}
          </p>
        </div>
      </footer>
    </>
  );
}
