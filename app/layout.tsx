// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { loadContent } from "@/lib/content";
import type { Profile, Links } from "@/types/content";

const { data: profile } = loadContent<Profile>("about.md");
const { data: links } = loadContent<Links>("links.md");

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.university}`,
  description: profile.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

  return (
    <html lang="en">
      <body className="text-neutral-900 antialiased">
        <div id="top" />
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <NavBar name={profile.name} cvHref={links.cv} />

          <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-[210px_minmax(0,1fr)] sm:gap-12 lg:gap-16">
            <aside className="self-start sm:sticky sm:top-8">
              <Sidebar />
            </aside>

            <main className="min-w-0">{children}</main>
          </div>

          <Footer />
        </div>

        {/* Cloudflare Web Analytics */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon={JSON.stringify({ token })}
        />
      </body>
    </html>
  );
}
