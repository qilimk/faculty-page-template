import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Loads a Markdown file from /content and splits it into its YAML
// frontmatter (structured fields) and Markdown body (prose). Uses Node's
// `fs`, so only call this from Server Components / build-time code — never
// from a "use client" component (pass the data down as props instead).
const contentDir = path.join(process.cwd(), "content");

export function loadContent<T = Record<string, unknown>>(filename: string) {
  const raw = fs.readFileSync(path.join(contentDir, filename), "utf8");
  const { data, content } = matter(raw);
  return { data: data as T, body: content.trim() };
}

// Convenience for list-type content files whose frontmatter is just
// `items: [...]` (awards, talks, publications, etc.).
export function loadItems<T = Record<string, unknown>>(filename: string): T[] {
  const { data } = loadContent<{ items?: T[] }>(filename);
  return data.items ?? [];
}
