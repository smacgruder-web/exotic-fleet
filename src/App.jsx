import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Billboard,
  Float,
  Image as DreiImage,
  MeshReflectorMaterial,
  Stars,
} from '@react-three/drei';
import * as THREE from 'three';

const ACCENT = '#e10600';
const GOLD = '#f5a623';

const HERO_PANELS = [
  { url: '/images/vette-hotsauc.jpg', w: 4.0, h: 3.0 },
  { url: '/images/vette-blue-night.jpg', w: 4.0, h: 3.0 },
  { url: '/images/bentley-front.jpg', w: 4.0, h: 3.0 },
  { url: '/images/spotlight.jpg', w: 2.0, h: 3.0 },
];
const RADIUS = 4.6;

const FLEET = [
  { img: '/images/vette-hotsauc.jpg', name: 'Corvette Z06 "HOTSAUC"', spec: '670 HP · 2.6s 0–60', price: 499 },
  { img: '/images/vette-blue-night.jpg', name: 'Corvette Stingray', spec: '495 HP · Night prowler', price: 449 },
  { img: '/images/bentley-side.jpg', name: 'Bentley Continental GT', spec: 'W12 · Chauffeur-ready', price: 599 },
  { img: '/images/bmw-7.jpg', name: 'BMW 7 Series', spec: 'Executive lounge spec', price: 349 },
  { img: '/images/rolls-royce.jpg', name: 'Rolls-Royce Silver Spur', spec: 'Vintage · Chauffeur only', price: 699 },
  { img: '/images/slingshot-front.jpg', name: 'Polaris Slingshot', spec: '3 wheels · Open air', price: 299 },
];

function HeroRing() {
  const group = useRef();
  const reduceMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  useFrame((_, delta) => {
    if (group.current && !reduceMotion.current) {
      group.current.rotation.y += delta * 0.16;
    }
  });

  return (
    <group ref={group}>
      {HERO_PANELS.map((p, i) => {
        const a = (i / HERO_PANELS.length) * Math.PI * 2;
        return (
          <group
            key={p.url}
            position={[Math.sin(a) * RADIUS, 0.2, Math.cos(a) * RADIUS]}
            rotation={[0, a, 0]}
          >
            <mesh position={[0, 0, -0.03]}>
              <planeGeometry args={[p.w + 0.14, p.h + 0.14]} />
              <meshBasicMaterial color="#0b0d12" />
            </mesh>
            <DreiImage url={p.url} transparent radius={0.05} scale={[p.w, p.h]} />
          </group>
        );
      })}
    </group>
  );
}

function SealMedallion() {
  return (
    <Float speed={2.4} floatIntensity={1.1} rotationIntensity={0.3}>
      <Billboard position={[0, 2.9, 0]}>
        <DreiImage url="/images/seal-coin.jpg" transparent radius={0.5} scale={[1.15, 1.15]} />
        <mesh>
          <torusGeometry args={[0.63, 0.028, 16, 72]} />
          <meshBasicMaterial color={GOLD} />
        </mesh>
      </Billboard>
    </Float>
  );
}

function HeroFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.0, 0]}>
      <planeGeometry args={[34, 34]} />
      <MeshReflectorMaterial
        blur={[280, 60]}
        resolution={1024}
        mixStrength={6}
        roughness={0.85}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#0a0c10"
        metalness={0.6}
        mirror={0.55}
      />
    </mesh>
  );
}

function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0.9, 9.4], fov: 42 }} dpr={[1, 2]}>
      <color attach="background" args={['#05070c']} />
      <fog attach="fog" args={['#05070c', 11, 24]} />
      <ambientLight intensity={0.4} />
      <spotLight position={[6, 7, 4]} angle={0.5} penumbra={0.7} intensity={140} color={ACCENT} />
      <directionalLight position={[-6, 3, -4]} intensity={0.8} color="#38bdf8" />
      <Stars radius={90} depth={40} count={1600} factor={3} saturation={0} fade speed={0.6} />
      <Suspense fallback={null}>
        <HeroRing />
        <SealMedallion />
      </Suspense>
      <HeroFloor />
    </Canvas>
  );
}

class WebGLBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function HeroFallback() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/vette-hotsauc.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,7,12,0.55)' }} />
    </div>
  );
}

const sectionPad = { padding: '88px 6vw' };
const eyebrow = {
  fontSize: '0.75rem',
  letterSpacing: '0.35em',
  color: ACCENT,
  fontWeight: 800,
  marginBottom: '14px',
};
const h2 = { fontSize: '2.4rem', fontWeight: 900, letterSpacing: '0.01em', lineHeight: 1.1 };

