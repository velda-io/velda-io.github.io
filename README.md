# velda-io.github.io

This repository contains the Velda documentation site (built with VitePress and Tailwind).

## Development

These are the common commands used while developing and maintaining the site.

Prerequisites

- Node.js (recommend Node 18+)
- npm (or a compatible client)

Install dependencies

```bash
npm install
```

Run local development server (live-reload)

```bash
npm run dev
```

Build the static site (this runs the sitemap generator before building)

```bash
npm run build
```

Preview the built site locally

```bash
npm run preview
```

Sitemap & maintenance scripts

- Generate sitemap: `npm run sitemap`
- Update blog metadata/posts: `npm run update-blog-posts`

Notes

- `build` runs `sitemap` then `vitepress build` (see `package.json`).
- Markdown content lives at the repository root (and the `blog/` folder for blog posts). Edit those files and use `npm run dev` to preview changes.
- If you run into issues, try removing `node_modules` and `package-lock.json`, then re-run `npm install`.
