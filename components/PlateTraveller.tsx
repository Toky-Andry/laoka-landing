'use client';
import { useEffect, useRef, useState } from 'react';
import { DISHES } from '@/lib/dishes';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
<<<<<<< HEAD
const smooth = (t: number) => t * t * (3 - 2 * t);
// Profil de l’assiette (rayon, hauteur), tourné autour de l’axe Y : fond, bord relevé, centre plat.
const PROFILE = [[0, 0], [0.28, 0], [0.34, 0.01], [0.5, 0.07], [0.49, 0.085], [0.43, 0.06], [0.38, 0.036], [0, 0.036]];

// Une assiette 3D (Three.js, chargé après le premier affichage) qui suit la page :
// elle se pose sur chaque [data-dock], fait un tour sur elle-même entre deux sections
// et change de photo quand sa face blanche est tournée vers l’écran.
export default function PlateTraveller() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const base = useRef(0); // plat affiché dans le hero
=======
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// Une seule assiette : elle quitte le hero au défilement, se pose à côté de la liste
// des fonctionnalités et tourne pendant qu’on lit.
export default function PlateTraveller() {
  const el = useRef<HTMLDivElement>(null);
  const [dish, setDish] = useState(0);
>>>>>>> parent of 4008277 (Assiette sur toute la page)

  useEffect(() => {
    const on = (e: Event) => setDish((e as CustomEvent<number>).detail);
    window.addEventListener('dish', on);
    return () => window.removeEventListener('dish', on);
  }, []);

  useEffect(() => {
    const cv = canvas.current;
    const plate = document.querySelector<HTMLElement>('[data-plate]');
<<<<<<< HEAD
    const docks = Array.from(document.querySelectorAll<HTMLElement>('[data-dock]'));
=======
    const dock = document.querySelector<HTMLElement>('[data-dock]');
    if (!node || !plate || !dock) return;
>>>>>>> parent of 4008277 (Assiette sur toute la page)
    const wide = matchMedia('(min-width: 768px)');
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    if (!cv || !plate || docks.length === 0 || !wide.matches) return;
    const anchors = [plate, ...docks];
    let dead = false;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import('three');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      if (dead) return;
      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
      } catch {
        return; // pas de WebGL : l’assiette reste dans le hero
      }
<<<<<<< HEAD
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const scene = new THREE.Scene();
      scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const key = new THREE.DirectionalLight(0xffffff, 1);
      key.position.set(-0.6, 0.9, 1.4);
      scene.add(key);
      const camera = new THREE.PerspectiveCamera(30, 1, 10, 9000);

      let raf = 0;
      let render = () => {};
      const loader = new THREE.TextureLoader();
      const tex = DISHES.map((d) => {
        const t = loader.load(d.src, () => render());
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
        return t;
      });
=======
      const a = plate.getBoundingClientRect();
      const d = dock.getBoundingClientRect();
      const t = ease(Math.min(1, y / (innerHeight * 0.85)));
      const w = lerp(a.width, d.width, t);
      const cx = lerp(a.left + a.width / 2, d.left + d.width / 2, t);
      const cy = lerp(a.top + a.height / 2, d.top + d.height / 2, t);
      const spin = still.matches ? 0 : t * 20 + y * 0.06;
      node.style.width = node.style.height = `${w}px`;
      node.style.transform = `translate(${cx - w / 2}px, ${cy - w / 2}px) rotate(${spin}deg)`;
      node.style.opacity = '1';
      plate.style.visibility = 'hidden';
    };
    const tick = () => { if (!raf) raf = requestAnimationFrame(frame); };
>>>>>>> parent of 4008277 (Assiette sur toute la page)

      const root = new THREE.Group(); // position et taille
      const spin = new THREE.Group(); // inclinaison, tour, roulis
      const flat = new THREE.Group(); // l’axe de l’assiette regarde l’écran
      flat.rotation.x = Math.PI / 2;
      flat.position.z = -0.04;
      const ceramic = new THREE.Mesh(
        new THREE.LatheGeometry(PROFILE.map(([x, y]) => new THREE.Vector2(x, y)), 72),
        new THREE.MeshPhysicalMaterial({ color: 0xfffdf8, roughness: 0.28, clearcoat: 0.6, clearcoatRoughness: 0.25, side: THREE.DoubleSide }),
      );
      const photoMat = new THREE.MeshStandardMaterial({ map: tex[0], roughness: 0.55, envMapIntensity: 0.35 });
      const photo = new THREE.Mesh(new THREE.CircleGeometry(0.385, 64), photoMat);
      photo.rotation.x = -Math.PI / 2;
      photo.position.y = 0.0365;
      flat.add(ceramic, photo);
      spin.add(flat);
      root.add(spin);

      const sc = document.createElement('canvas');
      sc.width = sc.height = 128;
      const g = sc.getContext('2d')!;
      const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, 'rgba(60,35,15,.5)');
      gr.addColorStop(1, 'rgba(60,35,15,0)');
      g.fillStyle = gr;
      g.fillRect(0, 0, 128, 128);
      const shTex = new THREE.CanvasTexture(sc);
      shTex.colorSpace = THREE.SRGBColorSpace;
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false }));
      shadow.renderOrder = -1;
      scene.add(root, shadow);

      const vwOf = () => document.documentElement.clientWidth;
      const resize = () => {
        const vw = vwOf();
        const vh = innerHeight;
        renderer.setSize(vw, vh);
        // 1 unité du monde = 1 pixel CSS à z = 0
        const D = Math.min(2200, Math.max(1000, 1500 * Math.min(vw / 1440, vh / 900)));
        camera.fov = (2 * Math.atan(vh / 2 / D) * 180) / Math.PI;
        camera.aspect = vw / vh;
        camera.far = D * 4;
        camera.position.z = D;
        camera.updateProjectionMatrix();
      };

      render = () => {
        raf = 0;
        const y = scrollY;
        const vw = vwOf();
        const vh = innerHeight;
        if (!wide.matches || y < 4) {
          cv.style.opacity = '0';
          plate.style.visibility = '';
          return;
        }
        const at = anchors.map((a, k) => {
          const sec = a.closest('section');
          if (k === 0 || !sec) return 0;
          const r = sec.getBoundingClientRect();
          return r.top + y + r.height / 2 - vh / 2;
        });
        let i = 0;
        while (i < anchors.length - 2 && y >= at[i + 1]) i++;
        const raw = clamp((y - at[i]) / Math.max(1, at[i + 1] - at[i]));
        const t = smooth(clamp((raw - 0.25) / 0.5)); // déplacement
        const f = smooth(clamp((raw - 0.15) / 0.7)); // tour complet
        const a = anchors[i].getBoundingClientRect();
        const b = anchors[i + 1].getBoundingClientRect();
        const w = lerp(a.width, b.width, t);
        const cx = lerp(a.left + a.width / 2, b.left + b.width / 2, t);
        const cy = lerp(a.top + a.height / 2, b.top + b.height / 2, t);

        root.position.set(cx - vw / 2, vh / 2 - cy, 0);
        root.scale.setScalar(w);
        const intro = clamp(y / (vh * 0.25)); // l’inclinaison apparaît en douceur
        spin.rotation.set(
          intro * (-0.3 + 0.1 * Math.sin(y * 0.004)),
          Math.PI * 2 * (i + f),
          still.matches ? 0 : -y * 0.001,
        );
        // la photo change quand la face blanche regarde l’écran
        const want = f < 0.5 ? (base.current + i) % N : (base.current + i + 1) % N;
        if (photoMat.map !== tex[want]) photoMat.map = tex[want];
        shadow.position.set(cx - vw / 2, vh / 2 - cy - w * 0.06, -w * 0.35);
        shadow.scale.set(w * 1.35, w, 1);

        cv.style.opacity = String(clamp((y - 4) / 36));
        plate.style.visibility = y >= 40 ? 'hidden' : '';
        renderer.render(scene, camera);
      };

      const tick = () => { if (!raf) raf = requestAnimationFrame(render); };
      const onResize = () => { resize(); tick(); };
      resize();
      tick();
      addEventListener('scroll', tick, { passive: true });
      addEventListener('resize', onResize);
      cleanup = () => {
        removeEventListener('scroll', tick);
        removeEventListener('resize', onResize);
        cancelAnimationFrame(raf);
        renderer.dispose();
        plate.style.visibility = '';
      };
    };

    // Trois.js se charge à part, quand le navigateur est au repos : il ne retarde pas l’affichage.
    if ('requestIdleCallback' in window) window.requestIdleCallback(() => start(), { timeout: 2500 });
    else window.setTimeout(() => start(), 1500);
    return () => { dead = true; cleanup(); };
  }, []);

<<<<<<< HEAD
  return <canvas ref={canvas} aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 opacity-0" />;
=======
  return (
    <div
      ref={el}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 rounded-full bg-white opacity-0 shadow-2xl shadow-brand/25 ring-1 ring-ink/5"
      style={{ willChange: 'transform, width, height' }}
    >
      <img src={DISHES[dish].src} alt="" className="absolute inset-[11%] h-[78%] w-[78%] rounded-full object-cover" />
    </div>
  );
>>>>>>> parent of 4008277 (Assiette sur toute la page)
}
