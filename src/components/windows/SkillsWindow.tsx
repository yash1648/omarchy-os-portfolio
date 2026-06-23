import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import skills from '@/config/skills.json';

const categories: { key: keyof typeof skills; label: string; color: string }[] = [
  { key: 'languages', label: 'Languages', color: 'primary' },
  { key: 'frameworks', label: 'Frameworks', color: 'secondary' },
  { key: 'databases', label: 'Databases', color: 'accent' },
  { key: 'tools', label: 'Tools', color: 'primary' },
  { key: 'aiTools', label: 'AI & LLM', color: 'secondary' },
];

const colorMap = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
};

const SkillBar: React.FC<{ name: string; level: number; color: string; delay: number }> = ({ name, level, color, delay }) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-mono">
        <span className="text-foreground">{name}</span>
        <motion.span
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ delay, duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${colorMap[color as keyof typeof colorMap]} relative`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, delay: delay + 0.5, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>
    </div>
  );
};

const CategorySection: React.FC<{ cat: typeof categories[0] }> = ({ cat }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const skillsList = skills[cat.key];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.h3
        className="text-sm font-mono text-muted-foreground mb-3"
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.3 }}
      >
        {cat.label}/
      </motion.h3>
      <div className="space-y-3">
        {skillsList.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={cat.color}
            delay={i * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const SkillsWindow: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-mono text-primary text-glow">~/skills</h2>
      {categories.map((cat) => (
        <CategorySection key={cat.key} cat={cat} />
      ))}
    </div>
  );
};
