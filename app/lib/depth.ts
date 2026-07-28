/**
 * One imaginary light for the whole page — high and to the left, the same one
 * the card-stock chips in the stack band are lit by — so every cast shadow
 * here runs down and to the right. Type offsets are in em so they survive the
 * clamped display scale instead of turning into a smudge at 17rem.
 */

/** Long lens. Anything shorter turns a 1° turn into a visible skew. */
export const PERSPECTIVE = 1800;

/** Degrees at the extremes of the pointer range. Deliberately under 2°. */
export const PANEL_TILT = { x: 1, y: 1.4 } as const;
export const CARD_TILT = { x: 1.2, y: 1.7 } as const;

/** Slow and heavily damped: the panels should settle, never spring. */
export const DEPTH_SPRING = { stiffness: 70, damping: 20, mass: 0.6 } as const;

/** A panel lying on paper: lit top edge, contact shadow, then a wide cast. */
export const PANEL_SHADOW = [
  "inset 0 1px 0 rgba(255,255,255,0.6)",
  "0 1px 1px rgba(20,18,15,0.04)",
  "0 4px 8px -4px rgba(20,18,15,0.07)",
  "0 16px 28px -16px rgba(20,18,15,0.15)",
  "0 46px 72px -48px rgba(20,18,15,0.5)",
].join(", ");

/** The same panel on the ink sections, where only the lit edge reads. */
export const INK_PANEL_SHADOW = [
  "inset 0 1px 0 rgba(244,241,234,0.1)",
  "0 2px 4px -2px rgba(0,0,0,0.5)",
  "0 18px 32px -18px rgba(0,0,0,0.55)",
  "0 44px 66px -44px rgba(0,0,0,0.8)",
].join(", ");

/** Layered over the resting shadow on hover, so the card gains height. */
export const INK_PANEL_LIFT = [
  "0 8px 16px -6px rgba(0,0,0,0.5)",
  "0 34px 54px -24px rgba(0,0,0,0.6)",
  "0 72px 96px -56px rgba(0,0,0,0.85)",
].join(", ");

/** Display figures sitting a millimetre off the page. */
export const FIGURE_SHADOW =
  "0.016em 0.026em 0.026em rgba(20,18,15,0.17), 0 0.05em 0.1em rgba(20,18,15,0.06)";

/** Mono labels are 11px, so the offset has to stay under a pixel. */
export const LABEL_SHADOW = "0 0.05em 0.05em rgba(20,18,15,0.24)";
