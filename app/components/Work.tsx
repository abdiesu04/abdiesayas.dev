"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import BrowserFrame from "./BrowserFrame";
import Container from "./Container";
import Reveal from "./Reveal";
import { LABEL_SHADOW, PANEL_TILT, PERSPECTIVE } from "../lib/depth";
import { useFinePointer, useMotionSafe, usePointerDepth } from "../lib/usePointerDepth";
import { projects, type Project } from "../data/projects";

// Height ÷ width of the frame's content area. Paired with each capture's own
// aspect it gives the exact percentage the image can travel inside the frame.
const FRAME_ASPECT = 10 / 16;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function domainOf(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function EmptyPanel({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-ink px-10 text-center">
      <span className="label text-paper/30">No public preview</span>
      <p className="max-w-[18ch] font-display text-4xl leading-tight text-paper md:text-5xl">
        {project.name}
      </p>
      <span className="h-px w-10 bg-paper/30" aria-hidden />
      <span className="label max-w-[34ch] leading-[1.9] text-paper/45">
        {project.status}
      </span>
    </div>
  );
}

/**
 * One capture inside the pinned frame. The image is taller than the frame, so
 * scrolling the block pans it downward — the page appears to browse itself.
 */
function ScreenPanel({
  project,
  progress,
  motionSafe,
  parallaxX,
  parallaxY,
}: {
  project: Project;
  progress: MotionValue<number>;
  motionSafe: boolean;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}) {
  const travel = project.shot ? Math.max(0, 1 - FRAME_ASPECT / project.shot.aspect) : 0;
  const y = useTransform(progress, [0, 1], ["0%", `${-travel * 100}%`]);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {project.shot ? (
        // The capture sits on its own plane behind the frame and lags the
        // pointer. Overscaled so that lag can never uncover the frame edge.
        <motion.div
          className="absolute inset-0"
          style={motionSafe ? { x: parallaxX, y: parallaxY, scale: 1.02 } : undefined}
        >
          <motion.div
            className="absolute inset-x-0 top-0"
            style={motionSafe ? { y } : undefined}
          >
            <Image
              src={project.shot.src}
              alt={`${project.name} website`}
              width={1440}
              height={Math.round(1440 * project.shot.aspect)}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="h-auto w-full"
              priority={project.number === "01"}
            />
          </motion.div>
        </motion.div>
      ) : (
        <EmptyPanel project={project} />
      )}
    </motion.div>
  );
}

