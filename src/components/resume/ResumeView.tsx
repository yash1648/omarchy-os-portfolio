import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Github, Linkedin, Mail, MapPin, BookOpen, Award, Users, Eye, GitMerge, Loader2 } from 'lucide-react';
import profile from '@/config/profile.json';
import skills from '@/config/skills.json';
import experience from '@/config/experience.json';
import projects from '@/config/projects.json';
import blogPosts from '@/config/blog.json';
import socials from '@/config/socials.json';
import { sendEmail, buildMailtoHref } from '@/lib/email';
import { toast } from 'sonner';

/* ───── Section Wrapper ───── */
const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} className="py-16 md:py-20 border-b border-border/40 last:border-0">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-sm font-mono text-primary mb-8 tracking-widest uppercase"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {'// '}{title}
      </motion.h2>
      {children}
    </div>
  </section>
);

/* ───── Hero ───── */
const HeroSection: React.FC = () => (
  <section className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
    <div className="absolute inset-0 gradient-mesh" />
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <motion.img
          src={profile.avatar}
          alt={profile.name}
          className="w-24 h-24 rounded-full mx-auto border-2 border-primary/30 glow-primary mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        />
        <h1 className="text-4xl md:text-6xl font-bold font-mono text-foreground mb-3">{profile.name}</h1>
        <p className="text-xl text-primary text-glow font-mono mb-2">{profile.role}</p>
        <p className="text-muted-foreground max-w-xl mx-auto mb-2">{profile.tagline}</p>

        {/* Location */}
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground/60 font-mono mb-6">
          <MapPin size={12} />
          Shirpur, Maharashtra, India
        </div>

        {/* Social Proof Strip */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
          {[
            { icon: Users, label: 'Followers', value: profile.stats.followers },
            { icon: Eye, label: 'Impressions', value: profile.stats.impressions },
            { icon: GitMerge, label: 'PRs Merged', value: profile.stats.prsMerged },
            { icon: Award, label: 'Projects', value: `${profile.stats.projectsCompleted}+` },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + Math.random() * 0.3 }}
            >
              <stat.icon size={18} className="text-primary mx-auto mb-1" />
              <div className="text-lg font-bold font-mono text-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <motion.a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-background font-mono text-sm font-bold hover:opacity-90 transition-all glow-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.03 }}
          >
            <Download size={16} />
            Download Resume
          </motion.a>
          <motion.a
            href={socials.find(s => s.name === 'Email')?.url || '#'}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-mono text-sm hover:bg-primary/20 transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.03 }}
          >
            <Mail size={16} />
            Contact Me
          </motion.a>
          <motion.a
            href={socials.find(s => s.name === 'LinkedIn')?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted/50 border border-border text-muted-foreground font-mono text-sm hover:text-primary transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            whileHover={{ scale: 1.03 }}
          >
            <Linkedin size={16} />
            LinkedIn
          </motion.a>
        </div>

        {/* Open to Work Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-mono text-green-400">Open to Work</span>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ───── About ───── */
const AboutSection: React.FC = () => (
  <Section id="about" title="About">
    <motion.p
      className="text-foreground/80 leading-relaxed max-w-3xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {profile.bio}
    </motion.p>
    <div className="flex flex-wrap gap-2 mt-6">
      {profile.techStack.map((tech, i) => (
        <motion.span
          key={tech}
          className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03 }}
        >
          {tech}
        </motion.span>
      ))}
    </div>
  </Section>
);

/* ───── Skills ───── */
const SkillCategory: React.FC<{ title: string; items: { name: string; level: number }[]; color: string }> = ({ title, items, color }) => {
  const colorClass = color === 'primary' ? 'bg-primary' : color === 'secondary' ? 'bg-secondary' : 'bg-accent';
  return (
    <div>
      <h3 className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill.name}
            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-muted/50 border border-border text-foreground/80"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const SkillsSection: React.FC = () => (
  <Section id="skills" title="Skills">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <SkillCategory title="Languages" items={skills.languages} color="primary" />
        <SkillCategory title="Frameworks" items={skills.frameworks} color="secondary" />
        <SkillCategory title="Databases" items={skills.databases} color="accent" />
      </div>
      <div className="space-y-6">
        <SkillCategory title="Tools & DevOps" items={skills.tools} color="primary" />
        <SkillCategory title="AI & LLM" items={skills.aiTools} color="secondary" />
      </div>
    </div>
  </Section>
);

