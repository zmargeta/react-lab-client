import React from 'react'
import styled from 'styled-components'
import Button from './Button.jsx'
import { ButtonSize, ButtonVariant } from './ButtonStyles.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const StyledMovieForm = styled.form`
  column-gap: var(--ui-control-gap);
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(5, min-content);
  grid-template-areas:
    'l1 r1'
    'l2 r2'
    'l3 r3'
    'description description'
    'button-panel button-panel';
  max-width: calc(2 * var(--tile-width) / 3);

  > label {
    display: block;
    min-height: 130px;
  }

  > label:has(> input[id='title']) {
    grid-area: l1;
  }

  > label:has(> input[id='image-url']) {
    grid-area: l2;
  }

  > label:has(> input[id='genres']) {
    grid-area: l3;
  }

  > label:has(> input[id='release-year']) {
    grid-area: r1;
  }

  > label:has(> input[id='rating']) {
    grid-area: r2;
  }

  > label:has(> input[id='duration']) {
    grid-area: r3;
  }

  > label:has(> textarea[id='description']) {
    grid-area: description;
    min-height: 185px;
  }

  > label > span {
    color: var(--color-primary);
    display: block;
    font-size: 1rem;
    font-weight: var(--font-weight-strong);
    text-transform: uppercase;
    margin: 0 0 var(--ui-control-gap);
  }

  > label > input,
  > label > textarea {
    background-color: var(--color-background-input);
    border: 0;
    border-radius: var(--ui-control-border-radius);
    box-sizing: border-box;
    color: var(--color-text-dimmed);
    display: block;
    font: inherit;
    font-weight: var(--font-weight-input);
    margin: 0 0 var(--ui-control-gap);
    width: 100%;
    padding: 0 var(--ui-control-gap);
  }

  > label > input {
    height: var(--ui-control-height);
  }

  > label > input:focus,
  > label > textarea:focus {
    outline: none;
  }

  > label > textarea {
    height: calc(2 * var(--ui-control-height));
    padding: var(--ui-control-gap);
    resize: none;
  }

  > label > span[role='alert'] {
    color: var(--color-text);
    font-size: 0.75rem;
    text-align: right;
  }

  > label:has(input[aria-invalid='true'], textarea[aria-invalid='true'])
    > span:not([role='alert']) {
    text-decoration: line-through var(--color-primary);
  }
`

const ButtonPanel = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: var(--ui-control-gap);
  grid-area: button-panel;
  padding-top: calc(2 * var(--ui-control-gap));
`

const MovieSchema = z.object({
  imageUrl: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain,
    error: 'Must be a valid URL.',
    normalize: true,
  }),
  title: z.string().trim().min(1, 'Title is required.'),
  releaseYear: z.int32('Not an integer.').gte(1888, 'Must be after 1888.'),
  genres: z
    .array(z.string().trim().min(1, 'Must be at least one char.'))
    .min(1, 'At least one genre is required.'),
  rating: z.number('Not a number.').gte(0.1, 'Must be ≥ 0.1.').lte(10, 'Must be ≤ 10.0.'),
  duration: z.int32('Not an integer.').gte(1, 'Must be at least 1 minute.'),
  description: z.string().trim().min(1, 'Description is required.'),
})

const MovieForm = ({
  imageUrl,
  title,
  releaseYear,
  genres = [],
  rating,
  duration,
  description,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(MovieSchema),
  })

  return (
    <StyledMovieForm onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>Title</span>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={title}
          {...register('title')}
          aria-invalid={errors.title ? 'true' : 'false'}
          aria-errormessage={errors.title ? 'title-error' : undefined}
        />
        {errors.title ? (
          <span id="title-error" role="alert">
            {errors.title.message}
          </span>
        ) : null}
      </label>
      <label>
        <span>Movie URL</span>
        <input
          id="image-url"
          name="image_url"
          type="text"
          defaultValue={imageUrl}
          {...register('imageUrl', {
            setValueAs: (val) => val || undefined,
          })}
          aria-invalid={errors.imageUrl ? 'true' : 'false'}
          aria-errormessage={errors.imageUrl ? 'image-url-error' : undefined}
        />
        {errors.imageUrl ? (
          <span id="image-url-error" role="alert">
            {errors.imageUrl.message}
          </span>
        ) : null}
      </label>
      <label>
        <span>Genres</span>
        <input
          id="genres"
          name="genres"
          type="text"
          defaultValue={genres.join(', ')}
          {...register('genres', {
            setValueAs: (val) => val?.split(',').filter((it) => it) ?? [],
          })}
          aria-invalid={errors.genres ? 'true' : 'false'}
          aria-errormessage={errors.genres ? 'genres-error' : undefined}
        />
        {errors.genres ? (
          <span id="genres-error" role="alert">
            {errors.genres.message}
          </span>
        ) : null}
      </label>
      <label>
        <span>Release Date</span>
        <input
          id="release-year"
          name="release_year"
          type="text"
          defaultValue={releaseYear}
          {...register('releaseYear', {
            setValueAs: (val) => (val ? Number(val) : undefined),
          })}
          aria-invalid={errors.releaseYear ? 'true' : 'false'}
          aria-errormessage={errors.releaseYear ? 'release-year-error' : undefined}
        />
        {errors.releaseYear ? (
          <span id="release-year-error" role="alert">
            {errors.releaseYear.message}
          </span>
        ) : null}
      </label>
      <label>
        <span>Rating</span>
        <input
          id="rating"
          name="rating"
          type="text"
          defaultValue={rating}
          {...register('rating', {
            setValueAs: (val) => (val ? Number(val) : undefined),
          })}
          aria-invalid={errors.rating ? 'true' : 'false'}
          aria-errormessage={errors.rating ? 'rating-error' : undefined}
        />
        {errors.rating ? (
          <span id="rating-error" role="alert">
            {errors.rating.message}
          </span>
        ) : null}
      </label>
      <label>
        <span>Runtime</span>
        <input
          id="duration"
          name="duration"
          type="text"
          defaultValue={duration}
          {...register('duration', {
            setValueAs: (val) => (val ? Number(val) : undefined),
          })}
          aria-invalid={errors.duration ? 'true' : 'false'}
          aria-errormessage={errors.duration ? 'duration-error' : undefined}
        />
        {errors.duration ? (
          <span id="duration-error" role="alert">
            {errors.duration.message}
          </span>
        ) : null}
      </label>
      <label>
        <span>Overview</span>
        <textarea
          id="description"
          name="description"
          defaultValue={description}
          {...register('description')}
          aria-invalid={errors.description ? 'true' : 'false'}
          aria-errormessage={errors.description ? 'description-error' : undefined}
        />
        {errors.description ? (
          <span id="description-error" role="alert">
            {errors.description.message}
          </span>
        ) : null}
      </label>
      <ButtonPanel>
        <Button type="submit" variant={ButtonVariant.Primary} size={ButtonSize.Small}>
          Submit
        </Button>
        <Button type="reset" size={ButtonSize.Small}>
          Reset
        </Button>
      </ButtonPanel>
    </StyledMovieForm>
  )
}

export default MovieForm
