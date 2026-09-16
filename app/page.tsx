// app/page.tsx
//
// Single-page site: every section lives here, in order, linked from NavBar
// via #anchor hrefs instead of separate routes. Add a new section by adding
// a `<section id="...">` below and a matching entry in components/NavBar.tsx.
import ReactMarkdown from "react-markdown";
import PubList from "@/components/PubList";
import { loadContent, loadItems } from "@/lib/content";
import { toYearNum, toDateKey } from "@/lib/sort";
import { withBasePath } from "@/lib/basePath";
import type {
  Profile,
  Links,
  Update,
  TeachingItem,
  GroupMember,
  Experience,
  Award,
  Talk,
  Press,
} from "@/types/content";
import type { Publication } from "@/types/publication";

const sectionLabel =
  "text-[13px] font-semibold uppercase tracking-[0.08em] text-neutral-400";
const subLabel = "text-sm font-semibold text-neutral-700";
const row =
  "flex flex-col gap-0.5 text-[15px] leading-7 text-neutral-700 sm:flex-row sm:gap-4";
const rowKey = "shrink-0 text-neutral-400 sm:w-24";

export default function HomePage() {
  const { body: bio } = loadContent<Profile>("about.md");
  const { data: links } = loadContent<Links>("links.md");
  const updates = loadItems<Update>("updates.md");
  const teaching = loadItems<TeachingItem>("teaching.md");
  const pubs = loadItems<Publication>("publications.md");
  const group = loadItems<GroupMember>("group.md");
  const exps = loadItems<Experience>("experiences.md");
  const awardsSorted = [...loadItems<Award>("awards.md")].sort(
    (a, b) => toYearNum(b.year) - toYearNum(a.year),
  );
  const talksSorted = [...loadItems<Talk>("talks.md")].sort(
    (a, b) => toDateKey(b.date) - toDateKey(a.date),
  );
  const pressSorted = [...loadItems<Press>("press.md")].sort(
    (a, b) => toYearNum(b.year) - toYearNum(a.year),
  );

  return (
    <div className="space-y-16">
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
            <li key={i} className={row}>
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
            <li key={i} className={row}>
              <span className={rowKey}>{c.term}</span>
              <span>{c.title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="publications">
        <h2 className={sectionLabel}>Publications</h2>
        <div className="mt-4">
          <PubList publications={pubs} />
        </div>
      </section>

      <section id="group">
        <h2 className={sectionLabel}>Group</h2>
        <ul className="mt-4 space-y-5">
          {group.map((m, i) => (
            <li key={i}>
              <p className="text-[15px] font-medium text-neutral-900">{m.name}</p>
              <p className="text-sm text-neutral-500">{m.role}</p>
              {m.site && m.site !== "#" && (
                <a
                  className="text-sm text-accent hover:underline"
                  href={m.site}
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section id="experiences">
        <h2 className={sectionLabel}>Experiences</h2>
        <ul className="mt-4 space-y-3">
          {exps.map((e, i) => (
            <li key={i} className={row}>
              <span className="shrink-0 text-neutral-400 sm:w-44">{e.year}</span>
              <span>{e.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="recognition">
        <h2 className={sectionLabel}>Recognition</h2>
        <nav className="mt-3 flex gap-4 text-sm">
          <a href="#awards" className="text-accent hover:underline">
            Awards
          </a>
          <a href="#talks" className="text-accent hover:underline">
            Talks
          </a>
          <a href="#press" className="text-accent hover:underline">
            Press
          </a>
        </nav>

        <div id="awards" className="mt-6">
          <h3 className={subLabel}>Awards</h3>
          <ul className="mt-3 space-y-3">
            {awardsSorted.map((a, i) => (
              <li key={i} className={row}>
                <span className={rowKey}>{a.year}</span>
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="talks" className="mt-8">
          <h3 className={subLabel}>Talks</h3>
          <ul className="mt-3 space-y-3">
            {talksSorted.map((t, i) => (
              <li key={i} className={row}>
                <span className={rowKey}>{t.date}</span>
                <span>{t.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="press" className="mt-8">
          <h3 className={subLabel}>Press</h3>
          <ul className="mt-3 space-y-3">
            {pressSorted.map((p, i) => (
              <li key={i} className={row}>
                <span className={rowKey}>{p.year}</span>
                <span>
                  <span className="font-medium text-neutral-900">{p.outlet}</span>
                  {" — "}
                  {p.link ? (
                    <a
                      className="text-accent hover:underline"
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="cv">
        <h2 className={sectionLabel}>CV</h2>
        <div className="mt-4">
          {links.cv ? (
            <a
              href={withBasePath(links.cv)}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 no-underline hover:border-neutral-900"
            >
              Download CV (PDF)
            </a>
          ) : (
            <p className="text-sm text-neutral-500">
              Add your CV PDF to <code>public/</code> and set the{" "}
              <code>cv</code> field in <code>content/links.md</code> to show a
              download button here.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
