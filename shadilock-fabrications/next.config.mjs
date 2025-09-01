/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google Drive thumbnails
      },
      {
        protocol: "https",
        hostname: "drive.google.com", // Fallback direct links
      },
    ],
  },
  async redirects() {
    return [
      {
        // Redirect www → non-www
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
