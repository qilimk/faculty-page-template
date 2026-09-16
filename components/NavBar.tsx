"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { withBasePath } from "@/lib/basePath";

// Content lives in Markdown files (content/*.md), which are only readable
// via Node's `fs` — that only works in Server Components, so the parent
// layout loads it and passes down exactly what this client component needs.
export default function NavBar({ name, cvHref }: { name: string; cvHref: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = [
    { href: "/", label: "About" },
    { href: "/publications", label: "Publications" },
    { href: "/group", label: "Group" },
    { href: "/experiences", label: "Experiences" },
    { href: "/recognition", label: "Recognition" },
    ...(cvHref ? [{ href: cvHref, label: "CV", external: true }] : []),
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 py-5">
      <Link
        href="/"
        className="text-base font-semibold tracking-tight text-neutral-900 no-underline"
      >
        {name}
      </Link>

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
        <ul className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center sm:gap-6 sm:pt-0">
          {items.map((i) => (
            <li key={i.href}>
              {i.external ? (
                <a
                  href={withBasePath(i.href)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-neutral-500 no-underline hover:text-accent"
                >
                  {i.label}
                </a>
              ) : (
                <Link
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm no-underline transition-colors hover:text-accent ${
                    isActive(i.href)
                      ? "font-semibold text-neutral-900"
                      : "text-neutral-500"
                  }`}
                >
                  {i.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
