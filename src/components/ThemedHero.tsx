/**
 * Themed Hero Component
 * Dynamic hero with theme-based backgrounds and animations
 */

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Theme } from '@/lib/themes';
import AnimatedBadge from './AnimatedBadge';
import ParticleField from './backgrounds/ParticleField';
import FloatingBlobs from './backgrounds/FloatingBlobs';
import WaveBackground from './backgrounds/WaveBackground';
import GradientOrbs from './backgrounds/GradientOrbs';
import Particles3D from './backgrounds/Particles3D';
import { zoomIn, slideScale, popEffect, textShimmer } from '@/lib/advancedAnimations';

interface ThemedHeroProps {
  theme: Theme;
  backgroundType?: 'particles' | 'blobs' | 'waves' | 'orbs' | '3d';
}

export default function ThemedHero({ theme, backgroundType = 'orbs' }: ThemedHeroProps) {
  const renderBackground = () => {
    switch (backgroundType) {
      case 'particles':
        return <ParticleField count={100} theme={theme.id === 'minimalWhite' ? 'light' : 'dark'} />;
      case 'blobs':
        return <FloatingBlobs theme={theme} count={4} />;
      case 'waves':
        return <WaveBackground theme={theme} />;
      case '3d':
        return <Particles3D theme={theme} count={1500} />;
      default:
        return <GradientOrbs theme={theme} count={5} />;
    }
  };

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: theme.colors.background }}
    >
      {/* Dynamic Background */}
      {renderBackground()}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          {/* Floating Badges */}
          <motion.div 
            variants={slideScale}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <AnimatedBadge icon={Sparkles} variant="accent" delay={0.2}>
              Premium Quality
            </AnimatedBadge>
            <AnimatedBadge icon={Zap} variant="primary" delay={0.3}>
              Fast Delivery
            </AnimatedBadge>
            <AnimatedBadge icon={Star} variant="primary" delay={0.4}>
              15+ Years
            </AnimatedBadge>
          </motion.div>

          {/* Hero Title with Gradient & Shimmer */}
          <motion.h1
            variants={zoomIn}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 leading-tight"
            style={{ color: theme.colors.foreground }}
          >
            <span className="block mb-2">Shaping Print</span>
            
            {/* Gradient animated text */}
            <motion.span 
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: theme.gradients.accent,
                backgroundSize: '200% auto',
              }}
              variants={textShimmer}
              animate="animate"
            >
              Excellence
            </motion.span>
            
            <span 
              className="block text-4xl sm:text-5xl md:text-6xl mt-4"
              style={{ color: theme.colors.muted }}
            >
              Worldwide
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={slideScale}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 leading-relaxed max-w-4xl mx-auto"
            style={{ color: theme.colors.muted }}
          >
            Premium printing stationery and bulk trading solutions.
            <span 
              className="font-medium"
              style={{ color: theme.colors.foreground }}
            > From letterheads to custom packaging</span>, 
            we deliver precision in every print.
          </motion.p>

          {/* CTA Buttons with Micro-interactions */}
          <motion.div
            variants={popEffect}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/products">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden"
              >
                <Button 
                  size="lg" 
                  className="relative z-10 px-8 py-6 text-base sm:text-lg"
                  style={{
                    background: theme.colors.accent,
                    color: theme.colors.background,
                    boxShadow: theme.effects.shadow,
                  }}
                >
                  <span className="flex items-center gap-2">
                    Explore Products
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                
                {/* Hover shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </Link>
            
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-6 text-base sm:text-lg border-2 backdrop-blur-sm"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.foreground,
                    background: `${theme.colors.card}ee`,
                  }}
                >
                  Get Quote
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats Grid with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {[
              { number: '15+', label: 'Years Experience', icon: '🏆' },
              { number: '10K+', label: 'Orders Delivered', icon: '📦' },
              { number: '500+', label: 'Products', icon: '🎨' },
              { number: '4.9', label: 'Rating', icon: '⭐' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-2xl backdrop-blur-sm border-2"
                style={{
                  background: `${theme.colors.card}dd`,
                  borderColor: `${theme.colors.border}88`,
                }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div 
                  className="text-3xl sm:text-4xl font-bold mb-2"
                  style={{ color: theme.colors.accent }}
                >
                  {stat.number}
                </div>
                <div 
                  className="text-xs sm:text-sm uppercase tracking-wider"
                  style={{ color: theme.colors.muted }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 rounded-full flex justify-center pt-2"
          style={{ borderColor: `${theme.colors.muted}80` }}
        >
          <motion.div
            animate={{ opacity: [1, 0], y: [0, 20] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 rounded-full"
            style={{ background: theme.colors.accent }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

