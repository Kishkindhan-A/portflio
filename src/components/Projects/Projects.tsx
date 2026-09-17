import { Github } from 'lucide-react';
import { Section, Eyebrow, Reveal } from '../ui/Section';
import { ProjectCard } from './ProjectCard';
import { projects } from '../../data/projects';
import { profile } from '../../data/profile';

export function Projects() {
  return (
    <Section id="projects">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <div>
          <Eyebrow>Projects</Eyebrow>
          <Reveal>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl" style={{ color: 'var(--ink)' }}>
              Things I've{' '}
              <span style={{ color: 'var(--accent)' }}>built</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-all duration-200"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--ink-muted)',
            }}
            onMouseEnter={e => {
              const t = e.currentTarget as HTMLElement;
              t.style.borderColor = 'var(--accent)';
              t.style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
              const t = e.currentTarget as HTMLElement;
              t.style.borderColor = 'var(--border)';
              t.style.color = 'var(--ink-muted)';
            }}
          >
            <Github size={16} />
            View all on GitHub
          </a>
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
