import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import socials from '@/config/socials.json';
import { toast } from 'sonner';
import { sendEmail } from '@/lib/email';

export const ContactWindow: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const emailSocial = socials.find(s => s.name === 'Email');
  const email = emailSocial?.url.replace('mailto:', '') || '';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success('Email copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const emailAddr = formData.get('email') as string;
    const message = formData.get('message') as string;

    setSending(true);
    const result = await sendEmail({
      from_name: name,
      from_email: emailAddr,
      message,
    });

    if (result.success) {
      toast.success('Message sent successfully!');
      form.reset();
    } else {
      // Fallback to mailto:
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`From: ${name} (${emailAddr})\n\n${message}`);
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
      toast.info('Email service not configured — opened mail client instead');
    }
    setSending(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-mono text-primary text-glow">~/contact</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="text-xs font-mono text-muted-foreground block mb-1">name:</label>
          <input
            name="name"
            required
            className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground outline-none focus:border-primary/50 focus:shadow-[0_0_10px_hsl(var(--glow-primary)/0.15)] transition-all duration-300"
            placeholder="John Doe"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="text-xs font-mono text-muted-foreground block mb-1">email:</label>
          <input
            type="email"
            name="email"
            required
            className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground outline-none focus:border-primary/50 focus:shadow-[0_0_10px_hsl(var(--glow-primary)/0.15)] transition-all duration-300"
            placeholder="john@example.com"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="text-xs font-mono text-muted-foreground block mb-1">message:</label>
          <textarea
            rows={4}
            name="message"
            required
            className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm font-mono text-foreground outline-none focus:border-primary/50 focus:shadow-[0_0_10px_hsl(var(--glow-primary)/0.15)] transition-all duration-300 resize-none"
            placeholder="Your message..."
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Button
            type="submit"
            disabled={sending}
            className="w-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:glow-primary font-mono transition-all duration-300 disabled:opacity-50"
          >
            {sending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
            {sending ? 'sending...' : 'send_message()'}
          </Button>
        </motion.div>
      </form>

      <motion.div
        className="flex gap-2 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button variant="outline" size="sm" onClick={copyEmail} className="font-mono text-xs border-border text-muted-foreground hover:text-primary transition-all duration-300">
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'copied!' : 'copy email'}
        </Button>
        {socials.filter(s => s.name !== 'Email').map(s => (
          <Button key={s.name} variant="outline" size="sm" asChild className="font-mono text-xs border-border text-muted-foreground hover:text-primary transition-all duration-300">
            <a href={s.url} target="_blank" rel="noopener noreferrer">{s.name.toLowerCase()}</a>
          </Button>
        ))}
      </motion.div>
    </div>
  );
};
