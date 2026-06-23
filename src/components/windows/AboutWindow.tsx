import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import profile from '@/config/profile.json';
import { Code, GitCommit, Rocket, Calendar } from 'lucide-react';

const AnimatedStat: React.FC<{ icon: React.ElementType; label: string; value: string | number; delay: number }> = ({ icon: Icon, label, value, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="glass-panel p-4 text-center"
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 0 20px hsl(var(--glow-primary)/0.15)' }}
    >
      <Icon size={20} className="text-primary mx-auto mb-2" />
      <motion.div
        className="text-2xl font-bold font-mono text-foreground"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.2 }}
      >
        {value}
      </motion.div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
};

export const AboutWindow: React.FC = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-mono text-primary text-glow mb-3">~/about</h2>
        <p className="text-foreground/80 leading-relaxed">{profile.bio}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <AnimatedStat icon={Calendar} label="Years Exp" value={profile.stats.yearsExperience} delay={0.2} />
        <AnimatedStat icon={Rocket} label="Projects" value={profile.stats.projectsCompleted} delay={0.25} />
        <AnimatedStat icon={GitCommit} label="Commits" value={profile.stats.githubCommits.toLocaleString()} delay={0.3} />
      </div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h3 className="text-sm font-mono text-muted-foreground mb-3">tech_stack:</h3>
        <div className="flex flex-wrap gap-2">
          {profile.techStack.map((tech, i) => (
            <motion.span
              key={tech}
              className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.2 }}
              whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--primary) / 0.2)' }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
