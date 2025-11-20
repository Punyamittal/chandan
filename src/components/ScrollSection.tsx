import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  stackEffect?: boolean;
}

// Section that stacks on top of previous sections with parallax
export default function ScrollSection({ 
  children, 
  className = "",
  stackEffect = true 
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

  return (
    <motion.section
      ref={ref}
      style={stackEffect ? { 
        y, 
        opacity, 
        scale,
      } : undefined}
      className={`
        relative
        ${stackEffect ? 'z-10 bg-background' : ''}
        ${className}
      `}
    >
      {/* Stacking effect - creates layered look */}
      {stackEffect && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-transparent" />
      )}
      
      {children}
    </motion.section>
  );
}

