import { Github, Linkedin, Mail } from 'lucide-react';
import { KALogo } from '../ui/KALogo';
import { profile } from '../../data/profile';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-10" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <KALogo size={28} />
          <div>
            <p className="font-display font-bold text-sm" style={{ color: 'var(--ink)' }}>
              {profile.name}
            </p>
            <p className="text-xs" style={{ color: 'var(--ink-subtle)' }}>
              Full-Stack Developer & UI/UX Designer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[
            { icon: Github,   href: profile.github,            label: 'GitHub'   },
            { icon: Linkedin, href: profile.linkedin,          label: 'LinkedIn' },
            { icon: Mail,     href: `mailto:${profile.email}`, label: 'Email'    },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="h-9 w-9 flex items-center justify-center rounded-lg border transition-all duration-150"
              style={{ borderColor: 'var(--border)', color: 'var(--ink-muted)' }}
              onMouseEnter={e => {
                const t = e.currentTarget as HTMLElement;
                t.style.borderColor = 'var(--accent)';
                t.style.color = 'var(--accent)';
              }}
              onMouseLeave={e => {
                const t = e.currentTarget as HTMLElement;
                t.style.borderColor = 'var(--border)';
                t.style.color = 'var(--ink-muted)';
              }}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>

        <p className="text-xs" style={{ color: 'var(--ink-subtle)' }}>
          © {year} Kishkindhan A
        </p>
      </div>
    </footer>
  );
}
