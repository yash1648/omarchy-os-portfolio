import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import profile from '@/config/profile.json';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bootSequence = [
  'Booting portfolio...',
  'Loading developer profile...',
  'Initializing desktop environment...',
];

export const HeroWallpaper: React.FC = () => {
  const [bootIndex, setBootIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [bootComplete, setBootComplete] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

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
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/20"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, Math.random() * -200, Math.random() * 200],
            x: [null, Math.random() * 100 - 50],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}

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
            <motion.img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full mx-auto border-2 border-primary/30 glow-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            />
            <div>
              <h1 className="text-4xl md:text-6xl font-bold font-mono text-foreground mb-2">
                {profile.name}
              </h1>
              <p className="text-xl text-primary text-glow font-mono">
                {profile.role}
              </p>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                {profile.tagline}
              </p>
            </div>
            <Button
              asChild
              className="bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:glow-primary font-mono"
            >
              <a href={profile.resumeUrl} download>
                <Download size={16} />
                download resume
              </a>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
