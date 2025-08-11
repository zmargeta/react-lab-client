import React from 'react'
import styled from 'styled-components'
import Poster from './Poster.jsx'

const StyledMovieDetails = styled.article`
  color: var(--color-text);
  display: flex;
  gap: calc(2 * var(--ui-control-gap));
`

const Details = styled.div`
  display: grid;
  grid-template-columns: 100px fit-content(650px) 60px 1fr;
  grid-template-rows: repeat(3, min-content) 1fr;
  grid-template-areas:
    'title title rating .'
    'genres genres genres genres'
    'release-year duration duration duration'
    'description description description description';
`

const Title = styled.span`
  font-size: 2.5rem;
  grid-area: title;
  line-height: 3.75rem;
  padding-right: calc(2 * var(--ui-control-gap));
  text-align: left;
  text-transform: uppercase;
`

const ReleaseYear = styled.span`
  color: var(--color-primary);
  font-size: 1.5rem;
  grid-area: release-year;
  padding: calc(2 * var(--ui-control-gap)) 0;
  text-align: left;
`

const Genres = styled.span`
  color: var(--color-text-dimmed);
  font-size: 0.875rem;
  grid-area: genres;
  text-align: left;
`

const Rating = styled.span`
  border: 1px solid var(--color-text);
  border-radius: 30px;
  font-size: 1.25rem;
  grid-area: rating;
  line-height: 60px;
  max-height: 60px;
  max-width: 60px;
  min-height: 60px;
  min-width: 60px;
  text-align: center;
`

const Duration = styled.span`
  color: var(--color-primary);
  font-size: 1.5rem;
  grid-area: duration;
  padding: calc(2 * var(--ui-control-gap)) 0;
  text-align: left;
`

const Description = styled.p`
  --max-lines: 6.5;
  --line-height: 1.875rem;

  color: var(--color-text-dimmed);
  font-size: 1.25rem;
  font-weight: var(--font-weight-light);
  grid-area: description;
  line-height: var(--line-height);
  margin: 0;
  max-height: calc(var(--max-lines) * var(--line-height));
  overflow: scroll;
  padding: 0;
  text-align: left;
`

const MovieDetails = ({
  imageUrl,
  title,
  releaseYear,
  genres = [],
  rating,
  duration,
  description,
}) => {
  const hours = duration ? Math.floor(duration / 60) : undefined
  const minutes = duration ? duration - hours * 60 : 0

  return (
    <StyledMovieDetails aria-label="movie-details">
      <Poster imageUrl={imageUrl} />
      <Details>
        <Title>{title ?? 'Unknown'}</Title>
        <Rating>{rating ?? 'N/A'}</Rating>
        <Genres>{genres.length > 0 ? genres.join(', ') : 'Unknown'}</Genres>
        <ReleaseYear>{releaseYear ?? 'N/A'}</ReleaseYear>
        <Duration>
          {duration ? (hours ? `${hours}h ${minutes}min` : `${minutes}min`) : 'N/A'}
        </Duration>
        <Description>{description ?? 'Unknown'}</Description>
      </Details>
    </StyledMovieDetails>
  )
}

export default MovieDetails
