import React from 'react';
import { motion } from 'framer-motion';
import { User, FolderKanban, Cpu, Briefcase, SquareTerminal, Mail, BookOpen } from 'lucide-react';
import { WindowId } from '@/hooks/useWindowManager';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface DockProps {
  onOpenWindow: (id: WindowId) => void;
}

const dockItems: { id: WindowId; label: string; icon: React.ElementType }[] = [
  { id: 'about', label: 'About Me', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'terminal', label: 'Terminal', icon: SquareTerminal },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const Dock: React.FC<DockProps> = ({ onOpenWindow }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', damping: 20 }}
        className="glass-panel px-4 py-2 flex items-center gap-2"
      >
        {dockItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.3, y: -8 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenWindow(item.id)}
                className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors relative group"
              >
                <item.icon size={22} />
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-card border-border font-mono text-xs">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </motion.div>
    </div>
  );
};
