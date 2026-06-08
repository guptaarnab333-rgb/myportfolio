/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships untranspiled ESM add-ons (used by some drei helpers);
  // Next must transpile them to avoid build/runtime errors.
  transpilePackages: ["three"],
  // Static export: `next build` writes a plain static site to ./out, which can
  // be drag-and-dropped onto Netlify (no server build, no build minutes).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
