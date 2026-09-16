import group from "@/data/group.json";

export default function GroupPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-neutral-900">
        Group
      </h1>
      <ul className="space-y-5">
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
  );
}
