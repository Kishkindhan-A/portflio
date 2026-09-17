import { Award } from 'lucide-react';
import { Section, Eyebrow, Reveal } from '../ui/Section';
import { certifications } from '../../data/education';

export function Certifications() {
  return (
    <Section id="certifications" className="!py-16">
      <Eyebrow>Certifications</Eyebrow>
      <Reveal>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl mb-10 text-slate-900">
          Learning &amp; <span className="text-emerald-light">Credentials</span>
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
        {certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 0.08}>
            <div className="glass-panel p-6 flex items-start gap-4 rounded-3xl hover:border-emerald-glow/45 hover:-translate-y-1 transition-all duration-300">
              <div className="h-11 w-11 shrink-0 rounded-2xl liquid-bubble flex items-center justify-center text-sky-accent shadow-[0_2px_10px_rgba(2,132,199,0.18)]">
                <Award size={20} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-sm sm:text-base">{cert.name}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{cert.issuer}</p>
                <span
                  className={`inline-block mt-3 text-[10px] font-mono font-bold px-3 py-1 rounded-full tracking-wider ${
                    cert.status === 'Ongoing'
                      ? 'border border-emerald-glow/40 text-emerald-light bg-emerald-glow/10'
                      : 'border border-slate-200 text-slate-700 bg-slate-100/90'
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
