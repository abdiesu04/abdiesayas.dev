# abdiesayas.dev

<!-- Personal portfolio site by Abdi Esayas. -->

Personal portfolio for Abdi Esayas — AI systems engineer, Addis Ababa.

An editorial, print-inspired single page: masthead, technology band, selected work, career, résumé, about, and contact. Motion is deliberate and restrained, and the whole page stays readable with JavaScript disabled or reduced motion enabled.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) — CSS-first, design tokens live in the `@theme` block in `app/globals.css`, there is no `tailwind.config.js`
- [Motion](https://motion.dev) for scroll reveals and the work carousel
- Instrument Serif, Inter and JetBrains Mono via `next/font`

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run lint    # eslint
npx tsc --noEmit
```

## Layout

```
app/
  components/   sections and shared primitives
  data/         projects, career, education
  lib/          shared constants
  globals.css   design tokens and the marquee
public/
  logos/        technology marks
  projects/     full-page captures of the live sites
  abdi-esayas-resume.pdf   the résumé the résumé section serves
  resume-preview.png       its first page, for browsers that will not inline a PDF
```

## Updating the résumé

The résumé section embeds the PDF rather than retyping it, so the page and the
download can never disagree. To publish a new version, replace both files in
`public/` — the PDF and a matching image of its first page — and update
`previewSize` in `app/data/resume.ts` if the image dimensions change.

Deployed on [Vercel](https://vercel.com).
