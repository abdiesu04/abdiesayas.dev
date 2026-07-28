"use client";

import { motion } from "motion/react";

/**
 * Each glyph rises out of its own clipping box, staggered left to right.
 * Split per character so the mask hugs the letterforms rather than the line.
 */
export default function Masthead({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const chars = Array.from(text);

  return (
    <h1 className={className} style={style} aria-label={text}>
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <motion.span
            data-reveal
            className="inline-block"
            initial={{ y: "108%" }}
            animate={{ y: "0%" }}
            transition={{
              delay: 0.12 + index * 0.045,
              duration: 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
