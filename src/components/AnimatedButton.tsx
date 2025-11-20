import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { buttonHover, buttonTap } from "@/lib/animations";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
  shine?: boolean;
}

export default function AnimatedButton({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  icon,
  shine = true
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={buttonHover}
      whileTap={buttonTap}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative inline-block"
    >
      <Button
        variant={variant}
        size={size}
        className={`
          relative overflow-hidden
          ${className}
        `}
        onClick={onClick}
      >
        {/* Animated background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && (
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.span>
          )}
        </span>

        {/* Shine effect */}
        {shine && (
          <motion.div
            className="absolute inset-0"
            initial={{ x: "-100%", skewX: -20 }}
            animate={{ 
              x: isHovered ? "200%" : "-100%",
              transition: { duration: 0.8, ease: "easeOut" }
            }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              width: "50%",
            }}
          />
        )}
      </Button>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg blur-xl -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: variant === "default" 
            ? "hsl(var(--accent))" 
            : "hsl(var(--foreground) / 0.2)",
        }}
      />
    </motion.div>
  );
}

