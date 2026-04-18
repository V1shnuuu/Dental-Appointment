import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    // @ts-expect-error Types might not yet reflect appIsrStatus correctly
    appIsrStatus: false,
    buildActivity: false,
  },
};

export default nextConfig;
