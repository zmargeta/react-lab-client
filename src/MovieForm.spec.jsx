import MovieForm from './MovieForm.jsx'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { userEvent } from '@testing-library/user-event'

describe('MovieForm', () => {
  it('renders the empty form when given no movie data', () => {
    // arrange
    render(<MovieForm />)

    // assert
    expect(screen.getByRole('textbox', { name: 'Title' })).not.toHaveValue()
    expect(screen.getByRole('textbox', { name: 'Movie URL' })).not.toHaveValue()
    expect(screen.getByRole('textbox', { name: 'Genres' })).not.toHaveValue()
    expect(screen.getByRole('textbox', { name: 'Release Date' })).not.toHaveValue()
    expect(screen.getByRole('textbox', { name: 'Rating' })).not.toHaveValue()
    expect(screen.getByRole('textbox', { name: 'Runtime' })).not.toHaveValue()
    expect(screen.getByRole('textbox', { name: 'Overview' })).not.toHaveValue()
  })

  it('renders the form with movie data', () => {
    // arrange
    render(
      <MovieForm
        title="title"
        imageUrl="image_url"
        genres={['genre', 'another_genre']}
        releaseYear={2025}
        rating={8.5}
        duration={65}
        description="description"
      />
    )

    // assert
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue('title')
    expect(screen.getByRole('textbox', { name: 'Movie URL' })).toHaveValue('image_url')
    expect(screen.getByRole('textbox', { name: 'Genres' })).toHaveValue('genre, another_genre')
    expect(screen.getByRole('textbox', { name: 'Release Date' })).toHaveValue('2025')
    expect(screen.getByRole('textbox', { name: 'Rating' })).toHaveValue('8.5')
    expect(screen.getByRole('textbox', { name: 'Runtime' })).toHaveValue('65')
    expect(screen.getByRole('textbox', { name: 'Overview' })).toHaveValue('description')
  })

  it('resets the form with initial movie data', async () => {
    // arrange
    const user = userEvent.setup()
    render(
      <MovieForm
        title="title"
        imageUrl="image_url"
        genres={['genre', 'another_genre']}
        releaseYear={2025}
        rating={8.5}
        duration={65}
        description="description"
      />
    )

    // act
    await user.type(screen.getByRole('textbox', { name: 'Title' }), 'new_title')
    await user.click(screen.getByRole('button', { name: 'Reset' }))

    // assert
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue('title')
  })

  it('triggers the callback on form submission with updated movie data', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(<MovieForm onSubmit={callback} />)

    // act
    await user.type(screen.getByRole('textbox', { name: 'Title' }), 'new_title')
    await user.type(screen.getByRole('textbox', { name: 'Movie URL' }), 'new_image_url')
    await user.type(screen.getByRole('textbox', { name: 'Genres' }), 'new_genre, another_new_genre')
    await user.type(screen.getByRole('textbox', { name: 'Release Date' }), '2026')
    await user.type(screen.getByRole('textbox', { name: 'Rating' }), '9.0')
    await user.type(screen.getByRole('textbox', { name: 'Runtime' }), '90')
    await user.type(screen.getByRole('textbox', { name: 'Overview' }), 'new_description')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    // assert
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'new_title',
        imageUrl: 'new_image_url',
        genres: ['new_genre', 'another_new_genre'],
        releaseYear: 2026,
        rating: 9.0,
        duration: 90,
        description: 'new_description',
      })
    )
  })

  afterEach(() => {
    cleanup()
  })
})
