import React from 'react';

export const BlogWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-mono text-primary text-glow">~/blog</h2>
      <div className="glass-panel p-6 text-center space-y-2">
        <p className="text-muted-foreground font-mono text-sm">No posts yet.</p>
        <p className="text-xs text-muted-foreground/60 font-mono">Add blog posts to config/blog.json to get started.</p>
      </div>
    </div>
  );
};
