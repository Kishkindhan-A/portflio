/**
 * Simple, clean background — no gimmicks.
 * A very subtle warm-white with a faint noise grain texture for depth.
 */
export function CyberBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'var(--bg)' }}
    />
  );
}
