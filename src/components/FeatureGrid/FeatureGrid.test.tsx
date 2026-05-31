import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithCms } from '../../test/renderWithCms'
import { FeatureGrid } from './FeatureGrid'

describe('FeatureGrid', () => {
  it('renders one card per repeater item', () => {
    renderWithCms(<FeatureGrid />, {
      content: {
        featureGrid: {
          columns: 3,
          items: [
            { icon: 'bolt', title: 'One', body: '<p>1</p>' },
            { icon: 'shield', title: 'Two', body: '<p>2</p>' },
            { icon: 'spark', title: 'Three', body: '<p>3</p>' },
          ],
        },
      },
    })

    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByRole('heading', { level: 3, name: 'Two' })).toBeInTheDocument()
  })

  it('renders the empty state (not a broken grid) when items is empty', () => {
    renderWithCms(<FeatureGrid />, {
      content: { featureGrid: { columns: 3, items: [] } },
    })

    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(screen.getByText(/no features/i)).toBeInTheDocument()
  })
})
