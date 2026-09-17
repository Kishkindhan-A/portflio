import { Award } from 'lucide-react';
import { Section, Eyebrow, Reveal } from '../ui/Section';
import { certifications } from '../../data/education';

export function Certifications() {
  return (
    <Section id="certifications" className="!py-16">
      <Eyebrow>Certifications</Eyebrow>
      <Reveal>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl mb-10" style={{ color: 'var(--ink)' }}>
          Learning <span style={{ color: 'var(--accent)' }}>Credentials</span>
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
        {certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 0.08}>
            <div
              className="p-6 flex items-start gap-4 rounded-xl border transition-all duration-200"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              }}
            >
              <div
                className="h-11 w-11 shrink-0 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--bg)', color: 'var(--accent)' }}
              >
                <Award size={20} />
              </div>
              <div className="flex-1">
                <p className="font-bold" style={{ color: 'var(--ink)' }}>
                  {cert.name}
                </p>
                <p className="text-xs font-medium mt-1" style={{ color: 'var(--ink-muted)' }}>
                  {cert.issuer}
                </p>
                <span
                  className={`inline-block mt-3 text-[10px] font-mono font-bold px-3 py-1 rounded-full tracking-wider ${
                    cert.status === 'Ongoing'
                      ? 'border border-emerald-pale text-emerald-dark bg-emerald-pale/10'
                      : 'border border-slate-300 text-slate-700 bg-slate-100/90'
                  }`}
                >
                  {cert.status.toUpperCase()}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
