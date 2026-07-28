"use client";

import { useEffect, useState } from "react";

/**
 * Id of the section currently occupying the reading band, via the same
 * IntersectionObserver primitive `Reveal` already leans on through Motion's
 * `whileInView` — deliberately not a second scroll listener.
 *
 * The band is the middle of the viewport rather than the whole of it, so on a
 * tall screen showing two sections the one being read wins; ties break toward
 * the later section, which is the one the reader is moving into.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (!targets.length) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best: string | null = null;
        let bestRatio = 0;
        for (const id of ids) {
          const ratio = visible.get(id) ?? 0;
          if (ratio >= bestRatio && ratio > 0) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      {
        // Only the middle third of the viewport counts as "being read".
        rootMargin: "-33% 0px -33% 0px",
        threshold: [0, 0.01, 0.25, 0.5, 0.75, 1],
      },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
