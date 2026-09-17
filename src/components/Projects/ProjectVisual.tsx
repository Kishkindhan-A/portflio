import type { Project } from '../../data/projects';

const GRADIENTS: Record<Project['visual'], string> = {
  earth: 'from-emerald-glow/20 via-slate-50 to-sky-accent/15',
  rockfall: 'from-sky-dim/15 via-slate-50 to-emerald-dim/15',
  circuit: 'from-emerald-glow/20 via-slate-50 to-slate-100',
  blockchain: 'from-sky-accent/15 via-slate-50 to-emerald-glow/15',
  vision: 'from-emerald-dim/15 via-slate-50 to-sky-dim/15',
  figma: 'from-sky-accent/15 via-slate-50 to-emerald-light/10',
};

/**
 * Tasteful decorative abstract treatment per project in light emerald/sky/slate palette.
 */
export function ProjectVisual({ variant }: { variant: Project['visual'] }) {
  return (
    <div className={`relative h-full w-full bg-gradient-to-br ${GRADIENTS[variant]} overflow-hidden`}>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(2,132,199,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(2,132,199,0.12) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 160" fill="none">
        <circle cx="230" cy="40" r="70" stroke="rgba(5,150,105,0.25)" strokeWidth="1" />
        <circle cx="60" cy="130" r="50" stroke="rgba(2,132,199,0.25)" strokeWidth="1" />
        <path d="M0 100 L80 60 L160 90 L240 40 L300 70" stroke="rgba(5,150,105,0.3)" strokeWidth="1" fill="none" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-200/40 via-transparent to-transparent" />
    </div>
  );
}
