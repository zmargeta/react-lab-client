import GlyphButton from './GlyphButton.jsx'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

describe('GlyphButton', () => {
  it('renders a button', () => {
    // arrange
    render(<GlyphButton imageUrl="image_url">label</GlyphButton>)

    // assert
    expect(screen.getByRole('img')).toHaveStyle('mask-image: url("image_url")')
  })

  it('triggers the callback after clicking', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(<GlyphButton onClick={callback} />)

    // act
    await user.click(screen.getByRole('button'))

    // assert
    expect(callback).toHaveBeenCalled()
  })

  afterEach(() => {
    cleanup()
  })
})
