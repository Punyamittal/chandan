/**
 * Scroll-Driven 3D Card Transformation
 * Wedding Invitation → Envelope → Rotation → Business Card
 */

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useTransform, motion, useMotionValue } from 'framer-motion';
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Text3D,
  Center,
} from '@react-three/drei';
import * as THREE from 'three';

// Phase breakpoints (in vh)
const PHASE_1_END = 200; // Wedding card visible
const PHASE_2_END = 400; // Card folding into envelope
const PHASE_3_END = 600; // Envelope rotating
const PHASE_4_END = 800; // Business card reveal

interface Card3DProps {
  scrollProgress: number;
}

/**
 * Wedding Card Component (Phase 1)
 */
function WeddingCard({ scrollProgress }: Card3DProps) {
  const meshRef = useRef<THREE.Group>(null);

  // Card fold animation (0 = open, 1 = closed)
  const foldAmount = Math.min(Math.max((scrollProgress - 0.2) / 0.2, 0), 1);
  
  // Fade out as it goes into envelope
  const opacity = 1 - Math.min(Math.max((scrollProgress - 0.35) / 0.1, 0), 1);

  useFrame((state) => {
    if (meshRef.current && scrollProgress < 0.4) {
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  if (scrollProgress > 0.5) return null;

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Left panel of card */}
      <mesh
        position={[-1.5 * (1 - foldAmount * 0.5), 0, 0]}
        rotation={[0, foldAmount * Math.PI * 0.5, 0]}
      >
        <boxGeometry args={[3, 4, 0.02]} />
        <meshStandardMaterial
          color="#fef3c7"
          roughness={0.3}
          metalness={0.1}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Right panel of card */}
      <mesh
        position={[1.5 * (1 - foldAmount * 0.5), 0, 0]}
        rotation={[0, -foldAmount * Math.PI * 0.5, 0]}
      >
        <boxGeometry args={[3, 4, 0.02]} />
        <meshStandardMaterial
          color="#fef3c7"
          roughness={0.3}
          metalness={0.1}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Gold trim accents */}
      {!foldAmount && (
        <>
          <mesh position={[0, 1.95, 0.015]}>
            <boxGeometry args={[5.8, 0.1, 0.01]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, -1.95, 0.015]}>
            <boxGeometry args={[5.8, 0.1, 0.01]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
          </mesh>
        </>
      )}

      {/* Wedding text (simplified - using 3D text would require font loading) */}
      <Center position={[0, 0, 0.02]}>
        <Text3D
          font="/fonts/playfair-display.json"
          size={0.4}
          height={0.02}
          curveSegments={12}
        >
          You're Invited
          <meshStandardMaterial color="#92400e" metalness={0.3} roughness={0.4} />
        </Text3D>
      </Center>
    </group>
  );
}

/**
 * Envelope Component (Phase 2-3)
 */
function Envelope({ scrollProgress }: Card3DProps) {
  const meshRef = useRef<THREE.Group>(null);

  // Envelope appears after card folds
  const envelopeProgress = Math.min(Math.max((scrollProgress - 0.4) / 0.2, 0), 1);
  
  // Rotation phase
  const rotationProgress = Math.min(Math.max((scrollProgress - 0.5) / 0.25, 0), 1);
  
  // Dissolve phase
  const dissolveProgress = Math.min(Math.max((scrollProgress - 0.75) / 0.1, 0), 1);
  const opacity = 1 - dissolveProgress;

  useFrame(() => {
    if (meshRef.current) {
      // Smooth rotation during phase 3
      meshRef.current.rotation.y = rotationProgress * Math.PI * 2;
    }
  });

  if (scrollProgress < 0.4 || scrollProgress > 0.85) return null;

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Envelope body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 2.8, 0.05]} />
        <meshStandardMaterial
          color="#e5e7eb"
          roughness={0.6}
          metalness={0.1}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Envelope flap */}
      <mesh
        position={[0, 1.4, 0.03]}
        rotation={[envelopeProgress * Math.PI * 0.2, 0, 0]}
      >
        <boxGeometry args={[4, 1.4, 0.03]} />
        <meshStandardMaterial
          color="#d1d5db"
          roughness={0.6}
          metalness={0.1}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Wax seal (visible on back during rotation) */}
      {rotationProgress > 0.4 && (
        <mesh position={[0, 0.5, -0.03]} rotation={[Math.PI, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
          <meshStandardMaterial
            color="#dc2626"
            roughness={0.3}
            metalness={0.6}
            transparent
            opacity={opacity}
          />
        </mesh>
      )}
    </group>
  );
}

/**
 * Business Card Component (Phase 4)
 */
function BusinessCard({ scrollProgress }: Card3DProps) {
  const meshRef = useRef<THREE.Group>(null);

  // Card slides out and scales
  const revealProgress = Math.min(Math.max((scrollProgress - 0.75) / 0.15, 0), 1);
  
  // Final positioning (top-right corner)
  const finalPositionProgress = Math.min(Math.max((scrollProgress - 0.9) / 0.1, 0), 1);

  const scale = 0.5 + (1 - finalPositionProgress) * 0.5;
  const posX = finalPositionProgress * 4;
  const posY = finalPositionProgress * 3;

  useFrame((state) => {
    if (meshRef.current && finalPositionProgress < 1) {
      // Subtle tilt animation
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  if (scrollProgress < 0.75) return null;

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.3}
      enabled={finalPositionProgress === 1}
    >
      <group
        ref={meshRef}
        position={[posX, posY, 0]}
        scale={scale}
        rotation={[0, 0, 0]}
      >
        {/* Business card front */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.5, 2, 0.02]} />
          <meshStandardMaterial
            color="white"
            roughness={0.2}
            metalness={0.3}
            opacity={revealProgress}
            transparent
          />
        </mesh>

        {/* Orange accent strip */}
        <mesh position={[0, 0.8, 0.015]}>
          <boxGeometry args={[3.5, 0.4, 0.01]} />
          <meshStandardMaterial
            color="#ea580c"
            metalness={0.5}
            roughness={0.3}
            opacity={revealProgress}
            transparent
          />
        </mesh>

        {/* Gold border */}
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[3.4, 1.9, 0.005]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.8}
            roughness={0.2}
            wireframe
            opacity={revealProgress}
            transparent
          />
        </mesh>
      </group>
    </Float>
  );
}

/**
 * Main 3D Scene
 */
function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={0.5} />
      
      {/* Environment */}
      <Environment preset="studio" />
      
      {/* 3D Card Components */}
      <WeddingCard scrollProgress={scrollProgress} />
      <Envelope scrollProgress={scrollProgress} />
      <BusinessCard scrollProgress={scrollProgress} />
      
      {/* Shadows */}
      <ContactShadows
        position={[0, -3, 0]}
        opacity={0.4}
        scale={15}
        blur={2}
        far={4}
      />
    </>
  );
}

/**
 * Main Export Component
 */
export default function ScrollDriven3DCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Convert scroll progress to 0-1 range
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const progressValue = useMotionValue(0);

  // Update progress value
  scrollProgress.on('change', (latest) => {
    progressValue.set(latest);
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: '800vh' }} // 8x viewport height for scroll space
    >
      {/* Sticky 3D Canvas Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <Canvas shadows dpr={[1, 2]}>
          <Scene scrollProgress={progressValue.get()} />
        </Canvas>
      </div>

      {/* Scroll Progress Indicator (for debugging) */}
      <motion.div
        className="fixed bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-lg font-mono text-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Scroll: {Math.round(progressValue.get() * 100)}%
      </motion.div>
    </div>
  );
}

