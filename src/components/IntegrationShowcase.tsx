/**
 * Integration Showcase Component (inspired by zeroheight.com)
 * Animated integration logos with connection lines
 */

import { motion } from 'framer-motion';
import { staggerContainer, fadeSlideUp } from '@/lib/animations';

interface Integration {
  name: string;
  icon: string;
  category: string;
}

interface IntegrationShowcaseProps {
  integrations: Integration[];
  title?: string;
  subtitle?: string;
}

export default function IntegrationShowcase({ 
  integrations,
  title = "Connect your tools",
  subtitle = "Seamless integrations with your favorite platforms"
}: IntegrationShowcaseProps) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <motion.h2 
          variants={fadeSlideUp}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          {title}
        </motion.h2>
        
        <motion.p 
          variants={fadeSlideUp}
          className="text-lg text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Integration Grid with Connection Visual */}
      <div className="relative">
        {/* Connection lines background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-full h-full opacity-10" viewBox="0 0 800 400">
            {/* Radial connection lines */}
            {integrations.map((_, index) => {
              const angle = (index / integrations.length) * Math.PI * 2;
              const x = 400 + Math.cos(angle) * 200;
              const y = 200 + Math.sin(angle) * 150;
              
              return (
                <motion.line
                  key={index}
                  x1="400"
                  y1="200"
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              );
            })}
          </svg>
        </div>

        {/* Center hub */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-2xl shadow-accent/30 border-4 border-background">
            <span className="text-3xl">🔗</span>
          </div>
        </motion.div>

        {/* Integration Logos */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 relative z-20 pt-32 pb-32"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.43, 0.13, 0.23, 0.96],
                  },
                },
              }}
              whileHover={{ 
                scale: 1.15, 
                y: -8,
                zIndex: 30,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className="relative">
                {/* Integration card */}
                <div className="
                  aspect-square rounded-2xl bg-card/80 backdrop-blur-xl
                  border-2 border-border/50 flex flex-col items-center justify-center
                  p-4 group-hover:border-accent/50 group-hover:shadow-xl 
                  group-hover:shadow-accent/20 transition-all cursor-pointer
                ">
                  {/* Icon */}
                  <div className="text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition-transform">
                    {integration.icon}
                  </div>
                  
                  {/* Name */}
                  <div className="text-xs font-medium text-center text-muted-foreground group-hover:text-accent transition-colors">
                    {integration.name}
                  </div>
                </div>

                {/* Category tag on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                    px-3 py-1 bg-accent text-white text-xs rounded-full
                    opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  {integration.category}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

