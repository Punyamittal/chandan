/**
 * Particle Field Background
 * Floating particles with parallax effect
 */

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  distance: number;
}

interface ParticleFieldProps {
  count?: number;
  theme?: 'light' | 'dark' | 'color';
  className?: string;
}

export default function ParticleField({ 
  count = 50, 
  theme = 'dark',
  className = '' 
}: ParticleFieldProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        distance: Math.random() * 50 + 20,
      });
    }
    setParticles(newParticles);
  }, [count]);

  const getParticleColor = () => {
    switch (theme) {
      case 'light':
        return 'rgba(0, 0, 0, 0.1)';
      case 'color':
        return 'rgba(138, 43, 226, 0.3)';
      default:
        return 'rgba(255, 255, 255, 0.2)';
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: getParticleColor(),
          }}
          animate={{
            y: [0, -particle.distance, 0],
            x: [0, particle.distance / 2, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

