/**
 * 3D Particle System with Three.js
 * Interactive particle field with scroll and hover effects
 */

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, Suspense } from 'react';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';
import { Theme } from '@/lib/themes';

interface ParticleSystemProps {
  count?: number;
  theme: Theme;
}

function ParticleSystem({ count = 1000, theme }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { scrollY } = useScroll();

  // Generate particle positions
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const color1 = new THREE.Color(theme.colors.primary);
    const color2 = new THREE.Color(theme.colors.accent);
    
    for (let i = 0; i < count; i++) {
      // Random sphere distribution
      const radius = 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Gradient colors
      const mixFactor = Math.random();
      const color = color1.clone().lerp(color2, mixFactor);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, [count, theme]);

  // Animation loop
  useFrame((state) => {
    if (pointsRef.current) {
      // Rotate based on time
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
      
      // Scroll interaction
      pointsRef.current.rotation.z = scrollY.get() * 0.0005;
      
      // Gentle pulsing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      pointsRef.current.scale.setScalar(scale);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface Particles3DProps {
  theme: Theme;
  count?: number;
  className?: string;
}

export default function Particles3D({ theme, count = 1000, className = '' }: Particles3DProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ParticleSystem count={count} theme={theme} />
        </Suspense>
      </Canvas>
    </div>
  );
}

