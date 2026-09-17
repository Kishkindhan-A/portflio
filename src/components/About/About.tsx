import { motion } from 'framer-motion';
import { BrainCircuit, Code2, Cpu, Download, PenTool, Puzzle } from 'lucide-react';
import { Section, Eyebrow, Reveal } from '../ui/Section';
import { Button } from '../ui/Button';
import { profile } from '../../data/profile';

const ICONS: Record<string, typeof BrainCircuit> = {
  BrainCircuit,
  Code2,
  PenTool,
  Puzzle,
  Cpu,
};

export function About() {
  return (
    <Section id="about">
      <Eyebrow>About me</Eyebrow>
      <Reveal>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-12 max-w-2xl" style={{ color: 'var(--ink)' }}>
          {profile.aboutHeading[0]}{' '}
          <span style={{ color: 'var(--accent)' }}>
            {profile.aboutHeading[1]}
          </span>
        </h2>
      </Reveal>

      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-start">
        {/* LEFT: bio + info table */}
        <Reveal delay={0.05} className="space-y-6">
          <p className="leading-relaxed text-base" style={{ color: 'var(--ink-muted)' }}>
            {profile.aboutBody}
          </p>

          <div className="rounded-xl border p-5 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            {profile.aboutInfo.map((row) => (
              <div
                key={row.label}
                className="flex justify-between gap-4 text-sm border-b pb-2.5 last:border-0 last:pb-0"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="font-medium text-xs uppercase tracking-wider" style={{ color: 'var(--ink-subtle)' }}>
                  {row.label}
                </span>
                <span className="font-semibold text-right" style={{ color: 'var(--ink)', maxWidth: '60%' }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-1">
            <Button href={profile.resumeUrl} target="_blank" icon={<Download size={15} />}>
              Download Resume
            </Button>
          </div>
        </Reveal>

        {/* CENTER: portrait */}
        <Reveal delay={0.15} className="mx-auto">
          <Portrait />
        </Reveal>

        {/* RIGHT: capabilities */}
        <Reveal delay={0.25}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--ink-subtle)' }}>
            What I do
          </p>
          <div className="space-y-3">
            {profile.capabilities.map((cap) => {
              const Icon = ICONS[cap.icon] ?? Code2;
              return (
                <div
                  key={cap.title}
                  className="flex items-start gap-3.5 p-4 rounded-xl border transition-all duration-200"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(45,122,79,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div className="icon-wrap h-9 w-9 shrink-0 mt-0.5" style={{ borderRadius: 8 }}>
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--ink)' }}>{cap.title}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--ink-subtle)' }}>{cap.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Portrait() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-60 sm:w-64"
    >
      <div
        className="relative rounded-2xl overflow-hidden p-1.5"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(26,26,24,0.08)' }}
      >
        <div className="relative rounded-xl overflow-hidden" style={{ background: '#E8E8E3' }}>
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
      </div>

      <div
        className="mt-2.5 px-4 py-3 text-center rounded-xl border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <p className="font-display text-sm font-bold" style={{ color: 'var(--ink)' }}>{profile.name}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--ink-subtle)' }}>
          Full-Stack Developer & UI/UX Designer
        </p>
      </div>
    </motion.div>
  );
}
