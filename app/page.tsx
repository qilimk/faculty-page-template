// app/page.tsx
import profile from "@/data/profile.json";
import updates from "@/data/updates.json";
import teaching from "@/data/teaching.json";

const sectionLabel =
  "text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-400";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section id="about">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">About</h1>
        <p className="mt-4 max-w-prose text-[15px] leading-7 text-slate-700">
          {profile.bio}
        </p>
      </section>

      <section id="updates">
        <h2 className={sectionLabel}>Updates</h2>
        <ul className="mt-4 space-y-3">
          {updates.map((u, i) => (
            <li
              key={i}
              className="flex flex-col gap-0.5 text-[15px] leading-7 text-slate-700 sm:flex-row sm:gap-4"
            >
              <span className="shrink-0 tabular-nums text-slate-400 sm:w-24">
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
              className="flex flex-col gap-0.5 text-[15px] leading-7 text-slate-700 sm:flex-row sm:gap-4"
            >
              <span className="shrink-0 text-slate-400 sm:w-24">{c.term}</span>
              <span>{c.title}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
