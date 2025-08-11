import SearchForm from './SearchForm.jsx'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

describe('SearchForm', () => {
  it('renders the value', () => {
    // arrange
    render(<SearchForm value="value" />)

    // assert
    expect(screen.getByRole('searchbox')).toHaveValue('value')
  })

  it('triggers the callback on button click', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(<SearchForm onSubmit={callback} />)

    // act
    await user.type(screen.getByRole('searchbox'), 'value')
    await user.click(screen.getByRole('button', { type: 'search' }))

    // assert
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith('value')
  })

  it('triggers the callback on typing enter in the search textbox', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(<SearchForm onSubmit={callback} />)

    // act
    await user.type(screen.getByRole('searchbox'), 'value{enter}')

    // assert
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith('value')
  })

  afterEach(() => {
    cleanup()
  })
})
