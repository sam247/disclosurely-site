import nextra from 'nextra';

const withNextra = nextra({
  // Nextra 4.x configuration
  // Theme is auto-detected from nextra-theme-docs package
  // Content directory defaults to 'content' at root level
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withNextra(nextConfig);

