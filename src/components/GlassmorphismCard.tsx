/**
 * Glassmorphism Card Component
 * Premium glass-effect cards with animations
 */

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cardReveal, hoverLift } from '@/lib/animations';

interface GlassmorphismCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'light' | 'dark' | 'accent';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  animate?: boolean;
}

export default function GlassmorphismCard({
  children,
  variant = 'light',
  blur = 'lg',
  hoverable = true,
  animate = true,
  className = '',
  ...props
}: GlassmorphismCardProps) {
  // Variant styles
  const variants = {
    light: 'bg-white/10 border-white/20',
    dark: 'bg-black/20 border-white/10',
    accent: 'bg-accent/10 border-accent/30',
  };

  // Blur intensity (reduced for better visibility)
  const blurClasses = {
    sm: 'backdrop-blur-[2px]',
    md: 'backdrop-blur-[4px]',
    lg: 'backdrop-blur-[6px]',
    xl: 'backdrop-blur-[8px]',
  };

  return (
    <motion.div
      variants={animate ? cardReveal : undefined}
      initial={animate ? 'hidden' : undefined}
      whileInView={animate ? 'visible' : undefined}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={hoverable ? hoverLift : undefined}
      className={`
        ${variants[variant]}
        ${blurClasses[blur]}
        border rounded-2xl
        shadow-2xl
        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      {/* Shine effect overlay */}
      {hoverable && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            }}
          />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

