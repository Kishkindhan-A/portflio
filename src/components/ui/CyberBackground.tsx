import { useEffect, useRef } from 'react';

/**
 * Ambient canvas background for luxury light mode:
 * Crisp porcelain white base, faint architectural slate grid, and soft drifting emerald/sky motes.
 */
export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width  = (canvas.width  = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = Math.min(45, Math.floor((width * height) / 32000));

    // Mix of emerald and sky particles
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      x:     Math.random() * width,
      y:     Math.random() * height,
      r:     Math.random() * 1.4 + 0.5,
      vx:    (Math.random() - 0.5) * 0.12,
      vy:    (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.28 + 0.12,
      // ~60% emerald, ~40% sky
      emerald: i % 5 !== 0,
    }));

    function resize() {
      if (!canvas) return;
      width  = canvas.width  = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);

    let raf = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Delicate architectural slate grid
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 64;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Floating particles
      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0)  p.x = width;
          if (p.x > width)  p.x = 0;
          if (p.y < 0)  p.y = height;
          if (p.y > height) p.y = 0;
        }
        // Deep emerald: rgb(5, 150, 105)  Sky: rgb(2, 132, 199)
        const [r, g, b] = p.emerald ? [5, 150, 105] : [2, 132, 199];
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#FAFCFF' }}>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Luminous ambient aura orbs for depth on light canvas */}
      <div
        className="absolute -top-40 -left-40 h-[650px] w-[650px] rounded-full opacity-60 blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.09) 0%, rgba(250, 252, 255, 0) 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full opacity-60 blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(2, 132, 199, 0.08) 0%, rgba(250, 252, 255, 0) 70%)' }}
      />
      <div
        className="absolute bottom-10 left-1/4 h-[500px] w-[500px] rounded-full opacity-50 blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, rgba(250, 252, 255, 0) 70%)' }}
      />
    </div>
  );
}
