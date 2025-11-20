/**
 * Reusable Framer Motion Animation Variants
 * Premium animations with smooth easing and optimal performance
 */

import { Variants } from "framer-motion";

// Easing curves for premium feel
export const easing = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  bouncy: [0.68, -0.55, 0.265, 1.55],
  soft: [0.25, 0.46, 0.45, 0.94],
  spring: { type: "spring", stiffness: 100, damping: 15 },
};

// Fade & Slide Up (most common entrance)
export const fadeSlideUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easing.smooth,
    },
  },
};

// Staggered Children Animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Scale & Fade In
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    filter: "blur(10px)",
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easing.smooth,
    },
  },
};

// Parallax Layer Variants (for depth)
export const parallaxLayer = (depth: number): Variants => ({
  hidden: { opacity: 0, y: depth * 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1 + depth * 0.2,
      ease: easing.soft,
    },
  },
});

// Floating Animation (for badges, icons)
export const floating = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Rotate & Scale (for 3D-like effects)
export const rotateScale: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.5, 
    rotateY: -45,
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotateY: 0,
    transition: {
      duration: 1,
      ease: easing.bouncy,
    },
  },
};

// Slide from sides
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easing.smooth,
    },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easing.smooth,
    },
  },
};

// Hover animations for interactive elements
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: easing.smooth },
};

export const hoverLift = {
  y: -8,
  scale: 1.02,
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  transition: { duration: 0.3, ease: easing.smooth },
};

export const hoverGlow = {
  boxShadow: "0 0 30px rgba(214, 129, 79, 0.6)",
  transition: { duration: 0.3 },
};

// Button micro-interactions
export const buttonTap = {
  scale: 0.95,
  transition: { duration: 0.1 },
};

// Card reveal animation
export const cardReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 50,
    rotateX: -15,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easing.smooth,
    },
  },
};

// Shimmer effect for text
export const shimmer = {
  backgroundPosition: ["200% 0", "-200% 0"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "linear",
  },
};

// Magnetic cursor effect values
export const magneticStrength = 0.3;

// Scroll-triggered animation thresholds
export const scrollThresholds = {
  once: true, // Animate only once
  amount: 0.3, // Trigger when 30% visible
  margin: "-100px", // Trigger slightly before entering viewport
};
