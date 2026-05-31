import { useContext } from 'react'
import { CmsContext } from './CmsProvider'
import type { PageContent } from './types'
import type { HubDbResourceRow } from './hubdb'

/**
 * Read one module's field group from the simulated CMS.
 * Throws a clear error if rendered outside a `CmsProvider` — modules should never be mounted
 * without the content layer.
 */
export function useCmsContent<K extends keyof PageContent>(key: K): PageContent[K] {
  const data = useContext(CmsContext)
  if (data === null) {
    throw new Error(
      `useCmsContent("${String(key)}") must be used inside a <CmsProvider>. ` +
        'Wrap the app (or the rendered module) in a CmsProvider.',
    )
  }
  return data.content[key]
}

/** Read the simulated HubDB rows. Throws outside a `CmsProvider`, like `useCmsContent`. */
export function useHubDb(): readonly HubDbResourceRow[] {
  const data = useContext(CmsContext)
  if (data === null) {
    throw new Error('useHubDb() must be used inside a <CmsProvider>.')
  }
  return data.hubdb
}
