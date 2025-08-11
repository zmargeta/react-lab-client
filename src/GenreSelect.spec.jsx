import GenreSelect from './GenreSelect.jsx'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

describe('GenreSelect', () => {
  it('renders all genres', () => {
    // arrange
    render(<GenreSelect values={['genre', 'another_genre']} selected={'genre'} />)

    // assert
    const actualGenres = screen.getAllByRole('tab')
    expect(actualGenres).toHaveLength(2)
    expect(actualGenres[0]).toHaveTextContent('genre')
    expect(actualGenres[1]).toHaveTextContent('another_genre')
  })

  it('renders selected genre', () => {
    // arrange
    render(<GenreSelect values={['genre', 'another_genre']} selected={'genre'} />)

    // assert
    const actualGenres = screen.getAllByRole('tab')
    expect(actualGenres[0]).toHaveTextContent('genre')
    expect(actualGenres[0]).toHaveClass('selected')
    expect(actualGenres[1]).toHaveTextContent('another_genre')
    expect(actualGenres[1]).not.toHaveClass('selected')
  })

  it('triggers the callback on selected genre change', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(
      <GenreSelect values={['genre', 'another_genre']} selected={'genre'} onChange={callback} />
    )

    // act
    await user.click(screen.getByText('another_genre'))

    // assert
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith('another_genre', expect.anything())
  })

  afterEach(() => {
    cleanup()
  })
})
