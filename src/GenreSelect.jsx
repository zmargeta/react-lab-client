import React from 'react'
import styled from 'styled-components'

const StyledGenreSelect = styled.menu`
  --height: var(--inherit-height, var(--ui-control-height));

  align-items: stretch;
  background-color: var(--inherit-color-background);
  display: flex;
  gap: calc(2 * var(--ui-control-gap));
  margin: 0;
  padding: 0;
  text-transform: uppercase;

  li {
    cursor: pointer;
    display: block;
    height: var(--height);
    line-height: var(--height);
    text-align: center;
  }

  li.selected {
    box-shadow: 0 var(--menu-border-height) var(--color-primary);
  }
`

const GenreSelect = ({ values = [], selected, onChange }) => {
  const isSelected = (it) => it?.toLowerCase() === selected?.toLowerCase()

  return (
    <StyledGenreSelect role="tablist" aria-label="genres">
      {values.map((it, idx) => (
        <li
          key={it ?? idx}
          role="tab"
          className={isSelected(it) ? 'selected' : ''}
          onClick={!isSelected(it) ? (e) => onChange?.(it, e) : undefined}
        >
          {it}
        </li>
      ))}
    </StyledGenreSelect>
  )
}

export default GenreSelect
