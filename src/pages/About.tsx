import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, stagger } from "framer-motion";
import {
  leftSlideIn,
  rightSlideIn,
  staircaseContainer,
  staircaseItem,
  heroMinimal,
  glowPulse,
  viewportConfig,
} from "@/lib/cinematicAnimations";
import {
  Award,
  Users,
  Globe,
  TrendingUp,
  Printer,
  Shield,
  Target,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { SmoothScrollHero } from "@/components/ui/modern-hero";

const About = () => {
  const milestones = [
    { year: "2014", title: "Founded", desc: "Established with a vision for quality printing stationery" },
    { year: "2018", title: "Growth", desc: "Expanded product range and client base significantly" },
    { year: "2020", title: "Leadership", desc: "Arun Garg's leadership drives excellence in print media" },
    { year: "2024", title: "Excellence", desc: "Trusted partner for premium printing stationery solutions" },
  ];

  const values = [
    { icon: Target, title: "Precision", desc: "Every piece of stationery meets exact specifications with attention to detail" },
    { icon: Users, title: "Service", desc: "From small orders to large-scale printing without compromising quality" },
    { icon: Shield, title: "Trust", desc: "Long-term partnerships built on reliability and transparency" }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(249,115,22,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.08)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section with Parallax Floating */}
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-orange-50/30">
          {/* Parallax Floating Background */}
          <Floating sensitivity={-1} className="overflow-hidden">
            <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=400&h=400&fit=crop"
                alt="Business Cards"
                className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform border-2 border-orange-200"
              />
            </FloatingElement>

            <FloatingElement depth={1} className="top-[10%] left-[32%]">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&h=400&fit=crop"
                alt="Letterheads"
                className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform border-2 border-orange-200"
              />
            </FloatingElement>

            <FloatingElement depth={2} className="top-[2%] left-[53%]">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&h=600&fit=crop"
                alt="Diaries"
                className="w-28 h-40 md:w-40 md:h-52 object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform border-2 border-orange-200"
              />
            </FloatingElement>

            <FloatingElement depth={1} className="top-[0%] left-[83%]">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=400&h=400&fit=crop"
                alt="Notebooks"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform border-2 border-orange-200"
              />
            </FloatingElement>

            <FloatingElement depth={1} className="top-[40%] left-[2%]">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                src="https://images.unsplash.com/photo-1561070791-36c11767b26a?q=80&w=400&h=400&fit=crop"
                alt="Visiting Cards"
                className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform border-2 border-orange-200"
              />
            </FloatingElement>

            <FloatingElement depth={2} className="top-[70%] left-[77%]">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                src="https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=400&h=600&fit=crop"
                alt="File Covers"
                className="w-28 h-28 md:w-36 md:h-48 object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform border-2 border-orange-200"
              />
            </FloatingElement>

            <FloatingElement depth={4} className="top-[73%] left-[15%]">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&h=400&fit=crop"
                alt="Premium Printing"
                className="w-40 md:w-52 h-full object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform border-2 border-orange-200"
              />
            </FloatingElement>

            <FloatingElement depth={1} className="top-[80%] left-[50%]">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=400&h=400&fit=crop"
                alt="Stationery"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform border-2 border-orange-200"
              />
            </FloatingElement>
          </Floating>

          {/* Hero Content Overlay */}
          <div className="relative z-10 container mx-auto px-6">
            <motion.div
              variants={heroMinimal}
              initial="hidden"
              animate="visible"
              className="text-center max-w-5xl mx-auto"
            >
              {/* Glowing Badge */}
              <motion.div
                animate={glowPulse.animate}
                className="inline-block mb-8 px-6 py-2 rounded-full border border-orange-500/50 bg-orange-50/90 backdrop-blur-sm"
              >
                <span className="text-sm font-medium text-orange-600">
                  ABOUT US
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              >
                <span className="bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Precision in Every Print
                </span>
                <br />
                <span className="text-gray-900">Established Excellence</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
              >
                For over a decade, Chandan Trading Company has been at the forefront of printing stationery and print media,
                combining traditional expertise with modern practices to deliver unmatched quality and service.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Partition/Separator after Hero */}
        <div className="relative w-full bg-gradient-to-b from-orange-50/30 via-white to-white">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent h-px"></div>
          <div className="h-24 md:h-32 flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto px-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-orange-500/50"></div>
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 backdrop-blur-sm border border-orange-500/30 rounded-full">
                  <Award className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium text-orange-700">Our Story</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-orange-500/50 to-orange-500/50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Hero Section with Smooth Scroll */}
        <SmoothScrollHero />

        {/* Values Section - Alternating Slides */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-orange-50">
          <div className="container mx-auto">
            <motion.div 
              variants={leftSlideIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 text-base border-orange-500 bg-orange-50 text-orange-600 hover:bg-orange-100">
                OUR VALUES
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                What Drives Us
              </h2>
            </motion.div>

                <motion.div 
              variants={staircaseContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid md:grid-cols-3 gap-8"
            >
              {values.map((value, idx) => (
                <motion.div key={idx} variants={staircaseItem} className="relative group">
                  <div className="p-8 rounded-xl border border-orange-300 bg-gradient-to-br from-orange-50 to-white hover:border-orange-500 hover:shadow-lg transition-all duration-300 h-full text-center">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-100 to-white flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                      <value.icon className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                  </div>
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-orange-500/0 to-orange-400/0 group-hover:from-orange-500/30 group-hover:to-orange-400/30 blur opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Text - Left Slide In */}
              <motion.div
                variants={leftSlideIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                <Badge className="mb-4 px-4 py-2 text-base border-orange-500 bg-orange-50 text-orange-600 hover:bg-orange-100">
                  OUR JOURNEY
                </Badge>

                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-gray-900">A Legacy of</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    Quality & Trust
                  </span>
            </h2>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Since our founding, we've consistently delivered excellence in printing stationery,
                  building lasting relationships with clients across industries. Under the visionary
                  leadership of Arun Garg, we've evolved into a trusted name in print media.
                </p>
              </motion.div>

              {/* Timeline - Right Slide In */}
              <motion.div
                variants={rightSlideIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="space-y-6"
              >
                {milestones.map((milestone, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportConfig}
                    transition={{ delay: idx * 0.1 }}
                    className="relative group"
                  >
                    <div className="flex gap-6 p-6 rounded-xl border border-orange-300 bg-gradient-to-br from-orange-50 to-white hover:border-orange-500 hover:shadow-lg transition-all duration-300">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {milestone.year.slice(-2)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.desc}</p>
                    </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100">
          <div className="container mx-auto">
            <motion.div 
              variants={staircaseContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid md:grid-cols-4 gap-8"
            >
              {[
                { icon: Award, value: "15+", label: "Years Experience" },
                { icon: Users, value: "10K+", label: "Happy Clients" },
                { icon: Printer, value: "500+", label: "Products" },
                { icon: Globe, value: "19", label: "Countries" },
              ].map((stat, idx) => (
                <motion.div key={idx} variants={staircaseItem} className="text-center">
                  <div className="p-8 rounded-xl border border-orange-300 bg-white hover:shadow-xl transition-all duration-300">
                    <stat.icon className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 relative">
          <div className="container mx-auto text-center max-w-4xl">
          <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfig}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                Ready to Work Together?
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience the difference that quality and dedication make. Let's bring your printing needs to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-lg font-medium text-lg"
                  >
                    Get in Touch
                  </motion.button>
                </a>
                <a href="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-orange-500 text-gray-900 hover:bg-orange-50 rounded-lg font-medium text-lg"
                  >
                    View Products
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
