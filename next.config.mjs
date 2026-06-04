/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships untranspiled ESM add-ons (used by some drei helpers);
  // Next must transpile them to avoid build/runtime errors.
  transpilePackages: ["three"],
};

export default nextConfig;
