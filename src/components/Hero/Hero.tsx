import { useEffect, useState, type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, MousePointer2, Sparkles } from 'lucide-react';
import { GlobeCanvas } from '../../scenes/Globe/GlobeCanvas';
import { Button } from '../ui/Button';
import { profile } from '../../data/profile';

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{time}</span>;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section id="home" className="relative min-h-[calc(100vh-6rem)] pt-8 pb-16 flex items-center">
      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* LEFT: content */}
          <motion.div variants={container} initial="hidden" animate="show" className="relative z-20">

            {/* Online badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full liquid-pill mb-6"
              style={{ boxShadow: '0 2px 12px rgba(16,185,129,0.12)' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-glow opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-glow"
                      style={{ boxShadow: '0 0 8px #10B981' }} />
              </span>
              <span className="text-xs font-mono tracking-widest text-emerald-light font-bold">
                SYSTEM ONLINE
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={item} className="text-slate-600 text-lg font-body mb-1.5 flex items-center gap-2 font-medium">
              Hi, I&apos;m <Sparkles size={16} className="text-emerald-light animate-pulse-slow" />
            </motion.p>

            {/* Name — high contrast luxury dark slate to emerald/sky gradient */}
            <motion.h1
              variants={item}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight bg-clip-text text-transparent glow-text mb-4"
              style={{
                backgroundImage: 'linear-gradient(135deg, #0F172A 40%, #059669 85%, #0284C7 100%)',
              }}
            >
              {profile.name}
            </motion.h1>

            {/* Roles — emerald accent */}
            <motion.p
              variants={item}
              className="font-mono text-sm sm:text-base tracking-wide mb-5 font-semibold text-emerald-light"
            >
              {profile.roles.join(' | ')}
            </motion.p>

            {/* Bio */}
            <motion.p variants={item} className="text-slate-600 leading-relaxed max-w-lg mb-8 text-sm sm:text-base font-normal">
              {profile.heroIntro}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-10 relative z-30">
              <Button to="/projects" icon={<ArrowRight size={15} />}>
                VIEW PROJECTS
              </Button>
              <Button to="/contact" variant="ghost">
                CONTACT ME
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="relative z-30">
              <p className="label-tag mb-3 text-[11px]">Find Me On</p>
              <div className="flex items-center gap-3.5">
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
                    className="h-11 w-11 flex items-center justify-center rounded-2xl liquid-bubble text-slate-700 hover:text-emerald-light"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Metric widgets */}
            <motion.div
              variants={item}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 max-w-xl"
            >
              {profile.metrics.map((m) => (
                <div
                  key={m.label}
                  className="glass-panel px-4 py-3.5 text-center hover:scale-[1.03] transition-transform duration-300"
                >
                  <p className="font-display font-bold text-xl sm:text-2xl text-emerald-light">
                    {m.value}
                  </p>
                  <p className="label-tag mt-1 text-[10px]">{m.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: globe + HUD */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlobeCanvas />
            </motion.div>

            {/* HUD panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="hidden md:block absolute top-4 right-0 glass-panel-strong px-5 py-4 space-y-3.5 min-w-[145px] rounded-3xl"
            >
              <HudRow label="Status"   value={profile.hud.status}   valueClass="text-emerald-light font-bold" />
              <HudRow label="Network"  value={profile.hud.network}  valueClass="text-emerald-light font-bold" />
              <HudRow label="Location" value={profile.hud.location} />
              <HudRow label="Time"     value={<LiveClock />} />
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="hidden md:flex absolute bottom-4 right-2 flex-col items-center gap-1.5 text-slate-400"
            >
              <span className="label-tag text-[9px]">Scroll</span>
              <div className="h-8 w-5 rounded-full border border-slate-300 flex items-start justify-center p-1 backdrop-blur-sm">
                <MousePointer2 size={10} className="animate-pulse-slow text-emerald-light" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HudRow({
  label,
  value,
  valueClass = 'text-slate-800 font-medium',
}: {
  label: string;
  value: ReactNode;
  valueClass?: string;
}) {
  return (
    <div>
      <p className="label-tag text-[9px] text-slate-400 mb-0.5">{label}</p>
      <p className={`font-mono text-xs ${valueClass}`}>{value}</p>
    </div>
  );
}
