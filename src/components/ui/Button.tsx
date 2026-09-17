import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
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
    'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer select-none active:scale-[0.98]';

  const primaryStyle = {
    background: 'var(--ink)',
    color: '#ffffff',
    border: '1px solid var(--ink)',
  };

  const ghostStyle = {
    background: 'transparent',
    color: 'var(--ink-muted)',
    border: '1px solid var(--border)',
  };

  const getStyle = () => variant === 'primary' ? primaryStyle : ghostStyle;

  const handleEnter = (e: React.MouseEvent) => {
    const t = e.currentTarget as HTMLElement;
    if (variant === 'primary') {
      t.style.background = '#333';
      t.style.borderColor = '#333';
    } else {
      t.style.borderColor = 'var(--border-hi)';
      t.style.color = 'var(--ink)';
    }
  };

  const handleLeave = (e: React.MouseEvent) => {
    const t = e.currentTarget as HTMLElement;
    if (variant === 'primary') {
      t.style.background = 'var(--ink)';
      t.style.borderColor = 'var(--ink)';
    } else {
      t.style.borderColor = 'var(--border)';
      t.style.color = 'var(--ink-muted)';
    }
  };

  const content = (
    <>
      {children}
      {icon && <span>{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={`${base} ${className}`}
        style={getStyle()}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
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
        className={`${base} ${className}`}
        style={getStyle()}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${className}`}
      style={getStyle()}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {content}
    </button>
  );
}
