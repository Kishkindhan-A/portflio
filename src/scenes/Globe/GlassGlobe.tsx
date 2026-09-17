import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';

/**
 * Procedurally-drawn Earth texture for luxury light mode.
 * Frosted crystal base with vivid emerald continents and crisp sky-blue grid lines.
 */
function useEarthTexture() {
  return useMemo(() => {
    const w = 2048;
    const h = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;

    // base: silky frosted crystal porcelain
    ctx.fillStyle = '#E8EEF5';
    ctx.fillRect(0, 0, w, h);

    // lat/long grid in crisp sky blue
    ctx.strokeStyle = 'rgba(2, 132, 199, 0.22)';
    ctx.lineWidth = 1.2;
    for (let i = 0; i <= 24; i++) {
      const x = (i / 24) * w;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let j = 0; j <= 12; j++) {
      const y = (j / 12) * h;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // simplified continent silhouettes in rich emerald green
    ctx.fillStyle = 'rgba(5, 150, 105, 0.95)';
    ctx.shadowColor = 'rgba(5, 150, 105, 0.35)';
    ctx.shadowBlur = 10;

    function blob(cx: number, cy: number, pts: [number, number][]) {
      ctx.beginPath();
      pts.forEach(([dx, dy], i) => {
        const x = cx + dx;
        const y = cy + dy;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
    }

    // Africa + Europe
    blob(1060, 430, [
      [-40, -140], [10, -160], [70, -130], [90, -60], [70, 20], [90, 100],
      [60, 200], [10, 230], [-30, 200], [-60, 120], [-70, 20], [-50, -60],
    ]);
    // Asia
    blob(1300, 330, [
      [-60, -120], [40, -160], [180, -120], [260, -60], [240, 30],
      [160, 60], [80, 20], [0, 60], [-80, 20], [-100, -60],
    ]);
    // North America
    blob(560, 320, [
      [-120, -110], [-20, -150], [90, -110], [130, -30], [90, 60],
      [20, 130], [-40, 100], [-100, 40], [-140, -40],
    ]);
    // South America
    blob(650, 620, [
      [-50, -80], [40, -100], [70, -20], [50, 100], [10, 170],
      [-30, 120], [-50, 30],
    ]);
    // Australia
    blob(1620, 650, [[-70, -40], [40, -50], [80, 0], [50, 40], [-40, 40], [-70, 0]]);
    // Antarctica strip
    ctx.fillRect(0, h - 40, w, 40);

    ctx.shadowBlur = 0;

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function EarthCore() {
  const earthTexture = useEarthTexture();
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.06;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group>
      {/* crystal glass sphere with continents */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.55, 64, 64]} />
        <meshPhysicalMaterial
          map={earthTexture}
          transparent
          opacity={0.96}
          roughness={0.12}
          metalness={0.05}
          transmission={0.45}
          thickness={0.7}
          ior={1.25}
          clearcoat={0.8}
          color="#ffffff"
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* atmosphere glow for light mode */}
      <mesh ref={atmosphereRef} scale={1.12}>
        <sphereGeometry args={[1.55, 48, 48]} />
        <meshBasicMaterial
          color="#10B981"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh scale={1.22}>
        <sphereGeometry args={[1.55, 48, 48]} />
        <meshBasicMaterial color="#0284C7" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function OrbitalRing({
  radius,
  tilt,
  speed,
  color,
  opacity = 0.35,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.007, 8, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function DataParticles({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.9 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.024} color="#059669" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function GlowNodes() {
  const nodes = useMemo(() => {
    return Array.from({ length: 6 }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.58;
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    });
  }, []);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial color="#059669" />
        </mesh>
      ))}
    </group>
  );
}

function FloatingPlatform() {
  return (
    <group position={[0, -2.05, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.5, 64]} />
        <meshBasicMaterial color="#059669" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.55, 1.62, 64]} />
        <meshBasicMaterial color="#0284C7" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color="#059669" intensity={2} distance={3} position={[0, 0.3, 0]} />
    </group>
  );
}

export function GlassGlobe() {
  const mouse = useMousePosition();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetY = mouse.current.x * 0.35;
    const targetX = mouse.current.y * -0.15;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.9} />
      <pointLight position={[4, 3, 4]} intensity={2.2} color="#0284C7" />
      <pointLight position={[-4, -2, -3]} intensity={1.6} color="#059669" />
      <pointLight position={[0, 4, 3]} intensity={1.5} color="#ffffff" />

      <EarthCore />
      <OrbitalRing radius={2.05} tilt={[Math.PI / 2.4, 0.3, 0]} speed={0.12} color="#059669" opacity={0.4} />
      <OrbitalRing radius={2.3} tilt={[Math.PI / 1.8, -0.4, 0.2]} speed={-0.08} color="#0284C7" opacity={0.35} />
      <DataParticles />
      <GlowNodes />
      <FloatingPlatform />
    </group>
  );
}
