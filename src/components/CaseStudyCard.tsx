/**
 * Case Study Card Component (inspired by zeroheight.com)
 * Premium customer showcase cards
 */

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';

interface CaseStudy {
  company: string;
  industry: string;
  logo: string; // Emoji or image
  image?: string;
  stat: {
    value: string;
    label: string;
  };
  description: string;
  link?: string;
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index?: number;
}

export default function CaseStudyCard({ caseStudy, index = 0 }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
    >
      <GlassmorphismCard
        variant="light"
        blur="xl"
        hoverable={true}
        animate={false}
        className="group cursor-pointer overflow-hidden h-full"
      >
        {/* Image/Visual */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent">
          {caseStudy.image ? (
            <img 
              src={caseStudy.image} 
              alt={caseStudy.company}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-8xl opacity-30">{caseStudy.logo}</span>
            </div>
          )}
          
          {/* Logo overlay */}
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-xl rounded-xl px-4 py-2 border border-border/50">
            <span className="text-3xl">{caseStudy.logo}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Company & Industry */}
          <div>
            <h3 className="text-2xl font-bold mb-1 group-hover:text-accent transition-colors">
              {caseStudy.company}
            </h3>
            <p className="text-sm text-muted-foreground">
              {caseStudy.industry}
            </p>
          </div>

          {/* Stat highlight */}
          <div className="py-4 border-y border-border/50">
            <div className="text-4xl font-bold text-accent mb-1">
              {caseStudy.stat.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {caseStudy.stat.label}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {caseStudy.description}
          </p>

          {/* CTA */}
          {caseStudy.link && (
            <motion.div
              className="flex items-center gap-2 text-accent font-medium pt-2 group-hover:gap-4 transition-all"
              whileHover={{ x: 5 }}
            >
              <span>View case study</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          )}
        </div>
      </GlassmorphismCard>
    </motion.div>
  );
}

