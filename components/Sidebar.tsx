import Image from "next/image";
import { loadContent } from "@/lib/content";
import type { Profile, Links } from "@/types/content";
import { withBasePath } from "@/lib/basePath";

type LinkKey = keyof Links;

const social: { key: LinkKey; label: string; external?: boolean }[] = [
  { key: "cv", label: "Curriculum Vitae", external: true },
  { key: "scholar", label: "Google Scholar", external: true },
  { key: "github", label: "GitHub", external: true },
  { key: "linkedin", label: "LinkedIn", external: true },
  { key: "x", label: "Twitter / X", external: true },
  { key: "email", label: "Email" },
];

export default function Sidebar() {
  const { data: profile } = loadContent<Profile>("about.md");
  const { data: links } = loadContent<Links>("links.md");

  return (
    <div className="space-y-5">
      <Image
        src={withBasePath("/avatar-placeholder.svg")}
        alt={profile.name}
        width={150}
        height={150}
        className="rounded-lg border border-neutral-200 object-cover"
        priority
      />

      <div>
        <p className="text-lg font-semibold tracking-tight text-neutral-900">
          {profile.name}
        </p>
        <p className="mt-1 text-sm leading-6 text-neutral-500">
          {profile.title}
          <br />
          {profile.dept}
          <br />
          {profile.university}
          <br />
          {profile.office}
        </p>
      </div>

      <ul className="space-y-1.5 text-sm">
        {social.map(({ key, label, external }) => {
          const href = links[key];
          if (!href) return null;
          return (
            <li key={key}>
              <a
                href={withBasePath(href)}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="text-accent hover:underline"
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
