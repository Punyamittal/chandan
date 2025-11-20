import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import { Mesh, Vector3 } from 'three';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useScroll } from 'framer-motion';

// Animated 3D sphere with distortion
function AnimatedSphere({ scrollY }: { scrollY?: any }) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotate based on time
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // React to scroll if scrollY is provided
      if (scrollY) {
        const scrollValue = scrollY.get();
        meshRef.current.position.y = scrollValue * 2;
      }
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
        <MeshDistortMaterial
          color="hsl(var(--accent))"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Multiple floating geometric objects
function GeometricObjects() {
  return (
    <>
      {/* Torus */}
      <Float speed={3} rotationIntensity={1} floatIntensity={0.5} position={[-2, 1, -2]}>
        <mesh>
          <torusGeometry args={[0.5, 0.2, 16, 32]} />
          <meshStandardMaterial
            color="hsl(var(--accent))"
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      {/* Icosahedron */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.8} position={[2, -1, -1]}>
        <mesh>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="hsl(var(--primary))"
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>

      {/* Box */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6} position={[0, 2, -3]}>
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color="hsl(var(--accent))"
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>
    </>
  );
}

// Main 3D Scene Component
export default function Scene3D({ variant = 'sphere' }: { variant?: 'sphere' | 'geometric' | 'both' }) {
  const { scrollY } = useScroll();

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="hsl(var(--accent))" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
          />

          {/* 3D Objects */}
          {(variant === 'sphere' || variant === 'both') && <AnimatedSphere scrollY={scrollY} />}
          {(variant === 'geometric' || variant === 'both') && <GeometricObjects />}

          {/* Optional: Enable user interaction on larger screens */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

