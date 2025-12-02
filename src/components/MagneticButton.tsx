/**
 * Magnetic Button Component
 * Button with magnetic hover effect
 */

import { motion } from "framer-motion";
import { useMagnetic } from "@/lib/advancedAnimations";
import { Button } from "./ui/button";
import { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  strength?: number;
}

export const MagneticButton = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  onClick,
  as = "button",
  href,
  strength = 0.3,
}: MagneticButtonProps) => {
  const magnetic = useMagnetic(strength);

  const buttonProps = {
    ...magnetic,
    className,
    variant,
    size,
    onClick,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  if (as === "a" && href) {
    return (
      <motion.a
        href={href}
        {...buttonProps}
        className={`inline-block ${className}`}
      >
        <Button variant={variant} size={size} className="pointer-events-none">
          {children}
        </Button>
      </motion.a>
    );
  }

  return (
    <motion.div {...buttonProps}>
      <Button variant={variant} size={size} className="pointer-events-none">
        {children}
      </Button>
    </motion.div>
  );
};







