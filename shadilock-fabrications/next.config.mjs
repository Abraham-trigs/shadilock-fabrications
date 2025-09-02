/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Direct Google thumbnails
      },
      {
        protocol: "https",
        hostname: "drive.google.com", // Fallback direct links
      },
      {
        protocol: "https",
        hostname: "docs.google.com", // Docs-based links
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "www.shadilockfabrications.com",
          },
        ],
        destination: "https://shadilockfabrications.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
