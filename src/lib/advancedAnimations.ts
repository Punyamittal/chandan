/**
 * Advanced Animation Variants
 * Inspired by modern portfolio sites with sophisticated interactions
 */

import { Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, RefObject } from "react";

// Text reveal animation - character by character
export const textReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1,
    },
  },
};

export const textRevealChar: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Word-by-word reveal
export const wordReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const wordRevealItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    clipPath: "inset(100% 0 0 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Magnetic hover effect hook
export const useMagnetic = (strength: number = 0.3) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
};

// 3D tilt effect hook
export const useTilt3D = (maxTilt: number = 15) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const xPos = (e.clientX - centerX) / rect.width;
    const yPos = (e.clientY - centerY) / rect.height;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    style: { rotateX, rotateY, transformStyle: "preserve-3d" as const },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
};

// Scroll progress hook
export const useScrollProgress = (ref: RefObject<HTMLElement>) => {
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(
          1,
          (scrollTop + windowHeight - elementTop) / (elementHeight + windowHeight)
        )
      );
      scrollProgress.set(progress);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, [ref, scrollProgress]);

  return scrollProgress;
};

// Animated counter hook
export const useAnimatedCounter = (
  target: number,
  duration: number = 2,
  startOnView: boolean = true
) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!startOnView) {
      const controls = { stop: () => {} };
      return () => controls.stop();
    }

    const animate = () => {
      count.set(0);
      const startTime = Date.now();
      const animateFrame = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        count.set(target * easeOutQuart);

        if (progress < 1) {
          requestAnimationFrame(animateFrame);
        }
      };
      requestAnimationFrame(animateFrame);
    };

    animate();
  }, [target, duration, count, startOnView]);

  return rounded;
};

// Parallax scroll hook
export const useParallax = (
  ref: RefObject<HTMLElement>,
  speed: number = 0.5
) => {
  const y = useMotionValue(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateParallax = () => {
      const rect = element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      const scrolled = scrollY + windowHeight - elementTop;
      const progress = scrolled / (windowHeight + elementHeight);
      y.set(progress * 100 * speed);
    };

    window.addEventListener("scroll", updateParallax);
    updateParallax();

    return () => window.removeEventListener("scroll", updateParallax);
  }, [ref, y, speed]);

  return y;
};

// Fade in on scroll
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Scale in animation
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Rotate in animation
export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Slide in from sides with blur
export const slideInBlur: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Hover lift effect
export const hoverLift = {
  whileHover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  whileTap: {
    scale: 0.98,
  },
};

// Glow pulse animation
export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(249, 115, 22, 0.4)",
      "0 0 40px rgba(249, 115, 22, 0.6)",
      "0 0 20px rgba(249, 115, 22, 0.4)",
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
