// app/recognition/page.tsx
import awards from "@/data/awards.json";
import talks from "@/data/talks.json";
import press from "@/data/press.json";
import profile from "@/data/profile.json";

export const metadata = {
  title: `Recognition — ${profile.name}`,
};

type Award = { year: string | number; text: string };
type Talk = { date: string; title: string };
type Press = { year: string | number; outlet: string; title: string; link?: string };

const sectionLabel =
  "text-[13px] font-semibold uppercase tracking-[0.08em] text-gray-400";
const row =
  "flex flex-col gap-0.5 text-[15px] leading-7 text-gray-700 sm:flex-row sm:gap-4";
const rowKey = "shrink-0 text-gray-400 sm:w-24";

const toYearNum = (y: string | number) =>
  Number(String(y).match(/\d{4}/)?.[0] ?? -1);
const toDateKey = (d: string) => {
  const mmYy = d.match(/(\d{1,2})[/-](\d{4})/);
  if (mmYy) return +mmYy[2] * 100 + +mmYy[1];
  const yMd = d.match(/(\d{4})-(\d{1,2})/);
  if (yMd) return +yMd[1] * 100 + +yMd[2];
  const monYy = d.match(/([A-Za-z]{3,})\s+(\d{4})/);
  if (monYy) {
    const m =
      ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"].indexOf(
        monYy[1].slice(0, 3).toLowerCase(),
      ) + 1;
    return +monYy[2] * 100 + (m || 0);
  }
  const yr = d.match(/\d{4}/);
  return yr ? +yr[0] * 100 : -1;
};

export default function RecognitionPage() {
  const awardsSorted = [...(awards as Award[])].sort(
    (a, b) => toYearNum(b.year) - toYearNum(a.year),
  );
  const talksSorted = [...(talks as Talk[])].sort(
    (a, b) => toDateKey(b.date) - toDateKey(a.date),
  );
  const pressSorted = [...(press as Press[])].sort(
    (a, b) => toYearNum(b.year) - toYearNum(a.year),
  );

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Recognition
        </h1>
        <nav className="mt-3 flex gap-4 text-sm">
          <a href="#awards" className="text-blue-700 hover:underline">
            Awards
          </a>
          <a href="#talks" className="text-blue-700 hover:underline">
            Talks
          </a>
          <a href="#press" className="text-blue-700 hover:underline">
            Press
          </a>
        </nav>
      </section>

      <section id="awards">
        <h2 className={sectionLabel}>Awards</h2>
        <ul className="mt-4 space-y-3">
          {awardsSorted.map((a, i) => (
            <li key={i} className={row}>
              <span className={rowKey}>{a.year}</span>
              <span>{a.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="talks">
        <h2 className={sectionLabel}>Talks</h2>
        <ul className="mt-4 space-y-3">
          {talksSorted.map((t, i) => (
            <li key={i} className={row}>
              <span className={rowKey}>{t.date}</span>
              <span>{t.title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="press">
        <h2 className={sectionLabel}>Press</h2>
        <ul className="mt-4 space-y-3">
          {pressSorted.map((p, i) => (
            <li key={i} className={row}>
              <span className={rowKey}>{p.year}</span>
              <span>
                <span className="font-medium text-gray-900">{p.outlet}</span>
                {" — "}
                {p.link ? (
                  <a
                    className="text-blue-700 hover:underline"
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
      </section>
    </div>
  );
}
