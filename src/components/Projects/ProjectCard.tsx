import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../data/projects';
import { profile } from '../../data/profile';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const projectUrl = project.link || profile.github;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.07 }}
      className="group flex flex-col justify-between rounded-xl border overflow-hidden transition-all duration-200"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      onMouseEnter={e => {
        const t = e.currentTarget as HTMLElement;
        t.style.borderColor = 'var(--border-hi)';
        t.style.boxShadow = '0 8px 24px rgba(26,26,24,0.08)';
      }}
      onMouseLeave={e => {
        const t = e.currentTarget as HTMLElement;
        t.style.borderColor = 'var(--border)';
        t.style.boxShadow = 'none';
      }}
    >
      {/* Project image */}
      <div className="relative h-44 overflow-hidden" style={{ background: '#E8E8E3' }}>
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {/* Number badge */}
        <span
          className="absolute top-3 left-3 font-mono text-xs font-bold px-2.5 py-1 rounded-md"
          style={{
            background: 'rgba(248,248,245,0.94)',
            color: 'var(--ink)',
            backdropFilter: 'blur(6px)',
          }}
        >
          {project.number}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-base mb-2 transition-colors duration-200" style={{ color: 'var(--ink)' }}>
          {project.name}
        </h3>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--ink-muted)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <span className="text-xs font-medium" style={{ color: 'var(--ink-subtle)' }}>
            View project
          </span>
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name}`}
            className="h-8 w-8 flex items-center justify-center rounded-lg border transition-all duration-200"
            style={{ borderColor: 'var(--border)', color: 'var(--ink-muted)' }}
            onMouseEnter={e => {
              const t = e.currentTarget as HTMLElement;
              t.style.borderColor = 'var(--accent)';
              t.style.color = 'var(--accent)';
              t.style.background = 'var(--accent-pale)';
            }}
            onMouseLeave={e => {
              const t = e.currentTarget as HTMLElement;
              t.style.borderColor = 'var(--border)';
              t.style.color = 'var(--ink-muted)';
              t.style.background = 'transparent';
            }}
          >
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
