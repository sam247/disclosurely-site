import nextra from 'nextra';

const withNextra = nextra('nextra-theme-docs', {
  themeConfig: './theme.config.tsx',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withNextra(nextConfig);

