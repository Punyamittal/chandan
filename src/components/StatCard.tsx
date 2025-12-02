/**
 * Stat Card Component with 3D Tilt Effect
 */

import { motion } from "framer-motion";
import { useTilt3D, hoverLift, fadeInUp } from "@/lib/advancedAnimations";
import { AnimatedCounter } from "./AnimatedCounter";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  index: number;
}

export const StatCard = ({
  icon: Icon,
  value,
  suffix = "",
  decimals = 0,
  label,
  index,
}: StatCardProps) => {
  const tilt3D = useTilt3D(8);

  return (
    <motion.div
      variants={fadeInUp}
      {...tilt3D}
      className="relative group perspective-1000"
    >
      <motion.div
        {...hoverLift}
        className="p-6 rounded-xl border border-orange-300 bg-gradient-to-br from-orange-50 to-white hover:border-orange-500 hover:shadow-lg transition-all duration-300"
      >
        <Icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
        <div className="text-3xl font-bold text-gray-900 mb-1">
          <AnimatedCounter
            target={value}
            suffix={suffix}
            decimals={decimals}
            duration={2}
          />
        </div>
        <div className="text-sm text-gray-600">{label}</div>
      </motion.div>
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/30 group-hover:to-orange-400/30 blur opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </motion.div>
  );
};







