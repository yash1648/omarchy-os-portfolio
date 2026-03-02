import React from 'react';
import { motion } from 'framer-motion';
import experience from '@/config/experience.json';

export const ExperienceWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-mono text-primary text-glow">~/experience</h2>
      <div className="relative pl-6">
        {/* Timeline line */}
        <div className="absolute left-2 top-0 bottom-0 w-px bg-primary/30" />

        {experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative mb-8 last:mb-0"
          >
            {/* Node */}
            <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-primary glow-primary" />

            <div className="glass-panel p-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="font-mono font-bold text-foreground text-sm">{exp.role}</h3>
                <span className="text-xs font-mono text-muted-foreground">{exp.duration}</span>
              </div>
              <p className="text-xs text-primary font-mono">{exp.company}</p>
              <ul className="space-y-1">
                {exp.achievements.map((a, j) => (
                  <li key={j} className="text-xs text-foreground/70 flex items-start gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
