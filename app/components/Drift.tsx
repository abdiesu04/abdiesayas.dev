"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useMotionSafe } from "../lib/usePointerDepth";

/**
 * Moves its children a few pixels against the scroll so neighbouring columns
 * travel at slightly different rates. `from`/`to` are pixels at the ends of
 * the range, which is normally the element's own pass through the viewport —
 * pass `over` to drive it off the first N pixels of page scroll instead, which
 * is what the hero needs to sit still on first paint.
 */
export default function Drift({
  children,
  className,
  from,
  to,
  over,
}: {
  children: ReactNode;
  className?: string;
  from: number;
  to: number;
  over?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const motionSafe = useMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const { scrollY } = useScroll();
  const passY = useTransform(scrollYProgress, [0, 1], [from, to]);
  const pageY = useTransform(scrollY, [0, over ?? 1], [from, to]);
  const y = over ? pageY : passY;

  return (
    <div ref={ref} className={className}>
      <motion.div style={motionSafe ? { y } : undefined}>{children}</motion.div>
    </div>
  );
}
