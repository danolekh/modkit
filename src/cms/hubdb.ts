/**
 * Simulated HubDB table.
 *
 * In production this is a real HubDB table queried from a module via `hubdb_table_rows()` (HUBL)
 * or a serverless function. The row shape mirrors the table's columns.
 */
export interface HubDbResourceRow {
  id: number
  title: string
  summary: string
  tag: string
  url: string
}

export const resourceRows: readonly HubDbResourceRow[] = [
  {
    id: 1,
    title: 'HubSpot CMS modules overview',
    summary: 'How module.html, fields.json and meta.json fit together to make a marketer-editable module.',
    tag: 'Guide',
    url: 'https://developers.hubspot.com/docs/cms/building-blocks/modules',
  },
  {
    id: 2,
    title: 'Designing a fields.json field group',
    summary: 'Field types, groups, and the occurrence settings that power repeaters.',
    tag: 'Reference',
    url: 'https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields',
  },
  {
    id: 3,
    title: 'Querying HubDB from a module',
    summary: 'Use hubdb_table_rows() in HUBL to render dynamic, data-driven listings.',
    tag: 'HubDB',
    url: 'https://developers.hubspot.com/docs/cms/data/hubdb',
  },
  {
    id: 4,
    title: 'Serverless functions on HubSpot',
    summary: 'Fetch and filter data at request time for interactive, dynamic modules.',
    tag: 'Serverless',
    url: 'https://developers.hubspot.com/docs/cms/data/serverless-functions',
  },
  {
    id: 5,
    title: 'Local development with the HubSpot CLI',
    summary: 'hs create, hs upload and hs watch for a Git-backed module workflow.',
    tag: 'Tooling',
    url: 'https://developers.hubspot.com/docs/cms/developer-reference/local-development-cli',
  },
  {
    id: 6,
    title: 'Accessible components in the CMS',
    summary: 'Patterns for keyboard support, focus management and ARIA inside modules.',
    tag: 'A11y',
    url: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
  },
]
