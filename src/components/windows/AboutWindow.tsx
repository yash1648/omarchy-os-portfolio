import React from 'react';
import profile from '@/config/profile.json';
import { Code, GitCommit, Rocket, Calendar } from 'lucide-react';

export const AboutWindow: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Bio */}
      <div>
        <h2 className="text-lg font-mono text-primary text-glow mb-3">~/about</h2>
        <p className="text-foreground/80 leading-relaxed">{profile.bio}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Calendar, label: 'Years Exp', value: profile.stats.yearsExperience },
          { icon: Rocket, label: 'Projects', value: profile.stats.projectsCompleted },
          { icon: GitCommit, label: 'Commits', value: profile.stats.githubCommits.toLocaleString() },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-4 text-center">
            <stat.icon size={20} className="text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold font-mono text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="text-sm font-mono text-muted-foreground mb-3">tech_stack:</h3>
        <div className="flex flex-wrap gap-2">
          {profile.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
