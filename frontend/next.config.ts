import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@patient-report/shared"],
  // Monorepo: silence "multiple lockfiles" workspace-root inference warning
  outputFileTracingRoot: path.join(__dirname, ".."),
};

export default nextConfig;
