import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import profile from '@/config/profile.json';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bootSequence = [
  'Booting portfolio...',
  'Loading developer profile...',
  'Initializing desktop environment...',
];

const PARTICLE_COUNT = 20;

function generateParticles(count: number) {
  if (typeof window === 'undefined') return [];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    driftX: (Math.random() - 0.5) * 80,
    driftY: -60 - Math.random() * 140,
    delay: Math.random() * 6,
    duration: 10 + Math.random() * 8,
  }));
}

export const HeroWallpaper: React.FC = () => {
  const [bootIndex, setBootIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [bootComplete, setBootComplete] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const particles = useMemo(() => generateParticles(PARTICLE_COUNT), []);

  useEffect(() => {
    if (bootIndex >= bootSequence.length) {
      setBootComplete(true);
      return;
    }

    const currentLine = bootSequence[bootIndex];
    if (charIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + currentLine[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayText('');
        setCharIndex(0);
        setBootIndex(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [bootIndex, charIndex]);

  return (
    <div className="absolute inset-0 flex items-center justify-center gradient-mesh">
      {/* Floating particles — CSS animated (zero JS thread cost) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 rounded-full bg-primary/30 particle"
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

      <div className="text-center z-10 px-4">
        {!bootComplete ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-primary text-lg"
          >
            <span>{displayText}</span>
            <span className="animate-blink ml-1">▊</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 12, stiffness: 200 }}
            >
              <motion.img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full mx-auto border-2 border-primary/30 glow-primary"
                animate={{ boxShadow: ['0 0 20px hsl(157 100% 50% / 0.3)', '0 0 40px hsl(157 100% 50% / 0.5)', '0 0 20px hsl(157 100% 50% / 0.3)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <div>
              <motion.h1
                className="text-4xl md:text-6xl font-bold font-mono text-foreground mb-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
              >
                {profile.name}
              </motion.h1>
              <motion.p
                className="text-xl text-primary text-glow font-mono"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
              >
                {profile.role}
              </motion.p>
              <motion.p
                className="text-muted-foreground mt-2 max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
              >
                {profile.tagline}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <Button
                asChild
                className="bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:glow-primary font-mono transition-all duration-300"
              >
                <a href={profile.resumeUrl} download>
                  <Download size={16} />
                  download resume
                </a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
