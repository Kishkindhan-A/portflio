import { Section, Eyebrow, Reveal } from '../ui/Section';
import { skillGroups, techStack } from '../../data/skills';
import { languages } from '../../data/profile';

export function Skills() {
  return (
    <Section id="skills">
      <Eyebrow>My Tech Stack</Eyebrow>
      <Reveal>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4 text-slate-900">
          Tools &amp; <span className="text-emerald-light font-extrabold">Technologies</span>
        </h2>
        <p className="text-slate-600 max-w-xl mb-12 text-sm sm:text-base">
          Technologies I&apos;ve actually worked with, drawn from coursework, internships, and
          personal projects.
        </p>
      </Reveal>

      {/* scrolling tech strip with frosted glass backdrop */}
      <Reveal delay={0.05}>
        <div className="relative overflow-hidden py-4 mb-16 glass-panel rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
          <div className="flex gap-10 whitespace-nowrap animate-[scroll_28s_linear_infinite] hover:[animation-play-state:paused]">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="font-mono text-sm text-slate-700 px-2 flex items-center gap-2.5 shrink-0 font-semibold"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-glow shadow-[0_0_6px_#10B981]" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={0.05 * i}>
            <div className="glass-panel p-6 h-full rounded-3xl hover:border-emerald-glow/45 hover:-translate-y-1 transition-all duration-300">
              <p className="label-tag mb-5 font-bold text-emerald-light">{group.label}</p>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono font-semibold px-3.5 py-1.5 rounded-xl liquid-pill text-slate-700 hover:text-emerald-light hover:border-emerald-glow/50 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.05 * skillGroups.length}>
          <div className="glass-panel p-6 h-full rounded-3xl hover:border-emerald-glow/45 hover:-translate-y-1 transition-all duration-300">
            <p className="label-tag mb-5 font-bold text-emerald-light">Languages</p>
            <div className="space-y-3.5">
              {languages.map((lang) => (
                <div key={lang.name} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-slate-900 font-semibold">{lang.name}</span>
                  <span className="text-emerald-light text-xs font-mono font-bold px-2.5 py-1 rounded-lg liquid-pill">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
