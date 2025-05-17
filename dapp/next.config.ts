import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "upload.wikimedia.org",
      },
      {
        hostname: "placehold.co",
      },
      {
        hostname: "upload-os-bbs.hoyolab.com",
      },
      {
        hostname: "i.pinimg.com",
      },
    ],
  },
};

export default nextConfig;
