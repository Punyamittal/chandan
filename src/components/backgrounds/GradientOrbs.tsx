/**
 * Gradient Orbs Background
 * Pulsing gradient orbs with glow effects
 */

import { motion } from 'framer-motion';
import { Theme } from '@/lib/themes';

interface GradientOrbsProps {
  theme: Theme;
  count?: number;
  className?: string;
}

export default function GradientOrbs({ theme, count = 5, className = '' }: GradientOrbsProps) {
  const orbs = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 600 + 400,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: i * 1.5,
  }));

  const getOrbColor = (index: number) => {
    const colors = [
      theme.colors.primary,
      theme.colors.secondary,
      theme.colors.accent,
    ];
    return colors[index % colors.length];
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      {orbs.map((orb, index) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${getOrbColor(index)}, transparent 70%)`,
            filter: 'blur(80px)',
            opacity: 0.4,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Additional ambient glow */}
      <div 
        className="absolute inset-0" 
        style={{
          background: theme.gradients.hero,
          opacity: 0.05,
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
}

