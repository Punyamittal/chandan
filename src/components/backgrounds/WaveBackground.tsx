/**
 * Wave Background Animation
 * Animated SVG waves with gradient fills
 */

import { motion } from 'framer-motion';
import { Theme } from '@/lib/themes';

interface WaveBackgroundProps {
  theme: Theme;
  className?: string;
}

export default function WaveBackground({ theme, className = '' }: WaveBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.colors.primary} stopOpacity="0.2" />
            <stop offset="100%" stopColor={theme.colors.secondary} stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.colors.secondary} stopOpacity="0.15" />
            <stop offset="100%" stopColor={theme.colors.accent} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Wave 1 */}
        <motion.path
          d="M0,400 C240,300 480,500 720,400 C960,300 1200,500 1440,400 L1440,800 L0,800 Z"
          fill="url(#waveGradient1)"
          animate={{
            d: [
              "M0,400 C240,300 480,500 720,400 C960,300 1200,500 1440,400 L1440,800 L0,800 Z",
              "M0,450 C240,350 480,450 720,350 C960,450 1200,350 1440,450 L1440,800 L0,800 Z",
              "M0,400 C240,300 480,500 720,400 C960,300 1200,500 1440,400 L1440,800 L0,800 Z",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Wave 2 */}
        <motion.path
          d="M0,500 C240,600 480,400 720,500 C960,600 1200,400 1440,500 L1440,800 L0,800 Z"
          fill="url(#waveGradient2)"
          animate={{
            d: [
              "M0,500 C240,600 480,400 720,500 C960,600 1200,400 1440,500 L1440,800 L0,800 Z",
              "M0,450 C240,550 480,450 720,550 C960,450 1200,550 1440,450 L1440,800 L0,800 Z",
              "M0,500 C240,600 480,400 720,500 C960,600 1200,400 1440,500 L1440,800 L0,800 Z",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </svg>
    </div>
  );
}

