# Jawdat Abdullah — CV Portfolio

Modern, responsive CV portfolio at [jawdat-dev.online](https://jawdat-dev.online). Built with React, TypeScript, and Tailwind CSS. Multilingual (English, Hebrew, Arabic) with full RTL support.

## Features

- **Multilingual & RTL** — English, Hebrew, and Arabic with direction-aware layout
- **Single-page portfolio** — Hero, Who Am I, About, Projects, Experience, Skills, Education & Certifications, Languages, Contact
- **Design system** — Warm charcoal surfaces with royal blue accent; dark/light theme with persistence
- **Animated background** — Subtle canvas ripple effect (respects `prefers-reduced-motion`)
- **CV downloads** — Shared dropdown for English and Hebrew PDFs (nav, hero, contact)
- **Featured projects** — Including this portfolio ([cv](https://github.com/jawdat89/cv)), myShop, iManage, iPresent, and open-source [dup_py](https://github.com/jawdat89/dup_py)
- **SEO** — Meta tags, Open Graph, JSON-LD, `robots.txt`, and `sitemap.xml`
- **Accessibility** — Skip link, focus styles, semantic sections, ARIA on interactive controls
- **CI-ready** — Lint, 59 tests, and production build via `npm run ci`

## Tech Stack

- React 18 · TypeScript · Vite 7
- Tailwind CSS · Framer Motion
- Redux Toolkit · react-i18next
- Vitest · React Testing Library

## Page Sections

1. **Hero** — Role eyebrow, name, CTAs, Strauss employer badge (no duplicate title/subtitle)
2. **Who Am I** — Value proposition cards (business systems, SAP & logistics, automation)
3. **About** — Professional summary
4. **Projects** — Featured work with outcomes and open-source badges
5. **Experience** — Timeline with localized copy
6. **Skills** — Grouped badge layout (frontend, backend, data, design, SAP & ERP, automation/industrial)
7. **Education & Certifications** — Combined section (SAP EWM 100 / S/4HANA merged cert)
8. **Languages** — Proficiency levels
9. **Contact** — Professional contact details and CV download

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Typecheck + Vite production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (watch) |
| `npm run test:run` | Vitest (single run) |
| `npm run ci` | Lint + test + build |

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Card, Button, Badge, Section, SectionHeading
│   ├── CVDownloadSelect.tsx   # Shared CV download menu (nav / hero / contact)
│   ├── RelaxingDropsBackground.tsx
│   └── LanguageSelector.tsx
├── lib/theme.ts               # Design tokens
├── pages/dashboard/
│   ├── DashboardPage.tsx      # Layout, nav, scroll-spy
│   └── components/            # Hero, ValueProposition, Projects, etc.
├── i18n/locales/              # en.json, he.json, ar.json
├── store/cvSlice.ts           # CV data, theme, language
└── utils/cvDownload.ts        # PDF download helpers
public/
├── robots.txt
├── sitemap.xml
└── static/                    # CV PDFs
```

## Theming

CSS variables in `src/index.css` drive the brand palette:

- **Dark** — Charcoal background, royal blue accent (`#4169E1`)
- **Light** — Paper background, blue accent (`#2563EB`)

Tailwind layer utilities (`layer-drops`, `layer-content`, `layer-nav`) manage z-index stacking for the animated background.

## Testing

```bash
npm test           # watch mode
npm run test:run   # CI single run
npm run coverage   # with coverage report
```

## Recent Updates

- **CV portfolio** added as a featured project with GitHub link
- Shortened featured project descriptions and outcomes (EN / HE / AR)
- Hero simplified — removed duplicate title and subtitle lines
- About Me summary tightened across locales and Redux store
- Skills: Python under **Backend** only; **Arduino** added to Automation / Industrial
- SAP **EWM 100 / S/4HANA** merged (certifications badge + SAP & ERP skills)
- i18n cleanup — removed unused hero keys and legacy `sampleData` block
- Portfolio redesign with design system and royal blue theme
- Title updated to **Software & Automation Engineer**
- **Who Am I** section (formerly What I Bring)
- Skills expanded: Power BI, Visio, draw.io, Visual Paradigm, National Instruments
- Featured **dup_py** open-source project
- Shared **CVDownloadSelect** with RTL-aware positioning
- Relaxing drops canvas background with Tailwind layer stack
- Combined Education & Certifications section
- Contact copy refined for professional reference (not job-seeking tone)
- SEO meta, schema.org, robots.txt, sitemap.xml

## License

Private project — All rights reserved.
