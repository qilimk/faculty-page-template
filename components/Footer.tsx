import profile from "@/data/profile.json";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-1 border-t border-gray-200 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <a href="#top" className="text-gray-500 no-underline hover:text-blue-700">
        Back to top ↑
      </a>
    </footer>
  );
}
