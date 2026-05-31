import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { renderWithCms } from '../test/renderWithCms'
import { useCmsContent } from './useCmsContent'

function Probe() {
  const hero = useCmsContent('hero')
  return <span>{hero.heading}</span>
}

describe('useCmsContent', () => {
  it('throws a clear error when used outside a CmsProvider', () => {
    // React logs the thrown render error; silence it for a clean test output.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Probe />)).toThrow(/CmsProvider/)
    spy.mockRestore()
  })

  it('returns the requested field group inside a CmsProvider', () => {
    renderWithCms(<Probe />)
    expect(screen.getByText(/typed React components/i)).toBeInTheDocument()
  })
})
