import Image from "next/image";
import profile from "@/data/profile.json";
import links from "@/data/links.json";
import { withBasePath } from "@/lib/basePath";

type LinkKey = keyof typeof links;

const social: { key: LinkKey; label: string; external?: boolean }[] = [
  { key: "cv", label: "Curriculum Vitae", external: true },
  { key: "scholar", label: "Google Scholar", external: true },
  { key: "github", label: "GitHub", external: true },
  { key: "linkedin", label: "LinkedIn", external: true },
  { key: "x", label: "Twitter / X", external: true },
  { key: "email", label: "Email" },
];

export default function Sidebar() {
  return (
    <div className="space-y-5">
      <Image
        src={withBasePath("/avatar-placeholder.svg")}
        alt={profile.name}
        width={150}
        height={150}
        className="rounded-lg border border-gray-200 object-cover"
        priority
      />

      <div>
        <p className="text-lg font-semibold tracking-tight text-gray-900">
          {profile.name}
        </p>
        <p className="mt-1 text-sm leading-6 text-gray-500">
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
                className="text-blue-700 hover:underline"
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
