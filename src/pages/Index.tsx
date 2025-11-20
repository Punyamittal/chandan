/**
 * Multi-Theme Animated Landing Page
 * Features: Dynamic themes, advanced animations, 3D effects, zoom reveals
 */

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemedHero from "@/components/ThemedHero";
import ZoomRevealSection from "@/components/ZoomRevealSection";
import AnimatedFeatureCard from "@/components/AnimatedFeatureCard";
import AnimatedStats from "@/components/AnimatedStats";
import CaseStudyCard from "@/components/CaseStudyCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, Zap, Award, Users, TrendingUp, Globe,
  Printer, Package, CheckCircle, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggeredGrid, gridItem, zoomIn, slideScale } from "@/lib/advancedAnimations";
import GradientOrbs from "@/components/backgrounds/GradientOrbs";
import ParticleField from "@/components/backgrounds/ParticleField";
import { useTheme } from "@/contexts/ThemeContext";

const Index = () => {
  const { currentTheme } = useTheme();

  const stats = [
    {
      number: 15,
      suffix: '+',
      label: 'Years Experience',
      description: 'In the printing industry',
    },
    {
      number: 10000,
      suffix: '+',
      label: 'Projects Delivered',
      description: 'Across 19 countries',
      highlight: true,
    },
    {
      number: 500,
      suffix: '+',
      label: 'Product Range',
      description: 'Printing solutions available',
    },
    {
      number: 98,
      suffix: '%',
      label: 'Client Satisfaction',
      description: 'Based on customer feedback',
    },
  ];

  const caseStudies = [
    {
      company: 'TechCorp Solutions',
      industry: 'Technology',
      logo: '💻',
      stat: { value: '5,000+', label: 'Business cards printed monthly' },
      description: 'Streamlined their corporate branding with consistent, high-quality printing across 15 global offices.',
      link: '#',
    },
    {
      company: 'GreenLeaf Retail',
      industry: 'Retail & E-commerce',
      logo: '🌿',
      stat: { value: '40%', label: 'Cost savings achieved' },
      description: 'Reduced packaging costs while improving sustainability with our eco-friendly printing solutions.',
      link: '#',
    },
    {
      company: 'Summit Finance',
      industry: 'Financial Services',
      logo: '📊',
      stat: { value: '72hrs', label: 'Average delivery time' },
      description: 'Fast-tracked corporate stationery needs with our express bulk ordering and priority shipping.',
      link: '#',
    },
  ];

  return (
    <div 
      className="min-h-screen overflow-x-hidden"
      style={{ background: currentTheme.colors.background }}
    >
      <Navigation />
      
      {/* Themed Hero Section */}
      <ThemedHero theme={currentTheme} backgroundType="orbs" />

      {/* Stats Section with Zoom Reveal */}
      <ZoomRevealSection theme={currentTheme} zoomIntensity="medium">
        <div className="relative py-20 md:py-32">
          {/* Background particles */}
          <ParticleField 
            count={30} 
            theme={currentTheme.id === 'minimalWhite' ? 'light' : 'dark'} 
          />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              variants={zoomIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
              style={{ color: currentTheme.colors.foreground }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Trusted by <span style={{ color: currentTheme.colors.accent }}>thousands</span> worldwide
              </h2>
              <p 
                className="text-lg max-w-2xl mx-auto"
                style={{ color: currentTheme.colors.muted }}
              >
                Delivering excellence in every print since 2009
              </p>
            </motion.div>

            <AnimatedStats stats={stats} layout="grid" />
          </div>
        </div>
      </ZoomRevealSection>

      {/* Features Section with Zoom Reveal */}
      <ZoomRevealSection theme={currentTheme} zoomIntensity="strong">
        <div className="relative py-20 md:py-32">
          {/* Gradient background */}
          <GradientOrbs theme={currentTheme} count={3} />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              variants={slideScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                style={{ color: currentTheme.colors.foreground }}
              >
                Premium <span style={{ color: currentTheme.colors.accent }}>Print Solutions</span>
              </h2>
              
              <p 
                className="text-lg sm:text-xl max-w-3xl mx-auto"
                style={{ color: currentTheme.colors.muted }}
              >
                Experience excellence in every print with our state-of-the-art facilities
              </p>
            </motion.div>

            <motion.div
              variants={staggeredGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { icon: Shield, title: 'Premium Quality', description: 'Industry-leading printing standards with rigorous quality control processes.' },
                { icon: Zap, title: 'Fast Turnaround', description: 'Swift production and delivery without compromising quality.' },
                { icon: Award, title: '15+ Years Experience', description: 'Over a decade of printing excellence serving thousands of satisfied clients.' },
                { icon: Users, title: 'Expert Support', description: 'Dedicated team of printing specialists ready to assist you.' },
                { icon: TrendingUp, title: 'Bulk Discounts', description: 'Competitive pricing for bulk orders with flexible payment options.' },
                { icon: Globe, title: 'Global Delivery', description: 'Reliable shipping to destinations worldwide with tracking.' },
              ].map((feature, index) => (
                <motion.div key={index} variants={gridItem}>
                  <AnimatedFeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </ZoomRevealSection>

      {/* Why Choose Us Section */}
      <ZoomRevealSection theme={currentTheme} zoomIntensity="medium">
        <div className="relative py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={zoomIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                style={{ color: currentTheme.colors.foreground }}
              >
                Why Choose <span style={{ color: currentTheme.colors.accent }}>Us</span>
              </h2>
            </motion.div>

            <motion.div
              variants={staggeredGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { icon: Zap, title: 'Fast', description: 'Express production available' },
                { icon: CheckCircle, title: 'Precise', description: 'Color-accurate printing' },
                { icon: Shield, title: 'Guaranteed', description: '100% satisfaction policy' },
                { icon: Clock, title: 'On-Time', description: 'Reliable scheduling' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={gridItem}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-8 rounded-2xl backdrop-blur-sm border-2 text-center"
                  style={{
                    background: `${currentTheme.colors.card}ee`,
                    borderColor: `${currentTheme.colors.border}88`,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mb-6"
                  >
                    <div 
                      className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center border"
                      style={{
                        background: currentTheme.gradients.card,
                        borderColor: `${currentTheme.colors.accent}33`,
                      }}
                    >
                      <item.icon className="w-8 h-8" style={{ color: currentTheme.colors.accent }} />
                    </div>
                  </motion.div>

                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: currentTheme.colors.foreground }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: currentTheme.colors.muted }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </ZoomRevealSection>

      {/* Case Studies Section */}
      <ZoomRevealSection theme={currentTheme} zoomIntensity="strong">
        <div className="relative py-20 md:py-32">
          <GradientOrbs theme={currentTheme} count={4} />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              variants={slideScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                style={{ color: currentTheme.colors.foreground }}
              >
                Customer <span style={{ color: currentTheme.colors.accent }}>Success Stories</span>
              </h2>
              
              <p 
                className="text-lg sm:text-xl max-w-3xl mx-auto"
                style={{ color: currentTheme.colors.muted }}
              >
                See how businesses like yours have transformed with our solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <CaseStudyCard key={index} caseStudy={study} index={index} />
              ))}
            </div>
          </div>
        </div>
      </ZoomRevealSection>

      {/* Product Categories */}
      <ZoomRevealSection theme={currentTheme} zoomIntensity="medium">
        <div className="relative py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              variants={zoomIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                style={{ color: currentTheme.colors.foreground }}
              >
                Browse by <span style={{ color: currentTheme.colors.accent }}>Category</span>
              </h2>
            </motion.div>

            <motion.div
              variants={staggeredGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {[
                { icon: Printer, name: 'Letterheads', emoji: '📄' },
                { icon: Package, name: 'Business Cards', emoji: '💳' },
                { icon: Package, name: 'Packaging', emoji: '📦' },
                { icon: Package, name: 'Labels', emoji: '🏷️' },
                { icon: Printer, name: 'Brochures', emoji: '📰' },
                { icon: Package, name: 'Envelopes', emoji: '✉️' },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={gridItem}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Link to="/products">
                    <div 
                    className="p-6 rounded-2xl backdrop-blur-sm border-2 text-center cursor-pointer"
                    style={{
                      background: `${currentTheme.colors.card}ee`,
                      borderColor: `${currentTheme.colors.border}88`,
                    }}
                    >
                      <div className="text-5xl mb-3">{category.emoji}</div>
                      <div 
                        className="text-sm font-medium"
                        style={{ color: currentTheme.colors.foreground }}
                      >
                        {category.name}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </ZoomRevealSection>

      {/* Final CTA */}
      <ZoomRevealSection theme={currentTheme} zoomIntensity="subtle" sticky={false}>
        <div className="relative py-32">
          <GradientOrbs theme={currentTheme} count={6} />

          <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
            <motion.div
              variants={slideScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
                style={{ color: currentTheme.colors.foreground }}
              >
                Ready to elevate your
                <br />
                <span style={{ color: currentTheme.colors.accent }}>print experience?</span>
              </h2>
              
              <p 
                className="text-lg sm:text-xl md:text-2xl mb-12"
                style={{ color: currentTheme.colors.muted }}
              >
                Let's create something amazing together
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="px-12 py-8 text-xl"
                      style={{
                        background: currentTheme.colors.accent,
                        color: currentTheme.colors.background,
                        boxShadow: currentTheme.effects.shadow,
                      }}
                    >
                      Get Started Now
                    </Button>
                  </motion.div>
                </Link>
                
                <Link to="/products">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="px-12 py-8 text-xl border-2 backdrop-blur-sm"
                      style={{
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.foreground,
                        background: `${currentTheme.colors.card}ee`,
                      }}
                    >
                      Browse Products
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </ZoomRevealSection>

      <Footer />
    </div>
  );
};

export default Index;
