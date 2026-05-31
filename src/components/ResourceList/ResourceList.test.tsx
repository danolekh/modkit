import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithCms } from '../../test/renderWithCms'
import ResourceList from './ResourceList'

describe('ResourceList', () => {
  it('renders pageSize cards, each with an accessibly-named link', () => {
    renderWithCms(<ResourceList />, {
      content: { resourceList: { heading: 'Resources', pageSize: 4 } },
    })

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
    for (const link of links) {
      expect(link).toHaveAccessibleName()
    }
  })

  it('renders all rows without error when pageSize exceeds the row count', () => {
    renderWithCms(<ResourceList />, {
      content: { resourceList: { pageSize: 99 } },
    })

    // The simulated HubDB has 6 rows.
    expect(screen.getAllByRole('link')).toHaveLength(6)
  })
})
