import nextra from 'nextra';
import createMDX from '@next/mdx';

const withNextra = nextra({
  // Nextra 4.x configuration
  // Theme is auto-detected from nextra-theme-docs package
  // Content directory defaults to 'content' at root level
});

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withNextra(withMDX(nextConfig));

