/**
 * Animated Text Components
 * Character-by-character and word-by-word reveals
 */

import { motion } from "framer-motion";
import { textReveal, textRevealChar, wordReveal, wordRevealItem } from "@/lib/advancedAnimations";

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: "char" | "word";
  delay?: number;
}

export const AnimatedText = ({
  text,
  className = "",
  type = "word",
  delay = 0,
}: AnimatedTextProps) => {
  if (type === "char") {
    const chars = text.split("");
    return (
      <motion.span
        variants={textReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={className}
        style={{ display: "inline-block" }}
      >
        {chars.map((char, idx) => (
          <motion.span
            key={idx}
            variants={textRevealChar}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  const words = text.split(" ");
  return (
    <motion.span
      variants={wordReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordRevealItem}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedHeading = ({
  children,
  className = "",
  delay = 0,
}: AnimatedHeadingProps) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.h2>
  );
};







