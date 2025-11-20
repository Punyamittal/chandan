/**
 * Stacked Section Wrapper Component
 * Creates layered sections with parallax depth and smooth transitions
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { fadeSlideUp } from '@/lib/animations';

interface StackedSectionProps {
  children: ReactNode;
  className?: string;
  depth?: number; // 0-3, higher = more parallax
  sticky?: boolean;
  backgroundColor?: string;
}

export default function StackedSection({
  children,
  className = '',
  depth = 0,
  sticky = true,
  backgroundColor = 'bg-background',
}: StackedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax effect based on depth
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [depth * 100, -depth * 50]
  );

  // Scale effect as it enters/exits viewport
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 0.95]
  );

  // Opacity fade
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 1, 1, 0.5]
  );

  return (
    <motion.section
      ref={sectionRef}
      style={{
        y: depth > 0 ? y : 0,
        scale,
        opacity,
      }}
      className={`
        relative
        ${sticky ? 'sticky top-0' : ''}
        ${backgroundColor}
        ${className}
      `}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,${depth * 0.1}) 100%)`,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={fadeSlideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

