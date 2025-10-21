import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-printing-reels.jpg";
import inkDetail from "@/assets/ink-detail.jpg";
import printedSheets from "@/assets/printed-sheets.jpg";

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
    "Scaling Prints to Perfection",
    "From Reels to Real Impact",
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
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
                  style={{ opacity: textOpacity }}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground text-balance px-6"
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
