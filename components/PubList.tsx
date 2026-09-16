"use client";
import pubsJson from "@/data/publications.json";
import type { Publication } from "@/types/publication";
import { useMemo, useState } from "react";

// Normalize once so `links` is always an object, newest first.
const pubs: Publication[] = (pubsJson as unknown as Publication[])
  .map((p) => ({ ...p, links: p.links ?? {} }))
  .sort((a, b) => b.year - a.year);

export default function PubList() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");

  const tags = useMemo(
    () => Array.from(new Set(pubs.flatMap((p) => p.tags || []))).sort(),
    [],
  );

  const filtered = pubs.filter((p) => {
    const hay = `${p.title} ${p.authors} ${p.venue}`.toLowerCase();
    const matchQ = q ? hay.includes(q.toLowerCase()) : true;
    const matchTag = tag ? (p.tags || []).includes(tag) : true;
    return matchQ && matchTag;
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title, author, venue…"
          className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-gray-900 sm:max-w-xs"
        />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-gray-900"
        >
          <option value="">All topics</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <ul className="mt-6 divide-y divide-gray-100">
        {filtered.map((p, i) => (
          <li key={i} className="py-4 first:pt-0">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h2 className="text-[15px] font-semibold text-gray-900">
                {p.title}
              </h2>
              <span className="text-sm text-gray-400">{p.year}</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{p.authors}</p>
            <p className="text-sm italic text-gray-500">{p.venue}</p>
            {(p.links?.pdf || p.links?.code) && (
              <div className="mt-1.5 flex gap-3 text-sm">
                {p.links?.pdf && (
                  <a
                    className="text-blue-700 hover:underline"
                    href={p.links.pdf}
                    target="_blank"
                    rel="noreferrer"
                  >
                    PDF
                  </a>
                )}
                {p.links?.code && (
                  <a
                    className="text-blue-700 hover:underline"
                    href={p.links.code}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Code
                  </a>
                )}
              </div>
            )}
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-4 text-sm text-gray-500">
            No matching publications.
          </li>
        )}
      </ul>
    </div>
  );
}
