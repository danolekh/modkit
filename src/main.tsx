import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { CmsProvider } from './cms/CmsProvider'
import { pageContent } from './cms/content'
import { resourceRows } from './cms/hubdb'
import './styles/tokens.css'
import './styles/global.css'

const rootEl = document.getElementById('root')
if (rootEl === null) {
  throw new Error('Root element #root not found')
}

createRoot(rootEl).render(
  <StrictMode>
    <CmsProvider value={{ content: pageContent, hubdb: resourceRows }}>
      <App />
    </CmsProvider>
  </StrictMode>,
)
