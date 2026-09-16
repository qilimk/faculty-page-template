"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import profile from "@/data/profile.json";
import links from "@/data/links.json";
import { withBasePath } from "@/lib/basePath";

const items = [
  { href: "/", label: "About" },
  { href: "/publications", label: "Publications" },
  { href: "/group", label: "Group" },
  { href: "/experiences", label: "Experiences" },
  { href: "/recognition", label: "Recognition" },
  ...(links.cv ? [{ href: links.cv, label: "CV", external: true }] : []),
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 py-5">
      <Link
        href="/"
        className="text-base font-semibold tracking-tight text-slate-900 no-underline"
      >
        {profile.name}
      </Link>

      <button
        className="rounded-md border border-slate-300 px-2.5 py-1 text-sm text-slate-600 sm:hidden"
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
                  className="text-sm text-slate-500 no-underline hover:text-accent"
                >
                  {i.label}
                </a>
              ) : (
                <Link
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm no-underline transition-colors hover:text-accent ${
                    isActive(i.href)
                      ? "font-semibold text-slate-900"
                      : "text-slate-500"
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
