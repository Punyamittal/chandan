import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Award,
  Users,
  Clock,
  BadgeCheck,
  LucideIcon,
} from "lucide-react";

export interface TrustBadgeProps {
  type:
    | "verified"
    | "fast-delivery"
    | "quality"
    | "bulk-discount"
    | "trusted"
    | "certified";
  label: string;
  description?: string;
  variant?: "compact" | "detailed";
}

const iconMap: Record<string, LucideIcon> = {
  verified: ShieldCheck,
  "fast-delivery": Truck,
  quality: Award,
  "bulk-discount": Users,
  trusted: BadgeCheck,
  certified: Clock,
};

const colorMap: Record<string, string> = {
  verified: "text-green-600 bg-green-50",
  "fast-delivery": "text-blue-600 bg-blue-50",
  quality: "text-purple-600 bg-purple-50",
  "bulk-discount": "text-orange-600 bg-orange-50",
  trusted: "text-indigo-600 bg-indigo-50",
  certified: "text-teal-600 bg-teal-50",
};

const TrustBadge = ({
  type,
  label,
  description,
  variant = "compact",
}: TrustBadgeProps) => {
  const Icon = iconMap[type];
  const colorClass = colorMap[type];

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${colorClass}`}
      >
        <Icon className="w-4 h-4" />
        <span className="text-sm font-semibold">{label}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className={`flex items-start gap-3 p-4 rounded-xl ${colorClass} border border-current/20`}
    >
      <div className={`p-2 rounded-lg bg-white/50`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-semibold mb-1">{label}</h4>
        {description && (
          <p className="text-xs opacity-80 leading-relaxed">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default TrustBadge;






