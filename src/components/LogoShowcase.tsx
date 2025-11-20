/**
 * Logo Showcase Component (inspired by zeroheight.com)
 * Animated logo grid with hover effects
 */

import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';

interface Logo {
  name: string;
  icon: string; // Emoji or image path
}

interface LogoShowcaseProps {
  title?: string;
  subtitle?: string;
  logos: Logo[];
  variant?: 'default' | 'grayscale';
}

export default function LogoShowcase({ 
  title = "Trusted by industry leaders",
  subtitle,
  logos,
  variant = 'default' 
}: LogoShowcaseProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {title && (
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-muted-foreground">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* Logo Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
      >
        {logos.map((logo, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.5,
                  ease: [0.43, 0.13, 0.23, 0.96],
                },
              },
            }}
            whileHover={{ 
              scale: 1.1, 
              y: -5,
              transition: { duration: 0.2 }
            }}
            className={`
              aspect-square rounded-xl bg-card/50 backdrop-blur-xl
              border border-border/50 flex items-center justify-center
              group cursor-pointer hover:border-accent/50 transition-colors
              ${variant === 'grayscale' ? 'grayscale hover:grayscale-0' : ''}
            `}
          >
            {/* Logo content */}
            <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform">
              {logo.icon}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

