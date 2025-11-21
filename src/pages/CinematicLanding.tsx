import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  leftSlideIn,
  rightSlideIn,
  staircaseContainer,
  staircaseItem,
  cutReveal,
  pixelatedWipe,
  heroMinimal,
  glowPulse,
  viewportConfig,
  viewportConfigSmall,
} from "@/lib/cinematicAnimations";
import {
  Zap,
  Shield,
  Layers,
  TrendingUp,
  Code,
  Sparkles,
  Database,
  Lock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CinematicLanding = () => {
  const { currentTheme } = useTheme();
  const [showWipe, setShowWipe] = useState(false);

  const triggerWipe = () => {
    setShowWipe(true);
    setTimeout(() => setShowWipe(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Pixelated Screen Wipe Overlay */}
      <AnimatePresence>
        {showWipe && (
          <motion.div
            variants={pixelatedWipe}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed inset-0 z-[9999] bg-black"
            style={{
              backgroundImage:
                'linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)',
              backgroundSize: '4px 4px',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
              >
                TRANSITIONING
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />

      <main className="relative z-10">
        {/* Hero Section - Minimal Animation */}
        <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative">
          <motion.div
            variants={heroMinimal}
            initial="hidden"
            animate="visible"
            className="text-center max-w-5xl"
          >
            {/* Glowing Badge */}
            <motion.div
              animate={glowPulse.animate}
              className="inline-block mb-8 px-6 py-2 rounded-full border border-purple-500/30 bg-purple-500/5"
            >
              <span className="text-sm font-medium text-purple-300">
                Next-Gen Technology Stack
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Cinematic
              </span>
              <br />
              <span className="text-white">Experience</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Premium scroll-triggered animations that transform your landing pages
              into immersive, high-tech narratives
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 h-14 px-8 text-lg group"
              >
                Explore Features
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/30 text-white hover:bg-purple-500/10 h-14 px-8 text-lg"
                onClick={triggerWipe}
              >
                Demo Transition
              </Button>
            </div>

            {/* Floating Accent Elements */}
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </motion.div>
        </section>

        {/* Section A - Alternating Slide (Text Left, Image Right) */}
        <section className="min-h-screen flex items-center py-20 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Text - Left Slide In */}
              <motion.div
                variants={leftSlideIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                <div className="inline-block mb-4 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5">
                  <span className="text-xs font-medium text-cyan-300">
                    FEATURE HIGHLIGHT
                  </span>
                </div>

                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-white">Precision</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Engineering
                  </span>
                </h2>

                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Advanced scroll-triggered animations built with Framer Motion's
                  whileInView API. Each element enters the viewport with
                  meticulously crafted timing and easing curves for a premium feel.
                </p>

                <ul className="space-y-4">
                  {[
                    'Custom cubic-bezier easing functions',
                    'Spring physics with mechanical overshoot',
                    'Viewport-optimized performance',
                    'Mobile-responsive breakpoints',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <ChevronRight className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Image - Right Slide In */}
              <motion.div
                variants={rightSlideIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-8 backdrop-blur-sm">
                  <div className="aspect-square bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-xl flex items-center justify-center">
                    <Code className="w-32 h-32 text-purple-300" />
                  </div>
                  {/* Glowing Edges */}
                  <div className="absolute inset-0 rounded-2xl border border-purple-500/30 pointer-events-none" />
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl -z-10" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section B - Alternating Slide Reversed (Image Left, Text Right) */}
        <section className="min-h-screen flex items-center py-20 px-6 bg-gradient-to-b from-transparent to-purple-900/5">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Image - Right Slide In (from right, on left side) */}
              <motion.div
                variants={rightSlideIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="relative order-2 md:order-1"
              >
                <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8 backdrop-blur-sm">
                  <div className="aspect-square bg-gradient-to-br from-cyan-900/50 to-purple-900/50 rounded-xl flex items-center justify-center">
                    <Database className="w-32 h-32 text-cyan-300" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-cyan-500/30 pointer-events-none" />
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl -z-10" />
                </div>
              </motion.div>

              {/* Text - Left Slide In */}
              <motion.div
                variants={leftSlideIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="order-1 md:order-2"
              >
                <div className="inline-block mb-4 px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/5">
                  <span className="text-xs font-medium text-purple-300">
                    PERFORMANCE
                  </span>
                </div>

                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-white">Optimized</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Execution
                  </span>
                </h2>

                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Built for performance without sacrificing visual impact. GPU-accelerated
                  transforms, lazy loading, and viewport detection ensure smooth 60fps
                  animations across all devices.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Load Time', value: '< 1s' },
                    { label: 'Frame Rate', value: '60 FPS' },
                    { label: 'Bundle Size', value: 'Minimal' },
                    { label: 'Devices', value: 'All' },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5"
                    >
                      <div className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section C - Staircase Reveal (Feature Grid) */}
        <section className="min-h-screen flex items-center py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfigSmall}
                className="inline-block mb-4 px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/5"
              >
                <span className="text-xs font-medium text-purple-300">
                  COMPLETE TOOLKIT
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfigSmall}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Feature Arsenal
                </span>
              </motion.h2>
            </div>

            {/* Staircase Grid */}
            <motion.div
              variants={staircaseContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  desc: 'Optimized for instant load times',
                },
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  desc: 'Bank-grade protection',
                },
                {
                  icon: Layers,
                  title: 'Layered Design',
                  desc: 'Depth and hierarchy',
                },
                {
                  icon: TrendingUp,
                  title: 'Analytics Ready',
                  desc: 'Track every interaction',
                },
                {
                  icon: Code,
                  title: 'Developer First',
                  desc: 'Clean, modular codebase',
                },
                {
                  icon: Sparkles,
                  title: 'Pixel Perfect',
                  desc: 'Attention to detail',
                },
                {
                  icon: Database,
                  title: 'Scalable',
                  desc: 'Grow without limits',
                },
                {
                  icon: Lock,
                  title: 'Privacy Focused',
                  desc: 'Your data, your control',
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={staircaseItem}
                  className="relative group"
                >
                  <div className="p-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 hover:border-purple-500/40 transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-purple-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                  {/* Hover glow */}
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section D - Cinematic Cut Reveal */}
        <section className="relative min-h-screen flex items-center py-20 px-6 overflow-hidden">
          {/* Cut Reveal Background */}
          <motion.div
            variants={cutReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-cyan-900/20 to-purple-900/30"
          />

          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportConfig}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="inline-block mb-6 px-6 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
                  <span className="text-sm font-medium text-purple-300">
                    READY TO START?
                  </span>
                </div>

                <h2 className="text-6xl md:text-7xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                    Transform Your Vision
                  </span>
                </h2>

                <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
                  Experience the future of web design with scroll-triggered animations
                  that captivate and convert.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 h-16 px-10 text-lg group"
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-500/30 text-white hover:bg-purple-500/10 h-16 px-10 text-lg backdrop-blur-sm"
                    onClick={triggerWipe}
                  >
                    View Demo Again
                  </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-purple-500/20">
                  {[
                    { value: '60 FPS', label: 'Smooth Animations' },
                    { value: '< 100ms', label: 'Response Time' },
                    { value: '100%', label: 'Responsive' },
                  ].map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CinematicLanding;

