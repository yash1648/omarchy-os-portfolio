import React, { useMemo } from 'react';
import { Wifi, Battery, Power, FileText } from 'lucide-react';
import { WindowId } from '@/hooks/useWindowManager';

interface SystemBarProps {
  activeWindow: WindowId | null;
  onPowerClick: () => void;
  onToggleView?: () => void;
}

export const SystemBar: React.FC<SystemBarProps> = ({ activeWindow, onPowerClick, onToggleView }) => {
  const time = useMemo(() => new Date(), []);

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
        {onToggleView && (
          <button
            onClick={onToggleView}
            className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            title="Resume View"
          >
            <FileText size={12} />
            <span className="hidden sm:inline">Resume</span>
          </button>
        )}
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
