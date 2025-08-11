import MovieTiles from './MovieTiles'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, getByRole, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

describe('MovieTiles', () => {
  it('renders movie tiles', () => {
    // arrange
    render(
      <MovieTiles
        movies={[
          { id: 1, title: 'title' },
          { id: 2, title: 'another_title' },
        ]}
      />
    )

    // assert
    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('another_title')).toBeInTheDocument()
  })

  it('triggers the callback on selected movie change', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(
      <MovieTiles
        movies={[
          { id: 1, title: 'title' },
          { id: 2, title: 'another_title' },
        ]}
        onSelectMovie={callback}
      />
    )

    // act
    await user.click(screen.getByText('another_title'))

    // assert
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ id: 2, title: 'another_title' }),
      expect.anything()
    )
  })

  it('triggers the callback on edit movie', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(
      <MovieTiles
        movies={[
          { id: 1, title: 'title' },
          { id: 2, title: 'another_title' },
        ]}
        onEditMovie={callback}
      />
    )

    // act
    const movieTile = screen.getByRole('article', { name: 'another_title' })
    await user.hover(movieTile)
    // bug: https://github.com/testing-library/user-event/discussions/1156
    await user.pointer({
      target: getByRole(movieTile, 'button'),
      keys: '[MouseLeft]',
    })
    await user.pointer({
      target: getByRole(movieTile, 'menuitem', { name: 'Edit' }),
      keys: '[MouseLeft]',
    })

    // assert
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ id: 2, title: 'another_title' })
    )
  })

  it('triggers the callback on delete movie', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(
      <MovieTiles
        movies={[
          { id: 1, title: 'title' },
          { id: 2, title: 'another_title' },
        ]}
        onDeleteMovie={callback}
      />
    )

    // act
    const movieTile = screen.getByRole('article', { name: 'another_title' })
    await user.hover(movieTile)
    // bug: https://github.com/testing-library/user-event/discussions/1156
    await user.pointer({
      target: getByRole(movieTile, 'button'),
      keys: '[MouseLeft]',
    })
    await user.pointer({
      target: getByRole(movieTile, 'menuitem', { name: 'Delete' }),
      keys: '[MouseLeft]',
    })

    // assert
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ id: 2, title: 'another_title' })
    )
  })

  afterEach(() => {
    cleanup()
  })
})
