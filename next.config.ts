import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/chat",
          destination: "http://127.0.0.1:5328/api/chat",
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
