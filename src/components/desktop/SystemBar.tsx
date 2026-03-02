import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Power, Moon, Sun } from 'lucide-react';
import { WindowId } from '@/hooks/useWindowManager';

interface SystemBarProps {
  activeWindow: WindowId | null;
  onPowerClick: () => void;
}

export const SystemBar: React.FC<SystemBarProps> = ({ activeWindow, onPowerClick }) => {
  const [time, setTime] = useState(new Date());
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const windowTitles: Record<string, string> = {
    about: 'about.sh',
    projects: 'projects.sh',
    skills: 'skills.sh',
    experience: 'experience.sh',
    terminal: 'terminal',
    contact: 'contact.sh',
    blog: 'blog.sh',
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-10 glass-panel rounded-none border-t-0 border-x-0 flex items-center justify-between px-4 z-50">
      {/* Left */}
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-primary text-glow font-bold">$ whoami</span>
      </div>

      {/* Center */}
      <div className="flex items-center gap-3">
        {activeWindow && (
          <span className="text-xs font-mono text-muted-foreground">
            ~/{windowTitles[activeWindow] || activeWindow}
          </span>
        )}
        <span className="text-xs font-mono text-foreground">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Wifi size={14} className="text-muted-foreground" />
        <Battery size={14} className="text-primary" />
        <button
          onClick={onPowerClick}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Power size={14} />
        </button>
      </div>
    </div>
  );
};
