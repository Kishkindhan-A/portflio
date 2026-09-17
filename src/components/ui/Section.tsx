import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`relative py-24 sm:py-28 ${className}`}>
      <div className="section-container relative z-10">{children}</div>
    </section>
  );
}

interface EyebrowProps {
  children: ReactNode;
}

export function Eyebrow({ children }: EyebrowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50/90 text-emerald-800 border border-emerald-200/80 shadow-xs mb-4 text-xs font-semibold uppercase tracking-wider"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
      <span>{children}</span>
    </motion.div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