export default function Work() {
  const blockRefs = useRef<Array<HTMLLIElement | null>>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const motionSafe = useMotionSafe();
  const finePointer = useFinePointer();
  const progress = useMotionValue(0);

  // Tracked across the whole section, measured against the pinned frame, so
  // the panel turns toward the reader even while they are in the left column.
  const depth = usePointerDepth(motionSafe && finePointer, sectionRef, frameRef);
  const rotateY = useTransform(depth.x, (value) => value * PANEL_TILT.y);
  const pointerRotateX = useTransform(depth.y, (value) => -value * PANEL_TILT.x);
  // Each block passing the anchor rocks its panel from being seen slightly
  // from below to slightly from above. Survives on touch, where tilt can't.
  const scrollRotateX = useTransform(progress, [0, 1], [0.8, -0.8]);
  const rotateX = useTransform(
    [pointerRotateX, scrollRotateX],
    ([pointer, scroll]: number[]) => pointer + scroll,
  );
  const parallaxX = useTransform(depth.x, (value) => value * 6);
  const parallaxY = useTransform(depth.y, (value) => value * 4);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.45;
      let nearest = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      let nearestProgress = 0;

      blockRefs.current.forEach((element, index) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - anchor);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
          nearestProgress = clamp((anchor - rect.top) / rect.height, 0, 1);
        }
      });

      setActive(nearest);
      progress.set(nearestProgress);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [progress]);

  const activeProject = projects[active];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="scroll-mt-20 py-20 md:py-28"
    >
      <Container>
        <Reveal y={16}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-rule pb-5">
            <h2 className="label text-ink/70">Selected Work</h2>
            {/* The section's whole claim, and checkable by clicking any of
                the six links below it. */}
            <span className="label inline-flex items-center gap-2 text-clay">
              <span className="proof-dot" aria-hidden />
              All in Production
            </span>
          </div>
        </Reveal>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <ul className="lg:col-span-5">
            {projects.map((project, index) => {
              const isActive = index === active;

              return (
                <li
                  key={project.number}
                  ref={(node) => {
                    blockRefs.current[index] = node;
                  }}
                  className="border-b border-rule py-12 lg:flex lg:min-h-[85vh] lg:flex-col lg:justify-center lg:border-b-0 lg:py-0"
                >
                  <div
                    className="transition-opacity duration-500 lg:opacity-40 lg:data-[active=true]:opacity-100"
                    data-active={isActive}
                  >
                    <div className="flex items-baseline gap-4">
                      {/* 11px mono can't carry an extrusion, so the active
                          number lifts a pixel instead of thickening. Carousel
                          state is not proof, so it lifts in ink, not clay. */}
                      <span
                        className={`label inline-block transition duration-500 ${
                          isActive ? "-translate-y-px text-ink" : "text-ink/30"
                        }`}
                        style={isActive ? { textShadow: LABEL_SHADOW } : undefined}
                      >
                        {project.number}
                      </span>
                      <span className="label text-ink/45">{project.category}</span>
                    </div>

                    <h3
                      className="mt-3 font-display leading-[1.02] tracking-[-0.015em]"
                      style={{ fontSize: "clamp(2rem, 4.4vw, 3.5rem)" }}
                    >
                      {project.name}
                    </h3>

                    <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink/70">
                      {project.description}
                    </p>

                    {/* The band carries the stack story in colour now, so
                        this drops to the metadata level — quiet enough that
                        the live link below it finally outweighs it, but not
                        so quiet that a reader scanning for a stack can't
                        read it. */}
                    <p className="label mt-6 leading-[1.9] text-ink/45">
                      {project.tech.join(" · ")}
                    </p>

                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-7 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[0.9375rem] transition-colors hover:border-clay hover:text-clay"
                      >
                        {/* The dot means "live right now"; the link is the
                            proof, and it is the one thing a sceptic can
                            click to check that any of this is real. */}
                        <span className="proof-dot" aria-hidden />
                        Visit {domainOf(project.href)}
                        <ArrowUpRight
                          className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </a>
                    ) : (
                      <span className="label mt-7 inline-block text-ink/45">
                        {project.status}
                      </span>
                    )}
                  </div>

                  {/* Below lg the pinned column is gone, so each project
                      carries its own capture. */}
                  <div className="mt-8 lg:hidden">
                    {project.shot ? (
                      <BrowserFrame
                        domain={project.href ? domainOf(project.href) : project.name}
                        aspect="4 / 3"
                      >
                        <Image
                          src={project.shot.src}
                          alt={`${project.name} website`}
                          width={1440}
                          height={Math.round(1440 * project.shot.aspect)}
                          sizes="100vw"
                          className="absolute inset-x-0 top-0 h-auto w-full"
                        />
                      </BrowserFrame>
                    ) : (
                      <BrowserFrame domain={project.name} aspect="4 / 3">
                        <EmptyPanel project={project} />
                      </BrowserFrame>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-[14vh]">
              {/* Perspective lives inside the sticky element: on an ancestor it
                  would make a containing block and unpin the column. */}
              <div
                ref={frameRef}
                style={{ perspective: PERSPECTIVE, perspectiveOrigin: "50% 40%" }}
              >
                <motion.div style={motionSafe ? { rotateX, rotateY } : undefined}>
                  <BrowserFrame
                    domain={
                      activeProject.href
                        ? domainOf(activeProject.href)
                        : activeProject.name
                    }
                  >
                    <AnimatePresence initial={false}>
                      <ScreenPanel
                        key={activeProject.number}
                        project={activeProject}
                        progress={progress}
                        motionSafe={motionSafe}
                        parallaxX={parallaxX}
                        parallaxY={parallaxY}
                      />
                    </AnimatePresence>
                  </BrowserFrame>
                </motion.div>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <span className="label text-ink/30">
                  {activeProject.number} / {String(projects.length).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-rule">
                  <motion.div
                    className="h-px bg-ink/70"
                    animate={{
                      width: `${((active + 1) / projects.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
