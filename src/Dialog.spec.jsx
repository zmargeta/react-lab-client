import Dialog from './Dialog'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

describe('Dialog', () => {
  it('renders content when visible', () => {
    // arrange
    render(
      <Dialog title="title" visible={true}>
        content
      </Dialog>
    )

    // assert
    expect(screen.queryByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('does not render when hidden', () => {
    // arrange
    render(<Dialog title="title">content</Dialog>)

    // assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  afterEach(() => {
    cleanup()
  })
})
