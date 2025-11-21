/**
 * Creative Animation Variants
 * Unique, aesthetic animations for premium homepage experience
 */

import { Variants } from 'framer-motion';

// ========== DIGITAL GLITCH REVEAL ==========
export const glitchReveal: Variants = {
  hidden: {
    opacity: 0,
    x: [-20, 20, -20, 0],
    filter: 'blur(10px)',
    textShadow: '0 0 0 transparent',
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    textShadow: [
      '2px 2px 0 #ff00ff, -2px -2px 0 #00ffff',
      '0 0 0 transparent',
    ],
    transition: {
      duration: 0.8,
      times: [0, 0.3, 0.6, 1],
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

export const rgbShift: Variants = {
  hidden: {
    opacity: 0,
    textShadow: '5px 0 0 red, -5px 0 0 cyan',
  },
  visible: {
    opacity: 1,
    textShadow: '0 0 0 transparent',
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

export const scanlineGlitch = {
  animate: {
    backgroundPosition: ['0% 0%', '0% 100%'],
    opacity: [0.1, 0.3, 0.1],
    transition: {
      duration: 0.1,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  },
};

// ========== SPRAY PAINT SPLASH ==========
export const paintSplash: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -45,
    filter: 'blur(20px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.68, -0.55, 0.265, 1.55],
    },
  },
};

export const inkSpread: Variants = {
  hidden: {
    clipPath: 'circle(0% at 50% 50%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'circle(150% at 50% 50%)',
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
    },
  },
};

// ========== SKETCH DRAW ==========
export const drawPath = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: 'easeInOut' },
      opacity: { duration: 0.3 },
    },
  },
};

export const sketchReveal: Variants = {
  hidden: {
    strokeDashoffset: 1000,
    strokeDasharray: 1000,
    opacity: 0,
  },
  visible: {
    strokeDashoffset: 0,
    opacity: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

// ========== GRADIENT WAVE WIPE ==========
export const gradientWave: Variants = {
  hidden: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

export const flowingGradient = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// ========== RISE ANIMATION ==========
export const riseUp: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const floatUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

// ========== PAN SLIDE REVEAL ==========
export const panLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    skewX: -5,
  },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      duration: 0.9,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

export const panRight: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
    skewX: 5,
  },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      duration: 0.9,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

// ========== FADE-POP ==========
export const fadePop: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

export const bouncePop: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: [0, 1.2, 1],
    transition: {
      duration: 0.6,
      times: [0, 0.6, 1],
      ease: [0.68, -0.55, 0.265, 1.55],
    },
  },
};

// ========== WIPE TRANSITION ==========
export const curtainWipe: Variants = {
  hidden: {
    clipPath: 'inset(0 50% 0 50%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0 0% 0 0%)',
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

export const maskReveal: Variants = {
  hidden: {
    clipPath: 'circle(0% at 50% 50%)',
  },
  visible: {
    clipPath: 'circle(150% at 50% 50%)',
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

// ========== BLUR-IN ANIMATION ==========
export const blurIn: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(30px)',
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

export const focusIn: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(20px) brightness(0.5)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px) brightness(1)',
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

// ========== TUMBLE ROTATION ==========
export const tumble: Variants = {
  hidden: {
    opacity: 0,
    rotate: -180,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.68, -0.55, 0.265, 1.55],
    },
  },
};

export const spinIn: Variants = {
  hidden: {
    opacity: 0,
    rotate: 360,
    scale: 0,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// ========== CORNER EXPANSION ==========
export const expandFromCorner: Variants = {
  hidden: {
    clipPath: 'polygon(100% 0, 100% 0, 100% 0, 100% 0)',
    opacity: 0,
  },
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

export const cornerGrow: Variants = {
  hidden: {
    clipPath: 'circle(0% at 0% 0%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'circle(150% at 0% 0%)',
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

// ========== PARALLAX HELPERS ==========
export const parallaxSlow = (scrollY: any, range: number[]) => ({
  y: scrollY,
  transition: { duration: 0 },
});

export const parallaxFast = (scrollY: any, multiplier: number = 0.5) => ({
  y: scrollY * multiplier,
  transition: { duration: 0 },
});

// ========== MICRO-INTERACTIONS ==========
export const shimmerHover = {
  rest: {
    backgroundPosition: '200% center',
  },
  hover: {
    backgroundPosition: '-200% center',
    transition: {
      duration: 1.5,
      ease: 'linear',
    },
  },
};

export const glowHover = {
  rest: {
    boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
  },
  hover: {
    boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
    transition: {
      duration: 0.3,
    },
  },
};

export const tiltHover = {
  rest: {
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    rotateX: 5,
    rotateY: 5,
    transition: {
      duration: 0.3,
    },
  },
};

// ========== STAGGER CONTAINERS ==========
export const staggerFast = {
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerMedium = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerSlow = {
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

// ========== VIEWPORT CONFIG ==========
export const viewportOnce = {
  once: true,
  amount: 0.3,
  margin: '-10%',
};

export const viewportRepeat = {
  once: false,
  amount: 0.3,
  margin: '-10%',
};

