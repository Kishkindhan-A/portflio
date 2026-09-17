import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { GlassGlobe } from './GlassGlobe';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function GlobeFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 rounded-full border border-emerald-glow/30 animate-pulse-slow" />
    </div>
  );
}

export function GlobeCanvas() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative h-[360px] sm:h-[440px] lg:h-[560px] w-full">
      <Suspense fallback={<GlobeFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5.4], fov: 42 }}
          dpr={[1, reducedMotion ? 1 : 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <GlassGlobe />
        </Canvas>
      </Suspense>
      {/* soft floor glow beneath the canvas for cinematic grounding */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-emerald-glow/12 blur-3xl" />
    </div>
  );
}
