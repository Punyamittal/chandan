import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { fadeInUp, hoverLift } from "@/lib/animations";

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  interactive?: boolean;
}

export default function GlassmorphicCard({ 
  children, 
  className = "", 
  delay = 0,
  interactive = true 
}: GlassmorphicCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={interactive ? hoverLift : undefined}
      onMouseMove={handleMouseMove}
      transition={{ delay }}
      className={`
        relative overflow-hidden
        bg-gradient-to-br from-card/40 to-card/20
        backdrop-blur-xl
        border border-border/30
        rounded-3xl
        shadow-2xl
        hover:shadow-accent/20
        transition-all duration-500
        ${className}
      `}
      style={{
        transform: interactive 
          ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 10}deg) rotateY(${(mousePosition.x - 0.5) * 10}deg)`
          : undefined,
      }}
    >
      {/* Gradient shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(
            600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
            rgba(255, 255, 255, 0.1),
            transparent 40%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `radial-gradient(
              400px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
              hsl(var(--accent) / 0.2),
              transparent 40%
            )`,
          }}
        />
      </div>
    </motion.div>
  );
}

