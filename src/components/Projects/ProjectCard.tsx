import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { Project } from '../../data/projects';
import { profile } from '../../data/profile';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
  }

  function handleLeave() {
    setTilt({ x: 0, y: 0 });
  }

  const projectUrl = project.link || profile.github;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.25s ease-out',
      }}
      className="group glass-panel rounded-3xl overflow-hidden flex flex-col justify-between hover:border-emerald-glow/45 hover:shadow-[0_16px_40px_-6px_rgba(15,23,42,0.08),0_0_24px_rgba(16,185,129,0.12)]"
    >
      <div>
        {/* Project Image Banner */}
        <div className="relative h-48 overflow-hidden rounded-t-3xl bg-slate-100">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover object-center transform group-hover:scale-108 transition-all duration-700 ease-out ${
              imgLoaded ? 'opacity-100' : 'opacity-0 scale-95'
            }`}
          />
          {/* Subtle Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />

          {/* Project Number Badge */}
          <span className="absolute top-3.5 left-3.5 font-mono text-xs text-slate-900 font-extrabold tracking-widest px-3 py-1 rounded-full bg-white/95 shadow-[0_2px_8px_rgba(0,0,0,0.15)] backdrop-blur-md">
            {project.number}
          </span>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className="font-display font-bold text-lg text-slate-900 mb-2 group-hover:text-emerald-light transition-colors duration-300 flex items-center justify-between">
            <span>{project.name}</span>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-5 min-h-[64px]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono font-semibold px-3 py-1 rounded-xl liquid-pill text-slate-700 hover:text-emerald-light hover:border-emerald-glow/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-slate-100 bg-slate-50/40">
        <span className="text-xs font-mono font-semibold text-slate-500 group-hover:text-emerald-light transition-colors flex items-center gap-1.5">
          <Sparkles size={12} className="text-emerald-light/70 opacity-0 group-hover:opacity-100 transition-opacity" />
          View Source / Demo
        </span>
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name}`}
          className="h-10 w-10 flex items-center justify-center rounded-2xl liquid-bubble text-slate-700 group-hover:text-emerald-light group-hover:scale-110"
        >
          <ArrowUpRight size={17} />
        </a>
      </div>
    </motion.div>
  );
}
