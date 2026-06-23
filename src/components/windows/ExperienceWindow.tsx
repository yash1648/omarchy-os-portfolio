import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import experience from '@/config/experience.json';

const TimelineNode: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-primary glow-primary"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay, type: 'spring', damping: 12 }}
  >
    <motion.div
      className="absolute inset-0 rounded-full bg-primary"
      animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  </motion.div>
);

const AchievementItem: React.FC<{ text: string; delay: number }> = ({ text, delay }) => (
  <motion.li
    className="text-xs text-foreground/70 flex items-start gap-2"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4, ease: 'easeOut' }}
  >
    <span className="text-primary mt-0.5 shrink-0">▸</span>
    {text}
  </motion.li>
);

const ExperienceCard: React.FC<{ exp: typeof experience[0]; index: number }> = ({ exp, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const baseDelay = index * 0.15;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: baseDelay, duration: 0.5, ease: 'easeOut' }}
      className="relative mb-8 last:mb-0"
    >
      <TimelineNode delay={baseDelay + 0.1} />

      <motion.div
        className="glass-panel p-4 space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: baseDelay + 0.05, duration: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="font-mono font-bold text-foreground text-sm">{exp.role}</h3>
          <motion.span
            className="text-xs font-mono text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: baseDelay + 0.2 }}
          >
            {exp.duration}
          </motion.span>
        </div>
        <motion.p
          className="text-xs text-primary font-mono"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: baseDelay + 0.15 }}
        >
          {exp.company}
        </motion.p>
        <ul className="space-y-1">
          {exp.achievements.map((a, j) => (
            <AchievementItem key={j} text={a} delay={baseDelay + 0.2 + j * 0.08} />
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export const ExperienceWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-mono text-primary text-glow">~/experience</h2>
      <div className="relative pl-6">
        {/* Timeline line */}
        <motion.div
          className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ originY: 0 }}
        />

        {experience.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} index={i} />
        ))}
      </div>
    </div>
  );
};
