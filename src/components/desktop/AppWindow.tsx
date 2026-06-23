import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AppWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
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
  title, isOpen, isMinimized, isMaximized, zIndex, position,
  onClose, onMinimize, onMaximize, onFocus, children,
  className, defaultWidth = 700, defaultHeight = 500,
}) => {
  const [windowPos, setWindowPos] = useState({ x: position.x, y: position.y });
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen || isMinimized) return null;

  const cascadeOffset = 30;
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const h = typeof window !== 'undefined' ? window.innerHeight : 800;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, filter: 'blur(4px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        exit={{ scale: 0.9, opacity: 0, filter: 'blur(4px)' }}
        transition={{ type: 'spring', damping: 22, stiffness: 260, mass: 0.8 }}
        drag={!isMaximized}
        dragMomentum={false}
        dragElastic={0}
        onDragStart={() => {
          setIsDragging(true);
          onFocus();
        }}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          // Convert drag offset into a permanent position change,
          // then reset the internal drag transform to 0
          setWindowPos(prev => ({
            x: Math.max(0, Math.min(w - 100, prev.x + info.offset.x)),
            y: Math.max(0, Math.min(h - 200, prev.y + info.offset.y)),
          }));
          dragX.set(0);
          dragY.set(0);
        }}
        onMouseDown={onFocus}
        className={cn(
          'fixed shadow-2xl flex flex-col overflow-hidden',
          isMaximized
            ? 'inset-0 top-10 bottom-16 rounded-none'
            : 'rounded-2xl',
          'glass-panel',
          className
        )}
        style={{
          zIndex,
          x: isMaximized ? 0 : dragX,
          y: isMaximized ? 0 : dragY,
          ...(isMaximized ? {} : {
            width: Math.min(defaultWidth, w - 32),
            height: Math.min(defaultHeight, h - 160),
            maxWidth: 'calc(100vw - 16px)',
            maxHeight: 'calc(100vh - 140px)',
            left: Math.min(windowPos.x + cascadeOffset, w - 100),
            top: Math.min(windowPos.y + cascadeOffset, h - 200),
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
        <div className="flex-1 overflow-auto p-4 md:p-6 scrollbar-hide">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
