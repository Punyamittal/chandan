/**
 * Zoom Reveal Section Wrapper
 * Pop-up enlargement effect with smooth transitions
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { Theme } from '@/lib/themes';

interface ZoomRevealSectionProps {
  children: ReactNode;
  theme: Theme;
  className?: string;
  zoomIntensity?: 'subtle' | 'medium' | 'strong';
  sticky?: boolean;
}

export default function ZoomRevealSection({
  children,
  theme,
  className = '',
  zoomIntensity = 'medium',
  sticky = true,
}: ZoomRevealSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Zoom intensity mappings
  const zoomScales = {
    subtle: [0.92, 1, 1, 0.92],
    medium: [0.85, 1, 1, 0.85],
    strong: [0.75, 1, 1, 0.75],
  };

  // Scale transformation (zoom in as it enters, zoom out as it exits)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    zoomScales[zoomIntensity]
  );

  // Opacity fade
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  // Border radius for modal-expansion feel
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.3],
    ['20px', '0px']
  );

  return (
    <motion.section
      ref={sectionRef}
      style={{
        scale,
        opacity,
        borderRadius,
      }}
      className={`
        relative overflow-hidden
        ${sticky ? 'sticky top-0' : ''}
        ${className}
      `}
    >
      {/* Background with theme colors */}
      <div 
        className="absolute inset-0" 
        style={{
          background: theme.gradients.section,
        }}
      />

      {/* Content without blur */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
}

