import React, { useState } from 'react';
import { Send, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import socials from '@/config/socials.json';
import { toast } from 'sonner';

export const ContactWindow: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const emailSocial = socials.find(s => s.name === 'Email');
  const email = emailSocial?.url.replace('mailto:', '') || '';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success('Email copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-mono text-primary text-glow">~/contact</h2>

      <form className="space-y-4" onSubmit={e => { e.preventDefault(); toast.success('This service not integrated yet'); }}>
        <div>
          <label className="text-xs font-mono text-muted-foreground block mb-1">name:</label>
          <input
            className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground outline-none focus:border-primary/50 transition-colors"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-muted-foreground block mb-1">email:</label>
          <input
            type="email"
            className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground outline-none focus:border-primary/50 transition-colors"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-muted-foreground block mb-1">message:</label>
          <textarea
            rows={4}
            className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground outline-none focus:border-primary/50 transition-colors resize-none"
            placeholder="Your message..."
          />
        </div>
        <Button type="submit" className="w-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 font-mono">
          <Send size={14} />
          send_message()
        </Button>
      </form>

      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={copyEmail} className="font-mono text-xs border-border text-muted-foreground hover:text-primary">
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'copied!' : 'copy email'}
        </Button>
        {socials.filter(s => s.name !== 'Email').map(s => (
          <Button key={s.name} variant="outline" size="sm" asChild className="font-mono text-xs border-border text-muted-foreground hover:text-primary">
            <a href={s.url} target="_blank" rel="noopener noreferrer">{s.name.toLowerCase()}</a>
          </Button>
        ))}
      </div>
    </div>
  );
};
