import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { GlobeCanvas } from '../../scenes/Globe/GlobeCanvas';
import { Button } from '../ui/Button';
import { profile } from '../../data/profile';

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit', minute: '2-digit', hour12: true,
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section id="home" className="relative min-h-[calc(100vh-5.5rem)] pt-10 pb-20 flex items-center">
      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">

          {/* LEFT: content */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-20">

            {/* Availability */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                Available for internships & developer roles
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={fadeUp} className="text-base mb-1" style={{ color: 'var(--ink-muted)' }}>
              Hey, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight mb-3"
              style={{ color: 'var(--ink)', lineHeight: '1.05' }}
            >
              {profile.firstName}
              <span className="block" style={{ color: 'var(--accent)' }}>A.</span>
            </motion.h1>

            {/* Roles */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
              {profile.roles.map((role) => (
                <span key={role} className="tag">{role}</span>
              ))}
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="leading-relaxed max-w-lg mb-8 text-base"
              style={{ color: 'var(--ink-muted)' }}
            >
              {profile.heroIntro}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-10">
              <Button to="/projects" icon={<ArrowRight size={15} />}>
                View Projects
              </Button>
              <Button to="/contact" variant="ghost">
                Get in touch
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp}>
              <p className="text-xs mb-3" style={{ color: 'var(--ink-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Find me on</p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Github,   href: profile.github,               label: 'GitHub'   },
                  { icon: Linkedin, href: profile.linkedin,             label: 'LinkedIn' },
                  { icon: Mail,     href: `mailto:${profile.email}`,    label: 'Email'    },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="h-10 w-10 flex items-center justify-center rounded-lg border transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--ink-muted)',
                    }}
                    onMouseEnter={e => {
                      const t = e.currentTarget;
                      t.style.borderColor = 'var(--accent)';
                      t.style.color = 'var(--accent)';
                    }}
                    onMouseLeave={e => {
                      const t = e.currentTarget;
                      t.style.borderColor = 'var(--border)';
                      t.style.color = 'var(--ink-muted)';
                    }}
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-xl">
              {profile.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl p-4 text-center"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <p className="font-display font-extrabold text-2xl" style={{ color: 'var(--ink)' }}>
                    {m.value}
                  </p>
                  <p className="text-[11px] mt-0.5 font-medium uppercase tracking-wider" style={{ color: 'var(--ink-subtle)' }}>
                    {m.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: globe + info card */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlobeCanvas />
            </motion.div>

            {/* Small info card */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="hidden md:block absolute top-6 right-0 px-5 py-4 rounded-xl space-y-2.5 min-w-[175px]"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 16px rgba(26,26,24,0.06)',
              }}
            >
              {[
                { label: 'Location', value: 'India 🇮🇳' },
                { label: 'Local time', value: <LiveClock /> },
                { label: 'Status', value: 'Open to work', green: true },
                { label: 'Focus', value: 'UI/UX & IoT' },
              ].map(({ label, value, green }) => (
                <div key={label} className="flex items-center justify-between gap-3 text-xs">
                  <span style={{ color: 'var(--ink-subtle)', fontWeight: 500 }}>{label}</span>
                  <span style={{ color: green ? 'var(--accent)' : 'var(--ink)', fontWeight: 600 }}>
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
