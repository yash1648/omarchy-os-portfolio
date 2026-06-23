import React from 'react';
import { motion } from 'framer-motion';
import projects from '@/config/projects.json';
import { ExternalLink, Github, Code2 } from 'lucide-react';

// Deterministic gradient pairs from project title hash
const gradients = [
  ['from-emerald-900/60', 'to-cyan-900/60'],
  ['from-violet-900/60', 'to-indigo-900/60'],
  ['from-orange-900/60', 'to-rose-900/60'],
  ['from-blue-900/60', 'to-teal-900/60'],
  ['from-purple-900/60', 'to-pink-900/60'],
  ['from-teal-900/60', 'to-emerald-900/60'],
  ['from-indigo-900/60', 'to-violet-900/60'],
  ['from-rose-900/60', 'to-orange-900/60'],
  ['from-cyan-900/60', 'to-blue-900/60'],
];

function hashString(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const ProjectBanner: React.FC<{ title: string; tech: string[] }> = ({ title, tech }) => {
  const idx = hashString(title) % gradients.length;
  const [from, to] = gradients[idx];

  return (
    <div className={`h-32 bg-gradient-to-br ${from} ${to} flex items-center justify-center relative overflow-hidden`}>
      {/* Decorative code icon */}
      <Code2 size={48} className="text-foreground/5 absolute" />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h3 className="text-sm font-mono font-bold text-foreground/90 drop-shadow-lg">
          {title}
        </h3>
        <div className="flex flex-wrap justify-center gap-1 mt-2">
          {tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-background/40 text-foreground/70 font-mono backdrop-blur-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProjectsWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-mono text-primary text-glow">~/projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="glass-panel overflow-hidden group cursor-pointer hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--glow-primary)/0.1)] transition-all duration-300"
          >
            <ProjectBanner title={project.title} tech={project.tech} />
            <div className="p-4 space-y-2">
              <h3 className="font-mono font-bold text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-mono">
                    {t}
                  </span>
                ))}
              </div>
              <motion.div
                className="flex gap-2 pt-2"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200">
                  <Github size={16} />
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                     className="text-muted-foreground hover:text-secondary hover:scale-110 transition-all duration-200">
                    <ExternalLink size={16} />
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
