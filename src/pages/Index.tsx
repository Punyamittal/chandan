/**
 * Chandan Trading - Cinematic Landing Page
 * Premium printing services with high-tech cinematic animations
 */

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  leftSlideIn,
  rightSlideIn,
  staircaseContainer,
  staircaseItem,
  cutReveal,
  heroMinimal,
  glowPulse,
  viewportConfig,
  viewportConfigSmall,
} from "@/lib/cinematicAnimations";
import { AnimatedText, AnimatedHeading } from "@/components/AnimatedText";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StatCard } from "@/components/StatCard";
import { CategoryDisplay } from "@/components/CategoryDisplay";
// import FluidGlassSafe from "@/components/FluidGlassSafe"; // Uncomment when 3D models are added
import { staggerContainer } from "@/lib/advancedAnimations";
import {
  Printer,
  Package,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Globe,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  ChevronRight,
  FileText,
  CreditCard,
  Box,
  Tag,
  Newspaper,
  Mail,
  Laptop,
  Leaf,
  BarChart3,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";

const Index = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    { icon: FileText, name: "Letterheads", color: "orange" },
    { icon: CreditCard, name: "Business Cards", color: "white" },
    { icon: Box, name: "Packaging", color: "orange" },
    { icon: Tag, name: "Labels", color: "white" },
    { icon: Newspaper, name: "Brochures", color: "orange" },
    { icon: Mail, name: "Envelopes", color: "white" },
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast Express Production",
      desc: "Quick turnaround without compromising quality",
    },
    {
      icon: CheckCircle,
      title: "Precise Color-Accurate",
      desc: "Industry-leading printing standards",
    },
    {
      icon: Shield,
      title: "100% Satisfaction Policy",
      desc: "Guaranteed quality on every order",
    },
    {
      icon: Clock,
      title: "On-Time Reliable Scheduling",
      desc: "Dependable delivery you can count on",
    },
    {
      icon: Award,
      title: "15+ Years Experience",
      desc: "Over a decade of printing excellence",
    },
    {
      icon: Globe,
      title: "Global Delivery",
      desc: "Reliable shipping worldwide with tracking",
    },
    {
      icon: Package,
      title: "Bulk Discounts",
      desc: "Competitive pricing for large orders",
    },
    {
      icon: Users,
      title: "Expert Support",
      desc: "Dedicated specialists ready to assist",
    },
  ];

  const caseStudies = [
    {
      company: "TechCorp Solutions",
      industry: "Technology",
      icon: Laptop,
      stat: { value: "5,000+", label: "Business cards printed monthly" },
      description:
        "Streamlined their corporate branding with consistent, high-quality printing across 15 global offices.",
    },
    {
      company: "GreenLeaf Retail",
      industry: "Retail & E-commerce",
      icon: Leaf,
      stat: { value: "40%", label: "Cost savings achieved" },
      description:
        "Reduced packaging costs while improving sustainability with our eco-friendly printing solutions.",
    },
    {
      company: "Summit Finance",
      industry: "Financial Services",
      icon: BarChart3,
      stat: { value: "72hrs", label: "Average delivery time" },
      description:
        "Fast-tracked corporate stationery needs with our express bulk ordering and priority shipping.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Subtle Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(249,115,22,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.08)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <Navigation />

      <main className="relative z-10">
        {/* Hero Section - Animated Marquee Hero */}
        <AnimatedMarqueeHero
          tagline="Join over 10,000 satisfied customers"
          title={
            <>
              Premium Printing
              <br />
              Stationery & Trading
            </>
          }
          description="Worldwide premium printing stationery and bulk trading solutions. From letterheads to custom packaging, we deliver precision in every print."
          ctaText="Explore Products"
          onCtaClick={() => navigate('/products')}
          images={[
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=900&h=1200&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=900&h=1200&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=900&h=1200&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1561070791-36c11767b26a?q=80&w=900&h=1200&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=900&h=1200&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=900&h=1200&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=900&h=1200&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=900&h=1200&fit=crop&auto=format",
          ]}
        />

        {/* Browse by Category Section - Alternating Slide */}
        <section className="min-h-screen flex items-center py-16 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-end">
              {/* Text - Left Slide In */}
              <motion.div
                variants={leftSlideIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                <div className="inline-block mb-3 px-3.5 py-0.5 rounded-full border border-orange-500/50 bg-orange-50">
                  <span className="text-[10px] font-medium text-orange-600">
                    PRODUCT CATEGORIES
                  </span>
                </div>

                <AnimatedHeading className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-gray-900">Browse by</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    Category
                  </span>
                </AnimatedHeading>

                <p className="text-base text-gray-600 mb-6 leading-relaxed">
                  Discover our comprehensive range of premium printing products. From
                  corporate stationery to custom packaging, we have everything you need.
                </p>

                <div className="space-y-3">
                  {categories.map((category, idx) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => setActiveCategory(idx)}
                        whileHover={{ x: 10 }}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                          activeCategory === idx
                            ? "border-orange-500 bg-gradient-to-r from-orange-50 to-white shadow-md"
                            : "border-orange-300 bg-white hover:border-orange-500 hover:shadow-sm"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            category.color === "orange"
                              ? "bg-orange-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              category.color === "orange"
                                ? "text-orange-600"
                                : "text-gray-700"
                            }`}
                          />
                        </div>
                        <span className="text-base font-medium text-gray-900">
                          {category.name}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Image - Right Slide In */}
              <motion.div
                variants={rightSlideIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="relative"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CategoryDisplay icon={categories[activeCategory].icon} />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Staircase Reveal */}
        <section className="min-h-screen flex items-center py-16 px-6 bg-gradient-to-b from-transparent to-orange-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfigSmall}
                className="inline-block mb-3 px-3.5 py-0.5 rounded-full border border-orange-500/50 bg-orange-50"
              >
                <span className="text-[10px] font-medium text-orange-600">
                  WHY CHOOSE US
                </span>
              </motion.div>

              <AnimatedHeading delay={0.2} className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Premium Print Solutions
                </span>
              </AnimatedHeading>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfigSmall}
                transition={{ delay: 0.3 }}
                className="text-base text-gray-600 max-w-3xl mx-auto"
              >
                Experience excellence in every print with our state-of-the-art facilities
              </motion.p>
            </div>

            {/* Staircase Grid */}
            <motion.div
              variants={staircaseContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={staircaseItem}
                  className="relative group perspective-1000"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="p-6 rounded-xl border border-orange-300 bg-gradient-to-br from-orange-50 to-white hover:border-orange-500 hover:shadow-lg transition-all duration-300 h-full"
                    whileHover={{ rotateY: 2, rotateX: -2 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 to-white flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <feature.icon className="w-6 h-6 text-orange-600" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </motion.div>
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-orange-500/0 to-orange-400/0 group-hover:from-orange-500/30 group-hover:to-orange-400/30 blur opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Customer Success Stories - Alternating Slide Reversed */}
        <section className="min-h-screen flex items-center py-16 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Image/Content - Right Slide In (on left side) */}
              <motion.div
                variants={rightSlideIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="relative order-2 md:order-1"
              >
                <div className="space-y-5">
                  {caseStudies.map((study, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={viewportConfigSmall}
                      transition={{ 
                        delay: idx * 0.15,
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="relative group perspective-1000"
                    >
                      <motion.div
                        className="p-6 rounded-xl border border-orange-300 bg-gradient-to-br from-orange-50 to-white hover:border-orange-500 hover:shadow-lg transition-all duration-300"
                        whileHover={{ rotateY: 2, rotateX: -1 }}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <motion.div
                            className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <study.icon className="w-6 h-6 text-orange-600" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {study.company}
                            </h3>
                            <p className="text-xs text-gray-600">{study.industry}</p>
                          </div>
                        </div>
                        <motion.div
                          className="mb-4 p-3 rounded-lg bg-orange-100 border border-orange-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-2xl font-bold text-orange-600">
                            {study.stat.value}
                          </div>
                          <div className="text-sm text-gray-600">{study.stat.label}</div>
                        </motion.div>
                        <p className="text-gray-700">{study.description}</p>
                      </motion.div>
                      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-orange-500/0 to-orange-400/0 group-hover:from-orange-500/30 group-hover:to-orange-400/30 blur opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    </motion.div>
                  ))}
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
                <div className="inline-block mb-3 px-3.5 py-0.5 rounded-full border border-orange-500/50 bg-orange-50">
                  <span className="text-[10px] font-medium text-orange-600">
                    SUCCESS STORIES
                  </span>
                </div>

                <AnimatedHeading className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-gray-900">Trusted by</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    Thousands Worldwide
                  </span>
                </AnimatedHeading>

                <p className="text-base text-gray-600 mb-6 leading-relaxed">
                  See how businesses like yours have transformed with our solutions.
                  Delivering excellence in every print since 2009.
                </p>

                <ul className="space-y-3">
                  {[
                    "15+ Years of industry expertise",
                    "10,000+ projects delivered globally",
                    "500+ premium printing products",
                    "98% client satisfaction rating",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-3.5 h-3.5 text-orange-600" />
                      </div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section - Cinematic Cut Reveal */}
        <section className="relative min-h-screen flex items-center py-16 px-6 overflow-hidden">
          {/* Cut Reveal Background */}
          <motion.div
            variants={cutReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100"
          />

          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportConfig}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="inline-block mb-5 px-5 py-1.5 rounded-full border border-orange-500 bg-orange-50">
                  <span className="text-xs font-medium text-orange-600">
                    READY TO START?
                  </span>
                </div>

                <AnimatedHeading className="text-6xl md:text-7xl font-bold mb-8">
                  <AnimatedText
                    text="Elevate Your Print Experience"
                    type="word"
                    className="bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 bg-clip-text text-transparent"
                  />
                </AnimatedHeading>

                <p className="text-lg text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto">
                  Let's create something amazing together. Get in touch for custom
                  solutions tailored to your needs.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Link to="/contact">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white border-0 h-16 px-10 text-lg group"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Get Started Now
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/products">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-orange-500 text-gray-900 hover:bg-orange-50 h-16 px-10 text-lg"
                      >
                        Browse Products
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-orange-300">
                  <div>
                    <div className="text-xs text-gray-600 mb-1.5">Location</div>
                    <div className="text-sm text-gray-900 font-medium">
                      A-1, Kewal Park, Azadpur
                      <br />
                      Delhi - 110033
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1.5">Phone</div>
                    <div className="text-sm text-gray-900 font-medium">+91 9873535400</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1.5">Email</div>
                    <div className="text-sm text-gray-900 font-medium">
                      Chandantrading2014@gmail.com
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl" />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
