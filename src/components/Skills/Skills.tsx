import { Section, Eyebrow, Reveal } from '../ui/Section';
import { skillGroups, techStack } from '../../data/skills';
import { languages } from '../../data/profile';

export function Skills() {
  return (
    <Section id="skills">
      <Eyebrow>Skills</Eyebrow>
      <Reveal>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ color: 'var(--ink)' }}>
          Tools &{' '}
          <span style={{ color: 'var(--accent)' }}>Technologies</span>
        </h2>
        <p className="max-w-xl mb-12 text-base" style={{ color: 'var(--ink-muted)' }}>
          Technologies I've actually used — from coursework, internships, and personal projects.
        </p>
      </Reveal>

      {/* Scrolling tech strip */}
      <Reveal delay={0.05}>
        <div
          className="relative overflow-hidden rounded-xl py-3 mb-14 border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="flex gap-3 whitespace-nowrap" style={{ animation: 'scrollTape 28s linear infinite' }}>
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="text-xs font-medium shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md border"
                style={{
                  background: 'var(--bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--ink-muted)',
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: 'var(--accent)' }}
                />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={0.05 * i}>
            <div
              className="p-5 h-full rounded-xl border transition-all duration-200"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              }}
            >
              <div
                className="flex items-center justify-between mb-4 pb-2.5 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <h3 className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>
                  {group.label}
                </h3>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: 'var(--accent-pale)', color: 'var(--accent)', fontFamily: 'monospace' }}
                >
                  {group.items.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        {/* Spoken Languages */}
        <Reveal delay={0.05 * skillGroups.length}>
          <div
            className="p-5 h-full rounded-xl border"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div
              className="flex items-center justify-between mb-4 pb-2.5 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <h3 className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>
                Spoken Languages
              </h3>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded"
                style={{ background: 'var(--accent-pale)', color: 'var(--accent)', fontFamily: 'monospace' }}
              >
                {languages.length}
              </span>
            </div>
            <div className="space-y-2.5">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex justify-between items-center text-sm pb-2 border-b last:border-0 last:pb-0"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <span className="font-semibold" style={{ color: 'var(--ink)' }}>{lang.name}</span>
                  <span
                    className="text-xs font-medium px-2.5 py-0.5 rounded-md"
                    style={{ background: 'var(--accent-pale)', color: 'var(--accent)' }}
                  >
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
