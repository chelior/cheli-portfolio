# Portfolio

A static portfolio site (migrated off Base44) built with React + Vite + Tailwind CSS. Hosted on GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Deploy to GitHub Pages

The `.github/workflows/deploy.yml` workflow builds the site and publishes `dist/` to GitHub Pages automatically on every push to `main`.

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages → Source**, choose **GitHub Actions**.
3. Your site is published at `https://<username>.github.io/<repo>/`.

The site uses `HashRouter` and relative asset paths, so it works on any subpath without extra configuration.

## Project structure

- `src/pages/` — Home and the four case-study pages
- `src/components/portfolio/` — all portfolio components (Navbar, Hero, About, Work, Contact, lightboxes, galleries)
- `public/images/` — locally hosted images