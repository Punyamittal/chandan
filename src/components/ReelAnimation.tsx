import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ReelAnimationProps {
  size?: number;
  children?: React.ReactNode;
  className?: string;
  scrollBased?: boolean;
}

const ReelAnimation = ({ 
  size = 200, 
  children, 
  className = "",
  scrollBased = false 
}: ReelAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, scrollBased ? 360 : 0]);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.div
        style={{ rotate: scrollBased ? rotate : undefined }}
        animate={scrollBased ? undefined : { rotate: 360 }}
        transition={scrollBased ? undefined : { 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="relative w-full h-full"
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-secondary/30" 
             style={{ boxShadow: "var(--shadow-reel)" }} />
        
        {/* Inner Ring */}
        <div className="absolute inset-[15%] rounded-full border-[2px] border-secondary/50" />
        
        {/* Center Hub */}
        <div className="absolute inset-[35%] rounded-full bg-secondary/20 border border-secondary/60 flex items-center justify-center">
          {children}
        </div>
        
        {/* Reel Spokes */}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <div
            key={angle}
            className="absolute top-1/2 left-1/2 w-[2px] h-[35%] bg-secondary/40 origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
            }}
          />
        ))}
        
        {/* Metallic Highlight */}
        <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-secondary/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default ReelAnimation;
