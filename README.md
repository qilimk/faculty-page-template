# Faculty page template

A one-person academic website: Next.js + Tailwind, all content in plain
Markdown files, deployed for free as a static site on GitHub Pages via GitHub
Actions. No database, no CMS — edit a `.md` file, push, and the site rebuilds
itself.

This is the template. For a filled-in example, see the
[`qili-prof`](../qili-prof) repo, which was built from this same template
(qili-prof currently still uses the older JSON format — content-wise the two
repos have since diverged, but the rest of the setup is the same).

## Set up your own copy

1. **Get the code onto GitHub under your own name.** Either:
   - On GitHub, click **Use this template** (if this repo is registered as a
     template) and create a new repo, e.g. `jdoe-prof`, or
   - `git clone` this repo, then `git remote set-url origin <your-new-repo-url>`
     and push.
2. **Rename the project** in `package.json` (`"name"`) to match your repo.
3. **Fill in your content** — see the table below. Start with
   `content/about.md` and `content/links.md`.
4. **Add your photo**: drop a JPG/PNG in `public/` (e.g. `headshot.jpg`) and
   update the `src` in `components/Sidebar.tsx` (replace
   `/avatar-placeholder.svg`).
5. **Add your CV**: drop the PDF in `public/` and set `content/links.md`'s
   `cv` field to `/your-cv-filename.pdf`. Leave it as `""` to hide the CV
   link entirely.
6. **Enable GitHub Pages**: in your repo, go to **Settings → Pages → Source:
   GitHub Actions**. That's it — the included workflow
   (`.github/workflows/deploy.yml`) builds and deploys on every push to
   `main`, and automatically serves the site at
   `https://<your-username>.github.io/<your-repo-name>/` (it derives the
   basePath from the repo name, so nothing to configure by hand).

## Editing content

Every page reads from a Markdown file in `content/`. Each file starts with a
`---`-fenced **frontmatter** block (structured fields, written in YAML) and,
for `about.md` only, a **body** below it — real Markdown prose (bold,
italics, links, lists) that renders on the About page.

Edit the file, commit, and push to `main` — the site rebuilds and redeploys
automatically. YAML is more forgiving than JSON: no trailing-comma errors,
no escaping quotes, and you can add `#` comments.

| File | Powers | Shape |
|---|---|---|
| `content/about.md` | Name/title, sidebar info, site `<title>`, and the About page bio | frontmatter: `{ name, title, dept, university, office, email, phone, description }`; body: your bio in Markdown |
| `content/links.md` | Sidebar links + nav CV link | frontmatter only: `{ cv, scholar, github, linkedin, x, email }` — set any value to `""` to hide that link |
| `content/updates.md` | Home page "Updates" list | `items:` list of `{ date, text }`, newest first |
| `content/teaching.md` | Home page "Teaching" list | `items:` list of `{ term, title, link }` |
| `content/publications.md` | `/publications` (searchable/filterable) | `items:` list of `{ title, authors, venue, year, links: { pdf, code }, tags: [] }` |
| `content/group.md` | `/group` | `items:` list of `{ name, role, site }` |
| `content/experiences.md` | `/experiences` | `items:` list of `{ year, text }` |
| `content/awards.md` | `/recognition` → Awards | `items:` list of `{ year, text }` |
| `content/talks.md` | `/recognition` → Talks | `items:` list of `{ date, title }` |
| `content/press.md` | `/recognition` → Press | `items:` list of `{ year, outlet, title, link }` |

To add a new item to any list, add a new `- ` block under that file's
`items:` key — pages that are sorted (Recognition, Publications) re-sort
automatically. Dates/years in YAML should stay quoted (`"2026-01-01"`, not
`2026-01-01`) so they're read as text, not auto-converted to a date type.

Adding a whole new page (e.g. a blog or a new section) means adding a folder
under `app/` with a `page.tsx` that reads a new `content/*.md` file via
`lib/content.ts`, plus a matching entry in the `items` array in
`components/NavBar.tsx`.

### Colors

Ships with a monochrome, editorial palette (after the classic Poole/Hyde
academic style): links (`#343434`) are barely darker than body text
(`#333332`), darken to near-black (`#010101`) on hover, and show as `#676767`
once visited within the page content. Background is off-white (`#fbfbfd`).
All of that lives in `app/globals.css` — `--color-accent` /
`--color-accent-hover` in the `@theme` block, the `--color-neutral-900`
override right under it, the `body { background }` rule, and the
`main a:visited` rule — change those to make the site your own. Everything
else uses the Tailwind `neutral` gray scale (`text-neutral-900`,
`border-neutral-200`, etc.) throughout the components.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To preview the exact production build GitHub Pages will serve (with the
basePath applied):

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo-name npm run build
npx serve out
```

## How this is built

- Next.js App Router, static-exported (`output: "export"` in
  `next.config.ts`) — no server required.
- Content is Markdown + YAML frontmatter in `content/`, parsed at build time
  by `lib/content.ts` (using `gray-matter`) and rendered with
  `react-markdown` where it's prose (the About bio). Reading `content/` uses
  Node's `fs`, so it only happens in Server Components — the two
  interactive pieces (`NavBar`, `PubList`) receive their data as props from
  a Server Component parent instead of reading files themselves.
- `lib/basePath.ts` + the `NEXT_PUBLIC_BASE_PATH` env var handle serving the
  site from a GitHub Pages project subpath; the deploy workflow sets it
  automatically from the repo name.
- Tailwind CSS v4 for styling.
