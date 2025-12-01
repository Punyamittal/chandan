/**
 * Enhanced 3D Card Transformation Experience
 * Wedding Invitation → Envelope → Rotation → Business Card
 * With elegant content restructuring
 */

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Sparkles,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Building, 
  Sparkles as SparklesIcon,
  ArrowRight,
  Clock,
  Gift,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

/**
 * Tropical Flower Component
 */
function TropicalFlower({ position, color, size = 1 }: { position: [number, number, number], color: string, size?: number }) {
  return (
    <group position={position} scale={size}>
      {/* Flower petals */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[Math.cos((i * Math.PI * 2) / 5) * 0.15, Math.sin((i * Math.PI * 2) / 5) * 0.15, 0]}
          rotation={[0, 0, (i * Math.PI * 2) / 5]}
        >
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} />
        </mesh>
      ))}
      {/* Center */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

/**
 * Palm Leaf Component
 */
function PalmLeaf({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main stem */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshStandardMaterial color="#15803d" metalness={0.2} roughness={0.7} />
      </mesh>
      {/* Leaf segments */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((offset, i) => (
        <group key={i} position={[0, offset, 0]}>
          {/* Left side */}
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.4, 0.08, 0.01]} />
            <meshStandardMaterial color="#16a34a" metalness={0.2} roughness={0.6} />
          </mesh>
          {/* Right side */}
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.4, 0.08, 0.01]} />
            <meshStandardMaterial color="#16a34a" metalness={0.2} roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Enhanced 3D Card with beautiful details
 */
function Card3D({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the wedding invitation texture
  const cardTexture = useTexture('/models/vintage_camera/digit.png');
  
  // Load the business card texture
  const businessCardTexture = useTexture('/models/vintage_camera/digit1.png');
  
  // Configure wedding card texture to not repeat - show only once
  cardTexture.wrapS = THREE.ClampToEdgeWrapping;
  cardTexture.wrapT = THREE.ClampToEdgeWrapping;
  cardTexture.needsUpdate = true;
  
  // Configure business card texture
  businessCardTexture.wrapS = THREE.ClampToEdgeWrapping;
  businessCardTexture.wrapT = THREE.ClampToEdgeWrapping;
  businessCardTexture.needsUpdate = true;
  
  // Create two texture instances for split wedding card image
  const leftTexture = cardTexture.clone();
  leftTexture.repeat.set(0.5, 1); // Show left half
  leftTexture.offset.set(0, 0);
  leftTexture.needsUpdate = true;
  
  const rightTexture = cardTexture.clone();
  rightTexture.repeat.set(0.5, 1); // Show right half
  rightTexture.offset.set(0.5, 0);
  rightTexture.needsUpdate = true;

  // Phase calculations with professional smooth easing
  const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  
  const phase1 = Math.min(scrollProgress / 0.3, 1); // 0-30%: Wedding card visible
  const phase2 = 1; // Skip folding animation - instant transition
  const phase3 = Math.min(Math.max((scrollProgress - 0.35) / 0.3, 0), 1); // 35-65%: Rotate envelope
  const phase4 = Math.min(Math.max((scrollProgress - 0.6) / 0.35, 0), 1); // 60-95%: Business card

  // Apply professional smooth easing
  const easedPhase2 = easeInOutQuart(phase2);
  const easedPhase3 = easeInOutQuart(phase3);
  const easedPhase4 = easeInOutQuart(phase4);

  // Smooth diagonal movement path with direct transitions
  // Start: Right side (X: 3, Y: 0)
  // Middle (envelope): Center (X: 0, Y: 0) 
  // End (business card): Bottom-right (X: 4.5, Y: -2.2) - STUCK
  
  let posX = 3; // Start right
  let posY = 0; // Center height
  
  // Phase 1: Move to center for envelope transformation
  if (scrollProgress >= 0.25 && scrollProgress < 0.6) {
    const moveProgress = (scrollProgress - 0.25) / 0.35; // 0 to 1
    const easedMove = easeInOutQuart(moveProgress);
    posX = 3 - easedMove * 3; // 3 → 0 (center)
    posY = 0; // Stay centered vertically
  }
  
  // Phase 2: Move to bottom-right for business card
  if (scrollProgress >= 0.6) {
    if (scrollProgress < 0.9) {
      // Animate from center to bottom-right
      const moveProgress = (scrollProgress - 0.6) / 0.3;
      const easedMove = easeInOutQuart(moveProgress);
      posX = 0 + easedMove * 4.5; // 0 → 4.5 (smooth right)
      posY = 0 - easedMove * 2.2; // 0 → -2.2 (smooth downward)
    } else {
      // STUCK at final position (scrollProgress >= 0.9)
      posX = 4.5; // Fixed right position
      posY = -2.2; // Fixed bottom position
    }
  }

  // Smoother scale transition
  let scale = 0.75; // Start smaller
  if (scrollProgress < 0.6) {
    scale = 0.75; // Maintain size for wedding card and envelope
  } else if (scrollProgress < 0.9) {
    const scaleProgress = (scrollProgress - 0.6) / 0.3;
    scale = 0.75 - easeInOutQuart(scaleProgress) * 0.47; // 0.75 → 0.28
  } else {
    scale = 0.28; // Stay at 28% when stuck
  }
  
  const rotationY = easedPhase3 * Math.PI * 2;

  // Continuous auto-rotation at all times
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle continuous Y-axis rotation (always active)
      groupRef.current.rotation.y += 0.005;
      
      // Subtle floating on wedding card phase
      if (phase1 === 1 && phase2 === 0) {
        groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.8) * 0.002;
      }
    }
  });

  return (
    <group ref={groupRef} position={[posX, posY, 0]} scale={scale} rotation={[0, rotationY, 0]}>
      {/* WEDDING CARD (Phase 1) */}
      {scrollProgress < 0.35 && (
        <>
          {(() => {
            // Beautiful smooth fade out with quartic easing
            const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
            let cardOpacity = 1;
            if (scrollProgress > 0.27) {
              const fadeProgress = Math.min((scrollProgress - 0.27) / 0.08, 1);
              cardOpacity = 1 - easeInOutQuart(fadeProgress);
            }

            return (
              <>
                {/* Left Panel - Shows LEFT half of the continuous image (stays flat) */}
                <mesh
                  position={[-1.25, 0, 0.01]}
                  rotation={[0, 0, 0]}
                  castShadow
                >
                  <planeGeometry args={[2.5, 3.2]} />
                  <meshStandardMaterial
                    map={leftTexture}
                    color="#707070"
                    roughness={0.5}
                    metalness={0}
                    envMapIntensity={0.2}
                    toneMapped={false}
                    transparent
                    opacity={cardOpacity}
                  />
                </mesh>

                {/* Right Panel - Shows RIGHT half of the continuous image (stays flat) */}
                <mesh
                  position={[1.25, 0, 0.01]}
                  rotation={[0, 0, 0]}
                  castShadow
                >
                  <planeGeometry args={[2.5, 3.2]} />
                  <meshStandardMaterial
                    map={rightTexture}
                    color="#707070"
                    roughness={0.5}
                    metalness={0}
                    envMapIntensity={0.2}
                    toneMapped={false}
                    transparent
                    opacity={cardOpacity}
                  />
                </mesh>

                {/* Elegant Sparkles around the printed card */}
                {scrollProgress < 0.25 && (
                  <Sparkles
                    count={25}
                    scale={5}
                    size={1.8}
                    speed={0.2}
                    opacity={0.5 * cardOpacity}
                    color="#fbbf24"
                  />
                )}
              </>
            );
          })()}
        </>
      )}

      {/* ENVELOPE (Phase 2-3) - Appears directly after card */}
      {scrollProgress >= 0.3 && scrollProgress < 0.9 && (
        <>
          {/* Calculate smooth fade for envelope with professional easing */}
          {(() => {
            const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
            
            // Beautiful smooth envelope fade IN with easing
            let envelopeFade = 1;
            if (scrollProgress < 0.35) {
              // Smooth fade in from 28% to 35%
              const fadeProgress = Math.max(0, (scrollProgress - 0.28) / 0.07);
              envelopeFade = easeInOutQuart(fadeProgress);
            } else if (scrollProgress > 0.7) {
              // Smooth fade out from 70% to 90%
              envelopeFade = Math.max(0, 1 - easeInOutQuart((scrollProgress - 0.7) / 0.2));
            }
            
            // Gentle flap opening for business card emergence
            const flapOpen = scrollProgress > 0.55 
              ? Math.min(easeInOutQuart((scrollProgress - 0.55) / 0.3), 1) * 0.8
              : 0;

            return (
              <>
                {/* REALISTIC ENVELOPE - Traditional Mail Envelope Design */}
                <group>
                  {/* Main envelope body - front rectangular face */}
                  <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
                    <boxGeometry args={[3.4, 2.2, 0.04]} />
                    <meshStandardMaterial
                      color="#f9f6f1"
                      roughness={0.85}
                      metalness={0}
                      envMapIntensity={0.1}
                      transparent
                      opacity={envelopeFade}
                    />
                  </mesh>

                  {/* Envelope back body (slightly visible from sides) */}
                  <mesh position={[0, -0.15, -0.025]} receiveShadow>
                    <boxGeometry args={[3.4, 2.2, 0.01]} />
                    <meshStandardMaterial
                      color="#ebe5dc"
                      roughness={0.9}
                      metalness={0}
                      transparent
                      opacity={envelopeFade * 0.8}
                    />
                  </mesh>

                  {/* Left edge/side of envelope */}
                  <mesh position={[-1.7, -0.15, -0.01]} rotation={[0, Math.PI / 2, 0]}>
                    <planeGeometry args={[0.05, 2.2]} />
                    <meshStandardMaterial
                      color="#ded5c9"
                      roughness={0.95}
                      transparent
                      opacity={envelopeFade * 0.6}
                    />
                  </mesh>

                  {/* Right edge/side of envelope */}
                  <mesh position={[1.7, -0.15, -0.01]} rotation={[0, -Math.PI / 2, 0]}>
                    <planeGeometry args={[0.05, 2.2]} />
                    <meshStandardMaterial
                      color="#ded5c9"
                      roughness={0.95}
                      transparent
                      opacity={envelopeFade * 0.6}
                    />
                  </mesh>

                  {/* BOTTOM FLAP - Always visible (sealed) */}
                  <mesh position={[0, -1.25, 0.025]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[3.4, 0.15, 0.015]} />
                    <meshStandardMaterial
                      color="#d9cfc0"
                      roughness={0.9}
                      transparent
                      opacity={envelopeFade}
                    />
                  </mesh>

                  {/* TOP FLAP - Triangular shaped, opens for business card */}
                  <group position={[0, 0.95, 0]} rotation={[flapOpen * 1.3, 0, 0]}>
                    {/* Main flap rectangular part */}
                    <mesh position={[0, 0.5, -0.01]} castShadow>
                      <boxGeometry args={[3.42, 1.0, 0.02]} />
                      <meshStandardMaterial
                        color="#ebe2d6"
                        roughness={0.85}
                        metalness={0}
                        transparent
                        opacity={envelopeFade}
                      />
                    </mesh>

                    {/* Triangular point - left diagonal */}
                    <mesh position={[-1.3, 0, 0]} rotation={[0, 0, -0.52]}>
                      <boxGeometry args={[1.9, 0.03, 0.02]} />
                      <meshStandardMaterial
                        color="#dfd6ca"
                        roughness={0.88}
                        transparent
                        opacity={envelopeFade}
                      />
                    </mesh>

                    {/* Triangular point - right diagonal */}
                    <mesh position={[1.3, 0, 0]} rotation={[0, 0, 0.52]}>
                      <boxGeometry args={[1.9, 0.03, 0.02]} />
                      <meshStandardMaterial
                        color="#dfd6ca"
                        roughness={0.88}
                        transparent
                        opacity={envelopeFade}
                      />
                    </mesh>

                    {/* Triangular point bottom edge */}
                    <mesh position={[0, -0.47, 0]}>
                      <boxGeometry args={[3.42, 0.03, 0.02]} />
                      <meshStandardMaterial
                        color="#cfc5b8"
                        roughness={0.9}
                        transparent
                        opacity={envelopeFade}
                      />
                    </mesh>
                  </group>

                  {/* SIDE FLAPS - Left and right triangular folds */}
                  {flapOpen < 0.15 && (
                    <>
                      {/* Left side flap */}
                      <mesh position={[-1.62, 0.45, 0.03]} rotation={[0, 0, -0.35]}>
                        <boxGeometry args={[1.2, 0.025, 0.015]} />
                        <meshStandardMaterial
                          color="#d4cab9"
                          roughness={0.92}
                          transparent
                          opacity={envelopeFade * 0.8}
                        />
                      </mesh>

                      {/* Right side flap */}
                      <mesh position={[1.62, 0.45, 0.03]} rotation={[0, 0, 0.35]}>
                        <boxGeometry args={[1.2, 0.025, 0.015]} />
                        <meshStandardMaterial
                          color="#d4cab9"
                          roughness={0.92}
                          transparent
                          opacity={envelopeFade * 0.8}
                        />
                      </mesh>
                    </>
                  )}

                  {/* Seal/closure indicator when closed */}
                  {flapOpen < 0.1 && (
                    <mesh position={[0, 0.75, 0.055]}>
                      <cylinderGeometry args={[0.18, 0.18, 0.02, 32]} />
                      <meshStandardMaterial
                        color="#c5a880"
                        roughness={0.7}
                        metalness={0.2}
                        transparent
                        opacity={envelopeFade * 0.9}
                      />
                    </mesh>
                  )}

                  {/* Inner white paper visible when flap opens */}
                  {flapOpen > 0.2 && (
                    <mesh position={[0, 0.3, 0.015]}>
                      <boxGeometry args={[3.2, 1.8, 0.01]} />
                      <meshStandardMaterial
                        color="#ffffff"
                        roughness={0.95}
                        transparent
                        opacity={envelopeFade * Math.min(flapOpen * 2, 1)}
                      />
                    </mesh>
                  )}
                </group>
              </>
            );
          })()}

        </>
      )}

      {/* BUSINESS CARD (Phase 4) */}
      {scrollProgress >= 0.55 && (
        <>
          {(() => {
            // Beautiful smooth emergence with quartic easing
            const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
            const emergenceProgress = Math.min(Math.max((scrollProgress - 0.55) / 0.4, 0), 1);
            const easedEmergence = easeInOutQuart(emergenceProgress);
            
            // Start INSIDE envelope at top, slide OUT upward through the flap
            // Phase 1 (0-0.5): Card slides from inside (-0.8) to envelope top (0.5)
            // Phase 2 (0.5-1): Card continues out and moves to final position (1.5)
            let slideOutY;
            if (scrollProgress >= 0.9) {
              // Card is STUCK - maintain final position relative to group
              slideOutY = 0; // Centered within the group (which is at bottom-right)
            } else if (easedEmergence < 0.5) {
              // Inside envelope, moving up to flap opening
              slideOutY = -0.8 + (easedEmergence * 2) * 1.3; // -0.8 → 0.5
            } else {
              // Emerging from flap, moving to visible position
              slideOutY = 0.5 + ((easedEmergence - 0.5) * 2) * 1; // 0.5 → 1.5
            }
            
            // Ensure card is fully visible once stuck
            const cardOpacity = scrollProgress >= 0.9 ? 1 : Math.min(easedEmergence * 1.5, 1);
            
            // Smooth rotation for reveal - tilts as it comes out, then flat when stuck
            const revealRotation = scrollProgress >= 0.9 
              ? 0 // Flat when stuck
              : easedEmergence < 0.7 
                ? easedEmergence * 0.2 
                : 0.14 - (easedEmergence - 0.7) * 0.14;

            return (
              <Float
                speed={2}
                rotationIntensity={0.15}
                floatIntensity={0.2}
                enabled={phase4 > 0.9}
              >
                <group 
                  position={[0, slideOutY, 0.1]}
                  rotation={[revealRotation, 0, 0]}
                >
                  {/* Business Card with printed design from digit1.png */}
                  <mesh castShadow receiveShadow>
                    <planeGeometry args={[3.5, 2]} />
                    <meshStandardMaterial
                      map={businessCardTexture}
                      color="#808080"
                      roughness={0.4}
                      metalness={0}
                      envMapIntensity={0.2}
                      toneMapped={false}
                      transparent
                      opacity={cardOpacity}
                      side={THREE.DoubleSide}
                    />
                  </mesh>

                  {/* Sparkle effect on business card */}
                  {phase4 > 0.7 && (
                    <Sparkles
                      count={20}
                      scale={3.5}
                      size={1.5}
                      speed={0.2}
                      opacity={cardOpacity * 0.6}
                      color="#ea580c"
                    />
                  )}
                </group>
              </Float>
            );
          })()}
        </>
      )}
    </group>
  );
}

