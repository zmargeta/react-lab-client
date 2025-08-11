import Button from './Button.jsx'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

describe('Button', () => {
  it('renders a button', () => {
    // arrange
    render(<Button>label</Button>)

    // assert
    expect(screen.getByRole('button')).toHaveTextContent('label')
  })

  it('triggers the callback after clicking', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(<Button onClick={callback} />)

    // act
    await user.click(screen.getByRole('button'))

    // assert
    expect(callback).toHaveBeenCalled()
  })

  afterEach(() => {
    cleanup()
  })
})
