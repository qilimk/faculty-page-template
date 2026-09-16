import PubList from "@/components/PubList";
import { loadItems } from "@/lib/content";
import type { Publication } from "@/types/publication";

export default function PublicationsPage() {
  const pubs = loadItems<Publication>("publications.md");

  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-neutral-900">
        Publications
      </h1>
      <PubList publications={pubs} />
    </section>
  );
}
