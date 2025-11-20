/**
 * Animated Badge Component
 * Floating badges with micro-interactions
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface AnimatedBadgeProps {
  icon?: LucideIcon;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  floating?: boolean;
  delay?: number;
}

export default function AnimatedBadge({
  icon: Icon,
  children,
  variant = 'primary',
  floating = true,
  delay = 0,
}: AnimatedBadgeProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-accent/20 to-accent/10 border-accent/30 text-accent',
    secondary: 'bg-gradient-to-r from-foreground/10 to-foreground/5 border-foreground/20 text-foreground',
    accent: 'bg-gradient-to-r from-accent to-accent/80 border-accent text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{
        scale: 1.1,
        y: -5,
        transition: { duration: 0.2 },
      }}
      className={`
        inline-flex items-center gap-2 px-4 py-2
        rounded-full border backdrop-blur-xl
        shadow-lg font-medium text-sm
        ${variants[variant]}
        ${floating ? 'animate-float' : ''}
      `}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.div>
  );
}
