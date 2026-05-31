/**
 * HubSpot field-type model.
 *
 * HubSpot CMS modules are configured by a `fields.json` field group. Each entry has a `type`
 * (text, richtext, image, link, choice, boolean, number, group). The types below model the
 * *resolved values* those fields produce — i.e. what HubSpot hands a module at render time — so
 * that our React prop shapes mirror the module schema 1:1.
 */

/** HubSpot `fields.json` field `type` discriminants (the real HubSpot string values). */
export type HubSpotFieldType =
  | 'text'
  | 'richtext'
  | 'image'
  | 'link'
  | 'choice'
  | 'boolean'
  | 'number'
  | 'group'

/** Resolved value of a HubSpot `link` field. */
export interface LinkValue {
  label: string
  href: string
  target?: '_self' | '_blank'
}

/** Resolved value of a HubSpot `image` field. */
export interface ImageValue {
  src: string
  alt: string
  width?: number
  height?: number
}

/**
 * Discriminated union over a single resolved field value, tagged by its HubSpot `type`.
 * Used to narrow generic content (e.g. a schema-driven renderer) without `any` or `!`.
 * `TChoice` constrains a `choice` field to its allowed string literals.
 */
export type Field<TChoice extends string = string> =
  | { readonly type: 'text'; readonly value: string }
  | { readonly type: 'richtext'; readonly value: string } // HTML from HubSpot's rich-text editor
  | { readonly type: 'image'; readonly value: ImageValue }
  | { readonly type: 'link'; readonly value: LinkValue }
  | { readonly type: 'choice'; readonly value: TChoice }
  | { readonly type: 'boolean'; readonly value: boolean }
  | { readonly type: 'number'; readonly value: number }

/** A HubSpot `group` field with `occurrence` (a repeater) resolves to a typed array. */
export type Repeater<T> = readonly T[]

/* ----------------------------------------------------------------------------------------------
 * Per-module field groups.
 * Each interface is the prop shape of one component AND mirrors that component's `fields.json`.
 * -------------------------------------------------------------------------------------------- */

export type HeroVariant = 'default' | 'centered'

export interface HeroFields {
  eyebrow?: string
  heading: string
  subcopy?: string // richtext (HTML)
  primaryCta: LinkValue
  secondaryCta?: LinkValue
  variant: HeroVariant
}

export type FeatureIcon = 'bolt' | 'shield' | 'spark' | 'layers' | 'gauge' | 'plug'
export type FeatureColumns = 2 | 3 | 4

export interface FeatureItem {
  icon: FeatureIcon
  title: string
  body: string // richtext (HTML)
}

export interface FeatureGridFields {
  heading?: string
  columns: FeatureColumns
  items: Repeater<FeatureItem>
}

export interface FaqItem {
  question: string
  answer: string // richtext (HTML)
}

export interface FaqAccordionFields {
  heading?: string
  items: Repeater<FaqItem>
}

export interface ResourceListFields {
  heading?: string
  pageSize: number
}

/** The simulated CMS page tree: module key -> resolved field group. */
export interface PageContent {
  hero: HeroFields
  featureGrid: FeatureGridFields
  faq: FaqAccordionFields
  resourceList: ResourceListFields
}
