import profile from "@/data/profile.json";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-1 border-t border-slate-200 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <a href="#top" className="text-slate-500 no-underline hover:text-accent">
        Back to top ↑
      </a>
    </footer>
  );
}
