import { GraduationCap, Briefcase } from 'lucide-react';
import { Section, Eyebrow, Reveal } from '../ui/Section';
import { journey } from '../../data/experience';

const ICONS = {
  education: GraduationCap,
  internship: Briefcase,
  project: Briefcase,
};

export function Journey() {
  return (
    <Section id="journey">
      <Eyebrow>My Journey</Eyebrow>
      <Reveal>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-14 text-slate-900">
          Education &amp; <span className="text-emerald-light">Experience</span>
        </h2>
      </Reveal>

      <div className="relative max-w-3xl">
        <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-glow/50 via-sky-accent/40 to-transparent" />

        <div className="space-y-8">
          {journey.map((entry, i) => {
            const Icon = ICONS[entry.type];
            return (
              <Reveal key={entry.id} delay={i * 0.08}>
                <div className="relative flex gap-6 sm:gap-8 items-start">
                  <div className="relative z-10 h-11 w-11 shrink-0 rounded-2xl liquid-bubble flex items-center justify-center text-emerald-light shadow-[0_2px_10px_rgba(16,185,129,0.2)]">
                    <Icon size={18} />
                  </div>
                  <div className="glass-panel p-6 flex-1 rounded-3xl hover:border-emerald-glow/45 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-display font-bold text-base sm:text-lg text-slate-900">{entry.title}</h3>
                      <span className="text-xs font-mono font-bold text-emerald-light px-2.5 py-0.5 rounded-full liquid-pill">{entry.period}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-500 mb-4">{entry.org}</p>
                    <ul className="space-y-2">
                      {entry.points.map((point) => (
                        <li key={point} className="text-sm text-slate-600 flex gap-2.5 leading-relaxed">
                          <span className="text-emerald-light mt-1 font-mono text-xs">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
