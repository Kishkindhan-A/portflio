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
        <div className="relative overflow-hidden py-3.5 mb-16 glass-panel rounded-2xl shadow-sm border border-slate-200/70">
          <div className="flex gap-4 whitespace-nowrap animate-[scroll_28s_linear_infinite] hover:[animation-play-state:paused]">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="text-xs font-semibold text-slate-800 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/80 flex items-center gap-2 shrink-0 shadow-xs hover:border-emerald-300 transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
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
            <div className="glass-panel p-6 h-full rounded-3xl hover:border-emerald-300/80 hover:-translate-y-1 hover:shadow-md transition-all duration-300 border border-slate-200/70">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2.5">
                <h3 className="font-display font-bold text-sm text-slate-900 tracking-wide uppercase">{group.label}</h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">{group.items.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-50/90 text-slate-700 border border-slate-200/70 hover:border-emerald-300 hover:text-emerald-700 hover:bg-white transition-all shadow-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.05 * skillGroups.length}>
          <div className="glass-panel p-6 h-full rounded-3xl hover:border-emerald-300/80 hover:-translate-y-1 hover:shadow-md transition-all duration-300 border border-slate-200/70">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2.5">
              <h3 className="font-display font-bold text-sm text-slate-900 tracking-wide uppercase">Spoken Languages</h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">{languages.length}</span>
            </div>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.name} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-slate-900 font-semibold">{lang.name}</span>
                  <span className="text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/60">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
