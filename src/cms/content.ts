import type { PageContent } from './types'

/**
 * The simulated CMS page tree — what HubSpot would return for this page.
 * `App` renders modules in order; each module reads its own group via `useCmsContent`.
 */
export const pageContent: PageContent = {
  hero: {
    eyebrow: 'HubSpot-ready components',
    heading: 'Ship marketer-editable modules from typed React components',
    subcopy:
      '<p>ModKit pairs every React component with a real HubSpot <code>fields.json</code>, so the props you build against are the exact fields marketers edit in the CMS.</p>',
    primaryCta: { label: 'Explore components', href: '#features' },
    secondaryCta: { label: 'Read the docs', href: 'https://developers.hubspot.com/docs/cms', target: '_blank' },
    variant: 'centered',
  },
  featureGrid: {
    heading: 'Why ModKit',
    columns: 3,
    items: [
      {
        icon: 'plug',
        title: 'Props mirror fields.json',
        body: '<p>Each component ships a HubSpot field group. The TypeScript prop shape and the module schema stay in lockstep.</p>',
      },
      {
        icon: 'shield',
        title: 'Strict & type-safe',
        body: '<p>TypeScript <code>strict</code> with <code>noUncheckedIndexedAccess</code> and <code>exactOptionalPropertyTypes</code> — no <code>any</code>, no surprises.</p>',
      },
      {
        icon: 'spark',
        title: 'Accessible by default',
        body: '<p>Semantic landmarks, managed focus, and a hand-built keyboard accordion verified with axe.</p>',
      },
      {
        icon: 'bolt',
        title: 'Tiny bundle',
        body: '<p>No UI library. Hand-built primitives plus code-splitting keep the gzipped bundle well under budget.</p>',
      },
      {
        icon: 'layers',
        title: 'No prop drilling',
        body: '<p>A simulated CMS provider feeds each module its own field group via <code>useCmsContent</code>.</p>',
      },
      {
        icon: 'gauge',
        title: 'HubDB ready',
        body: '<p>The resource list reads a simulated HubDB table — swap in <code>hubdb_table_rows()</code> in production.</p>',
      },
    ],
  },
  faq: {
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'How do these components map to HubSpot?',
        answer:
          '<p>Every component folder ships a <code>fields.json</code> matching a HubSpot module field group. The React props are the resolved field values.</p>',
      },
      {
        question: 'Why no UI or headless component library?',
        answer:
          '<p>The test grades accessibility competence, so primitives like the accordion are hand-built. In production we would reach for Base UI or React-Aria.</p>',
      },
      {
        question: 'Is the accordion single- or multi-open?',
        answer:
          '<p>Multi-open: any number of panels can be expanded at once. Each header is a real button with full arrow-key roving focus.</p>',
      },
      {
        question: 'How is content delivered without prop drilling?',
        answer:
          '<p>A <code>CmsProvider</code> holds the page tree and HubDB rows; each module reads its own field group with <code>useCmsContent</code>.</p>',
      },
    ],
  },
  resourceList: {
    heading: 'Resources',
    pageSize: 4,
  },
}
