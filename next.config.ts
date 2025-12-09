// CommonJS wrapper with fallback for default export to avoid require(...) issues on Vercel
const nextra = require("nextra");
const nextraLoader = nextra.default || nextra;
const withNextra = nextraLoader({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withNextra(nextConfig);
