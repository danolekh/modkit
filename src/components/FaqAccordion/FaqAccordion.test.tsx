import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithCms } from '../../test/renderWithCms'
import { FaqAccordion } from './FaqAccordion'

describe('FaqAccordion', () => {
  it('opens a panel with Enter and moves focus between headers with arrow keys', async () => {
    const user = userEvent.setup()
    renderWithCms(<FaqAccordion />, {
      content: {
        faq: {
          items: [
            { question: 'Q1', answer: '<p>A1</p>' },
            { question: 'Q2', answer: '<p>A2</p>' },
          ],
        },
      },
    })

    const first = screen.getByRole('button', { name: 'Q1' })
    const second = screen.getByRole('button', { name: 'Q2' })

    first.focus()
    expect(first).toHaveAttribute('aria-expanded', 'false')
    // Closed panels are hidden, so they are not in the accessibility tree.
    expect(screen.queryByRole('region', { name: 'Q1' })).toBeNull()

    await user.keyboard('{Enter}')
    expect(first).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('region', { name: 'Q1' })).toBeVisible()

    await user.keyboard('{ArrowDown}')
    expect(second).toHaveFocus()
  })
})
