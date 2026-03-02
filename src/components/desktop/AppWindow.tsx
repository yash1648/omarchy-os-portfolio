import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AppWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  className?: string;
  defaultWidth?: number;
  defaultHeight?: number;
}

export const AppWindow: React.FC<AppWindowProps> = ({
  title, isOpen, isMinimized, isMaximized, zIndex,
  onClose, onMinimize, onMaximize, onFocus, children,
  className, defaultWidth = 700, defaultHeight = 500,
}) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen || isMinimized) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        drag={!isMaximized}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onMouseDown={onFocus}
        className={cn(
          'fixed glass-panel shadow-2xl flex flex-col overflow-hidden',
          isMaximized
            ? 'inset-0 top-10 bottom-16 rounded-none'
            : 'rounded-2xl',
          className
        )}
        style={{
          zIndex,
          ...(isMaximized ? {} : {
            width: defaultWidth,
            height: defaultHeight,
            maxWidth: '95vw',
            maxHeight: 'calc(100vh - 120px)',
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
          }),
        }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/60 cursor-move select-none shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
            <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
            <button onClick={onMaximize} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
          </div>
          <span className="text-xs font-mono text-muted-foreground">{title}</span>
          <div className="w-16" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 scrollbar-hide">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
