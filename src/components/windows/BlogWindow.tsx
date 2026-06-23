import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Linkedin } from 'lucide-react';
import blogPosts from '@/config/blog.json';

const BlogCard: React.FC<{ post: typeof blogPosts[0]; index: number }> = ({ post, index }) => {
  const hasLink = Boolean(post.url);

  return (
    <motion.a
      href={hasLink ? post.url : undefined}
      target={hasLink ? '_blank' : undefined}
      rel={hasLink ? 'noopener noreferrer' : undefined}
      className={`glass-panel p-4 space-y-2 transition-all duration-300 group block ${
        hasLink
          ? 'hover:border-primary/30 hover:shadow-[0_0_15px_hsl(var(--glow-primary)/0.08)] cursor-pointer'
          : 'opacity-60'
      }`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
      whileHover={hasLink ? { y: -3 } : undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-mono font-bold text-foreground text-sm group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>
        {hasLink && (
          <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
            <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary shrink-0 mt-1 transition-colors duration-300" />
          </motion.div>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{post.excerpt}</p>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60 font-mono">
          <Calendar size={10} />
          {post.date}
        </div>
        <div className="flex flex-wrap gap-1">
          {post.tags.map(t => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export const BlogWindow: React.FC = () => {
  const hasPosts = blogPosts.some(p => p.url);
  const linkedInUrl = 'https://linkedin.com/in/yashbagal666';

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-mono text-primary text-glow">~/blog</h2>
        <motion.a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ x: 2 }}
        >
          <Linkedin size={12} />
          follow on LinkedIn
        </motion.a>
      </div>

      {blogPosts.length === 0 ? (
        <div className="glass-panel p-6 text-center space-y-2">
          <p className="text-muted-foreground font-mono text-sm">No posts yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blogPosts.map((post, i) => (
            <BlogCard key={i} post={post} index={i} />
          ))}
        </div>
      )}

      {!hasPosts && (
        <motion.p
          className="text-center text-[10px] text-muted-foreground/40 font-mono pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Drop your LinkedIn post URLs into <code className="text-primary">src/config/blog.json</code>
        </motion.p>
      )}
    </motion.div>
  );
};
