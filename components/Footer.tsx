import { loadContent } from "@/lib/content";
import type { Profile } from "@/types/content";

export default function Footer() {
  const { data: profile } = loadContent<Profile>("about.md");

  return (
    <footer className="flex flex-col gap-1 border-t border-neutral-200 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <a href="#top" className="text-neutral-500 no-underline hover:text-accent">
        Back to top ↑
      </a>
    </footer>
  );
}
