import { Github } from 'lucide-react';
import { Section, Eyebrow, Reveal } from '../ui/Section';
import { ProjectCard } from './ProjectCard';
import { projects } from '../../data/projects';
import { profile } from '../../data/profile';

export function Projects() {
  return (
    <Section id="projects">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
        <div>
          <Eyebrow>Featured Projects</Eyebrow>
          <Reveal>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900">
              Some Things I&apos;ve <span className="bg-gradient-to-r from-slate-900 via-emerald-light to-sky-accent bg-clip-text text-transparent">Built</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider px-5 py-3 rounded-2xl liquid-bubble text-slate-800 hover:text-emerald-light hover:border-emerald-glow/50 transition-all duration-300"
          >
            <Github size={15} />
            VIEW ALL ON GITHUB
          </a>
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
