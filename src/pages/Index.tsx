import React from 'react';
import { SystemBar } from '@/components/desktop/SystemBar';
import { Dock } from '@/components/desktop/Dock';
import { HeroWallpaper } from '@/components/desktop/HeroWallpaper';
import { AppWindow } from '@/components/desktop/AppWindow';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { ProjectsWindow } from '@/components/windows/ProjectsWindow';
import { SkillsWindow } from '@/components/windows/SkillsWindow';
import { ExperienceWindow } from '@/components/windows/ExperienceWindow';
import { TerminalWindow } from '@/components/windows/TerminalWindow';
import { ContactWindow } from '@/components/windows/ContactWindow';
import { BlogWindow } from '@/components/windows/BlogWindow';
import { useWindowManager, WindowId } from '@/hooks/useWindowManager';

const windowConfig: Record<WindowId, { title: string; component: React.FC; width?: number; height?: number }> = {
  about: { title: '~/about.sh', component: AboutWindow, width: 600, height: 500 },
  projects: { title: '~/projects.sh', component: ProjectsWindow, width: 800, height: 600 },
  skills: { title: '~/skills.sh', component: SkillsWindow, width: 600, height: 550 },
  experience: { title: '~/experience.sh', component: ExperienceWindow, width: 650, height: 550 },
  terminal: { title: 'terminal', component: TerminalWindow, width: 700, height: 450 },
  contact: { title: '~/contact.sh', component: ContactWindow, width: 500, height: 550 },
  blog: { title: '~/blog.sh', component: BlogWindow, width: 500, height: 400 },
};

const Index = () => {
  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindow } = useWindowManager();

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      <SystemBar activeWindow={activeWindow} onPowerClick={() => openWindow('contact')} />

      <HeroWallpaper />

      {windows.map(w => {
        const config = windowConfig[w.id];
        const Component = config.component;
        return (
          <AppWindow
            key={w.id}
            id={w.id}
            title={config.title}
            isOpen={w.isOpen}
            isMinimized={w.isMinimized}
            isMaximized={w.isMaximized}
            zIndex={w.zIndex}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            onMaximize={() => maximizeWindow(w.id)}
            onFocus={() => focusWindow(w.id)}
            defaultWidth={config.width}
            defaultHeight={config.height}
          >
            <Component />
          </AppWindow>
        );
      })}

      <Dock onOpenWindow={openWindow} />
    </div>
  );
};

export default Index;