/* ───── Experience ───── */
const ExperienceSection: React.FC = () => (
  <Section id="experience" title="Experience">
    <div className="space-y-8">
      {experience.map((exp, i) => (
        <motion.div
          key={i}
          className="relative pl-6 border-l border-primary/30"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-primary glow-primary" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
            <h3 className="font-mono font-bold text-foreground text-sm">{exp.role}</h3>
            <span className="text-xs font-mono text-muted-foreground">{exp.duration}</span>
          </div>
          <p className="text-xs text-primary font-mono mb-3">{exp.company}</p>
          <ul className="space-y-1.5">
            {exp.achievements.map((a, j) => (
              <li key={j} className="text-sm text-foreground/70 flex items-start gap-2">
                <span className="text-primary mt-1 shrink-0">▸</span>
                {a}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </Section>
);

/* ───── Projects ───── */
const ProjectsSection: React.FC = () => (
  <Section id="projects" title="Projects">
    <div className="grid md:grid-cols-2 gap-4">
      {projects.slice(0, 6).map((project, i) => (
        <motion.a
          key={project.id}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel p-4 space-y-2 group hover:border-primary/40 transition-all duration-300"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -3 }}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-mono font-bold text-sm text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
            <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary shrink-0 mt-0.5" />
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1">
            {project.tech.map(t => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary/20 text-secondary font-mono">{t}</span>
            ))}
          </div>
        </motion.a>
      ))}
    </div>
    <motion.a
      href="https://github.com/yash1648"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 mt-6 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Github size={14} />
      View all projects on GitHub →
    </motion.a>
  </Section>
);

/* ───── Blog ───── */
const BlogSection: React.FC = () => (
  <Section id="blog" title="Writing & Insights">
    <div className="space-y-3">
      {blogPosts.filter(p => p.url).slice(0, 4).map((post, i) => (
        <motion.a
          key={i}
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel p-4 flex items-start justify-between gap-4 group hover:border-primary/30 transition-all duration-300"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ x: 3 }}
        >
          <div className="space-y-1 min-w-0">
            <h3 className="font-mono font-bold text-xs text-foreground group-hover:text-primary transition-colors">{post.title}</h3>
            <p className="text-[11px] text-muted-foreground line-clamp-1">{post.excerpt}</p>
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map(t => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono">{t}</span>
              ))}
            </div>
          </div>
          <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary shrink-0 mt-1" />
        </motion.a>
      ))}
    </div>
    <motion.a
      href={socials.find(s => s.name === 'LinkedIn')?.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 mt-4 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <BookOpen size={14} />
      Read all posts on LinkedIn →
    </motion.a>
  </Section>
);

/* ───── Contact ───── */
const ContactSection: React.FC = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const emailAddr = formData.get('email') as string;
    const message = formData.get('message') as string;

    setSending(true);
    const result = await sendEmail({ from_name: name, from_email: emailAddr, message });
    if (result.success) {
      toast.success('Message sent!');
      form.reset();
    } else {
      toast.info('Opening mail client...');
      const email = socials.find(s => s.name === 'Email')?.url?.replace('mailto:', '') || '';
      window.location.href = buildMailtoHref(email, name, message);
    }
    setSending(false);
  };

  return (
    <Section id="contact" title="Contact">
      <div className="max-w-xl">
        <p className="text-foreground/70 mb-6 text-sm">
          I'm currently open to new opportunities. Reach out and let's talk.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="name" required placeholder="Your name" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm font-mono text-foreground outline-none focus:border-primary/50 transition-colors" />
            <input type="email" name="email" required placeholder="Your email" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm font-mono text-foreground outline-none focus:border-primary/50 transition-colors" />
          </div>
          <textarea rows={3} name="message" required placeholder="Your message" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm font-mono text-foreground outline-none focus:border-primary/50 transition-colors resize-none" />
          <button type="submit" disabled={sending} className="w-full py-3 rounded-xl bg-primary text-background font-mono text-sm font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {sending ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        <div className="flex gap-4 mt-6">
          {socials.filter(s => s.name !== 'Email').map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
               className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
              {s.name === 'GitHub' && <Github size={14} />}
              {s.name === 'LinkedIn' && <Linkedin size={14} />}
              {s.name === 'Portfolio' && <ExternalLink size={14} />}
              {s.name.toLowerCase()}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ───── Footer ───── */
const Footer: React.FC = () => (
  <footer className="py-8 text-center">
    <p className="text-xs font-mono text-muted-foreground/40">
      &copy; {new Date().getFullYear()} {profile.name} &mdash; Built with React + Tailwind &middot; Omarchy OS
    </p>
  </footer>
);

/* ───── Main Resume View ───── */
interface ResumeViewProps {
  onSwitchToDesktop: () => void;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ onSwitchToDesktop }) => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-y-auto">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 glass-panel rounded-none border-t-0 border-x-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <span className="font-mono text-sm text-primary font-bold">~$ {profile.name.split(' ')[0].toLowerCase()}/resume</span>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onSwitchToDesktop}
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ x: -2 }}
            >
              ← Desktop View
            </motion.button>
            <a
              href={profile.resumeUrl}
              download
              className="text-xs font-mono text-primary hover:underline"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};
