import React from 'react';
import { motion } from 'framer-motion';
import projects from '@/config/projects.json';
import { ExternalLink, Github } from 'lucide-react';

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
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-panel overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors"
          >
            <div className="h-32 overflow-hidden">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-mono font-bold text-foreground">{project.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-mono">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary transition-colors">
                  <Github size={16} />
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-secondary transition-colors">
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
