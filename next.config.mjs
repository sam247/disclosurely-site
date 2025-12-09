/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Handle legacy VitePress-style .html routes
      {
        source: '/docs/index.html',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/:path*.html',
        destination: '/docs/:path*',
        permanent: true,
      },
      // Handle trailing "index" paths
      {
        source: '/docs/index',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/:path*/index',
        destination: '/docs/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
