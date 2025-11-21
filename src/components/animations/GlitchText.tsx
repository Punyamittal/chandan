/**
 * Glitch Text Component
 * Digital glitch reveal animation for hero titles
 */

import { motion } from 'framer-motion';
import { glitchReveal, rgbShift } from '@/lib/creativeAnimations';
import { ReactNode } from 'react';

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'glitch' | 'rgb';
  delay?: number;
}

export default function GlitchText({ 
  children, 
  className = '',
  variant = 'glitch',
  delay = 0 
}: GlitchTextProps) {
  const animation = variant === 'glitch' ? glitchReveal : rgbShift;

  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={`relative ${className}`}
    >
      {/* Scanline overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)',
        }}
      />
      
      {children}
      
      {/* Glitch layers */}
      {variant === 'glitch' && (
        <>
          <motion.div
            className="absolute inset-0 mix-blend-screen opacity-70"
            animate={{
              x: [-2, 2, -2, 0],
              opacity: [0, 0.7, 0, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            style={{ color: '#ff00ff' }}
          >
            {children}
          </motion.div>
          
          <motion.div
            className="absolute inset-0 mix-blend-screen opacity-70"
            animate={{
              x: [2, -2, 2, 0],
              opacity: [0, 0.7, 0, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 3,
              delay: 0.1,
            }}
            style={{ color: '#00ffff' }}
          >
            {children}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

