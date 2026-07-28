import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The unlabelled dark disc on the left edge of a local page is Next's own
     dev-tools indicator, injected into a shadow root and never present in a
     production build. Turned off so a local review sees the site and not the
     toolchain. */
  devIndicators: false,
};

export default nextConfig;
