/**
 * Category Display Card with 3D Tilt
 */

import { motion } from "framer-motion";
import { useTilt3D } from "@/lib/advancedAnimations";
import { LucideIcon } from "lucide-react";

interface CategoryDisplayProps {
  icon: LucideIcon;
  className?: string;
}

export const CategoryDisplay = ({ icon: Icon, className = "" }: CategoryDisplayProps) => {
  const tilt3D = useTilt3D(12);

  return (
    <motion.div
      {...tilt3D}
      className={`relative rounded-2xl overflow-hidden border border-orange-300 bg-gradient-to-br from-orange-50 to-white p-8 shadow-lg perspective-1000 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon className="w-32 h-32 text-orange-600" />
        </motion.div>
      </div>
    </motion.div>
  );
};


