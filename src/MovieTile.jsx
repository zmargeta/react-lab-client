import React from 'react'
import styled from 'styled-components'
import Poster from './Poster.jsx'
import GlyphButton from './GlyphButton.jsx'
import glyphUrl from './assets/glyph_menu.svg'
import PopupMenu, { PopupMenuItem } from './PopupMenu.jsx'

const StyledMovieTile = styled.article`
  --padding-horizontal: var(--inherit-padding-horizontal, var(--tile-padding-horizontal));
  --padding-vertical: var(--inherit-padding-vertical, var(--tile-padding-vertical));

  --baloon-height: calc(1.75 * var(--font-size-genre));
  --baloon-width: calc(0.4 * var(--ui-control-min-width));
  --font-size-title: 1.125rem;
  --font-size-genre: 0.875rem;

  color: var(--color-text-dimmed);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  grid-template-rows: var(--poster-height) 1fr;
  overflow: hidden;
  position: relative;
  gap: var(--ui-control-gap);
  width: var(--poster-width);

  > button:nth-of-type(1),
  > ul[role='menu']:nth-of-type(1) {
    position: absolute;
    right: var(--padding-vertical);
    top: var(--padding-vertical);
  }
`

const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr calc(var(--ui-control-gap) + var(--baloon-width));
  grid-template-rows: var(--font-size-title) var(--font-size-genre);
  grid-template-areas:
    'title release-year'
    'genres release-year';
  row-gap: calc(0.5 * var(--ui-control-gap));
`

const Title = styled.span`
  font-size: var(--font-size-title);
  grid-area: title;
  height: fit-content;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ReleaseYear = styled.span`
  border: 1px solid;
  border-radius: var(--ui-control-border-radius);
  font-size: var(--font-size-genre);
  grid-area: release-year;
  height: var(--baloon-height);
  justify-self: end;
  line-height: var(--baloon-height);
  text-align: center;
  width: var(--baloon-width);
`

const Genres = styled.span`
  font-size: var(--font-size-genre);
  grid-area: genres;
  height: fit-content;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const MovieTile = ({
  imageUrl,
  title,
  releaseYear,
  genres = [],
  onClick,
  onEditMovie,
  onDeleteMovie,
}) => {
  const [menuBtnVisible, setMenuBtnVisible] = React.useState(false)
  const [menuVisible, setMenuVisible] = React.useState(false)

  return (
    <StyledMovieTile
      aria-label={title}
      onClick={onClick}
      onMouseEnter={() => setMenuBtnVisible(true)}
      onMouseLeave={() => setMenuBtnVisible(false)}
    >
      <Poster imageUrl={imageUrl} />
      <Details>
        <Title>{title ?? 'Unknown'}</Title>
        <ReleaseYear>{releaseYear ?? 'N/A'}</ReleaseYear>
        <Genres>{genres.length > 0 ? genres.join(', ') : 'Unknown'}</Genres>
      </Details>
      {menuBtnVisible ? (
        <GlyphButton
          imageUrl={glyphUrl}
          onClick={(e) => {
            e.stopPropagation()
            setMenuVisible(true)
          }}
        />
      ) : undefined}
      <PopupMenu
        visible={menuVisible}
        onHide={(e) => {
          e.stopPropagation()
          setMenuVisible(false)
        }}
      >
        <PopupMenuItem
          key="edit"
          onClick={(e) => {
            e.stopPropagation()
            setMenuVisible(false)
            onEditMovie?.(e)
          }}
        >
          Edit
        </PopupMenuItem>
        <PopupMenuItem
          key="delete"
          onClick={(e) => {
            e.stopPropagation()
            setMenuVisible(false)
            onDeleteMovie?.(e)
          }}
        >
          Delete
        </PopupMenuItem>
      </PopupMenu>
    </StyledMovieTile>
  )
}

export default MovieTile
