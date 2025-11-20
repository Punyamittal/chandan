/**
 * Advanced Animation Variants
 * Premium animations with spring physics and custom easing
 */

import { Variants } from 'framer-motion';

// Advanced Easing Curves
export const advancedEasing = {
  // Premium smooth cubic bezier
  premium: [0.6, 0.01, 0.05, 0.95],
  // Dramatic entrance
  dramatic: [0.87, 0, 0.13, 1],
  // Bouncy spring
  springy: { type: 'spring', stiffness: 400, damping: 25 },
  // Soft elastic
  elastic: { type: 'spring', stiffness: 200, damping: 12 },
  // Anticipation
  anticipate: [0.68, -0.55, 0.265, 1.55],
};

// Zoom In Reveal
export const zoomIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    filter: 'blur(20px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: advancedEasing.premium,
    },
  },
};

// Pop Effect
export const popEffect: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: advancedEasing.springy,
  },
};

// Slide Scale (zoom + slide combination)
export const slideScale: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: advancedEasing.dramatic,
    },
  },
};

// 3D Flip In
export const flipIn: Variants = {
  hidden: {
    opacity: 0,
    rotateX: -90,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: advancedEasing.premium,
    },
  },
};

// Magnetic Hover Effect
export const magneticHover = {
  hover: {
    scale: 1.05,
    transition: advancedEasing.elastic,
  },
  tap: {
    scale: 0.95,
  },
};

// Glow Pulse Animation
export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(138, 43, 226, 0.3)',
      '0 0 60px rgba(138, 43, 226, 0.6)',
      '0 0 20px rgba(138, 43, 226, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Text Shimmer
export const textShimmer: Variants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Morph Shape
export const morphShape = {
  animate: {
    borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Staggered Grid
export const staggeredGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

// Grid Item
export const gridItem: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: advancedEasing.elastic,
  },
};

// Spiral In
export const spiralIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: advancedEasing.premium,
    },
  },
};

// Wave Stagger
export const waveStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
};

// Wave Item
export const waveItem: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

// Parallax Layer Generator
export const parallaxLayer = (depth: number): Variants => ({
  hidden: { opacity: 0, y: depth * 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1 + depth * 0.2,
      ease: advancedEasing.premium,
    },
  },
});

// Liquid Morph
export const liquidMorph = {
  animate: {
    scale: [1, 1.05, 0.95, 1],
    rotate: [0, 2, -2, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Aurora Glow
export const auroraGlow = {
  animate: {
    background: [
      'linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0)',
      'linear-gradient(90deg, #ff8c00, #40e0d0, #ff0080)',
      'linear-gradient(135deg, #40e0d0, #ff0080, #ff8c00)',
      'linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0)',
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Scale Rotate
export const scaleRotate: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -45,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: advancedEasing.elastic,
    },
  },
};

// Hover Shine Effect
export const hoverShine = {
  hover: {
    background: [
      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%) 0% 0% / 200% 100%',
      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%) 100% 0% / 200% 100%',
    ],
    transition: {
      duration: 0.6,
    },
  },
};

// Perspective Flip
export const perspectiveFlip: Variants = {
  hidden: {
    opacity: 0,
    rotateY: 90,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: advancedEasing.premium,
    },
  },
};

// Viewport Animation Config
export const viewportConfig = {
  once: true,
  amount: 0.3,
  margin: '-10%',
};

