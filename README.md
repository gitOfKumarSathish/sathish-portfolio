# Sathish Portfolio

Personal portfolio site for Sathish Kumar Arputharajan — Technical Lead & Full-Stack Engineer.

**Live:** <https://sathishkumar.cloud/>

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- Framer Motion + GSAP + Lenis + tsParticles for motion
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

## Motion

Most sections are scroll-driven rather than statically animated — they unfold as
you scroll instead of fading in. Shared primitives live in
`src/components/motion/`; easing tokens and reveal variants are in
`src/lib/motion.ts`.

### Scroll-driven sections

| Component | Used by | Behaviour |
| --- | --- | --- |
| `ScrollStory` | About | Pins and advances through its steps as you scroll |
| `HorizontalRail` | Experience | Pins and travels the timeline sideways |
| `StackedCards` | Projects | Cards pin in turn and build up a visible deck |
| `ScrollHighlightText` | Statement, Contact | Copy resolves word by word |

All four pin with plain `position: sticky` inside a tall spacer — nothing is
cloned or re-measured, which keeps them stable alongside smooth scrolling. Each
falls back to an ordinary vertical list below the `lg` breakpoint and under
`prefers-reduced-motion`; hijacking scroll on a phone is worse than not doing it.

### Supporting primitives

`SmoothScroll` (Lenis), `Preloader`, `ScrollProgress`, `CustomCursor`,
`AmbientBackdrop`, `Reveal`, `TextReveal`, `Magnetic`, `SpotlightCard`,
`TiltCard`, `Counter`, `Marquee`.

### Invariants

Each of these caused a real bug during the motion rebuild. They all fail
**silently** — nothing throws, nothing logs — so they are worth reading before
editing motion or layout code.

**Never put `overflow-x: hidden` on a page wrapper.** It turns the element into
a scroll container, which breaks `position: sticky` for every descendant, so
each pinned section quietly stops pinning. `src/pages/Index.tsx` uses
`overflow-x: clip`, which contains the overflow without that side effect. The
clip is load-bearing: horizontal entrance animations slide past the viewport
edge without it (~14px of horizontal scroll below 1280px).

**Framer Motion writes an inline `transform`, which beats Tailwind's transform
utilities.** An element carrying both `-translate-x-1/2` and an animated `scale`
loses the translate — inline style wins over a class. Put positioning on a
wrapper and the animation on its child. This is why timeline markers and rails
are wrapped rather than animated directly; they were sitting 1.5px off their
lines before.

**`background-clip: text` does not survive being split across transformed
children.** Splitting gradient text into per-character spans leaves every glyph
with transparent fill and no gradient of its own — the text disappears.
`TextReveal` handles it by measuring the rendered line, then giving each glyph
the *full-line* gradient shifted by its own offset: per-character animation with
one continuous sweep. It re-measures after `document.fonts.ready`, because web
fonts land after first paint and shift every glyph.

**Stacked cards must be opaque.** Translucent `glass` cards stacked on one
another let the whole deck show through and read as a smear rather than layers.

**`html` is positioned** (`position: relative`, set in `src/index.css`).
Scroll-driven sections measure their offsets against the root scroll container,
which has to be positioned for that maths to resolve.

**Lenis owns scrolling.** `scroll-behavior` is `auto` — native smooth scrolling
fights Lenis's rAF loop. Lenis and GSAP ScrollTrigger share a single ticker so
pinning and parallax stay in step, and in-page anchors are intercepted globally
in `SmoothScroll` so every jump runs through the same easing.

### Reduced motion

`prefers-reduced-motion` is honoured throughout: Lenis never initialises, the
preloader and custom cursor do not mount, pinned layouts fall back to lists, and
`MotionConfig reducedMotion="user"` drops transform animations that CSS alone
cannot reach. `.text-gradient` also switches to a static full-range gradient —
its drift animation pans a 220%-wide gradient, so frozen at frame zero it would
show only the first colour.

## Contact form

There is no backend. Submitting builds a `mailto:` link and hands the draft to
the visitor's mail client, rather than discarding the message or faking a
success state. To wire up a real endpoint (Formspree, Resend, your own API),
replace `handleSubmit` in `src/components/portfolio/ContactSection.tsx`.

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
