import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, Suspense } from "react";
import { ArrowRight, Sparkles, Award, Package } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedButton from "./AnimatedButton";
import AnimatedBadge from "./AnimatedBadge";
import FloatingShapes from "./FloatingShapes";
import Scene3D from "./Scene3D";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface HeroBulkOrderProps {
  onSearch?: () => void;
}

const HeroBulkOrder = ({ onSearch }: HeroBulkOrderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.7]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-background/50">
      {/* Floating Shapes Background */}
      <FloatingShapes />

      {/* 3D Scene */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-60">
        <Suspense fallback={null}>
          <Scene3D variant="geometric" />
        </Suspense>
      </div>

      {/* Animated gradient orbs with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </motion.div>

      {/* Content with stacked effect */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 container mx-auto px-4 sm:px-6 pt-32 sm:pt-40 md:pt-48 pb-20 sm:pb-24 md:pb-32"
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl"
        >
          {/* Badge with icon */}
          <motion.div variants={fadeInUp} className="mb-8">
            <AnimatedBadge icon={<Sparkles className="w-4 h-4" />} variant="gradient">
              Premium Printing Solutions
            </AnimatedBadge>
          </motion.div>

          {/* Hero Title with letter animations */}
          <motion.div variants={fadeInUp} className="mb-8 sm:mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 sm:mb-8 leading-[1.1] tracking-tight">
              Shaping Print
              <br />
              <span className="text-glow inline-block bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient">
                Excellence
              </span>
              <br />
              <span className="text-muted-foreground">Worldwide</span>
            </h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Premium printing stationery and bulk trading solutions. From letterheads to custom packaging, we deliver{" "}
              <span className="text-accent font-semibold">precision in every print</span>.
            </motion.p>
          </motion.div>

          {/* CTA Buttons with micro-interactions */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mb-16 sm:mb-24"
          >
            <Link to="/products">
              <AnimatedButton 
                size="lg" 
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Products
              </AnimatedButton>
            </Link>
            <Link to="/contact">
              <AnimatedButton 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-border hover:bg-muted px-8 py-6 text-base"
                shine={false}
              >
                Get Quote
              </AnimatedButton>
            </Link>
          </motion.div>

          {/* Glassmorphic Stats Cards */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              { number: "15+", label: "Years Experience", icon: Award },
              { number: "10K+", label: "Orders Delivered", icon: Package },
              { number: "500+", label: "Products", icon: Sparkles },
              { number: "4.9", label: "Rating", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className="relative bg-card/40 backdrop-blur-xl border border-border/30 rounded-2xl p-6 shadow-lg hover:shadow-accent/20 transition-all duration-300 overflow-hidden">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon */}
                  <stat.icon className="w-6 h-6 text-accent/60 mb-3 relative z-10" />
                  
                  {/* Number */}
                  <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1 relative z-10">
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider relative z-10">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroBulkOrder;


