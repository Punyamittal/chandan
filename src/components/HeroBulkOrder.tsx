import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BulkSearchBar, { SearchData } from "./BulkSearchBar";
import { Badge } from "./ui/badge";
import { Star, TrendingUp, Award } from "lucide-react";

interface HeroBulkOrderProps {
  onSearch?: (data: SearchData) => void;
}

const HeroBulkOrder = ({ onSearch }: HeroBulkOrderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const statsData = [
    { icon: TrendingUp, label: "10K+ Orders", sublabel: "Completed" },
    { icon: Star, label: "4.9/5 Rating", sublabel: "Customer Reviews" },
    { icon: Award, label: "500+ Products", sublabel: "In Catalog" },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2787&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
          className="relative z-10 container mx-auto px-4 sm:px-6 pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-20"
      >
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          <Badge className="bg-white/90 text-foreground hover:bg-white px-4 py-2 text-sm font-medium">
            ✨ Trusted by 1000+ Businesses
          </Badge>
          <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 px-4 py-2 text-sm font-medium">
            🔥 Up to 40% Off on Bulk Orders
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-white mb-4 sm:mb-6 leading-tight px-4">
            Premium Bulk
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-400">
              Printing Solutions
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
            Order printing stationery and print media in bulk with exclusive
            discounts. Fast delivery, premium quality guaranteed.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4"
        >
          <BulkSearchBar onSearch={onSearch} variant="hero" />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4"
        >
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center text-white"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">{stat.label}</h3>
                <p className="text-xs sm:text-sm text-white/70">{stat.sublabel}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroBulkOrder;


