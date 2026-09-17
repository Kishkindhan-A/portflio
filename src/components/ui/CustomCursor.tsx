import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;
    setEnabled(true);

    let ringX = 0;
    let ringY = 0;
    let targetX = 0;
    let targetY = 0;

    function handleMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${targetX}px`;
        dotRef.current.style.top = `${targetY}px`;
      }

      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('a, button, [role="button"], input, textarea');
      if (ringRef.current) {
        ringRef.current.style.width = isInteractive ? '48px' : '32px';
        ringRef.current.style.height = isInteractive ? '48px' : '32px';
        ringRef.current.style.opacity = isInteractive ? '0.9' : '0.5';
      }
      if (dotRef.current) {
        dotRef.current.style.background = isInteractive ? '#38BDF8' : '#22C55E';
      }
    }

    let raf = 0;
    function animateRing() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(animateRing);
    }

    window.addEventListener('mousemove', handleMove, { passive: true });
    animateRing();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
