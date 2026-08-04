# Mervix Group — Homepage (React)

React port of the Mervix Group homepage. Vite + React 18 + three.js.

## Run it

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # production build → dist/
```

## Structure

```
mervix-react/
├── index.html                  Meta tags, fonts, GA4 snippet
├── vite.config.js
└── src/
    ├── main.jsx                Entry point
    ├── App.jsx                 Page composition
    ├── styles.css              Tokens (:root vars), resets, all section styles
    ├── data/content.js         All copy: capabilities, companies, mission, tags, email
    ├── lib/
    │   ├── globe.js            Three.js hero globe (initGlobe → cleanup)
    │   └── analytics.js        GA4 event helper
    ├── components/
    │   ├── Nav.jsx             Sticky pill nav (scroll state)
    │   ├── Hero.jsx            Headline + CTAs + globe
    │   ├── Globe.jsx           Canvas lifecycle wrapper for lib/globe.js
    │   ├── Reveal.jsx          IntersectionObserver scroll-reveal wrapper
    │   ├── WhatWeDo.jsx        Capability cards (data-driven)
    │   ├── TheGroup.jsx        Four company cards (data-driven)
    │   ├── About.jsx           Mission statement + value cards
    │   ├── Careers.jsx         Dark panel + role tags
    │   ├── Contact.jsx         CTA + mailto
    │   └── Footer.jsx
    └── assets/                 Logo + globe icon texture
```

## Editing content

All copy lives in `src/data/content.js` — company names, capability cards,
mission cards, career tags, and the contact email. Components render from it.

Design tokens (colors, fonts, spacing) are CSS custom properties at the top of
`src/styles.css`.

## Configuration

- **Google Analytics** — replace `G-XXXXXXXXXX` (two spots in `index.html`).
  Events (`generate_lead`, `contact_click`, `select_content`) fire via
  `src/lib/analytics.js`.
- **Responsive** — handled with real media queries in `styles.css`
  (nav links ≥880px, careers panel <860px, footer grid <680px).

## The globe

`src/lib/globe.js` is framework-agnostic: `initGlobe(canvas, iconUrl)` builds
the scene (graticule sphere, tech nodes, India + USA outlines and pins,
south-pole logo cap, cursor connection lines) and returns a cleanup function.
`Globe.jsx` wires it to a `useEffect`, so it survives React 18 StrictMode
double-mounting. Drag to rotate; hover to highlight technology nodes.

© 2026 Mervix Technology Pvt Ltd.
