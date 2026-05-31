import { createContext, type ReactNode } from 'react'
import type { PageContent } from './types'
import type { HubDbResourceRow } from './hubdb'

/** Everything the simulated CMS exposes: the page field tree plus the HubDB rows. */
export interface CmsData {
  content: PageContent
  hubdb: readonly HubDbResourceRow[]
}

/** `null` sentinel lets `useCmsContent` detect (and throw) when used outside the provider. */
export const CmsContext = createContext<CmsData | null>(null)

export interface CmsProviderProps {
  value: CmsData
  children: ReactNode
}

/**
 * Holds the simulated CMS content so modules read their own field group via `useCmsContent`
 * instead of receiving content through props (no prop drilling).
 */
export function CmsProvider({ value, children }: CmsProviderProps) {
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>
}
