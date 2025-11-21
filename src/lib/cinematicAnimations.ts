/**
 * Cinematic Animation Variants
 * High-tech, scroll-triggered animations for premium landing pages
 */

import { Variants } from 'framer-motion';

// Custom easing curves
export const cinematicEasing = {
  smooth: [0.25, 1, 0.5, 1],
  dramatic: [0.76, 0, 0.24, 1],
  mechanical: { type: 'spring', stiffness: 80, damping: 15, mass: 0.8 },
};

// Left Slide In - Elegant glide from left
export const leftSlideIn: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: cinematicEasing.smooth,
    },
  },
};

// Right Slide In - Mechanical overshoot from right
export const rightSlideIn: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: cinematicEasing.mechanical,
  },
};

// Staircase Reveal - Parent container
export const staircaseContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Staircase Reveal - Child items with clip path
export const staircaseItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    clipPath: 'inset(100% 0 0 0)',
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 0.6,
      ease: cinematicEasing.smooth,
    },
  },
};

// Cut Reveal - Diagonal sweep background reveal
export const cutReveal: Variants = {
  hidden: {
    clipPath: 'polygon(0 0, 20% 0, 0 100%, 0% 100%)',
  },
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    transition: {
      duration: 1.5,
      ease: cinematicEasing.dramatic,
    },
  },
};

// Pixelated Screen Wipe - Full screen transition overlay
export const pixelatedWipe = {
  initial: {
    scaleY: 0,
    transformOrigin: 'top',
  },
  enter: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.65, 0, 0.35, 1],
    },
  },
  exit: {
    scaleY: 0,
    transformOrigin: 'bottom',
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

// Hero Minimal - Subtle fade and translate on load
export const heroMinimal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: cinematicEasing.smooth,
    },
  },
};

// Glitch Effect - RGB shift for accent elements
export const glitchEffect = {
  initial: {
    filter: 'hue-rotate(0deg)',
  },
  animate: {
    filter: [
      'hue-rotate(0deg)',
      'hue-rotate(5deg)',
      'hue-rotate(-5deg)',
      'hue-rotate(0deg)',
    ],
    transition: {
      duration: 0.3,
      ease: 'linear',
    },
  },
};

// Glow Pulse - Neon accent animation
export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(249, 115, 22, 0.4)',
      '0 0 40px rgba(249, 115, 22, 0.6)',
      '0 0 20px rgba(249, 115, 22, 0.4)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Viewport configuration for scroll triggers
export const viewportConfig = {
  once: true,
  amount: 0.4,
};

// Responsive viewport for smaller elements
export const viewportConfigSmall = {
  once: true,
  amount: 0.2,
};

