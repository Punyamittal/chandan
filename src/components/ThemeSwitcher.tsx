/**
 * Theme Switcher Component
 * Floating button to switch between color themes
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { themes, Theme } from '@/lib/themes';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[9999] w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl border-2 shadow-2xl"
        style={{
          background: currentTheme.gradients.card,
          borderColor: currentTheme.colors.border,
          color: currentTheme.colors.foreground,
        }}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
      </motion.button>

      {/* Theme Picker Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-8 z-[9998] p-6 rounded-2xl backdrop-blur-xl border-2 shadow-2xl"
            style={{
              background: currentTheme.colors.card,
              borderColor: currentTheme.colors.border,
            }}
          >
            <div className="mb-4">
              <h3 
                className="text-lg font-bold mb-1"
                style={{ color: currentTheme.colors.foreground }}
              >
                Choose Theme
              </h3>
              <p 
                className="text-sm"
                style={{ color: currentTheme.colors.muted }}
              >
                Select your preferred color scheme
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Object.values(themes).map((theme) => {
                const isActive = theme.id === currentTheme.id;
                
                return (
                  <motion.button
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme);
                      setIsOpen(false);
                    }}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all
                      ${isActive ? 'ring-2 ring-offset-2' : ''}
                    `}
                    style={{
                      background: theme.gradients.card,
                      borderColor: isActive ? theme.colors.accent : theme.colors.border,
                      ringColor: theme.colors.accent,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Color Preview */}
                    <div className="flex gap-1 mb-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ background: theme.colors.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ background: theme.colors.secondary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ background: theme.colors.accent }}
                      />
                    </div>

                    {/* Theme Name */}
                    <div 
                      className="text-sm font-medium text-left"
                      style={{ color: theme.colors.foreground }}
                    >
                      {theme.name}
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTheme"
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: theme.colors.accent }}
                      >
                        <span className="text-white text-xs">✓</span>
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9997]"
          />
        )}
      </AnimatePresence>
    </>
  );
}

