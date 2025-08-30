/** @type {import('next').NextConfig} */
const nextConfig = {
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
