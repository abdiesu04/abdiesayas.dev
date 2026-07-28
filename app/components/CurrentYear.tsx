"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();

/**
 * Read from the clock rather than baked in, so the footer cannot go stale
 * between deploys. The year is external state that differs between the build
 * and the visit, which is what useSyncExternalStore is for: the server
 * snapshot hydrates, then the client's own clock takes over — no mismatch and
 * no effect.
 */
export default function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getYear, getYear);

  return <>{year}</>;
}
