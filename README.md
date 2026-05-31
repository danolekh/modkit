# ModKit

A small **HubSpot-ready React component system** with a demo landing page.

The one idea that ties it together: **every component's props mirror a HubSpot module's `fields.json`
field group**, and each component folder ships a real `fields.json`. Content is delivered through a
simulated CMS layer, so components never receive content via props — they read their own field group,
exactly as a HubSpot module reads its fields at render time.

- **Stack:** Vite 6 · React 18 · TypeScript (`strict` + `noUncheckedIndexedAccess` +
  `exactOptionalPropertyTypes`) · CSS Modules.
- **Runtime dependencies:** `clsx` only. No UI library, no headless primitive library, no CSS-in-JS.
- **Bundle:** **51.55 KB** gzipped JS against a **150 KB** budget; `ResourceList` is code-split and
  lazy-loaded on scroll.

---

## Setup & run

```bash
npm install      # install dependencies
npm run dev      # start the dev server (Vite) → http://localhost:5173
npm run build    # type-check (tsc --noEmit) then build to dist/
npm run preview  # preview the production build locally
npm test         # run the test suite once (Vitest)
npm run test:watch
npm run size     # build, then check the gzipped JS bundle against the 150 KB budget
npm run typecheck
```

Requires Node 18+ (developed on Node 24).

---

## Architecture

### Props mirror HubSpot `fields.json`

HubSpot CMS modules are configured by a `fields.json` field group (`text`, `richtext`, `image`,
`link`, `choice`, `boolean`, `number`, `group` with `occurrence` for repeaters). In ModKit:

