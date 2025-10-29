import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-printing-reels.jpg";
import inkDetail from "@/assets/ink-detail.jpg";
import printedSheets from "@/assets/printed-sheets.jpg";
import { Button } from "./ui/button";
import QuoteDialog from "./QuoteDialog";

const ZoomHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale1 = useTransform(scrollYProgress, [0, 0.33], [1, 1.4]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.33], [1, 0]);

  const scale2 = useTransform(scrollYProgress, [0.33, 0.66], [1, 1.4]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.33, 0.66], [0, 1, 0]);

  const scale3 = useTransform(scrollYProgress, [0.66, 1], [1, 1.4]);
  const opacity3 = useTransform(scrollYProgress, [0.53, 0.66, 1], [0, 1, 0]);

  const textPhases = [
    "Precision in Every Print",
    "Quality Stationery Solutions",
    "Trusted Print Media Partner",
  ];

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Image Layer 1 */}
        <motion.div
          style={{ scale: scale1, opacity: opacity1 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={heroImage}
            alt="Industrial printing reels"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          
          {/* Content Overlay on First Image */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: opacity1 }}
          >
            <div className="text-center max-w-4xl mx-auto px-6">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-white drop-shadow-2xl"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                initial={{ opacity: 0, x: -200, y: 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -150 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  Welcome to{" "}
                </motion.span>
                <motion.span 
                  className="text-yellow-400" 
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  Chandan Trading Company
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-white drop-shadow-xl leading-relaxed mb-8 max-w-2xl mx-auto"
                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                initial={{ opacity: 0, x: 200, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
              >
                Your trusted partner in premium printing stationery and print media solutions. 
                From business cards to corporate stationery, we deliver excellence in every print.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -300, y: 50 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/products">
                    <Button size="lg" className="group relative overflow-hidden bg-white text-primary hover:bg-white/90 shadow-2xl border-2 border-white">
                      <motion.span
                        className="relative z-10 flex items-center"
                        whileHover={{ x: -2 }}
                        transition={{ duration: 0.3 }}
                      >
                        Explore Products
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="ml-2" size={16} />
                        </motion.div>
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </Button>
                  </Link>
                </motion.div>
                <QuoteDialog buttonSize="lg" buttonVariant="outline" buttonText="Get Quote">
                  <motion.div
                    initial={{ opacity: 0, x: 300, y: 50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline" className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary shadow-2xl backdrop-blur-sm">
                      Get Custom Quote
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="ml-2" size={16} />
                      </motion.div>
                    </Button>
                  </motion.div>
                </QuoteDialog>
              </motion.div>
              <motion.div 
                className="mt-12 text-sm text-white drop-shadow-lg font-medium"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
              >
                Scroll down to explore our story and expertise
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Image Layer 2 */}
        <motion.div
          style={{ scale: scale2, opacity: opacity2 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={inkDetail}
            alt="Ink spreading on paper"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
        </motion.div>

        {/* Image Layer 3 */}
        <motion.div
          style={{ scale: scale3, opacity: opacity3 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={printedSheets}
            alt="Printed sheets"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
        </motion.div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 px-6">
            {textPhases.map((text, index) => {
              const startProgress = index * 0.33;
              const endProgress = (index + 1) * 0.33;
              const textOpacity = useTransform(
                scrollYProgress,
                [startProgress, startProgress + 0.1, endProgress - 0.1, endProgress],
                [0, 1, 1, 0]
              );

              return (
                <motion.h1
                  key={index}
                  style={{ 
                    opacity: textOpacity,
                    textShadow: index === 0 
                      ? '3px 3px 6px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1)' // Enhanced shadow for "Precision in Every Print"
                      : index === 1 
                      ? '3px 3px 6px rgba(0,0,0,0.8), 0 0 15px rgba(255,215,0,0.4), 0 0 30px rgba(255,215,0,0.2)' // Golden glow for "Quality Stationery Solutions"
                      : '3px 3px 6px rgba(255,255,255,0.8), 0 0 10px rgba(0,0,0,0.5)' // White shadow for black text
                  }}
                  className={`absolute inset-x-0 top-1/2 -translate-y-1/2 text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-balance px-6 ${
                    index === 0 
                      ? 'text-white' // Pure white for "Precision in Every Print"
                      : index === 1 
                      ? 'text-yellow-300' // Bright golden yellow for "Quality Stationery Solutions"
                      : 'text-black' // Black for "Trusted Print Media Partner"
                  }`}
                >
                  {text}
                </motion.h1>
              );
            })}
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default ZoomHero;
