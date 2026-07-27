"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useCallback, useEffect, useState } from "react";
import Container from "./Container";
import Reveal from "./Reveal";
import { projects } from "../data/projects";

function usePointerPreviewEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !calm.matches);

    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  return enabled;
}

export default function Work() {
  const [active, setActive] = useState<number | null>(null);
  const previewEnabled = usePointerPreviewEnabled();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 140, damping: 20, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 140, damping: 20, mass: 0.5 });

  // `instant` skips the spring so the preview appears at the cursor on first
  // hover instead of flying in from the top-left corner.
  const positionPreview = useCallback(
    (event: React.MouseEvent, instant = false) => {
      const halfWidth = 190;
      const halfHeight = 130;
      const margin = 16;
      // Sit the preview beside the cursor, flipping side near the right edge,
      // so it never covers the row being pointed at.
      const gap = halfWidth + 32;
      const rightEdge = window.innerWidth - halfWidth - margin;
      const preferred =
        event.clientX + gap > rightEdge ? event.clientX - gap : event.clientX + gap;
      const nextX = Math.min(Math.max(preferred, halfWidth + margin), rightEdge);
      const nextY = Math.min(
        Math.max(event.clientY, halfHeight + margin),
        window.innerHeight - halfHeight - margin,
      );

      mouseX.set(nextX);
      mouseY.set(nextY);

      if (instant) {
        x.jump(nextX);
        y.jump(nextY);
      }
    },
    [mouseX, mouseY, x, y],
  );

  const activeProject = active !== null ? projects[active] : null;
  const showPreview = previewEnabled && activeProject?.preview;

  return (
    <section id="work" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <Reveal y={16}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-rule pb-5">
            <h2 className="label">Selected Work</h2>
            <span className="label text-ink/45">06 Systems</span>
          </div>
        </Reveal>

        <ul onMouseMove={(event) => positionPreview(event)}>
          {projects.map((project, index) => {
            const isActive = active === index;

            return (
              <Reveal
                as="li"
                key={project.number}
                delay={Math.min(index * 0.06, 0.24)}
                y={20}
              >
                <div
                  onMouseEnter={(event) => {
                    positionPreview(event, true);
                    setActive(index);
                  }}
                  onMouseLeave={() => setActive(null)}
                  className="group grid grid-cols-1 gap-x-8 gap-y-4 border-b border-rule py-8 transition-colors duration-500 md:grid-cols-12 md:py-10"
                >
                  <div className="flex items-start gap-5 md:col-span-5">
                    <span
                      className={`label pt-2 transition-colors duration-300 ${
                        isActive ? "text-clay" : "text-ink/35"
                      }`}
                    >
                      {project.number}
                    </span>
                    <div>
                      <span className="label text-ink/45">{project.category}</span>
                      <h3
                        className={`mt-2 font-display leading-[1.05] tracking-[-0.01em] transition-colors duration-300 ${
                          isActive ? "text-clay" : "text-ink"
                        }`}
                        style={{ fontSize: "clamp(1.75rem, 3.6vw, 3rem)" }}
                      >
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  <div className="md:col-span-4">
                    <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink/65">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-4 md:col-span-3 md:items-end">
                    <p className="label leading-[1.9] text-ink/40 md:text-right">
                      {project.tech.join(" · ")}
                    </p>

                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border-b border-ink/25 pb-0.5 text-sm text-ink transition-colors hover:border-clay hover:text-clay"
                      >
                        Visit live
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </a>
                    ) : (
                      <span className="label text-ink/35">{project.status}</span>
                    )}
                  </div>

                  {/* Touch and tablet visitors get the screenshot inline,
                      since the cursor-following preview needs a mouse. */}
                  {project.preview ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-rule bg-paper-deep md:col-span-12 lg:hidden">
                      <Image
                        src={project.preview}
                        alt={`${project.name} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 90vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>

      <AnimatePresence>
        {showPreview && activeProject?.preview ? (
          <motion.div
            key={activeProject.number}
            className="pointer-events-none fixed left-0 top-0 z-[60] hidden lg:block"
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-[260px] w-[380px] overflow-hidden border border-rule bg-paper-deep shadow-[0_24px_60px_-24px_rgba(20,18,15,0.45)]">
              <Image
                src={activeProject.preview}
                alt=""
                fill
                sizes="380px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
