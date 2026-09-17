import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24); }
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
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0,  opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <nav
        className="flex items-center justify-between px-5 sm:px-8 lg:px-10 py-3.5 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(248,248,245,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="Home">
          <div className="transition-transform duration-200 group-hover:scale-105">
            <KALogo size={32} />
          </div>
          <span
            className="hidden sm:inline font-display font-bold text-sm"
            style={{ color: 'var(--ink)' }}
          >
            {profile.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className="relative px-3 py-1.5 rounded-md block font-medium transition-colors duration-150"
                style={{
                  color: isActive(item.path) ? 'var(--accent)' : 'var(--ink-muted)',
                }}
                onMouseEnter={e => {
                  if (!isActive(item.path)) (e.currentTarget as HTMLElement).style.color = 'var(--ink)';
                }}
                onMouseLeave={e => {
                  if (!isActive(item.path)) (e.currentTarget as HTMLElement).style.color = 'var(--ink-muted)';
                }}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-md"
                    style={{ background: 'var(--accent-pale)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
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
          className="hidden sm:inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-px"
          style={{
            background: 'var(--ink)',
            borderColor: 'var(--ink)',
            color: '#fff',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = '#333';
            (e.currentTarget as HTMLElement).style.borderColor = '#333';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--ink)';
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--ink)';
          }}
        >
          Resume
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg border transition-colors duration-150"
          style={{ borderColor: 'var(--border)', color: 'var(--ink-muted)' }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden mx-4 mt-1 rounded-xl border p-4 shadow-sm"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <ul className="flex flex-col gap-1 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="block px-4 py-2.5 rounded-lg font-medium transition-colors"
                    style={{
                      color: isActive(item.path) ? 'var(--accent)' : 'var(--ink-muted)',
                      background: isActive(item.path) ? 'var(--accent-pale)' : 'transparent',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1 border-t mt-1" style={{ borderColor: 'var(--border)' }}>
                <a
                  href={profile.resumeUrl}
                  download
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
                  style={{ background: 'var(--ink)', color: '#fff' }}
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
