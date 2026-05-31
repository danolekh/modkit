import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithCms } from '../../test/renderWithCms'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the required heading as an <h1> and an accessible primary CTA', () => {
    renderWithCms(<Hero />)

    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(/typed React components/i)
    expect(screen.getByRole('link', { name: /explore components/i })).toBeInTheDocument()
  })

  it('renders only the primary CTA when secondaryCta is omitted (no empty node)', () => {
    renderWithCms(<Hero />, {
      content: {
        hero: {
          heading: 'Just a heading',
          primaryCta: { label: 'Only CTA', href: '#' },
          variant: 'default',
        },
      },
    })

    expect(screen.getAllByRole('link')).toHaveLength(1)
    expect(screen.getByRole('link', { name: 'Only CTA' })).toBeInTheDocument()
  })
})
