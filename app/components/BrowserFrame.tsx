import type { ReactNode } from "react";
import { PANEL_SHADOW } from "../lib/depth";

export default function BrowserFrame({
  domain,
  children,
  className = "",
  aspect = "16 / 10",
}: {
  domain: string;
  children: ReactNode;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[2px] border border-rule bg-paper ${className}`}
      style={{ boxShadow: PANEL_SHADOW }}
    >
      <div className="flex items-center gap-3 border-b border-rule bg-paper-deep px-4 py-3">
        <span className="flex shrink-0 items-center gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-ink/20" />
          <span className="size-2 rounded-full bg-ink/20" />
          <span className="size-2 rounded-full bg-ink/20" />
        </span>
        <span className="label truncate text-ink/45">{domain}</span>
      </div>

      <div className="relative overflow-hidden bg-paper-deep" style={{ aspectRatio: aspect }}>
        {children}
      </div>
    </div>
  );
}
