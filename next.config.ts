import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // @ts-ignore - Next.js 15+ runtime supports this at top level but types may lag
  allowedDevOrigins: ['192.168.29.126']
};

export default nextConfig;
