import { useEffect, useRef } from 'react';

/**
 * Tracks normalized mouse position (-1 to 1) without triggering re-renders.
 * Consumers read `.current` inside animation loops (e.g. useFrame).
 */
export function useMousePosition() {
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      pos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return pos;
}
