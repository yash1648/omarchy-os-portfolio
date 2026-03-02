import { useState, useCallback } from 'react';

export type WindowId = 'about' | 'projects' | 'skills' | 'experience' | 'terminal' | 'contact' | 'blog';

export interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

const defaultWindows: WindowState[] = [
  { id: 'about', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 100, y: 60 } },
  { id: 'projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 150, y: 80 } },
  { id: 'skills', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 200, y: 100 } },
  { id: 'experience', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 120, y: 70 } },
  { id: 'terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 180, y: 90 } },
  { id: 'contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 140, y: 75 } },
  { id: 'blog', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 160, y: 85 } },
];

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>(defaultWindows);
  const [topZ, setTopZ] = useState(10);

  const openWindow = useCallback((id: WindowId) => {
    setTopZ(prev => prev + 1);
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: topZ + 1 } : w
    ));
  }, [topZ]);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w
    ));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  }, []);

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setTopZ(prev => prev + 1);
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, zIndex: topZ + 1 } : w
    ));
  }, [topZ]);

  const getWindow = useCallback((id: WindowId) => {
    return windows.find(w => w.id === id);
  }, [windows]);

  const activeWindow = windows.filter(w => w.isOpen && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id || null;

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    getWindow,
    activeWindow,
  };
}
