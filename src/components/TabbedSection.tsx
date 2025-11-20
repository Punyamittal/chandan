/**
 * Tabbed Section Component (inspired by zeroheight.com)
 * Premium tab navigation with smooth content transitions
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import GlassmorphismCard from './GlassmorphismCard';

interface TabContent {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  image?: string;
}

interface TabbedSectionProps {
  tabs: TabContent[];
  defaultTab?: string;
}

export default function TabbedSection({ tabs, defaultTab }: TabbedSectionProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeContent = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-6 py-3 rounded-full font-medium text-sm sm:text-base
                transition-all duration-300 backdrop-blur-xl border-2
                ${isActive 
                  ? 'bg-accent text-white border-accent shadow-lg shadow-accent/30' 
                  : 'bg-card/50 text-muted-foreground border-border/50 hover:border-accent/50'
                }
              `}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-accent rounded-full"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeContent && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <GlassmorphismCard
              variant="light"
              blur="xl"
              className="p-8 md:p-12"
              hoverable={false}
              animate={false}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 mb-4">
                      <activeContent.icon className="w-8 h-8 text-accent" />
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                      {activeContent.title}
                    </h3>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {activeContent.description}
                    </p>
                  </motion.div>

                  {/* Features List */}
                  <motion.ul
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {activeContent.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-start gap-3 group"
                      >
                        <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* Image/Visual */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  {activeContent.image ? (
                    <img 
                      src={activeContent.image} 
                      alt={activeContent.title}
                      className="rounded-2xl shadow-2xl"
                    />
                  ) : (
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border border-accent/20 flex items-center justify-center">
                      <activeContent.icon className="w-32 h-32 text-accent/30" />
                    </div>
                  )}
                  
                  {/* Floating decoration */}
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl"
                  />
                </motion.div>
              </div>
            </GlassmorphismCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

