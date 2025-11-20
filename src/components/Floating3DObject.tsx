/**
 * 3D Floating Object Component using React Three Fiber
 * Premium 3D elements with scroll and hover interactions
 */

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

interface FloatingShapeProps {
  type?: 'sphere' | 'box' | 'torus';
  scrollFactor?: number;
}

function FloatingShape({ type = 'sphere', scrollFactor = 0.5 }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollY } = useScroll();

  useFrame((state) => {
    if (meshRef.current) {
      // Scroll-based rotation
      meshRef.current.rotation.x = scrollY.get() * scrollFactor * 0.001;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      // Gentle floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  const renderShape = () => {
    const material = (
      <MeshDistortMaterial
        color="#D6814F"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.3}
        metalness={0.8}
      />
    );

    switch (type) {
      case 'box':
        return (
          <Box ref={meshRef} args={[1.5, 1.5, 1.5]}>
            {material}
          </Box>
        );
      case 'torus':
        return (
          <Torus ref={meshRef} args={[1, 0.4, 16, 32]}>
            {material}
          </Torus>
        );
      default:
        return (
          <Sphere ref={meshRef} args={[1.2, 64, 64]}>
            {material}
          </Sphere>
        );
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
      {renderShape()}
    </Float>
  );
}

interface Floating3DObjectProps {
  type?: 'sphere' | 'box' | 'torus';
  className?: string;
  enableControls?: boolean;
}

export default function Floating3DObject({ 
  type = 'sphere', 
  className = '',
  enableControls = false 
}: Floating3DObjectProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting for premium look */}
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <directionalLight position={[0, 5, 5]} intensity={0.8} color="#fff" />
          
          {/* The floating 3D object */}
          <FloatingShape type={type} />
          
          {/* Optional orbit controls */}
          {enableControls && (
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

