import React from 'react';
import { motion } from 'framer-motion';
import skills from '@/config/skills.json';

const categories = [
  { key: 'languages' as const, label: 'Languages', color: 'primary' },
  { key: 'frameworks' as const, label: 'Frameworks', color: 'secondary' },
  { key: 'tools' as const, label: 'Tools', color: 'accent' },
  { key: 'devops' as const, label: 'DevOps', color: 'primary' },
];

export const SkillsWindow: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-mono text-primary text-glow">~/skills</h2>
      {categories.map((cat) => (
        <div key={cat.key}>
          <h3 className="text-sm font-mono text-muted-foreground mb-3">{cat.label}/</h3>
          <div className="space-y-3">
            {skills[cat.key].map((skill, i) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-foreground">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
