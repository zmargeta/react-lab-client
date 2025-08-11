import React from 'react'
import styled from 'styled-components'
import MovieTile from './MovieTile.jsx'

const StyledMovieTiles = styled.section`
  column-gap: calc(
    (var(--tile-width) - 2 * var(--tile-padding-horizontal) - 4 * var(--poster-width)) / 3
  );
  display: flex;
  flex-wrap: wrap;
  row-gap: calc(4 * var(--ui-control-gap));
`

const MovieTiles = ({ movies = [], onSelectMovie, onEditMovie, onDeleteMovie }) => (
  <StyledMovieTiles role="tabpanel">
    {movies.map((it, idx) => (
      <MovieTile
        key={it?.id ?? it?.title ?? idx}
        onClick={(e) => onSelectMovie?.(it, e)}
        onEditMovie={() => onEditMovie?.(it)}
        onDeleteMovie={() => onDeleteMovie?.(it)}
        {...it}
      />
    ))}
  </StyledMovieTiles>
)

export default MovieTiles