/**
 * 3D Scene with proper lighting
 */
function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={45} />
      
      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#fbbf24" />
      
      {/* Environment */}
      <Environment preset="studio" />
      
      {/* 3D Card */}
      <Card3D scrollProgress={scrollProgress} />
      
      {/* Beautiful Shadows */}
      <ContactShadows
        position={[0, -3.5, 0]}
        opacity={0.35}
        scale={15}
        blur={2.5}
        far={5}
      />
    </>
  );
}

/**
 * Main Component
 */
export default function Card3DShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Update scroll progress state for 3D scene
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest);
      console.log('Scroll:', latest); // Debug
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Content animations based on scroll - smoother with longer transitions
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -150]);

  const section1Opacity = useTransform(scrollYProgress, [0.18, 0.28, 0.42], [0, 1, 0]);
  const section1Y = useTransform(scrollYProgress, [0.18, 0.28], [150, 0]);
  const section1X = useTransform(scrollYProgress, [0.18, 0.28], [-100, 0]); // Slide from left

  const section2Opacity = useTransform(scrollYProgress, [0.42, 0.52, 0.68], [0, 1, 0]);
  const section2Y = useTransform(scrollYProgress, [0.42, 0.52], [150, 0]);
  const section2X = useTransform(scrollYProgress, [0.42, 0.52], [100, 0]); // Slide from right

  const section3Opacity = useTransform(scrollYProgress, [0.68, 0.78], [0, 1]);
  const section3Y = useTransform(scrollYProgress, [0.68, 0.78], [150, 0]);
  const section3Scale = useTransform(scrollYProgress, [0.68, 0.78], [0.9, 1]); // Scale up effect

  return (
    <>
      <Navigation />
      
      <div
        ref={containerRef}
        className="relative w-full bg-gradient-to-b from-pink-50 via-white to-green-50"
        style={{ height: '900vh', position: 'relative' }}
      >
        {/* Sticky 3D Canvas */}
        <div className="sticky top-0 left-0 w-full h-screen z-10 overflow-hidden">
          <Canvas shadows dpr={[1, 2]}>
            <Scene scrollProgress={scrollProgress} />
          </Canvas>
        </div>

        {/* Dynamic Content Overlay */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
          {/* HERO SECTION */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="absolute top-[75vh] left-0 w-full px-6 text-center pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-block mb-6 px-6 py-2 bg-pink-100 border-2 border-pink-300 rounded-full">
                <span className="text-pink-700 font-semibold flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4" />
                  Tropical 3D Experience
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-serif text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-400 bg-clip-text text-transparent">
                  Save the Date
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Scroll down to witness a magical transformation from a tropical wedding 
                invitation with palm leaves and flowers to a professional business card
              </p>

              <div className="flex items-center justify-center gap-2 text-gray-500">
                <ArrowRight className="w-5 h-5 animate-bounce" />
                <span>Scroll to begin</span>
              </div>
            </motion.div>
          </motion.div>

          {/* SECTION 1: Wedding Details */}
          <motion.div
            style={{ opacity: section1Opacity, y: section1Y, x: section1X }}
            className="absolute top-[25vh] left-0 w-full px-6 pointer-events-auto"
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border-2 border-orange-200"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Heart className="w-10 h-10 text-orange-500" />
                    <h2 className="text-4xl font-serif text-gray-900">Our Love Story</h2>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    From a chance encounter to a lifetime commitment, our journey together
                    has been filled with laughter, adventures, and countless cherished moments.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="px-4 py-2 bg-orange-100 rounded-full">
                      <span className="text-orange-800 font-medium">Together Since 2020</span>
                    </div>
                    <div className="px-4 py-2 bg-orange-100 rounded-full">
                      <span className="text-orange-800 font-medium">Engaged 2024</span>
                    </div>
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="hidden md:block"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&h=600&fit=crop"
                      alt="Couple"
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* SECTION 2: Event Details */}
          <motion.div
            style={{ opacity: section2Opacity, y: section2Y, x: section2X }}
            className="absolute top-[20vh] left-0 w-full px-6 pointer-events-auto"
          >
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-orange-100 via-orange-50 to-white p-12 rounded-3xl shadow-2xl border-2 border-orange-300"
              >
                <h2 className="text-5xl font-serif text-center text-gray-900 mb-12">
                  Celebration Details
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center bg-white p-8 rounded-2xl shadow-lg"
                  >
                    <Calendar className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">When</h3>
                    <p className="text-gray-700 font-semibold">June 15, 2025</p>
                    <p className="text-gray-600">4:00 PM Onwards</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center bg-white p-8 rounded-2xl shadow-lg"
                  >
                    <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Where</h3>
                    <p className="text-gray-700 font-semibold">Garden Manor</p>
                    <p className="text-gray-600">123 Park Avenue</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center bg-white p-8 rounded-2xl shadow-lg"
                  >
                    <Gift className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Dress Code</h3>
                    <p className="text-gray-700 font-semibold">Semi-Formal</p>
                    <p className="text-gray-600">Pastel Preferred</p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-12 text-center"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-10 py-6 text-lg"
                  >
                    <Clock className="w-5 h-5 mr-2" />
                    RSVP Now
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* SECTION 3: Business Contact */}
          <motion.div
            style={{ opacity: section3Opacity, y: section3Y, scale: section3Scale }}
            className="absolute top-[15vh] left-0 w-full px-6 pointer-events-auto"
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Company Info */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white p-12 rounded-3xl shadow-2xl border-2 border-orange-300"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Building className="w-12 h-12 text-orange-600" />
                    <h2 className="text-4xl font-serif text-gray-900">
                      Chandan Trading Co.
                    </h2>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    From wedding invitations to professional business cards, we bring your 
                    special moments to life with premium printing solutions.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-gray-700">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-lg">+91 9873535400</span>
                    </div>

                    <div className="flex items-center gap-4 text-gray-700">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-lg">chandantrading2014@gmail.com</span>
                    </div>

                    <div className="flex items-center gap-4 text-gray-700">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-lg">A-1, Kewal Park, Azadpur, Delhi - 110033</span>
                    </div>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-br from-orange-500 to-orange-600 p-12 rounded-3xl shadow-2xl text-white flex flex-col justify-center"
                >
                  <SparklesIcon className="w-14 h-14 mb-6" />
                  
                  <h3 className="text-4xl font-bold mb-6">
                    Ready to Print Your Vision?
                  </h3>
                  
                  <p className="text-orange-50 text-lg mb-8 leading-relaxed">
                    From elegant wedding stationery to professional business cards, 
                    we transform your ideas into beautiful printed reality.
                  </p>

                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-6 self-start"
                  >
                    Get a Free Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                  <div className="mt-8 pt-8 border-t border-orange-400/30">
                    <p className="text-sm text-orange-100 mb-2">Trusted by</p>
                    <p className="text-2xl font-bold">10,000+ Happy Customers</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-mono text-sm shadow-2xl z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          {Math.round(scrollProgress * 100)}%
        </motion.div>

        {/* Phase Labels */}
        <motion.div
          className="fixed top-24 left-8 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg z-50 border-2 border-pink-200"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-xs text-gray-500 mb-2">Current Phase</p>
          <p className="text-lg font-bold text-gray-900">
            {scrollProgress < 0.3 && "🌺 Tropical Wedding Card"}
            {scrollProgress >= 0.3 && scrollProgress < 0.35 && "✨ Transforming..."}
            {scrollProgress >= 0.35 && scrollProgress < 0.6 && "📧 Envelope"}
            {scrollProgress >= 0.6 && scrollProgress < 0.85 && "💼 Business Card Emerging"}
            {scrollProgress >= 0.85 && scrollProgress < 0.9 && "↘️ Moving to Corner"}
            {scrollProgress >= 0.9 && "📌 Business Card (Fixed)"}
          </p>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
