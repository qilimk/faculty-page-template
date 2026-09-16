// app/page.tsx
import ReactMarkdown from "react-markdown";
import { loadContent, loadItems } from "@/lib/content";
import type { Profile, Update, TeachingItem } from "@/types/content";

const sectionLabel =
  "text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-400";

export default function HomePage() {
  const { body: bio } = loadContent<Profile>("about.md");
  const updates = loadItems<Update>("updates.md");
  const teaching = loadItems<TeachingItem>("teaching.md");

  return (
    <div className="space-y-12">
      <section id="about">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">About</h1>
        <div className="prose mt-4 max-w-prose text-[15px] leading-7 text-neutral-700">
          <ReactMarkdown>{bio}</ReactMarkdown>
        </div>
      </section>

      <section id="updates">
        <h2 className={sectionLabel}>Updates</h2>
        <ul className="mt-4 space-y-3">
          {updates.map((u, i) => (
            <li
              key={i}
              className="flex flex-col gap-0.5 text-[15px] leading-7 text-neutral-700 sm:flex-row sm:gap-4"
            >
              <span className="shrink-0 tabular-nums text-neutral-400 sm:w-24">
                {u.date}
              </span>
              <span>{u.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="teaching">
        <h2 className={sectionLabel}>Teaching</h2>
        <ul className="mt-4 space-y-3">
          {teaching.map((c, i) => (
            <li
              key={i}
              className="flex flex-col gap-0.5 text-[15px] leading-7 text-neutral-700 sm:flex-row sm:gap-4"
            >
              <span className="shrink-0 text-neutral-400 sm:w-24">{c.term}</span>
              <span>{c.title}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
