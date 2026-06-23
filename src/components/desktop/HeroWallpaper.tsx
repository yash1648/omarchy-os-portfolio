import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import profile from '@/config/profile.json';
import { Download, ChevronDown, Terminal } from 'lucide-react';
import type { WindowId } from '@/hooks/useWindowManager';

const bootLines = [
  { text: '[  OK  ] Initializing kernel modules', delay: 100 },
  { text: '[  OK  ] Mounting developer environment', delay: 80 },
  { text: '[  OK  ] Loading profile: Yash Ambarraj Bagal', delay: 100 },
  { text: '[  OK  ] Starting desktop session...', delay: 120 },
  { text: '', delay: 400 },
  { text: '🎯 welcome back, yash.', delay: 500 },
];

/* ───── Particles ───── */
const PARTICLE_COUNT = 35;
const COLORS = ['bg-primary/40', 'bg-secondary/30', 'bg-accent/30', 'bg-white/20'];
const SIZES = ['w-0.5 h-0.5', 'w-1 h-1', 'w-1.5 h-1.5', 'w-2 h-2'];

interface Particle {
  id: number;
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  delay: number;
  duration: number;
  size: string;
  color: string;
}

function generateParticles(count: number): Particle[] {
  if (typeof window === 'undefined') return [];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    driftX: (Math.random() - 0.5) * 120,
    driftY: -80 - Math.random() * 180,
    delay: Math.random() * 8,
    duration: 12 + Math.random() * 12,
    size: SIZES[Math.floor(Math.random() * SIZES.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

/* ───── Floating tech tags ───── */
const FLOATING_TAGS = profile.techStack.slice(0, 6);

interface FloatTag {
  text: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  xDrift: number;
  yDrift: number;
}

function generateFloatTags(): FloatTag[] {
  if (typeof window === 'undefined') return [];
  return FLOATING_TAGS.map((tag, i) => ({
    text: tag,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    delay: 1.5 + i * 0.25,
    duration: 8 + Math.random() * 6,
    xDrift: (Math.random() - 0.5) * 6,
    yDrift: (Math.random() - 0.5) * 6,
  }));
}

/* ───── Animated Gradient Orbs ───── */
const GRADIENT_ORBS = [
  { color: 'hsl(var(--glow-primary) / 0.12)', size: 600, x: '15%', y: '20%', duration: 20, delay: 0 },
  { color: 'hsl(var(--glow-secondary) / 0.08)', size: 500, x: '80%', y: '15%', duration: 25, delay: -3 },
  { color: 'hsl(var(--glow-accent) / 0.06)', size: 400, x: '50%', y: '70%', duration: 18, delay: -5 },
  { color: 'hsl(var(--glow-primary) / 0.06)', size: 350, x: '70%', y: '60%', duration: 22, delay: -8 },
];

interface HeroWallpaperProps {
  onOpenWindow?: (id: WindowId) => void;
}

export const HeroWallpaper: React.FC<HeroWallpaperProps> = ({ onOpenWindow }) => {
  const [bootIndex, setBootIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [bootComplete, setBootComplete] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [taglineChars, setTaglineChars] = useState('');
  const [taglineDone, setTaglineDone] = useState(false);

  const particles = useMemo(() => generateParticles(PARTICLE_COUNT), []);
  const floatTags = useMemo(() => generateFloatTags(), []);

  /* ─── Boot sequence ─── */
  useEffect(() => {
    if (bootIndex >= bootLines.length) {
      setBootComplete(true);
      return;
    }

    const line = bootLines[bootIndex];
    if (line.text === '') {
      const t = setTimeout(() => setBootIndex(prev => prev + 1), line.delay);
      return () => clearTimeout(t);
    }

    if (charIndex < line.text.length) {
      const t = setTimeout(() => {
        setDisplayText(prev => prev + line.text[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 25 + Math.random() * 20);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayText(prev => prev + '\n');
        setCharIndex(0);
        setBootIndex(prev => prev + 1);
      }, line.delay || 400);
      return () => clearTimeout(t);
    }
  }, [bootIndex, charIndex]);

  /* ─── Typewriter tagline ─── */
  useEffect(() => {
    if (!bootComplete) return;
    const t1 = setTimeout(() => setTaglineVisible(true), 1800);
    return () => clearTimeout(t1);
  }, [bootComplete]);

  useEffect(() => {
    if (!taglineVisible) return;
    if (taglineChars.length < profile.tagline.length) {
      const t = setTimeout(() => {
        setTaglineChars(profile.tagline.slice(0, taglineChars.length + 1));
      }, 20 + Math.random() * 10);
      return () => clearTimeout(t);
    } else {
      setTaglineDone(true);
    }
  }, [taglineVisible, taglineChars]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* ── Animated gradient orbs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {GRADIENT_ORBS.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-orb"
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
              left: orb.x,
              top: orb.y,
              transform: 'translate(-50%, -50%)',
              '--orb-x': orb.x,
              '--orb-y': orb.y,
              animationDuration: `${orb.duration}s`,
              animationDelay: `${orb.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Base gradient mesh ── */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      {/* ── Particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full ${p.color} ${p.size} particle`}
            style={{
              left: p.x,
              top: p.y,
              '--drift-x': `${p.driftX}px`,
              '--drift-y': `${p.driftY}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Floating tech tags ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block" aria-hidden="true">
        {floatTags.map((tag) => (
          <div
            key={tag.text}
            className="absolute px-3 py-1 rounded-full text-[10px] font-mono border border-primary/20 bg-background/40 text-primary/60 backdrop-blur-sm float-tag"
            style={{
              left: `${tag.x}%`,
              top: `${tag.y}%`,
              animationDelay: `${tag.delay}s`,
              animationDuration: `${tag.duration}s`,
              '--float-x': `${tag.xDrift}%`,
              '--float-y': `${tag.yDrift}%`,
            } as React.CSSProperties}
          >
            {tag.text}
          </div>
        ))}
      </div>

      {/* ── CRT scan lines ── */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-[0.04]" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-4 w-full max-w-2xl">
        {!bootComplete ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs sm:text-sm text-primary/80 leading-relaxed text-left max-w-md mx-auto"
          >
            {displayText.split('\n').map((line, i) => (
              <div key={i}>
                {line}
                {i === displayText.split('\n').length - 1 && (
                  <span className="animate-blink ml-0.5 text-primary">▊</span>
                )}
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', damping: 14, stiffness: 200 }}
            >
              <div className="relative inline-block">
                <motion.img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto relative z-10"
                  animate={{ boxShadow: [
                    '0 0 20px hsl(157 100% 50% / 0.3), 0 0 60px hsl(157 100% 50% / 0.1)',
                    '0 0 30px hsl(157 100% 50% / 0.5), 0 0 80px hsl(157 100% 50% / 0.2)',
                    '0 0 20px hsl(157 100% 50% / 0.3), 0 0 60px hsl(157 100% 50% / 0.1)',
                  ]}}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Animated ring */}
                <motion.svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 120 120"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(157, 100%, 50%)" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="hsl(195, 100%, 50%)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="hsl(263, 86%, 66%)" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="60" cy="60" r="54"
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="2"
                    strokeDasharray="90 250"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </div>
            </motion.div>

            {/* Name + Role */}
            <div className="space-y-2">
              <motion.h1
                className="text-4xl md:text-6xl font-bold font-mono text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
              >
                {profile.name}
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-primary text-glow font-mono"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
              >
                {profile.role}
              </motion.p>
            </div>

            {/* Typewriter tagline */}
            <div className="h-6">
              {taglineVisible && (
                <motion.p
                  className="text-sm text-muted-foreground/80 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="text-primary/40">$ </span>
                  {taglineChars}
                  {!taglineDone && <span className="animate-blink ml-0.5 text-primary">▊</span>}
                </motion.p>
              )}
            </div>

            {/* CTA */}
            <motion.div
              className="flex items-center justify-center gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <a
                href={profile.resumeUrl}
                download
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-background font-mono text-sm font-bold hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(157_100%_50%/0.4)]"
              >
                <Download size={15} className="group-hover:translate-y-0.5 transition-transform" />
                download_resume
              </a>
              <motion.button
                onClick={() => onOpenWindow?.('about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border font-mono text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
              >
                <Terminal size={14} />
                explore
              </motion.button>
            </motion.div>

            {/* Terminal prompt */}
            <motion.div
              className="text-[10px] font-mono text-muted-foreground/30 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              yash@portfolio:~$ <span className="animate-blink">_</span>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* ── Scroll indicator ── */}
      {bootComplete && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ delay: 2.5, opacity: { duration: 0.5 }, y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <ChevronDown size={18} className="text-muted-foreground/30" />
        </motion.div>
      )}
    </div>
  );
};
