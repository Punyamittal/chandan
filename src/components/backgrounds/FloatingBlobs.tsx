/**
 * Floating Blobs Background
 * Animated gradient blobs with blur effect
 */

import { motion } from 'framer-motion';
import { Theme } from '@/lib/themes';

interface FloatingBlobsProps {
  theme: Theme;
  count?: number;
  className?: string;
}

export default function FloatingBlobs({ theme, count = 3, className = '' }: FloatingBlobsProps) {
  const blobs = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 400 + 300,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    delay: i * 2,
  }));

  const getBlobGradient = (index: number) => {
    const colors = [
      theme.colors.primary,
      theme.colors.secondary,
      theme.colors.accent,
    ];
    return colors[index % colors.length];
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      {blobs.map((blob, index) => (
        <motion.div
          key={blob.id}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: `${blob.initialX}%`,
            top: `${blob.initialY}%`,
            background: `radial-gradient(circle, ${getBlobGradient(index)}, transparent)`,
            filter: theme.effects.blur,
            opacity: 0.3,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

