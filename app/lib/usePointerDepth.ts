"use client";

import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { DEPTH_SPRING } from "./depth";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function useMotionSafe() {
  const [motionSafe, setMotionSafe] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionSafe(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return motionSafe;
}

/** Starts false so a touch device never tilts, not even for one frame. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return fine;
}

type ElementRef = React.RefObject<HTMLElement | null>;

/**
 * Pointer position over `area`, normalised to −1…1 across `target` (or `area`
 * if omitted) and damped. `target` must not be the element being transformed,
 * or measuring it feeds back into the tilt. One rAF per frame and no React
 * state, so nothing re-renders while the pointer moves.
 */
export function usePointerDepth(
  active: boolean,
  area: ElementRef,
  target?: ElementRef,
): { x: MotionValue<number>; y: MotionValue<number> } {
  const areaRef = area;
  const targetRef = target;
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, DEPTH_SPRING);
  const y = useSpring(rawY, DEPTH_SPRING);

  useEffect(() => {
    const area = areaRef.current;

    if (!area || !active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const measure = () => {
      frame = 0;
      const box = targetRef?.current ?? area;
      const rect = box.getBoundingClientRect();
      if (!pointer || !rect.width || !rect.height) return;
      rawX.set(clamp(((pointer.x - rect.left) / rect.width) * 2 - 1, -1, 1));
      rawY.set(clamp(((pointer.y - rect.top) / rect.height) * 2 - 1, -1, 1));
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    const onLeave = () => {
      pointer = null;
      rawX.set(0);
      rawY.set(0);
    };

    area.addEventListener("pointermove", onMove, { passive: true });
    area.addEventListener("pointerleave", onLeave);

    return () => {
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
      rawX.set(0);
      rawY.set(0);
    };
  }, [active, areaRef, targetRef, rawX, rawY]);

  return { x, y };
}
