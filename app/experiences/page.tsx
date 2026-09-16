import exps from "@/data/experiences.json";

export default function ExperiencesPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">
        Experiences
      </h1>
      <ul className="space-y-4">
        {exps.map((e, i) => (
          <li
            key={i}
            className="flex flex-col gap-0.5 text-[15px] leading-7 text-gray-700 sm:flex-row sm:gap-4"
          >
            <span className="shrink-0 text-gray-400 sm:w-44">{e.year}</span>
            <span>{e.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
