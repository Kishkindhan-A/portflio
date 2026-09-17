import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { KALogo } from '../ui/KALogo';
import { profile } from '../../data/profile';

const NAV_ITEMS = [
  { id: 'home',           label: 'Home',    path: '/' },
  { id: 'about',          label: 'About',   path: '/about' },
  { id: 'skills',         label: 'Skills',  path: '/skills' },
  { id: 'projects',       label: 'Projects',path: '/projects' },
  { id: 'journey',        label: 'Journey', path: '/journey' },
  { id: 'certifications', label: 'Certs',   path: '/certifications' },
  { id: 'contact',        label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0,  opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 inset-x-0 mx-auto z-50 w-[94%] max-w-6xl pointer-events-auto"
    >
      <nav
        className={`flex items-center justify-between rounded-3xl border px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 border-slate-200/90 backdrop-blur-2xl shadow-[0_10px_30px_-5px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)]'
            : 'bg-white/75 border-slate-200/70 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(15,23,42,0.03)]'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="Go to home">
          <div className="transition-transform duration-300 group-hover:scale-105">
            <KALogo size={34} />
          </div>
          <span className="hidden sm:inline font-display font-bold tracking-wide text-sm text-slate-900 group-hover:text-emerald-light transition-colors">
            {profile.name.toUpperCase()}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 font-mono text-xs tracking-wider p-1 rounded-2xl bg-slate-100/70 border border-slate-200/60 backdrop-blur-md">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`relative px-3.5 py-1.5 rounded-xl uppercase transition-all duration-300 block font-medium ${
                  isActive(item.path)
                    ? 'text-emerald-light font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-xl -z-10"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(226, 232, 240, 0.95)',
                      boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Resume button */}
        <a
          href={profile.resumeUrl}
          download
          className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-slate-900 bg-slate-900 px-4 py-2 text-xs font-mono font-semibold tracking-wider text-white hover:bg-slate-800 hover:shadow-[0_4px_14px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300"
        >
          RESUME <Download size={13} />
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden h-10 w-10 flex items-center justify-center rounded-2xl liquid-bubble text-slate-700 hover:text-emerald-light"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{    opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2.5 rounded-3xl border border-slate-200/90 bg-white/96 backdrop-blur-2xl p-4 md:hidden shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
        >
          <ul className="flex flex-col gap-1.5 font-mono text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`w-full text-left px-4 py-3 rounded-2xl uppercase tracking-wider block transition-all ${
                    isActive(item.path)
                      ? 'text-emerald-light bg-emerald-glow/10 border border-emerald-glow/25 font-bold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <a
                href={profile.resumeUrl}
                download
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white text-sm font-mono font-semibold"
              >
                RESUME <Download size={14} />
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
