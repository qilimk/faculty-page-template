# Faculty page template

A one-person academic website: Next.js + Tailwind, all content in plain JSON
files, deployed for free as a static site on GitHub Pages via GitHub Actions.
No database, no CMS — edit a JSON file, push, and the site rebuilds itself.

This is the template. For a filled-in example, see the
[`qili-prof`](../qili-prof) repo, which was built from this same template.

## Set up your own copy

1. **Get the code onto GitHub under your own name.** Either:
   - On GitHub, click **Use this template** (if this repo is registered as a
     template) and create a new repo, e.g. `jdoe-prof`, or
   - `git clone` this repo, then `git remote set-url origin <your-new-repo-url>`
     and push.
2. **Rename the project** in `package.json` (`"name"`) to match your repo.
3. **Fill in your content** — see the table below. Start with
   `data/profile.json` and `data/links.json`.
4. **Add your photo**: drop a JPG/PNG in `public/` (e.g. `headshot.jpg`) and
   update the `src` in `components/Sidebar.tsx` (replace
   `/avatar-placeholder.svg`).
5. **Add your CV**: drop the PDF in `public/` and set `data/links.json`'s
   `cv` field to `/your-cv-filename.pdf`. Leave it as `""` to hide the CV
   link entirely.
6. **Enable GitHub Pages**: in your repo, go to **Settings → Pages → Source:
   GitHub Actions**. That's it — the included workflow
   (`.github/workflows/deploy.yml`) builds and deploys on every push to
   `main`, and automatically serves the site at
   `https://<your-username>.github.io/<your-repo-name>/` (it derives the
   basePath from the repo name, so nothing to configure by hand).

## Editing content

Every page reads from a JSON file in `data/`. Edit the file, commit, and push
to `main` — the site rebuilds and redeploys automatically.

| File | Powers | Shape |
|---|---|---|
| `data/profile.json` | Name/title, About text, site `<title>` | `{ name, title, dept, university, office, bio, email, phone }` |
| `data/links.json` | Sidebar links + nav CV link | `{ cv, scholar, github, linkedin, x, email }` — set any value to `""` to hide that link |
| `data/updates.json` | Home page "Updates" list | array of `{ date, text }`, newest first |
| `data/teaching.json` | Home page "Teaching" list | array of `{ term, title, link }` |
| `data/publications.json` | `/publications` (searchable/filterable) | array of `{ title, authors, venue, year, links: { pdf, code }, tags: [] }` |
| `data/group.json` | `/group` | array of `{ name, role, site }` |
| `data/experiences.json` | `/experiences` | array of `{ year, text }` |
| `data/awards.json` | `/recognition` → Awards | array of `{ year, text }` |
| `data/talks.json` | `/recognition` → Talks | array of `{ date, title }` |
| `data/press.json` | `/recognition` → Press | array of `{ year, outlet, title, link }` |

To add a new item to any list, add a new object to the corresponding array —
pages that are sorted (Recognition, Publications) re-sort automatically.

Adding a whole new page (e.g. a blog or a new section) means adding a folder
under `app/` with a `page.tsx`, plus a matching entry in the `items` array in
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
- `lib/basePath.ts` + the `NEXT_PUBLIC_BASE_PATH` env var handle serving the
  site from a GitHub Pages project subpath; the deploy workflow sets it
  automatically from the repo name.
- Tailwind CSS v4 for styling.
