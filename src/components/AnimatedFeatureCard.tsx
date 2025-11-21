/**
 * Animated Feature Card Component
 * Premium cards with hover effects and micro-interactions
 */

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';
import { cardReveal } from '@/lib/animations';

interface AnimatedFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export default function AnimatedFeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
}: AnimatedFeatureCardProps) {
  return (
    <GlassmorphismCard
      variant="light"
      blur="xl"
      className="p-8 group overflow-hidden"
      animate={true}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Icon Container with Glow */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="relative mb-6"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Icon */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 group-hover:border-accent/40 transition-colors">
          <Icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h3
        className="text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors"
      >
        {title}
      </motion.h3>

      {/* Description */}
      <p className="leading-relaxed font-medium" style={{ opacity: 0.85 }}>
        {description}
      </p>

      {/* Hover Accent Line */}
      <motion.div
        className="mt-6 h-1 bg-gradient-to-r from-accent to-transparent rounded-full"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
    </GlassmorphismCard>
  );
}

