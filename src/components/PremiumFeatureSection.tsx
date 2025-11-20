import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import GlassmorphicCard from "./GlassmorphicCard";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface PremiumFeatureSectionProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export default function PremiumFeatureSection({
  title,
  subtitle,
  features,
}: PremiumFeatureSectionProps) {
  return (
    <section className="py-20 sm:py-28 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature, index) => (
            <GlassmorphicCard key={index} delay={index * 0.1}>
              <div className="p-8 sm:p-10">
                {/* Icon with gradient background */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-6 shadow-lg"
                >
                  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated underline */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "60px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-1 bg-gradient-to-r from-accent to-primary rounded-full mt-6"
                />
              </div>
            </GlassmorphicCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

