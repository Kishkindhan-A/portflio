import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'glass';
  icon?: ReactNode;
  target?: string;
  className?: string;
}

export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  icon,
  target,
  className = '',
}: ButtonProps) {
  const base =
    'group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold tracking-wider font-mono transition-all duration-300 overflow-hidden cursor-pointer select-none active:scale-[0.97]';

  const styles =
    variant === 'primary'
      ? // Luxury deep ink CTA with emerald aura
        'bg-slate-900 text-white hover:bg-slate-800 shadow-[0_4px_14px_rgba(15,23,42,0.16),0_0_20px_rgba(16,185,129,0.18)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.22),0_0_24px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 border border-slate-800'
      : variant === 'glass'
      ? 'bg-white/90 text-slate-800 border border-slate-200/90 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:bg-white hover:border-emerald-glow/50 hover:text-emerald-light hover:-translate-y-0.5'
      : // Ghost
        'bg-slate-100/80 text-slate-600 border border-slate-200/60 hover:bg-white hover:text-slate-900 hover:border-slate-300 hover:-translate-y-0.5';

  const content = (
    <>
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        aria-hidden
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${base} ${styles} ${className}`}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={`${base} ${styles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} ${className}`}>
      {content}
    </button>
  );
}
