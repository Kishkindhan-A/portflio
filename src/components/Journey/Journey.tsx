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
      <Eyebrow>My journey</Eyebrow>
      <Reveal>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-12" style={{ color: 'var(--ink)' }}>
          Education &{' '}
          <span style={{ color: 'var(--accent)' }}>Experience</span>
        </h2>
      </Reveal>

      <div className="relative max-w-3xl">
        {/* Timeline line */}
        <div
          className="absolute left-[19px] top-4 bottom-4 w-px"
          style={{ background: 'var(--border)' }}
        />

        <div className="space-y-6">
          {journey.map((entry, i) => {
            const Icon = ICONS[entry.type];
            return (
              <Reveal key={entry.id} delay={i * 0.07}>
                <div className="relative flex gap-5 sm:gap-7 items-start">
                  {/* Icon dot */}
                  <div
                    className="relative z-10 h-10 w-10 shrink-0 rounded-lg flex items-center justify-center border"
                    style={{
                      background: 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Icon size={17} />
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 p-5 rounded-xl border transition-all duration-200"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hi)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className="font-display font-bold text-base" style={{ color: 'var(--ink)' }}>
                        {entry.title}
                      </h3>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-md shrink-0"
                        style={{ background: 'var(--accent-pale)', color: 'var(--accent)' }}
                      >
                        {entry.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-3" style={{ color: 'var(--ink-muted)' }}>
                      {entry.org}
                    </p>
                    <ul className="space-y-1.5">
                      {entry.points.map((point) => (
                        <li key={point} className="text-sm flex gap-2.5 leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
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
