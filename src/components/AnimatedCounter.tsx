/**
 * Animated Counter Component
 * Counts up to target number with smooth animation
 */

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  startOnView?: boolean;
}

export const AnimatedCounter = ({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
  startOnView = true,
}: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const value = latest.toFixed(decimals);
    return `${prefix}${value}${suffix}`;
  });
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startOnView || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = Date.now();
            const animateFrame = () => {
              const elapsed = (Date.now() - startTime) / 1000;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              count.set(target * easeOutQuart);

              if (progress < 1) {
                requestAnimationFrame(animateFrame);
              } else {
                count.set(target);
              }
            };
            requestAnimationFrame(animateFrame);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, duration, count, startOnView]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
};


