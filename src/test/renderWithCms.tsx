import { render, type RenderResult } from '@testing-library/react'
import type { ReactElement } from 'react'
import { CmsProvider } from '../cms/CmsProvider'
import { pageContent } from '../cms/content'
import { resourceRows } from '../cms/hubdb'
import type { PageContent } from '../cms/types'
import type { HubDbResourceRow } from '../cms/hubdb'

export interface RenderWithCmsOptions {
  /** Field groups to override on top of the real page content (shallow per-module merge). */
  content?: Partial<PageContent>
  /** HubDB rows to use instead of the real ones. */
  hubdb?: readonly HubDbResourceRow[]
}

/** Render a component tree wrapped in a `CmsProvider` seeded with the simulated CMS data. */
export function renderWithCms(ui: ReactElement, options: RenderWithCmsOptions = {}): RenderResult {
  const content: PageContent = { ...pageContent, ...options.content }
  const hubdb = options.hubdb ?? resourceRows
  return render(<CmsProvider value={{ content, hubdb }}>{ui}</CmsProvider>)
}
