/**
 * Premium Animated Hero Section
 * Features: Glassmorphism, 3D objects, parallax, smooth animations
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Floating3DObject from './Floating3DObject';
import AnimatedBadge from './AnimatedBadge';
import GlassmorphismCard from './GlassmorphismCard';
import { staggerContainer, fadeSlideUp, slideInLeft, slideInRight } from '@/lib/animations';

export default function PremiumHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Animated Background Layers */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl"
        />
        
        {/* Floating Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(214, 129, 79, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(214, 129, 79, 0.3) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </motion.div>

      {/* 3D Object - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/4 right-0 w-[400px] h-[400px] hidden lg:block"
      >
        <Floating3DObject type="sphere" />
      </motion.div>

      {/* 3D Object - Left Side (smaller) */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.7 }}
        className="absolute bottom-1/4 left-0 w-[250px] h-[250px] hidden lg:block"
      >
        <Floating3DObject type="torus" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ scale }}
        className="relative z-10 container mx-auto px-4 sm:px-6 pt-32 sm:pt-40 md:pt-48 pb-20"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Floating Badges */}
          <motion.div 
            variants={fadeSlideUp}
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

          {/* Hero Title with Gradient */}
          <motion.h1
            variants={fadeSlideUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="block mb-2">Shaping Print</span>
            <span 
              className="block bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent animate-shimmer"
              style={{
                backgroundSize: '200% auto',
              }}
            >
              Excellence
            </span>
            <span className="block text-muted-foreground text-4xl sm:text-5xl md:text-6xl mt-4">
              Worldwide
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeSlideUp}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Premium printing stationery and bulk trading solutions. 
            <span className="text-foreground font-medium"> From letterheads to custom packaging</span>, 
            we deliver precision in every print.
          </motion.p>

          {/* CTA Buttons with Micro-interactions */}
          <motion.div
            variants={fadeSlideUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/products">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Button 
                  size="lg" 
                  className="relative overflow-hidden bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base shadow-xl shadow-accent/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Products
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
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
                  className="border-2 border-border hover:border-accent hover:bg-accent/10 px-8 py-6 text-base backdrop-blur-xl"
                >
                  Get Quote
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats Cards with Glassmorphism */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { number: '15+', label: 'Years Experience', icon: '🏆' },
              { number: '10K+', label: 'Orders Delivered', icon: '📦' },
              { number: '500+', label: 'Products', icon: '🎨' },
              { number: '4.9', label: 'Rating', icon: '⭐' },
            ].map((stat, index) => (
              <GlassmorphismCard
                key={index}
                variant="light"
                blur="xl"
                className="p-6 group"
                animate={true}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              </GlassmorphismCard>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

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
          className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0], y: [0, 20] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-accent rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

