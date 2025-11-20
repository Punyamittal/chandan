import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface HeroBulkOrderProps {
  onSearch?: () => void;
}

const HeroBulkOrder = ({ onSearch }: HeroBulkOrderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 sm:px-6 pt-32 sm:pt-40 md:pt-48 pb-20 sm:pb-24 md:pb-32"
      >
        {/* Small Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 text-accent text-sm sm:text-base font-medium tracking-wider uppercase">
            <span className="w-12 h-px bg-accent"></span>
            Chandan Trading Company
          </div>
        </motion.div>

        {/* Hero Title - Large Typography */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="hero-text text-foreground mb-6 sm:mb-8 leading-none">
            Shaping Print
            <br />
            <span className="text-glow">Excellence</span>
            <br />
            <span className="text-muted-foreground">Worldwide</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Premium printing stationery and bulk trading solutions. From letterheads to custom packaging, we deliver precision in every print.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-16 sm:mb-24"
        >
          <Link to="/products">
            <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-8 py-6 text-base group">
              Explore Products
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-muted px-8 py-6 text-base">
              Get Quote
            </Button>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-12 sm:pt-16 border-t border-border"
        >
          {[
            { number: "15+", label: "Years Experience" },
            { number: "10K+", label: "Orders Delivered" },
            { number: "500+", label: "Products" },
            { number: "4.9", label: "Rating" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
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


