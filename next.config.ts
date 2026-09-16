import type { NextConfig } from "next";

// Set by the GitHub Actions workflow to "/<repo-name>" so the site works
// under a project page (e.g. https://<user>.github.io/<repo-name>).
// Empty locally, so `npm run dev` serves from the root as usual.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    // next/image's optimization API needs a server, which GitHub Pages can't run.
    unoptimized: true,
  },
};

export default nextConfig;
