import { Github, Linkedin, Mail } from 'lucide-react';
import { KALogo } from '../ui/KALogo';
import { profile } from '../../data/profile';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200/80 py-12 bg-white/70 backdrop-blur-xl">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <KALogo size={30} />
          <div>
            <p className="font-display font-bold text-sm text-slate-900">
              {profile.name.toUpperCase()}
            </p>
            <p className="text-[11px] font-mono tracking-widest text-slate-400">
              BUILDING WITH CODE &amp; CREATIVITY
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: profile.github, label: 'GitHub' },
            { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="h-10 w-10 flex items-center justify-center rounded-2xl liquid-bubble text-slate-700 hover:text-emerald-light"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <p className="text-xs text-slate-400 font-mono">© {year} Kishkindhan A</p>
      </div>
    </footer>
  );
}
