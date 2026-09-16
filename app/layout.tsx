// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import profile from "@/data/profile.json";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.university}`,
  description: profile.bio,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <div id="top" />
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <NavBar />

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
