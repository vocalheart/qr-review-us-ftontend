/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,  //REQUIRED for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reviwes-backend.onrender.com",
      },
    ],
  },
};

export default nextConfig;