function BookingBar({ vehicle, setVehicle }) {
  const [pickup, setPickup] = useState('');
  const [ret, setRet] = useState('');
  const [done, setDone] = useState(false);
  const field = {
    background: '#0d1117',
    border: '1px solid #26303b',
    color: '#fff',
    borderRadius: '10px',
    padding: '12px 14px',
    fontSize: '0.9rem',
    width: '100%',
    colorScheme: 'dark',
  };
  return (
    <form
      id="book"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px',
        background: 'rgba(10,13,18,0.88)',
        border: '1px solid #26303b',
        borderRadius: '16px',
        padding: '18px',
        marginTop: '36px',
        backdropFilter: 'blur(8px)',
      }}
    >
      <label style={{ fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.12em' }}>
        PICKUP
        <input type="date" required value={pickup} onChange={(e) => setPickup(e.target.value)} style={{ ...field, marginTop: '6px' }} />
      </label>
      <label style={{ fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.12em' }}>
        RETURN
        <input type="date" required value={ret} onChange={(e) => setRet(e.target.value)} style={{ ...field, marginTop: '6px' }} />
      </label>
      <label style={{ fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.12em' }}>
        RIDE
        <select value={vehicle} onChange={(e) => setVehicle(e.target.value)} style={{ ...field, marginTop: '6px' }}>
          {FLEET.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
      </label>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <button
          type="submit"
          style={{
            width: '100%',
            background: ACCENT,
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '13px',
            fontWeight: 900,
            letterSpacing: '0.12em',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          CHECK AVAILABILITY
        </button>
      </div>
      {done && (
        <div style={{ gridColumn: '1 / -1', color: '#4ade80', fontSize: '0.9rem', fontWeight: 700 }}>
          {vehicle} · {pickup} → {ret} — request received. We confirm by text within the hour.
        </div>
      )}
    </form>
  );
}

export default function App() {
  const [vehicle, setVehicle] = useState(FLEET[0].name);
  const reserve = (name) => {
    setVehicle(name);
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div style={{ background: '#05070c', color: '#fff' }}>
      {/* Nav */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 6vw',
          background: 'rgba(5,7,12,0.82)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #1a2230',
        }}
      >
        <div style={{ fontWeight: 900, letterSpacing: '0.2em', fontSize: '0.95rem' }}>
          SEALED <span style={{ color: ACCENT }}>▪</span> EXOTICS
        </div>
        <div style={{ display: 'flex', gap: '28px', fontSize: '0.82rem', color: '#94a3b8' }} className="nav-links">
          <a href="#fleet" style={{ color: 'inherit', textDecoration: 'none' }}>Fleet</a>
          <a href="#experience" style={{ color: 'inherit', textDecoration: 'none' }}>Experience</a>
          <a href="#seal" style={{ color: 'inherit', textDecoration: 'none' }}>Seal</a>
        </div>
        <a
          href="#book"
          style={{
            background: ACCENT,
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            padding: '10px 22px',
            borderRadius: '9999px',
          }}
        >
          BOOK NOW
        </a>
      </nav>

      {/* Hero */}
      <header style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <WebGLBoundary fallback={<HeroFallback />}>
            <HeroCanvas />
          </WebGLBoundary>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #05070c 4%, transparent 40%)', pointerEvents: 'none' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, padding: '150px 6vw 60px', maxWidth: '860px' }}>
          <div style={eyebrow}>EXOTIC CAR RENTALS · DMV</div>
          <h1 style={{ fontSize: 'clamp(2.6rem, 6vw, 4.6rem)', fontWeight: 900, lineHeight: 1.02 }}>
            DRIVE THE<br />IMPOSSIBLE<span style={{ color: ACCENT }}>.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#b6c2d2', marginTop: '18px', maxWidth: '520px', lineHeight: 1.6 }}>
            Corvettes, a Bentley, a Rolls, and a Slingshot — detailed, fueled, and ready when you are.
            Daily and weekend rates, concierge delivery included.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '26px', flexWrap: 'wrap' }}>
            <a href="#fleet" style={{ background: '#fff', color: '#05070c', textDecoration: 'none', fontWeight: 800, padding: '13px 30px', borderRadius: '9999px', fontSize: '0.9rem' }}>
              BROWSE THE FLEET
            </a>
            <a href="#book" style={{ border: '1px solid #3a4757', color: '#fff', textDecoration: 'none', fontWeight: 700, padding: '13px 30px', borderRadius: '9999px', fontSize: '0.9rem' }}>
              BOOK NOW
            </a>
          </div>
          <div style={{ display: 'flex', gap: '36px', marginTop: '30px', color: '#94a3b8', fontSize: '0.85rem' }}>
            <span><strong style={{ color: '#fff', fontSize: '1.2rem' }}>6</strong> exotics</span>
            <span><strong style={{ color: '#fff', fontSize: '1.2rem' }}>$299</strong> from / day</span>
            <span><strong style={{ color: '#fff', fontSize: '1.2rem' }}>5.0</strong> renter rating</span>
          </div>
          <BookingBar vehicle={vehicle} setVehicle={setVehicle} />
        </div>
      </header>

      {/* Fleet */}
      <section id="fleet" style={sectionPad}>
        <div style={eyebrow}>THE FLEET</div>
        <h2 style={h2}>Pick your weapon.</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '22px',
            marginTop: '34px',
          }}
        >
          {FLEET.map((c) => (
            <article
              key={c.name}
              style={{
                background: '#0b0f16',
                border: '1px solid #1c2532',
                borderRadius: '18px',
                overflow: 'hidden',
              }}
            >
              <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: '#111' }}>
                <img src={c.img} alt={c.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{c.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>{c.spec}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.25rem' }}>
                    ${c.price}<span style={{ fontWeight: 400, fontSize: '0.8rem', color: '#94a3b8' }}> / day</span>
                  </div>
                  <button
                    onClick={() => reserve(c.name)}
                    style={{
                      background: 'transparent',
                      border: `1px solid ${ACCENT}`,
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      letterSpacing: '0.1em',
                      padding: '10px 20px',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                    }}
                  >
                    RESERVE
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Engine strip */}
      <section style={{ ...sectionPad, background: '#080b11', borderTop: '1px solid #141b26', borderBottom: '1px solid #141b26' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px', alignItems: 'center' }}>
          <div>
            <div style={eyebrow}>OBSESSED UNDER THE HOOD</div>
            <h2 style={h2}>Serviced like we own the track.</h2>
            <p style={{ color: '#94a3b8', marginTop: '14px', lineHeight: 1.7 }}>
              Every car leaves with fresh fluids, track-grade rubber, and a walkthrough of launch
              control, drive modes, and the quirks that make each one special.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '14px' }}>
            <img src="/images/vette-red-engine.jpg" alt="Corvette Z06 engine bay" loading="lazy" style={{ borderRadius: '14px', height: '100%', objectFit: 'cover' }} />
            <img src="/images/engine-detail.jpg" alt="Engine detail" loading="lazy" style={{ borderRadius: '14px', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Experience banner */}
      <section id="experience" style={{ position: 'relative', minHeight: '62vh', overflow: 'hidden' }}>
        <img
          src="/images/slingshot-side.jpg"
          alt="Slingshot run"
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,7,12,0.92) 20%, rgba(5,7,12,0.35))' }} />
        <div style={{ position: 'relative', zIndex: 10, padding: '110px 6vw', maxWidth: '640px' }}>
          <div style={eyebrow}>MORE THAN A RENTAL</div>
          <h2 style={{ ...h2, fontSize: '2.8rem' }}>Slingshot runs. Date nights. Video shoots.</h2>
          <p style={{ color: '#c6d0de', marginTop: '14px', lineHeight: 1.7 }}>
            Hourly joyrides, full weekends, and chauffeur packages for weddings and premieres.
            Tell us the occasion — we stage the car, the route, and the photos.
          </p>
          <a href="#book" style={{ display: 'inline-block', marginTop: '24px', background: ACCENT, color: '#fff', textDecoration: 'none', fontWeight: 800, padding: '13px 32px', borderRadius: '9999px', fontSize: '0.9rem' }}>
            PLAN MY RUN
          </a>
        </div>
      </section>

      {/* Seal */}
      <section id="seal" style={{ ...sectionPad, textAlign: 'center' }}>
        <img
          src="/images/seal-coin.jpg"
          alt="Seal of Approval"
          loading="lazy"
          style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', margin: '0 auto', border: `3px solid ${GOLD}` }}
        />
        <h2 style={{ ...h2, marginTop: '22px' }}>Leaves with the Seal of Approval.</h2>
        <p style={{ color: '#94a3b8', marginTop: '12px' }}>Full tank · Full detail · Damage walkthrough · 24/7 roadside line</p>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 6vw 52px', borderTop: '1px solid #141b26', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', color: '#64748b', fontSize: '0.85rem' }}>
        <div style={{ fontWeight: 900, letterSpacing: '0.2em', color: '#fff' }}>
          SEALED <span style={{ color: ACCENT }}>▪</span> EXOTICS
        </div>
        <div>Daily 9a – 9p · Text to book · Must be 25+ with full coverage</div>
      </footer>
    </div>
  );
}

