import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { renderWithCms } from './test/renderWithCms'
import { App } from './App'

describe('App accessibility', () => {
  it('renders the full demo page with no axe violations', async () => {
    const { container } = renderWithCms(<App />)

    // jsdom has no IntersectionObserver, so ResourceList mounts immediately; wait for it.
    await screen.findByText(/HubSpot CMS modules overview/i)

    // color-contrast can't run in jsdom (no canvas); we verify contrast via AA tokens + manual walk.
    const results = await axe(container, {
      rules: { 'color-contrast': { enabled: false } },
    })
    expect(results).toHaveNoViolations()
  })
})
