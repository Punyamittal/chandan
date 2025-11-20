/**
 * Animated Statistics Counter (inspired by zeroheight.com)
 * Numbers that count up when in viewport
 */

import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import GlassmorphismCard from './GlassmorphismCard';

interface Stat {
  number: number;
  suffix?: string;
  label: string;
  description?: string;
  highlight?: boolean;
}

interface AnimatedStatsProps {
  stats: Stat[];
  layout?: 'horizontal' | 'grid';
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
  });
  
  const display = useTransform(springValue, (current) => 
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  return (
    <div ref={ref} className="inline-flex items-baseline">
      <motion.span>{display}</motion.span>
      {suffix && <span>{suffix}</span>}
    </div>
  );
}

export default function AnimatedStats({ stats, layout = 'grid' }: AnimatedStatsProps) {
  const gridClass = layout === 'horizontal' 
    ? 'flex flex-wrap justify-center gap-12 md:gap-16'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={gridClass}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          {stat.highlight ? (
            <GlassmorphismCard
              variant="accent"
              blur="xl"
              className="p-8 text-center"
              hoverable={true}
              animate={false}
            >
              <StatContent stat={stat} />
            </GlassmorphismCard>
          ) : (
            <div className="text-center">
              <StatContent stat={stat} />
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

function StatContent({ stat }: { stat: Stat }) {
  return (
    <>
      <motion.div
        className={`
          text-5xl sm:text-6xl md:text-7xl font-bold mb-3
          ${stat.highlight ? 'text-white' : 'text-accent'}
        `}
        whileHover={{ scale: 1.05 }}
      >
        <AnimatedNumber value={stat.number} suffix={stat.suffix} />
      </motion.div>
      
      <div className={`
        text-sm sm:text-base uppercase tracking-wider font-semibold mb-2
        ${stat.highlight ? 'text-white/90' : 'text-foreground'}
      `}>
        {stat.label}
      </div>
      
      {stat.description && (
        <div className={`
          text-xs sm:text-sm
          ${stat.highlight ? 'text-white/70' : 'text-muted-foreground'}
        `}>
          {stat.description}
        </div>
      )}
    </>
  );
}

