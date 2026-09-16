"use client";
import { useState } from "react";

const items = [
  { href: "#about", label: "About" },
  { href: "#updates", label: "Updates" },
  { href: "#teaching", label: "Teaching" },
  { href: "#publications", label: "Publications" },
  { href: "#group", label: "Group" },
  { href: "#experiences", label: "Experiences" },
  { href: "#recognition", label: "Recognition" },
  { href: "#cv", label: "CV" },
];

// Single-page site: every nav item is a same-page #anchor link (no routing),
// so this only needs the mobile menu's open/closed state.
export default function NavBar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 py-5">
      <a
        href="#top"
        className="text-base font-semibold tracking-tight text-neutral-900 no-underline"
      >
        {name}
      </a>

      <button
        className="rounded-md border border-neutral-300 px-2.5 py-1 text-sm text-neutral-600 sm:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="primary-nav"
      >
        Menu
      </button>

      <nav
        id="primary-nav"
        className={`${open ? "block" : "hidden"} w-full sm:block sm:w-auto`}
      >
        <ul className="flex flex-col gap-3 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 sm:pt-0">
          {items.map((i) => (
            <li key={i.href}>
              <a
                href={i.href}
                onClick={() => setOpen(false)}
                className="text-sm text-neutral-500 no-underline transition-colors hover:text-accent"
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