- `src/cms/types.ts` models the **resolved field values** as a discriminated union (`Field`, tagged by
  HubSpot's `type`) plus per-module field-group types (`HeroFields`, `FeatureGridFields`, …). Those
  field-group types **are the component prop shapes**.
- Each component folder ships a real `fields.json` whose entries line up 1:1 with the TS field-group
  type. For example `Hero/fields.json` has `heading` (`text`, required), `subcopy` (`richtext`),
  `primary_cta`/`secondary_cta` (`link`), and `variant` (`choice`) — the same fields as `HeroFields`.

So the claim "props mirror `fields.json`" is literal: a marketer editing the module in HubSpot edits
the same set of fields the React component is typed against.

### Content layer — no prop drilling

```
CmsProvider (holds { content: PageContent, hubdb: HubDbResourceRow[] })
   └─ App  → lists modules in render order only (zero content props)
        ├─ Hero            → useCmsContent('hero')
        ├─ FeatureGrid     → useCmsContent('featureGrid')
        ├─ FaqAccordion    → useCmsContent('faq')
        └─ ResourceList    → useCmsContent('resourceList') + useHubDb()
```

- `src/cms/content.ts` — the simulated CMS page tree (what HubSpot would return for the page).
- `src/cms/hubdb.ts` — a simulated **HubDB** table for the resource list.
- `src/cms/CmsProvider.tsx` + `src/cms/useCmsContent.ts` — context + hooks. `useCmsContent(key)` returns
  a module's typed field group and **throws a clear error if used outside `CmsProvider`**; `useHubDb()`
  returns the rows. `App.tsx` composes the page by listing modules; it passes no content down.

### Components

| Component | Key fields | Notes |
|---|---|---|
| **Hero** | `eyebrow?`, `heading` (→ `<h1>`), `subcopy?` (richtext), `primaryCta`, `secondaryCta?`, `variant` | Optional fields gracefully render nothing. |
| **FeatureGrid** | `heading?`, `columns` (2/3/4), `items` (repeater of `{ icon, title, body }`) | Repeater → typed array; empty `items` → empty state, not a broken grid. |
| **FaqAccordion** | `heading?`, `items` (repeater of `{ question, answer }`) | Hand-built, fully keyboard-operable accordion (see Accessibility). |
| **ResourceList** | `heading?`, `pageSize` | Reads simulated HubDB; `React.lazy` + `Suspense`, mounted only when it scrolls into view. |

### Styling

CSS Modules + a single set of design tokens in `src/styles/tokens.css` (color, space, radius,
typography). Components reference tokens only — no hardcoded colors. No UI library means the primitives
(buttons, cards, the accordion) are built here, which is exactly what this test grades.

### Performance / bundle budget

`ResourceList` is below the fold, so it's split into its own chunk and lazy-loaded the first time it
scrolls into view (`src/hooks/useInView.ts`, IntersectionObserver). `npm run size` enforces a 150 KB
gzip budget via `size-limit`; `rollup-plugin-visualizer` writes a `stats.html` bundle report on build.

```
dist/assets/index-*.js          155.88 kB │ gzip: 51.14 kB   (React + app)
dist/assets/ResourceList-*.js     0.83 kB │ gzip:  0.43 kB   (lazy module)
dist/assets/index-*.css           7.21 kB │ gzip:  2.03 kB

size-limit → Total app JS (gzip): 51.55 KB  /  Size limit: 150 KB   ✔
            Loading time: 1.1 s on slow 3G
```

---

## Accessibility

- Semantic landmarks (`header` / `main` / `footer`), a single `<h1>` (Hero), logical heading order
  (`h1` → section `h2` → card/FAQ `h3`), accessible names on every CTA and resource link, and a global
  visible `:focus-visible` ring.
- **FaqAccordion** (the a11y showpiece, built by hand):
  - Each header is a real `<button>` wrapped in an `<h3>`, with `aria-expanded` and `aria-controls`.
  - Each panel is `role="region"`, labelled by its header via `aria-labelledby`, and `hidden` when
    closed (so it leaves the tab order and the accessibility tree).
  - Keyboard: **Enter/Space** toggle (native button); **Arrow Up/Down** + **Home/End** move focus
    between headers (roving focus). It is **multi-open** — see Trade-offs.
- **Verified by** (1) a `vitest-axe` smoke test that renders the whole page and asserts no violations
  (`src/App.test.tsx`), and (2) a manual keyboard-only walk: Tab through header → Hero CTAs →
  FeatureGrid (no focusable traps) → FAQ headers (arrow/Home/End/Enter) → resource links, confirming
  visible focus throughout and no traps. `color-contrast` is checked via AA-contrast tokens and the
  manual walk (axe-core can't compute contrast under jsdom, so that one rule is disabled in the test).

---

## Testing

`Vitest` + `@testing-library/react` + `jsdom` + `vitest-axe`. 5 functional tests cover the critical
paths and edge cases, plus 1 axe smoke test (10 assertions total):

1. **Hero** — required `heading` renders as `<h1>`; `primaryCta` has an accessible name; with
   `secondaryCta` omitted, exactly one CTA renders.
2. **FeatureGrid** — a 3-item repeater renders 3 cards; empty `items` renders the empty state.
3. **FaqAccordion** — focus a header, press Enter → `aria-expanded` flips to `true` and the panel
   shows; Arrow Down moves focus to the next header.
4. **useCmsContent** — throws outside `CmsProvider`; returns the right field group inside it.
5. **ResourceList** — renders `pageSize` cards with accessibly-named links; `pageSize` larger than the
   row count renders all rows without error.
6. **App** — full demo page has no `vitest-axe` violations.

```bash
npm test
```

---

## HubSpot integration plan

Each React component maps to a HubSpot **module** (`module.html` + `fields.json` + `meta.json`). The
`fields.json` files in this repo are the real module schemas, so marketers edit the same props the
components are typed against.

**Two rendering strategies:**

- **(a) React islands hydrated inside `module.html` (recommended for these modules).** Ship a built JS
  bundle per module; the module's HUBL serializes the field values into a root element's data/props,
  and a small entry hydrates the React component into it. Each module stays isolated and shippable on
  its own. This matches how these components are already authored (props = resolved fields).
- **(b) HubSpot's CMS-React / JS building blocks** for server-rendered React. Better for a full
  React-first site, but heavier than needed for a handful of isolated modules.

**ResourceList → HubDB.** The simulated table in `src/cms/hubdb.ts` becomes a real **HubDB** table.
The module queries it with `hubdb_table_rows()` in HUBL for static/SSG rendering, or via a
**serverless function** when it needs request-time filtering/pagination — enabling dynamic pages.

**Tooling.** Develop modules with `@hubspot/cli` (`hs create module`, `hs upload`, `hs watch` for live
local sync). Fields live in `fields.json`; theme/module code is versioned in Git, with CI running
`hs upload` on merge.

---

## Trade-offs

- **No UI / headless library.** The test grades accessibility competence, so the accordion is built by
  hand. In production I'd reach for **Base UI** (or React-Aria) for primitives and keep the
  fields-mirror-the-schema discipline on top.
- **Multi-open accordion.** Any number of panels can be open at once — common for FAQs and simpler
  state than a single-open variant. Easy to switch to single-open if the brief preferred it.
- **CSS Modules over Tailwind / CSS-in-JS.** Keeps the bundle tiny, demonstrates building primitives
  from tokens, and avoids a runtime styling dependency.
- **Simulated data over a live API.** A typed `content.ts` + `hubdb.ts` is the right "backend" for a
  short, reviewable test and mirrors the real HubSpot/HubDB shapes the integration would use.
- **Single `vite` via npm `overrides`.** Vitest pulled a nested `vite@5` whose plugin types clashed
  with the `vite@6` `react()` plugin under `exactOptionalPropertyTypes`; `overrides: { "vite": "$vite" }`
  forces one `vite` everywhere.

---

## What I'd build next (the 1-hour stop list)

- **Storybook** as the module catalog + **visual regression** tests.
- A real `hs upload` pipeline and a deployed **HubDB-backed dynamic page**.
- **Schema-driven generation of `fields.json` from the TS field types** (single source of truth) so the
  two can never drift.
- **i18n** on fields, more modules, and **CI** running `tsc` + tests + axe + bundle-size on PRs.

---

## License

MIT © 2026 Daniil Olekh. See [LICENSE](./LICENSE).
