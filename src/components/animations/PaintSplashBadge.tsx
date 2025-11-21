/**
 * Paint Splash Badge Component
 * Spray paint splash animation for badges
 */

import { motion } from 'framer-motion';
import { paintSplash, inkSpread } from '@/lib/creativeAnimations';
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface PaintSplashBadgeProps {
  children: ReactNode;
  icon?: LucideIcon;
  variant?: 'splash' | 'ink';
  color?: string;
  delay?: number;
}

export default function PaintSplashBadge({ 
  children, 
  icon: Icon,
  variant = 'splash',
  color = '#D6814F',
  delay = 0 
}: PaintSplashBadgeProps) {
  const animation = variant === 'splash' ? paintSplash : inkSpread;

  return (
    <motion.div
      variants={animation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay }}
      className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
        border: `2px solid ${color}40`,
      }}
    >
      {/* Paint splatter background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: [0, 1.5, 1], rotate: [0, 180, 0] }}
        transition={{
          duration: 2,
          delay: delay + 0.3,
          ease: 'easeOut',
        }}
        style={{
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        }}
      />
      
      {Icon && (
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </motion.div>
      )}
      
      <span className="relative z-10 font-semibold text-sm" style={{ color }}>
        {children}
      </span>
    </motion.div>
  );
}

