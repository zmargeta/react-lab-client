import MovieTile from './MovieTile'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { userEvent } from '@testing-library/user-event'

describe('MovieTile', () => {
  it('renders default information', () => {
    // arrange
    render(<MovieTile />)

    // assert
    expect(screen.getAllByText('Unknown')).toHaveLength(2)
    expect(screen.getAllByText('N/A')).toHaveLength(1)
  })

  it('renders movie information', () => {
    // arrange
    render(
      <MovieTile
        imageUrl="image_url"
        title="title"
        releaseYear={2025}
        genres={['genre, another_genre']}
      />
    )

    // assert
    expect(screen.getByRole('img')).toHaveStyle('background-image: url("image_url")')
    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('2025')).toBeInTheDocument()
    expect(screen.getByText('genre, another_genre')).toBeInTheDocument()
  })

  it('triggers the callback after clicking', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(<MovieTile onClick={callback} />)

    // act
    await user.click(screen.getByRole('article'))

    // assert
    expect(callback).toHaveBeenCalled()
  })

  it('does not show the menu button when mouse is not over', () => {
    // arrange
    render(<MovieTile />)

    // assert
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('shows the menu button when mouse is over', async () => {
    // arrange
    const user = userEvent.setup()
    render(<MovieTile />)

    // act
    await user.hover(screen.getByRole('article'))

    // assert
    expect(screen.queryByRole('button')).toBeInTheDocument()
  })

  it('hides the menu button after the mouse exits', async () => {
    // arrange
    const user = userEvent.setup()
    render(<MovieTile />)

    // act
    await user.hover(screen.getByRole('article'))
    await user.unhover(screen.getByRole('article'))

    // assert
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('shows the popup menu when clicking the menu button', async () => {
    // arrange
    const user = userEvent.setup()
    render(<MovieTile />)

    // act
    await user.hover(screen.getByRole('article'))
    // bug: https://github.com/testing-library/user-event/discussions/1156
    await user.pointer({
      target: screen.getByRole('button'),
      keys: '[MouseLeft]',
    })

    // assert
    expect(screen.queryByRole('menu')).toBeInTheDocument()
  })

  it('triggers the callback on edit menu item click', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(<MovieTile onEditMovie={callback} />)

    // act
    await user.hover(screen.getByRole('article'))
    // bug: https://github.com/testing-library/user-event/discussions/1156
    await user.pointer({
      target: screen.getByRole('button'),
      keys: '[MouseLeft]',
    })
    await user.pointer({
      target: screen.getByRole('menuitem', { name: 'Edit' }),
      keys: '[MouseLeft]',
    })

    // assert
    expect(callback).toHaveBeenCalled()
  })

  it('triggers the callback on delete menu item click', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(<MovieTile onDeleteMovie={callback} />)

    // act
    await user.hover(screen.getByRole('article'))
    // bug: https://github.com/testing-library/user-event/discussions/1156
    await user.pointer({
      target: screen.getByRole('button'),
      keys: '[MouseLeft]',
    })
    await user.pointer({
      target: screen.getByRole('menuitem', { name: 'Delete' }),
      keys: '[MouseLeft]',
    })

    // assert
    expect(callback).toHaveBeenCalled()
  })

  afterEach(() => {
    cleanup()
  })
})
