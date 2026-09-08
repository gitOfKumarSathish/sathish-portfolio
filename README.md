# Sathish Portfolio

Personal portfolio site for Sathish Kumar Arputharajan — Technical Lead & Full-Stack Engineer.

**Live:** <https://sathishkumar.cloud/>

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- Framer Motion + GSAP + tsParticles for motion
- TanStack Query, React Router, React Hook Form + Zod
- Vitest + Testing Library (unit), Playwright (e2e)

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 5173 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm test` | Vitest run |
| `npm run test:watch` | Vitest watch mode |

## Social preview (Open Graph)

This is a client-side rendered SPA, so social crawlers (LinkedIn, WhatsApp,
Slack, Twitter) never execute the JavaScript. Every tag they read must be
present in the served HTML.

The Open Graph and Twitter Card tags therefore live **statically in
`index.html`** — do not move them into `react-helmet` or any runtime
component, or link previews will silently break.

The preview image is `public/og-image.png` (1200x630 PNG). If you change the
image, keep those dimensions and keep the absolute URL in `index.html` in sync.

After deploying a change to any of these tags, refresh LinkedIn's cache at
<https://www.linkedin.com/post-inspector/> — LinkedIn caches previews for roughly
seven days and will keep serving the old one otherwise.

Verify what crawlers actually see:

```bash
curl -sL https://sathishkumar.cloud/ | grep -i 'og:'
```

## Deployment

The repo also ships a `Dockerfile`, `docker-compose.yml` and `Jenkinsfile` from
the original setup. Update the deploy target after the repository transfer.

## License

MIT — see [LICENSE](./LICENSE).
