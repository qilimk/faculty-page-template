// Mirrors the basePath set in next.config.ts. next/link and next/image
// prepend it automatically, but plain <a href> strings (e.g. from JSON data
// or a PDF in /public) don't — run those through withBasePath() instead.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string) {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}
