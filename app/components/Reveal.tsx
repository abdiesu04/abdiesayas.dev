"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
} as const;

type RevealProps = {
  children: ReactNode;
  as?: keyof typeof TAGS;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
};

export default function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  duration = 0.8,
  y = 24,
}: RevealProps) {
  const Tag = TAGS[as];

  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
