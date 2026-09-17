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
      <Eyebrow>About Me</Eyebrow>
      <Reveal>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-14 max-w-2xl text-slate-900">
          {profile.aboutHeading[0]}{' '}
          <span className="bg-gradient-to-r from-slate-900 via-emerald-light to-sky-accent bg-clip-text text-transparent">
            {profile.aboutHeading[1]}
          </span>
        </h2>
      </Reveal>

      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-start">
        {/* LEFT: bio + info panel */}
        <Reveal delay={0.05} className="space-y-6">
          <p className="text-slate-600 leading-relaxed text-base">{profile.aboutBody}</p>

          <div className="glass-panel p-6 space-y-3.5 rounded-3xl shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            {profile.aboutInfo.map((row) => (
              <div
                key={row.label}
                className="flex justify-between gap-4 text-sm border-b border-slate-100 pb-2.5 last:border-0 last:pb-0"
              >
                <span className="text-slate-500 font-mono text-xs uppercase tracking-wider font-semibold">
                  {row.label}
                </span>
                <span className="text-slate-900 font-semibold text-right">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Button href={profile.resumeUrl} target="_blank" icon={<Download size={15} />}>
              DOWNLOAD RESUME
            </Button>
          </div>
        </Reveal>

        {/* CENTER: portrait (Luxury Architectural Frame) */}
        <Reveal delay={0.15} className="mx-auto">
          <Portrait />
        </Reveal>

        {/* RIGHT: capabilities */}
        <Reveal delay={0.25}>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-5">Areas of Specialization</p>
          <div className="space-y-3.5">
            {profile.capabilities.map((cap) => {
              const Icon = ICONS[cap.icon] ?? Code2;
              return (
                <div
                  key={cap.title}
                  className="glass-panel p-4 sm:p-5 flex items-start gap-4 rounded-3xl hover:-translate-y-1 hover:border-emerald-glow/45 transition-all duration-300"
                >
                  <div className="h-11 w-11 shrink-0 rounded-2xl liquid-bubble flex items-center justify-center text-emerald-light">
                    <Icon size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{cap.title}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-normal">{cap.desc}</p>
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
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-64 sm:w-72"
    >
      <div className="relative rounded-3xl overflow-hidden glass-panel-strong p-2.5 shadow-[0_16px_40px_-8px_rgba(15,23,42,0.08)]">
        <div className="relative rounded-2xl overflow-hidden bg-slate-100">
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
      </div>

      <div className="mt-3.5 glass-panel px-4 py-3.5 text-center rounded-2xl border border-slate-200/80 shadow-sm">
        <p className="font-display text-sm font-bold text-slate-900">{profile.name}</p>
        <p className="text-xs text-slate-500 mt-0.5 font-medium">
          Full-Stack Developer &amp; UI/UX Designer
        </p>
      </div>
    </motion.div>
  );
}
