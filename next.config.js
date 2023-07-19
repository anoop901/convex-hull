/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/convex-hull",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/convex-hull",
        basePath: false,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
