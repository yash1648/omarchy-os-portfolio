import React, { useState, useRef, useEffect } from 'react';
import profile from '@/config/profile.json';
import skills from '@/config/skills.json';
import projects from '@/config/projects.json';
import experience from '@/config/experience.json';
import socials from '@/config/socials.json';

interface Line {
  type: 'input' | 'output';
  content: string;
}

const helpText = `Available commands:
  help         Show this help message
  about        Display developer bio
  skills       List technical skills
  projects     Show project portfolio
  experience   Show work experience
  contact      Show contact info
  education    Show educational background
  social       Show social links
  clear        Clear terminal
  whoami       Who am I?
  neofetch     System info`;

function processCommand(cmd: string): string {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case 'help': return helpText;
    case 'about': return `${profile.name} — ${profile.role}\n\n${profile.bio}`;
    case 'whoami': return profile.name;
    case 'skills':
      return Object.entries(skills)
        .map(([cat, items]) => `[${cat}]\n${(items as any[]).map(s => `  ${s.name}: ${'█'.repeat(Math.round(s.level/10))} ${s.level}%`).join('\n')}`)
        .join('\n\n');
    case 'projects':
      return projects.map(p => `▸ ${p.title}\n  ${p.description}\n  [${p.tech.join(', ')}]`).join('\n\n');
    case 'experience':
      return experience.map(e => `▸ ${e.role} @ ${e.company} (${e.duration})\n${e.achievements.map(a => `  - ${a}`).join('\n')}`).join('\n\n');
    case 'contact':
      return socials.map(s => `${s.name}: ${s.url}`).join('\n');
    case 'education':
      return `B.Tech in Computer Engineering\nR.C. Patel Institute of Technology\nExpected: 2026`;
    case 'social':
      return socials.map(s => `${s.name.padEnd(10)} ${s.url}`).join('\n');
    case 'neofetch':
      return `╔══════════════════════════╗
║  ${profile.name.padEnd(22)} ║
║  ${profile.role.padEnd(22)} ║
╠══════════════════════════╣
║  OS:     Omarchy Linux   ║
║  Shell:  portfolio/zsh   ║
║  Term:   web-terminal    ║
║  Kernel: React 18        ║
║  Uptime: ${profile.stats.yearsExperience}+ years         ║
║  Pkgs:   ${profile.stats.projectsCompleted}+ projects     ║
║  Shell:  ${profile.techStack.join(', ').substring(0, 20)}.. ║
╚══════════════════════════╝`;
    case 'clear': return '__CLEAR__';
    default:
      if (c.length === 0) return '';
      return `command not found: ${cmd}\nType 'help' for available commands.`;
  }
}

export const TerminalWindow: React.FC = () => {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', content: `Welcome to Omarchy Terminal v1.0\nType 'help' to get started.\n` },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = processCommand(input);
    if (result === '__CLEAR__') {
      setLines([]);
    } else {
      setLines(prev => [
        ...prev,
        { type: 'input', content: input },
        ...(result ? [{ type: 'output' as const, content: result }] : []),
      ]);
    }
    setInput('');
  };

  return (
    <div className="h-full flex flex-col bg-background/50 rounded-lg font-mono text-sm">
      <div className="flex-1 overflow-auto p-4 space-y-1 scrollbar-hide">
        {lines.map((line, i) => (
          <div key={i} className={line.type === 'input' ? 'text-primary' : 'text-foreground/80'}>
            {line.type === 'input' && <span className="text-secondary">❯ </span>}
            <span className="whitespace-pre-wrap">{line.content}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t border-border">
        <span className="text-secondary">❯</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-primary font-mono caret-primary"
          autoFocus
          spellCheck={false}
        />
        <span className="animate-blink text-primary">▊</span>
      </form>
    </div>
  );
};
