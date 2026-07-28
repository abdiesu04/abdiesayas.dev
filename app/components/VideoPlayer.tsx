"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { motion, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { CARD_TILT, INK_PANEL_LIFT, INK_PANEL_SHADOW, PERSPECTIVE } from "../lib/depth";
import { useFinePointer, useMotionSafe, usePointerDepth } from "../lib/usePointerDepth";

const VIDEO_ID = "yBeq8DzIaQ0";

/**
 * Facade player: ships a static thumbnail and only loads the YouTube
 * embed once the visitor asks for it, so the page stays fast and
 * cookie-free until then.
 */
export default function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const motionSafe = useMotionSafe();
  const finePointer = useFinePointer();
  const tilting = motionSafe && finePointer && !playing;

  const depth = usePointerDepth(tilting, cardRef);
  const rotateX = useTransform(depth.y, (value) => -value * CARD_TILT.x);
  const rotateY = useTransform(depth.x, (value) => value * CARD_TILT.y);
  // Thumbnail sits under the glass and trails the pointer; the play button
  // stands proud of it and leads, which is what separates the two planes.
  const thumbX = useTransform(depth.x, (value) => value * 5);
  const thumbY = useTransform(depth.y, (value) => value * 4);
  const buttonX = useTransform(depth.x, (value) => value * -7);
  const buttonY = useTransform(depth.y, (value) => value * -5);

  return (
    <div
      ref={cardRef}
      className="group"
      style={{ perspective: PERSPECTIVE, perspectiveOrigin: "50% 40%" }}
    >
      <motion.div
        className="relative"
        style={tilting ? { rotateX, rotateY } : undefined}
        whileHover={tilting ? { y: -5 } : undefined}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Deeper cast faded in on hover — sibling of the clipped card so the
            frame's own overflow can't cut the shadow off. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: INK_PANEL_LIFT }}
        />

        <div
          className="relative aspect-video w-full overflow-hidden rounded-[2px] border border-paper/15 bg-ink"
          style={{ boxShadow: INK_PANEL_SHADOW }}
        >
          {playing ? (
            <iframe
              className="absolute inset-0 size-full"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="Client testimonial — Asked My Clients What It’s Really Like to Work With Me"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 size-full cursor-pointer"
              aria-label="Play the client testimonial video"
            >
              <motion.span
                className="absolute inset-0 block"
                style={tilting ? { x: thumbX, y: thumbY, scale: 1.03 } : undefined}
              >
                <Image
                  src="/testimonial-thumb.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />
              </motion.span>

              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                style={tilting ? { x: buttonX, y: buttonY } : undefined}
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-clay text-paper shadow-[0_10px_24px_-8px_rgba(0,0,0,0.65)] transition-transform duration-300 group-hover:scale-110 md:size-20">
                  <Play className="ml-0.5 size-6 md:size-7" fill="currentColor" aria-hidden />
                </span>
              </motion.span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
